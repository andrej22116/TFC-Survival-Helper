export const fetchConfig = async name => fetch(`/src/assets/configs/${name}.json`);

export const fetchForgingConfig = async () => fetchConfig('forging');
export const fetchMaterialsConfig = async () => fetchConfig('materials');
export const fetchMetalsConfig = async () => fetchConfig('metals');
export const fetchOresConfig = async () => fetchConfig('ores');
export const fetchImagesConfig = async () => fetchConfig('images');

export const fetchAllConfigs = async () => Promise
    .all([
        fetchForgingConfig(),
        fetchMaterialsConfig(),
        fetchMetalsConfig(),
        fetchOresConfig(),
        fetchImagesConfig(),
    ])
    .then(responses => Promise
        .all(responses.map(response => response.json()))
        .then(([forging, materials, metals, ores, images]) => ({
            forging,
            materials,
            metals,
            ores,
            images,
        }))
    );