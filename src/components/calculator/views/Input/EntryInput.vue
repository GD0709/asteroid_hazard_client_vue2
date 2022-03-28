<template>
    <v-col cols="12" md="6" no-gutters class="pl-md-3 no-gutters">
        <h3>{{$t("calculator.headers.Entry parameters")}}</h3>
            <field-input
                v-model="state.variant.velocity"
                id="basic.velocity"
                :accuracy="0.1"
                :min="12"
                :max="72"
                :rules="input_rules.velocity"
                :label="$t('calculator.inputs.velocity.label')"
                :help_title="$t('calculator.inputs.velocity.label')"
                :help_text="$t('calculator.inputs.velocity.help')"
                :dimension="$t('calculator.dimensions.km/s')"
                prefix="V ="
                />

                <field-input
                v-model="state.variant.angle"
                id="basic.angle"
                :accuracy="0.1"
                :min="15"
                :max="90"
                :rules="input_rules.entry_angle"
                :label="$t('calculator.inputs.entry angle.label')"
                :help_title="$t('calculator.inputs.entry angle.label')"
                :help_text="$t('calculator.inputs.entry angle.help')"
                :dimension="$t('calculator.dimensions.degree')"
                prefix="α ="
                />
        
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
export default class EntryInput extends Vue {

    
    state: State = State.state;
    input_rules = InpuRules;
    
}
</script>