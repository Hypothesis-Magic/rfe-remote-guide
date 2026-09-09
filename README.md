# RFE Remote Setup Guide

A step-by-step web tool for pairing remotes and configuring RFE270 (2-channel) and RFE272A (4-channel) receiver chips. It uses reported LED flashes to guide setup even when the current mode is unknown.

**[Open the guide](https://hypothesis-magic.github.io/rfe-remote-guide/)**

## Languages

The interface follows the browser’s primary language on first visit: Chinese locales (including `zh-TW`, `zh-HK`, and `zh-CN`) use Traditional Chinese; other languages use English. If no language information is available, it falls back to Traditional Chinese. No location permission or IP lookup is used.

Use the language selector in the header to switch between **繁體中文** and **English** at any time. A manual choice is saved in this browser and takes priority on future visits. If browser storage is blocked, switching still works for the current visit.

Switching languages preserves your selections, custom button names, current step, running timer, and activity log. Reloading starts a new session while retaining the saved language choice, when browser storage is available.

## Features

- Set button mode and momentary, toggle, or interlock output mode independently.
- Follow steps for power-off, holding SET, power-on, timing, release, and LED feedback.
- Pair a remote, customize button mapping, skip learning slots by timeout, or clear all pairings.
- Track confirmed modes and operations. Unclear LED feedback leaves a mode unknown instead of assuming success.
- Access a collapsible LED reference and datasheet notes in either language.

This is a manual guide. It does not connect to, read, or control the chip. Timers are aids only: confirm results using the actual power-on timing, button actions, and LED feedback.

## Usage

1. Select the receiver chip and operation.
2. Choose the target modes. Leave current modes unknown unless you have confirmed them.
3. For **Pair a remote**, choose **Original button mapping** or **Custom mapping (arbitrary-button learning)**. For custom mapping, enter a remote button for each slot or mark it to skip.
4. Select **Start**, follow the hardware instructions, and report the observed LED pattern.
5. Test the remote’s actual behavior and confirm that pairings survive a normal power cycle.

### Hands-free power-on timing

For mode changes, power off first and select **Start — power on in 5 seconds**. During the preparation countdown, hold SET. Power on when the screen says **Power on now**. The required hold timer starts automatically, followed by the release prompt and LED feedback choices. No screen tap is needed while holding SET and powering on.

Preparation time is separate from the chip’s required hold time. If power-on does not match the cue, restart the sequence or time the operation yourself and use the manual LED-report option. The guide does not detect power or button state. Power-on and SET-held indicators are red.

### Pairing methods

- **Original button mapping:** enter the chip’s normal mode, then learn one remote button using the original encoder-to-output mapping.
- **Custom mapping (arbitrary-button learning):** enter arbitrary-button learning mode, power cycle normally to start at slot 1, then learn each assigned button or skip a slot by timeout. Finally, return to normal operation **without discarding the learned mappings**.

Normal operation means combination-button output on RFE270 and single-button output on RFE272A. It is separate from the method used to learn buttons, and from the momentary/toggle/interlock output setting. Returning after custom learning follows the datasheets (RFE270 pp. 4–5; RFE272A pp. 4–5).

The completion screen lists the current pairing’s button assignments. **Pair another remote with the same mapping** repeats custom learning from slot 1 and retains the confirmed output mode; it does not switch to original-mapping pairing. Choose **New operation** to enter different assignments. Retrying interrupted custom learning retains earlier chip entries and the activity log, but the completion summary shows only the new attempt’s confirmed mappings.

### Output terminology

| Mode | Behavior |
| --- | --- |
| Momentary | Output stays on while the remote button is held and turns off when released. |
| Toggle | Press the same button once to turn its output on, and again to turn it off. |
| Interlock | Selecting another output turns off the previously selected output. |

## GitHub Pages

The site is served directly from the repository root. No package installation or build step is required.

1. Open [Settings → Pages](https://github.com/Hypothesis-Magic/rfe-remote-guide/settings/pages).
2. Select **Deploy from a branch**.
3. Choose **main** and **/ (root)**, then save.

GitHub Pages automatically publishes subsequent changes to `main` at:

https://hypothesis-magic.github.io/rfe-remote-guide/

## Run locally

From the repository directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/ in a browser. Use an HTTP server because the app loads JavaScript ES modules.

## Checks

```sh
node --test tests/*.test.mjs
```

These regression checks cover both chips, learning order, return-to-operation, skipped slots, repeated pairing, unconfirmed LED results, preparation-to-hold timing, cancellation, and manual LED reporting. They do not replace hardware verification.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, language selector, quick reference, and source notes |
| `style.css` | Responsive layout and styling |
| `app.mjs` | Guided operations, timers, LED feedback, and UI updates |
| `model.mjs` | Chip differences, setup plans, and mode decisions |
| `i18n.mjs` | English translations and presentation-only language switching |
| `.nojekyll` | Direct publication of static files |

The state model uses language-independent identifiers. Localization changes text and accessibility labels without restarting the guide. User-entered button names are preserved verbatim. When changing UI copy, update the translation dictionary and any parameterized translation patterns in `i18n.mjs`.

## Datasheets and known differences

- [RFE270 V1.0](https://www.rfe.cn/pdf/RFE270-254163.pdf): normal operation uses combination-button output. Arbitrary-button learning has three slots: D0, D1, and a special-function button.
- [RFE272A V1.1](https://www.rfe.cn/pdf/RFE272A-632152.pdf): normal operation uses single-button output. Arbitrary-button learning maps D0–D3 in order.
- RFE272A specifies 10 seconds for ordinary button-mode switching but 12 seconds for returning after learning. The tool follows the relevant section and requires confirmation from the actual LED pattern.
- Both datasheets contain inconsistent descriptions of the output-mode cycle. The tool uses the reported 1, 2, or 3 flashes to identify the result instead of predicting the next mode.
- RFE270’s third learning slot is not a physical D2 output. It turns all outputs off in interlock mode, or controls D0 + D1 in momentary/toggle mode. With normal pairing, the D2 data button turns all outputs off only in interlock mode.
- The RFE270-specific pages specify 25 memory entries, while the series table lists 30; this guide uses 25. RFE272A stores 40 entries. Repeated learning uses additional capacity.
- Power cycling or clearing pairings does not reset the configured modes.
- LED-VT does not indicate whether individual outputs remain on.
- The datasheets do not describe a read-only mode query, individual pairing deletion, or behavior when memory is full.

Hardware behavior still requires verification on the actual receiver and remote.
