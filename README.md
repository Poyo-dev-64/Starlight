# Starlight

Starlight is a Windows music visualizer that turns the night sky into a responsive constellation display. It follows the active Windows media session, animates stars to the music, and places synced lyric words directly among the constellations.

## Live preview

Try the browser version at [poyo-dev-64.github.io/Starlight](https://poyo-dev-64.github.io/Starlight/).

The preview includes the visualizer and Demo Mode. Windows media-session integration, playback controls, and native lyric lookup are available in the desktop application.

## Highlights

- Audio-reactive constellation sky with 88 constellations.
- Synced and word-synced lyrics, with configurable lyric sources and timing offset.
- Instrumental Solo Mode that fades the previous lyric and tours the sky during longer lyric gaps.
- Seven colour themes, adjustable typography, word effects, star brightness, and animation intensity.
- Deep-sky objects, live planets, satellites, constellation facts, and star inspection.
- Free Explore mode for manually navigating the sky.
- Wallpaper Engine-ready UI package.

## Download and run

Download `starlight.exe` from the latest [GitHub Release](../../releases/latest), then run it on Windows. No separate installer is required.

Starlight detects media that exposes a Windows media session. Start music in a supported player, then return to Starlight to see the current track, progress, and lyrics. If no music is active, press `D` to use Demo Mode.

## Controls

| Control | Action |
| --- | --- |
| `S` | Open settings |
| `D` | Toggle Demo Mode |
| `E` | Toggle Free Explore mode |
| `P` / `N` | Previous / next constellation |
| `F` | Show or hide the constellation fact card |
| `M` | Show or hide player controls |
| `T` | Toggle always-on-top mode |
| `+` / `-` | Zoom the sky |
| Left / Right arrow | Adjust lyric timing offset |
| `F11` | Toggle fullscreen |
| `Ctrl` + click a star | Open its Wikipedia entry |

## Lyrics and solos

Starlight prefers word-synced lyrics when a provider makes them available. Use Settings to select a preferred lyric provider, enable or disable sources, or correct timing with the lyric sync offset.

When a song enters a sustained instrumental section, Solo Mode releases the final lyric word so it fades away, then continues the visualizer with an ambient constellation tour. Solo Mode can be turned off in Settings.

## Wallpaper Engine

Download `starlight-ui.zip` from a release and import or use the extracted `ui` package in Wallpaper Engine. The package includes the visualizer, its properties, and all required browser assets.

## Releases

Each tagged release includes:

- `starlight.exe` for the Windows desktop visualizer.
- `starlight-ui.zip` for Wallpaper Engine or other static web hosting.
