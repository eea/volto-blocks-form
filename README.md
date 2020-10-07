# volto-blocks-form
[![Releases](https://img.shields.io/github/v/release/eea/volto-blocks-form)](https://github.com/eea/volto-blocks-form/releases)

[Volto](https://github.com/plone/volto) add-on: Reusable form components

## Components

- [BlocksForm](https://github.com/eea/volto-blocks-form/blob/master/src/components/manage/Blocks/Block/BlocksForm.jsx)
- [DragDropList](https://github.com/eea/volto-blocks-form/blob/master/src/components/manage/Blocks/DragDropList/DragDropList.jsx)
- [RenderBlocks](https://github.com/eea/volto-blocks-form/blob/master/src/components/theme/View/RenderBlocks.jsx)
- [EditBlockWrapper](https://github.com/eea/volto-blocks-form/blob/master/src/components/manage/Blocks/Block/EditBlockWrapper.jsx)

## Usage

This package registers the above components. For usage examples see:

* [volto-group-block](https://github.com/eea/volto-group-block)
* [volto-columns-block](https://github.com/eea/volto-columns-block)

## Getting started

1. Create new volto project if you don't already have one:
    ```
    $ npm install -g @plone/create-volto-app
    $ create-volto-app my-volto-project
    $ cd my-volto-project
    ```

1. Update `package.json`:
    ``` JSON
    "addons": [
        "@eeacms/volto-blocks-form"
    ],

    "dependencies": {
        "@eeacms/volto-blocks-form": "github:eea/volto-blocks-form#0.5.0"
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
