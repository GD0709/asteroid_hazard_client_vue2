import MathExt from "../lib/MathExt";
import RadiationEffects from "./Effects/Radiation";
import ShockWaveEffects from "./Effects/ShockWave";
import { Point } from "./Geometry";
import Variant from "./Variant";

enum ZeroPoints { entry_point_100km = 1, max_overpressure_point = 2,  surface_intersection = 3, max_thermal_effect_point = 4 }

class ObservationPointInput extends Point
{
    debug: boolean = false;
    log(...data: any[])
    {
        if(this.debug == true)
            console.log("ObservationPointInput:", ...data);
    }
    main_point: Point;
    variant: Variant;
    constructor(main_point: Point,variant: Variant)
    {
        super();
        this.main_point = main_point;
        this.main_point.changed.on(s => { console.log("main_point changed at OPI; set OPI", s.to_string()); this.set_xy(s.x, s.y - this.shift_y); });
        this.variant = variant;
        this.update_shift();
        this.changed.on(s => { console.log("OPI changed at OPI; set main_point", s.to_string()); this.main_point.set_xy(this.x, this.y + this.shift_y); });
        this.variant.changed.on(s => this.update_shift());
    }

    _relative_to: ZeroPoints = ZeroPoints.surface_intersection;
    get relative_to() { return this._relative_to; } 
    set relative_to(relative_to: ZeroPoints) { if(this._relative_to != relative_to) { this._relative_to = relative_to; this.update_shift(); } }


    // this is shift relative to zero_point and center 
    //shift_x: number = 0;
    shift_y: number = 0;

    async update_shift(): Promise<void> {
        if (this.relative_to == ZeroPoints.surface_intersection)
        {
            //this.shift_x = 0;
            this.shift_y = 0;
            this.log(`relative to set: ${this.relative_to} surface_intersection and shift: ${this.shift_y}`);
        }
        else if(this.relative_to == ZeroPoints.max_overpressure_point)
        {
            let shock = new ShockWaveEffects();
            shock.calc_heff_and_zero_point(this.variant);
            //this.shift_x = 0;
            this.shift_y = shock.zero_point;
            this.log(`relative to set: ${this.relative_to} max_overpressure_point and shift: ${this.shift_y}`);
        }
        else if(this.relative_to == ZeroPoints.max_thermal_effect_point)
        {
            let rad = new RadiationEffects();
            rad.calc_hrad_and_zero_point(this.variant);
            //this.shift_x = 0;
            this.shift_y = rad.zero_point;
            this.log(`relative to set: ${this.relative_to} max_thermal_effect_point and shift: ${this.shift_y}`);
        } 
        else if(this.relative_to == ZeroPoints.entry_point_100km)
        {
            //this.shift_x = 0;
            this.shift_y = 100./ Math.tan(MathExt.deg2rad(this.variant.angle))
            this.log(`relative to set: ${this.relative_to} entry_point_100km and shift: ${this.shift_y}`);
        }
        
        this.set_xy(this.main_point.x, this.main_point.y - this.shift_y);
    }

    
    along_across: ObservationPointAlongAcross = new ObservationPointAlongAcross(this);
    //distance_angle= {distance: 0, angle:0 };
    distance_angle: ObservationPointDistanceAngle = new ObservationPointDistanceAngle(this);
}


class ObservationPointAlongAcross {
    private input: ObservationPointInput;
    constructor (input: ObservationPointInput)
    {
        this.input = input;
    }

    get along(): number { return -this.input.y; } set along(val : number) { if(!isNaN(val)) { this.input.y = -val; }}
    get across(): number { return this.input.x; } set across(val : number) { if(!isNaN(val)) { this.input.x = val; } }
}

class ObservationPointDistanceAngle {
    private input: ObservationPointInput;
    constructor (input: ObservationPointInput)
    {
        this.input = input;
    }

    get distance(): number { return (this.input.x**2 + this.input.y**2)**0.5; } 
    set distance(val : number) 
    {
        if(!isNaN(val)) 
        {
            let angle = Math.atan2(this.input.x, -this.input.y);
            this.input.set_xy(val * Math.sin(angle), -val * Math.cos(angle));
        }
    }
    static fix_quartile(angle_rad: number): number
    {
        while(angle_rad < 0)
            angle_rad += 2*Math.PI;
        while(angle_rad >= 2*Math.PI)
            angle_rad -= 2*Math.PI;
        return angle_rad;
    }
    static calc_angle(point: Point): number {
        return MathExt.rad2deg(ObservationPointDistanceAngle.fix_quartile(Math.atan2(point.x, -point.y)));
    }
    get angle(): number { return ObservationPointDistanceAngle.calc_angle(this.input); } 
    set angle(val : number) 
    { 
        if(!isNaN(val)) 
        { 
            let distance = this.distance;
            let a = MathExt.deg2rad(val);
            this.input.set_xy(distance * Math.sin(a), -distance * Math.cos(a));
        } 
    }
}

export {ObservationPointInput, ObservationPointAlongAcross, ObservationPointDistanceAngle, ZeroPoints}