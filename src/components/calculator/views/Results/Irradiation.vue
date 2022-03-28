
<template>    
    <v-expansion-panel  class="result">
        <v-expansion-panel-header v-slot="{ open }">
            <div class="level_line_header"></div>
            <v-row no-gutters>
                <v-col cols="4" class="header_caption">
                    <span class="icon ah-fire alert_level_0"/>
                    {{$t('calculator.results.irradiation.Irradiation')}}
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
                            {{$t('calculator.results.irradiation.Thermal exposure')}}:
                            {{$dimension_prefix_format(irradiation.point_assesment.thermal_exposure)}}<span v-html="$t('calculator.dimensions.J/cm2')"/>

                        </span>
                    </v-fade-transition>
                </v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <div class="results_description" v-html="$t('calculator.results.irradiation.description')"></div>
            <div class="result_effect" v-if="state.variant.diameter < 150">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Maximal thermal exposure')}}:</span>
                 {{$dimension_prefix_format(irradiation.max_irradiation_energy)}} <span v-html="$t('calculator.dimensions.J/cm2')"/>
            </div>
            <div class="result_effect" v-if="state.variant.diameter < 150">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Maximal irradiation flux')}}:</span>
                 {{$dimension_prefix_format(irradiation.max_irradiation_flux)}} <span v-html="$t('calculator.dimensions.W/cm2')"/>
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Radiation altitude')}}:</span>
                 {{$round(irradiation.hrad)}}  {{$t('calculator.dimensions.km')}}
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Radiation pulse duration')}}:</span>
                 {{$round(irradiation.trad)}}  {{$t('calculator.dimensions.s')}}
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Radiation efficiency')}}:</span>
                 {{$round(irradiation.eta)}}%
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Distance to the center')}}:</span>
                 {{$round(irradiation.zero_point)}} {{$t('calculator.dimensions.km')}}
            </div>


             <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Thermal exposure in the point of observation')}}:</span>
                 {{$dimension_prefix_format(irradiation.point_assesment.thermal_exposure)}}<span v-html="$t('calculator.dimensions.J/cm2')"/>
            </div>
            <div class="result_effect" v-if="state.variant.diameter < 150">
                <span class="results_effects_name">{{$t('calculator.results.irradiation.Thermal flux in the point of observation')}}:</span>
                 {{$dimension_prefix_format(irradiation.point_assesment.thermal_flux)}}<span v-html="$t('calculator.dimensions.W/cm2')"/>
            </div>
           
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

import math_ext from '@/components/lib/MathExt';
import Radiation from '@/components/model/Effects/Radiation';
import State from '@/components/model/State';
@Component({
    components: {

    }
})
export default class RadiationResults extends Vue {
    state = State.state;
    get irradiation(): Radiation{ return this.state.effects.irradiation; }
}
</script>

<style>

</style>