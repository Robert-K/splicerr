const SPLICE_GRAPHQL_URL: &str = "https://surfaces-graphql.splice.com/graphql";

/// Sends a GraphQL request to Splice from the Rust side.
///
/// Two reasons this goes through reqwest instead of the http plugin:
/// - On Windows the plugin injects `Origin: http://tauri.localhost`, which
///   Splice's Cloudflare blocks with a 403.
/// - We deliberately send NO browser `User-Agent`: a spoofed Chrome UA with a
///   non-browser TLS fingerprint trips Cloudflare's bot challenge. Sending no
///   UA (just the Apollo preflight headers) passes.
#[tauri::command]
async fn splice_graphql(body: String) -> Result<String, String> {
    let operation_name = serde_json::from_str::<serde_json::Value>(&body)
        .ok()
        .and_then(|v| {
            v.get("operationName")
                .and_then(|o| o.as_str())
                .map(|s| s.to_string())
        })
        .unwrap_or_else(|| "SamplesSearch".to_string());

    let client = reqwest::Client::new();
    let response = client
        .post(SPLICE_GRAPHQL_URL)
        .header("content-type", "application/json")
        .header("apollo-require-preflight", "true")
        .header("x-apollo-operation-name", operation_name)
        .body(body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let status = response.status();
    let text = response.text().await.map_err(|e| e.to_string())?;
    if !status.is_success() {
        return Err(format!(
            "HTTP {}: {}",
            status.as_u16(),
            &text[..text.len().min(200)]
        ));
    }
    Ok(text)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_drag::init())
        .invoke_handler(tauri::generate_handler![splice_graphql])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
