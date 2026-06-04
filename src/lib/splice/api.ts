// ------------- Templates are copy-pasted from the browser devtools network tab -------------
// Make sure the variables are complete and have appropriate default values

interface QueryTemplate {
    operationName: string
    variables: any
    query: string
}

export const SamplesSearch = {
    operationName: "SamplesSearch",
    variables: {
        order: "DESC",
        sort: "random",
        limit: 50,
        page: 1,
        tags: [],
        key: null,
        chord_type: null,
        bpm: null,
        min_bpm: null,
        max_bpm: null,
        asset_category_slug: null,
        random_seed: null,
        query: null,
        ac_uuid: null,
    },
    query: "query SamplesSearch($parent_asset_uuid: GUID, $query: String, $order: SortOrder = DESC, $sort: AssetSortType = popularity, $random_seed: String, $tags: [ID], $key: String, $chord_type: String, $bpm: String, $min_bpm: Int, $max_bpm: Int, $limit: Int = 50, $asset_category_slug: AssetCategorySlug, $page: Int = 1, $ac_uuid: String, $parent_asset_type: AssetTypeSlug) {\n  assetsSearch(\n    filter: {legacy: true, published: true, asset_type_slug: sample, query: $query, tag_ids: $tags, key: $key, chord_type: $chord_type, bpm: $bpm, min_bpm: $min_bpm, max_bpm: $max_bpm, asset_category_slug: $asset_category_slug, ac_uuid: $ac_uuid}\n    children: {parent_asset_uuid: $parent_asset_uuid}\n    pagination: {page: $page, limit: $limit}\n    sort: {sort: $sort, order: $order, random_seed: $random_seed}\n    legacy: {parent_asset_type: $parent_asset_type}\n  ) {\n    ...assetDetails\n    __typename\n  }\n}\n\nfragment assetDetails on AssetPage {\n  ...assetPageItems\n  ...assetTagSummaries\n  pagination_metadata {\n    currentPage\n    totalPages\n    __typename\n  }\n  response_metadata {\n    records\n    __typename\n  }\n  __typename\n}\n\nfragment assetPageItems on AssetPage {\n  items {\n    ... on IAsset {\n      asset_type_slug\n      asset_prices {\n        amount\n        currency\n        __typename\n      }\n      uuid\n      name\n      tags {\n        uuid\n        label\n        __typename\n      }\n      files {\n        uuid\n        name\n        hash\n        path\n        asset_file_type_slug\n        url\n        __typename\n      }\n      __typename\n    }\n    ... on IAssetChild {\n      parents(filter: {asset_type_slug: pack}) {\n        items {\n          ... on PackAsset {\n            permalink_slug\n            permalink_base_url\n            uuid\n            name\n            files {\n              uuid\n              path\n              asset_file_type_slug\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SampleAsset {\n      bpm\n      chord_type\n      key\n      duration\n      uuid\n      name\n      asset_category_slug\n      __typename\n    }\n    ... on PresetAsset {\n      uuid\n      name\n      asset_devices {\n        uuid\n        device {\n          name\n          uuid\n          minimum_device_version\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on PackAsset {\n      uuid\n      name\n      provider {\n        name\n        permalink_slug\n        __typename\n      }\n      provider_uuid\n      uuid\n      permalink_slug\n      permalink_base_url\n      main_genre\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment assetTagSummaries on AssetPage {\n  tag_summary {\n    count\n    tag {\n      uuid\n      label\n      taxonomy {\n        uuid\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}",
}

export const CategoryList = {
    operationName: "CategoryList",
    variables: { tagCategory: "genres" },
    query: "query CategoryList($tagCategory: String!) {\n  categories: tagCategoryList(permalink_slug: $tagCategory, v2Enabled: true) {\n    uuid\n    permalink_slug\n    name\n    categories {\n      uuid\n      name\n      permalink\n      description\n      altDescription\n      altName\n      tags {\n        uuid\n        label\n        __typename\n      }\n      subcategories {\n        uuid\n        name\n        permalink\n        description\n        altDescription\n        altName\n        tags {\n          uuid\n          label\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
}

