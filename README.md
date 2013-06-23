Qimage
===
A simple Promise Image Loader library based on Q.

Usage:

```javascript
Qimage("images/foo.png").then(function (img) {
  document.body.appendChild(img);
}, function (error) {
  document.body.innerHTML = "Unable to load the image";
});
```
