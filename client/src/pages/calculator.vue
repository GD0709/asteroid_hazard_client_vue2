<template>
    <div style="" class="calculator">
         <v-container>
            <div class="tab_input_mode_switcher_placer">
                <div class="tab_input_mode_switcher">
                    <v-tabs
                        v-model="state.visual_settings.input_mode"
                        background-color="transparent"
                        color="primary"
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
            <!-- <ExtendedInput v-show="state.visual_settings.input_mode == InputModes.extended"/>
            <input-summary/>
            <results/> -->
        </v-container>
    </div>

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import BasicInput from "../components/calculator/views/input/BasicInput.vue";
import State from '../model/state';
import { InputModes } from '../model/VisualSettings';


const state = ref(State.state)
</script>