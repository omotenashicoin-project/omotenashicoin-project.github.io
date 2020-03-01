! function (t) {
  var e = {};

  function n(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
  }
  n.m = t, n.c = e, n.d = function (t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, {
      configurable: !1,
      enumerable: !0,
      get: r
    })
  }, n.r = function (t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return n.d(e, "a", e), e
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, n.p = "", n(n.s = 36)
}([function (t, e, n) {
  var r = n(7),
    o = n(6);
  e.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, e.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, e.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, e.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, e.MIXED = {
    bit: -1
  }, e.getCharCountIndicator = function (t, e) {
    if (!t.ccBits) throw new Error("Invalid mode: " + t);
    if (!r.isValid(e)) throw new Error("Invalid version: " + e);
    return e >= 1 && e < 10 ? t.ccBits[0] : e < 27 ? t.ccBits[1] : t.ccBits[2]
  }, e.getBestModeForData = function (t) {
    return o.testNumeric(t) ? e.NUMERIC : o.testAlphanumeric(t) ? e.ALPHANUMERIC : o.testKanji(t) ? e.KANJI : e.BYTE
  }, e.toString = function (t) {
    if (t && t.id) return t.id;
    throw new Error("Invalid mode")
  }, e.isValid = function (t) {
    return t && t.bit && t.ccBits
  }, e.from = function (t, n) {
    if (e.isValid(t)) return t;
    try {
      return function (t) {
        if ("string" != typeof t) throw new Error("Param is not a string");
        switch (t.toLowerCase()) {
        case "numeric":
          return e.NUMERIC;
        case "alphanumeric":
          return e.ALPHANUMERIC;
        case "kanji":
          return e.KANJI;
        case "byte":
          return e.BYTE;
        default:
          throw new Error("Unknown mode: " + t)
        }
      }(t)
    } catch (t) {
      return n
    }
  }
}, function (t, e) {
  var n, r = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
  e.getSymbolSize = function (t) {
    if (!t) throw new Error('"version" cannot be null or undefined');
    if (t < 1 || t > 40) throw new Error('"version" should be in range from 1 to 40');
    return 4 * t + 17
  }, e.getSymbolTotalCodewords = function (t) {
    return r[t]
  }, e.getBCHDigit = function (t) {
    for (var e = 0; 0 !== t;) e++, t >>>= 1;
    return e
  }, e.setToSJISFunction = function (t) {
    if ("function" != typeof t) throw new Error('"toSJISFunc" is not a valid function.');
    n = t
  }, e.isKanjiModeEnabled = function () {
    return void 0 !== n
  }, e.toSJIS = function (t) {
    return n(t)
  }
}, function (t, e, n) {
  "use strict";
  var r = n(4);
  i.TYPED_ARRAY_SUPPORT = function () {
    try {
      var t = new Uint8Array(1);
      return t.__proto__ = {
        __proto__: Uint8Array.prototype,
        foo: function () {
          return 42
        }
      }, 42 === t.foo()
    } catch (t) {
      return !1
    }
  }();
  var o = i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;

  function i(t, e, n) {
    return i.TYPED_ARRAY_SUPPORT || this instanceof i ? "number" == typeof t ? u(this, t) : function (t, e, n, r) {
      if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
      if ("undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer) return function (t, e, n, r) {
        if (n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
        if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
        var o;
        o = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
        i.TYPED_ARRAY_SUPPORT ? o.__proto__ = i.prototype : o = f(t, o);
        return o
      }(t, e, n, r);
      if ("string" == typeof e) return function (t, e) {
        var n = 0 | l(e),
          r = s(t, n),
          o = r.write(e);
        o !== n && (r = r.slice(0, o));
        return r
      }(t, e);
      return function (t, e) {
        if (i.isBuffer(e)) {
          var n = 0 | a(e.length),
            r = s(t, n);
          return 0 === r.length ? r : (e.copy(r, 0, 0, n), r)
        }
        if (e) {
          if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (o = e.length) != o ? s(t, 0) : f(t, e);
          if ("Buffer" === e.type && Array.isArray(e.data)) return f(t, e.data)
        }
        var o;
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
      }(t, e)
    }(this, t, e, n) : new i(t, e, n)
  }

  function a(t) {
    if (t >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
    return 0 | t
  }

  function s(t, e) {
    var n;
    return i.TYPED_ARRAY_SUPPORT ? (n = new Uint8Array(e)).__proto__ = i.prototype : (null === (n = t) && (n = new i(e)), n.length = e), n
  }

  function u(t, e) {
    var n = s(t, e < 0 ? 0 : 0 | a(e));
    if (!i.TYPED_ARRAY_SUPPORT)
      for (var r = 0; r < e; ++r) n[r] = 0;
    return n
  }

  function f(t, e) {
    for (var n = e.length < 0 ? 0 : 0 | a(e.length), r = s(t, n), o = 0; o < n; o += 1) r[o] = 255 & e[o];
    return r
  }

  function c(t, e) {
    var n;
    e = e || 1 / 0;
    for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
      if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
        if (!o) {
          if (n > 56319) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue
          }
          if (a + 1 === r) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue
          }
          o = n;
          continue
        }
        if (n < 56320) {
          (e -= 3) > -1 && i.push(239, 191, 189), o = n;
          continue
        }
        n = 65536 + (o - 55296 << 10 | n - 56320)
      } else o && (e -= 3) > -1 && i.push(239, 191, 189);
      if (o = null, n < 128) {
        if ((e -= 1) < 0) break;
        i.push(n)
      } else if (n < 2048) {
        if ((e -= 2) < 0) break;
        i.push(n >> 6 | 192, 63 & n | 128)
      } else if (n < 65536) {
        if ((e -= 3) < 0) break;
        i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
      } else {
        if (!(n < 1114112)) throw new Error("Invalid code point");
        if ((e -= 4) < 0) break;
        i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
      }
    }
    return i
  }

  function l(t) {
    return i.isBuffer(t) ? t.length : "undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer) ? t.byteLength : ("string" != typeof t && (t = "" + t), 0 === t.length ? 0 : c(t).length)
  }
  i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
    value: null,
    configurable: !0,
    enumerable: !1,
    writable: !1
  })), i.prototype.write = function (t, e, n) {
    void 0 === e ? (n = this.length, e = 0) : void 0 === n && "string" == typeof e ? (n = this.length, e = 0) : isFinite(e) && (e |= 0, isFinite(n) ? n |= 0 : n = void 0);
    var r = this.length - e;
    if ((void 0 === n || n > r) && (n = r), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    return function (t, e, n, r) {
      return function (t, e, n, r) {
        for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
        return o
      }(c(e, t.length - n), t, n, r)
    }(this, t, e, n)
  }, i.prototype.slice = function (t, e) {
    var n, r = this.length;
    if (t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), i.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = i.prototype;
    else {
      var o = e - t;
      n = new i(o, void 0);
      for (var a = 0; a < o; ++a) n[a] = this[a + t]
    }
    return n
  }, i.prototype.copy = function (t, e, n, r) {
    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
    if (0 === t.length || 0 === this.length) return 0;
    if (e < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
    if (r < 0) throw new RangeError("sourceEnd out of bounds");
    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
    var o, a = r - n;
    if (this === t && n < e && e < r)
      for (o = a - 1; o >= 0; --o) t[o + e] = this[o + n];
    else if (a < 1e3 || !i.TYPED_ARRAY_SUPPORT)
      for (o = 0; o < a; ++o) t[o + e] = this[o + n];
    else Uint8Array.prototype.set.call(t, this.subarray(n, n + a), e);
    return a
  }, i.prototype.fill = function (t, e, n) {
    if ("string" == typeof t) {
      if ("string" == typeof e ? (e = 0, n = this.length) : "string" == typeof n && (n = this.length), 1 === t.length) {
        var r = t.charCodeAt(0);
        r < 256 && (t = r)
      }
    } else "number" == typeof t && (t &= 255);
    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
    if (n <= e) return this;
    var o;
    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
      for (o = e; o < n; ++o) this[o] = t;
    else {
      var a = i.isBuffer(t) ? t : new i(t),
        s = a.length;
      for (o = 0; o < n - e; ++o) this[o + e] = a[o % s]
    }
    return this
  }, i.concat = function (t, e) {
    if (!r(t)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === t.length) return s(null, 0);
    var n;
    if (void 0 === e)
      for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
    var o = u(null, e),
      a = 0;
    for (n = 0; n < t.length; ++n) {
      var f = t[n];
      if (!i.isBuffer(f)) throw new TypeError('"list" argument must be an Array of Buffers');
      f.copy(o, a), a += f.length
    }
    return o
  }, i.byteLength = l, i.prototype._isBuffer = !0, i.isBuffer = function (t) {
    return !(null == t || !t._isBuffer)
  }, t.exports = i
}, function (t, e) {
  e.L = {
    bit: 1
  }, e.M = {
    bit: 0
  }, e.Q = {
    bit: 3
  }, e.H = {
    bit: 2
  }, e.isValid = function (t) {
    return t && void 0 !== t.bit && t.bit >= 0 && t.bit < 4
  }, e.from = function (t, n) {
    if (e.isValid(t)) return t;
    try {
      return function (t) {
        if ("string" != typeof t) throw new Error("Param is not a string");
        switch (t.toLowerCase()) {
        case "l":
        case "low":
          return e.L;
        case "m":
        case "medium":
          return e.M;
        case "q":
        case "quartile":
          return e.Q;
        case "h":
        case "high":
          return e.H;
        default:
          throw new Error("Unknown EC Level: " + t)
        }
      }(t)
    } catch (t) {
      return n
    }
  }
}, function (t, e) {
  var n = {}.toString;
  t.exports = Array.isArray || function (t) {
    return "[object Array]" == n.call(t)
  }
}, function (t, e) {
  function n(t) {
    if ("string" != typeof t) throw new Error("Color should be defined as hex string");
    var e = t.slice().replace("#", "").split("");
    if (e.length < 3 || 5 === e.length || e.length > 8) throw new Error("Invalid hex color: " + t);
    3 !== e.length && 4 !== e.length || (e = Array.prototype.concat.apply([], e.map(function (t) {
      return [t, t]
    }))), 6 === e.length && e.push("F", "F");
    var n = parseInt(e.join(""), 16);
    return {
      r: n >> 24 & 255,
      g: n >> 16 & 255,
      b: n >> 8 & 255,
      a: 255 & n,
      hex: "#" + e.slice(0, 6).join("")
    }
  }
  e.getOptions = function (t) {
    t || (t = {}), t.color || (t.color = {});
    var e = void 0 === t.margin || null === t.margin || t.margin < 0 ? 4 : t.margin,
      r = t.width && t.width >= 21 ? t.width : void 0,
      o = t.scale || 4;
    return {
      width: r,
      scale: r ? 4 : o,
      margin: e,
      color: {
        dark: n(t.color.dark || "#000000ff"),
        light: n(t.color.light || "#ffffffff")
      },
      type: t.type,
      rendererOpts: t.rendererOpts || {}
    }
  }, e.getScale = function (t, e) {
    return e.width && e.width >= t + 2 * e.margin ? e.width / (t + 2 * e.margin) : e.scale
  }, e.getImageWidth = function (t, n) {
    var r = e.getScale(t, n);
    return Math.floor((t + 2 * n.margin) * r)
  }, e.qrToImageData = function (t, n, r) {
    for (var o = n.modules.size, i = n.modules.data, a = e.getScale(o, r), s = Math.floor((o + 2 * r.margin) * a), u = r.margin * a, f = [r.color.light, r.color.dark], c = 0; c < s; c++)
      for (var l = 0; l < s; l++) {
        var h = 4 * (c * s + l),
          d = r.color.light;
        if (c >= u && l >= u && c < s - u && l < s - u) d = f[i[Math.floor((c - u) / a) * o + Math.floor((l - u) / a)] ? 1 : 0];
        t[h++] = d.r, t[h++] = d.g, t[h++] = d.b, t[h] = d.a
      }
  }
}, function (t, e) {
  var n = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",
    r = "(?:(?![A-Z0-9 $%*+\\-./:]|" + (n = n.replace(/u/g, "\\u")) + ").)+";
  e.KANJI = new RegExp(n, "g"), e.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), e.BYTE = new RegExp(r, "g"), e.NUMERIC = new RegExp("[0-9]+", "g"), e.ALPHANUMERIC = new RegExp("[A-Z $%*+\\-./:]+", "g");
  var o = new RegExp("^" + n + "$"),
    i = new RegExp("^[0-9]+$"),
    a = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  e.testKanji = function (t) {
    return o.test(t)
  }, e.testNumeric = function (t) {
    return i.test(t)
  }, e.testAlphanumeric = function (t) {
    return a.test(t)
  }
}, function (t, e, n) {
  var r = n(1),
    o = n(8),
    i = n(3),
    a = n(0),
    s = n(4),
    u = r.getBCHDigit(7973);

  function f(t, e) {
    return a.getCharCountIndicator(t, e) + 4
  }

  function c(t, e) {
    var n = 0;
    return t.forEach(function (t) {
      var r = f(t.mode, e);
      n += r + t.getBitsLength()
    }), n
  }
  e.isValid = function (t) {
    return !isNaN(t) && t >= 1 && t <= 40
  }, e.from = function (t, n) {
    return e.isValid(t) ? parseInt(t, 10) : n
  }, e.getCapacity = function (t, n, i) {
    if (!e.isValid(t)) throw new Error("Invalid QR Code version");
    void 0 === i && (i = a.BYTE);
    var s = 8 * (r.getSymbolTotalCodewords(t) - o.getTotalCodewordsCount(t, n));
    if (i === a.MIXED) return s;
    var u = s - f(i, t);
    switch (i) {
    case a.NUMERIC:
      return Math.floor(u / 10 * 3);
    case a.ALPHANUMERIC:
      return Math.floor(u / 11 * 2);
    case a.KANJI:
      return Math.floor(u / 13);
    case a.BYTE:
    default:
      return Math.floor(u / 8)
    }
  }, e.getBestVersionForData = function (t, n) {
    var r, o = i.from(n, i.M);
    if (s(t)) {
      if (t.length > 1) return function (t, n) {
        for (var r = 1; r <= 40; r++)
          if (c(t, r) <= e.getCapacity(r, n, a.MIXED)) return r
      }(t, o);
      if (0 === t.length) return 1;
      r = t[0]
    } else r = t;
    return function (t, n, r) {
      for (var o = 1; o <= 40; o++)
        if (n <= e.getCapacity(o, r, t)) return o
    }(r.mode, r.getLength(), o)
  }, e.getEncodedBits = function (t) {
    if (!e.isValid(t) || t < 7) throw new Error("Invalid QR Code version");
    for (var n = t << 12; r.getBCHDigit(n) - u >= 0;) n ^= 7973 << r.getBCHDigit(n) - u;
    return t << 12 | n
  }
}, function (t, e, n) {
  var r = n(3),
    o = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81],
    i = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
  e.getBlocksCount = function (t, e) {
    switch (e) {
    case r.L:
      return o[4 * (t - 1) + 0];
    case r.M:
      return o[4 * (t - 1) + 1];
    case r.Q:
      return o[4 * (t - 1) + 2];
    case r.H:
      return o[4 * (t - 1) + 3];
    default:
      return
    }
  }, e.getTotalCodewordsCount = function (t, e) {
    switch (e) {
    case r.L:
      return i[4 * (t - 1) + 0];
    case r.M:
      return i[4 * (t - 1) + 1];
    case r.Q:
      return i[4 * (t - 1) + 2];
    case r.H:
      return i[4 * (t - 1) + 3];
    default:
      return
    }
  }
}, function (t, e, n) {
  var r = n(5);

  function o(t, e) {
    var n = t.a / 255,
      r = e + '="' + t.hex + '"';
    return n < 1 ? r + " " + e + '-opacity="' + n.toFixed(2).slice(1) + '"' : r
  }

  function i(t, e, n) {
    var r = t + e;
    return void 0 !== n && (r += " " + n), r
  }
  e.render = function (t, e, n) {
    var a = r.getOptions(e),
      s = t.modules.size,
      u = t.modules.data,
      f = s + 2 * a.margin,
      c = a.color.light.a ? "<path " + o(a.color.light, "fill") + ' d="M0 0h' + f + "v" + f + 'H0z"/>' : "",
      l = "<path " + o(a.color.dark, "stroke") + ' d="' + function (t, e, n) {
        for (var r = "", o = 0, a = !1, s = 0, u = 0; u < t.length; u++) {
          var f = Math.floor(u % e),
            c = Math.floor(u / e);
          f || a || (a = !0), t[u] ? (s++, u > 0 && f > 0 && t[u - 1] || (r += a ? i("M", f + n, .5 + c + n) : i("m", o, 0), o = 0, a = !1), f + 1 < e && t[u + 1] || (r += i("h", s), s = 0)) : o++
        }
        return r
      }(u, s, a.margin) + '"/>',
      h = 'viewBox="0 0 ' + f + " " + f + '"',
      d = '<svg xmlns="http://www.w3.org/2000/svg" ' + (a.width ? 'width="' + a.width + '" height="' + a.width + '" ' : "") + h + ">" + c + l + "</svg>";
    return "function" == typeof n && n(null, d), d
  }
}, function (t, e, n) {
  var r = n(5);
  e.render = function (t, e, n) {
    var o = n,
      i = e;
    void 0 !== o || e && e.getContext || (o = e, e = void 0), e || (i = function () {
      try {
        return document.createElement("canvas")
      } catch (t) {
        throw new Error("You need to specify a canvas element")
      }
    }()), o = r.getOptions(o);
    var a = r.getImageWidth(t.modules.size, o),
      s = i.getContext("2d"),
      u = s.createImageData(a, a);
    return r.qrToImageData(u.data, t, o),
      function (t, e, n) {
        t.clearRect(0, 0, e.width, e.height), e.style || (e.style = {}), e.height = n, e.width = n, e.style.height = n + "px", e.style.width = n + "px"
      }(s, i, a), s.putImageData(u, 0, 0), i
  }, e.renderToDataURL = function (t, n, r) {
    var o = r;
    void 0 !== o || n && n.getContext || (o = n, n = void 0), o || (o = {});
    var i = e.render(t, n, o),
      a = o.type || "image/png",
      s = o.rendererOpts || {};
    return i.toDataURL(a, s.quality)
  }
}, function (t, e, n) {
  "use strict";
  var r = {
    single_source_shortest_paths: function (t, e, n) {
      var o = {},
        i = {};
      i[e] = 0;
      var a, s, u, f, c, l, h, d = r.PriorityQueue.make();
      for (d.push(e, 0); !d.empty();)
        for (u in s = (a = d.pop()).value, f = a.cost, c = t[s] || {}) c.hasOwnProperty(u) && (l = f + c[u], h = i[u], (void 0 === i[u] || h > l) && (i[u] = l, d.push(u, l), o[u] = s));
      if (void 0 !== n && void 0 === i[n]) {
        var g = ["Could not find a path from ", e, " to ", n, "."].join("");
        throw new Error(g)
      }
      return o
    },
    extract_shortest_path_from_predecessor_list: function (t, e) {
      for (var n = [], r = e; r;) n.push(r), t[r], r = t[r];
      return n.reverse(), n
    },
    find_path: function (t, e, n) {
      var o = r.single_source_shortest_paths(t, e, n);
      return r.extract_shortest_path_from_predecessor_list(o, n)
    },
    PriorityQueue: {
      make: function (t) {
        var e, n = r.PriorityQueue,
          o = {};
        for (e in t = t || {}, n) n.hasOwnProperty(e) && (o[e] = n[e]);
        return o.queue = [], o.sorter = t.sorter || n.default_sorter, o
      },
      default_sorter: function (t, e) {
        return t.cost - e.cost
      },
      push: function (t, e) {
        var n = {
          value: t,
          cost: e
        };
        this.queue.push(n), this.queue.sort(this.sorter)
      },
      pop: function () {
        return this.queue.shift()
      },
      empty: function () {
        return 0 === this.queue.length
      }
    }
  };
  t.exports = r
}, function (t, e, n) {
  var r = n(0),
    o = n(1);

  function i(t) {
    this.mode = r.KANJI, this.data = t
  }
  i.getBitsLength = function (t) {
    return 13 * t
  }, i.prototype.getLength = function () {
    return this.data.length
  }, i.prototype.getBitsLength = function () {
    return i.getBitsLength(this.data.length)
  }, i.prototype.write = function (t) {
    var e;
    for (e = 0; e < this.data.length; e++) {
      var n = o.toSJIS(this.data[e]);
      if (n >= 33088 && n <= 40956) n -= 33088;
      else {
        if (!(n >= 57408 && n <= 60351)) throw new Error("Invalid SJIS character: " + this.data[e] + "\nMake sure your charset is UTF-8");
        n -= 49472
      }
      n = 192 * (n >>> 8 & 255) + (255 & n), t.put(n, 13)
    }
  }, t.exports = i
}, function (t, e, n) {
  var r = n(2),
    o = n(0);

  function i(t) {
    this.mode = o.BYTE, this.data = new r(t)
  }
  i.getBitsLength = function (t) {
    return 8 * t
  }, i.prototype.getLength = function () {
    return this.data.length
  }, i.prototype.getBitsLength = function () {
    return i.getBitsLength(this.data.length)
  }, i.prototype.write = function (t) {
    for (var e = 0, n = this.data.length; e < n; e++) t.put(this.data[e], 8)
  }, t.exports = i
}, function (t, e, n) {
  var r = n(0),
    o = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];

  function i(t) {
    this.mode = r.ALPHANUMERIC, this.data = t
  }
  i.getBitsLength = function (t) {
    return 11 * Math.floor(t / 2) + t % 2 * 6
  }, i.prototype.getLength = function () {
    return this.data.length
  }, i.prototype.getBitsLength = function () {
    return i.getBitsLength(this.data.length)
  }, i.prototype.write = function (t) {
    var e;
    for (e = 0; e + 2 <= this.data.length; e += 2) {
      var n = 45 * o.indexOf(this.data[e]);
      n += o.indexOf(this.data[e + 1]), t.put(n, 11)
    }
    this.data.length % 2 && t.put(o.indexOf(this.data[e]), 6)
  }, t.exports = i
}, function (t, e, n) {
  var r = n(0);

  function o(t) {
    this.mode = r.NUMERIC, this.data = t.toString()
  }
  o.getBitsLength = function (t) {
    return 10 * Math.floor(t / 3) + (t % 3 ? t % 3 * 3 + 1 : 0)
  }, o.prototype.getLength = function () {
    return this.data.length
  }, o.prototype.getBitsLength = function () {
    return o.getBitsLength(this.data.length)
  }, o.prototype.write = function (t) {
    var e, n, r;
    for (e = 0; e + 3 <= this.data.length; e += 3) n = this.data.substr(e, 3), r = parseInt(n, 10), t.put(r, 10);
    var o = this.data.length - e;
    o > 0 && (n = this.data.substr(e), r = parseInt(n, 10), t.put(r, 3 * o + 1))
  }, t.exports = o
}, function (t, e, n) {
  var r = n(0),
    o = n(15),
    i = n(14),
    a = n(13),
    s = n(12),
    u = n(6),
    f = n(1),
    c = n(11);

  function l(t) {
    return unescape(encodeURIComponent(t)).length
  }

  function h(t, e, n) {
    for (var r, o = []; null !== (r = t.exec(n));) o.push({
      data: r[0],
      index: r.index,
      mode: e,
      length: r[0].length
    });
    return o
  }

  function d(t) {
    var e, n, o = h(u.NUMERIC, r.NUMERIC, t),
      i = h(u.ALPHANUMERIC, r.ALPHANUMERIC, t);
    return f.isKanjiModeEnabled() ? (e = h(u.BYTE, r.BYTE, t), n = h(u.KANJI, r.KANJI, t)) : (e = h(u.BYTE_KANJI, r.BYTE, t), n = []), o.concat(i, e, n).sort(function (t, e) {
      return t.index - e.index
    }).map(function (t) {
      return {
        data: t.data,
        mode: t.mode,
        length: t.length
      }
    })
  }

  function g(t, e) {
    switch (e) {
    case r.NUMERIC:
      return o.getBitsLength(t);
    case r.ALPHANUMERIC:
      return i.getBitsLength(t);
    case r.KANJI:
      return s.getBitsLength(t);
    case r.BYTE:
      return a.getBitsLength(t)
    }
  }

  function p(t, e) {
    var n, u = r.getBestModeForData(t);
    if ((n = r.from(e, u)) !== r.BYTE && n.bit < u.bit) throw new Error('"' + t + '" cannot be encoded with mode ' + r.toString(n) + ".\n Suggested mode is: " + r.toString(u));
    switch (n !== r.KANJI || f.isKanjiModeEnabled() || (n = r.BYTE), n) {
    case r.NUMERIC:
      return new o(t);
    case r.ALPHANUMERIC:
      return new i(t);
    case r.KANJI:
      return new s(t);
    case r.BYTE:
      return new a(t)
    }
  }
  e.fromArray = function (t) {
    return t.reduce(function (t, e) {
      return "string" == typeof e ? t.push(p(e, null)) : e.data && t.push(p(e.data, e.mode)), t
    }, [])
  }, e.fromString = function (t, n) {
    for (var o = function (t, e) {
        for (var n = {}, o = {
            start: {}
          }, i = ["start"], a = 0; a < t.length; a++) {
          for (var s = t[a], u = [], f = 0; f < s.length; f++) {
            var c = s[f],
              l = "" + a + f;
            u.push(l), n[l] = {
              node: c,
              lastCount: 0
            }, o[l] = {};
            for (var h = 0; h < i.length; h++) {
              var d = i[h];
              n[d] && n[d].node.mode === c.mode ? (o[d][l] = g(n[d].lastCount + c.length, c.mode) - g(n[d].lastCount, c.mode), n[d].lastCount += c.length) : (n[d] && (n[d].lastCount = c.length), o[d][l] = g(c.length, c.mode) + 4 + r.getCharCountIndicator(c.mode, e))
            }
          }
          i = u
        }
        for (h = 0; h < i.length; h++) o[i[h]].end = 0;
        return {
          map: o,
          table: n
        }
      }(function (t) {
        for (var e = [], n = 0; n < t.length; n++) {
          var o = t[n];
          switch (o.mode) {
          case r.NUMERIC:
            e.push([o, {
              data: o.data,
              mode: r.ALPHANUMERIC,
              length: o.length
            }, {
              data: o.data,
              mode: r.BYTE,
              length: o.length
            }]);
            break;
          case r.ALPHANUMERIC:
            e.push([o, {
              data: o.data,
              mode: r.BYTE,
              length: o.length
            }]);
            break;
          case r.KANJI:
            e.push([o, {
              data: o.data,
              mode: r.BYTE,
              length: l(o.data)
            }]);
            break;
          case r.BYTE:
            e.push([{
              data: o.data,
              mode: r.BYTE,
              length: l(o.data)
            }])
          }
        }
        return e
      }(d(t, f.isKanjiModeEnabled())), n), i = c.find_path(o.map, "start", "end"), a = [], s = 1; s < i.length - 1; s++) a.push(o.table[i[s]].node);
    return e.fromArray(function (t) {
      return t.reduce(function (t, e) {
        var n = t.length - 1 >= 0 ? t[t.length - 1] : null;
        return n && n.mode === e.mode ? (t[t.length - 1].data += e.data, t) : (t.push(e), t)
      }, [])
    }(a))
  }, e.rawSplit = function (t) {
    return e.fromArray(d(t, f.isKanjiModeEnabled()))
  }
}, function (t, e, n) {
  var r = n(1),
    o = r.getBCHDigit(1335);
  e.getEncodedBits = function (t, e) {
    for (var n = t.bit << 3 | e, i = n << 10; r.getBCHDigit(i) - o >= 0;) i ^= 1335 << r.getBCHDigit(i) - o;
    return 21522 ^ (n << 10 | i)
  }
}, function (t, e, n) {
  var r = n(2),
    o = new r(512),
    i = new r(256);
  ! function () {
    for (var t = 1, e = 0; e < 255; e++) o[e] = t, i[t] = e, 256 & (t <<= 1) && (t ^= 285);
    for (e = 255; e < 512; e++) o[e] = o[e - 255]
  }(), e.log = function (t) {
    if (t < 1) throw new Error("log(" + t + ")");
    return i[t]
  }, e.exp = function (t) {
    return o[t]
  }, e.mul = function (t, e) {
    return 0 === t || 0 === e ? 0 : o[i[t] + i[e]]
  }
}, function (t, e, n) {
  var r = n(2),
    o = n(18);
  e.mul = function (t, e) {
    var n = new r(t.length + e.length - 1);
    n.fill(0);
    for (var i = 0; i < t.length; i++)
      for (var a = 0; a < e.length; a++) n[i + a] ^= o.mul(t[i], e[a]);
    return n
  }, e.mod = function (t, e) {
    for (var n = new r(t); n.length - e.length >= 0;) {
      for (var i = n[0], a = 0; a < e.length; a++) n[a] ^= o.mul(e[a], i);
      for (var s = 0; s < n.length && 0 === n[s];) s++;
      n = n.slice(s)
    }
    return n
  }, e.generateECPolynomial = function (t) {
    for (var n = new r([1]), i = 0; i < t; i++) n = e.mul(n, [1, o.exp(i)]);
    return n
  }
}, function (t, e, n) {
  var r = n(2),
    o = n(19);

  function i(t) {
    this.genPoly = void 0, this.degree = t, this.degree && this.initialize(this.degree)
  }
  i.prototype.initialize = function (t) {
    this.degree = t, this.genPoly = o.generateECPolynomial(this.degree)
  }, i.prototype.encode = function (t) {
    if (!this.genPoly) throw new Error("Encoder not initialized");
    var e = new r(this.degree);
    e.fill(0);
    var n = r.concat([t, e], t.length + this.degree),
      i = o.mod(n, this.genPoly),
      a = this.degree - i.length;
    if (a > 0) {
      var s = new r(this.degree);
      return s.fill(0), i.copy(s, a), s
    }
    return i
  }, t.exports = i
}, function (t, e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  var n = 3,
    r = 3,
    o = 40,
    i = 10;

  function a(t, n, r) {
    switch (t) {
    case e.Patterns.PATTERN000:
      return (n + r) % 2 == 0;
    case e.Patterns.PATTERN001:
      return n % 2 == 0;
    case e.Patterns.PATTERN010:
      return r % 3 == 0;
    case e.Patterns.PATTERN011:
      return (n + r) % 3 == 0;
    case e.Patterns.PATTERN100:
      return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 == 0;
    case e.Patterns.PATTERN101:
      return n * r % 2 + n * r % 3 == 0;
    case e.Patterns.PATTERN110:
      return (n * r % 2 + n * r % 3) % 2 == 0;
    case e.Patterns.PATTERN111:
      return (n * r % 3 + (n + r) % 2) % 2 == 0;
    default:
      throw new Error("bad maskPattern:" + t)
    }
  }
  e.isValid = function (t) {
    return t && "" !== t && !isNaN(t) && t >= 0 && t <= 7
  }, e.from = function (t) {
    return e.isValid(t) ? parseInt(t, 10) : void 0
  }, e.getPenaltyN1 = function (t) {
    for (var e = t.size, r = 0, o = 0, i = 0, a = null, s = null, u = 0; u < e; u++) {
      o = i = 0, a = s = null;
      for (var f = 0; f < e; f++) {
        var c = t.get(u, f);
        c === a ? o++ : (o >= 5 && (r += n + (o - 5)), a = c, o = 1), (c = t.get(f, u)) === s ? i++ : (i >= 5 && (r += n + (i - 5)), s = c, i = 1)
      }
      o >= 5 && (r += n + (o - 5)), i >= 5 && (r += n + (i - 5))
    }
    return r
  }, e.getPenaltyN2 = function (t) {
    for (var e = t.size, n = 0, o = 0; o < e - 1; o++)
      for (var i = 0; i < e - 1; i++) {
        var a = t.get(o, i) + t.get(o, i + 1) + t.get(o + 1, i) + t.get(o + 1, i + 1);
        4 !== a && 0 !== a || n++
      }
    return n * r
  }, e.getPenaltyN3 = function (t) {
    for (var e = t.size, n = 0, r = 0, i = 0, a = 0; a < e; a++) {
      r = i = 0;
      for (var s = 0; s < e; s++) r = r << 1 & 2047 | t.get(a, s), s >= 10 && (1488 === r || 93 === r) && n++, i = i << 1 & 2047 | t.get(s, a), s >= 10 && (1488 === i || 93 === i) && n++
    }
    return n * o
  }, e.getPenaltyN4 = function (t) {
    for (var e = 0, n = t.data.length, r = 0; r < n; r++) e += t.data[r];
    return Math.abs(Math.ceil(100 * e / n / 5) - 10) * i
  }, e.applyMask = function (t, e) {
    for (var n = e.size, r = 0; r < n; r++)
      for (var o = 0; o < n; o++) e.isReserved(o, r) || e.xor(o, r, a(t, o, r))
  }, e.getBestMask = function (t, n) {
    for (var r = Object.keys(e.Patterns).length, o = 0, i = 1 / 0, a = 0; a < r; a++) {
      n(a), e.applyMask(a, t);
      var s = e.getPenaltyN1(t) + e.getPenaltyN2(t) + e.getPenaltyN3(t) + e.getPenaltyN4(t);
      e.applyMask(a, t), s < i && (i = s, o = a)
    }
    return o
  }
}, function (t, e, n) {
  var r = n(1).getSymbolSize;
  e.getPositions = function (t) {
    var e = r(t);
    return [
      [0, 0],
      [e - 7, 0],
      [0, e - 7]
    ]
  }
}, function (t, e, n) {
  var r = n(1).getSymbolSize;
  e.getRowColCoords = function (t) {
    if (1 === t) return [];
    for (var e = Math.floor(t / 7) + 2, n = r(t), o = 145 === n ? 26 : 2 * Math.ceil((n - 13) / (2 * e - 2)), i = [n - 7], a = 1; a < e - 1; a++) i[a] = i[a - 1] - o;
    return i.push(6), i.reverse()
  }, e.getPositions = function (t) {
    for (var n = [], r = e.getRowColCoords(t), o = r.length, i = 0; i < o; i++)
      for (var a = 0; a < o; a++) 0 === i && 0 === a || 0 === i && a === o - 1 || i === o - 1 && 0 === a || n.push([r[i], r[a]]);
    return n
  }
}, function (t, e, n) {
  var r = n(2);

  function o(t) {
    if (!t || t < 1) throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = t, this.data = new r(t * t), this.data.fill(0), this.reservedBit = new r(t * t), this.reservedBit.fill(0)
  }
  o.prototype.set = function (t, e, n, r) {
    var o = t * this.size + e;
    this.data[o] = n, r && (this.reservedBit[o] = !0)
  }, o.prototype.get = function (t, e) {
    return this.data[t * this.size + e]
  }, o.prototype.xor = function (t, e, n) {
    this.data[t * this.size + e] ^= n
  }, o.prototype.isReserved = function (t, e) {
    return this.reservedBit[t * this.size + e]
  }, t.exports = o
}, function (t, e) {
  function n() {
    this.buffer = [], this.length = 0
  }
  n.prototype = {
    get: function (t) {
      var e = Math.floor(t / 8);
      return 1 == (this.buffer[e] >>> 7 - t % 8 & 1)
    },
    put: function (t, e) {
      for (var n = 0; n < e; n++) this.putBit(1 == (t >>> e - n - 1 & 1))
    },
    getLengthInBits: function () {
      return this.length
    },
    putBit: function (t) {
      var e = Math.floor(this.length / 8);
      this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
    }
  }, t.exports = n
}, function (t, e, n) {
  var r = n(2),
    o = n(1),
    i = n(3),
    a = n(25),
    s = n(24),
    u = n(23),
    f = n(22),
    c = n(21),
    l = n(8),
    h = n(20),
    d = n(7),
    g = n(17),
    p = n(0),
    v = n(16),
    m = n(4);

  function y(t, e, n) {
    var r, o, i = t.size,
      a = g.getEncodedBits(e, n);
    for (r = 0; r < 15; r++) o = 1 == (a >> r & 1), r < 6 ? t.set(r, 8, o, !0) : r < 8 ? t.set(r + 1, 8, o, !0) : t.set(i - 15 + r, 8, o, !0), r < 8 ? t.set(8, i - r - 1, o, !0) : r < 9 ? t.set(8, 15 - r - 1 + 1, o, !0) : t.set(8, 15 - r - 1, o, !0);
    t.set(i - 8, 8, 1, !0)
  }

  function b(t, e, n) {
    var i = new a;
    n.forEach(function (e) {
      i.put(e.mode.bit, 4), i.put(e.getLength(), p.getCharCountIndicator(e.mode, t)), e.write(i)
    });
    var s = 8 * (o.getSymbolTotalCodewords(t) - l.getTotalCodewordsCount(t, e));
    for (i.getLengthInBits() + 4 <= s && i.put(0, 4); i.getLengthInBits() % 8 != 0;) i.putBit(0);
    for (var u = (s - i.getLengthInBits()) / 8, f = 0; f < u; f++) i.put(f % 2 ? 17 : 236, 8);
    return function (t, e, n) {
      for (var i = o.getSymbolTotalCodewords(e), a = l.getTotalCodewordsCount(e, n), s = i - a, u = l.getBlocksCount(e, n), f = u - i % u, c = Math.floor(i / u), d = Math.floor(s / u), g = d + 1, p = c - d, v = new h(p), m = 0, y = new Array(u), b = new Array(u), w = 0, E = new r(t.buffer), A = 0; A < u; A++) {
        var R = A < f ? d : g;
        y[A] = E.slice(m, m + R), b[A] = v.encode(y[A]), m += R, w = Math.max(w, R)
      }
      var B, T, x = new r(i),
        C = 0;
      for (B = 0; B < w; B++)
        for (T = 0; T < u; T++) B < y[T].length && (x[C++] = y[T][B]);
      for (B = 0; B < p; B++)
        for (T = 0; T < u; T++) x[C++] = b[T][B];
      return x
    }(i, t, e)
  }

  function w(t, e, n, r) {
    var i;
    if (m(t)) i = v.fromArray(t);
    else {
      if ("string" != typeof t) throw new Error("Invalid data");
      var a = e;
      if (!a) {
        var l = v.rawSplit(t);
        a = d.getBestVersionForData(l, n)
      }
      i = v.fromString(t, a || 40)
    }
    var h = d.getBestVersionForData(i, n);
    if (!h) throw new Error("The amount of data is too big to be stored in a QR Code");
    if (e) {
      if (e < h) throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + h + ".\n")
    } else e = h;
    var g = b(e, n, i),
      p = o.getSymbolSize(e),
      w = new s(p);
    return function (t, e) {
        for (var n = t.size, r = f.getPositions(e), o = 0; o < r.length; o++)
          for (var i = r[o][0], a = r[o][1], s = -1; s <= 7; s++)
            if (!(i + s <= -1 || n <= i + s))
              for (var u = -1; u <= 7; u++) a + u <= -1 || n <= a + u || (s >= 0 && s <= 6 && (0 === u || 6 === u) || u >= 0 && u <= 6 && (0 === s || 6 === s) || s >= 2 && s <= 4 && u >= 2 && u <= 4 ? t.set(i + s, a + u, !0, !0) : t.set(i + s, a + u, !1, !0))
      }(w, e),
      function (t) {
        for (var e = t.size, n = 8; n < e - 8; n++) {
          var r = n % 2 == 0;
          t.set(n, 6, r, !0), t.set(6, n, r, !0)
        }
      }(w),
      function (t, e) {
        for (var n = u.getPositions(e), r = 0; r < n.length; r++)
          for (var o = n[r][0], i = n[r][1], a = -2; a <= 2; a++)
            for (var s = -2; s <= 2; s++) - 2 === a || 2 === a || -2 === s || 2 === s || 0 === a && 0 === s ? t.set(o + a, i + s, !0, !0) : t.set(o + a, i + s, !1, !0)
      }(w, e), y(w, n, 0), e >= 7 && function (t, e) {
        for (var n, r, o, i = t.size, a = d.getEncodedBits(e), s = 0; s < 18; s++) n = Math.floor(s / 3), r = s % 3 + i - 8 - 3, o = 1 == (a >> s & 1), t.set(n, r, o, !0), t.set(r, n, o, !0)
      }(w, e),
      function (t, e) {
        for (var n = t.size, r = -1, o = n - 1, i = 7, a = 0, s = n - 1; s > 0; s -= 2)
          for (6 === s && s--;;) {
            for (var u = 0; u < 2; u++)
              if (!t.isReserved(o, s - u)) {
                var f = !1;
                a < e.length && (f = 1 == (e[a] >>> i & 1)), t.set(o, s - u, f), -1 == --i && (a++, i = 7)
              }
            if ((o += r) < 0 || n <= o) {
              o -= r, r = -r;
              break
            }
          }
      }(w, g), r || (r = c.getBestMask(w, y.bind(null, w, n))), c.applyMask(r, w), y(w, n, r), {
        modules: w,
        version: e,
        errorCorrectionLevel: n,
        maskPattern: r,
        segments: i
      }
  }
  e.create = function (t, e) {
    if (void 0 === t || "" === t) throw new Error("No input text");
    var n, r, a = i.M;
    return void 0 !== e && (a = i.from(e.errorCorrectionLevel, i.M), n = d.from(e.version), r = c.from(e.maskPattern), e.toSJISFunc && o.setToSJISFunction(e.toSJISFunc)), w(t, n, a, r)
  }
}, function (t, e) {
  var n;
  n = function () {
    return this
  }();
  try {
    n = n || Function("return this")() || (0, eval)("this")
  } catch (t) {
    "object" == typeof window && (n = window)
  }
  t.exports = n
}, function (t, e, n) {
  "use strict";
  (function (e) {
    t.exports = "object" == typeof self && self.self === self && self || "object" == typeof e && e.global === e && e || this
  }).call(this, n(27))
}, function (t, e, n) {
  "use strict";
  var r = n(28);
  t.exports = function () {
    return "function" == typeof r.Promise && "function" == typeof r.Promise.prototype.then
  }
}, function (t, e, n) {
  var r = n(29),
    o = n(26),
    i = n(10),
    a = n(9);

  function s(t, e, n, i, a) {
    var s = [].slice.call(arguments, 1),
      u = s.length,
      f = "function" == typeof s[u - 1];
    if (!f && !r()) throw new Error("Callback required as last argument");
    if (!f) {
      if (u < 1) throw new Error("Too few arguments provided");
      return 1 === u ? (n = e, e = i = void 0) : 2 !== u || e.getContext || (i = n, n = e, e = void 0), new Promise(function (r, a) {
        try {
          var s = o.create(n, i);
          r(t(s, e, i))
        } catch (t) {
          a(t)
        }
      })
    }
    if (u < 2) throw new Error("Too few arguments provided");
    2 === u ? (a = n, n = e, e = i = void 0) : 3 === u && (e.getContext && void 0 === a ? (a = i, i = void 0) : (a = i, i = n, n = e, e = void 0));
    try {
      var c = o.create(n, i);
      a(null, t(c, e, i))
    } catch (t) {
      a(t)
    }
  }
  e.create = o.create, e.toCanvas = s.bind(null, i.render), e.toDataURL = s.bind(null, i.renderToDataURL), e.toString = s.bind(null, function (t, e, n) {
    return a.render(t, n)
  })
}, function (t, e) {
  t.exports = function (t) {
    var e = "undefined" != typeof window && window.location;
    if (!e) throw new Error("fixUrls requires window.location");
    if (!t || "string" != typeof t) return t;
    var n = e.protocol + "//" + e.host,
      r = n + e.pathname.replace(/\/[^\/]*$/, "/");
    return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (t, e) {
      var o, i = e.trim().replace(/^"(.*)"$/, function (t, e) {
        return e
      }).replace(/^'(.*)'$/, function (t, e) {
        return e
      });
      return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? t : (o = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n + i : r + i.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
    })
  }
}, function (t, e, n) {
  var r, o, i = {},
    a = (r = function () {
      return window && document && document.all && !window.atob
    }, function () {
      return void 0 === o && (o = r.apply(this, arguments)), o
    }),
    s = function (t) {
      var e = {};
      return function (t) {
        if ("function" == typeof t) return t();
        if (void 0 === e[t]) {
          var n = function (t) {
            return document.querySelector(t)
          }.call(this, t);
          if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
            n = n.contentDocument.head
          } catch (t) {
            n = null
          }
          e[t] = n
        }
        return e[t]
      }
    }(),
    u = null,
    f = 0,
    c = [],
    l = n(31);

  function h(t, e) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n],
        o = i[r.id];
      if (o) {
        o.refs++;
        for (var a = 0; a < o.parts.length; a++) o.parts[a](r.parts[a]);
        for (; a < r.parts.length; a++) o.parts.push(y(r.parts[a], e))
      } else {
        var s = [];
        for (a = 0; a < r.parts.length; a++) s.push(y(r.parts[a], e));
        i[r.id] = {
          id: r.id,
          refs: 1,
          parts: s
        }
      }
    }
  }

  function d(t, e) {
    for (var n = [], r = {}, o = 0; o < t.length; o++) {
      var i = t[o],
        a = e.base ? i[0] + e.base : i[0],
        s = {
          css: i[1],
          media: i[2],
          sourceMap: i[3]
        };
      r[a] ? r[a].parts.push(s) : n.push(r[a] = {
        id: a,
        parts: [s]
      })
    }
    return n
  }

  function g(t, e) {
    var n = s(t.insertInto);
    if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
    var r = c[c.length - 1];
    if ("top" === t.insertAt) r ? r.nextSibling ? n.insertBefore(e, r.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild), c.push(e);
    else if ("bottom" === t.insertAt) n.appendChild(e);
    else {
      if ("object" != typeof t.insertAt || !t.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
      var o = s(t.insertInto + " " + t.insertAt.before);
      n.insertBefore(e, o)
    }
  }

  function p(t) {
    if (null === t.parentNode) return !1;
    t.parentNode.removeChild(t);
    var e = c.indexOf(t);
    e >= 0 && c.splice(e, 1)
  }

  function v(t) {
    var e = document.createElement("style");
    return void 0 === t.attrs.type && (t.attrs.type = "text/css"), m(e, t.attrs), g(t, e), e
  }

  function m(t, e) {
    Object.keys(e).forEach(function (n) {
      t.setAttribute(n, e[n])
    })
  }

  function y(t, e) {
    var n, r, o, i;
    if (e.transform && t.css) {
      if (!(i = e.transform(t.css))) return function () {};
      t.css = i
    }
    if (e.singleton) {
      var a = f++;
      n = u || (u = v(e)), r = E.bind(null, n, a, !1), o = E.bind(null, n, a, !0)
    } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (t) {
      var e = document.createElement("link");
      return void 0 === t.attrs.type && (t.attrs.type = "text/css"), t.attrs.rel = "stylesheet", m(e, t.attrs), g(t, e), e
    }(e), r = function (t, e, n) {
      var r = n.css,
        o = n.sourceMap,
        i = void 0 === e.convertToAbsoluteUrls && o;
      (e.convertToAbsoluteUrls || i) && (r = l(r));
      o && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
      var a = new Blob([r], {
          type: "text/css"
        }),
        s = t.href;
      t.href = URL.createObjectURL(a), s && URL.revokeObjectURL(s)
    }.bind(null, n, e), o = function () {
      p(n), n.href && URL.revokeObjectURL(n.href)
    }) : (n = v(e), r = function (t, e) {
      var n = e.css,
        r = e.media;
      r && t.setAttribute("media", r);
      if (t.styleSheet) t.styleSheet.cssText = n;
      else {
        for (; t.firstChild;) t.removeChild(t.firstChild);
        t.appendChild(document.createTextNode(n))
      }
    }.bind(null, n), o = function () {
      p(n)
    });
    return r(t),
      function (e) {
        if (e) {
          if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
          r(t = e)
        } else o()
      }
  }
  t.exports = function (t, e) {
    if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
    (e = e || {}).attrs = "object" == typeof e.attrs ? e.attrs : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = a()), e.insertInto || (e.insertInto = "head"), e.insertAt || (e.insertAt = "bottom");
    var n = d(t, e);
    return h(n, e),
      function (t) {
        for (var r = [], o = 0; o < n.length; o++) {
          var a = n[o];
          (s = i[a.id]).refs--, r.push(s)
        }
        t && h(d(t, e), e);
        for (o = 0; o < r.length; o++) {
          var s;
          if (0 === (s = r[o]).refs) {
            for (var u = 0; u < s.parts.length; u++) s.parts[u]();
            delete i[s.id]
          }
        }
      }
  };
  var b, w = (b = [], function (t, e) {
    return b[t] = e, b.filter(Boolean).join("\n")
  });

  function E(t, e, n, r) {
    var o = n ? "" : r.css;
    if (t.styleSheet) t.styleSheet.cssText = w(e, o);
    else {
      var i = document.createTextNode(o),
        a = t.childNodes;
      a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(i, a[e]) : t.appendChild(i)
    }
  }
}, function (t, e) {
  t.exports = function (t) {
    var e = [];
    return e.toString = function () {
      return this.map(function (e) {
        var n = function (t, e) {
          var n = t[1] || "",
            r = t[3];
          if (!r) return n;
          if (e && "function" == typeof btoa) {
            var o = (a = r, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */"),
              i = r.sources.map(function (t) {
                return "/*# sourceURL=" + r.sourceRoot + t + " */"
              });
            return [n].concat(i).concat([o]).join("\n")
          }
          var a;
          return [n].join("\n")
        }(e, t);
        return e[2] ? "@media " + e[2] + "{" + n + "}" : n
      }).join("")
    }, e.i = function (t, n) {
      "string" == typeof t && (t = [
        [null, t, ""]
      ]);
      for (var r = {}, o = 0; o < this.length; o++) {
        var i = this[o][0];
        "number" == typeof i && (r[i] = !0)
      }
      for (o = 0; o < t.length; o++) {
        var a = t[o];
        "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
      }
    }, e
  }
}, function (t, e, n) {
  (t.exports = n(33)(!1)).push([t.i, "#addressInput,.button {\n  width: 300px;\n  text-align: center\n}\n\n#addressInput,#container,.button {\n  text-align: center\n}\n\nbutton,hr,input {\n  overflow: visible\n}\n\nprogress,sub,sup {\n  vertical-align: baseline\n}\n\nheader {\n  padding: 10px;\n  box-shadow: 0 -1px 12px 0 rgba(0,0,0,.5)\n}\n\n\n#title {\n  font-size: 1.5em;\n  color: #7c5702\n}\n\n.button {\n  display: inline-block;\n  background-color: #4CAF50;\n  color: #fff;\n  text-decoration: none;\n  margin: 5px;\n  padding: 6px;\n  border-radius: 5px;\n  border: 1px solid #33691E\n}\n\n[type=checkbox],[type=radio],legend {\n  box-sizing: border-box;\n  padding: 0\n}\n\n.highlight {\n  background-color: #ffeb47;\n  border: 1px solid #7c5702;\n  color: #7c5702;\n  font-size: 1.7em\n}\n\n#qrcode {\n  display: inline-block;\n  width: 80%;\n  margin: 10px\n}\n\n#addressInput {\n  font-size: 1em\n}\n\n/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%\n}\n\nbody {\n  margin: 0\n}\n\nh1 {\n  font-size: 2em;\n  margin: .67em 0\n}\n\nhr {\n  box-sizing: content-box;\n  height: 0\n}\n\ncode,kbd,pre,samp {\n  font-family: monospace,monospace;\n  font-size: 1em\n}\n\na {\n  background-color: transparent\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted\n}\n\nb,strong {\n  font-weight: bolder\n}\n\nsmall {\n  font-size: 80%\n}\n\nsub,sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative\n}\n\nsub {\n  bottom: -.25em\n}\n\nsup {\n  top: -.5em\n}\n\nimg {\n  border-style: none\n}\n\nbutton,input,optgroup,select,textarea {\n  font-family: inherit;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0\n}\n\nbutton,select {\n  text-transform: none\n}\n\n[type=button],[type=reset],[type=submit],button {\n  -webkit-appearance: button\n}\n\n[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner {\n  border-style: none;\n  padding: 0\n}\n\n[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring {\n  outline: ButtonText dotted 1px\n}\n\nfieldset {\n  padding: .35em .75em .625em\n}\n\nlegend {\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  white-space: normal\n}\n\ntextarea {\n  overflow: auto\n}\n\n[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button {\n  height: auto\n}\n\n[type=search] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px\n}\n\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit\n}\n\ndetails {\n  display: block\n}\n\nsummary {\n  display: list-item\n}\n\n[hidden],template {\n  display: none\n}\n", ""])
}, function (t, e, n) {
  var r = n(34);
  "string" == typeof r && (r = [
    [t.i, r, ""]
  ]);
  var o = {
    hmr: !0,
    transform: void 0,
    insertInto: void 0
  };
  n(32)(r, o);
  r.locals && (t.exports = r.locals)
}, function (t, e, n) {
  "use strict";
  n(35);
  var r = n(30),
    o = location.search.substr(1).split("&").reduce(function (t, e) {
      var n = e.split("=");
      return t[n[0]] = n[1], t
    }, {});
  console.log(o);
  var i = o.scheme + ":" + o.address + "?amount=" + parseFloat(o.amount || 0) + "&message=" + (o.message || "") + "&req-opreturn=" + (o["req-opreturn"] || "") + "&label=" + (o.label || ""),
    a = i;
  /Android/.test(navigator.userAgent) && (a = "intent://" + o.address + "?amount=" + parseFloat(o.amount || 0) + "&message=" + (o.message || "") + "&req-opreturn=" + (o["req-opreturn"] || "") + "&label=" + (o.label || "") + "#Intent;scheme=" + o.scheme + ";package=org.missmonacoin.monya;end");
  var s = "https://monya-wallet.github.io/wallet?url=" + encodeURIComponent(i);

  function u(t) {
    return document.getElementById(t)
  }
  "NEM_APOSTILLE_BITCONIN" === o.address && (s = "https://missmonacoin.github.io/bitconin-nem-wallet?url=" + encodeURIComponent(i)), u("openMonyaWeb").href = s, u("notOpen").href = a, u("openMonya").href = a, u("openWallet").href = i, u("openMonya").addEventListener("click", function (t) {
    u("openMonya").style.display = "none", u("notOpen").style.display = "inline-block"
  }), o.address && (u("addressInput").value = o.address), u("amount").innerText = o.amount || 0, u("unit").innerText = o.scheme || "まい", o.message && (u("message").innerText = decodeURIComponent(o.message)), o["req-opreturn"] && (u("opreturn").innerText = decodeURIComponent(o["req-opreturn"])), o.address && r.toDataURL(i, {
    errorCorrectionLevel: "M",
    type: "image/png"
  }, function (t, e) {
    u("qrcode").src = e
  })
}]);

