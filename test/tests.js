
function checkNotSuccess (res) { console.log(res); throw "The result should never be successful!"; }
function checkSuccess (res) { ok(true, "Successful promise as expected."); }
function checkFailure (res) { ok(true, "Failure promise as expected."); }
function checkNotFailure (err) { console.log(err); throw "Unexpected failure: "+err; }
function checkSameObject (value) { 
  return function (v) {
    deepEqual(value===v, "result is "+value);
  }
}

function tryToAccessImagePixels (img) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img,0,0);
  return ctx.getImageData(0,0,1,1).data;
}

test("Qimage is defined", function () {
  ok(typeof Qimage === "function", "Qimage is a function");
  ok(typeof Qimage.anonymously === "function", "Qimage.anonymously is a function");
  ok(typeof Qimage.Image !== "undefined", "Qimage.Image is defined");
});

asyncTest("successful image load", function() {
  Qimage("./npm.png")
  .then(function (img) {
    ok(img instanceof Image, "img is an Image");
    equal(img.width, 518, "correct image width");
    equal(img.height, 202, "correct image height");
  })
  .fail(checkNotFailure)
  .fin(start);
});

asyncTest("not found image load", function() {
  Qimage("./npm") // this doesn't exists
  .then(checkNotSuccess, function (err) {
    ok(true, "Unexisting image failed to load.");
  })
  .fin(start);
});

asyncTest("not an image load", function() {
  Qimage("./index.html") // this isn't an image
  .then(checkNotSuccess, function (err) {
    ok(true, "Not an image failed to load.");
  })
  .fin(start);
});

asyncTest("cannot fetch CORS by default", function() {
  Qimage("https://i.imgur.com/FDQvfuq.png")
  .then(tryToAccessImagePixels)
  .then(checkNotSuccess)
  .fail(checkFailure)
  .fin(start);
});

asyncTest("can fetch CORS images anonymously", function() {
  Qimage.anonymously("https://i.imgur.com/FDQvfuq.png")
  .then(tryToAccessImagePixels)
  .then(checkSuccess)
  .fail(checkNotFailure)
  .fin(start);
});


