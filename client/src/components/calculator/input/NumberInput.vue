<template>
    <div class="calculator_input italic_prefix number_input">
        <div style="position:relative">
            <div style="position: absolute;font-size: 12px;white-space: nowrap;" :class="{ 'text-primary': text_is_focused }">
                <span v-html="label"></span> (<span v-html="dimension"></span>)
            </div>

        </div>
        <v-text-field
            variant="underlined"
            :placeholder="placeholder"
            v-model="text_value" 
            @blur="text_is_focused = false"
            @focus="text_is_focused = true"
            required                
            :rules="rules"
            :prefix="prefix"
            @update:model-value="text_modelValue"
        >
        
        </v-text-field>
        
    </div>

</template>



<script setup lang="ts">
import { assertCatchClause } from '@babel/types';
import { ref, watch } from 'vue'
import { computed } from 'vue';


interface Props {
    id:string

    prefix?:string
    rules?:Array<((v: any) => string | true)>

    label?:string
    dimension?:string
    placeholder?:string


    accuracy?: number
}
const props = withDefaults(defineProps<Props>(), {
    prefix: "",
    rules: () => new Array<(v: any) => string | true>(),

    label: "",
    dimension: "",
    placeholder: "",

    accuracy: 0.01,
})

    const is_debug = ref(false)
    const text_is_focused = ref(false)
    const model_value = defineModel('value')

    let setting_value: string|null = null;   
    let text_value = ref("")

    const emit = defineEmits<{
            value_updated: [value: number]
        }>()



    watch(model_value, (newValue, oldValue) => {
            console.log(props.id, " watch on model_value ", newValue, " ", oldValue);


            if (typeof newValue === 'number'){
                if (!isNaN(newValue)) {
                    let newValueString = (newValue as number).toFixed(props.accuracy);
                    if (setting_value == null || newValueString != setting_value)
                        value_set_text(newValueString);
                }
            }
    },{ immediate: true })

    // text input
    function text_modelValue(value: string):void {
        if (is_debug.value) {
            console.log(props.id, " text:", value, " text_value:", text_value.value)
        }
        let parsed = parseFloat(value);
        if(!isNaN(parsed)) {
            setting_value = parsed.toFixed(props.accuracy);
            //parsed = Math.round(parsed / props.accuracy) * props.accuracy;
            //emit('value_updated', setting_value)
            model_value.value = setting_value;
        }
    }


    function value_set_text(value: string) {
        if (is_debug.value) {
            console.log(props.id, " value_set_text:", value, " text_value:", text_value.value)
        }
        text_value.value = value;
    }
    // const set_value = (value: number) => {
    //     if (is_debug.value) {
    //         console.log(props.id, "call set_value value:", value);
    //     }
    //     value_set_text(value);
        
    // }

    // defineExpose({
    //     set_value
    // })

</script>


<style scoped lang="scss">
.v-text-field__prefix{
    font-style: italic;
}
.number_input{
    display: flex;
    flex-grow: 1;
    flex-direction: row;
}
</style>