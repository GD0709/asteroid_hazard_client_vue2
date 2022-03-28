<template>
    <div v-on:click="click"><slot/></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

import State from '@/components/model/State';
import {VisualSettings} from './model/VisualSettings';
@Component({
    components: {

    }
})
export default class DebugSwitcher extends Vue {
    visual: VisualSettings = State.state.visual_settings;

    timeout: number = 1000;
    last_click: number = 0;
    count: number = 0;
    click()
    {
        let now = Date.now();
        if(now - this.last_click > this.timeout)
        {
            this.count = 0;
        }
        this.last_click = now;
        this.count++;
        if(this.count >= 5)
            this.visual.is_debug = !this.visual.is_debug;
    }
}
</script>

<style scoped lang="scss">

</style>