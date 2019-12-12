
export async function getJson(url, defaultData = null) {//{{{
    let response, data;
    try {
        response = await fetch(url);
        data = await response.json();
        return data;
    } catch (err) {
        if (defaultData) return defaultData;
        throw `getJson(${url}): ` + (
            (response||{}).ok ? 'Data formatting error'
            : 'Connection error'
        );
    };
};//}}}

