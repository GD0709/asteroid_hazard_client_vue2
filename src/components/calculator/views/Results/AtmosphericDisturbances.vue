
<template>  
    <Expansion icon="ah-agw" :title="$t('calculator.results.atmospheric_disturbances.Atmospheric disturbances')">
        <template v-slot:closed>
            {{$t('calculator.results.atmospheric_disturbances.Peak amplitude of relative density oscillations at an altitude of 300 km')}}:
            {{$round(atmospheric_disturbances.peak_amplitude_of_relative_density_oscillations_at_an_altitude_of_300_km)}}
                        
        </template>
        <template v-slot:content>

            <div class="results_description" v-html="$t('calculator.results.atmospheric_disturbances.description')"></div>
                
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.atmospheric_disturbances.Peak amplitude of relative temperature oscillations at an altitude of 100 km')}}:&nbsp;</span>
                <span v-html="$round(atmospheric_disturbances.peak_amplitude_of_relative_temperature_oscillations_at_an_altitude_of_100_km)"/>
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.atmospheric_disturbances.Peak amplitude of relative density oscillations at an altitude of 300 km')}}:&nbsp;</span>
                <span v-html="$round(atmospheric_disturbances.peak_amplitude_of_relative_density_oscillations_at_an_altitude_of_300_km)"/>
            </div>    
        </template>
    </Expansion>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import Expansion from './Expansion.vue'
import State from '@/components/model/State';
import AtmosphericDisturbances from '@/components/model/Effects/AtmosphericDisturbances';
import Variant from '@/components/model/Variant';
import Target from '@/components/model/Target';
@Component({
    components: {
Expansion
    }
})
export default class AtmosphericDisturbancesResults extends Vue {
    state = State.state;

    get atmospheric_disturbances(): AtmosphericDisturbances{ return this.state.effects.atmospheric_disturbances; }
    //get variant(): Variant {return this.state.variant;}
}
</script>

<style>

</style>