<template>
    <div class="map_wrapper map">

    
    <yandex-map
        v-model="map"
        :settings="{
            location: {
                center,
                zoom,
            },
            theme,
            showScaleInCopyrights: true,
        }"
      width="100%"
      height="100%"
  >
  <yandex-map-default-scheme-layer  :settings="{ theme: 'dark' }"/>
  <yandex-map-default-features-layer />
  <yandex-map-controls :settings="{ position: 'right' }">
    <yandex-map-zoom-control />
  </yandex-map-controls>

  <!-- <yandex-map-marker
            v-for="(marker, index) in markers3"
            :key="index"
            :settings="marker.settings"

    >
      <div class="marker"><div class="icon" v-html="marker.icon"></div></div>
    </yandex-map-marker> -->

    <!-- <yandex-map-default-marker
            v-model="entry_point_marker"
            :settings="marker.settings"

    >
      <div class="marker"><div class="icon" v-html="marker.icon"></div></div>
    </yandex-map-default-marker> -->

    <yandex-map-feature
    :settings="{
      geometry: {
        type: 'LineString',
        coordinates: lineCoordinates,
      },
      style: {
        stroke: [{ color: '#cccccc', width: 3 }],
      },
    }"
  />


    <yandex-map-default-marker
    v-model="defaultMarker"
    :settings="{
      //Здесь вам НУЖНО брать координаты либо из функции onDragMove, либо из маркера, стриггерив реактивность
      //Яндекс при выполнении функции .update зачем-то подставляет оригинальные координаты, хотя они не менялись =(
      coordinates: defaultMarker ? defaultMarker.coordinates : center,
      title: `Долгота: ${defaultMarker?.coordinates[0].toFixed(2)}<br>Широта: ${defaultMarker?.coordinates[1].toFixed(2)}`,
      draggable: true,
      onDragMove,
      onDragEnd,
    }"
    
  />

    <yandex-map-marker v-model="entry_point_model" :settings="entry_point_controller.settings">
      <div class="marker"><div class="icon" v-html="entry_point_controller.icon"></div></div>
    </yandex-map-marker>

    <yandex-map-marker v-model="intersection_point_model" :settings="intersection_point_controller.settings">
      <div class="marker"><div class="icon" v-html="intersection_point_controller.icon"></div></div>
    </yandex-map-marker>

    <yandex-map-marker v-model="observation_point_model" :settings="observation_point_controller.settings">
      <div class="marker"><div class="icon" v-html="observation_point_controller.icon"></div></div>
    </yandex-map-marker>

  </yandex-map>
  <div class="flex_col">
    



  </div>
</div>
</template>

<script setup lang="ts">
import State from './../../../../model/state';


import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker';


let state = ref(State.state)


interface Props {
    size?:number
}
const props = withDefaults(defineProps<Props>(), {
    size: 200
})

const center:LngLat = [64.565, 54.445]
const zoom = 7;
const theme = "dark"

// -- map
import { ShallowRef, shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';

import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapControlButton,
  YandexMapZoomControl,
  YandexMapFeature,
} from 'vue-yandex-maps';
import type { YandexMapMarkerPosition } from 'vue-yandex-maps';
import { onMounted, onUnmounted, ref, Ref, triggerRef } from 'vue';
import type { LngLat } from '@yandex/ymaps3-types';
import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
import { IGeoPoint } from '../../../../../../core/model/Geometry';
import { LatLon } from 'geodesy/utm';


class MarkerModel {
    constructor(
        control: ShallowRef<any>,
        icon: string,
        title: string,
        geo_point: IGeoPoint,
        move_handler: null|((sender: MarkerModel, point:{latitude: number, longitude: number}) => void)
    ) {
        this.control = control;
        this.icon = icon;
        this.settings.coordinates[1] = geo_point.latitude;
        this.settings.coordinates[0] = geo_point.longitude;
        geo_point.changed.on((p, passed) => {
            console.log("map geopoint changed", p, passed);
           
            control.value?.update({
                coordinates: [p.longitude, p.latitude]
            })
           
        });
        this.title = title;
        this.geo_point = geo_point;
        this.outer_move_handler = move_handler;
        if (move_handler == null) {
            this.settings.draggable = false;
        }
    } 
    control: ShallowRef<any>;
    title?: string;
    icon?: string;
    geo_point: IGeoPoint;
    outer_move_handler: null | ((sender: MarkerModel, point:{latitude: number, longitude: number}) => void);


