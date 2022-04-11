
<template>   
    <Expansion icon="ah-ejecta" :title="$t('calculator.results.ejecta.Ejecta')">
        <template v-slot:closed>
            <span v-if="state.variant.diameter < crater.diameter_min">{{$t('calculator.results.ejecta.no ejecta')}}</span>
            <span v-if="state.variant.diameter >= crater.diameter_min">{{$t('calculator.results.ejecta.Ejecta forming event')}}</span>
                    
        </template>
        <template v-slot:content>
            
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
        </template>
    </Expansion> 
    
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import Expansion from './Expansion.vue'

import State from '@/components/model/State';
import { Crater } from '@/components/model/Effects/Crater';
import Variant from '@/components/model/Variant';
import Target from '@/components/model/Target';
@Component({
    components: {
        Expansion
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