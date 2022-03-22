/* import MathExt from '@/components/lib/MathExt';
import { Point } from "../Geometry";
import Variant from "../Variant";
import { IEffectAssesment } from "./EffectsAssessment";

export default class Crater implements IEffectAssesment
{
    calc_variant(variant: Variant): void {
        
    }


    k1 = {
        2650: 0.93,
        1600: 1.03
    };
    mu = {
        2650: 0.55,
        1600: 0.41,
    };
    EM = {
        2650: 5.2 * 10**6,
        1600: 5*10**6
    };
    D_STAR = 3000; //# m

    D_min: number = 0;

    D_min_calc(variant: Variant): number
    {
        return 70 / Math.sin(variant.angle_rad) * (3320 / self.target_density) ** (2./3.)
    }
} */