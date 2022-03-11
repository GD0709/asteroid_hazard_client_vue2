export default {density: [
    (v:any) => v != '' || `Desity is required`,
    (v:any) => !isNaN(v) || `${v} is not a number`,
    (v:any) => v>=500 || `Density must be more than 500 kg/m^3`,
    (v:any) => v<=4000 || `Density must be less than 4000 kg/m^3`
],
diameter: [
    (v:any) => v != '' || `Diameter is required`,
    (v:any) => !isNaN(v) || `${v} is not a number`,
    (v:any) => v>=15 || `Diameter must be more than 15 m`,
    (v:any) => v<=3000 || `Diameter must be less than 3000 m`
],
entry_angle: [
    (v:any) => v != '' || `Entry angle is required`,
    (v:any) => !isNaN(v) || `${v} is not a number`,
    (v:any) => v>=15 || `Entry angle must be more than 15°`,
    (v:any) => v<=90 || `Entry angle must be less than 90°`
],
velocity: [
    (v:any) => v != '' || `Velocity is required`,
    (v:any) => !isNaN(v) || `${v} is not a number`,
    (v:any) => v>=15 || `Velocity must be more than 15 km/s`,
    (v:any) => v<=72 || `Velocity must be less than 72 km/s`
],
input_along_across: [
    (v:any) => v != '' || v ===0 || `Distance is required`,
    (v:any) => !isNaN(v) || `${v} is not a number`,
    (v:any) => v>=-3000 || `Distance must be in range -3000 km to 3000 km`,
    (v:any) => v<=3000 || `Distance must be less than 72 km/s`
]
};