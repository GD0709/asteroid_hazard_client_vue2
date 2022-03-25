
<template>    
    <v-expansion-panel  class="result">
        <v-expansion-panel-header v-slot="{ open }">
            <div class="level_line_header"></div>
            <v-row no-gutters>
                <v-col cols="4" class="header_caption">
                    <span class="icon ah-shockwave alert_level_0"/>
                    {{$t('calculator.results.shockwave.Airblast wave')}}
                </v-col>
                <v-col
                    cols="8"
                    class="text--secondary"
                >
                    <v-fade-transition leave-absolute>
                        <span
                            v-if="open"
                            key="0"
                        >   
                        </span>
                        <span
                            v-else
                            key="1"
                        >
                            {{$t('calculator.results.shockwave.Overpressure')}}:
                            {{$round(shock_wave.point_assesment.overpressure)}} {{$t('calculator.dimensions.atm')}} ({{$dimension_prefix_format(1000*shock_wave.overpressure_to_kPa(shock_wave.point_assesment.overpressure))}}{{$t('calculator.dimensions.Pa')}})

                        </span>
                    </v-fade-transition>
                </v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <div class="results_description" v-html="$t('calculator.results.shockwave.description')"></div>
            <div class="result_effect"><span class="results_effects_name">{{$t('calculator.results.shockwave.Effective altitude')}}: </span>&nbsp;{{$round(shock_wave.heff)}} km</div>
            <div class="result_effect" v-if="shock_wave.heff > 0"><span class="results_effects_name" >{{$t('calculator.results.shockwave.Maximal overpressure')}}:</span> {{$round(shock_wave.max_value_of_overpressure)}} {{$t('calculator.dimensions.atm')}} {{$dimension_prefix_format(1000*shock_wave.overpressure_to_kPa(shock_wave.max_value_of_overpressure))}}{{$t('calculator.dimensions.Pa')}}</div>
            <div class="result_effect" v-if="shock_wave.heff > 0"><span class="results_effects_name">{{$t('calculator.results.shockwave.Distance to the center')}}: </span>&nbsp;{{$round(shock_wave.zero_point)}} {{$t('calculator.dimensions.km')}}</div>
            <div class="result_effect" v-if="shock_wave.heff > 0"><div class="results_effects_name" >{{$t('calculator.results.shockwave.Areas')}}: </div>
            
                <div v-for="([key, value], i) in shock_wave.areas_at" :key="i" class="results_tab">
                    {{$t('calculator.results.common.at')}} {{key}} {{$t('calculator.dimensions.atm')}}: {{$round(value)}} <span v-html="$t('calculator.dimensions.km2')"/>
                </div>
            
            </div>


            <div class="result_effect"><span class="results_effects_name">{{$t('calculator.results.shockwave.The value of the overpressure')}}: </span>&nbsp;{{$round(shock_wave.point_assesment.overpressure)}} {{$t('calculator.dimensions.atm')}} ({{$dimension_prefix_format(1000*shock_wave.overpressure_to_kPa(shock_wave.point_assesment.overpressure))}}{{$t('calculator.dimensions.Pa')}})</div>
            <div class="result_effect"><span class="results_effects_name">{{$t('calculator.results.shockwave.Maximum wind speed')}}: </span>&nbsp;{{$round(shock_wave.point_assesment.max_wind_speed,0)}} {{$t('calculator.dimensions.m/s')}}</div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

import math_ext from '@/components/lib/MathExt';
import ShockWaveEffects from '@/components/model/Effects/ShockWave';
import State from '@/components/model/State';
@Component({
    components: {

    }
})
export default class SchockWaveResults extends Vue {
    state = State.state;
    get shock_wave(): ShockWaveEffects{ return this.state.effects.shock_wave; }
}
</script>

<style>

</style>