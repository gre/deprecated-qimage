Qimage [![Build Status](https://travis-ci.org/gre/qimage.png?branch=master)](https://travis-ci.org/gre/qimage)
===

**Qimage** is a simple Promise Image Loader library based on Q.

[Checkout the Annotated Source Code](http://greweb.me/qimage/docs/qimage.html)

Installation
---

```sh
bower install qimage
```

Also available on [NPM](https://npmjs.org/package/qimage).

Usage
---

`Qimage` takes an URL *(string)* and returns a *Promise of Image*.

**`Qimage(url: String, options) => Promise[Image]`**

### Simple example

```javascript
Qimage("images/foo.png").then(function (img) {
  document.body.appendChild(img);
}, function (error) {
  document.body.innerHTML = "Unable to load the image";
});
```

### Making Anonymous crossOrigin request

```javascript
Qimage("https://example.com/image.jpg", { crossOrigin: "Anonymous" })
  .then(function (img) {
    // I'm now allowed to draw img on a Canvas for instance. (CORS restriction)
  });
```

### Multiple image loading

```javascript
Q.all([
  Qimage("res1.png"),
  Qimage("res2.png"),
  Qimage("res3.png")
])
.spread(function (res1, res2, res3) {
  document.body.appendChild(res1);
  document.body.appendChild(res2);
  document.body.appendChild(res3);
});
```

### Mixing with Qajax

```javascript
Qajax.getJSON("http://my-image-service.com/images/today.json?limit=10")
.get("images") // my json has an "images" array
.then(function (images) {
  // wait all images to load
  return Q.all(_.map(images, function (image) {
    return Qimage(image.url);
  }));
})
.then(function (imgs) {
  templatize(imgs);
})
.fail(displayError);
```

### Support for CORS

```javascript
Qimage("http://example.png/foo.png", { crossorigin: "Anonymous" }).then(function (img) {
  canvasctx.drawImage(img);
});
```
