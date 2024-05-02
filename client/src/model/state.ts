import { GeoPoint, GeoVector, Point } from "../../../core/model/Geometry";
import Variant from "../../../core/model/Variant";
import {VisualSettings} from "./VisualSettings";
import Target from "../../../core/model/Target"
import { ObservationPointInput } from "../../../core/model/Observation";
import { Effects } from "../../../core/model/Effects/EffectsAssessment";
import { GeoPointController } from "../../../core/model/GeoPointController";

export default class State
{
    constructor() {
      
    }
    static state: State = new State();

    visual_settings: VisualSettings = new VisualSettings();
    
    entry_point_geo: GeoVector = new GeoVector("entry_point_geo", 54.445, 64.565, 103.3);
    target: Target = new Target();


    variant: Variant = new Variant("variant");

    observation_point: Point = new Point("observation_point_abs", 0,50);
    observation_point_inputs: ObservationPointInput = new ObservationPointInput(this.observation_point, this.variant);


    geo_points_controller: GeoPointController = new GeoPointController(this.variant, this.entry_point_geo, this.observation_point);
    observation_point_geo: GeoPoint = this.geo_points_controller.observation_point_geo;

    along_across = this.observation_point_inputs.along_across;
    
    effects: Effects = new Effects(this.variant, this.target, this.observation_point_inputs);
}
