<template>
    <v-container>
        <v-row>
            <v-col md="6" sm="12">
                <h4>{{$t("calculator.headers.Projectile parameters")}}</h4>

                        <field-input
                        
                        id="basic.diameter"
                        :accuracy="1"
                        :min="15"
                        :max="3000"
                        :rules="input_rules.diameter"
                        :label="$t('calculator.input.labels.diameter')"
                        :dimension="$t('calculator.input.dimensions.diameter')"
                        prefix="D ="
                        v-model="state.variant.diameter"
                        />

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
    
            
            </v-col>
            <v-col md="6" sm="12">
                <h4>{{$t("calculator.headers.Entry parameters")}}</h4>


                    
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
                        v-model="state.variant.angle"
                        id="basic.angle"
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
            </v-col>
        </v-row>

        
        <v-row>
            <v-col md="6" sm="12">
                <h4>{{$t("calculator.headers.Target parameters")}}</h4>
                    <v-col>
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
                                col
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
                    </v-col>
            </v-col>
            <v-col md="6" sm="12">
               <schema/>
            </v-col>
        </v-row>


        <v-row>
            <v-col md="6" sm="12">
                <h4>{{$t("calculator.headers.Entry vector")}}</h4>
        

                    <v-row style="margin-right: 12px; margin-left: -24px">
                        <v-text-field
                            v-model="state.entry_point.latitude"
                            :rules="input_rules.entry_latitude"
                            :label="$t('calculator.input.labels.entry_latitude')+'(' + $t('calculator.input.dimensions.latitude') + ')'"
                            required
                        >
                        </v-text-field>
            

                        <v-text-field
                            v-model="state.entry_point.longitude"
                            :rules="input_rules.entry_longitude"
                            :label="$t('calculator.input.labels.entry_longitude')+'(' + $t('calculator.input.dimensions.longitude') + ')'"
                            required
                        >
                        </v-text-field>
                    </v-row>
                    <v-row>
                        <field-input
                        v-model="state.entry_point.azimuth"
                        id="extended.entry_point.azimuth"
                        :accuracy="0.1"
                        :min="0"
                        :max="360"
                        :rules="input_rules.input_along_across"
                        :label="$t('calculator.input.labels.entry_azimuth')"
                        :dimension="$t('calculator.input.dimensions.azimuth')"
                        />
    <!--               <template v-slot:label>
                        Density (kg/m<sup>3</sup>)
                    </template> -->
                    </v-row>
                    <v-row>
                        <v-tabs
                            v-model="tab"
                            background-color="transparent"
                            grow
                            >
                            <v-tab>
                                Along-across
                            </v-tab>
                            <v-tab>
                                Distance-angle
                            </v-tab>
                            <v-tab>
                                Latitude-Longitude
                            </v-tab>

                            <v-tab-item>
                                
                                <v-col>
                                    <field-input
                                        :log_slider="false"
                                        v-model="state.observation_point_inputs.along_across.along"
                                        :min="-3000"
                                        :max="3000"
                                        :rules="input_rules.input_along_across"
                                        :label="$t('calculator.input.labels.distance along')"
                                        :dimension="$t('calculator.input.dimensions.km')"
                                        prefix="y ="
                                    />
                                    <field-input
                                            :log_slider="false"
                                            v-model="state.observation_point_inputs.along_across.across"
                                            :min="-3000"
                                            :max="3000"
                                            :rules="input_rules.input_along_across"
                                            :label="$t('calculator.input.labels.distance across')"
                                            :dimension="$t('calculator.input.dimensions.km')"
                                            prefix="x ="
                                    />
                                </v-col>
                                
                            </v-tab-item>
                            <v-tab-item>
                                <v-col>
                                    <field-input
                                        :log_slider="false"
                                        v-model="state.observation_point_inputs.distance_angle.distance"
                                        :min="0"
                                        :max="4242"
                                        :rules="input_rules.input_distance"
                                        :label="$t('calculator.input.labels.distance to zp')"
                                        :dimension="$t('calculator.input.dimensions.km')"
                                        prefix="y ="
                                    />
                                    <field-input
                                            :log_slider="false"
                                            v-model="state.observation_point_inputs.distance_angle.angle"
                                            :min="0"
                                            :max="360"
                                            :rules="input_rules.input_along_across"
                                            :label="$t('calculator.input.labels.angle to zp')"
                                            :dimension="$t('calculator.input.dimensions.km')"
                                            prefix="x ="
                                    />
                                </v-col>
                            </v-tab-item>
                            <v-tab-item
                               
                            >
                                <v-card
                                color="basil"
                                flat
                                >
                                <v-card-text>{{ text }}</v-card-text>
                                </v-card>
                            </v-tab-item>

                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            
                        </v-tabs-items>

                    
                                    
                                        <!-- <field-input
                                            :log_slider="false"
                                            v-model="state.observation_point_inputs.along_across.along"
                                            :min="-3000"
                                            :max="3000"
                                            :rules="input_rules.input_along_across"
                                            :label="$t('calculator.input.labels.distance along')"
                                            :dimension="$t('calculator.input.dimensions.km')"
                                            prefix="y ="
                                            />
                                            <field-input
                                                :log_slider="false"
                                                v-model="state.observation_point_inputs.along_across.across"
                                                :min="-3000"
                                                :max="3000"
                                                :rules="input_rules.input_along_across"
                                                :label="$t('calculator.input.labels.distance across')"
                                                :dimension="$t('calculator.input.dimensions.km')"
                                                prefix="x ="
                                                />
                                     -->
                               
                    </v-row>
            </v-col>
            <v-col md="6" sm="12">
                <Map/>
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
import Schema from './Schema.vue';
import Map from './Map.vue';

@Component({
    components: {
        FieldInput,
        Schema,
        Map
    }
})
export default class ExtendedInput extends Vue {

    mounted()
    {
        //console.log('ExtendedInput mounted', this.state.variant.to_string());
    }
    // Density
    state: State = State.state;
    input_rules = InpuRules;
    tab = null;
    items=['Appetizers', 'Entrees', 'Deserts', 'Cocktails']
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
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