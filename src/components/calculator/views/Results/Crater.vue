
<template>
        <Expansion icon="ah-crater" :title="$t('calculator.results.crater.Crater')">
            <template v-slot:closed>
                <span v-if="state.variant.diameter < crater.diameter_min">{{$t('calculator.results.crater.no crater')}}</span>
                <span v-if="state.variant.diameter >= crater.diameter_min">{{$t('calculator.results.crater.Crater forming event')}}</span>
                        
            </template>
            <template v-slot:content>
                <div v-if="state.variant.diameter < crater.diameter_min">
                    {{$t('calculator.results.crater.no crater')}}
                </div>
                <div v-if="state.variant.diameter >= crater.diameter_min">
                    <h3>{{$t('calculator.results.crater.transient.Transient crater parameters')}}</h3>
                    <div class="results_description" v-html="$t('calculator.results.crater.transient.description')"></div>
                    
                    <div class="result_effect">
                        <span class="results_effects_name">{{$t('calculator.results.crater.transient.Transient crater size')}}:</span>
                        {{$dimension_prefix_format(crater.transient_size)}}<span v-html="$t('calculator.dimensions.m')"/>
                    </div>
                    <div class="result_effect">
                        <span class="results_effects_name">{{$t('calculator.results.crater.transient.Transient crater depth')}}:</span>
                        {{$dimension_prefix_format(crater.transient_depth)}}<span v-html="$t('calculator.dimensions.m')"/>
                    </div>

                    <h3>{{$t('calculator.results.crater.final.Final crater parameters')}}</h3>
                    <div class="results_description" v-html="$t('calculator.results.crater.final.description')"></div>
                    
                    <div class="result_effect">
                        <span class="results_effects_name">{{$t('calculator.results.crater.final.Crater type')}}:</span>
                        {{$t('calculator.results.crater.final.' + 
                    ['simple', 'complex']
                        [crater.crater_type])}}
                    </div>

                    <div class="result_effect">
                        <span class="results_effects_name">{{$t('calculator.results.crater.final.Final crater diameter')}}:</span>
                        {{$dimension_prefix_format(crater.final_size)}}<span v-html="$t('calculator.dimensions.m')"/>
                    </div>
                    <div class="result_effect">
                        <span class="results_effects_name">{{$t('calculator.results.crater.final.Depth of a final crater')}}:</span>
                        {{$dimension_prefix_format(crater.final_depth)}}<span v-html="$t('calculator.dimensions.m')"/>
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
@Component({
    components: {
Expansion
    }
})
export default class CraterResults extends Vue {
    state = State.state;
    get crater(): Crater{ return this.state.effects.crater; }
}
</script>

<style>

</style>