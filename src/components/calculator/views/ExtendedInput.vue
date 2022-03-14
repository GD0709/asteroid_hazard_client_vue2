<template>
    <v-container>
        <v-row>
            <v-col md="6" sm="12">
                <h4>{{$t("calculator.headers.Projectile parameters")}}</h4>
                <v-container>
                    
                    <v-row>
                        <field-input
                        v-model="state.variant.diameter"
                        id="basic.diameter"
                        :accuracy="1"
                        :min="15"
                        :max="3000"
                        :rules="input_rules.diameter"
                        :label="$t('calculator.input.labels.diameter')"
                        :dimension="$t('calculator.input.dimensions.diameter')"
                        prefix="D ="
                        />
                    </v-row>
                    <v-row>
                        <field-input
                        v-model="state.variant.density"
                        id="basic.density"
                        :accuracy="1"
                        :min="500"
                        :max="4000"
                        :rules="input_rules.density"
                        :label="$t('calculator.input.labels.density')"
                        :dimension="$t('calculator.input.dimensions.density')"
                        prefix="ρ ="
                        />
    <!--               <template v-slot:label>
                        Density (kg/m<sup>3</sup>)
                    </template> -->
                    </v-row>
                </v-container>
            </v-col>
            <v-col md="6" sm="12">
                <h4>{{$t("calculator.headers.Entry parameters")}}</h4>
                <v-container>

                    
                    <v-row>
                        <field-input
                        v-model="state.variant.velocity"
                        id="basic.velocity"
                        :accuracy="0.1"
                        :min="15"
                        :max="72"
                        :rules="input_rules.velocity"
                        :label="$t('calculator.input.labels.velocity')"
                        :dimension="$t('calculator.input.dimensions.velocity')"
                        prefix="V ="
                        />
                    </v-row>
                    <v-row>
                        <field-input
                        v-model="state.variant.entry_angle"
                        id="basic.entry_angle"
                        :accuracy="0.1"
                        :min="15"
                        :max="90"
                        :rules="input_rules.entry_angle"
                        :label="$t('calculator.input.labels.entry_angle')"
                        :dimension="$t('calculator.input.dimensions.entry_angle')"
                        prefix="α ="
                        />
    <!--               <template v-slot:label>
                        Density (kg/m<sup>3</sup>)
                    </template> -->
                    </v-row>
                </v-container>
            </v-col>
        </v-row>

        
        <v-row>
            <v-col md="6" sm="12">
                <h4>{{$t("calculator.headers.Target parameters")}}</h4>
        

                <v-container>
                    <v-row>
                        <div >
                            <label class="radio_label theme--light" style="">{{$t('calculator.input.labels.target type')}}</label>
                            <v-radio-group class="radio_with_label"
                                v-model="state.target.target_density"
                                row
                                >
                                <v-radio
                                    :label="$t('calculator.input.labels.rock')"
                                    :value="2650"
                                ></v-radio>
                                <v-radio
                                    :label="$t('calculator.input.labels.sand')"
                                    :value="1600"
                                ></v-radio>
                            </v-radio-group>
                        </div>

                        <div >
                            <label class="radio_label theme--light" style="">{{$t('calculator.input.labels.zero point')}}</label>
                            <v-radio-group class="radio_with_label"
                                v-model="state.observation_point_inputs.relative_to"
                                row
                                >
                                <v-radio
                                    :label="$t('calculator.input.labels.surface_intersection')"
                                    :value="3"
                                ></v-radio>
                                <v-radio
                                    :label="$t('calculator.input.labels.max_overpressure_point')"
                                    :value="2"
                                ></v-radio>
                                <v-radio
                                    :label="$t('calculator.input.labels.max_thermal_effect_point')"
                                    :value="4"
                                ></v-radio>
                                <v-radio
                                    :label="$t('calculator.input.labels.entry_point_100km')"
                                    :value="1"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                    </v-row>
                </v-container>
            </v-col>
            <v-col md="6" sm="12">
 2               
            </v-col>
        </v-row>



        <v-row style="margin:0px 0px -24px 0px;">
            <h4>{{$t("calculator.headers.Observation point")}}</h4>
        </v-row>
        <v-row>

            <v-col md="6" sm="12">
                <v-container>
                    <v-row>
                        <field-input
                        :log_slider="false"
                        v-model="state.observation_point_inputs.distance_angle.distance"
                        id="basic.op.distance"
                        :min="0"
                        :max="4242"
                        :rules="input_rules.input_distance"
                        :label="$t('calculator.input.labels.distance to zp')"
                        :dimension="$t('calculator.input.dimensions.km')"
                        prefix="L ="
                        />
                    </v-row>
                </v-container>
            </v-col>
            <v-col md="6" sm="12">
                <v-container>
                     <v-row>
                        <field-input
                        :log_slider="false"
                        v-model="state.observation_point_inputs.distance_angle.angle"
                        id="basic.op.angle"
                        :min="0"
                        :max="360"
                        :label="$t('calculator.input.labels.angle to zp')"
                        :dimension="$t('calculator.input.dimensions.angle')"
                        prefix="𝜓 ="
                        />
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FieldInput from '@/components/calculator/input/FieldInput.vue';
import State from '@/components/model/State';
import InpuRules from '@/components/calculator/input/InputRules';

@Component({
    components: {
        FieldInput
    }
})
export default class ExtendedInput extends Vue {

    mounted()
    {
    }
    // Density
    state: State = State.state;
    input_rules = InpuRules;
}
</script>

<style scoped lang="scss">
    .radio_with_label{
        margin-top: 0px;
    }
    .radio_label{
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            color: rgb(0, 0, 0,0.6);
            margin-left: -12px;
    }
</style>