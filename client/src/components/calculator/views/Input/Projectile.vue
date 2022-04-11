<template>
    <v-col cols="12" md="6" no-gutters class="pr-md-3 no-gutters">
        <h3>{{$t("calculator.headers.Projectile parameters")}}</h3>

            <field-input
                
                id="basic.diameter"
                :accuracy="1"
                :min="15"
                :max="3000"
                :rules="input_rules.diameter"
                :label="$t('calculator.inputs.diameter.label')"
                :help_title="$t('calculator.inputs.diameter.label')"
                :help_text="$t('calculator.inputs.diameter.help')"
                :dimension="$t('calculator.dimensions.m')"
                prefix="D ="
                v-model="state.variant.diameter"
                >
<!--                         <template slot="help">
                    Hello slot
                </template> -->
            </field-input>

                <field-input
                v-model="state.variant.density"
                id="basic.density"
                :accuracy="1"
                :min="500"
                :max="4000"
                :rules="input_rules.density"
                :label="$t('calculator.inputs.density.label')"
                :help_title="$t('calculator.inputs.density.label')"
                :help_text="$t('calculator.inputs.density.help')"
                :dimension="$t('calculator.dimensions.kg/m3')"
                prefix="ρ ="
                >
            </field-input>
    </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FieldInput from '@/components/calculator/input/FieldInput.vue';
import State from '@/components/model/State';
import InpuRules from '@/components/calculator/input/InputRules';
import Help from '@/components/calculator/input/help.vue';

@Component({
    components: {
        FieldInput,
        Help
    }
})
export default class ProjectileInput extends Vue {

    
    state: State = State.state;
    input_rules = InpuRules;
    
}
</script>