"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Variant_1 = __importDefault(require("../core/model/Variant"));
const Target_1 = __importDefault(require("../core/model/Target"));
const Crater_1 = require("../core/model/Effects/Crater");
;
let variant = new Variant_1.default(1000, 100, 45, 50);
let target = new Target_1.default();
target.target_density = 2650;
let crater = new Crater_1.Crater();
crater.calc_variant_target(variant, target);
console.log(crater);
