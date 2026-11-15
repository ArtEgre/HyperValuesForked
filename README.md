# HyperValuesForked
An original political ideology test using a decision tree architecture to provide nuanced results based on your unique combination of political values.

## Attribution and changes

HyperValuesForked is a modified version of [NeoValues](https://github.com/neomediavalist/neovalues) by neomediavalist, licensed under [CC BY-NC-SA 4.0](./LICENSE). This version is distributed under the same license.

## Current version

HyperValuesForked 4.1 incorporates the supplied NeoValues 4.1 release (15 November 2026): 145 values, 239 ideologies, updated question trees and icons, and English, Ukrainian, Russian and German translations.

HyperValuesForked retains its Bayesian ranking, multiple signed values per category, sliders, comparison rings and downloadable result images. Existing signed stance profiles are preserved for surviving ideologies and values; current NeoValues required values are added as positive stances, taking precedence over older opposition stances. Consequently, HyperValuesForked probabilities differ from NeoValues exact-match results. The source requirement `confiscatory_taxation` is normalized to the existing value ID `Confiscatory_Taxation`.

Custom results allow direct selection of multiple values and save independently of quiz results. Old quiz answers migrate automatically; obsolete or invalid values are discarded. Language preference is saved under `hv_lang`, with the old NeoValues preference used as a fallback.

FairTax remains in the values catalog and custom editor, but is omitted from quiz branches because neither release assigns it to an ideology profile. Selecting only FairTax in the custom editor produces no match.
