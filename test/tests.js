
function checkNotSuccess (res) { console.log(res); throw "The result should never be successful!"; }
function checkSuccess (res) { ok(true, "Successful promise."); }
function checkNotFailure (err) { console.log(err); throw "Unexpected failure: "+err; }
function checkSameObject (value) { 
  return function (v) {
    deepEqual(value===v, "result is "+value);
  }
}

test("Qimage is defined", function () {
  ok(typeof Qimage === "function", "Qimage is a function");
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


