export const fetchConfig = async name => fetch(`/src/assets/configs/${name}.json`);

export const fetchForgingConfig = async () => fetchConfig('forging');
export const fetchMaterialsConfig = async () => fetchConfig('materials');
export const fetchMetalsConfig = async () => fetchConfig('metals');
export const fetchOresConfig = async () => fetchConfig('ores');

export const fetchAllConfigs = async () => Promise
    .all([
        fetchForgingConfig(),
        fetchMaterialsConfig(),
        fetchMetalsConfig(),
        fetchOresConfig()
    ])
    .then(responses => Promise
        .all(responses.map(response => response.json()))
        .then(([forging, materials, metals, ores]) => ({
            forging,
            materials,
            metals,
            ores
        }))
    );