onmessage = function () {
  var p = {
    t: 0,
    s: 0,
    desc: "",
    start: function(desc) {
      this.t = 0;
      this.desc = desc;
      this.s = Date.now();
      return this;
    },
    end: function() {
      this.t = Date.now() - this.s;
      return this.t;
    },
    toString: function() {
      return "takes "+this.t+" ms => "+this.desc;
    }
  };
  var len = 10000000;
  var trycnt = 5;
  var i,sum;
  var results = [];
  function newarr() {
    var ret =  new Array(len);
    for (i = 0; i < len; i++) {
      ret[i] = i;
    }
    return ret;
  }
  var funcs = [];
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum = sum + arr[i];i=(i-1);}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i;i=(i-1)) {sum = sum + arr[i];}});
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum = sum + arr[i];i=(i-1);}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i;i=(i-1)) {sum = sum + arr[i];}});
  funcs.push(function () {i = 0;sum = 0;max = arr.length;while(i < max) {sum = sum + arr[i];i=(i+1);}});
  funcs.push(function () {for(i = 0, sum = 0, max = arr.length;i < max;i=(i+1)) {sum = sum + arr[i];}});
  funcs.push(function () {i = 0;sum = 0;while(i < arr.length) {sum = sum + arr[i];i=(i+1);}});
  funcs.push(function () {for(i = 0, sum = 0;i < arr.length;i=(i+1)) {sum = sum + arr[i];}});
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum += arr[i];i--;}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i;i--) {sum += arr[i];}});
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum += arr[i];i--;}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i;i--) {sum += arr[i];}});
  funcs.push(function () {i = 0;sum = 0;max = arr.length;while(i < max) {sum += arr[i];i++;}});
  funcs.push(function () {for(i = 0, sum = 0, max = arr.length;i < max;i++) {sum += arr[i];}});
  funcs.push(function () {i = 0;sum = 0;while(i < arr.length) {sum += arr[i];i++;}});
  funcs.push(function () {for(i = 0, sum = 0;i < arr.length;i++) {sum += arr[i];}});
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum = (sum+arr[i])|0;i=(i-1)|0;}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i|0;i=(i-1)|0) {sum = (sum+arr[i])|0;}});
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum = (sum+arr[i])|0;i=(i-1)|0;}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i|0;i=(i-1)|0) {sum = (sum+arr[i])|0;}});
  funcs.push(function () {i = 0;sum = 0;max = arr.length;while(i < max) {sum = (sum+arr[i])|0;i=(i+1)|0;}});
  funcs.push(function () {for(i = 0, sum = 0, max = arr.length;i < max|0;i=(i+1)|0) {sum = (sum+arr[i])|0;}});
  funcs.push(function () {i = 0;sum = 0;while(i < arr.length) {sum = (sum+arr[i])|0;i=(i+1)|0;}});
  funcs.push(function () {for(i = 0, sum = 0;i < arr.length|0;i=(i+1)|0) {sum = (sum+arr[i])|0;}});
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum += arr[i]|0;i--|0;}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i|0;i--|0) {sum += arr[i]|0;}});
  funcs.push(function () {i = arr.length-1;sum = 0;while(-1 < i) {sum += arr[i]|0;i--|0;}});
  funcs.push(function () {for(i = arr.length-1, sum = 0;-1 < i|0;i--|0) {sum += arr[i]|0;}});
  funcs.push(function () {i = 0;sum = 0;max = arr.length;while(i < max) {sum += arr[i]|0;i++|0;}});
  funcs.push(function () {for(i = 0, sum = 0, max = arr.length;i < max|0;i++|0) {sum += arr[i]|0;}});
  funcs.push(function () {i = 0;sum = 0;while(i < arr.length) {sum += arr[i]|0;i++|0;}});
  funcs.push(function () {for(i = 0, sum = 0;i < arr.length|0;i++|0) {sum += arr[i]|0;}});
  console.log("test sarted.");
  console.log("len="+len);
  for (var ii = 0; ii < (1 << 5); ii++) {
    var func = funcs[ii];
    console.log(func.toString());
    var result = {
      number: ii,
      times : []
    };
    var s = 0;
    for (var kk = 0; kk < trycnt; kk++) {
      var arr = newarr();
      p.start("#"+ii+" "+func.toString());
      func();
      var t = p.end();
      s += t;
      result.times.push(t);
      result.desc = p.desc;
    }
    result.average = s/trycnt;
    results[ii] = result;
  }
  var ret = JSON.stringify({
    len: len,
    times: trycnt,
    results: results
  });
  console.log(ret);
  self.postMessage(ret);
};
