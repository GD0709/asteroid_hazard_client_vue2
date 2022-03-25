<template>
    <div class="flex_col">
        <h2>Results</h2>
        <v-expansion-panels popout focusable multiple>
            <SchockWaveResults/>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';
import State from '@/components/model/State';
import SchockWaveResults from './SchockWave.vue'
@Component({
    components: {
        SchockWaveResults
    }
})
export default class Results extends Vue {
    state: State = State.state;
}
</script>

<style scoped lang="scss">

</style>