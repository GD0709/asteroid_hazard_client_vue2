import { Point } from "./Geometry";
import Variant from "./Variant";
import {ObservationPointInput} from "./Observation";

export default class State
{
    is_debug: boolean = true;
    static state: State = new State();


    variant: Variant = new Variant();

    observation_point: Point = new Point(50,50);
    observation_point_inputs: ObservationPointInput = new ObservationPointInput(this.observation_point, this.variant);
}