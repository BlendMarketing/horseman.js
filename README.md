![CircleCI](https://circleci.com/gh/BlendMarketing/horseman.js.svg?style=svg&circle-token=f8c7c6e3c3d2e0428d9782e733b6a8ac6ef8e94c)
![David-DM](https://david-dm.org/blendmarketing/horseman.js.svg)

# Horseman.js

A library for working with [React][react], [Redux][redux] and external APIs,
specifically targeting API's exposing information stored in a CMS.

horseman.js is a part of the [Blend Marketing](https://blend.marketing)
development toolchain. At Blend we primarially work with [CraftCMS][craft] and
[Wordpress][wp] backed CMS, so horseman.js is targeted **primarially** at those
platforms.

## Concepts

The tools in horseman.js enable a react / redux application to easily connect
with external data sources. This allows for a development toolchain that gives
content editors the ability to work in familiar systems (Wordpress, Craft) and
gives developers the ability to develop modern frontend websites with that data.

Horseman.js exposes this functionality through the use of several `Provider`
components. These providers are responsible for fetching data from an external
API and passing that information to react components for consumption as a prop.

## Usage


## Installation

`yarn add horseman.js`

or

`npm -i horseman.js --save`


## Entry Providers

[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[craft]: https://craftcms.com/
[wp]: https://wordpress.org/