    move(lon: number, lat: number): void {
        if (this.outer_move_handler != null) {
            console.log("lat:", lat, " long:", lon);
            this.outer_move_handler(this, {latitude: lat, longitude: lon});
        }
    }
    settings: YMapMarkerProps = {
        coordinates: [55, 55],
        draggable: true,
        onDragEnd: (...args: any[]) => this.move(args[0][0], args[0][1])
    }
}

const entry_point_model = shallowRef<any | null>(null);
const entry_point_controller = new MarkerModel(entry_point_model, "&#xe902;", "Entry point", state.value.entry_point_geo, null)

const intersection_point_model = shallowRef<any | null>(null);
const intersection_point_controller = new MarkerModel(intersection_point_model, "&#8736;", "Intersection point", state.value.geo_points_controller.intersection_point_geo, null)

const observation_point_model = shallowRef<any | null>(null);
const observation_point_controller = new MarkerModel(observation_point_model, "?", "Observation point", state.value.observation_point_geo, (s, p)=> state.value.observation_point_geo.set(p.latitude, p.longitude, ['map']));

const lineCoordinates = ref<LngLat[]>([
    [state.value.geo_points_controller.intersection_point_geo.longitude, state.value.geo_points_controller.intersection_point_geo.latitude],
    [state.value.entry_point_geo.longitude, state.value.entry_point_geo.latitude],
    // entry_point_model.value.settings.coordinates,
    // intersection_point_model.value.settings.coordinates
]);

// const markers3:MarkerModel[] = [
//     new MarkerModel("&#xe902;", "Entry point", state.value.entry_point_geo, null),
//     //new MarkerModel("&#8736;","Surface intersection point", state.value.geo_points_controller.intersection_point_geo),
//     // new MarkerModel("&#xe904;", "Effective thermal point source"),
//     // new MarkerModel("&#xe9a9;",  "Effective overpressure point source"),
//     new MarkerModel("?", "Observation point", state.value.observation_point_geo, (s, p)=> state.value.observation_point_geo.set(p.latitude, p.longitude, [])),
// ]



//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null);

const handleClick = (event: MouseEvent) => console.log(event);
    
onMounted(() => {
    console.log('map onMounted register callback');
    state.value.geo_points_controller.observation_point.changed.on((s, p)=> {
        triggerRef(state);
    });
    state.value.entry_point_geo.changed.on((s, p)=> {
        lineCoordinates.value[1] = [s.longitude, s.latitude];
    });
    state.value.geo_points_controller.intersection_point_geo.changed.on((s, p)=> {
        lineCoordinates.value[0] = [s.longitude, s.latitude];
    });
})



const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);

const onDragMove = (...args: any[]) => {
    triggerRef(defaultMarker);
    console.log(args);
};

const onDragEnd = (...arhs: any[]) => {
    triggerRef(defaultMarker);
    console.log("on drag end,",  arhs);
    triggerRef(state);
    // entry_point_marker.value?.update({
    //     coordinates: [55, 60]
    // })
    // console.log("on drag end updated,",  entry_point_marker.value);

}




// entry point
//const entry_point_marker = shallowRef<any | null>(null);

const entry_point_marker_onDragEnd = (...args: any[]) => {
    console.log('entry_point_marker_onDragEnd', args);
    //triggerRef(entry_point_marker);
    console.log(args);
};
const entry_point_settings: YMapMarkerProps = {
    coordinates: [55, 55],
    draggable: true,
    onDragEnd: (...args: any[]) => entry_point_marker_onDragEnd(args),
}


</script>


<style scoped lang="scss">
.map_wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: 100%;
}

.marker {
    margin-top: -50%;
    margin-left: -50%;
    position: relative;
    width: 50px;
    height: 50px;
    background: rgba(80, 80, 80, 1);
    border-radius: 50%;
    border: 1px solid rgb(220, 220, 220);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-align: center;
    font-weight: bold;
    line-height: 20px;
    font-size: 24px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .icon{
        color:rgb(220, 220, 220);
        display: flex;
    
        font-family: 'asteroidhazard' !important;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        font-size: 36px;
    }
    &:hover{               
        border: 2px solid rgb(255, 255, 255); 
        background: rgba(128, 128, 128, 1);
        color:rgb(255, 255, 255);
        .icon{
            color:rgb(255, 255, 255);
        }
    }
}


  .marker_figure{
      
      text.icon {
          font-family: 'asteroidhazard' !important;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          font-size: 24px;
      }
  }
</style>