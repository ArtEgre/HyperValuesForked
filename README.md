# HyperValuesForked
An original political ideology test using a decision tree architecture to provide nuanced results based on your unique combination of political values.

## Attribution and changes

HyperValuesForked is a modified version of [NeoValues](https://github.com/neomediavalist/neovalues) by neomediavalist, licensed under [CC BY-NC-SA 4.0](./LICENSE). This version is distributed under the same license.

## Current version

HyperValuesForked 4.1 incorporates the supplied NeoValues 4.1 release (15 November 2026): 145 values, 239 ideologies, updated question trees and icons, and English, Ukrainian, Russian and German translations.

HyperValuesForked retains its Bayesian ranking, multiple signed values per category, sliders, comparison rings and downloadable result images. Existing signed stance profiles are preserved for surviving ideologies and values; current NeoValues required values are added as positive stances, taking precedence over older opposition stances. Consequently, HyperValuesForked probabilities differ from NeoValues exact-match results. The source requirement `confiscatory_taxation` is normalized to the existing value ID `Confiscatory_Taxation`.

Custom results allow direct selection of multiple values and save independently of quiz results. Old quiz answers migrate automatically; obsolete or invalid values are discarded. Language preference is saved under `hv_lang`, with the old NeoValues preference used as a fallback.

FairTax remains in the values catalog and custom editor, but is omitted from quiz branches because neither release assigns it to an ideology profile. Selecting only FairTax in the custom editor produces no match.

## Run locally

Serve this directory over HTTP (opening quiz pages directly as files cannot fetch the question tree):

```sh
python -m http.server 8000
```

Then open http://localhost:8000. No build step is required.

## Validation

```sh
node tools/check_scoring.js
node tools/check_update.js
```

For browser checks with an installed Chrome or Edge:

```sh
node --experimental-websocket tools/check_browser.cjs
```

The browser checks use a temporary browser profile, so your existing quiz answers are unaffected. Set `HV_BROWSER` to the executable path if Chrome or Edge is installed in a different location.
