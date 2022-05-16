<template>
    <div>
        <v-row no-gutters>
            <ProjectileInput/>
            <EntryInput/>
        </v-row>


        <v-row>
            <h3>{{$t("calculator.headers.Observation point")}}</h3>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6" no-gutters class="pr-md-3 no-gutters">

                <field-input
                :log_slider="true"
                v-model="state.observation_point_inputs.distance_angle.distance"
                id="basic.op.distance"
                :min="0"
                :max="4242"
                :rules="input_rules.input_distance"
                :label="$t('calculator.inputs.observation point.distance angle.distance by zeropoint.entry point 100km.distance')"
                :help_title="$t('calculator.inputs.observation point.distance angle.distance by zeropoint.entry point 100km.help title')"
                :help_text="$t('calculator.inputs.observation point.distance angle.distance by zeropoint.entry point 100km.help')"
                :dimension="$t('calculator.dimensions.km')"
                prefix="L ="
                />

            </v-col>
            <v-col cols="12" md="6" no-gutters class="pr-md-3 no-gutters">

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

            </v-col>
        </v-row>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FieldInput from '../../input/FieldInput.vue';
import State from '../../../model/State';
import InpuRules from '../../input/InputRules';
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