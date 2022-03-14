<template>
     <div style="margin:20px;">
        <ExtendedInput/> 
        <input-summary/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import BasicInput from "../components/calculator/views/BasicInput.vue";
import ExtendedInput from "../components/calculator/views/ExtendedInput.vue";

import InputSummary from '@/components/calculator/views/InputSummary.vue';
@Component({
    components: {
        BasicInput,
        ExtendedInput,
        InputSummary
    }
})
export default class Calculator extends Vue {


}
</script>

<style>

</style>