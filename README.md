Qimage [![Build Status](https://travis-ci.org/gre/qimage.png?branch=master)](https://travis-ci.org/gre/qimage)
===

**Qimage** is a simple Promise Image Loader library based on Q.

[Checkout the Annotated Source Code](http://greweb.me/qimage/docs/qimage.html)

Installation
---

on [NPM](https://npmjs.org/package/qimage):
```sh
npm install qimage
```

Bower is also supported.

Usage Examples
---

`Qimage` takes an URL *(string)* and returns a *Promise of Image*.

**`Qimage(url: String) => Promise[Image]`**

**`Qimage.anonymously(url: String) => Promise[Image]`**

### Simple example

```javascript
Qimage("images/foo.png").then(function (img) {
  document.body.appendChild(img);
}, function (error) {
  document.body.innerHTML = "Unable to load the image";
});
```

### Making Anonymous Cross Origin requests

```javascript
Qimage.anonymously("https://example.com/image.jpg")
  .then(function (img) {
    // I'm now allowed to use img in a Canvas for instance. (CORS restriction)
    canvasctx.drawImage(img);
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

