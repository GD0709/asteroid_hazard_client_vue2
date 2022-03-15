import { Point } from "../Geometry";
import { ObservationPointInput } from "../Observation";
import Variant from "../Variant";
import RadiationEffects from "./Radiation";
import ShockWaveEffects from "./ShockWave";

interface IEffectAssesment{
    calc_variant(variant: Variant): void;
}

class Effects {
    static variant_update_timeout = 500;
    static point_update_timeout = 1000;
    debug: boolean = true;
    log(...data: any[])
    {
        if(this.debug == true)
            console.log("Effects ", ...data);
    }


    variant: Variant;
    observation_point_input: ObservationPointInput;
    constructor(variant: Variant, observation_point_input: ObservationPointInput)
    {
        this.variant = variant;
        this.variant.changed.on(async s => { this.last_variant_change  = new Date().getTime(); this.update_fast(); });
        this.observation_point_input = observation_point_input;
        this.observation_point_input.main_point.changed.on(async () => { this.last_point_change  = new Date().getTime();});
        setInterval(() => this.update(), Effects.variant_update_timeout);
        this.update();
    }

    private last_variant_change: number = -1;
    private last_point_change: number = -1;

    shock_wave: ShockWaveEffects = new ShockWaveEffects();
    irradiation: RadiationEffects = new RadiationEffects();

    update_fast(){
        this.shock_wave.calc_heff_and_zero_point(this.variant);
        this.irradiation.calc_hrad_and_zero_point(this.variant);

    }

    update() {
        let time = new Date().getTime();
        if(this.last_variant_change != 0 && time - this.last_variant_change >= Effects.variant_update_timeout)
        {
            this.shock_wave.calc_variant(this.variant);
            this.irradiation.calc_variant(this.variant);
            this.last_variant_change = 0;
            this.log('variant updated');
        }
        /* if(this.last_point_change != 0 && time - this.last_point_change >= Effects.point_update_timeout)
        {
            this.shock_wave.calc_effect(this.observation_point_input.main_point);
            this.irradiation.calc_effect(this.observation_point_input.main_point);

            console.log('updated point effects');
            this.last_point_change = 0;
        } */
    }

}
export { Effects, IEffectAssesment }