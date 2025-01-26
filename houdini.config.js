/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    watchSchema: {
        url: "https://surfaces-graphql-preprod.splice.com/graphql",
    },
    runtimeDir: ".houdini",
    plugins: {
        "houdini-svelte": {},
    },
}

export default config
