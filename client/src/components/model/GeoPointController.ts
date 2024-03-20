
import MathExt from "../lib/MathExt";
import { GeoMath, GeoPoint, GeoVector, Point } from "./Geometry";
import { ObservationPointDistanceAngle } from "./Observation";
import Variant from "./Variant";


class GeoPointController
{
    // input
    variant: Variant;
    entry_point_geo: GeoVector;
    observation_point: Point;


    // calc 1
    entry_point: Point;


    // calc 2
    intersection_point_geo: GeoPoint;
    observation_point_geo: GeoPoint;
    

    constructor(    variant: Variant,
    entry_point_geo: GeoVector,
    observation_point: Point)
    {

        this.variant = variant;
        this.observation_point = observation_point;
        this.entry_point_geo = entry_point_geo;


        this.entry_point = new Point();
        this.intersection_point_geo = new GeoPoint();
        this.observation_point_geo = new GeoPoint();

        this.last_setted_observation_point_geo = new GeoPoint();
        this.last_setted_observation_point = new Point();

        this.entry_point_recalc();

        this.variant.changed.on(s => this.entry_point_recalc());
      
        this.entry_point_geo.changed.on(s => this.intersection_point_geo_recalc());
        this.entry_point.changed.on(s => this.intersection_point_geo_recalc());


        this.intersection_point_geo.changed.on(s => this.observation_point_geo_recalc(false));
        this.observation_point.changed.on(s => this.observation_point_geo_recalc(true));

        this.observation_point_geo.changed.on(s => this.observation_point_recalc(true));
    }


    async entry_point_recalc():Promise<void> {
        this.entry_point.set_xy(0, 100.0 / Math.tan(this.variant.angle_rad));

    }

    async intersection_point_geo_recalc() :Promise<void> {

        var res = GeoMath.coords_by_distance_azimuth({
            latitude: this.entry_point_geo.latitude,
            longitude: this.entry_point_geo.longitude
        }, this.entry_point.y*1000, (180+this.entry_point_geo.azimuth));
        this.intersection_point_geo.set(res.latitude, res.longitude);

    }

    async observation_point_geo_recalc(check: boolean) : Promise<void> {
        if (check) {
            if (Math.abs(this.last_setted_observation_point.x - this.observation_point.x)< 0.000001 &&
            Math.abs(this.last_setted_observation_point.y - this.observation_point.y)< 0.000001)
            {
                console.log("observation_point_geo_recalc ignoring");
                return;
            } else {
                console.log("observation_point_geo_recalc not !!! ignoring - recalc ",
                Math.abs(this.last_setted_observation_point.x - this.observation_point.x),
                Math.abs(this.last_setted_observation_point.y - this.observation_point.y)
                );
            }
        }

        var distance = Math.sqrt(
            Math.pow(this.observation_point.x, 2) + 
            Math.pow(this.observation_point.y, 2)
        );
        var angleObs_deg = ObservationPointDistanceAngle.calc_angle(this.observation_point);
        
        let bearing_from_intersection_to_observastion = 360-90 - angleObs_deg;

        var res = GeoMath.coords_by_distance_azimuth({
            latitude: this.intersection_point_geo.latitude,
            longitude: this.intersection_point_geo.longitude
        }, distance*1000., bearing_from_intersection_to_observastion);

        this.last_setted_observation_point.set_point_silent(this.observation_point);
        this.last_setted_observation_point_geo.set_wo_notify(res.latitude, res.longitude);
        this.observation_point_geo.set_wo_notify(res.latitude, res.longitude);

        var tmp = "data = <|List -> { <|Coords -> {"+ this.entry_point_geo.latitude +", "+this.entry_point_geo.longitude+"}, Name -> "+ "\"entry_point_geo\""+ "|>,";
        tmp += "<|Coords -> {"+ this.intersection_point_geo.latitude +", "+this.intersection_point_geo.longitude+"}, Name -> "+ "\"intersection_point_geo\""+ "|>,";
        tmp += "<|Coords -> {"+ this.observation_point_geo.latitude +", "+this.observation_point_geo.longitude+"}, Name -> "+ "\"observation_point_geo\""+ "|>}, ";
        tmp += "Distance-> " + distance + ", Angle-> " + angleObs_deg + ", ";
        tmp += "BearingFromIntersectionToObservastion-> " + bearing_from_intersection_to_observastion + ", ";
        tmp += "observation_point-> {" + this.observation_point.x + ", " + this.observation_point.y + "}";
        tmp += "|>;";

        console.log(tmp);

    }

