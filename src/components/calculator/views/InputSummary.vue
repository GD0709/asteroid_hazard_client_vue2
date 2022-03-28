<template>
    <v-card
    elevation="2"
    shaped
    >
    <v-row style="margin:20px;">
        <v-col cols="12" md="4">
            <v-card-title>{{$t("calculator.headers.Projectile parameters")}}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.diameter.label')}}: </span>
                <span class="input_parameter_value">{{state.variant.diameter}} {{$t('calculator.dimensions.m')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.density.label')}}: </span>
                <span class="input_parameter_value">{{state.variant.density}} <span v-html="$t('calculator.dimensions.kg/m3')"></span></span>
            </div>
            <div  v-if="state.visual_settings.is_debug">
                <span class="input_parameter_name">{{$t('calculator.input_summary.energy')}}: </span>
                <span class="input_parameter_value">{{state.variant.kenergy}} {{$t('calculator.dimensions.J')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input_summary.energy')}}: </span>
                <span class="input_parameter_value">
                    {{$dimension_prefix_format(state.variant.kenergy)}}{{$t('calculator.dimensions.J')}}
                    (<span v-html="$power_format(state.variant.kenergy).html"/> {{$t('calculator.dimensions.J')}})
                </span>
            </div>
            <div  v-if="state.visual_settings.is_debug">
                <span class="input_parameter_name">energy_tnt: </span>
                <span class="input_parameter_value">{{state.variant.kenergy_kttnt}} ktTNT</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.input_summary.energy_tnt')}}: </span>
                <span class="input_parameter_value">
                    {{$dimension_prefix_format(1000.*state.variant.kenergy_kttnt)}}{{$t('calculator.dimensions.t tnt')}}
                    (<span v-html="$power_format(1000.*state.variant.kenergy_kttnt).html"/> {{$t('calculator.dimensions.t tnt')}})
                </span>
            </div>
        </v-col>
        <v-col cols="12" md="4">
            <v-card-title>{{$t("calculator.headers.Entry parameters")}}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.velocity.label')}}: </span>
                <span class="input_parameter_value">{{state.variant.velocity}} {{$t('calculator.dimensions.km/s')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.entry angle.label')}}: </span>
                <span class="input_parameter_value">{{state.variant.angle}}{{$t('calculator.dimensions.degree')}}</span>
            </div>
            <div v-if="state.visual_settings.input_mode == 'extended'">
                <span class="input_parameter_name">{{$t('calculator.inputs.entry vector.latitude')}}: </span>
                <span class="input_parameter_value">{{state.entry_point.latitude}}{{$t('calculator.dimensions.degree')}}</span>
            </div>
            <div v-if="state.visual_settings.input_mode == 'extended'">
                <span class="input_parameter_name">{{$t('calculator.inputs.entry vector.longitude')}}: </span>
                <span class="input_parameter_value">{{state.entry_point.longitude}}{{$t('calculator.dimensions.degree')}}</span>
            </div>
            <div v-if="state.visual_settings.input_mode == 'extended'">
                <span class="input_parameter_name">{{$t('calculator.inputs.entry vector.azimuth')}}: </span>
                <span class="input_parameter_value">{{state.entry_point.azimuth}}{{$t('calculator.dimensions.degree')}}</span>
            </div>


            <v-card-title>{{$t("calculator.headers.Target parameters")}}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.target type.label')}}: </span>
                <span class="input_parameter_value">
                    {{ $t('calculator.inputs.target type.' + {1600: 'sand', 2650: 'rock'}[state.target.target_density]) }} (ρ = {{state.target.target_density}} <span v-html="$t('calculator.dimensions.kg/m3')"></span>)</span>
            </div>
        </v-col>
        <v-col cols="12"  md="4">
            <v-card-title>{{$t("calculator.headers.Observation point")}}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.zero point.label')}}: </span>
                <span class="input_parameter_value">{{ 
                   $t('calculator.inputs.zero point.' + 
                   ['entry point 100km', 'max overpressure point', 'surface intersection', 'max thermal effect point']
                    [state.observation_point_inputs.relative_to-1])}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.observation point.distance angle.distance')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.distance_angle.distance,1)}} {{$t('calculator.dimensions.km')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.observation point.distance angle.angle')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.distance_angle.angle,1)}}{{$t('calculator.dimensions.degree')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.observation point.along across.along')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.along_across.along,1)}} {{$t('calculator.dimensions.km')}}</span>
            </div>
            <div>
                <span class="input_parameter_name">{{$t('calculator.inputs.observation point.along across.across')}}: </span>
                <span class="input_parameter_value">{{math_ext.round_decimal_digits_to_string(state.observation_point_inputs.along_across.across,1)}} {{$t('calculator.dimensions.km')}}</span>
            </div>
            <div  v-if="state.visual_settings.is_debug">
                <span class="input_parameter_name">main point: </span>
                <span class="input_parameter_value">x: {{state.observation_point_inputs.main_point.x}}, y: {{state.observation_point_inputs.main_point.y}}</span>
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
        this.formatted_energy_tnt = this.power_format(this.state.variant.kenergy_kttnt*1000);
    }
    // Density
    state: State = State.state;

    formatted_energy: {mult: string, power: string, power_n: number} = {mult: "-", power: '', power_n: 0};
    formatted_energy_tnt: {mult: string, power: string, power_n: number} = {mult: "-", power: '', power_n: 0};

    power_format(n: number)
    {
        let power = Math.floor(Math.log10(n));
        let mult = MathExt.round_by_digits_to_string(n / 10**power, 3);
        return { mult, power: power.toString(), power_n: power };
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
