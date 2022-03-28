
<template>    
    <v-expansion-panel  class="result">
        <v-expansion-panel-header v-slot="{ open }">
            <div class="level_line_header"></div>
            <v-row no-gutters>
                <v-col cols="4" class="header_caption">
                    <span class="icon ah-agw alert_level_0"/>
                    {{$t('calculator.results.atmospheric_disturbances.Atmospheric disturbances')}}
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
                        {{$t('calculator.results.atmospheric_disturbances.Peak amplitude of relative density oscillations at an altitude of 300 km')}}:
                        {{$round(atmospheric_disturbances.peak_amplitude_of_relative_density_oscillations_at_an_altitude_of_300_km)}}
                        
                        </span>
                    </v-fade-transition>
                </v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
   
            <div class="results_description" v-html="$t('calculator.results.atmospheric_disturbances.description')"></div>
                
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.atmospheric_disturbances.Peak amplitude of relative temperature oscillations at an altitude of 100 km')}}:&nbsp;</span>
                <span v-html="$round(atmospheric_disturbances.peak_amplitude_of_relative_temperature_oscillations_at_an_altitude_of_100_km)"/>
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.atmospheric_disturbances.Peak amplitude of relative density oscillations at an altitude of 300 km')}}:&nbsp;</span>
                <span v-html="$round(atmospheric_disturbances.peak_amplitude_of_relative_density_oscillations_at_an_altitude_of_300_km)"/>
            </div>

        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

import State from '@/components/model/State';
import AtmosphericDisturbances from '@/components/model/Effects/AtmosphericDisturbances';
import Variant from '@/components/model/Variant';
import Target from '@/components/model/Target';
@Component({
    components: {

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