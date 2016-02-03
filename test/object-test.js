var tape = require("tape"),
    interpolate = require("../");

tape("interpolateObject(a, b) interpolates defined properties in a and b", function(test) {
  test.deepEqual(interpolate.interpolateObject({a: 2, b: 12}, {a: 4, b: 24})(.5), {a: 3, b: 18});
  test.end();
});

tape("interpolateObject(a, b) interpolates inherited properties in a and b", function(test) {
  function a(a) { this.a = a; }
  a.prototype.b = 12;
  test.deepEqual(interpolate.interpolateObject(new a(2), {a: 4, b: 12})(.5), {a: 3, b: 12});
  test.deepEqual(interpolate.interpolateObject({a: 2, b: 12}, new a(4))(.5), {a: 3, b: 12});
  test.deepEqual(interpolate.interpolateObject(new a(4), new a(2))(.5), {a: 3, b: 12});
  test.end();
});

tape("interpolateObject(a, b) interpolates color properties as rgb", function(test) {
  test.deepEqual(interpolate.interpolateObject({background: "red"}, {background: "green"})(.5), {background: "rgb(128, 64, 0)"});
  test.deepEqual(interpolate.interpolateObject({fill: "red"}, {fill: "green"})(.5), {fill: "rgb(128, 64, 0)"});
  test.deepEqual(interpolate.interpolateObject({stroke: "red"}, {stroke: "green"})(.5), {stroke: "rgb(128, 64, 0)"});
  test.deepEqual(interpolate.interpolateObject({color: "red"}, {color: "green"})(.5), {color: "rgb(128, 64, 0)"});
  test.end();
});

tape("interpolateObject(a, b) interpolates nested objects and arrays", function(test) {
  test.deepEqual(interpolate.interpolateObject({foo: [2, 12]}, {foo: [4, 24]})(.5), {foo: [3, 18]});
  test.deepEqual(interpolate.interpolateObject({foo: {bar: [2, 12]}}, {foo: {bar: [4, 24]}})(.5), {foo: {bar: [3, 18]}});
  test.end();
});

tape("interpolateObject(a, b) merges non-shared properties", function(test) {
  test.deepEqual(interpolate.interpolateObject({foo: 2}, {foo: 4, bar: 12})(.5), {foo: 3, bar: 12});
  test.deepEqual(interpolate.interpolateObject({foo: 2, bar: 12}, {foo: 4})(.5), {foo: 3, bar: 12});
  test.end();
});

tape("interpolateObject(a, b) treats undefined as an empty object", function(test) {
  test.deepEqual(interpolate.interpolateObject(NaN, {foo: 2})(.5), {foo: 2});
  test.deepEqual(interpolate.interpolateObject({foo: 2}, undefined)(.5), {foo: 2});
  test.deepEqual(interpolate.interpolateObject(undefined, {foo: 2})(.5), {foo: 2});
  test.deepEqual(interpolate.interpolateObject({foo: 2}, null)(.5), {foo: 2});
  test.deepEqual(interpolate.interpolateObject(null, {foo: 2})(.5), {foo: 2});
  test.deepEqual(interpolate.interpolateObject(null, NaN)(.5), {});
  test.end();
});
