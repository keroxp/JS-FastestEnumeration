function gen(opts) {
  function genFor (content) {
    var r = "for(";
    r += "i = ";
    r += opts["++"] ? "0" : "arr.length-1";
    r += ", sum = 0";
    if (opts["++"] && !opts["arr.length"]) {
      r += ", max = arr.length";
    }
    r += ";";
    if (opts["++"]) {
      r += "i < ";
      r += opts["arr.length"] ? "arr.length" : "max";
      if (opts["|0"]) {
        r += "|0";
      }
      r += ";";
      r += opts["i++"] ? "i++" : "i=(i+1)";
      if (opts["|0"]) {
        r += "|0";
      }
    } else {
      r += "-1 < i";
      if (opts["|0"]) {
        r += "|0";
      }
      r += ";";
      r += opts["i++"] ? "i--" : "i=(i-1)";
      if (opts["|0"]) {
        r += "|0";
      }
    }
    r += ") {" + content + "}";
    return r;
  }
  function genSumup () {
    var r = "sum";
    if (opts["|0"]) {
      r += opts["i++"] ? " += arr[i]|0" : " = (sum+arr[i])|0";
    } else {
      r += opts["i++"] ? " += arr[i]" : " = sum + arr[i]";
    }
    return r + ";";
  }
  function genWhile(content) {
    var r = "i = ";
    r += opts["++"] ? "0;" : "arr.length-1;";
    r += "sum = 0;";
    if (opts["++"] && !opts["arr.length"]) {
      r += "max = arr.length;";
    }
    r += "while(";
    if (opts["++"]) {
      r += "i < ";
      r += opts["arr.length"] ? "arr.length" : "max";
    } else {
      r += "-1 < i";
    }
    r += ") {";
    r += content;
    if (opts["++"]) {
      r += opts["i++"] ? "i++" : "i=(i+1)";
    } else {
      r += opts["i++"] ? "i--" :  "i=(i-1)";
    }
    if (opts["|0"]) {
      r += "|0";
    }
    r += ";";
    r += "}";
    return r;
  }
  return (opts["for"] ? genFor(genSumup()) : genWhile(genSumup()));
}

(function() {
  function genopts (arr) {
    return {
      "for": arr[0],
      "arr.length" : arr[1],
      "++": arr[2],
      "i++": arr[3],
      "|0": arr[4]
    };
  }
  function opts2str (opts) {
    var ret = "";
    ret += "for: "+!!opts["for"];
    ret += ", arr.length: "+!!opts["arr.length"];
    ret += ", ++ : "+!!opts["++"];
    ret += ", i++: "+!!opts["i++"];
    ret += ", |0: "+!!opts["|0"];
    return ret;
  }
  var flags = [0,1,2,3,4];
  var ret = '\
var p = {\n\
  t: 0,\n\
  s: 0,\n\
  desc: "",\n\
  start: function(desc) {\n\
    this.t = 0;\n\
    this.desc = desc;\n\
    this.s = Date.now();\n\
    return this;\n\
  },\n\
  end: function() {\n\
    this.t = Date.now() - this.s;\n\
    return this.toString();\n\
  },\n\
  toString: function() {\n\
    return "takes "+this.t+" ms => "+this.desc;\n\
  }\n\
};\n\
var len = 10000000;\n\
var arr = new Array(len);\n\
var i, sum = 0;\n\
var results = [];\n\
for (i = 0; i < len; i++) {\n\
  arr[i] = i;\n\
}\n\
console.log("len="+len);\n\
';
  for (var i = 0; i < (1 << flags.length); i++) {
    var opts = genopts(flags.map(function(j) {
      return i & (1 << j);
    }));
    ret += "function loop"+i+"() {";
    ret += gen(opts);
    ret += "}\n";
  }
  for (var i = 0; i < (1 << flags.length); i++) {
    ret += "p.start(loop"+i+".toString());\n"
    ret += "loop"+i+"();\n";
    ret += "console.log(p.end());\n";
  }
  console.log(ret);
}).call(this);