console.log(Math.min(... [0.1, 0.2, null].filter(f => f != null)))


let arr = [
    {level: 0.02, value: 5, fix_prev: null, fix_next: null},
    {level: 0.05, value: 3, fix_prev: null, fix_next: null},
    {level: 0.1, value: 4, fix_prev: null, fix_next: null},
    {level: 0.2, value: 3.5, fix_prev: null, fix_next: null}];
// arr.sort((o, t) => o.value- t.value)

let previous = null;
let min = p => Math.min(...[p.value, p.fix_prev, p.fix_next].filter(f => f != null));
let max = p => Math.max(...[p.value, p.fix_prev, p.fix_next].filter(f => f != null));


let bugs = arr.map(p => {
    if(previous == null)
    {
        previous = p;
        return false;
    }
    else
    {
        console.log(p, "min:", min(p), "max:", max(p), " with ", previous, "min:", min(previous), "max:", max(previous))
        if(min(previous) < min(p))
        {
            previous.fix_next = p.value;
            p.fix_prev = previous.value;
        }
        previous = p;
    }   

})


console.log(arr);