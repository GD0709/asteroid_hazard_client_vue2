<template>
     <div style="margin:20px;">
        <basic-input/> 
        <input-summary/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import BasicInput from "../components/calculator/views/BasicInput.vue";

import InputSummary from '@/components/calculator/views/InputSummary.vue';
@Component({
    components: {
        BasicInput,
        InputSummary
    }
})
export default class Calculator extends Vue {


}
</script>

<style>

</style>