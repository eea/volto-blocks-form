# volto-blocks-form

> **DEPRECATED** - Components moved to Volto core. See [@plone/volto](https://github.com/plone/volto)

[![Releases](https://img.shields.io/github/v/release/eea/volto-blocks-form)](https://github.com/eea/volto-blocks-form/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-blocks-form%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-blocks-form/job/master/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-blocks-form%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-blocks-form/job/develop/display/redirect)



[Volto](https://github.com/plone/volto) add-on: Reusable form components

## Components

- [BlocksForm](https://github.com/eea/volto-blocks-form/blob/master/src/components/manage/Blocks/Block/BlocksForm.jsx)
- [DragDropList](https://github.com/eea/volto-blocks-form/blob/master/src/components/manage/Blocks/DragDropList/DragDropList.jsx)
- [RenderBlocks](https://github.com/eea/volto-blocks-form/blob/master/src/components/theme/View/RenderBlocks.jsx)
- [EditBlockWrapper](https://github.com/eea/volto-blocks-form/blob/master/src/components/manage/Blocks/Block/EditBlockWrapper.jsx)

## Usage

This package registers the above components. For usage examples see:

- [volto-group-block](https://github.com/eea/volto-group-block)
- [volto-columns-block](https://github.com/eea/volto-columns-block)

## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g yo @plone/generator-volto
   $ yo @plone/volto my-volto-project --addon @eeacms/volto-blocks-form
   $ cd my-volto-project
   ```

1. If you already have a volto project, just update package.json:

   ```
   "addons": [
       "@eeacms/volto-blocks-form"
   ],

   "dependencies": {
       "@eeacms/volto-blocks-form": "^2.0.0"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
