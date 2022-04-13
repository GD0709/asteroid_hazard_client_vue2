<template>
     <div style="margin:20px;" class="calculator">
         <div class="tab_input_mode_switcher_placer">
            <div class="tab_input_mode_switcher">
                <v-tabs
                    v-model="state.visual_settings.input_mode"
                    background-color="transparent"
                    grow
                    >
                    <v-tab>
                        {{$t('calculator.headers.basic')}}
                    </v-tab>
                    <v-tab>
                        {{$t('calculator.headers.extended')}}
                    </v-tab>

                </v-tabs>
             </div>

         </div>
        
        <BasicInput v-show="state.visual_settings.input_mode == InputModes.basic"/>
        <ExtendedInput v-show="state.visual_settings.input_mode == InputModes.extended"/>
        <input-summary/>
        <results/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync, Watch } from 'vue-property-decorator';
import BasicInput from "../components/calculator/views/Input/BasicInput.vue";
import ExtendedInput from "../components/calculator/views/Input/ExtendedInput.vue";

import InputSummary from '@/components/calculator/views/InputSummary.vue';
import Results from '@/components/calculator/views/Results/Results.vue'
import State from '@/components/model/State';
import {ZeroPoints} from '../components/model/Observation';

import {VisualSettings, InputModes} from '@/components/model/VisualSettings';
@Component({
    components: {
        BasicInput,
        ExtendedInput,
        InputSummary,
        Results
    }
})
export default class Calculator extends Vue {
    state: State = State.state;
    InputModes = InputModes;

    @Watch('state.visual_settings.input_mode')
    on_input_mode_changed(val: number, old_val: number)
    {
        if(this.state.visual_settings.input_mode == InputModes.basic)
            this.state.observation_point_inputs.relative_to = ZeroPoints.surface_intersection;
        
    }

}
</script>

<style>

</style>