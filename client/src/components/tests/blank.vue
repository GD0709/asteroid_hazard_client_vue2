<template>
    
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

import State from '@/components/model/State';
@Component({
    components: {

    }
})
export default class Blank extends Vue {
    state: State = State.state;
}
</script>

<style scoped lang="scss">

</style>