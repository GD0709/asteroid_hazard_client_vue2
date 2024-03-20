
<template>    
 <Expansion icon="ah-fire" :title="$t('calculator.results.irradiation.Irradiation')">
            <template v-slot:closed>
                {{$t('calculator.results.irradiation.Thermal exposure')}}:
                {{$dimension_prefix_format(irradiation.point_assesment.thermal_exposure)}}<span v-html="$t('calculator.dimensions.J/cm2')"/>

            </template>
            <template v-slot:content>
                <div class="results_description" v-html="$t('calculator.results.irradiation.description')"></div>
                <div class="result_effect" v-if="state.variant.diameter < 150">
                    <span class="results_effects_name">{{$t('calculator.results.irradiation.Maximal thermal exposure')}}:</span>
                    {{$dimension_prefix_format(irradiation.max_irradiation_energy)}}<span v-html="$t('calculator.dimensions.J/cm2')"/>
                </div>
                <div class="result_effect" v-if="state.variant.diameter < 150">
                    <span class="results_effects_name">{{$t('calculator.results.irradiation.Maximal irradiation flux')}}:</span>
                    {{$dimension_prefix_format(irradiation.max_irradiation_flux)}}<span v-html="$t('calculator.dimensions.W/cm2')"/>
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
                    <span class="results_effects_name">{{$t('calculator.results.irradiation.Maximal thermal flux in the point of observation')}}:</span>
                    {{$dimension_prefix_format(irradiation.point_assesment.thermal_flux)}}<span v-html="$t('calculator.dimensions.W/cm2')"/>
                </div>
            </template>
        </Expansion>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import Expansion from './Expansion.vue'
import math_ext from '@/components/lib/MathExt';
import Radiation from '@/components/model/Effects/Radiation';
import State from '@/components/model/State';
@Component({
    components: {
        Expansion
    }
})
export default class RadiationResults extends Vue {
    state = State.state;
    get irradiation(): Radiation{ return this.state.effects.irradiation; }
}
</script>

<style>

</style>