export const GenreByPermalink = {
    operationName: "GenreByPermalink",
    variables: { permalink: "hip-hop" },
    query: "query GenreByPermalink($permalink: String!) {\n  genre: wwwGenre(permalink: $permalink) {\n    description\n    seo_description\n    name\n    permalink\n    bpm_high\n    bpm_low\n    year\n    locations\n    genres_influenced {\n      name\n      permalink\n      __typename\n    }\n    genres_influenced_by {\n      name\n      permalink\n      __typename\n    }\n    __typename\n  }\n}",
}

export const GenreOverview = {
    operationName: "GenreOverview",
    variables: { tags: [] },
    query: "query GenreOverview($tags: [ID]) {\n  samples: assetsSearch(\n    filter: {legacy: true, published: true, asset_type_slug: sample, tag_ids: $tags}\n    pagination: {page: 1, limit: 9}\n    sort: {sort: popularity, order: DESC}\n  ) {\n    ...assetPageItems\n    __typename\n  }\n  presets: assetsSearch(\n    filter: {legacy: true, published: true, asset_type_slug: preset, tag_ids: $tags}\n    pagination: {limit: 9}\n  ) {\n    ...assetPageItems\n    __typename\n  }\n  packs: assetsSearch(\n    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags}\n    pagination: {page: 1, limit: 6}\n    sort: {sort: popularity, order: DESC}\n  ) {\n    ...assetPageItems\n    __typename\n  }\n}\n\nfragment assetPageItems on AssetPage {\n  items {\n    ... on IAsset {\n      asset_type_slug\n      asset_prices {\n        amount\n        currency\n        __typename\n      }\n      uuid\n      name\n      tags {\n        uuid\n        label\n        __typename\n      }\n      files {\n        uuid\n        name\n        hash\n        path\n        asset_file_type_slug\n        url\n        __typename\n      }\n      __typename\n    }\n    ... on IAssetChild {\n      parents(filter: {asset_type_slug: pack}) {\n        items {\n          ... on PackAsset {\n            permalink_slug\n            permalink_base_url\n            uuid\n            name\n            files {\n              uuid\n              path\n              asset_file_type_slug\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SampleAsset {\n      bpm\n      chord_type\n      key\n      duration\n      uuid\n      name\n      asset_category_slug\n      __typename\n    }\n    ... on PresetAsset {\n      uuid\n      name\n      asset_devices {\n        uuid\n        device {\n          name\n          uuid\n          minimum_device_version\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on PackAsset {\n      uuid\n      name\n      provider {\n        name\n        permalink_slug\n        __typename\n      }\n      provider_uuid\n      uuid\n      permalink_slug\n      permalink_base_url\n      main_genre\n      __typename\n    }\n    __typename\n  }\n  __typename\n}",
}

