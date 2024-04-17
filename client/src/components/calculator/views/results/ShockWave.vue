<template>
    <Expansion icon="ah-shockwave" :title="$t('calculator.results.shockwave.Airblast wave')">
            <template v-slot:closed>
                {{$t('calculator.results.shockwave.Overpressure')}}:
                {{$format.round(shock_wave.point_assesment.overpressure)}} {{$t('calculator.dimensions.atm')}} ({{$format.dimension_prefix_format(1000*shock_wave.overpressure_to_kPa(shock_wave.point_assesment.overpressure))}}{{$t('calculator.dimensions.Pa')}})

            </template>
            <template v-slot:content>
                <div class="results_description" v-html="$t('calculator.results.shockwave.description')"></div>
                <div class="result_effect"><span class="results_effects_name">{{$t('calculator.results.shockwave.Effective altitude')}}: </span>&nbsp;{{$format.round(shock_wave.heff)}} km</div>
                <div class="result_effect" v-if="shock_wave.heff > 0"><span class="results_effects_name" >{{$t('calculator.results.shockwave.Maximal overpressure')}}:</span> {{$format.round(shock_wave.max_value_of_overpressure)}} {{$t('calculator.dimensions.atm')}} {{$format.dimension_prefix_format(1000*shock_wave.overpressure_to_kPa(shock_wave.max_value_of_overpressure))}}{{$t('calculator.dimensions.Pa')}}</div>
                <div class="result_effect" v-if="shock_wave.heff > 0"><span class="results_effects_name">{{$t('calculator.results.shockwave.Distance to the center')}}: </span>&nbsp;{{$format.round(shock_wave.zero_point)}} {{$t('calculator.dimensions.km')}}</div>
                <div class="result_effect" v-if="shock_wave.heff > 0"><div class="results_effects_name" >{{$t('calculator.results.shockwave.Areas')}}: </div>
                
                    <div v-for="([key, value], i) in shock_wave.areas_at" :key="i" class="results_tab">
                        {{$t('calculator.results.common.at')}} {{key}} {{$t('calculator.dimensions.atm')}}: 
                        <span v-if="key > shock_wave.max_value_of_overpressure"> - </span>
                        <span v-if="key <= shock_wave.max_value_of_overpressure">{{$format.round(value.min)}} <span v-if="value.min != value.max"> - {{$format.round(value.max)}}</span> <span v-html="$t('calculator.dimensions.km2')"/></span>
                        
                    </div>
                
                </div>


                <div class="result_effect"><span class="results_effects_name">{{$t('calculator.results.shockwave.The value of the overpressure')}}: </span>&nbsp;{{$format.round(shock_wave.point_assesment.overpressure)}} {{$t('calculator.dimensions.atm')}} ({{$format.dimension_prefix_format(1000*shock_wave.overpressure_to_kPa(shock_wave.point_assesment.overpressure))}}{{$t('calculator.dimensions.Pa')}})</div>
                <div class="result_effect"><span class="results_effects_name">{{$t('calculator.results.shockwave.Maximum wind speed')}}: </span>&nbsp;{{$format.round(shock_wave.point_assesment.max_wind_speed,0)}} {{$t('calculator.dimensions.m/s')}}</div>
            </template>
        </Expansion>
</template>

<script setup lang="ts">
import State from './../../../../model/state';
import Expansion from './Expansion.vue';

import {ref} from 'vue'

let state = ref(State.state)
let shock_wave = ref(State.state.effects.shock_wave)

</script>


<style scoped lang="scss">
</style>