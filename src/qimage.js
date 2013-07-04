/*
 * Qimage - Simple Promise Image Loader based on Q
 */
(function (definition) {
    if (typeof exports === "object") {
        module.exports = definition();
    } else {
        window.Qimage = definition();
    }
})(function () {

  var Q = window.Q || require("q");

  // QImage
  // ===
  // *Creates an Image Loader.*
  //
  // Parameters
  // ---
  // `url` **(string)**: load an Image with its URL
  //
  // Result
  // ---
  // Returns a **(Promise of Image)**
  //
  var Qimage = function (url) {
    var img = new Image();
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

  return Qimage;

});