export const PacksSearch = {
    operationName: "PacksSearch",
    variables: {
        order: "DESC",
        limit: 50,
        sort: "popularity",
        tags: ["hip hop"],
        random_seed: null,
        page: 1,
    },
    query: "query PacksSearch($page: Int, $order: SortOrder = DESC, $limit: Int = 50, $sort: AssetSortType = relevance, $random_seed: String, $tags: [ID!], $query: String, $ac_uuid: String) {\n  assetsSearch(\n    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags, query: $query, ac_uuid: $ac_uuid}\n    pagination: {page: $page, limit: $limit}\n    sort: {sort: $sort, order: $order, random_seed: $random_seed}\n  ) {\n    ...assetDetails\n    __typename\n  }\n}\n\nfragment assetDetails on AssetPage {\n  ...assetPageItems\n  ...assetTagSummaries\n  pagination_metadata {\n    currentPage\n    totalPages\n    __typename\n  }\n  response_metadata {\n    records\n    __typename\n  }\n  __typename\n}\n\nfragment assetPageItems on AssetPage {\n  items {\n    ... on IAsset {\n      asset_type_slug\n      asset_prices {\n        amount\n        currency\n        __typename\n      }\n      uuid\n      name\n      tags {\n        uuid\n        label\n        __typename\n      }\n      files {\n        uuid\n        name\n        hash\n        path\n        asset_file_type_slug\n        url\n        __typename\n      }\n      __typename\n    }\n    ... on IAssetChild {\n      parents(filter: {asset_type_slug: pack}) {\n        items {\n          ... on PackAsset {\n            permalink_slug\n            permalink_base_url\n            uuid\n            name\n            files {\n              uuid\n              path\n              asset_file_type_slug\n              url\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SampleAsset {\n      bpm\n      chord_type\n      key\n      duration\n      uuid\n      name\n      asset_category_slug\n      __typename\n    }\n    ... on PresetAsset {\n      uuid\n      name\n      asset_devices {\n        uuid\n        device {\n          name\n          uuid\n          minimum_device_version\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on PackAsset {\n      uuid\n      name\n      provider {\n        name\n        permalink_slug\n        __typename\n      }\n      provider_uuid\n      uuid\n      permalink_slug\n      permalink_base_url\n      main_genre\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment assetTagSummaries on AssetPage {\n  tag_summary {\n    count\n    tag {\n      uuid\n      label\n      taxonomy {\n        uuid\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}",
}

export const PacksByPermalink = {
    operationName: "PackByPermalink",
    variables: { permalink: "oliver-vol-3" },
    query: "query PackByPermalink($permalink: String!) {\n  pack: packAsset(permalink: $permalink) {\n    uuid\n    name\n    main_genre\n    description\n    permalink_slug\n    permalink_base_url\n    provider {\n      uuid\n      name\n      permalink_slug\n      __typename\n    }\n    files {\n      uuid\n      asset_file_type_slug\n      url\n      path\n      __typename\n    }\n    child_asset_counts {\n      type\n      count\n      __typename\n    }\n    companion_packs {\n      uuid\n      description\n      permalink_slug\n      files {\n        uuid\n        asset_file_type_slug\n        url\n        path\n        __typename\n      }\n      main_genre\n      provider {\n        uuid\n        name\n        permalink_slug\n        __typename\n      }\n      main_genre\n      name\n      __typename\n    }\n    story {\n      uuid\n      background_url\n      description\n      title\n      videos {\n        background_url\n        url\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
}

export const SoundsSearchAutocomplete = {
    operationName: "SoundsSearchAutocomplete",
    variables: { term: "" },
    query: 'query SoundsSearchAutocomplete($term: String!) {\n  soundsSearchSuggestions(searchTerm: $term, limit: 7, context: "marketplace") {\n    autocompleteUuid\n    results {\n      autocompleteTerm\n      termType\n      length\n      offset\n      __typename\n    }\n    __typename\n  }\n}',
}

// ---------------------------------------------------------------

import { invoke } from "@tauri-apps/api/core"

export async function querySplice(
    template: QueryTemplate,
    variables: typeof template.variables = {}
) {
    const body = { ...template }
    Object.assign(body.variables, variables)
    const startTime = Date.now()
    console.log("💌 Requesting", body)
    try {
        // Routed through a Rust command instead of the http plugin: on Windows
        // the plugin injects `Origin: http://tauri.localhost`, which Splice's
        // Cloudflare protection blocks with a 403.
        const text = await invoke<string>("splice_graphql", {
            body: JSON.stringify(body),
        })
        const json = JSON.parse(text)
        console.log("📬 Received", json, "after", Date.now() - startTime, "ms")
        return json
    } catch (error) {
        console.error("⚠️ Splice query failed", error)
        return null
    }
}
