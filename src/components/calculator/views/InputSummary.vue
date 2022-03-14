<template>
    <v-card
    elevation="2"
    shaped
    >
    <v-row style="margin:20px;">
        <v-col>
            <v-card-title>{{$t("calculator.headers.Projectile parameters")}}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.diameter')}}: </span>
                <span class="input_parameter_value">{{state.variant.diameter}} {{$t('calculator.input.dimensions.diameter')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.density')}}: </span>
                <span class="input_parameter_value">{{state.variant.density}} {{$t('calculator.input.dimensions.density')}}</span>
            </div>
            <div  v-if="state.is_debug">
                <span class="input_parameter_name">{{$t('calculator.input_summary.energy')}}: </span>
                <span class="input_parameter_value">{{state.variant.kenergy}} {{$t('calculator.input.dimensions.energy')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input_summary.energy')}}: </span>
                <span class="input_parameter_value">
                    {{prefixed_energy.mult}} 
                    <span v-if="prefixed_energy.power_n != 0">
                    {{$t('calculator.input.dimensions.prefix.' + prefixed_energy.power)}}{{$t('calculator.input.dimensions.energy')}}</span>
                    (
                    {{formatted_energy.mult}} 
                    <span v-if="formatted_energy.power_n != 0">* 10<sup>{{formatted_energy.power}}</sup></span>
                     {{$t('calculator.input.dimensions.energy')}}</span>)
            </div>
            <div  v-if="state.is_debug">
                <span class="input_parameter_name">{{$t('calculator.input_summary.energy_tnt')}}: </span>
                <span class="input_parameter_value">{{state.variant.kenergy_kttnt}} ktTNT</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input_summary.energy_tnt')}}: </span>
                <span class="input_parameter_value">
                    {{prefixed_energy_tnt.mult}} 
                    <span v-if="prefixed_energy_tnt.power_n != 0">
                    {{$t('calculator.input.dimensions.prefix.' + prefixed_energy_tnt.power)}}{{$t('calculator.input.dimensions.tnt')}}</span>
                    (
                    {{formatted_energy_tnt.mult}} 
                    <span v-if="formatted_energy_tnt.power_n != 0">* 10<sup>{{formatted_energy_tnt.power}}</sup></span>
                     {{$t('calculator.input.dimensions.tnt')}}</span>)
            </div>
        </v-col>
        <v-col>
            <v-card-title>{{$t("calculator.headers.Entry parameters")}}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.velocity')}}: </span>
                <span class="input_parameter_value">{{state.variant.velocity}} {{$t('calculator.input.dimensions.velocity')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.entry_angle')}}: </span>
                <span class="input_parameter_value">{{state.variant.entry_angle}}{{$t('calculator.input.dimensions.entry_angle')}}</span>
            </div>
        </v-col>
        <v-col>
            <v-card-title>{{$t("calculator.headers.Observation point")}}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.zero point')}}: </span>
                <span class="input_parameter_value">{{ 
                   $t('calculator.input.labels.' + 
                   ['entry_point_100km', 'max_overpressure_point', 'surface_intersection', 'max_thermal_effect_point']
                    [state.observation_point_inputs.relative_to-1])}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.angle to zp')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.distance_angle.angle,1)}}{{$t('calculator.input.dimensions.angle')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.distance to zp')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.distance_angle.distance,1)}} {{$t('calculator.input.dimensions.km')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.distance along')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.along_across.along,1)}} {{$t('calculator.input.dimensions.km')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input.labels.distance across')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.along_across.across,1)}} {{$t('calculator.input.dimensions.km')}}</span>
            </div>
        </v-col>
    </v-row>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import State from '@/components/model/State'
import MathExt from '@/components/lib/MathExt';

@Component({
    components: {
        
    }
})
export default class InputSummary extends Vue {

    math_ext = MathExt;
    mounted()
    {
        this.state.variant.changed.on(s => {
            this.variant_changed();
        });
        this.variant_changed();
    }
    variant_changed()
    {
            this.formatted_energy = this.power_format(this.state.variant.kenergy);
            this.prefixed_energy = this.dim_prefix_format(this.state.variant.kenergy);
            this.formatted_energy_tnt = this.power_format(this.state.variant.kenergy_kttnt*1000);
            this.prefixed_energy_tnt = this.dim_prefix_format(this.state.variant.kenergy_kttnt*1000);
    }
    // Density
    state: State = State.state;

    formatted_energy: {mult: string, power: string, power_n: number} = {mult: "-", power: '', power_n: 0};
    prefixed_energy: {mult: string, power: string, power_n: number}= {mult: "-", power: '', power_n: 0};
    formatted_energy_tnt: {mult: string, power: string, power_n: number} = {mult: "-", power: '', power_n: 0};
    prefixed_energy_tnt: {mult: string, power: string, power_n: number}= {mult: "-", power: '', power_n: 0};

    power_format(n: number)
    {
        let power = Math.floor(Math.log10(n));
        let mult = MathExt.round_by_digits_to_string(n / 10**power, 3);
        return { mult, power: power.toString(), power_n: power };
    }

    dim_prefix_format(n: number)
    {
        let real_power = Math.floor(Math.log10(n));
        let rest_power = real_power % 3;
        let power = real_power-rest_power;

        let mult = MathExt.round_by_digits_to_string(n / 10**power, 3);

        return {mult, power: power.toString(), power_n: power };
    }

}
</script>

<style scoped lang="scss">
    .input_parameter_name {
        font-style: normal;
        font-size: 12pt;

    }
    .input_parameter_value {
        font-style: italic;
        font-size: 12pt;
    }
</style>
