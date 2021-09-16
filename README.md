# babel-plugin-transform-html-import-to-string
[![Build Status](https://travis-ci.com/yeiniel/babel-plugin-transform-html-import-to-string.svg?branch=master)](https://travis-ci.com/yeiniel/babel-plugin-transform-html-import-to-string)

Turn HTML imports (and export from) into strings.

## Example

Given the following _example.html_.

```html
<h1>Hello</h1>
```

#### in

```js
import html from './example.html';
```

#### out

```js
const html = '<h1>Hello</h1>';
```

and if using export

#### in

```js
export * as html from './example.html';
```

#### out

```js
const html = "<h1>Hello</h1>";
export { html };
```


## Installation

```sh
$ npm install babel-plugin-transform-html-import-to-string
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-html-import-to-string"]
}
```

### Via CLI

```sh
$ babel --plugins transform-html-import-to-string script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-html-import-to-string"]
});
```