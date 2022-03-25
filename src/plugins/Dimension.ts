import MathExt from '@/components/lib/MathExt';
import Vue from 'vue';


// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
      $dimension_prefix_format: (real: number) => string;
      $math_ext: MathExt;
    }
  }


export default function Dimensions(vue: typeof Vue, options?: any): void {

    Vue.prototype.$dimension_prefix_format = function(real: number) 
    { 
        return MathExt.dimension_prefix_format(real, (p) => this.$t("calculator.dimensions.prefix." + p));
    };
    Vue.prototype.$math_ext = MathExt;
}






