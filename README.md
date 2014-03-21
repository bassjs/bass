# Bower assets

Allow direct consumption of built frontend assets.

Temporarily code-named **bass** for easy reference in this document.

## Idea

- Rides on bower.
- Does not need an additional package definition file, use `bower.json`.
- Uses bower repository and versionining.
- Developers (as consumers) just _serve_ a package's assets to the users, instead of having to install the whole package just to use its assets.

## How, as consumers

A lot of front-end developers do not actually require the source code to front-end packages, but only simply want to serve the latest built asset directly to users.

For instance, a lot of people do not bother to `bower install jquery` but simply serve jQuery directly via CDN:

```html
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
```

With **bass**, developers can do the same, simply

```html
<script src="//server/bower-package/major.minor.patch/another-asset.js"></script>
```

**bass** supports semantic versioning:

```html
<-- Loads explicitly version major.minor.patch -->
<script src="//server/bower-package/major.minor.patch/another-asset.js"></script>

<-- Loads the latest patch for version major.minor (ie. major.minor.*) -->
<script src="//server/bower-package/major.minor/another-asset.js"></script>

<-- Loads the latest minor package for version major (ie. major.*) -->
<script src="//server/bower-package/major/another-asset.js"></script>
```


## How, as authors

At `bower.json`, list down the assets that should be made available:

```json
{
    "assets": {
        "somefile.js": "some-file.js",
        "another-asset.js": "dist/another-asset.js",
        "lib/asset.js": "path/to/some/asset.js",
        "img/": "path/to/img/*"
    }
}
```

**bass** would download and version these assets from bower repositories and make them publicly available for direct consumption.

