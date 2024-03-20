import { GeoPoint, GeoVector, Point } from "./Geometry";
import Variant from "./Variant";
import {ObservationPointInput} from "./Observation";
import {VisualSettings} from "./VisualSettings";
import Target from "./Target";
import { Effects } from "./Effects/EffectsAssessment";
import { GeoPointController } from "./GeoPointController";

export default class State
{
    static state: State = new State();

    visual_settings: VisualSettings = new VisualSettings();
    
    entry_point: GeoVector = new GeoVector(54.445, 64.565, 103.3);
    target: Target = new Target();


    variant: Variant = new Variant();

    observation_point: Point = new Point(50,50);
    observation_point_inputs: ObservationPointInput = new ObservationPointInput(this.observation_point, this.variant);



    geo_points_controller: GeoPointController = new GeoPointController(this.variant, this.entry_point, this.observation_point);
    observation_geo_point: GeoPoint = this.geo_points_controller.observation_point_geo;

    intersection_geo_point: GeoPoint = this.geo_points_controller.intersection_point_geo;
    
    effects: Effects = new Effects(this.variant, this.target, this.observation_point_inputs);
}


