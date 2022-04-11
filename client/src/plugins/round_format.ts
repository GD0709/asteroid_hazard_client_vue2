import state from '@/components/model/State';
import MathExt from '@/components/lib/MathExt';
import Vue from 'vue';


// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
      $dimension_prefix_format: (real: number) => string;
      $power_format: (real: number) => string;
      $round: (real: number, n: number|null) => string;
      $math_ext: MathExt;
    }
  }


export default function round_format(vue: typeof Vue, options?: any): void {

    Vue.prototype.$dimension_prefix_format = function(real: number) 
    { 
      //console.log("Dimensions", state.state.visual_settings.round_digits);
      return MathExt.dimension_prefix_format(real, (p) => this.$t("calculator.dimensions.prefix." + p), state.state.visual_settings.round_digits);
    };
    Vue.prototype.$power_format = function(real: number) 
    { 
      return MathExt.power_format(real, state.state.visual_settings.round_digits);
    };
    Vue.prototype.$round = function(real: number, n: number|null) 
    { 
      return MathExt.round_by_digits_to_string(real, n == null ? state.state.visual_settings.round_digits: n);
    };
    Vue.prototype.$math_ext = MathExt;
}






