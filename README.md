# HyperValuesForked
A fork of HyperValues, itself based on NeoValues: a political ideology quiz with decision-tree questions, multiple values per category, and Bayesian ideology matching.

## Attribution and changes

This project builds on work by:

- **[neomediavalist](https://github.com/neomediavalist)** — creator of [NeoValues](https://github.com/neomediavalist/neovalues), the original quiz and upstream source of the questions, ideology/value data, translations, interface and assets used here.
- **[hyperzen2773](https://github.com/hyperzen2773)** — author of the [HyperValues](https://github.com/hyperzen2773/Hypervalues) fork, whose Bayesian scoring, signed value profiles, sliders, comparisons and result-image downloads this fork retains.
- **[ArtEgre](https://github.com/ArtEgre)** — maintainer of [HyperValuesForked](https://github.com/ArtEgre/HyperValuesForked), integrating NeoValues 4.1 into HyperValues and maintaining this fork's branding, custom-results integration and profile changes.

HyperValuesForked continues the upstream [CC BY-NC-SA 4.0 license](./LICENSE). Third-party artwork and fonts retain their own source notices and applicable licenses. See [CREDITS.md](./CREDITS.md) for the fork lineage, contributor links, fonts and individual icon sources.

## Current version

HyperValuesForked 4.1 incorporates the supplied NeoValues 4.1 release (15 November 2026): 145 values, 239 ideologies, updated question trees and icons, and English, Ukrainian, Russian and German translations.

HyperValuesForked retains HyperValues’ Bayesian ranking, multiple signed values per category, sliders, comparison rings and downloadable result images. Existing signed stance profiles are preserved for surviving ideologies and values; current NeoValues required values are added as positive stances, taking precedence over older opposition stances. Consequently, HyperValuesForked probabilities differ from NeoValues exact-match results. The source requirement `confiscatory_taxation` is normalized to the existing value ID `Confiscatory_Taxation`.

Custom results allow direct selection of multiple values and save independently of quiz results. Old quiz answers migrate automatically; obsolete or invalid values are discarded. Language preference is saved under `hv_lang`, with the old NeoValues preference used as a fallback.

FairTax remains in the values catalog and custom editor, but is omitted from quiz branches because neither release assigns it to an ideology profile. Selecting only FairTax in the custom editor produces no match.

This fork also renames Legionarianism to Legionarism, replaces its Religious Authoritarianism and Religious Traditionalism matches with Ethical Statism and Alternative Modernism, and adds a moderate (+0.50) Constitutional Monarchy match.
