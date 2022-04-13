import Variant from '../core/model/Variant';
import Target from '../core/model/Target';
import {Crater} from '../core/model/Effects/Crater';;

let variant = new Variant(1000,100,45,50);
let target = new Target();
target.target_density = 2650;

let crater = new Crater();
crater.calc_variant_target(variant, target);

console.log(crater);