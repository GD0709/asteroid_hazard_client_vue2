<template>
    <v-container>
        <!--<v-row>
            <v-col md="6" sm="12" style="background: red;">1
            </v-col>
            <v-col md="6" sm="12" style="background: green;">2
            </v-col>
        </v-row>-->


        

        <v-row style="margin:0px 0px -24px 0px;">
            <h4>{{$t("calculator.headers.Observation point")}}</h4>
        </v-row>
        <v-row>

            <v-col md="6" sm="12">
                <v-container>
                    <v-row>
                        <field-input
                        :log_slider="false"
                        v-model="state.observation_point_inputs.along_across.along"
                        id="basic.op.along"
                        :min="-3000"
                        :max="3000"
                        :rules="input_rules.input_along_across"
                        :label="$t('calculator.input.labels.distance along')"
                        :dimension="$t('calculator.dimensions.km')"
                        prefix="y ="
                        />
                    </v-row>
                </v-container>
            </v-col>
            <v-col md="6" sm="12">
                <v-container>
                    <v-row>
                        <field-input
                        :log_slider="false"
                        id="basic.op.across"
                        v-model="state.observation_point_inputs.along_across.across"
                        :min="-3000"
                        :max="3000"
                        :rules="input_rules.input_along_across"
                        :label="$t('calculator.input.labels.distance across')"
                        :dimension="$t('calculator.dimensions.km')"
                        prefix="x ="
                        />
                    </v-row>
                </v-container>
            </v-col>
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
                        :dimension="$t('calculator.dimensions.km')"
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
                        :dimension="$t('calculator.dimensions.angle')"
                        prefix="𝜓 ="
                        />
                    </v-row>
                </v-container>
            </v-col>
        </v-row> 

        <v-row>

            <v-col md="6" sm="12">
                <v-container>
                    <v-row>
                        <field-input
                        :log_slider="false"
                        id="basic.op.y"
                        v-model="state.observation_point.y"
                        :min="-3000"
                        :max="3000"
                        :rules="input_rules.input_along_across"
                        label="real y"
                        dimension="km"
                        prefix="y ="
                        />
                    </v-row>
                </v-container>
            </v-col>
            <v-col md="6" sm="12">
                <v-container>
                    <v-row>
                        <field-input
                        :log_slider="false"
                        id="basic.op.x"
                        v-model="state.observation_point.x"
                        :min="-3000"
                        :max="3000"
                        :rules="input_rules.input_along_across"
                        label="real x"
                        dimension="km"
                        prefix="x ="
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
import State from '@/components/model/State'
import InpuRules from '@/components/calculator/input/InputRules'

@Component({
    components: {
        FieldInput
    }
})
export default class ObservationPointTest extends Vue {

    mounted()
    {
    }
    // Density
    state: State = State.state;
    input_rules = InpuRules;
}
</script>

<style>

</style>