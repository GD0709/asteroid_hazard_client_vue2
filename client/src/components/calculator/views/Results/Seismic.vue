
<template>  

    <Expansion icon="ah-seismic" :title="$t('calculator.results.seismic.Seismic effect')">
        <template v-slot:closed>
            {{$t('calculator.results.seismic.Magnitude')}}:
            {{$dimension_prefix_format(seismic.richter_scale_magnitude)}}
                        
        </template>
        <template v-slot:content>
            <div class="results_description" v-html="$t('calculator.results.seismic.description')"></div>
                
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.seismic.Richter scale magnitude of the impact event')}}:&nbsp;</span>
                <span v-html="$round(seismic.richter_scale_magnitude, -1)"/>
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.seismic.Mercally scale intensity')}}:&nbsp;</span>
                <span v-html="Seismic.Ieff_to_string(seismic.mercally_scale_intensity)"/>
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.seismic.The peak ground velocity')}}:</span>
                {{$round(seismic.PGV)}} <span v-html="$t('calculator.dimensions.cm/s')"/>
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.seismic.The peak ground acceleration')}}:</span>
                {{$round(seismic.PGA)}} <span v-html="$t('calculator.dimensions.cm/s2')"/>
            </div>
            <div class="result_effect">
                <span class="results_effects_name">{{$t('calculator.results.seismic.The peak ground acceleration')}}:</span>
                {{$math_ext.seconds_to_string(seismic.arrival_time)}}
            </div>    
        </template>
    </Expansion>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import Expansion from './Expansion.vue'
import State from '@/components/model/State';
import Seismic from '@/components/model/Effects/Seismic';
import Variant from '@/components/model/Variant';
import Target from '@/components/model/Target';
@Component({
    components: {
Expansion
    }
})
export default class SeismicResults extends Vue {
    state = State.state;
    Seismic = Seismic;

    get seismic(): Seismic{ return this.state.effects.seismic; }
    //get variant(): Variant {return this.state.variant;}
}
</script>

<style>

</style>