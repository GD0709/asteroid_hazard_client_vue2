import { Emitter, IEmitter, INotifyChanged } from "../lib/Events";

class Point implements INotifyChanged<Point> {
    constructor(x?:number, y?: number)
    {
        this._x = x ?? 0;
        this._y = y ?? 0;
    }
    protected _x: number = 0;
    protected _y: number = 0;

    get x():number {return this._x;} set x(x: number) { this._x = 1.*x; this.fire_changed(); }
    get y():number {return this._y;} set y(y: number) { this._y = 1.*y; this.fire_changed(); }


    protected set_xy_notify(x:number, y: number, silent: boolean): boolean{
        if(this.x != x || this.y != y)
        {
            this._x = 1.*x;
            this._y = 1.*y;
            if(silent === false)
                this.fire_changed();
            return true;
        }
        return false;
    }

    set_xy(x:number, y: number): boolean{
        return this.set_xy_notify(x,y, false);
    }
    plus(p:{x:number, y:number}): {x:number, y:number} {
        return {x: this.x + 1.*p.x, y: this.y + 1.*p.y};
    }
    set_xy_silent(p:{x: number, y: number}): boolean{
        return this.set_xy_notify(p.x, p.y, true);
    }
    set_point(p:{x: number, y: number}): boolean{
        return this.set_xy_notify(p.x, p.y, false);
    }
    set_point_silent(p:{x: number, y: number}): boolean{
        return this.set_xy_notify(p.x, p.y, true);
    }
    private readonly on_changed = new Emitter<Point>();
    get changed(): IEmitter<Point> {
        return this.on_changed;
    }

    public fire_changed(): void {
        this.on_changed.trigger(this);
    }

    to_string():string {
        return `{x: ${this.x}, y:${this.y}}`;
    }
}
class Vector extends Point {
    constructor(x?:number, y?: number, angle?: number)
    {
        super(x, y);
        this._angle = angle ?? 0;
    }
    protected _angle: number = 0;
    get angle():number {return this._angle;} set angle(angle: number) { this._angle = 1.*angle; this.fire_changed(); }

    set_vector(x:number, y: number, azimuth: number, silent: boolean): void{
        if(this._x != x || this._y != y|| this._angle != azimuth)
        {
            this._x = 1.*x;
            this._y = 1.*y;
            this._angle = 1.*azimuth;
            if(silent === false)
                this.fire_changed();
        }
    }
}


class GeoPoint implements INotifyChanged<GeoPoint> {
    constructor(latitude?:number, longitude?: number)
    {
        this._latitude = latitude ?? 0;
        this._longitude = longitude ?? 0;
    }
    protected _latitude: number = 0;
    protected _longitude: number = 0;

    get latitude():number {return this._latitude;} set latitude(latitude: number) { this._latitude = 1.*latitude; this.fire_changed(); }
    get longitude():number {return this._longitude;} set longitude(longitude: number) { this._longitude = 1.*longitude; this.fire_changed(); }

    set(latitude:number, longitude: number): void{
        if(this._latitude != latitude || this._longitude != longitude)
        {
            this._latitude = latitude;
            this._longitude = longitude;
            this.fire_changed();
        }
    }
    private readonly on_changed = new Emitter<GeoPoint>();
    get changed(): IEmitter<GeoPoint> {
        return this.on_changed;
    }

    public fire_changed(): void {
        this.on_changed.trigger(this);
    }

    to_string():string {
        return `{latitude: ${this.latitude}, longitude:${this.longitude}}`;
    }
}
class GeoVector extends GeoPoint {
    constructor(latitude?:number, longitude?: number, azimuth?: number)
    {
        super(latitude, longitude);
        this._azimuth = azimuth ?? 0;
    }
    private _azimuth: number = 0;
    get azimuth():number {return this._azimuth;} set azimuth(azimuth: number) { this._azimuth = 1.*azimuth; this.fire_changed(); }

    set_vector(latitude:number, longitude: number, azimuth: number): void{
        if(this._latitude != latitude || this._longitude != longitude|| this._azimuth != azimuth)
        {
            this._latitude = latitude;
            this._longitude = longitude;
            this._azimuth = azimuth;
            this.fire_changed();
        }
    }
}

export {Point, Vector, GeoPoint, GeoVector, }