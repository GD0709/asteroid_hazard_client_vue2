import MathExt from '@/components/lib/MathExt';

export default class VisualSettings
{
    input_mode: 'basic'|'extended' = 'extended';
    round_digits: number = 5;
    round(real: number){
        return '' + MathExt.round_by_digits_to_string(real, this.round_digits);
    };
    is_debug: boolean = true;
}