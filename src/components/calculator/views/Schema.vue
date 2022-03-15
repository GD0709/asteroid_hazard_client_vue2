<template>
    <v-col>
        <svg viewBox="0 0 200 100"  preserveAspectRatio="xMidYMid meet"  overflow="visible" ref="svg">
            <symbol id="icon_entry"  preserveAspectRatio="xMidYMid meet" viewBox="16 16 32 32" overflow="visible">
                    <g class="marker_figure">
                        <circle cx="16" cy="16" r="16" 
                                style="fill: var(--marker_back, #d3d3d32d); stroke: var(--marker_stroke, black);"
                                ></circle> 
                        <text x="16" y="16" dy="0.33em" text-anchor="middle" class="icon"  stroke="none" fill="#ededed"
                            style="fill: var(--icon_color, black);" >
                            &#xe902;
                        </text>
                    </g>
                </symbol>
                <symbol id="icon_shockwave"  preserveAspectRatio="xMidYMid meet" viewBox="16 16 32 32" overflow="visible">
                    <g class="marker_figure">
                        <circle cx="16" cy="16" r="16" 
                                style="fill: var(--marker_back, #d3d3d32d); stroke: var(--marker_stroke, black);"                            
                                ></circle> 
                        <text x="16" y="16" dy="0.33em" text-anchor="middle" class="icon"  stroke="none" fill="#ededed"
                            style="fill: var(--icon_color, black);" >
                            &#xe904;
                        </text>
                    </g>
                </symbol>
                <symbol id="icon_thermal"  preserveAspectRatio="xMidYMid meet" viewBox="16 16 32 32" overflow="visible">
                    <g class="marker_figure">
                        <circle cx="16" cy="16" r="16" 
                                style="fill: var(--marker_back, #d3d3d32d); stroke: var(--marker_stroke, black);"                            
                                ></circle>
                        <text x="16" y="16" dy="0.33em" text-anchor="middle" class="icon"  stroke="none" fill="#ededed"
                            style="fill: var(--icon_color, black);" >
                            &#xe9a9;
                        </text>
                    </g>
                </symbol>

                <svg x="0" y="0" viewBox="-20 -90 200 100" width="200" height="100" preserveAspectRatio="xMidYMid meet"  overflow="hidden">

                <!-- trajectory -->
                <line style="stroke: rgb(175, 175, 175); stroke-dasharray: 4px;" x1="0" y1="0" :x2="airburst_point.x" :y2="-airburst_point.x * Math.tan(state.variant.angle_rad)"></line>
                <line style="stroke: rgb(175, 175, 175);" :x1="airburst_point.x" :y1="-airburst_point.x * Math.tan(state.variant.angle_rad)" :x2="false_entry.x" :y2="-false_entry.y"></line>



                <!-- entry -->
                <use class="use_marker meteoroid" :x="false_entry.x" :y="-false_entry.y" height="16" width="16" xlink:href="#icon_entry" :transform="'rotate('+ (-state.variant.angle+55)+' '+ false_entry.x + ' ' + (-false_entry.y) + ')'"></use>
 

                <!-- radiation -->
                <g class="effects_group hover_shadow_back" @mouseover="radiation_hover = true" @mouseout="radiation_hover = false">
                    <line class="sizes_line" :x1="irradiation_point.x" y1="0" :x2="irradiation_point.x" :y2="- irradiation_point.y"></line>    
                    <use class="use_marker" :x="irradiation_point.x" :y="- irradiation_point.y" height="16" width="16" xlink:href="#icon_thermal"></use> 
                </g>


                <!-- shock wave -->
                <g class="effects_group" @mouseover="shock_wave_hover = true" @mouseout="shock_wave_hover = false">
                    <line class="sizes_line" :x1="airburst_point.x" y1="0" :x2="airburst_point.x" :y2="- airburst_point.y"></line>    
                    <use class="use_marker" :x="airburst_point.x" :y="- airburst_point.y" height="16" width="16" xlink:href="#icon_shockwave"></use>
                </g>
                

                <!-- radiation -->
                <g class="effects_group hover_shadow"  @mouseover="radiation_hover = true" @mouseout="radiation_hover = false">
                    <line class="sizes_line" :x1="irradiation_point.x" y1="0" :x2="irradiation_point.x" :y2="- irradiation_point.y"></line>    
                    <use class="use_marker" :x="irradiation_point.x" :y="- irradiation_point.y" height="16" width="16" xlink:href="#icon_thermal"></use>
                </g>
                <circle style="fill: rgb(231, 231, 231); stroke: rgb(179, 179, 179); stroke-width: 6px; fill-opacity: 0.42;" cx="0" cy="6400" r="6400"></circle>

                
<!--                 <path d="M0 -500 V 1000" stroke="green" stroke-width="0.5" stroke-opacity="0.5" />
                <path d="M-500 0 H 1000" stroke="green" stroke-width="0.5" stroke-opacity="0.5" /> -->
            </svg>


        </svg>
    </v-col>
</template>


<script lang="ts">
import State from '@/components/model/State';
import { Component, Prop, Vue, Model, ModelSync } from 'vue-property-decorator';

@Component
export default class Schema extends Vue {
    debug: boolean = true;
    log(...data: any[])
    {
        if(this.debug == true)
            console.log("schema ", ...data);
    }

    @Prop({default: 200}) size!: number;

    shock_wave_hover: boolean = false;
    radiation_hover: boolean = false;
    
    get entry(){return { x:100./Math.tan(this.state.variant.angle_rad), y: 100};}

    get false_entry(){
        let crit_angle = Math.atan( (100-10)/(200-20))/Math.PI * 180;
        if(this.state.variant.angle < crit_angle)
            return {x:200-20-10, y: (200-20-10) * Math.tan(this.state.variant.angle_rad)};
        else return {y:100-10-10, x: (100-10-10) / Math.tan(this.state.variant.angle_rad)};
    }


    get airburst_point() {return {x: this.state.effects.shock_wave.zero_point, y: this.state.effects.shock_wave.heff};}
    get irradiation_point() {return {x: this.state.effects.irradiation.zero_point, y: this.state.effects.irradiation.hrad};}

    $refs!: {
        svg: HTMLFormElement
    }

    state: State = State.state;
    
    

    client_size():{width:number, height: number} {
        if(this.$refs.svg == undefined)
            return {width: 200, height: 200};
        let svg:HTMLFormElement = this.$refs.svg;
        
        return {width: svg.clientWidth, height: svg.clientHeight};
    }

    mounted(){
        this.log("mounted ", this.client_size(), this.$refs.svg.clientWidth);
        this.state = State.state;
    }
}
</script>

<style scoped lang="scss">
    
   


</style>