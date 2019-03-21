---
title: 'Browserslist'
date: '2019-03-20'
---

# Unfinished

### browserlists

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "debug": true,
        "useBuiltIns": "entry",
        "targets": { "chrome": "58", "ie": "11" }
      }
    ]
  ]
}
```

```bash
Replaced `@babel/polyfill` with the following polyfills:
```

```bash
[root\src\index.js] Added following polyfills:
  es7.object.values { "ie":"11" }
  es6.array.iterator { "ie":"11" }
  web.dom.iterable { "chrome":"58", "ie":"11" }
  es6.string.includes { "ie":"11" }
  es7.array.includes { "ie":"11" }
  es6.object.keys { "ie":"11" }
```

using 'targets' in babelrc seems to override the browserslist
?? useBuiltIns: entry seems to be for setups without a bundler like webpack, since there is no entry point to pipe it in, you need to put it in the entry file. This makes this setting pointless with webpack.
