<template>
    <div style="margin:20px;">
        <FieldInput ref="fi1" :accuracy="0.01"  
        v-model:value="localvalue" id="text1" label="Diametr" prefix="D = " dimension="m" placeholder="19" 
        help_text="help very long text" help_title="diametr"
        @value_updated="text1_value_updated_handler"/>
        <!-- <FieldInput :log_slider="true" v-model="localvalue" id="text2" 
            :min="15"
            :max="3000"/>  -->
        value:{{localvalue}}
        <v-btn v-on:click="test()">set 123</v-btn>
        <v-btn v-on:click="test56()">set 56</v-btn>
        <v-slider
            min="0"
            max="100"
            step="0.1"
            >                        
        </v-slider>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FieldInput from '../input/FieldInput.vue';
  const dialog = ref(false)

  defineProps<{
    help_text?: string
    help_title?: string
  }>()
  const localvalue = ref(0)

    const fi1 = ref<InstanceType<typeof FieldInput> | null>(null)

    const openModal = () => {
        //fi1.value?.set_value(123)
        localvalue.value=123;
    }



  
    function test()
    {
        openModal();
    } 
    function  test56()
    {
        localvalue.value = 56.6548912;
    } 


    const text1_value_updated_handler = (val: number) => {
        console.log("parent form: text1 updates value ",val)
    }

</script>
