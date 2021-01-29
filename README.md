# gitbook-plugin-anchor-navigation-auto-expand

>  forked from [yaneryou/gitbook-plugin-anchor-navigation](https://github.com/yaneryou/gitbook-plugin-anchor-navigation)

## What Add

just one:

- when you open the doc, navigation will expand automatically

## How to Use

edit **book.json**

```json
"plugins": [
    "anchor-navigation-ex"
]

"pluginsConfig": {
    "anchor-navigation-auto-expand": {
        "autoExpand": true //auto expand ?
    }
}
```

then **install the plugin**

```
$ gitbook install
```

