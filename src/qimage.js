/*
 * Qimage - Simple Promise Image Loader based on Q
 */
(function (definition) {
    if (typeof exports === "object") {
        module.exports = definition(require("q"));
    } else {
        window.Qimage = definition(window.Q);
    }
})(function (Q) {

  // QImage
  // ===
  // *Creates an Image Loader.*
  //
  // Parameters
  // ---
  // `url` **(string)**: load an Image with its URL
  // `options` **(object)**: configuration object
  //
  // Result
  // ---
  // Returns a **(Promise of Image)**
  //
  var Qimage = function (url, options) {
    options = options || {};
    if (!Qimage.Image) {
      throw new Error("You must define Qimage.Image if not in window context.");
    }
    var img = new Qimage.Image();
    if (options.crossOrigin) {
      img.crossOrigin = options.crossOrigin;
    }
    var d = Q.defer();
    img.onload = function () {
      d.resolve(img);
    };
    img.onabort = function (e) {
      d.reject(e);
    };
    img.onerror = function (e) {
      d.reject(e);
    };
    img.src = url;
    return d.promise;
  };

  if (typeof window !== "undefined") {
    Qimage.Image = window.Image;
  }

  return Qimage;

});


