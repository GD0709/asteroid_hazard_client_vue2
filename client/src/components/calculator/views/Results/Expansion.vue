<template>
 <v-expansion-panel  class="result">
    <v-expansion-panel-header  v-slot="{ open }">
            <!-- <div class="level_line_header"></div> -->
            <v-row no-gutters class="header_row">
                
                <span class="icon alert_level_0" :class="icon"/>
                
                <v-row no-gutters class="header_text_row">
                    <v-col cols="12" md="4" class="header_caption" >
                        {{title}}
                    </v-col>
                    <v-col
                        cols="12" md="8"
                        class="text--secondary"
                    >
                        <v-fade-transition leave-absolute>
                            <span
                                v-if="open"
                                key="0"
                            >
                                <slot name="opened"/>
                            </span>
                            <span
                                v-else
                                key="1"
                            >
                                <slot name="closed"/>
                            </span>
                        </v-fade-transition>
                    </v-col>
                </v-row>
                
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
             <slot name="content"/>
        </v-expansion-panel-content>
 </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

@Component({
    components: {

    }
})
export default class Expansion extends Vue {
    @Prop({default: "ah-meteoroid"}) icon!: string;
    @Prop({default: "Title"}) title!: string;
    open: number = 0

}
</script>

<style scoped lang="scss">

</style>