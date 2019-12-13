
import memoize from "fast-memoize";

async function fetchData(fName, dataType, url, defaultData) {//{{{
    let response, data;
    try {
        response = await fetch(url);
        data = await response[dataType]();
        return data;
    } catch (err) {
        if (defaultData) return defaultData;
        throw `${fName}(${url}): ` + (
            (response||{}).ok ? 'Data formatting error'
            : 'Connection error'
        );
    };
};//}}}

export const getJson = fetchData.bind(undefined, 'getJson', 'json');
export const getText = fetchData.bind(undefined, 'getText', 'text');
export const cachedGetJson = fetchData.bind(undefined, 'getJson', 'json');
export const cachedGetText = fetchData.bind(undefined, 'getText', 'text');

