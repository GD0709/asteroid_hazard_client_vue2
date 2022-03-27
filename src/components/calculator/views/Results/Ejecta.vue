
<template>    
    <v-expansion-panel  class="result">
        <v-expansion-panel-header v-slot="{ open }">
            <div class="level_line_header"></div>
            <v-row no-gutters>
                <v-col cols="4" class="header_caption">
                    <span class="icon ah-ejecta alert_level_0"/>
                    {{$t('calculator.results.ejecta.Ejecta')}}
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
                        <span v-if="state.variant.diameter < crater.diameter_min">{{$t('calculator.results.ejecta.no ejecta')}}</span>
                        <span v-if="state.variant.diameter >= crater.diameter_min">{{$t('calculator.results.ejecta.Ejecta forming event')}}</span>
                        </span>
                    </v-fade-transition>
                </v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <div v-if="state.variant.diameter < crater.diameter_min">
                {{$t('calculator.results.ejecta.no ejecta')}}
            </div>
            <div v-if="state.variant.diameter >= crater.diameter_min">
                <div class="results_description" v-html="$t('calculator.results.ejecta.description')"></div>
                
                <div class="result_effect">
                    <span class="results_effects_name">{{$t('calculator.results.ejecta.Thickness of ejecta blanket')}}:&nbsp;</span>
                    <span v-html="$power_format(crater.ejecta.ejecta_thickness).html"/><span v-html="$t('calculator.dimensions.m')"/>
                </div>
                <div class="result_effect">
                    <span class="results_effects_name">{{$t('calculator.results.ejecta.Fraction of melt in ejecta')}}:</span>
                    {{$round(crater.ejecta.melted_ejecta_thickness*100, -1)}}%
                </div>
              
            </div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

import State from '@/components/model/State';
import { Crater } from '@/components/model/Effects/Crater';
import Variant from '@/components/model/Variant';
import Target from '@/components/model/Target';
@Component({
    components: {

    }
})
export default class EjectaResults extends Vue {
    state = State.state;
    Crater = Crater;
    get crater(): Crater{ return this.state.effects.crater; }
    get variant(): Variant {return this.state.variant;}
    get target(): Target {return this.state.target;}
}
</script>

<style>

</style>