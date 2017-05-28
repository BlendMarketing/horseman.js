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

Horseman.js exposes this functionality through the use of the `ResourceProvider`
component. This providers is responsible for fetching data from an external
API and passing that information to react components for consumption as a prop.

The `ResourceProvider` is most commonly used inside of the
[react-router][router].

## Usage
Any component that depends on an external API call for information can be
wrapped in the `ResourceProvider`. Inform the provider of the endpoint to call
and the data will be provided to your component via the `render` method.

### Standard Requests
To simply fetch data from known endpoint and pass the json into a custom
component, use the `endpoint` prop of the provider. The json at the requested
endpoint will be passed along to your component through the `render` function
parameter.

```js
import { ResourceProvider } from 'horseman.js';

<ResourceProvider
  endpoint="http://example.com/resources/myresource.json"
  render={resource => (
    <MyEntry resource={resource} />
  )}
/>
```

### Templated Requests

Many requests don't have a fixed url for fetching information and instead rely
on external data to determine what information to load.

ResourceProvider endpoints are able to be templates by prefixing dynamic
sections with a `:`.

The `ResourceProvider` will swap out these sections with the value passed to the
`endpointVars` prop.

```js
import { ResourceProvider } from 'horseman.js';

<ResourceProvider
  endpoint="http://example.com/resources/:slug.json"
  endpointVars={{
    slug: 'foo'
  }}
  render={resource => (
    <MyEntry resource={resource} />
  )}
/>
```

#### Working with react-router

This pattern works hand in hand with react-router if you want to match
`endpointVars` with route matches.

```js
<Route
  exact path="/components/:slug"
  render={({ match }) =>
    <ResourceProvider
      endpoint="http://example.com/resources/:slug.json"
      endpointVars={match.params}
      render={resource => (
        <MyEntry resource={resource} />
      )}
    />
  }
/>
```

## Installation

`yarn add horseman.js`

or

`npm -i horseman.js --save`


## Entry Providers

[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[craft]: https://craftcms.com/
[wp]: https://wordpress.org/
[router]: https://reacttraining.com/react-router/web/guides/quick-start