    last_setted_observation_point_geo: GeoPoint;
    last_setted_observation_point: Point;

    async observation_point_recalc(fire: boolean) : Promise<void> {
 
        if (Math.abs(this.last_setted_observation_point_geo.latitude - this.observation_point_geo.latitude)< 0.000001 &&
        Math.abs(this.last_setted_observation_point_geo.longitude - this.observation_point_geo.longitude)< 0.000001)
        {
            console.log("observation_point_recalc ignoring");
            return;
        }
        else 
        {
            console.log("observation_point_recalc CALC ", Math.abs(this.last_setted_observation_point_geo.latitude - this.observation_point_geo.latitude), Math.abs(this.last_setted_observation_point_geo.longitude - this.observation_point_geo.longitude));
        }
        let distance = GeoMath.calc_distance(this.intersection_point_geo, this.observation_point_geo);
        let initial_bearing_from_intersection_to_observation = GeoMath.initial_bearing_to(this.intersection_point_geo, this.observation_point_geo);
        let observation_angle = 360-90-initial_bearing_from_intersection_to_observation;

        this.last_setted_observation_point.set_point_silent({x: distance * Math.sin(MathExt.deg2rad(observation_angle)), y: (-1)*distance * Math.cos(MathExt.deg2rad(observation_angle))});
        this.last_setted_observation_point_geo.set_wo_notify(this.observation_point_geo.latitude, this.observation_point_geo.longitude);
        this.observation_point.set_xy(this.last_setted_observation_point.x, this.last_setted_observation_point.y);

        let tmp = "data3 = <|Distance-> " + distance + ", ObservationAngle-> " + observation_angle;
        tmp += ", initial_bearing_from_intersection_to_observation->" + initial_bearing_from_intersection_to_observation;


        tmp += ", x->" + distance * Math.sin(MathExt.deg2rad(observation_angle)) + ", y->" + (-1)*distance * Math.cos(MathExt.deg2rad(observation_angle));

        tmp += ", List -> { <|Coords -> {"+ this.entry_point_geo.latitude +", "+this.entry_point_geo.longitude+"}, Name -> "+ "\"entry_point_geo\""+ "|>,";
        tmp += "<|Coords -> {"+ this.intersection_point_geo.latitude +", "+this.intersection_point_geo.longitude+"}, Name -> "+ "\"intersection_point_geo\""+ "|>,";
        tmp += "<|Coords -> {"+ this.observation_point_geo.latitude +", "+this.observation_point_geo.longitude+"}, Name -> "+ "\"observation_point_geo\""+ "|>}";

        tmp +="|>";
        console.log(tmp);
        
        // var distance = GeoMath.calc_distance(this.observation_point_geo, this.intersection_point_geo);
        // var angleObs_rad = GeoMath.angle_in_triangle(this.observation_point_geo, this.intersection_point_geo, this.entry_point_geo);
        // console.log(" observation_point_recalc:", this.observation_point_geo.to_string(), " and ", this.intersection_point_geo.to_string(), ":", MathExt.rad2deg(angleObs_rad));

        // let newX = -Math.sin(angleObs_rad) * distance;
        // let newY = Math.cos(angleObs_rad) * distance;
        
        // console.log("new x and y ", newX, " ", newY, " angle ", MathExt.rad2deg(angleObs_rad), " rad:", angleObs_rad);

    //     var azimuth_rad = GeoMath.azimuth_calc(this.observation_point_geo, this.intersection_point_geo);
    //     var azimuth_deg = MathExt.rad2deg(azimuth_rad);
    //    console.log("inter -> observ",MathExt.rad2deg(GeoMath.azimuth_calc(this.intersection_point_geo, this.observation_point_geo)));
    //    console.log("observ -> inter",MathExt.rad2deg(GeoMath.azimuth_calc(this.observation_point_geo, this.intersection_point_geo)));
    //     let angleObs_deg = 90-azimuth_deg +this.entry_point_geo.azimuth + 180;
       
    //    console.log(angleObs_deg);


    }

    static fix_quartile(angle_deg: number): number
    {
        while(angle_deg < 0)
            angle_deg += 360;
        while(angle_deg >= 360)
            angle_deg -= 360;
        return angle_deg;
    }
}



export {GeoPointController}