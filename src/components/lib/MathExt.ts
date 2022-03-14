

/* declare global {
    interface Math {
        deg2rad(x: Number) : number;
        rad2deg(x: Number) : number;
    }
}



Math.deg2rad = function (x: number) : number {
    return x / 180. * Math.PI;
};

Math.rad2deg = function (x: number) : number {
    return x / Math.PI * 180.;
}; */


export default class MathExt
{


    static deg2rad(angle_degree: number) : number {
        return angle_degree / 180. * Math.PI;
    }
    static rad2deg(angle_rad: number) : number {
        return angle_rad / Math.PI * 180.;
    }
    static interpolate_by_density(val1000: number, val3320: number, density: number){
        return val1000 * (3320. - density)/2320 + val3320 * (density - 1000.)/2320;
    }
    static interpolate_by(val1: number, arg1: number,val2: number, arg2: number, arg: number){
        return val1 * (arg2 - arg)/(arg2- arg1) + val2 * (arg - arg1)/(arg2- arg1);
    }
    static round_by_digits(real: number, n: number){
    
        let sgn = real >= 0 ? 1 :  -1;
        let absreal = real >= 0 ? real :  -real;
        let mult = 10.**(Math.floor(Math.log10(absreal))-n + 1);
        return 1. * sgn * mult * Math.round(absreal/mult)
    }

    static round_decimal_digits_to_string(real: number, after_dot_length: number)
    {
        let str = real.toString();
        let dot_pos = str.indexOf('.');
        if(dot_pos<0) return str;
        if(after_dot_length == 0)
            after_dot_length = -1;
        return str.substring(0, dot_pos + 1 + after_dot_length);
    }
    static round_by_digits_to_string(real: number, n: number){
        if(real == 0) return "0";
        let sgn = real >= 0 ? 1 :  -1;
        let absreal = real >= 0 ? real :  -real;
        let power = Math.floor(Math.log10(absreal))-n + 1;
        let mult = 10.**(power);
        let res = 1. * sgn * mult * Math.round(absreal/mult);

        let resstring = res.toString();
        let end = resstring.indexOf('.');
        if(end <=0)
            end = resstring.length;
        else if(power < 0) end = end - power + 1;
        else end = resstring.length;
        return resstring.substring(0, end);
    }
}