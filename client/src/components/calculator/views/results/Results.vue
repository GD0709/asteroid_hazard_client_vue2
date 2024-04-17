<template>
    <div class="flex_col">
        <h2>{{$t('calculator.results.title')}}</h2>
        <v-expansion-panels variant="popout" multiple>
            <SchockWave/>
            <!-- <Irradiation/>
            <Crater/>
            <Ejecta/>
            <Seismic/>
            <AtmosphericDisturbances/> -->
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
    import SchockWave from "./ShockWave.vue"
</script>


<style scoped lang="scss">
</style>