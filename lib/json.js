
export function serialize(target) {//{{{
    if (typeof target != "object") return target; // Scalars.
    if (target instanceof Array) return target.map(serialize);
    if (target instanceof RegExp) return target.source.replace(
        /\(\?<\w+?>/ig
        , "("
    );
    let obj = {};
    for (let k in target) obj[k] = serialize(target[k]);
    return obj;
};//}}}

