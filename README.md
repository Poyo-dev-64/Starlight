# Starlight

Starlight is a Windows music visualizer built with Tauri and a canvas-based web interface. It renders an interactive constellation sky, reacts to media-session audio data, and maps synced lyric words to stars.

## Features

- 88 constellation scenes with audio-reactive stars, deep-sky objects, planets, satellites, and free exploration.
- Synced and word-synced lyrics from configurable providers, with a per-track timing offset.
- Instrumental Solo Mode, which tours the sky during lyric gaps and fades the last lyric word when a solo is detected.
- Adjustable colour themes, typography, lyric effects, player controls, and display settings.
- Wallpaper Engine support through the same `ui/` assets.

## Requirements

The desktop application targets Windows. Building it locally requires:

- Rust stable and Cargo.
- Node.js 22 or later to generate the browser bundle.
- Microsoft C++ Build Tools and the Windows SDK, as required by Tauri on Windows.

## Run locally

Build the browser bundle before starting the desktop application:

```powershell
node scripts/build-ui.mjs
cargo run --manifest-path src-tauri/Cargo.toml
```

For an optimized executable:

```powershell
node scripts/build-ui.mjs
cargo build --manifest-path src-tauri/Cargo.toml --release
```

The resulting binary is `src-tauri/target/release/starlight.exe`. `launch.bat` performs the same release build when the binary is absent; `launch-wallpaper.bat` starts it in wallpaper mode.

## Project layout

| Path | Purpose |
| --- | --- |
| `src-tauri/` | Windows media integration, lyric retrieval, and Tauri application code. |
| `ui/` | Static visualizer interface, Wallpaper Engine metadata, and GitHub Pages site. |
| `scripts/build-ui.mjs` | Produces `ui/bundle.js` from the UI modules for file-based and Wallpaper Engine use. |
| `.github/workflows/` | Continuous builds, releases, and GitHub Pages deployment. |

## GitHub Pages

The `Publish UI and release package` workflow publishes the contents of `ui/` to GitHub Pages whenever `main` is pushed. The deployed site starts at `ui/index.html`.

The browser build remains usable as a visual demo, including Demo Mode. Windows media-session integration and native playback controls require the desktop binary.

## Releases

Push a version tag such as `v1.0.1` to create release assets:

- `starlight.exe` from the desktop build workflow.
- `starlight-ui.zip`, containing the packaged contents of `ui/`, from the UI workflow.

Both workflows also expose their output as downloadable GitHub Actions artifacts on normal builds.

To deploy the UI to GitHub Pages, set the Pages source to **GitHub Actions** in the repository settings once.

## Development notes

`ui/bundle.js` is generated. Edit the source modules in `ui/` and run `node scripts/build-ui.mjs` before testing the Tauri application, deploying Pages, or packaging the UI. The automated workflows run this step themselves.

Settings are stored in browser local storage. Lyric-provider preferences, font settings, visual controls, and timing offset therefore persist per installed app or browser profile.
