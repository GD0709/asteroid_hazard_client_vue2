<template>
     <div style="margin:20px;">
         <field-input :accuracy="0.01"  v-model="value" :id="1" />
        <field-input :accuracy="0.01"  v-model="value" :id="2" /> 
        value:{{value}}
        <v-btn v-on:click="test">set 123</v-btn>
        <v-btn v-on:click="test56">set 56</v-btn>
        <v-slider
            min="0"
            max="100"
            step="0.1"
            >                        
        </v-slider>
        <basic-input/> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import FieldInput from "../components/calculator/input/FieldInput.vue";
import BasicInput from "../components/calculator/views/BasicInput.vue";
@Component({
    components: {
        FieldInput,
        BasicInput
    }
})
export default class Calculator extends Vue {
    


    localvalue: number = 0.;
    get value(): number{ return this.localvalue };
    set value(v: number) {this.localvalue = v; //console.log("value setted ",this.localvalue, v);
    }

    test()
    {
        this.value = 123.6548912;
    } 
    test56()
    {
        this.value = 56.6548912;
    } 

}
</script>

<style>

</style>