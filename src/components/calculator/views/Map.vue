<template>
	<v-col>
        <svg viewBox="-100 -100 200 200"  preserveAspectRatio="xMidYMid meet"  overflow="visible" class="map" ref="svg">
            <symbol v-for="(marker, name) in markers" 
                :key=name 
                :id="'icon_' + name"
                preserveAspectRatio="xMidYMid meet" viewBox="16 16 32 32" overflow="visible">
                <g class="marker_figure">
                    <circle cx="16" cy="16" r="16" style="fill: var(--marker_back, #d3d3d32d); stroke: var(--marker_stroke, black);"></circle> 
                    <text x="16" y="16" dy="0.33em" text-anchor="middle" class="icon"  stroke="none" fill="#ededed"
                        style="fill: var(--icon_color, black);" v-html="marker.icon.code">
                    </text>
                </g>
            </symbol>

            <defs>
                <filter id="blur_filter" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" :stdDeviation="blur_radius" />
                </filter>
            </defs>

            <image :width="200" :height="200" x="-100" y="-100"
            :href="map_controller.url" filter="url(#blur_filter)"/>

            <line class="sizes_line" 
                    :x1="visual_entry_vector.start.x" 
                    :y1="visual_entry_vector.start.y" 
                    :x2="visual_entry_vector.end.x" 
                    :y2="visual_entry_vector.end.y"></line>

            <g class="effects_group hover_shadow_back" @mouseover="markers.intersection.icon.tooltip = true" @mouseout="markers.intersection.icon.tooltip = false">
                <use class="use_marker" :x="markers.intersection.map_cs.x" :y="-markers.intersection.map_cs.y" height="16" width="16" xlink:href="#icon_intersection"></use>
            </g>
            <g class="effects_group hover_shadow_back" @mouseover="markers.entry.icon.tooltip = true" @mouseout="markers.entry.icon.tooltip = false">
                <use class="use_marker" :x="markers.entry.map_cs.x" :y="-markers.entry.map_cs.y" height="16" width="16" xlink:href="#icon_entry"
                :transform="'rotate('+ (state.entry_point.azimuth-35)+' '+ markers.entry.map_cs.x + ' ' + (-markers.entry.map_cs.y) + ')'"></use>
            </g>
            <g class="effects_group hover_shadow_back" @mouseover="markers.overpressure.icon.tooltip = true" @mouseout="markers.overpressure.icon.tooltip = false">
                <use class="use_marker" :x="markers.overpressure.map_cs.x" :y="-markers.overpressure.map_cs.y" height="16" width="16" xlink:href="#icon_overpressure"></use>
            </g>
            <g class="effects_group hover_shadow_back" @mouseover="markers.thermal.icon.tooltip = true" @mouseout="markers.thermal.icon.tooltip = false">
                <use class="use_marker" :x="markers.thermal.map_cs.x" :y="-markers.thermal.map_cs.y" height="16" width="16" xlink:href="#icon_thermal"></use>
            </g>
            
            <g class="effects_group hover_shadow_back" @mouseover="markers.observation.icon.tooltip = true" @mouseout="markers.observation.icon.tooltip = false">
                <use class="use_marker" :x="markers.observation.map_cs.x" :y="-markers.observation.map_cs.y" height="16" width="16" xlink:href="#icon_observation"></use>
            </g>





            <g class="effects_group hover_shadow" @mouseover="markers.intersection.icon.tooltip = true" @mouseout="markers.intersection.icon.tooltip = false">
                <use class="use_marker" :x="markers.intersection.map_cs.x" :y="-markers.intersection.map_cs.y" height="16" width="16" xlink:href="#icon_intersection"></use>
            </g>
            <g class="effects_group hover_shadow" @mouseover="markers.entry.icon.tooltip = true" @mouseout="markers.entry.icon.tooltip = false">
                <use class="use_marker" :x="markers.entry.map_cs.x" :y="-markers.entry.map_cs.y" height="16" width="16" xlink:href="#icon_entry"
                :transform="'rotate('+ (state.entry_point.azimuth-35)+' '+ markers.entry.map_cs.x + ' ' + (-markers.entry.map_cs.y) + ')'"></use>
            </g>
            <g class="effects_group hover_shadow" @mouseover="markers.overpressure.icon.tooltip = true" @mouseout="markers.overpressure.icon.tooltip = false">
                <use class="use_marker" :x="markers.overpressure.map_cs.x" :y="-markers.overpressure.map_cs.y" height="16" width="16" xlink:href="#icon_overpressure"></use>
            </g>
            <g class="effects_group hover_shadow" @mouseover="markers.thermal.icon.tooltip = true" @mouseout="markers.thermal.icon.tooltip = false">
                <use class="use_marker" :x="markers.thermal.map_cs.x" :y="-markers.thermal.map_cs.y" height="16" width="16" xlink:href="#icon_thermal"></use>
            </g>
            
            <g class="effects_group hover_shadow" @mouseover="markers.observation.icon.tooltip = true" @mouseout="markers.observation.icon.tooltip = false">
                <use class="use_marker" :x="markers.observation.map_cs.x" :y="-markers.observation.map_cs.y" height="16" width="16" xlink:href="#icon_observation"></use>
            </g>



            <foreignObject  v-for="(marker, name)  in markers" :key="'tooltip for ' + name"
                :x="marker.map_cs.x" :y="- marker.map_cs.y" width="0" height="0" overflow="visible" >
                <div xmlns="http://www.w3.org/1999/xhtml" class="tooltip_wrapper top" :class="marker.icon.tooltip ? 'active' : ''" 
                :style="'zoom: ' + (100*200/client_size().width) +'%;'">
                    <div class="tooltip_back">{{$t('calculator.schema.' + marker.icon.tooltip_text_key)}}</div>
                </div>
            </foreignObject>
        </svg>
    </v-col>
