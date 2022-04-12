<template>
    <v-container>
        <v-row no-gutters>
            <ProjectileInput/>
            <EntryInput/>
        </v-row>

        

        <v-row style="margin:0px 0px -24px 0px;">
            <h3>{{$t("calculator.headers.Observation point")}}</h3>
        </v-row>
        <v-row>

            <v-col md="6" sm="12">
                <v-container>
                    <v-row>
                        <field-input
                        :log_slider="true"
                        v-model="state.observation_point_inputs.distance_angle.distance"
                        id="basic.op.distance"
                        :min="0"
                        :max="4242"
                        :rules="input_rules.input_distance"
                        :label="$t('calculator.inputs.observation point.distance angle.distance')"
                        :help_title="$t('calculator.inputs.observation point.distance angle.distance help title')"
                        :help_text="$t('calculator.inputs.observation point.distance angle.distance help')"
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
                            :min="0"
                            :max="360"
                            :rules="input_rules.input_along_across"
                            :label="$t('calculator.inputs.observation point.distance angle.angle')"
                            :help_title="$t('calculator.inputs.observation point.distance angle.angle help title')"
                            :help_text="$t('calculator.inputs.observation point.distance angle.angle help')"
                            :dimension="$t('calculator.dimensions.degree')"
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
import ProjectileInput from './Projectile.vue'
import EntryInput from './EntryInput.vue'
@Component({
    components: {
        FieldInput,
        ProjectileInput,
        EntryInput
    }
})
export default class BasicInput extends Vue {

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