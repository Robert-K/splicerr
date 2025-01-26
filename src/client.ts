import { HoudiniClient } from "$houdini"
// @ts-expect-error houdini magically resolves this somehow idk lol
import { fetch } from "$houdini/plugins"
import { fetch as tauriFetch } from "@tauri-apps/plugin-http"

export default new HoudiniClient({
    url: "https://surfaces-graphql.splice.com/graphql",
    pipeline: [fetch(tauriFetch)],
    // uncomment this to configure the network call (for things like authentication)
    // for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
    // fetchParams({ session }) {
    //     return {
    //         headers: {
    //             Authentication: `Bearer ${session.token}`,
    //         }
    //     }
    // }
})