</template>

<script lang="ts">
import MathExt from '@/components/lib/MathExt';
import State from '@/components/model/State';
import GoogleMapController from '@/components/model/GoogleMapController';
import { Component, Prop, Vue, Model, ModelSync, Watch } from 'vue-property-decorator';
import { GeoMath, GeoPoint, Point, Transform } from '@/components/model/Geometry';

@Component
export default class Map extends Vue {
    debug: boolean = true;
    log(...data: any[])
    {
        if(this.debug == true)
            console.log("map ", ...data);
    }

    state: State = State.state;
    math_ext = MathExt;

    map_controller: GoogleMapController = new GoogleMapController();
    blur_radius:number =  0;

    markers = {
        entry: { 
            icon: {code:"&#xe902;", tooltip: false, tooltip_text_key: 'Entry point'},
            field_cs : new Point(0,0),
            map_cs: new Point(0,0),
            geo_deg: this.state.entry_point,
            geo_rad: new GeoPoint()
        },
        
        intersection: { 
            icon: {code:"&#8736;", tooltip: false, tooltip_text_key: 'Surface intersection point'},
            field_cs : new Point(0,0),
            map_cs: new Point(0,0),
            geo_rad:  new GeoPoint(),
            geo_deg: new GeoPoint(),
        },
        overpressure: { 
            icon: {code:"&#xe904;", tooltip: false, tooltip_text_key: 'Effective thermal point source'},
            field_cs : new Point(0,0),
            map_cs: new Point(0,0)
        },
        thermal: { 
            icon: {code:"&#xe9a9;", tooltip: false, tooltip_text_key: 'Effective overpressure point source'},
            field_cs : new Point(0,0),
            map_cs: new Point(0,0)
        },
        observation: { 
            icon: {code:"?", tooltip: false, tooltip_text_key: 'Observation point'},
            field_cs : this.state.observation_point,
            map_cs: new Point(0,0)
        }
    }
    coord_sys = {
        intersection_cs_transform: new Transform(0,0,0, 1/this.km_per_svg_pixel, 1/this.km_per_svg_pixel),
        only_rotate_transform: new Transform(0,0,0,1,1)
    }
    get km_per_svg_pixel():number
    {
        return this.map_controller.size_km/200;
    }

 
    get visual_entry_vector(): {start: {x:number, y:number}, end: {x:number, y:number}}
    {
        let x_dist = this.markers.entry.map_cs.x - this.markers.intersection.map_cs.x;
        let y_dist = -this.markers.entry.map_cs.y + this.markers.intersection.map_cs.y;
        let angle= Math.atan2(y_dist,x_dist);
        let r = (x_dist**2 + y_dist**2)**0.5;
        let r_small = r-10.;
        let x_rel = r_small * Math.cos(angle);
        let y_rel = r_small * Math.sin(angle);
        let x_rel_start = 10. * Math.cos(angle);
        let y_rel_start = 10. * Math.sin(angle);
        return {
            start: {x: this.markers.intersection.map_cs.x + x_rel_start, y: -this.markers.intersection.map_cs.y + y_rel_start },
            end: {x:this.markers.intersection.map_cs.x + x_rel, y: -this.markers.intersection.map_cs.y + y_rel }
        };

    }



    created(){
        this.start_map_updating();
        this.log('created');
        this.update_intersection_geo_rad();

        let entry_geo_deg_update_handler = () => this.markers.entry.geo_rad.set_point(MathExt.geopoint_deg2rad(this.markers.entry.geo_deg));
        this.markers.entry.geo_deg.changed.on(entry_geo_deg_update_handler);
        entry_geo_deg_update_handler();
        this.markers.entry.geo_rad.changed.on(s => this.update_intersection_geo_rad());

        this.map_controller.update_url();



        this.coord_sys.intersection_cs_transform.changed.on(s => 
        {
            this.markers.entry.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.entry.field_cs));
            this.markers.intersection.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.intersection.field_cs));
            this.markers.overpressure.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.overpressure.field_cs));
            this.markers.thermal.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.thermal.field_cs));
            this.markers.observation.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.observation.field_cs));
            this.need_update_map = true;
        });

        this.markers.entry.field_cs.changed.on(async s => 
        {
            this.markers.entry.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.entry.field_cs));
        });

        /* this.markers.entry.map_cs.changed.on(async s => 
        {
            console.log('this.markers.entry.map_cs.changed');
            this.markers.entry.field_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_from(this.markers.entry.map_cs));
        });
 */

        this.markers.overpressure.field_cs.changed.on(async s => 
        {    
            this.markers.overpressure.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.overpressure.field_cs));
        });

        this.markers.thermal.field_cs.changed.on(async s => 
        {
            this.markers.thermal.map_cs.set_xy_silent(this.coord_sys.intersection_cs_transform.convert_to(this.markers.thermal.field_cs));
        });

        this.markers.observation.field_cs.changed.on(async s => 
        {
            this.markers.observation.map_cs.set_point(this.coord_sys.intersection_cs_transform.convert_to(this.markers.observation.field_cs));
        });

        this.markers.observation.map_cs.changed.on(async s => 
        {
            this.request_map_update();
        });
        let entry_point_update_handler = () => {
            this.coord_sys.intersection_cs_transform.angle = this.state.entry_point.azimuth;
            this.coord_sys.only_rotate_transform.angle = this.state.entry_point.azimuth;

            this.update_intersection_geo_rad();
        };
        this.state.entry_point.changed.on(entry_point_update_handler);

        let variant_update_handler = () => {
            this.log('this.variant.changed');
            this.markers.entry.field_cs.set_xy(0, 100./Math.tan(this.state.variant.angle_rad));
            this.markers.overpressure.field_cs.set_xy(0, this.state.effects.shock_wave.zero_point);
            this.markers.thermal.field_cs.set_xy(0, this.state.effects.irradiation.zero_point);

            this.update_intersection_geo_rad();
        };
        this.state.variant.changed.on(variant_update_handler);
        variant_update_handler();
        entry_point_update_handler();
    }

    update_intersection_geo_rad()
    {
        let entry_rad = this.markers.entry.geo_rad;
        let distance = 100./Math.tan(this.state.variant.angle_rad);
        let azimuth = MathExt.deg2rad(this.state.entry_point.azimuth+180);
        //console.log("entry_rad: ", entry_rad, " distance: ", distance, " azimuth: ", Geometry.to_deg(azimuth));

        let intersection_geo_rad = GeoMath.coords_by_distance_azimuth(entry_rad, distance, azimuth);
        let intersection_geo_deg = MathExt.geopoint_rad2deg(intersection_geo_rad);
        //console.log("intersection_geo_rad: ", intersection_geo_rad, " intersection_geo_deg: ", intersection_geo_deg);
        this.markers.intersection.geo_rad.set(intersection_geo_rad.latitude, intersection_geo_rad.longitude);
        this.markers.intersection.geo_deg.set(intersection_geo_deg.latitude, intersection_geo_deg.longitude);
        this.request_map_update();
    }


    /* map updating */
    need_update_map: boolean = false;
    request_map_update()
    {
        this.log('request update map');
        this.need_update_map = true;
    }
    start_map_updating()
    {
        setInterval(() =>
        {
            if(this.need_update_map)
            {
                this.need_update_map = false;
                this.update_map();
            }
        }, 2500);
    }

    update_map()
    {
        let new_zoom = this.get_fit_zoom_level();
        this.log("new_zoom: ", new_zoom);
        this.map_controller.zoom = new_zoom.zoom;
        this.coord_sys.intersection_cs_transform.set_transform(
            -new_zoom.x_shift/this.km_per_svg_pixel,
            new_zoom.y_shift/this.km_per_svg_pixel,
            //0,0,
            this.coord_sys.intersection_cs_transform.angle, 1/this.km_per_svg_pixel,1/this.km_per_svg_pixel, false);
        let dist = (new_zoom.x_shift **2  + new_zoom.y_shift ** 2)**0.5;
        let angle = Math.atan2(new_zoom.x_shift, new_zoom.y_shift);
        

        let center = {latitude: this.markers.intersection.geo_rad.latitude, longitude: this.markers.intersection.geo_rad.longitude };
        //console.log("dist: ", dist, ", angle: ", angle * 180 / Math.PI, " for center: ", Geometry.geopoint_to_deg(center));


        let new_center = MathExt.geopoint_rad2deg(GeoMath.coords_by_distance_azimuth(center, dist, angle));
        //console.log("new center: ", new_center.latitude, ",", new_center.longitude);
        this.map_controller.center = new_center;
        this.map_controller.update_url();
        //this.coord_sys.intersection_cs_transform.set_zoom(1/this.km_per_svg_pixel);

        //this.map_controller.update_url();
    }
    get_fit_zoom_level(): { zoom: number, x_shift: number, y_shift: number }
    {
        let coords = [
            this.markers.entry.field_cs,
            this.markers.intersection.field_cs,
            this.markers.observation.field_cs
        ].map(p => this.coord_sys.only_rotate_transform.convert_to(p));
        let x_all = coords.map(p => p.x);        
        let x_max = Math.max(...x_all);
        let x_min = Math.min(...x_all);
        let x_range =x_max - x_min;
        //console.log('x_range: ',x_range, ', x_all:', x_all);
        let y_all = coords.map(p => p.y);
        let y_max = Math.max(...y_all);
        let y_min = Math.min(...y_all);
        let y_range =y_max - y_min;
        //console.log('y_range: ',y_range, ', y_all:', y_all);

        // km_per_pixel == some/zoom
        // some = 
        let new_size_km = 1.1*Math.max(x_range,  y_range);
        this.log('new_size_km: ', new_size_km);
        let new_zoom = Math.floor(this.map_controller.get_max_zoom(new_size_km));
        this.log('new_zoom: ', new_zoom);
        return { zoom: new_zoom, x_shift: 0.5*(x_max + x_min), y_shift: 0.5*(y_max + y_min) };
    }

    $refs!: {
        svg: HTMLFormElement
    }
    client_size():{width:number, height: number} {
        if(this.$refs.svg == undefined)
            return {width: 200, height: 200};
        let svg:HTMLFormElement = this.$refs.svg;
        
        return {width: svg.clientWidth, height: svg.clientHeight};
    }
}

</script>

