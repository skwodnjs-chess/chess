var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/onnxruntime-web/dist/ort.wasm.min.mjs
var ort_wasm_min_exports = {};
__export(ort_wasm_min_exports, {
  InferenceSession: () => Un,
  TRACE: () => Nt,
  TRACE_EVENT_BEGIN: () => K,
  TRACE_EVENT_END: () => Q,
  TRACE_FUNC_BEGIN: () => Z,
  TRACE_FUNC_END: () => X,
  Tensor: () => G,
  default: () => Ro,
  env: () => B,
  registerBackend: () => pe
});
var Ve, On, Ln, Pn, Je, E, qe, _n, wt, Se, q, pe, Dn, ht, Ye, bt, yt, gt, Et, _, Ze, B, St, Tt, It, At, Xe, Bt, Ot, Lt, Pt, _t, Dt, Y, me, Ut, xt, vt, Ct, Mt, Rt, x, Te, G, Ke, Nt, Ft, Z, X, K, Q, Qe, Ie, kt, Un, Wt, Gt, $t, zt, Ht, et, J, Ae, qt, Vt, Jt, xn, Yt, Kt, vn, Cn, R, Ce, nt, Mn, Rn, Qt, Nn, Zt, en, Xt, tn, Be, rt, ot, Me, nn, Fn, kn, Wn, Oe, I, ee, N, he, S, Re, rn, on, Gn, $n, zn, se, Hn, sn, an, ie, Ne, ae, un, fn, Fe, ke, cn, st, be, it, jn, Le, Pe, ue, Vn, dn, we, _e, De, ln, Ue, xe, ve, tt, ne, k, ye, Ge, $e, We, at, ut, fe, ce, qn, pn, mn, wn, hn, bn, yn, gn, ft, En, Yn, ze, Sn, In, Tn, He, Zn, An, jt, Ro;
var init_ort_wasm_min = __esm({
  "node_modules/onnxruntime-web/dist/ort.wasm.min.mjs"() {
    Ve = Object.defineProperty;
    On = Object.getOwnPropertyDescriptor;
    Ln = Object.getOwnPropertyNames;
    Pn = Object.prototype.hasOwnProperty;
    Je = ((e) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(e, { get: (t, n) => (typeof __require < "u" ? __require : t)[n] }) : e)(function(e) {
      if (typeof __require < "u") return __require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    E = (e, t) => () => (e && (t = e(e = 0)), t);
    qe = (e, t) => {
      for (var n in t) Ve(e, n, { get: t[n], enumerable: true });
    };
    _n = (e, t, n, o) => {
      if (t && typeof t == "object" || typeof t == "function") for (let r of Ln(t)) !Pn.call(e, r) && r !== n && Ve(e, r, { get: () => t[r], enumerable: !(o = On(t, r)) || o.enumerable });
      return e;
    };
    wt = (e) => _n(Ve({}, "__esModule", { value: true }), e);
    Ye = E(() => {
      "use strict";
      Se = /* @__PURE__ */ new Map(), q = [], pe = (e, t, n) => {
        if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
          let o = Se.get(e);
          if (o === void 0) Se.set(e, { backend: t, priority: n });
          else {
            if (o.priority > n) return;
            if (o.priority === n && o.backend !== t) throw new Error(`cannot register backend "${e}" using priority ${n}`);
          }
          if (n >= 0) {
            let r = q.indexOf(e);
            r !== -1 && q.splice(r, 1);
            for (let i = 0; i < q.length; i++) if (Se.get(q[i]).priority <= n) {
              q.splice(i, 0, e);
              return;
            }
            q.push(e);
          }
          return;
        }
        throw new TypeError("not a valid backend");
      }, Dn = async (e) => {
        let t = Se.get(e);
        if (!t) return "backend not found.";
        if (t.initialized) return t.backend;
        if (t.aborted) return t.error;
        {
          let n = !!t.initPromise;
          try {
            return n || (t.initPromise = t.backend.init(e)), await t.initPromise, t.initialized = true, t.backend;
          } catch (o) {
            return n || (t.error = `${o}`, t.aborted = true), t.error;
          } finally {
            delete t.initPromise;
          }
        }
      }, ht = async (e) => {
        let t = e.executionProviders || [], n = t.map((u) => typeof u == "string" ? u : u.name), o = n.length === 0 ? q : n, r, i = [], s = /* @__PURE__ */ new Set();
        for (let u of o) {
          let f = await Dn(u);
          typeof f == "string" ? i.push({ name: u, err: f }) : (r || (r = f), r === f && s.add(u));
        }
        if (!r) throw new Error(`no available backend found. ERR: ${i.map((u) => `[${u.name}] ${u.err}`).join(", ")}`);
        for (let { name: u, err: f } of i) n.includes(u) && console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${f}`);
        let a = t.filter((u) => s.has(typeof u == "string" ? u : u.name));
        return [r, new Proxy(e, { get: (u, f) => f === "executionProviders" ? a : Reflect.get(u, f) })];
      };
    });
    bt = E(() => {
      "use strict";
      Ye();
    });
    gt = E(() => {
      "use strict";
      yt = "1.27.0";
    });
    Ze = E(() => {
      "use strict";
      gt();
      Et = "warning", _ = { wasm: {}, webgl: {}, webgpu: {}, versions: { common: yt }, set logLevel(e) {
        if (e !== void 0) {
          if (typeof e != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(e) === -1) throw new Error(`Unsupported logging level: ${e}`);
          Et = e;
        }
      }, get logLevel() {
        return Et;
      } };
      Object.defineProperty(_, "logLevel", { enumerable: true });
    });
    St = E(() => {
      "use strict";
      Ze();
      B = _;
    });
    At = E(() => {
      "use strict";
      Tt = (e, t) => {
        let n = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
        n.width = e.dims[3], n.height = e.dims[2];
        let o = n.getContext("2d");
        if (o != null) {
          let r, i;
          t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (r = e.dims[2], i = e.dims[3]) : (r = e.dims[3], i = e.dims[2]);
          let s = t?.format !== void 0 ? t.format : "RGB", a = t?.norm, u, f;
          a === void 0 || a.mean === void 0 ? u = [255, 255, 255, 255] : typeof a.mean == "number" ? u = [a.mean, a.mean, a.mean, a.mean] : (u = [a.mean[0], a.mean[1], a.mean[2], 0], a.mean[3] !== void 0 && (u[3] = a.mean[3])), a === void 0 || a.bias === void 0 ? f = [0, 0, 0, 0] : typeof a.bias == "number" ? f = [a.bias, a.bias, a.bias, a.bias] : (f = [a.bias[0], a.bias[1], a.bias[2], 0], a.bias[3] !== void 0 && (f[3] = a.bias[3]));
          let l = i * r, c = 0, d = l, p = l * 2, h = -1;
          s === "RGBA" ? (c = 0, d = l, p = l * 2, h = l * 3) : s === "RGB" ? (c = 0, d = l, p = l * 2) : s === "RBG" && (c = 0, p = l, d = l * 2);
          for (let y = 0; y < i; y++) for (let A = 0; A < r; A++) {
            let m = (e.data[c++] - f[0]) * u[0], w = (e.data[d++] - f[1]) * u[1], O = (e.data[p++] - f[2]) * u[2], g = h === -1 ? 255 : (e.data[h++] - f[3]) * u[3];
            o.fillStyle = "rgba(" + m + "," + w + "," + O + "," + g + ")", o.fillRect(A, y, 1, 1);
          }
          if ("toDataURL" in n) return n.toDataURL();
          throw new Error("toDataURL is not supported");
        } else throw new Error("Can not access image data");
      }, It = (e, t) => {
        let n = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), o;
        if (n != null) {
          let r, i, s;
          t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (r = e.dims[2], i = e.dims[1], s = e.dims[3]) : (r = e.dims[3], i = e.dims[2], s = e.dims[1]);
          let a = t !== void 0 && t.format !== void 0 ? t.format : "RGB", u = t?.norm, f, l;
          u === void 0 || u.mean === void 0 ? f = [255, 255, 255, 255] : typeof u.mean == "number" ? f = [u.mean, u.mean, u.mean, u.mean] : (f = [u.mean[0], u.mean[1], u.mean[2], 255], u.mean[3] !== void 0 && (f[3] = u.mean[3])), u === void 0 || u.bias === void 0 ? l = [0, 0, 0, 0] : typeof u.bias == "number" ? l = [u.bias, u.bias, u.bias, u.bias] : (l = [u.bias[0], u.bias[1], u.bias[2], 0], u.bias[3] !== void 0 && (l[3] = u.bias[3]));
          let c = i * r;
          if (t !== void 0 && (t.format !== void 0 && s === 4 && t.format !== "RGBA" || s === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
          let d = 4, p = 0, h = 1, y = 2, A = 3, m = 0, w = c, O = c * 2, g = -1;
          a === "RGBA" ? (m = 0, w = c, O = c * 2, g = c * 3) : a === "RGB" ? (m = 0, w = c, O = c * 2) : a === "RBG" && (m = 0, O = c, w = c * 2), o = n.createImageData(r, i);
          for (let T = 0; T < i * r; p += d, h += d, y += d, A += d, T++) o.data[p] = (e.data[m++] - l[0]) * f[0], o.data[h] = (e.data[w++] - l[1]) * f[1], o.data[y] = (e.data[O++] - l[2]) * f[2], o.data[A] = g === -1 ? 255 : (e.data[g++] - l[3]) * f[3];
        } else throw new Error("Can not access image data");
        return o;
      };
    });
    Dt = E(() => {
      "use strict";
      Te();
      Xe = (e, t) => {
        if (e === void 0) throw new Error("Image buffer must be defined");
        if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
        if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
        let { height: n, width: o } = t, r = t.norm ?? { mean: 255, bias: 0 }, i, s;
        typeof r.mean == "number" ? i = [r.mean, r.mean, r.mean, r.mean] : i = [r.mean[0], r.mean[1], r.mean[2], r.mean[3] ?? 255], typeof r.bias == "number" ? s = [r.bias, r.bias, r.bias, r.bias] : s = [r.bias[0], r.bias[1], r.bias[2], r.bias[3] ?? 0];
        let a = t.format !== void 0 ? t.format : "RGBA", u = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", f = n * o, l = u === "RGBA" ? new Float32Array(f * 4) : new Float32Array(f * 3), c = 4, d = 0, p = 1, h = 2, y = 3, A = 0, m = f, w = f * 2, O = -1;
        a === "RGB" && (c = 3, d = 0, p = 1, h = 2, y = -1), u === "RGBA" ? O = f * 3 : u === "RBG" ? (A = 0, w = f, m = f * 2) : u === "BGR" && (w = 0, m = f, A = f * 2);
        for (let T = 0; T < f; T++, d += c, h += c, p += c, y += c) l[A++] = (e[d] + s[0]) / i[0], l[m++] = (e[p] + s[1]) / i[1], l[w++] = (e[h] + s[2]) / i[2], O !== -1 && y !== -1 && (l[O++] = (e[y] + s[3]) / i[3]);
        return u === "RGBA" ? new x("float32", l, [1, 4, n, o]) : new x("float32", l, [1, 3, n, o]);
      }, Bt = async (e, t) => {
        let n = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement, o = typeof ImageData < "u" && e instanceof ImageData, r = typeof ImageBitmap < "u" && e instanceof ImageBitmap, i = typeof e == "string", s, a = t ?? {}, u = () => {
          if (typeof document < "u") return document.createElement("canvas");
          if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
          throw new Error("Canvas is not supported");
        }, f = (l) => typeof HTMLCanvasElement < "u" && l instanceof HTMLCanvasElement || l instanceof OffscreenCanvas ? l.getContext("2d") : null;
        if (n) {
          let l = u();
          l.width = e.width, l.height = e.height;
          let c = f(l);
          if (c != null) {
            let d = e.height, p = e.width;
            if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (d = t.resizedHeight, p = t.resizedWidth), t !== void 0) {
              if (a = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
              a.tensorFormat = "RGBA", a.height = d, a.width = p;
            } else a.tensorFormat = "RGBA", a.height = d, a.width = p;
            c.drawImage(e, 0, 0), s = c.getImageData(0, 0, p, d).data;
          } else throw new Error("Can not access image data");
        } else if (o) {
          let l, c;
          if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (l = t.resizedHeight, c = t.resizedWidth) : (l = e.height, c = e.width), t !== void 0 && (a = t), a.format = "RGBA", a.height = l, a.width = c, t !== void 0) {
            let d = u();
            d.width = c, d.height = l;
            let p = f(d);
            if (p != null) p.putImageData(e, 0, 0), s = p.getImageData(0, 0, c, l).data;
            else throw new Error("Can not access image data");
          } else s = e.data;
        } else if (r) {
          if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
          let l = u();
          l.width = e.width, l.height = e.height;
          let c = f(l);
          if (c != null) {
            let d = e.height, p = e.width;
            return c.drawImage(e, 0, 0, p, d), s = c.getImageData(0, 0, p, d).data, a.height = d, a.width = p, Xe(s, a);
          } else throw new Error("Can not access image data");
        } else {
          if (i) return new Promise((l, c) => {
            let d = u(), p = f(d);
            if (!e || !p) return c();
            let h = new Image();
            h.crossOrigin = "Anonymous", h.src = e, h.onload = () => {
              d.width = h.width, d.height = h.height, p.drawImage(h, 0, 0, d.width, d.height);
              let y = p.getImageData(0, 0, d.width, d.height);
              a.height = d.height, a.width = d.width, l(Xe(y.data, a));
            };
          });
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
        if (s !== void 0) return Xe(s, a);
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }, Ot = (e, t) => {
        let { width: n, height: o, download: r, dispose: i } = t, s = [1, o, n, 4];
        return new x({ location: "texture", type: "float32", texture: e, dims: s, download: r, dispose: i });
      }, Lt = (e, t) => {
        let { dataType: n, dims: o, download: r, dispose: i } = t;
        return new x({ location: "gpu-buffer", type: n ?? "float32", gpuBuffer: e, dims: o, download: r, dispose: i });
      }, Pt = (e, t) => {
        let { dataType: n, dims: o, download: r, dispose: i } = t;
        return new x({ location: "ml-tensor", type: n ?? "float32", mlTensor: e, dims: o, download: r, dispose: i });
      }, _t = (e, t, n) => new x({ location: "cpu-pinned", type: e, data: t, dims: n ?? [t.length] });
    });
    vt = E(() => {
      "use strict";
      Y = /* @__PURE__ */ new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), me = /* @__PURE__ */ new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), Ut = false, xt = () => {
        if (!Ut) {
          Ut = true;
          let e = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, n = globalThis.Float16Array, o = typeof n < "u" && n.from;
          e && (Y.set("int64", BigInt64Array), me.set(BigInt64Array, "int64")), t && (Y.set("uint64", BigUint64Array), me.set(BigUint64Array, "uint64")), o ? (Y.set("float16", n), me.set(n, "float16")) : Y.set("float16", Uint16Array);
        }
      };
    });
    Rt = E(() => {
      "use strict";
      Te();
      Ct = (e) => {
        let t = 1;
        for (let n = 0; n < e.length; n++) {
          let o = e[n];
          if (typeof o != "number" || !Number.isSafeInteger(o)) throw new TypeError(`dims[${n}] must be an integer, got: ${o}`);
          if (o < 0) throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${o}`);
          t *= o;
        }
        return t;
      }, Mt = (e, t) => {
        switch (e.location) {
          case "cpu":
            return new x(e.type, e.data, t);
          case "cpu-pinned":
            return new x({ location: "cpu-pinned", data: e.data, type: e.type, dims: t });
          case "texture":
            return new x({ location: "texture", texture: e.texture, type: e.type, dims: t });
          case "gpu-buffer":
            return new x({ location: "gpu-buffer", gpuBuffer: e.gpuBuffer, type: e.type, dims: t });
          case "ml-tensor":
            return new x({ location: "ml-tensor", mlTensor: e.mlTensor, type: e.type, dims: t });
          default:
            throw new Error(`tensorReshape: tensor location ${e.location} is not supported`);
        }
      };
    });
    Te = E(() => {
      "use strict";
      At();
      Dt();
      vt();
      Rt();
      x = class {
        constructor(t, n, o) {
          xt();
          let r, i;
          if (typeof t == "object" && "location" in t) switch (this.dataLocation = t.location, r = t.type, i = t.dims, t.location) {
            case "cpu-pinned": {
              let a = Y.get(r);
              if (!a) throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);
              if (!(t.data instanceof a)) throw new TypeError(`buffer should be of type ${a.name}`);
              this.cpuData = t.data;
              break;
            }
            case "texture": {
              if (r !== "float32") throw new TypeError(`unsupported type "${r}" to create tensor from texture`);
              this.gpuTextureData = t.texture, this.downloader = t.download, this.disposer = t.dispose;
              break;
            }
            case "gpu-buffer": {
              if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);
              this.gpuBufferData = t.gpuBuffer, this.downloader = t.download, this.disposer = t.dispose;
              break;
            }
            case "ml-tensor": {
              if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint64" && r !== "int8" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);
              this.mlTensorData = t.mlTensor, this.downloader = t.download, this.disposer = t.dispose;
              break;
            }
            default:
              throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
          }
          else {
            let a, u;
            if (typeof t == "string") if (r = t, u = o, t === "string") {
              if (!Array.isArray(n)) throw new TypeError("A string tensor's data must be a string array.");
              a = n;
            } else {
              let f = Y.get(t);
              if (f === void 0) throw new TypeError(`Unsupported tensor type: ${t}.`);
              if (Array.isArray(n)) {
                if (t === "float16" && f === Uint16Array || t === "uint4" || t === "int4") throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${f.name} as data.`);
                t === "uint64" || t === "int64" ? a = f.from(n, BigInt) : a = f.from(n);
              } else if (n instanceof f) a = n;
              else if (n instanceof Uint8ClampedArray) if (t === "uint8") a = Uint8Array.from(n);
              else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
              else if (t === "float16" && n instanceof Uint16Array && f !== Uint16Array) a = new globalThis.Float16Array(n.buffer, n.byteOffset, n.length);
              else throw new TypeError(`A ${r} tensor's data must be type of ${f}`);
            }
            else if (u = n, Array.isArray(t)) {
              if (t.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
              let f = typeof t[0];
              if (f === "string") r = "string", a = t;
              else if (f === "boolean") r = "bool", a = Uint8Array.from(t);
              else throw new TypeError(`Invalid element type of data array: ${f}.`);
            } else if (t instanceof Uint8ClampedArray) r = "uint8", a = Uint8Array.from(t);
            else {
              let f = me.get(t.constructor);
              if (f === void 0) throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);
              r = f, a = t;
            }
            if (u === void 0) u = [a.length];
            else if (!Array.isArray(u)) throw new TypeError("A tensor's dims must be a number array");
            i = u, this.cpuData = a, this.dataLocation = "cpu";
          }
          let s = Ct(i);
          if (this.cpuData && s !== this.cpuData.length && !((r === "uint4" || r === "int4") && Math.ceil(s / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);
          this.type = r, this.dims = i, this.size = s;
        }
        static async fromImage(t, n) {
          return Bt(t, n);
        }
        static fromTexture(t, n) {
          return Ot(t, n);
        }
        static fromGpuBuffer(t, n) {
          return Lt(t, n);
        }
        static fromMLTensor(t, n) {
          return Pt(t, n);
        }
        static fromPinnedBuffer(t, n, o) {
          return _t(t, n, o);
        }
        toDataURL(t) {
          return Tt(this, t);
        }
        toImageData(t) {
          return It(this, t);
        }
        get data() {
          if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
          return this.cpuData;
        }
        get location() {
          return this.dataLocation;
        }
        get texture() {
          if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
          return this.gpuTextureData;
        }
        get gpuBuffer() {
          if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
          return this.gpuBufferData;
        }
        get mlTensor() {
          if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
          return this.mlTensorData;
        }
        async getData(t) {
          switch (this.ensureValid(), this.dataLocation) {
            case "cpu":
            case "cpu-pinned":
              return this.data;
            case "texture":
            case "gpu-buffer":
            case "ml-tensor": {
              if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
              if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
              try {
                this.isDownloading = true;
                let n = await this.downloader();
                return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = n, t && this.disposer && (this.disposer(), this.disposer = void 0), n;
              } finally {
                this.isDownloading = false;
              }
            }
            default:
              throw new Error(`cannot get data from location: ${this.dataLocation}`);
          }
        }
        dispose() {
          if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
          this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
        }
        ensureValid() {
          if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
        }
        reshape(t) {
          if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
          return Mt(this, t);
        }
      };
    });
    Ke = E(() => {
      "use strict";
      Te();
      G = x;
    });
    Qe = E(() => {
      "use strict";
      Ze();
      Nt = (e, t) => {
        (typeof _.trace > "u" ? !_.wasm.trace : !_.trace) || console.timeStamp(`${e}::ORT::${t}`);
      }, Ft = (e, t) => {
        let n = new Error().stack?.split(/\r\n|\r|\n/g) || [], o = false;
        for (let r = 0; r < n.length; r++) {
          if (o && !n[r].includes("TRACE_FUNC")) {
            let i = `FUNC_${e}::${n[r].trim().split(" ")[1]}`;
            t && (i += `::${t}`), Nt("CPU", i);
            return;
          }
          n[r].includes("TRACE_FUNC") && (o = true);
        }
      }, Z = (e) => {
        (typeof _.trace > "u" ? !_.wasm.trace : !_.trace) || Ft("BEGIN", e);
      }, X = (e) => {
        (typeof _.trace > "u" ? !_.wasm.trace : !_.trace) || Ft("END", e);
      }, K = (e) => {
        (typeof _.trace > "u" ? !_.wasm.trace : !_.trace) || console.time(`ORT::${e}`);
      }, Q = (e) => {
        (typeof _.trace > "u" ? !_.wasm.trace : !_.trace) || console.timeEnd(`ORT::${e}`);
      };
    });
    kt = E(() => {
      "use strict";
      Ye();
      Ke();
      Qe();
      Ie = class e {
        constructor(t) {
          this.handler = t;
        }
        async run(t, n, o) {
          Z(), K("InferenceSession.run");
          let r = {}, i = {};
          if (typeof t != "object" || t === null || t instanceof G || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
          let s = true;
          if (typeof n == "object") {
            if (n === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
            if (n instanceof G) throw new TypeError("'fetches' cannot be a Tensor");
            if (Array.isArray(n)) {
              if (n.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
              s = false;
              for (let f of n) {
                if (typeof f != "string") throw new TypeError("'fetches' must be a string array or an object.");
                if (this.outputNames.indexOf(f) === -1) throw new RangeError(`'fetches' contains invalid output name: ${f}.`);
                r[f] = null;
              }
              if (typeof o == "object" && o !== null) i = o;
              else if (typeof o < "u") throw new TypeError("'options' must be an object.");
            } else {
              let f = false, l = Object.getOwnPropertyNames(n);
              for (let c of this.outputNames) if (l.indexOf(c) !== -1) {
                let d = n[c];
                (d === null || d instanceof G) && (f = true, s = false, r[c] = d);
              }
              if (f) {
                if (typeof o == "object" && o !== null) i = o;
                else if (typeof o < "u") throw new TypeError("'options' must be an object.");
              } else i = n;
            }
          } else if (typeof n < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
          for (let f of this.inputNames) if (typeof t[f] > "u") throw new Error(`input '${f}' is missing in 'feeds'.`);
          if (s) for (let f of this.outputNames) r[f] = null;
          let a = await this.handler.run(t, r, i), u = {};
          for (let f in a) if (Object.hasOwnProperty.call(a, f)) {
            let l = a[f];
            l instanceof G ? u[f] = l : u[f] = new G(l.type, l.data, l.dims);
          }
          return Q("InferenceSession.run"), X(), u;
        }
        async release() {
          return this.handler.dispose();
        }
        static async create(t, n, o, r) {
          Z(), K("InferenceSession.create");
          let i, s = {};
          if (typeof t == "string") {
            if (i = t, typeof n == "object" && n !== null) s = n;
            else if (typeof n < "u") throw new TypeError("'options' must be an object.");
          } else if (t instanceof Uint8Array) {
            if (i = t, typeof n == "object" && n !== null) s = n;
            else if (typeof n < "u") throw new TypeError("'options' must be an object.");
          } else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
            let l = t, c = 0, d = t.byteLength;
            if (typeof n == "object" && n !== null) s = n;
            else if (typeof n == "number") {
              if (c = n, !Number.isSafeInteger(c)) throw new RangeError("'byteOffset' must be an integer.");
              if (c < 0 || c >= l.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${l.byteLength}).`);
              if (d = t.byteLength - c, typeof o == "number") {
                if (d = o, !Number.isSafeInteger(d)) throw new RangeError("'byteLength' must be an integer.");
                if (d <= 0 || c + d > l.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${l.byteLength - c}].`);
                if (typeof r == "object" && r !== null) s = r;
                else if (typeof r < "u") throw new TypeError("'options' must be an object.");
              } else if (typeof o < "u") throw new TypeError("'byteLength' must be a number.");
            } else if (typeof n < "u") throw new TypeError("'options' must be an object.");
            i = new Uint8Array(l, c, d);
          } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
          let [a, u] = await ht(s), f = await a.createInferenceSessionHandler(i, u);
          return Q("InferenceSession.create"), X(), new e(f);
        }
        startProfiling() {
          this.handler.startProfiling();
        }
        endProfiling() {
          this.handler.endProfiling();
        }
        get inputNames() {
          return this.handler.inputNames;
        }
        get outputNames() {
          return this.handler.outputNames;
        }
        get inputMetadata() {
          return this.handler.inputMetadata;
        }
        get outputMetadata() {
          return this.handler.outputMetadata;
        }
      };
    });
    Wt = E(() => {
      "use strict";
      kt();
      Un = Ie;
    });
    Gt = E(() => {
      "use strict";
    });
    $t = E(() => {
      "use strict";
    });
    zt = E(() => {
      "use strict";
    });
    Ht = E(() => {
      "use strict";
    });
    et = {};
    qe(et, { InferenceSession: () => Un, TRACE: () => Nt, TRACE_EVENT_BEGIN: () => K, TRACE_EVENT_END: () => Q, TRACE_FUNC_BEGIN: () => Z, TRACE_FUNC_END: () => X, Tensor: () => G, env: () => B, registerBackend: () => pe });
    J = E(() => {
      "use strict";
      bt();
      St();
      Wt();
      Ke();
      Gt();
      $t();
      Qe();
      zt();
      Ht();
    });
    Ae = E(() => {
      "use strict";
    });
    qt = {};
    qe(qt, { default: () => xn });
    Yt = E(() => {
      "use strict";
      tt();
      ee();
      Be();
      Vt = "ort-wasm-proxy-worker", Jt = globalThis.self?.name === Vt;
      Jt && (self.onmessage = (e) => {
        let { type: t, in: n } = e.data;
        try {
          switch (t) {
            case "init-wasm":
              Oe(n.wasm).then(() => {
                Le(n).then(() => {
                  postMessage({ type: t });
                }, (o) => {
                  postMessage({ type: t, err: o });
                });
              }, (o) => {
                postMessage({ type: t, err: o });
              });
              break;
            case "init-ep": {
              let { epName: o, env: r } = n;
              Pe(r, o).then(() => {
                postMessage({ type: t });
              }, (i) => {
                postMessage({ type: t, err: i });
              });
              break;
            }
            case "copy-from": {
              let { buffer: o } = n, r = we(o);
              postMessage({ type: t, out: r });
              break;
            }
            case "create": {
              let { model: o, options: r } = n;
              _e(o, r).then((i) => {
                postMessage({ type: t, out: i });
              }, (i) => {
                postMessage({ type: t, err: i });
              });
              break;
            }
            case "release":
              De(n), postMessage({ type: t });
              break;
            case "run": {
              let { sessionId: o, inputIndices: r, inputs: i, outputIndices: s, options: a } = n;
              Ue(o, r, i, s, new Array(s.length).fill(null), a).then((u) => {
                u.some((f) => f[3] !== "cpu") ? postMessage({ type: t, err: "Proxy does not support non-cpu tensor location." }) : postMessage({ type: t, out: u }, ve([...i, ...u]));
              }, (u) => {
                postMessage({ type: t, err: u });
              });
              break;
            }
            case "end-profiling":
              xe(n), postMessage({ type: t });
              break;
            default:
          }
        } catch (o) {
          postMessage({ type: t, err: o });
        }
      });
      xn = Jt ? null : (e) => new Worker(e ?? R, { type: "module", name: Vt });
    });
    Be = E(() => {
      "use strict";
      Ae();
      Kt = typeof location > "u" ? void 0 : location.origin, vn = import.meta.url > "file:" && import.meta.url < "file;", Cn = () => {
        if (true) {
          if (vn) {
            let e = URL;
            return new URL(new e("ort.wasm.min.mjs", import.meta.url).href, Kt).href;
          }
          return import.meta.url;
        }
      }, R = Cn(), Ce = () => {
        if (R && !R.startsWith("blob:")) return R.substring(0, R.lastIndexOf("/") + 1);
      }, nt = (e, t) => {
        try {
          let n = t ?? R;
          return (n ? new URL(e, n) : new URL(e)).origin === Kt;
        } catch {
          return false;
        }
      }, Mn = (e, t) => {
        let n = t ?? R;
        try {
          return (n ? new URL(e, n) : new URL(e)).href;
        } catch {
          return;
        }
      }, Rn = (e, t) => `${t ?? "./"}${e}`, Qt = async (e) => {
        let n = await (await fetch(e, { credentials: "same-origin" })).blob();
        return URL.createObjectURL(n);
      }, Nn = async (e) => (await import(
        /*webpackIgnore:true*/
        /*@vite-ignore*/
        e
      )).default, Zt = (Yt(), wt(qt)).default, en = async () => {
        if (!R) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
        if (nt(R)) return [void 0, Zt()];
        let e = await Qt(R);
        return [e, Zt(e)];
      }, Xt = void 0, tn = async (e, t, n, o) => {
        let r = Xt && !(e || t);
        if (r) if (R) r = nt(R) || o && !n;
        else if (o && !n) r = true;
        else throw new Error("cannot determine the script source URL.");
        if (r) return [void 0, Xt];
        {
          let i = "ort-wasm-simd-threaded.mjs", s = e ?? Mn(i, t), a = n && s && !nt(s, t), u = a ? await Qt(s) : s ?? Rn(i, t);
          return [a ? u : void 0, await Nn(u)];
        }
      };
    });
    ee = E(() => {
      "use strict";
      Be();
      ot = false, Me = false, nn = false, Fn = () => {
        if (typeof SharedArrayBuffer > "u") return false;
        try {
          return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
        } catch {
          return false;
        }
      }, kn = () => {
        try {
          return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
        } catch {
          return false;
        }
      }, Wn = () => {
        try {
          return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11]));
        } catch {
          return false;
        }
      }, Oe = async (e) => {
        if (ot) return Promise.resolve();
        if (Me) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
        if (nn) throw new Error("previous call to 'initializeWebAssembly()' failed.");
        Me = true;
        let t = e.initTimeout, n = e.numThreads;
        if (e.simd !== false) {
          if (e.simd === "relaxed") {
            if (!Wn()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
          } else if (!kn()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
        }
        let o = Fn();
        n > 1 && !o && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + n + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e.numThreads = n = 1);
        let r = e.wasmPaths, i = typeof r == "string" ? r : void 0, s = r?.mjs, a = s?.href ?? s, u = r?.wasm, f = u?.href ?? u, l = e.wasmBinary, [c, d] = await tn(a, i, n > 1, !!l || !!f), p = false, h = [];
        if (t > 0 && h.push(new Promise((y) => {
          setTimeout(() => {
            p = true, y();
          }, t);
        })), h.push(new Promise((y, A) => {
          let m = { numThreads: n };
          if (l) m.wasmBinary = l, m.locateFile = (w) => w;
          else if (f || i) m.locateFile = (w) => f ?? i + w;
          else if (a && a.indexOf("blob:") !== 0) m.locateFile = (w) => new URL(w, a).href;
          else if (c) {
            let w = Ce();
            w && (m.locateFile = (O) => w + O);
          }
          d(m).then((w) => {
            Me = false, ot = true, rt = w, y(), c && URL.revokeObjectURL(c);
          }, (w) => {
            Me = false, nn = true, A(w);
          });
        })), await Promise.race(h), p) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
      }, I = () => {
        if (ot && rt) return rt;
        throw new Error("WebAssembly is not initialized yet.");
      };
    });
    Re = E(() => {
      "use strict";
      ee();
      N = (e, t) => {
        let n = I(), o = n.lengthBytesUTF8(e) + 1, r = n._malloc(o);
        return n.stringToUTF8(e, r, o), t.push(r), r;
      }, he = (e, t, n, o) => {
        if (typeof e == "object" && e !== null) {
          if (n.has(e)) throw new Error("Circular reference in options");
          n.add(e);
        }
        Object.entries(e).forEach(([r, i]) => {
          let s = t ? t + r : r;
          if (typeof i == "object") he(i, s + ".", n, o);
          else if (typeof i == "string" || typeof i == "number") o(s, i.toString());
          else if (typeof i == "boolean") o(s, i ? "1" : "0");
          else throw new Error(`Can't handle extra config type: ${typeof i}`);
        });
      }, S = (e) => {
        let t = I(), n = t.stackSave();
        try {
          let o = t.PTR_SIZE, r = t.stackAlloc(2 * o);
          t._OrtGetLastError(r, r + o);
          let i = Number(t.getValue(r, o === 4 ? "i32" : "i64")), s = t.getValue(r + o, "*"), a = s ? t.UTF8ToString(s) : "";
          throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`);
        } finally {
          t.stackRestore(n);
        }
      };
    });
    on = E(() => {
      "use strict";
      ee();
      Re();
      rn = (e) => {
        let t = I(), n = 0, o = [], r = e || {};
        try {
          if (e?.logSeverityLevel === void 0) r.logSeverityLevel = 2;
          else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);
          if (e?.logVerbosityLevel === void 0) r.logVerbosityLevel = 0;
          else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);
          e?.terminate === void 0 && (r.terminate = false);
          let i = 0;
          return e?.tag !== void 0 && (i = N(e.tag, o)), n = t._OrtCreateRunOptions(r.logSeverityLevel, r.logVerbosityLevel, !!r.terminate, i), n === 0 && S("Can't create run options."), e?.extra !== void 0 && he(e.extra, "", /* @__PURE__ */ new WeakSet(), (s, a) => {
            let u = N(s, o), f = N(a, o);
            t._OrtAddRunConfigEntry(n, u, f) !== 0 && S(`Can't set a run config entry: ${s} - ${a}.`);
          }), [n, o];
        } catch (i) {
          throw n !== 0 && t._OrtReleaseRunOptions(n), o.forEach((s) => t._free(s)), i;
        }
      };
    });
    an = E(() => {
      "use strict";
      ee();
      Re();
      Gn = (e) => {
        switch (e) {
          case "disabled":
            return 0;
          case "basic":
            return 1;
          case "extended":
            return 2;
          case "layout":
            return 3;
          case "all":
            return 99;
          default:
            throw new Error(`unsupported graph optimization level: ${e}`);
        }
      }, $n = (e) => {
        switch (e) {
          case "sequential":
            return 0;
          case "parallel":
            return 1;
          default:
            throw new Error(`unsupported execution mode: ${e}`);
        }
      }, zn = (e) => {
        e.extra || (e.extra = {}), e.extra.session || (e.extra.session = {});
        let t = e.extra.session;
        t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e.executionProviders && e.executionProviders.some((n) => (typeof n == "string" ? n : n.name) === "webgpu") && (e.enableMemPattern = false);
      }, se = (e, t, n, o) => {
        let r = N(t, o), i = N(n, o);
        I()._OrtAddSessionConfigEntry(e, r, i) !== 0 && S(`Can't set a session config entry: ${t} - ${n}.`);
      }, Hn = async (e, t, n) => {
        let o = t.executionProviders;
        for (let r of o) {
          let i = typeof r == "string" ? r : r.name, s = [];
          switch (i) {
            case "webnn":
              if (i = "WEBNN", se(e, "session.disable_quant_qdq", "1", n), se(e, "session.disable_qdq_constant_folding", "1", n), typeof r != "string") {
                let d = r?.deviceType;
                d && se(e, "deviceType", d, n);
              }
              break;
            case "webgpu":
              if (i = "JS", typeof r != "string") {
                let c = r;
                if (c?.preferredLayout) {
                  if (c.preferredLayout !== "NCHW" && c.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);
                  se(e, "preferredLayout", c.preferredLayout, n);
                }
              }
              break;
            case "wasm":
            case "cpu":
              continue;
            default:
              throw new Error(`not supported execution provider: ${i}`);
          }
          let a = N(i, n), u = s.length, f = 0, l = 0;
          if (u > 0) {
            f = I()._malloc(u * I().PTR_SIZE), n.push(f), l = I()._malloc(u * I().PTR_SIZE), n.push(l);
            for (let c = 0; c < u; c++) I().setValue(f + c * I().PTR_SIZE, s[c][0], "*"), I().setValue(l + c * I().PTR_SIZE, s[c][1], "*");
          }
          await I()._OrtAppendExecutionProvider(e, a, f, l, u) !== 0 && S(`Can't append execution provider: ${i}.`);
        }
      }, sn = async (e) => {
        let t = I(), n = 0, o = [], r = e || {};
        zn(r);
        try {
          let i = Gn(r.graphOptimizationLevel ?? "all"), s = $n(r.executionMode ?? "sequential"), a = typeof r.logId == "string" ? N(r.logId, o) : 0, u = r.logSeverityLevel ?? 2;
          if (!Number.isInteger(u) || u < 0 || u > 4) throw new Error(`log severity level is not valid: ${u}`);
          let f = r.logVerbosityLevel ?? 0;
          if (!Number.isInteger(f) || f < 0 || f > 4) throw new Error(`log verbosity level is not valid: ${f}`);
          let l = typeof r.optimizedModelFilePath == "string" ? N(r.optimizedModelFilePath, o) : 0;
          if (n = t._OrtCreateSessionOptions(i, !!r.enableCpuMemArena, !!r.enableMemPattern, s, !!r.enableProfiling, 0, a, u, f, l), n === 0 && S("Can't create session options."), r.executionProviders && await Hn(n, r, o), r.enableGraphCapture !== void 0) {
            if (typeof r.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${r.enableGraphCapture}`);
            se(n, "enableGraphCapture", r.enableGraphCapture.toString(), o);
          }
          if (r.freeDimensionOverrides) for (let [c, d] of Object.entries(r.freeDimensionOverrides)) {
            if (typeof c != "string") throw new Error(`free dimension override name must be a string: ${c}`);
            if (typeof d != "number" || !Number.isInteger(d) || d < 0) throw new Error(`free dimension override value must be a non-negative integer: ${d}`);
            let p = N(c, o);
            t._OrtAddFreeDimensionOverride(n, p, d) !== 0 && S(`Can't set a free dimension override: ${c} - ${d}.`);
          }
          return r.extra !== void 0 && he(r.extra, "", /* @__PURE__ */ new WeakSet(), (c, d) => {
            se(n, c, d, o);
          }), [n, o];
        } catch (i) {
          throw n !== 0 && t._OrtReleaseSessionOptions(n) !== 0 && S("Can't release session options."), o.forEach((s) => t._free(s)), i;
        }
      };
    });
    st = E(() => {
      "use strict";
      ie = (e) => {
        switch (e) {
          case "int8":
            return 3;
          case "uint8":
            return 2;
          case "bool":
            return 9;
          case "int16":
            return 5;
          case "uint16":
            return 4;
          case "int32":
            return 6;
          case "uint32":
            return 12;
          case "float16":
            return 10;
          case "float32":
            return 1;
          case "float64":
            return 11;
          case "string":
            return 8;
          case "int64":
            return 7;
          case "uint64":
            return 13;
          case "int4":
            return 22;
          case "uint4":
            return 21;
          default:
            throw new Error(`unsupported data type: ${e}`);
        }
      }, Ne = (e) => {
        switch (e) {
          case 3:
            return "int8";
          case 2:
            return "uint8";
          case 9:
            return "bool";
          case 5:
            return "int16";
          case 4:
            return "uint16";
          case 6:
            return "int32";
          case 12:
            return "uint32";
          case 10:
            return "float16";
          case 1:
            return "float32";
          case 11:
            return "float64";
          case 8:
            return "string";
          case 7:
            return "int64";
          case 13:
            return "uint64";
          case 22:
            return "int4";
          case 21:
            return "uint4";
          default:
            throw new Error(`unsupported data type: ${e}`);
        }
      }, ae = (e, t) => {
        let n = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, 0.5, 0.5][e], o = typeof t == "number" ? t : t.reduce((r, i) => r * i, 1);
        return n > 0 ? Math.ceil(o * n) : void 0;
      }, un = (e) => {
        switch (e) {
          case "float16":
            return typeof Float16Array < "u" ? Float16Array : Uint16Array;
          case "float32":
            return Float32Array;
          case "uint8":
            return Uint8Array;
          case "int8":
            return Int8Array;
          case "uint16":
            return Uint16Array;
          case "int16":
            return Int16Array;
          case "int32":
            return Int32Array;
          case "bool":
            return Uint8Array;
          case "float64":
            return Float64Array;
          case "uint32":
            return Uint32Array;
          case "int64":
            return BigInt64Array;
          case "uint64":
            return BigUint64Array;
          default:
            throw new Error(`unsupported type: ${e}`);
        }
      }, fn = (e) => {
        switch (e) {
          case "verbose":
            return 0;
          case "info":
            return 1;
          case "warning":
            return 2;
          case "error":
            return 3;
          case "fatal":
            return 4;
          default:
            throw new Error(`unsupported logging level: ${e}`);
        }
      }, Fe = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", ke = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", cn = (e) => {
        switch (e) {
          case "none":
            return 0;
          case "cpu":
            return 1;
          case "cpu-pinned":
            return 2;
          case "texture":
            return 3;
          case "gpu-buffer":
            return 4;
          case "ml-tensor":
            return 5;
          default:
            throw new Error(`unsupported data location: ${e}`);
        }
      };
    });
    it = E(() => {
      "use strict";
      Ae();
      be = async (e) => {
        if (typeof e == "string") if (false) try {
          let { readFile: t } = Je("node:fs/promises");
          return new Uint8Array(await t(e));
        } catch (t) {
          if (t.code === "ERR_FS_FILE_TOO_LARGE") {
            let { createReadStream: n } = Je("node:fs"), o = n(e), r = [];
            for await (let i of o) r.push(i);
            return new Uint8Array(Buffer.concat(r));
          }
          throw t;
        }
        else {
          let t = await fetch(e);
          if (!t.ok) throw new Error(`failed to load external data file: ${e}`);
          let n = t.headers.get("Content-Length"), o = n ? parseInt(n, 10) : 0;
          if (o < 1073741824) return new Uint8Array(await t.arrayBuffer());
          {
            if (!t.body) throw new Error(`failed to load external data file: ${e}, no response body.`);
            let r = t.body.getReader(), i;
            try {
              i = new ArrayBuffer(o);
            } catch (a) {
              if (a instanceof RangeError) {
                let u = Math.ceil(o / 65536);
                i = new WebAssembly.Memory({ initial: u, maximum: u }).buffer;
              } else throw a;
            }
            let s = 0;
            for (; ; ) {
              let { done: a, value: u } = await r.read();
              if (a) break;
              let f = u.byteLength;
              new Uint8Array(i, s, f).set(u), s += f;
            }
            return new Uint8Array(i, 0, o);
          }
        }
        else return e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : e instanceof Uint8Array ? e : new Uint8Array(e);
      };
    });
    tt = E(() => {
      "use strict";
      J();
      on();
      an();
      st();
      ee();
      Re();
      it();
      jn = (e, t) => {
        I()._OrtInit(e, t) !== 0 && S("Can't initialize onnxruntime.");
      }, Le = async (e) => {
        jn(e.wasm.numThreads, fn(e.logLevel));
      }, Pe = async (e, t) => {
        I().asyncInit?.();
        let n = e.webgpu.adapter;
        if (t === "webgpu") {
          if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
          if (n) {
            if (typeof n.limits != "object" || typeof n.features != "object" || typeof n.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
          } else {
            let o = e.webgpu.powerPreference;
            if (o !== void 0 && o !== "low-power" && o !== "high-performance") throw new Error(`Invalid powerPreference setting: "${o}"`);
            let r = e.webgpu.forceFallbackAdapter;
            if (r !== void 0 && typeof r != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${r}"`);
            if (n = await navigator.gpu.requestAdapter({ powerPreference: o, forceFallbackAdapter: r }), !n) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
          }
        }
        if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
      }, ue = /* @__PURE__ */ new Map(), Vn = (e) => {
        let t = I(), n = t.stackSave();
        try {
          let o = t.PTR_SIZE, r = t.stackAlloc(2 * o);
          t._OrtGetInputOutputCount(e, r, r + o) !== 0 && S("Can't get session input/output count.");
          let s = o === 4 ? "i32" : "i64";
          return [Number(t.getValue(r, s)), Number(t.getValue(r + o, s))];
        } finally {
          t.stackRestore(n);
        }
      }, dn = (e, t) => {
        let n = I(), o = n.stackSave(), r = 0;
        try {
          let i = n.PTR_SIZE, s = n.stackAlloc(2 * i);
          n._OrtGetInputOutputMetadata(e, t, s, s + i) !== 0 && S("Can't get session input/output metadata.");
          let u = Number(n.getValue(s, "*"));
          r = Number(n.getValue(s + i, "*"));
          let f = n.HEAP32[r / 4];
          if (f === 0) return [u, 0];
          let l = n.HEAPU32[r / 4 + 1], c = [];
          for (let d = 0; d < l; d++) {
            let p = Number(n.getValue(r + 8 + d * i, "*"));
            c.push(p !== 0 ? n.UTF8ToString(p) : Number(n.getValue(r + 8 + (d + l) * i, "*")));
          }
          return [u, f, c];
        } finally {
          n.stackRestore(o), r !== 0 && n._OrtFree(r);
        }
      }, we = (e) => {
        let t = I(), n = t._malloc(e.byteLength);
        if (n === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);
        return t.HEAPU8.set(e, n), [n, e.byteLength];
      }, _e = async (e, t) => {
        let n, o, r = I();
        Array.isArray(e) ? [n, o] = e : e.buffer === r.HEAPU8.buffer ? [n, o] = [e.byteOffset, e.byteLength] : [n, o] = we(e);
        let i = 0, s = 0, a = 0, u = [], f = [], l = [];
        try {
          if ([s, u] = await sn(t), t?.externalData && r.mountExternalData) {
            let g = [];
            for (let T of t.externalData) {
              let U = typeof T == "string" ? T : T.path;
              g.push(be(typeof T == "string" ? T : T.data).then((M) => {
                r.mountExternalData(U, M);
              }));
            }
            await Promise.all(g);
          }
          for (let g of t?.executionProviders ?? []) if ((typeof g == "string" ? g : g.name) === "webnn") {
            if (r.shouldTransferToMLTensor = false, typeof g != "string") {
              let U = g, M = U?.context, v = U?.gpuDevice, de = U?.deviceType, re = U?.powerPreference;
              M ? r.currentContext = M : v ? r.currentContext = await r.webnnCreateMLContext(v) : r.currentContext = await r.webnnCreateMLContext({ deviceType: de, powerPreference: re });
            } else r.currentContext = await r.webnnCreateMLContext();
            break;
          }
          i = await r._OrtCreateSession(n, o, s), r.webgpuOnCreateSession?.(i), i === 0 && S("Can't create a session."), r.jsepOnCreateSession?.(), r.currentContext && (r.webnnRegisterMLContext(i, r.currentContext), r.currentContext = void 0, r.shouldTransferToMLTensor = true);
          let [c, d] = Vn(i), p = !!t?.enableGraphCapture, h = [], y = [], A = [], m = [], w = [];
          for (let g = 0; g < c; g++) {
            let [T, U, M] = dn(i, g);
            T === 0 && S("Can't get an input name."), f.push(T);
            let v = r.UTF8ToString(T);
            h.push(v), A.push(U === 0 ? { name: v, isTensor: false } : { name: v, isTensor: true, type: Ne(U), shape: M });
          }
          for (let g = 0; g < d; g++) {
            let [T, U, M] = dn(i, g + c);
            T === 0 && S("Can't get an output name."), l.push(T);
            let v = r.UTF8ToString(T);
            y.push(v), m.push(U === 0 ? { name: v, isTensor: false } : { name: v, isTensor: true, type: Ne(U), shape: M });
          }
          return ue.set(i, [i, f, l, null, p, false]), [i, h, y, A, m];
        } catch (c) {
          throw f.forEach((d) => r._OrtFree(d)), l.forEach((d) => r._OrtFree(d)), a !== 0 && r._OrtReleaseBinding(a) !== 0 && S("Can't release IO binding."), i !== 0 && r._OrtReleaseSession(i) !== 0 && S("Can't release session."), c;
        } finally {
          r._free(n), s !== 0 && r._OrtReleaseSessionOptions(s) !== 0 && S("Can't release session options."), u.forEach((c) => r._free(c)), r.unmountExternalData?.();
        }
      }, De = (e) => {
        let t = I(), n = ue.get(e);
        if (!n) throw new Error(`cannot release session. invalid session id: ${e}`);
        let [o, r, i, s, a] = n;
        s && (a && t._OrtClearBoundOutputs(s.handle) !== 0 && S("Can't clear bound outputs."), t._OrtReleaseBinding(s.handle) !== 0 && S("Can't release IO binding.")), t.jsepOnReleaseSession?.(e), t.webnnOnReleaseSession?.(e), t.webgpuOnReleaseSession?.(e), r.forEach((u) => t._OrtFree(u)), i.forEach((u) => t._OrtFree(u)), t._OrtReleaseSession(o) !== 0 && S("Can't release session."), ue.delete(e);
      }, ln = async (e, t, n, o, r, i, s = false) => {
        if (!e) {
          t.push(0);
          return;
        }
        let a = I(), u = a.PTR_SIZE, f = e[0], l = e[1], c = e[3], d = c, p, h;
        if (f === "string" && (c === "gpu-buffer" || c === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
        if (s && c !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);
        if (c === "gpu-buffer") {
          let m = e[2].gpuBuffer;
          h = ae(ie(f), l);
          {
            let w = a.jsepRegisterBuffer;
            if (!w) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            p = w(o, i, m, h);
          }
        } else if (c === "ml-tensor") {
          let m = e[2].mlTensor;
          h = ae(ie(f), l);
          let w = a.webnnRegisterMLTensor;
          if (!w) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
          p = w(o, m, ie(f), l);
        } else {
          let m = e[2];
          if (Array.isArray(m)) {
            h = u * m.length, p = a._malloc(h), n.push(p);
            for (let w = 0; w < m.length; w++) {
              if (typeof m[w] != "string") throw new TypeError(`tensor data at index ${w} is not a string`);
              a.setValue(p + w * u, N(m[w], n), "*");
            }
          } else {
            let w = a.webnnIsGraphInput, O = a.webnnIsGraphOutput;
            if (f !== "string" && w && O) {
              let g = a.UTF8ToString(r);
              if (w(o, g) || O(o, g)) {
                let T = ie(f);
                h = ae(T, l), d = "ml-tensor";
                let U = a.webnnCreateTemporaryTensor, M = a.webnnUploadTensor;
                if (!U || !M) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
                let v = await U(o, T, l);
                M(v, new Uint8Array(m.buffer, m.byteOffset, m.byteLength)), p = v;
              } else h = m.byteLength, p = a._malloc(h), n.push(p), a.HEAPU8.set(new Uint8Array(m.buffer, m.byteOffset, h), p);
            } else h = m.byteLength, p = a._malloc(h), n.push(p), a.HEAPU8.set(new Uint8Array(m.buffer, m.byteOffset, h), p);
          }
        }
        let y = a.stackSave(), A = a.stackAlloc(4 * l.length);
        try {
          l.forEach((w, O) => a.setValue(A + O * u, w, u === 4 ? "i32" : "i64"));
          let m = a._OrtCreateTensor(ie(f), p, h, A, l.length, cn(d));
          m === 0 && S(`Can't create tensor for input/output. session=${o}, index=${i}.`), t.push(m);
        } finally {
          a.stackRestore(y);
        }
      }, Ue = async (e, t, n, o, r, i) => {
        let s = I(), a = s.PTR_SIZE, u = ue.get(e);
        if (!u) throw new Error(`cannot run inference. invalid session id: ${e}`);
        let f = u[0], l = u[1], c = u[2], d = u[3], p = u[4], h = u[5], y = t.length, A = o.length, m = 0, w = [], O = [], g = [], T = [], U = [], M = s.stackSave(), v = s.stackAlloc(y * a), de = s.stackAlloc(y * a), re = s.stackAlloc(A * a), ct = s.stackAlloc(A * a);
        try {
          [m, w] = rn(i), K("wasm prepareInputOutputTensor");
          for (let b = 0; b < y; b++) await ln(n[b], O, T, e, l[t[b]], t[b], p);
          for (let b = 0; b < A; b++) await ln(r[b], g, T, e, c[o[b]], y + o[b], p);
          Q("wasm prepareInputOutputTensor");
          for (let b = 0; b < y; b++) s.setValue(v + b * a, O[b], "*"), s.setValue(de + b * a, l[t[b]], "*");
          for (let b = 0; b < A; b++) s.setValue(re + b * a, g[b], "*"), s.setValue(ct + b * a, c[o[b]], "*");
          s.jsepOnRunStart?.(f), s.webnnOnRunStart?.(f);
          let F;
          F = await s._OrtRun(f, de, v, y, ct, A, re, m), F !== 0 && S("failed to call OrtRun().");
          let z = [], dt = [];
          K("wasm ProcessOutputTensor");
          for (let b = 0; b < A; b++) {
            let W = Number(s.getValue(re + b * a, "*"));
            if (W === g[b] || U.includes(g[b])) {
              z.push(r[b]), W !== g[b] && s._OrtReleaseTensor(W) !== 0 && S("Can't release tensor.");
              continue;
            }
            let lt = s.stackSave(), $ = s.stackAlloc(4 * a), oe = false, P, C = 0;
            try {
              s._OrtGetTensorData(W, $, $ + a, $ + 2 * a, $ + 3 * a) !== 0 && S(`Can't access output tensor data on index ${b}.`);
              let je = a === 4 ? "i32" : "i64", ge = Number(s.getValue($, je));
              C = s.getValue($ + a, "*");
              let pt = s.getValue($ + a * 2, "*"), Bn = Number(s.getValue($ + a * 3, je)), H = [];
              for (let D = 0; D < Bn; D++) H.push(Number(s.getValue(pt + D * a, je)));
              s._OrtFree(pt) !== 0 && S("Can't free memory for tensor dims.");
              let j = H.reduce((D, L) => D * L, 1);
              P = Ne(ge);
              let le = d?.outputPreferredLocations[o[b]];
              if (P === "string") {
                if (le === "gpu-buffer" || le === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
                let D = [];
                for (let L = 0; L < j; L++) {
                  let V = s.getValue(C + L * a, "*"), Ee = s.getValue(C + (L + 1) * a, "*"), mt = L === j - 1 ? void 0 : Ee - V;
                  D.push(s.UTF8ToString(V, mt));
                }
                z.push([P, H, D, "cpu"]);
              } else if (le === "gpu-buffer" && j > 0) {
                let D = s.jsepGetBuffer;
                if (!D) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                let L = D(C), V = ae(ge, j);
                if (V === void 0 || !Fe(P)) throw new Error(`Unsupported data type: ${P}`);
                oe = true, z.push([P, H, { gpuBuffer: L, download: s.jsepCreateDownloader(L, V, P), dispose: () => {
                  s._OrtReleaseTensor(W) !== 0 && S("Can't release tensor.");
                } }, "gpu-buffer"]);
              } else if (le === "ml-tensor" && j > 0) {
                let D = s.webnnEnsureTensor, L = s.webnnIsGraphInputOutputTypeSupported;
                if (!D || !L) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                if (ae(ge, j) === void 0 || !ke(P)) throw new Error(`Unsupported data type: ${P}`);
                if (!L(e, P, false)) throw new Error(`preferredLocation "ml-tensor" for ${P} output is not supported by current WebNN Context.`);
                let Ee = await D(e, C, ge, H, false);
                oe = true, z.push([P, H, { mlTensor: Ee, download: s.webnnCreateMLTensorDownloader(C, P), dispose: () => {
                  s.webnnReleaseTensorId(C), s._OrtReleaseTensor(W);
                } }, "ml-tensor"]);
              } else if (le === "ml-tensor-cpu-output" && j > 0) {
                let D = s.webnnCreateMLTensorDownloader(C, P)(), L = z.length;
                oe = true, dt.push((async () => {
                  let V = [L, await D];
                  return s.webnnReleaseTensorId(C), s._OrtReleaseTensor(W), V;
                })()), z.push([P, H, [], "cpu"]);
              } else {
                let D = un(P), L = new D(j);
                new Uint8Array(L.buffer, L.byteOffset, L.byteLength).set(s.HEAPU8.subarray(C, C + L.byteLength)), z.push([P, H, L, "cpu"]);
              }
            } finally {
              s.stackRestore(lt), P === "string" && C && s._free(C), oe || s._OrtReleaseTensor(W);
            }
          }
          d && !p && (s._OrtClearBoundOutputs(d.handle) !== 0 && S("Can't clear bound outputs."), ue.set(e, [f, l, c, d, p, false]));
          for (let [b, W] of await Promise.all(dt)) z[b][2] = W;
          return Q("wasm ProcessOutputTensor"), z;
        } finally {
          s.webnnOnRunEnd?.(f), s.stackRestore(M), O.forEach((F) => s._OrtReleaseTensor(F)), g.forEach((F) => s._OrtReleaseTensor(F)), T.forEach((F) => s._free(F)), m !== 0 && s._OrtReleaseRunOptions(m), w.forEach((F) => s._free(F));
        }
      }, xe = (e) => {
        let t = I(), n = ue.get(e);
        if (!n) throw new Error("invalid session id");
        let o = n[0], r = t._OrtEndProfiling(o);
        r === 0 && S("Can't get an profile file name."), t._OrtFree(r);
      }, ve = (e) => {
        let t = [];
        for (let n of e) {
          let o = n[2];
          !Array.isArray(o) && "buffer" in o && t.push(o.buffer);
        }
        return t;
      };
    });
    ft = E(() => {
      "use strict";
      J();
      tt();
      ee();
      Be();
      ne = () => !!B.wasm.proxy && typeof document < "u", ye = false, Ge = false, $e = false, ut = /* @__PURE__ */ new Map(), fe = (e, t) => {
        let n = ut.get(e);
        n ? n.push(t) : ut.set(e, [t]);
      }, ce = () => {
        if (ye || !Ge || $e || !k) throw new Error("worker not ready");
      }, qn = (e) => {
        switch (e.data.type) {
          case "init-wasm":
            ye = false, e.data.err ? ($e = true, at[1](e.data.err)) : (Ge = true, at[0]()), We && (URL.revokeObjectURL(We), We = void 0);
            break;
          case "init-ep":
          case "copy-from":
          case "create":
          case "release":
          case "run":
          case "end-profiling": {
            let t = ut.get(e.data.type);
            e.data.err ? t.shift()[1](e.data.err) : t.shift()[0](e.data.out);
            break;
          }
          default:
        }
      }, pn = async () => {
        if (!Ge) {
          if (ye) throw new Error("multiple calls to 'initWasm()' detected.");
          if ($e) throw new Error("previous call to 'initWasm()' failed.");
          if (ye = true, ne()) return new Promise((e, t) => {
            k?.terminate(), en().then(([n, o]) => {
              try {
                k = o, k.onerror = (i) => t(i), k.onmessage = qn, at = [e, t];
                let r = { type: "init-wasm", in: B };
                if (!r.in.wasm.wasmPaths && n) {
                  let i = Ce();
                  i && (r.in.wasm.wasmPaths = i);
                }
                k.postMessage(r), We = n;
              } catch (r) {
                t(r);
              }
            }, t);
          });
          try {
            await Oe(B.wasm), await Le(B), Ge = true;
          } catch (e) {
            throw $e = true, e;
          } finally {
            ye = false;
          }
        }
      }, mn = async (e) => {
        if (ne()) return ce(), new Promise((t, n) => {
          fe("init-ep", [t, n]);
          let o = { type: "init-ep", in: { epName: e, env: B } };
          k.postMessage(o);
        });
        await Pe(B, e);
      }, wn = async (e) => ne() ? (ce(), new Promise((t, n) => {
        fe("copy-from", [t, n]);
        let o = { type: "copy-from", in: { buffer: e } };
        k.postMessage(o, [e.buffer]);
      })) : we(e), hn = async (e, t) => {
        if (ne()) {
          if (t?.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
          return ce(), new Promise((n, o) => {
            fe("create", [n, o]);
            let r = { type: "create", in: { model: e, options: { ...t } } }, i = [];
            e instanceof Uint8Array && i.push(e.buffer), k.postMessage(r, i);
          });
        } else return _e(e, t);
      }, bn = async (e) => {
        if (ne()) return ce(), new Promise((t, n) => {
          fe("release", [t, n]);
          let o = { type: "release", in: e };
          k.postMessage(o);
        });
        De(e);
      }, yn = async (e, t, n, o, r, i) => {
        if (ne()) {
          if (n.some((s) => s[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
          if (r.some((s) => s)) throw new Error("pre-allocated output tensor is not supported for proxy.");
          return ce(), new Promise((s, a) => {
            fe("run", [s, a]);
            let u = n, f = { type: "run", in: { sessionId: e, inputIndices: t, inputs: u, outputIndices: o, options: i } };
            k.postMessage(f, ve(u));
          });
        } else return Ue(e, t, n, o, r, i);
      }, gn = async (e) => {
        if (ne()) return ce(), new Promise((t, n) => {
          fe("end-profiling", [t, n]);
          let o = { type: "end-profiling", in: e };
          k.postMessage(o);
        });
        xe(e);
      };
    });
    Sn = E(() => {
      "use strict";
      J();
      ft();
      st();
      Ae();
      it();
      En = (e, t) => {
        switch (e.location) {
          case "cpu":
            return [e.type, e.dims, e.data, "cpu"];
          case "gpu-buffer":
            return [e.type, e.dims, { gpuBuffer: e.gpuBuffer }, "gpu-buffer"];
          case "ml-tensor":
            return [e.type, e.dims, { mlTensor: e.mlTensor }, "ml-tensor"];
          default:
            throw new Error(`invalid data location: ${e.location} for ${t()}`);
        }
      }, Yn = (e) => {
        switch (e[3]) {
          case "cpu":
            return new G(e[0], e[2], e[1]);
          case "gpu-buffer": {
            let t = e[0];
            if (!Fe(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
            let { gpuBuffer: n, download: o, dispose: r } = e[2];
            return G.fromGpuBuffer(n, { dataType: t, dims: e[1], download: o, dispose: r });
          }
          case "ml-tensor": {
            let t = e[0];
            if (!ke(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
            let { mlTensor: n, download: o, dispose: r } = e[2];
            return G.fromMLTensor(n, { dataType: t, dims: e[1], download: o, dispose: r });
          }
          default:
            throw new Error(`invalid data location: ${e[3]}`);
        }
      }, ze = class {
        async fetchModelAndCopyToWasmMemory(t) {
          return wn(await be(t));
        }
        async loadModel(t, n) {
          Z();
          let o;
          typeof t == "string" ? o = await this.fetchModelAndCopyToWasmMemory(t) : o = t, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await hn(o, n), X();
        }
        async dispose() {
          return bn(this.sessionId);
        }
        async run(t, n, o) {
          Z();
          let r = [], i = [];
          Object.entries(t).forEach((d) => {
            let p = d[0], h = d[1], y = this.inputNames.indexOf(p);
            if (y === -1) throw new Error(`invalid input '${p}'`);
            r.push(h), i.push(y);
          });
          let s = [], a = [];
          Object.entries(n).forEach((d) => {
            let p = d[0], h = d[1], y = this.outputNames.indexOf(p);
            if (y === -1) throw new Error(`invalid output '${p}'`);
            s.push(h), a.push(y);
          });
          let u = r.map((d, p) => En(d, () => `input "${this.inputNames[i[p]]}"`)), f = s.map((d, p) => d ? En(d, () => `output "${this.outputNames[a[p]]}"`) : null), l = await yn(this.sessionId, i, u, a, f, o), c = {};
          for (let d = 0; d < l.length; d++) c[this.outputNames[a[d]]] = s[d] ?? Yn(l[d]);
          return X(), c;
        }
        startProfiling() {
        }
        endProfiling() {
          gn(this.sessionId);
        }
      };
    });
    In = {};
    qe(In, { OnnxruntimeWebAssemblyBackend: () => He, initializeFlags: () => Tn, wasmBackend: () => Zn });
    An = E(() => {
      "use strict";
      J();
      ft();
      Sn();
      Tn = () => {
        (typeof B.wasm.initTimeout != "number" || B.wasm.initTimeout < 0) && (B.wasm.initTimeout = 0);
        let e = B.wasm.simd;
        if (typeof e != "boolean" && e !== void 0 && e !== "fixed" && e !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`), B.wasm.simd = false), typeof B.wasm.proxy != "boolean" && (B.wasm.proxy = false), typeof B.wasm.trace != "boolean" && (B.wasm.trace = false), typeof B.wasm.numThreads != "number" || !Number.isInteger(B.wasm.numThreads) || B.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) B.wasm.numThreads = 1;
        else {
          let t = typeof navigator > "u" ? Je("node:os").cpus().length : navigator.hardwareConcurrency;
          B.wasm.numThreads = Math.min(4, Math.ceil((t || 1) / 2));
        }
      }, He = class {
        async init(t) {
          Tn(), await pn(), await mn(t);
        }
        async createInferenceSessionHandler(t, n) {
          let o = new ze();
          return await o.loadModel(t, n), o;
        }
      }, Zn = new He();
    });
    J();
    J();
    J();
    jt = "1.27.0";
    Ro = et;
    {
      let e = (An(), wt(In)).wasmBackend;
      pe("cpu", e, 10), pe("wasm", e, 10);
    }
    Object.defineProperty(B.versions, "web", { value: jt, enumerable: true });
  }
});

// maia-worker-source.js
init_ort_wasm_min();

// node_modules/chess.js/dist/esm/chess.js
function rootNode(comment) {
  return comment !== null ? { comment, variations: [] } : { variations: [] };
}
function node(move, suffix, nag, comment, variations) {
  const node2 = { move, variations };
  if (suffix) {
    node2.suffix = suffix;
  }
  if (nag) {
    node2.nag = nag;
  }
  if (comment !== null) {
    node2.comment = comment;
  }
  return node2;
}
function lineToTree(...nodes) {
  const [root, ...rest] = nodes;
  let parent = root;
  for (const child of rest) {
    if (child !== null) {
      parent.variations = [child, ...child.variations];
      child.variations = [];
      parent = child;
    }
  }
  return root;
}
function pgn(headers, game) {
  if (game.marker && game.marker.comment) {
    let node2 = game.root;
    while (true) {
      const next = node2.variations[0];
      if (!next) {
        node2.comment = game.marker.comment;
        break;
      }
      node2 = next;
    }
  }
  return {
    headers,
    root: game.root,
    result: (game.marker && game.marker.result) ?? void 0
  };
}
function peg$subclass(child, parent) {
  function C() {
    this.constructor = child;
  }
  C.prototype = parent.prototype;
  child.prototype = new C();
}
function peg$SyntaxError(message, expected, found, location2) {
  var self2 = Error.call(this, message);
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self2, peg$SyntaxError.prototype);
  }
  self2.expected = expected;
  self2.found = found;
  self2.location = location2;
  self2.name = "SyntaxError";
  return self2;
}
peg$subclass(peg$SyntaxError, Error);
function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}
peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k2;
    for (k2 = 0; k2 < sources.length; k2++) {
      if (sources[k2].source === this.location.source) {
        src = sources[k2].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, " ");
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = last - s.column || 1;
      str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};
peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return '"' + literalEscape(expectation.text) + '"';
    },
    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
      });
      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(expectation) {
      return expectation.description;
    }
  };
  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }
  function literalEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function classEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }
  function describeExpected(expected2) {
    var descriptions = expected2.map(describeExpectation);
    var i, j;
    descriptions.sort();
    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }
    switch (descriptions.length) {
      case 1:
        return descriptions[0];
      case 2:
        return descriptions[0] + " or " + descriptions[1];
      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }
  function describeFound(found2) {
    return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
  }
  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
  options = options !== void 0 ? options : {};
  var peg$FAILED = {};
  var peg$source = options.grammarSource;
  var peg$startRuleFunctions = { pgn: peg$parsepgn };
  var peg$startRuleFunction = peg$parsepgn;
  var peg$c0 = "[";
  var peg$c1 = '"';
  var peg$c2 = "]";
  var peg$c3 = ".";
  var peg$c4 = "O-O-O";
  var peg$c5 = "O-O";
  var peg$c6 = "0-0-0";
  var peg$c7 = "0-0";
  var peg$c8 = "$";
  var peg$c9 = "{";
  var peg$c10 = "}";
  var peg$c11 = ";";
  var peg$c12 = "(";
  var peg$c13 = ")";
  var peg$c14 = "1-0";
  var peg$c15 = "0-1";
  var peg$c16 = "1/2-1/2";
  var peg$c17 = "*";
  var peg$r0 = /^[a-zA-Z]/;
  var peg$r1 = /^[^"]/;
  var peg$r2 = /^[0-9]/;
  var peg$r3 = /^[.]/;
  var peg$r4 = /^[a-zA-Z1-8\-=]/;
  var peg$r5 = /^[+#]/;
  var peg$r6 = /^[!?]/;
  var peg$r7 = /^[^}]/;
  var peg$r8 = /^[^\r\n]/;
  var peg$r9 = /^[ \t\r\n]/;
  var peg$e0 = peg$otherExpectation("tag pair");
  var peg$e1 = peg$literalExpectation("[", false);
  var peg$e2 = peg$literalExpectation('"', false);
  var peg$e3 = peg$literalExpectation("]", false);
  var peg$e4 = peg$otherExpectation("tag name");
  var peg$e5 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
  var peg$e6 = peg$otherExpectation("tag value");
  var peg$e7 = peg$classExpectation(['"'], true, false);
  var peg$e8 = peg$otherExpectation("move number");
  var peg$e9 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e10 = peg$literalExpectation(".", false);
  var peg$e11 = peg$classExpectation(["."], false, false);
  var peg$e12 = peg$otherExpectation("standard algebraic notation");
  var peg$e13 = peg$literalExpectation("O-O-O", false);
  var peg$e14 = peg$literalExpectation("O-O", false);
  var peg$e15 = peg$literalExpectation("0-0-0", false);
  var peg$e16 = peg$literalExpectation("0-0", false);
  var peg$e17 = peg$classExpectation([["a", "z"], ["A", "Z"], ["1", "8"], "-", "="], false, false);
  var peg$e18 = peg$classExpectation(["+", "#"], false, false);
  var peg$e19 = peg$otherExpectation("suffix annotation");
  var peg$e20 = peg$classExpectation(["!", "?"], false, false);
  var peg$e21 = peg$otherExpectation("NAG");
  var peg$e22 = peg$literalExpectation("$", false);
  var peg$e23 = peg$otherExpectation("brace comment");
  var peg$e24 = peg$literalExpectation("{", false);
  var peg$e25 = peg$classExpectation(["}"], true, false);
  var peg$e26 = peg$literalExpectation("}", false);
  var peg$e27 = peg$otherExpectation("rest of line comment");
  var peg$e28 = peg$literalExpectation(";", false);
  var peg$e29 = peg$classExpectation(["\r", "\n"], true, false);
  var peg$e30 = peg$otherExpectation("variation");
  var peg$e31 = peg$literalExpectation("(", false);
  var peg$e32 = peg$literalExpectation(")", false);
  var peg$e33 = peg$otherExpectation("game termination marker");
  var peg$e34 = peg$literalExpectation("1-0", false);
  var peg$e35 = peg$literalExpectation("0-1", false);
  var peg$e36 = peg$literalExpectation("1/2-1/2", false);
  var peg$e37 = peg$literalExpectation("*", false);
  var peg$e38 = peg$otherExpectation("whitespace");
  var peg$e39 = peg$classExpectation([" ", "	", "\r", "\n"], false, false);
  var peg$f0 = function(headers, game) {
    return pgn(headers, game);
  };
  var peg$f1 = function(tagPairs) {
    return Object.fromEntries(tagPairs);
  };
  var peg$f2 = function(tagName, tagValue) {
    return [tagName, tagValue];
  };
  var peg$f3 = function(root, marker) {
    return { root, marker };
  };
  var peg$f4 = function(comment, moves) {
    return lineToTree(rootNode(comment), ...moves.flat());
  };
  var peg$f5 = function(san, suffix, nag, comment, variations) {
    return node(san, suffix, nag, comment, variations);
  };
  var peg$f6 = function(nag) {
    return nag;
  };
  var peg$f7 = function(comment) {
    return comment.replace(/[\r\n]+/g, " ");
  };
  var peg$f8 = function(comment) {
    return comment.trim();
  };
  var peg$f9 = function(line) {
    return line;
  };
  var peg$f10 = function(result, comment) {
    return { result, comment };
  };
  var peg$currPos = options.peg$currPos | 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;
  var peg$result;
  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
    }
    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }
  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text, ignoreCase };
  }
  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts, inverted, ignoreCase };
  }
  function peg$endExpectation() {
    return { type: "end" };
  }
  function peg$otherExpectation(description) {
    return { type: "other", description };
  }
  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;
    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {
        }
      }
      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };
      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }
        p++;
      }
      peg$posDetailsCache[pos] = details;
      return details;
    }
  }
  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);
    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    return res;
  }
  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }
    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }
    peg$maxFailExpected.push(expected);
  }
  function peg$buildStructuredError(expected, found, location2) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location2
    );
  }
  function peg$parsepgn() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parsetagPairSection();
    s2 = peg$parsemoveTextSection();
    s0 = peg$f0(s1, s2);
    return s0;
  }
  function peg$parsetagPairSection() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsetagPair();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsetagPair();
    }
    s2 = peg$parse_();
    s0 = peg$f1(s1);
    return s0;
  }
  function peg$parsetagPair() {
    var s0, s2, s4, s6, s7, s8, s10;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 91) {
      s2 = peg$c0;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e1);
      }
    }
    if (s2 !== peg$FAILED) {
      peg$parse_();
      s4 = peg$parsetagName();
      if (s4 !== peg$FAILED) {
        peg$parse_();
        if (input.charCodeAt(peg$currPos) === 34) {
          s6 = peg$c1;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e2);
          }
        }
        if (s6 !== peg$FAILED) {
          s7 = peg$parsetagValue();
          if (input.charCodeAt(peg$currPos) === 34) {
            s8 = peg$c1;
            peg$currPos++;
          } else {
            s8 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e2);
            }
          }
          if (s8 !== peg$FAILED) {
            peg$parse_();
            if (input.charCodeAt(peg$currPos) === 93) {
              s10 = peg$c2;
              peg$currPos++;
            } else {
              s10 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e3);
              }
            }
            if (s10 !== peg$FAILED) {
              s0 = peg$f2(s4, s7);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e0);
      }
    }
    return s0;
  }
  function peg$parsetagName() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r0.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e5);
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r0.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e5);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e4);
      }
    }
    return s0;
  }
  function peg$parsetagValue() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r1.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e7);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = input.charAt(peg$currPos);
      if (peg$r1.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e7);
        }
      }
    }
    s0 = input.substring(s0, peg$currPos);
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) {
      peg$fail(peg$e6);
    }
    return s0;
  }
  function peg$parsemoveTextSection() {
    var s0, s1, s3;
    s0 = peg$currPos;
    s1 = peg$parseline();
    peg$parse_();
    s3 = peg$parsegameTerminationMarker();
    if (s3 === peg$FAILED) {
      s3 = null;
    }
    peg$parse_();
    s0 = peg$f3(s1, s3);
    return s0;
  }
  function peg$parseline() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parsecomment();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    s2 = [];
    s3 = peg$parsemove();
    while (s3 !== peg$FAILED) {
      s2.push(s3);
      s3 = peg$parsemove();
    }
    s0 = peg$f4(s1, s2);
    return s0;
  }
  function peg$parsemove() {
    var s0, s4, s5, s6, s7, s8, s9, s10;
    s0 = peg$currPos;
    peg$parse_();
    peg$parsemoveNumber();
    peg$parse_();
    s4 = peg$parsesan();
    if (s4 !== peg$FAILED) {
      s5 = peg$parsesuffixAnnotation();
      if (s5 === peg$FAILED) {
        s5 = null;
      }
      s6 = [];
      s7 = peg$parsenag();
      while (s7 !== peg$FAILED) {
        s6.push(s7);
        s7 = peg$parsenag();
      }
      s7 = peg$parse_();
      s8 = peg$parsecomment();
      if (s8 === peg$FAILED) {
        s8 = null;
      }
      s9 = [];
      s10 = peg$parsevariation();
      while (s10 !== peg$FAILED) {
        s9.push(s10);
        s10 = peg$parsevariation();
      }
      s0 = peg$f5(s4, s5, s6, s8, s9);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsemoveNumber() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r2.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e9);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = input.charAt(peg$currPos);
      if (peg$r2.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
    }
    if (input.charCodeAt(peg$currPos) === 46) {
      s2 = peg$c3;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e10);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = [];
      s5 = input.charAt(peg$currPos);
      if (peg$r3.test(s5)) {
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e11);
        }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        s5 = input.charAt(peg$currPos);
        if (peg$r3.test(s5)) {
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e11);
          }
        }
      }
      s1 = [s1, s2, s3, s4];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e8);
      }
    }
    return s0;
  }
  function peg$parsesan() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c4) {
      s2 = peg$c4;
      peg$currPos += 5;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e13);
      }
    }
    if (s2 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c5) {
        s2 = peg$c5;
        peg$currPos += 3;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      if (s2 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c6) {
          s2 = peg$c6;
          peg$currPos += 5;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e15);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c7) {
            s2 = peg$c7;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e16);
            }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$currPos;
            s3 = input.charAt(peg$currPos);
            if (peg$r0.test(s3)) {
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e5);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = input.charAt(peg$currPos);
              if (peg$r4.test(s5)) {
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e17);
                }
              }
              if (s5 !== peg$FAILED) {
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = input.charAt(peg$currPos);
                  if (peg$r4.test(s5)) {
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e17);
                    }
                  }
                }
              } else {
                s4 = peg$FAILED;
              }
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        }
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = input.charAt(peg$currPos);
      if (peg$r5.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e18);
        }
      }
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e12);
      }
    }
    return s0;
  }
  function peg$parsesuffixAnnotation() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r6.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e20);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      if (s1.length >= 2) {
        s2 = peg$FAILED;
      } else {
        s2 = input.charAt(peg$currPos);
        if (peg$r6.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e20);
          }
        }
      }
    }
    if (s1.length < 1) {
      peg$currPos = s0;
      s0 = peg$FAILED;
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e19);
      }
    }
    return s0;
  }
  function peg$parsenag() {
    var s0, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 36) {
      s2 = peg$c8;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e22);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$currPos;
      s4 = [];
      s5 = input.charAt(peg$currPos);
      if (peg$r2.test(s5)) {
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
      if (s5 !== peg$FAILED) {
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = input.charAt(peg$currPos);
          if (peg$r2.test(s5)) {
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e9);
            }
          }
        }
      } else {
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        s3 = input.substring(s3, peg$currPos);
      } else {
        s3 = s4;
      }
      if (s3 !== peg$FAILED) {
        s0 = peg$f6(s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e21);
      }
    }
    return s0;
  }
  function peg$parsecomment() {
    var s0;
    s0 = peg$parsebraceComment();
    if (s0 === peg$FAILED) {
      s0 = peg$parserestOfLineComment();
    }
    return s0;
  }
  function peg$parsebraceComment() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c9;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e24);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r7.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e25);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r7.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e25);
          }
        }
      }
      s2 = input.substring(s2, peg$currPos);
      if (input.charCodeAt(peg$currPos) === 125) {
        s3 = peg$c10;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e26);
        }
      }
      if (s3 !== peg$FAILED) {
        s0 = peg$f7(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e23);
      }
    }
    return s0;
  }
  function peg$parserestOfLineComment() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 59) {
      s1 = peg$c11;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e28);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r8.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e29);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r8.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e29);
          }
        }
      }
      s2 = input.substring(s2, peg$currPos);
      s0 = peg$f8(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e27);
      }
    }
    return s0;
  }
  function peg$parsevariation() {
    var s0, s2, s3, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c12;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e31);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseline();
      if (s3 !== peg$FAILED) {
        peg$parse_();
        if (input.charCodeAt(peg$currPos) === 41) {
          s5 = peg$c13;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e32);
          }
        }
        if (s5 !== peg$FAILED) {
          s0 = peg$f9(s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e30);
      }
    }
    return s0;
  }
  function peg$parsegameTerminationMarker() {
    var s0, s1, s3;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e34);
      }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e35);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c16) {
          s1 = peg$c16;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e36);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 42) {
            s1 = peg$c17;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e37);
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$parse_();
      s3 = peg$parsecomment();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s0 = peg$f10(s1, s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e33);
      }
    }
    return s0;
  }
  function peg$parse_() {
    var s0, s1;
    peg$silentFails++;
    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r9.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e39);
      }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = input.charAt(peg$currPos);
      if (peg$r9.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e39);
        }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) {
      peg$fail(peg$e38);
    }
    return s0;
  }
  peg$result = peg$startRuleFunction();
  if (options.peg$library) {
    return (
      /** @type {any} */
      {
        peg$result,
        peg$currPos,
        peg$FAILED,
        peg$maxFailExpected,
        peg$maxFailPos
      }
    );
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }
    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}
var MASK64 = 0xffffffffffffffffn;
function rotl(x2, k2) {
  return (x2 << k2 | x2 >> 64n - k2) & 0xffffffffffffffffn;
}
function wrappingMul(x2, y) {
  return x2 * y & MASK64;
}
function xoroshiro128(state) {
  return function() {
    let s0 = BigInt(state & MASK64);
    let s1 = BigInt(state >> 64n & MASK64);
    const result = wrappingMul(rotl(wrappingMul(s0, 5n), 7n), 9n);
    s1 ^= s0;
    s0 = (rotl(s0, 24n) ^ s1 ^ s1 << 16n) & MASK64;
    s1 = rotl(s1, 37n);
    state = s1 << 64n | s0;
    return result;
  };
}
var rand = xoroshiro128(0xa187eb39cdcaed8f31c4b365b102e01en);
var PIECE_KEYS = Array.from({ length: 2 }, () => Array.from({ length: 6 }, () => Array.from({ length: 128 }, () => rand())));
var EP_KEYS = Array.from({ length: 8 }, () => rand());
var CASTLING_KEYS = Array.from({ length: 16 }, () => rand());
var SIDE_KEY = rand();
var WHITE = "w";
var BLACK = "b";
var PAWN = "p";
var KNIGHT = "n";
var BISHOP = "b";
var ROOK = "r";
var QUEEN = "q";
var KING = "k";
var DEFAULT_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var Move = class {
  color;
  from;
  to;
  piece;
  captured;
  promotion;
  /**
   * @deprecated This field is deprecated and will be removed in version 2.0.0.
   * Please use move descriptor functions instead: `isCapture`, `isPromotion`,
   * `isEnPassant`, `isKingsideCastle`, `isQueensideCastle`, `isCastle`, and
   * `isBigPawn`
   */
  flags;
  san;
  lan;
  before;
  after;
  constructor(chess, internal) {
    const { color, piece, from, to, flags, captured, promotion } = internal;
    const fromAlgebraic = algebraic(from);
    const toAlgebraic = algebraic(to);
    this.color = color;
    this.piece = piece;
    this.from = fromAlgebraic;
    this.to = toAlgebraic;
    this.san = chess["_moveToSan"](internal, chess["_moves"]({ legal: true }));
    this.lan = fromAlgebraic + toAlgebraic;
    this.before = chess.fen();
    chess["_makeMove"](internal);
    this.after = chess.fen();
    chess["_undoMove"]();
    this.flags = "";
    for (const flag in BITS) {
      if (BITS[flag] & flags) {
        this.flags += FLAGS[flag];
      }
    }
    if (captured) {
      this.captured = captured;
    }
    if (promotion) {
      this.promotion = promotion;
      this.lan += promotion;
    }
  }
  isCapture() {
    return this.flags.indexOf(FLAGS["CAPTURE"]) > -1;
  }
  isPromotion() {
    return this.flags.indexOf(FLAGS["PROMOTION"]) > -1;
  }
  isEnPassant() {
    return this.flags.indexOf(FLAGS["EP_CAPTURE"]) > -1;
  }
  isKingsideCastle() {
    return this.flags.indexOf(FLAGS["KSIDE_CASTLE"]) > -1;
  }
  isQueensideCastle() {
    return this.flags.indexOf(FLAGS["QSIDE_CASTLE"]) > -1;
  }
  isBigPawn() {
    return this.flags.indexOf(FLAGS["BIG_PAWN"]) > -1;
  }
};
var EMPTY = -1;
var FLAGS = {
  NORMAL: "n",
  CAPTURE: "c",
  BIG_PAWN: "b",
  EP_CAPTURE: "e",
  PROMOTION: "p",
  KSIDE_CASTLE: "k",
  QSIDE_CASTLE: "q",
  NULL_MOVE: "-"
};
var BITS = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64,
  NULL_MOVE: 128
};
var SEVEN_TAG_ROSTER = {
  Event: "?",
  Site: "?",
  Date: "????.??.??",
  Round: "?",
  White: "?",
  Black: "?",
  Result: "*"
};
var SUPLEMENTAL_TAGS = {
  WhiteTitle: null,
  BlackTitle: null,
  WhiteElo: null,
  BlackElo: null,
  WhiteUSCF: null,
  BlackUSCF: null,
  WhiteNA: null,
  BlackNA: null,
  WhiteType: null,
  BlackType: null,
  EventDate: null,
  EventSponsor: null,
  Section: null,
  Stage: null,
  Board: null,
  Opening: null,
  Variation: null,
  SubVariation: null,
  ECO: null,
  NIC: null,
  Time: null,
  UTCTime: null,
  UTCDate: null,
  TimeControl: null,
  SetUp: null,
  FEN: null,
  Termination: null,
  Annotator: null,
  Mode: null,
  PlyCount: null
};
var HEADER_TEMPLATE = {
  ...SEVEN_TAG_ROSTER,
  ...SUPLEMENTAL_TAGS
};
var Ox88 = {
  a8: 0,
  b8: 1,
  c8: 2,
  d8: 3,
  e8: 4,
  f8: 5,
  g8: 6,
  h8: 7,
  a7: 16,
  b7: 17,
  c7: 18,
  d7: 19,
  e7: 20,
  f7: 21,
  g7: 22,
  h7: 23,
  a6: 32,
  b6: 33,
  c6: 34,
  d6: 35,
  e6: 36,
  f6: 37,
  g6: 38,
  h6: 39,
  a5: 48,
  b5: 49,
  c5: 50,
  d5: 51,
  e5: 52,
  f5: 53,
  g5: 54,
  h5: 55,
  a4: 64,
  b4: 65,
  c4: 66,
  d4: 67,
  e4: 68,
  f4: 69,
  g4: 70,
  h4: 71,
  a3: 80,
  b3: 81,
  c3: 82,
  d3: 83,
  e3: 84,
  f3: 85,
  g3: 86,
  h3: 87,
  a2: 96,
  b2: 97,
  c2: 98,
  d2: 99,
  e2: 100,
  f2: 101,
  g2: 102,
  h2: 103,
  a1: 112,
  b1: 113,
  c1: 114,
  d1: 115,
  e1: 116,
  f1: 117,
  g1: 118,
  h1: 119
};
var PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15]
};
var PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1]
};
var ATTACKS = [
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  24,
  24,
  24,
  24,
  56,
  0,
  56,
  24,
  24,
  24,
  24,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20
];
var RAYS = [
  17,
  0,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  16,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  16,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  16,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  -16,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  -16,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  -16,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  0,
  -17
];
var PIECE_MASKS = { p: 1, n: 2, b: 4, r: 8, q: 16, k: 32 };
var SYMBOLS = "pnbrqkPNBRQK";
var PROMOTIONS = [KNIGHT, BISHOP, ROOK, QUEEN];
var RANK_1 = 7;
var RANK_2 = 6;
var RANK_7 = 1;
var RANK_8 = 0;
var SIDES = {
  [KING]: BITS.KSIDE_CASTLE,
  [QUEEN]: BITS.QSIDE_CASTLE
};
var ROOKS = {
  w: [
    { square: Ox88.a1, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h1, flag: BITS.KSIDE_CASTLE }
  ],
  b: [
    { square: Ox88.a8, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h8, flag: BITS.KSIDE_CASTLE }
  ]
};
var SECOND_RANK = { b: RANK_7, w: RANK_2 };
var SAN_NULLMOVE = "--";
function rank(square) {
  return square >> 4;
}
function file(square) {
  return square & 15;
}
function isDigit(c) {
  return "0123456789".indexOf(c) !== -1;
}
function algebraic(square) {
  const f = file(square);
  const r = rank(square);
  return "abcdefgh".substring(f, f + 1) + "87654321".substring(r, r + 1);
}
function swapColor(color) {
  return color === WHITE ? BLACK : WHITE;
}
function validateFen(fen) {
  const tokens = fen.split(/\s+/);
  if (tokens.length !== 6) {
    return {
      ok: false,
      error: "Invalid FEN: must contain six space-delimited fields"
    };
  }
  const moveNumber = parseInt(tokens[5], 10);
  if (isNaN(moveNumber) || moveNumber <= 0) {
    return {
      ok: false,
      error: "Invalid FEN: move number must be a positive integer"
    };
  }
  const halfMoves = parseInt(tokens[4], 10);
  if (isNaN(halfMoves) || halfMoves < 0) {
    return {
      ok: false,
      error: "Invalid FEN: half move counter number must be a non-negative integer"
    };
  }
  if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
    return { ok: false, error: "Invalid FEN: en-passant square is invalid" };
  }
  if (/[^kKqQ-]/.test(tokens[2])) {
    return { ok: false, error: "Invalid FEN: castling availability is invalid" };
  }
  if (!/^(w|b)$/.test(tokens[1])) {
    return { ok: false, error: "Invalid FEN: side-to-move is invalid" };
  }
  const rows = tokens[0].split("/");
  if (rows.length !== 8) {
    return {
      ok: false,
      error: "Invalid FEN: piece data does not contain 8 '/'-delimited rows"
    };
  }
  for (let i = 0; i < rows.length; i++) {
    let sumFields = 0;
    let previousWasNumber = false;
    for (let k2 = 0; k2 < rows[i].length; k2++) {
      if (isDigit(rows[i][k2])) {
        if (previousWasNumber) {
          return {
            ok: false,
            error: "Invalid FEN: piece data is invalid (consecutive number)"
          };
        }
        sumFields += parseInt(rows[i][k2], 10);
        previousWasNumber = true;
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k2])) {
          return {
            ok: false,
            error: "Invalid FEN: piece data is invalid (invalid piece)"
          };
        }
        sumFields += 1;
        previousWasNumber = false;
      }
    }
    if (sumFields !== 8) {
      return {
        ok: false,
        error: "Invalid FEN: piece data is invalid (too many squares in rank)"
      };
    }
  }
  if (tokens[3][1] == "3" && tokens[1] == "w" || tokens[3][1] == "6" && tokens[1] == "b") {
    return { ok: false, error: "Invalid FEN: illegal en-passant square" };
  }
  const kings = [
    { color: "white", regex: /K/g },
    { color: "black", regex: /k/g }
  ];
  for (const { color, regex } of kings) {
    if (!regex.test(tokens[0])) {
      return { ok: false, error: `Invalid FEN: missing ${color} king` };
    }
    if ((tokens[0].match(regex) || []).length > 1) {
      return { ok: false, error: `Invalid FEN: too many ${color} kings` };
    }
  }
  if (Array.from(rows[0] + rows[7]).some((char) => char.toUpperCase() === "P")) {
    return {
      ok: false,
      error: "Invalid FEN: some pawns are on the edge rows"
    };
  }
  return { ok: true };
}
function getDisambiguator(move, moves) {
  const from = move.from;
  const to = move.to;
  const piece = move.piece;
  let ambiguities = 0;
  let sameRank = 0;
  let sameFile = 0;
  for (let i = 0, len = moves.length; i < len; i++) {
    const ambigFrom = moves[i].from;
    const ambigTo = moves[i].to;
    const ambigPiece = moves[i].piece;
    if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
      ambiguities++;
      if (rank(from) === rank(ambigFrom)) {
        sameRank++;
      }
      if (file(from) === file(ambigFrom)) {
        sameFile++;
      }
    }
  }
  if (ambiguities > 0) {
    if (sameRank > 0 && sameFile > 0) {
      return algebraic(from);
    } else if (sameFile > 0) {
      return algebraic(from).charAt(1);
    } else {
      return algebraic(from).charAt(0);
    }
  }
  return "";
}
function addMove(moves, color, from, to, piece, captured = void 0, flags = BITS.NORMAL) {
  const r = rank(to);
  if (piece === PAWN && (r === RANK_1 || r === RANK_8)) {
    for (let i = 0; i < PROMOTIONS.length; i++) {
      const promotion = PROMOTIONS[i];
      moves.push({
        color,
        from,
        to,
        piece,
        captured,
        promotion,
        flags: flags | BITS.PROMOTION
      });
    }
  } else {
    moves.push({
      color,
      from,
      to,
      piece,
      captured,
      flags
    });
  }
}
function inferPieceType(san) {
  let pieceType = san.charAt(0);
  if (pieceType >= "a" && pieceType <= "h") {
    const matches = san.match(/[a-h]\d.*[a-h]\d/);
    if (matches) {
      return void 0;
    }
    return PAWN;
  }
  pieceType = pieceType.toLowerCase();
  if (pieceType === "o") {
    return KING;
  }
  return pieceType;
}
function strippedSan(move) {
  return move.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
}
var Chess = class {
  _board = new Array(128);
  _turn = WHITE;
  _header = {};
  _kings = { w: EMPTY, b: EMPTY };
  _epSquare = -1;
  _halfMoves = 0;
  _moveNumber = 0;
  _history = [];
  _comments = {};
  _castling = { w: 0, b: 0 };
  _hash = 0n;
  // tracks number of times a position has been seen for repetition checking
  _positionCount = /* @__PURE__ */ new Map();
  constructor(fen = DEFAULT_POSITION, { skipValidation = false } = {}) {
    this.load(fen, { skipValidation });
  }
  clear({ preserveHeaders = false } = {}) {
    this._board = new Array(128);
    this._kings = { w: EMPTY, b: EMPTY };
    this._turn = WHITE;
    this._castling = { w: 0, b: 0 };
    this._epSquare = EMPTY;
    this._halfMoves = 0;
    this._moveNumber = 1;
    this._history = [];
    this._comments = {};
    this._header = preserveHeaders ? this._header : { ...HEADER_TEMPLATE };
    this._hash = this._computeHash();
    this._positionCount = /* @__PURE__ */ new Map();
    this._header["SetUp"] = null;
    this._header["FEN"] = null;
  }
  load(fen, { skipValidation = false, preserveHeaders = false } = {}) {
    let tokens = fen.split(/\s+/);
    if (tokens.length >= 2 && tokens.length < 6) {
      const adjustments = ["-", "-", "0", "1"];
      fen = tokens.concat(adjustments.slice(-(6 - tokens.length))).join(" ");
    }
    tokens = fen.split(/\s+/);
    if (!skipValidation) {
      const { ok, error } = validateFen(fen);
      if (!ok) {
        throw new Error(error);
      }
    }
    const position = tokens[0];
    let square = 0;
    this.clear({ preserveHeaders });
    for (let i = 0; i < position.length; i++) {
      const piece = position.charAt(i);
      if (piece === "/") {
        square += 8;
      } else if (isDigit(piece)) {
        square += parseInt(piece, 10);
      } else {
        const color = piece < "a" ? WHITE : BLACK;
        this._put({ type: piece.toLowerCase(), color }, algebraic(square));
        square++;
      }
    }
    this._turn = tokens[1];
    if (tokens[2].indexOf("K") > -1) {
      this._castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("Q") > -1) {
      this._castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf("k") > -1) {
      this._castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("q") > -1) {
      this._castling.b |= BITS.QSIDE_CASTLE;
    }
    this._epSquare = tokens[3] === "-" ? EMPTY : Ox88[tokens[3]];
    this._halfMoves = parseInt(tokens[4], 10);
    this._moveNumber = parseInt(tokens[5], 10);
    this._hash = this._computeHash();
    this._updateSetup(fen);
    this._incPositionCount();
  }
  fen({ forceEnpassantSquare = false } = {}) {
    let empty = 0;
    let fen = "";
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (this._board[i]) {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        const { color, type: piece } = this._board[i];
        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      } else {
        empty++;
      }
      if (i + 1 & 136) {
        if (empty > 0) {
          fen += empty;
        }
        if (i !== Ox88.h1) {
          fen += "/";
        }
        empty = 0;
        i += 8;
      }
    }
    let castling = "";
    if (this._castling[WHITE] & BITS.KSIDE_CASTLE) {
      castling += "K";
    }
    if (this._castling[WHITE] & BITS.QSIDE_CASTLE) {
      castling += "Q";
    }
    if (this._castling[BLACK] & BITS.KSIDE_CASTLE) {
      castling += "k";
    }
    if (this._castling[BLACK] & BITS.QSIDE_CASTLE) {
      castling += "q";
    }
    castling = castling || "-";
    let epSquare = "-";
    if (this._epSquare !== EMPTY) {
      if (forceEnpassantSquare) {
        epSquare = algebraic(this._epSquare);
      } else {
        const bigPawnSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
        const squares = [bigPawnSquare + 1, bigPawnSquare - 1];
        for (const square of squares) {
          if (square & 136) {
            continue;
          }
          const color = this._turn;
          if (this._board[square]?.color === color && this._board[square]?.type === PAWN) {
            this._makeMove({
              color,
              from: square,
              to: this._epSquare,
              piece: PAWN,
              captured: PAWN,
              flags: BITS.EP_CAPTURE
            });
            const isLegal = !this._isKingAttacked(color);
            this._undoMove();
            if (isLegal) {
              epSquare = algebraic(this._epSquare);
              break;
            }
          }
        }
      }
    }
    return [
      fen,
      this._turn,
      castling,
      epSquare,
      this._halfMoves,
      this._moveNumber
    ].join(" ");
  }
  _pieceKey(i) {
    if (!this._board[i]) {
      return 0n;
    }
    const { color, type } = this._board[i];
    const colorIndex = {
      w: 0,
      b: 1
    }[color];
    const typeIndex = {
      p: 0,
      n: 1,
      b: 2,
      r: 3,
      q: 4,
      k: 5
    }[type];
    return PIECE_KEYS[colorIndex][typeIndex][i];
  }
  _epKey() {
    return this._epSquare === EMPTY ? 0n : EP_KEYS[this._epSquare & 7];
  }
  _castlingKey() {
    const index = this._castling.w >> 5 | this._castling.b >> 3;
    return CASTLING_KEYS[index];
  }
  _computeHash() {
    let hash = 0n;
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (this._board[i]) {
        hash ^= this._pieceKey(i);
      }
    }
    hash ^= this._epKey();
    hash ^= this._castlingKey();
    if (this._turn === "b") {
      hash ^= SIDE_KEY;
    }
    return hash;
  }
  /*
   * Called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object. If the FEN
   * is equal to the default position, the SetUp and FEN are deleted the setup
   * is only updated if history.length is zero, ie moves haven't been made.
   */
  _updateSetup(fen) {
    if (this._history.length > 0)
      return;
    if (fen !== DEFAULT_POSITION) {
      this._header["SetUp"] = "1";
      this._header["FEN"] = fen;
    } else {
      this._header["SetUp"] = null;
      this._header["FEN"] = null;
    }
  }
  reset() {
    this.load(DEFAULT_POSITION);
  }
  get(square) {
    return this._board[Ox88[square]];
  }
  findPiece(piece) {
    const squares = [];
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (!this._board[i] || this._board[i]?.color !== piece.color) {
        continue;
      }
      if (this._board[i].color === piece.color && this._board[i].type === piece.type) {
        squares.push(algebraic(i));
      }
    }
    return squares;
  }
  put({ type, color }, square) {
    if (this._put({ type, color }, square)) {
      this._updateCastlingRights();
      this._updateEnPassantSquare();
      this._updateSetup(this.fen());
      return true;
    }
    return false;
  }
  _set(sq, piece) {
    this._hash ^= this._pieceKey(sq);
    this._board[sq] = piece;
    this._hash ^= this._pieceKey(sq);
  }
  _put({ type, color }, square) {
    if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
      return false;
    }
    if (!(square in Ox88)) {
      return false;
    }
    const sq = Ox88[square];
    if (type == KING && !(this._kings[color] == EMPTY || this._kings[color] == sq)) {
      return false;
    }
    const currentPieceOnSquare = this._board[sq];
    if (currentPieceOnSquare && currentPieceOnSquare.type === KING) {
      this._kings[currentPieceOnSquare.color] = EMPTY;
    }
    this._set(sq, { type, color });
    if (type === KING) {
      this._kings[color] = sq;
    }
    return true;
  }
  _clear(sq) {
    this._hash ^= this._pieceKey(sq);
    delete this._board[sq];
  }
  remove(square) {
    const piece = this.get(square);
    this._clear(Ox88[square]);
    if (piece && piece.type === KING) {
      this._kings[piece.color] = EMPTY;
    }
    this._updateCastlingRights();
    this._updateEnPassantSquare();
    this._updateSetup(this.fen());
    return piece;
  }
  _updateCastlingRights() {
    this._hash ^= this._castlingKey();
    const whiteKingInPlace = this._board[Ox88.e1]?.type === KING && this._board[Ox88.e1]?.color === WHITE;
    const blackKingInPlace = this._board[Ox88.e8]?.type === KING && this._board[Ox88.e8]?.color === BLACK;
    if (!whiteKingInPlace || this._board[Ox88.a1]?.type !== ROOK || this._board[Ox88.a1]?.color !== WHITE) {
      this._castling.w &= -65;
    }
    if (!whiteKingInPlace || this._board[Ox88.h1]?.type !== ROOK || this._board[Ox88.h1]?.color !== WHITE) {
      this._castling.w &= -33;
    }
    if (!blackKingInPlace || this._board[Ox88.a8]?.type !== ROOK || this._board[Ox88.a8]?.color !== BLACK) {
      this._castling.b &= -65;
    }
    if (!blackKingInPlace || this._board[Ox88.h8]?.type !== ROOK || this._board[Ox88.h8]?.color !== BLACK) {
      this._castling.b &= -33;
    }
    this._hash ^= this._castlingKey();
  }
  _updateEnPassantSquare() {
    if (this._epSquare === EMPTY) {
      return;
    }
    const startSquare = this._epSquare + (this._turn === WHITE ? -16 : 16);
    const currentSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
    const attackers = [currentSquare + 1, currentSquare - 1];
    if (this._board[startSquare] !== null || this._board[this._epSquare] !== null || this._board[currentSquare]?.color !== swapColor(this._turn) || this._board[currentSquare]?.type !== PAWN) {
      this._hash ^= this._epKey();
      this._epSquare = EMPTY;
      return;
    }
    const canCapture = (square) => !(square & 136) && this._board[square]?.color === this._turn && this._board[square]?.type === PAWN;
    if (!attackers.some(canCapture)) {
      this._hash ^= this._epKey();
      this._epSquare = EMPTY;
    }
  }
  _attacked(color, square, verbose) {
    const attackers = [];
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (this._board[i] === void 0 || this._board[i].color !== color) {
        continue;
      }
      const piece = this._board[i];
      const difference = i - square;
      if (difference === 0) {
        continue;
      }
      const index = difference + 119;
      if (ATTACKS[index] & PIECE_MASKS[piece.type]) {
        if (piece.type === PAWN) {
          if (difference > 0 && piece.color === WHITE || difference <= 0 && piece.color === BLACK) {
            if (!verbose) {
              return true;
            } else {
              attackers.push(algebraic(i));
            }
          }
          continue;
        }
        if (piece.type === "n" || piece.type === "k") {
          if (!verbose) {
            return true;
          } else {
            attackers.push(algebraic(i));
            continue;
          }
        }
        const offset = RAYS[index];
        let j = i + offset;
        let blocked = false;
        while (j !== square) {
          if (this._board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }
        if (!blocked) {
          if (!verbose) {
            return true;
          } else {
            attackers.push(algebraic(i));
            continue;
          }
        }
      }
    }
    if (verbose) {
      return attackers;
    } else {
      return false;
    }
  }
  attackers(square, attackedBy) {
    if (!attackedBy) {
      return this._attacked(this._turn, Ox88[square], true);
    } else {
      return this._attacked(attackedBy, Ox88[square], true);
    }
  }
  _isKingAttacked(color) {
    const square = this._kings[color];
    return square === -1 ? false : this._attacked(swapColor(color), square);
  }
  hash() {
    return this._hash.toString(16);
  }
  isAttacked(square, attackedBy) {
    return this._attacked(attackedBy, Ox88[square]);
  }
  isCheck() {
    return this._isKingAttacked(this._turn);
  }
  inCheck() {
    return this.isCheck();
  }
  isCheckmate() {
    return this.isCheck() && this._moves().length === 0;
  }
  isStalemate() {
    return !this.isCheck() && this._moves().length === 0;
  }
  isInsufficientMaterial() {
    const pieces = {
      b: 0,
      n: 0,
      r: 0,
      q: 0,
      k: 0,
      p: 0
    };
    const bishops = [];
    let numPieces = 0;
    let squareColor = 0;
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      squareColor = (squareColor + 1) % 2;
      if (i & 136) {
        i += 7;
        continue;
      }
      const piece = this._board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(squareColor);
        }
        numPieces++;
      }
    }
    if (numPieces === 2) {
      return true;
    } else if (
      // k vs. kn .... or .... k vs. kb
      numPieces === 3 && (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true;
    } else if (numPieces === pieces[BISHOP] + 2) {
      let sum = 0;
      const len = bishops.length;
      for (let i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }
    return false;
  }
  isThreefoldRepetition() {
    return this._getPositionCount(this._hash) >= 3;
  }
  isDrawByFiftyMoves() {
    return this._halfMoves >= 100;
  }
  isDraw() {
    return this.isDrawByFiftyMoves() || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
  }
  isGameOver() {
    return this.isCheckmate() || this.isDraw();
  }
  moves({ verbose = false, square = void 0, piece = void 0 } = {}) {
    const moves = this._moves({ square, piece });
    if (verbose) {
      return moves.map((move) => new Move(this, move));
    } else {
      return moves.map((move) => this._moveToSan(move, moves));
    }
  }
  _moves({ legal = true, piece = void 0, square = void 0 } = {}) {
    const forSquare = square ? square.toLowerCase() : void 0;
    const forPiece = piece?.toLowerCase();
    const moves = [];
    const us = this._turn;
    const them = swapColor(us);
    let firstSquare = Ox88.a8;
    let lastSquare = Ox88.h1;
    let singleSquare = false;
    if (forSquare) {
      if (!(forSquare in Ox88)) {
        return [];
      } else {
        firstSquare = lastSquare = Ox88[forSquare];
        singleSquare = true;
      }
    }
    for (let from = firstSquare; from <= lastSquare; from++) {
      if (from & 136) {
        from += 7;
        continue;
      }
      if (!this._board[from] || this._board[from].color === them) {
        continue;
      }
      const { type } = this._board[from];
      let to;
      if (type === PAWN) {
        if (forPiece && forPiece !== type)
          continue;
        to = from + PAWN_OFFSETS[us][0];
        if (!this._board[to]) {
          addMove(moves, us, from, to, PAWN);
          to = from + PAWN_OFFSETS[us][1];
          if (SECOND_RANK[us] === rank(from) && !this._board[to]) {
            addMove(moves, us, from, to, PAWN, void 0, BITS.BIG_PAWN);
          }
        }
        for (let j = 2; j < 4; j++) {
          to = from + PAWN_OFFSETS[us][j];
          if (to & 136)
            continue;
          if (this._board[to]?.color === them) {
            addMove(moves, us, from, to, PAWN, this._board[to].type, BITS.CAPTURE);
          } else if (to === this._epSquare) {
            addMove(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE);
          }
        }
      } else {
        if (forPiece && forPiece !== type)
          continue;
        for (let j = 0, len = PIECE_OFFSETS[type].length; j < len; j++) {
          const offset = PIECE_OFFSETS[type][j];
          to = from;
          while (true) {
            to += offset;
            if (to & 136)
              break;
            if (!this._board[to]) {
              addMove(moves, us, from, to, type);
            } else {
              if (this._board[to].color === us)
                break;
              addMove(moves, us, from, to, type, this._board[to].type, BITS.CAPTURE);
              break;
            }
            if (type === KNIGHT || type === KING)
              break;
          }
        }
      }
    }
    if (forPiece === void 0 || forPiece === KING) {
      if (!singleSquare || lastSquare === this._kings[us]) {
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom + 2;
          if (!this._board[castlingFrom + 1] && !this._board[castlingTo] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom + 1) && !this._attacked(them, castlingTo)) {
            addMove(moves, us, this._kings[us], castlingTo, KING, void 0, BITS.KSIDE_CASTLE);
          }
        }
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom - 2;
          if (!this._board[castlingFrom - 1] && !this._board[castlingFrom - 2] && !this._board[castlingFrom - 3] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom - 1) && !this._attacked(them, castlingTo)) {
            addMove(moves, us, this._kings[us], castlingTo, KING, void 0, BITS.QSIDE_CASTLE);
          }
        }
      }
    }
    if (!legal || this._kings[us] === -1) {
      return moves;
    }
    const legalMoves = [];
    for (let i = 0, len = moves.length; i < len; i++) {
      this._makeMove(moves[i]);
      if (!this._isKingAttacked(us)) {
        legalMoves.push(moves[i]);
      }
      this._undoMove();
    }
    return legalMoves;
  }
  move(move, { strict = false } = {}) {
    let moveObj = null;
    if (typeof move === "string") {
      moveObj = this._moveFromSan(move, strict);
    } else if (move === null) {
      moveObj = this._moveFromSan(SAN_NULLMOVE, strict);
    } else if (typeof move === "object") {
      const moves = this._moves();
      for (let i = 0, len = moves.length; i < len; i++) {
        if (move.from === algebraic(moves[i].from) && move.to === algebraic(moves[i].to) && (!("promotion" in moves[i]) || move.promotion === moves[i].promotion)) {
          moveObj = moves[i];
          break;
        }
      }
    }
    if (!moveObj) {
      if (typeof move === "string") {
        throw new Error(`Invalid move: ${move}`);
      } else {
        throw new Error(`Invalid move: ${JSON.stringify(move)}`);
      }
    }
    if (this.isCheck() && moveObj.flags & BITS.NULL_MOVE) {
      throw new Error("Null move not allowed when in check");
    }
    const prettyMove = new Move(this, moveObj);
    this._makeMove(moveObj);
    this._incPositionCount();
    return prettyMove;
  }
  _push(move) {
    this._history.push({
      move,
      kings: { b: this._kings.b, w: this._kings.w },
      turn: this._turn,
      castling: { b: this._castling.b, w: this._castling.w },
      epSquare: this._epSquare,
      halfMoves: this._halfMoves,
      moveNumber: this._moveNumber
    });
  }
  _movePiece(from, to) {
    this._hash ^= this._pieceKey(from);
    this._board[to] = this._board[from];
    delete this._board[from];
    this._hash ^= this._pieceKey(to);
  }
  _makeMove(move) {
    const us = this._turn;
    const them = swapColor(us);
    this._push(move);
    if (move.flags & BITS.NULL_MOVE) {
      if (us === BLACK) {
        this._moveNumber++;
      }
      this._halfMoves++;
      this._turn = them;
      this._epSquare = EMPTY;
      return;
    }
    this._hash ^= this._epKey();
    this._hash ^= this._castlingKey();
    if (move.captured) {
      this._hash ^= this._pieceKey(move.to);
    }
    this._movePiece(move.from, move.to);
    if (move.flags & BITS.EP_CAPTURE) {
      if (this._turn === BLACK) {
        this._clear(move.to - 16);
      } else {
        this._clear(move.to + 16);
      }
    }
    if (move.promotion) {
      this._clear(move.to);
      this._set(move.to, { type: move.promotion, color: us });
    }
    if (this._board[move.to].type === KING) {
      this._kings[us] = move.to;
      if (move.flags & BITS.KSIDE_CASTLE) {
        const castlingTo = move.to - 1;
        const castlingFrom = move.to + 1;
        this._movePiece(castlingFrom, castlingTo);
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        const castlingTo = move.to + 1;
        const castlingFrom = move.to - 2;
        this._movePiece(castlingFrom, castlingTo);
      }
      this._castling[us] = 0;
    }
    if (this._castling[us]) {
      for (let i = 0, len = ROOKS[us].length; i < len; i++) {
        if (move.from === ROOKS[us][i].square && this._castling[us] & ROOKS[us][i].flag) {
          this._castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }
    if (this._castling[them]) {
      for (let i = 0, len = ROOKS[them].length; i < len; i++) {
        if (move.to === ROOKS[them][i].square && this._castling[them] & ROOKS[them][i].flag) {
          this._castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }
    this._hash ^= this._castlingKey();
    if (move.flags & BITS.BIG_PAWN) {
      let epSquare;
      if (us === BLACK) {
        epSquare = move.to - 16;
      } else {
        epSquare = move.to + 16;
      }
      if (!(move.to - 1 & 136) && this._board[move.to - 1]?.type === PAWN && this._board[move.to - 1]?.color === them || !(move.to + 1 & 136) && this._board[move.to + 1]?.type === PAWN && this._board[move.to + 1]?.color === them) {
        this._epSquare = epSquare;
        this._hash ^= this._epKey();
      } else {
        this._epSquare = EMPTY;
      }
    } else {
      this._epSquare = EMPTY;
    }
    if (move.piece === PAWN) {
      this._halfMoves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._halfMoves = 0;
    } else {
      this._halfMoves++;
    }
    if (us === BLACK) {
      this._moveNumber++;
    }
    this._turn = them;
    this._hash ^= SIDE_KEY;
  }
  undo() {
    const hash = this._hash;
    const move = this._undoMove();
    if (move) {
      const prettyMove = new Move(this, move);
      this._decPositionCount(hash);
      return prettyMove;
    }
    return null;
  }
  _undoMove() {
    const old = this._history.pop();
    if (old === void 0) {
      return null;
    }
    this._hash ^= this._epKey();
    this._hash ^= this._castlingKey();
    const move = old.move;
    this._kings = old.kings;
    this._turn = old.turn;
    this._castling = old.castling;
    this._epSquare = old.epSquare;
    this._halfMoves = old.halfMoves;
    this._moveNumber = old.moveNumber;
    this._hash ^= this._epKey();
    this._hash ^= this._castlingKey();
    this._hash ^= SIDE_KEY;
    const us = this._turn;
    const them = swapColor(us);
    if (move.flags & BITS.NULL_MOVE) {
      return move;
    }
    this._movePiece(move.to, move.from);
    if (move.piece) {
      this._clear(move.from);
      this._set(move.from, { type: move.piece, color: us });
    }
    if (move.captured) {
      if (move.flags & BITS.EP_CAPTURE) {
        let index;
        if (us === BLACK) {
          index = move.to - 16;
        } else {
          index = move.to + 16;
        }
        this._set(index, { type: PAWN, color: them });
      } else {
        this._set(move.to, { type: move.captured, color: them });
      }
    }
    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      let castlingTo, castlingFrom;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castlingTo = move.to + 1;
        castlingFrom = move.to - 1;
      } else {
        castlingTo = move.to - 2;
        castlingFrom = move.to + 1;
      }
      this._movePiece(castlingFrom, castlingTo);
    }
    return move;
  }
  pgn({ newline = "\n", maxWidth = 0 } = {}) {
    const result = [];
    let headerExists = false;
    for (const i in this._header) {
      const headerTag = this._header[i];
      if (headerTag)
        result.push(`[${i} "${this._header[i]}"]` + newline);
      headerExists = true;
    }
    if (headerExists && this._history.length) {
      result.push(newline);
    }
    const appendComment = (moveString2) => {
      const comment = this._comments[this.fen()];
      if (typeof comment !== "undefined") {
        const delimiter = moveString2.length > 0 ? " " : "";
        moveString2 = `${moveString2}${delimiter}{${comment}}`;
      }
      return moveString2;
    };
    const reversedHistory = [];
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    const moves = [];
    let moveString = "";
    if (reversedHistory.length === 0) {
      moves.push(appendComment(""));
    }
    while (reversedHistory.length > 0) {
      moveString = appendComment(moveString);
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      if (!this._history.length && move.color === "b") {
        const prefix = `${this._moveNumber}. ...`;
        moveString = moveString ? `${moveString} ${prefix}` : prefix;
      } else if (move.color === "w") {
        if (moveString.length) {
          moves.push(moveString);
        }
        moveString = this._moveNumber + ".";
      }
      moveString = moveString + " " + this._moveToSan(move, this._moves({ legal: true }));
      this._makeMove(move);
    }
    if (moveString.length) {
      moves.push(appendComment(moveString));
    }
    moves.push(this._header.Result || "*");
    if (maxWidth === 0) {
      return result.join("") + moves.join(" ");
    }
    const strip = function() {
      if (result.length > 0 && result[result.length - 1] === " ") {
        result.pop();
        return true;
      }
      return false;
    };
    const wrapComment = function(width, move) {
      for (const token of move.split(" ")) {
        if (!token) {
          continue;
        }
        if (width + token.length > maxWidth) {
          while (strip()) {
            width--;
          }
          result.push(newline);
          width = 0;
        }
        result.push(token);
        width += token.length;
        result.push(" ");
        width++;
      }
      if (strip()) {
        width--;
      }
      return width;
    };
    let currentWidth = 0;
    for (let i = 0; i < moves.length; i++) {
      if (currentWidth + moves[i].length > maxWidth) {
        if (moves[i].includes("{")) {
          currentWidth = wrapComment(currentWidth, moves[i]);
          continue;
        }
      }
      if (currentWidth + moves[i].length > maxWidth && i !== 0) {
        if (result[result.length - 1] === " ") {
          result.pop();
        }
        result.push(newline);
        currentWidth = 0;
      } else if (i !== 0) {
        result.push(" ");
        currentWidth++;
      }
      result.push(moves[i]);
      currentWidth += moves[i].length;
    }
    return result.join("");
  }
  /**
   * @deprecated Use `setHeader` and `getHeaders` instead. This method will return null header tags (which is not what you want)
   */
  header(...args) {
    for (let i = 0; i < args.length; i += 2) {
      if (typeof args[i] === "string" && typeof args[i + 1] === "string") {
        this._header[args[i]] = args[i + 1];
      }
    }
    return this._header;
  }
  // TODO: value validation per spec
  setHeader(key, value) {
    this._header[key] = value ?? SEVEN_TAG_ROSTER[key] ?? null;
    return this.getHeaders();
  }
  removeHeader(key) {
    if (key in this._header) {
      this._header[key] = SEVEN_TAG_ROSTER[key] || null;
      return true;
    }
    return false;
  }
  // return only non-null headers (omit placemarker nulls)
  getHeaders() {
    const nonNullHeaders = {};
    for (const [key, value] of Object.entries(this._header)) {
      if (value !== null) {
        nonNullHeaders[key] = value;
      }
    }
    return nonNullHeaders;
  }
  loadPgn(pgn2, { strict = false, newlineChar = "\r?\n" } = {}) {
    if (newlineChar !== "\r?\n") {
      pgn2 = pgn2.replace(new RegExp(newlineChar, "g"), "\n");
    }
    const parsedPgn = peg$parse(pgn2);
    this.reset();
    const headers = parsedPgn.headers;
    let fen = "";
    for (const key in headers) {
      if (key.toLowerCase() === "fen") {
        fen = headers[key];
      }
      this.header(key, headers[key]);
    }
    if (!strict) {
      if (fen) {
        this.load(fen, { preserveHeaders: true });
      }
    } else {
      if (headers["SetUp"] === "1") {
        if (!("FEN" in headers)) {
          throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");
        }
        this.load(headers["FEN"], { preserveHeaders: true });
      }
    }
    let node2 = parsedPgn.root;
    while (node2) {
      if (node2.move) {
        const move = this._moveFromSan(node2.move, strict);
        if (move == null) {
          throw new Error(`Invalid move in PGN: ${node2.move}`);
        } else {
          this._makeMove(move);
          this._incPositionCount();
        }
      }
      if (node2.comment !== void 0) {
        this._comments[this.fen()] = node2.comment;
      }
      node2 = node2.variations[0];
    }
    const result = parsedPgn.result;
    if (result && Object.keys(this._header).length && this._header["Result"] !== result) {
      this.setHeader("Result", result);
    }
  }
  /*
   * Convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} strict Use the strict SAN parser. It will throw errors
   * on overly disambiguated moves (see below):
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  _moveToSan(move, moves) {
    let output = "";
    if (move.flags & BITS.KSIDE_CASTLE) {
      output = "O-O";
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = "O-O-O";
    } else if (move.flags & BITS.NULL_MOVE) {
      return SAN_NULLMOVE;
    } else {
      if (move.piece !== PAWN) {
        const disambiguator = getDisambiguator(move, moves);
        output += move.piece.toUpperCase() + disambiguator;
      }
      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += "x";
      }
      output += algebraic(move.to);
      if (move.promotion) {
        output += "=" + move.promotion.toUpperCase();
      }
    }
    this._makeMove(move);
    if (this.isCheck()) {
      if (this.isCheckmate()) {
        output += "#";
      } else {
        output += "+";
      }
    }
    this._undoMove();
    return output;
  }
  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  _moveFromSan(move, strict = false) {
    let cleanMove = strippedSan(move);
    if (!strict) {
      if (cleanMove === "0-0") {
        cleanMove = "O-O";
      } else if (cleanMove === "0-0-0") {
        cleanMove = "O-O-O";
      }
    }
    if (cleanMove == SAN_NULLMOVE) {
      const res = {
        color: this._turn,
        from: 0,
        to: 0,
        piece: "k",
        flags: BITS.NULL_MOVE
      };
      return res;
    }
    let pieceType = inferPieceType(cleanMove);
    let moves = this._moves({ legal: true, piece: pieceType });
    for (let i = 0, len = moves.length; i < len; i++) {
      if (cleanMove === strippedSan(this._moveToSan(moves[i], moves))) {
        return moves[i];
      }
    }
    if (strict) {
      return null;
    }
    let piece = void 0;
    let matches = void 0;
    let from = void 0;
    let to = void 0;
    let promotion = void 0;
    let overlyDisambiguated = false;
    matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
    if (matches) {
      piece = matches[1];
      from = matches[2];
      to = matches[3];
      promotion = matches[4];
      if (from.length == 1) {
        overlyDisambiguated = true;
      }
    } else {
      matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
      if (matches) {
        piece = matches[1];
        from = matches[2];
        to = matches[3];
        promotion = matches[4];
        if (from.length == 1) {
          overlyDisambiguated = true;
        }
      }
    }
    pieceType = inferPieceType(cleanMove);
    moves = this._moves({
      legal: true,
      piece: piece ? piece : pieceType
    });
    if (!to) {
      return null;
    }
    for (let i = 0, len = moves.length; i < len; i++) {
      if (!from) {
        if (cleanMove === strippedSan(this._moveToSan(moves[i], moves)).replace("x", "")) {
          return moves[i];
        }
      } else if ((!piece || piece.toLowerCase() == moves[i].piece) && Ox88[from] == moves[i].from && Ox88[to] == moves[i].to && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
        return moves[i];
      } else if (overlyDisambiguated) {
        const square = algebraic(moves[i].from);
        if ((!piece || piece.toLowerCase() == moves[i].piece) && Ox88[to] == moves[i].to && (from == square[0] || from == square[1]) && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
          return moves[i];
        }
      }
    }
    return null;
  }
  ascii() {
    let s = "   +------------------------+\n";
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (file(i) === 0) {
        s += " " + "87654321"[rank(i)] + " |";
      }
      if (this._board[i]) {
        const piece = this._board[i].type;
        const color = this._board[i].color;
        const symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
        s += " " + symbol + " ";
      } else {
        s += " . ";
      }
      if (i + 1 & 136) {
        s += "|\n";
        i += 8;
      }
    }
    s += "   +------------------------+\n";
    s += "     a  b  c  d  e  f  g  h";
    return s;
  }
  perft(depth) {
    const moves = this._moves({ legal: false });
    let nodes = 0;
    const color = this._turn;
    for (let i = 0, len = moves.length; i < len; i++) {
      this._makeMove(moves[i]);
      if (!this._isKingAttacked(color)) {
        if (depth - 1 > 0) {
          nodes += this.perft(depth - 1);
        } else {
          nodes++;
        }
      }
      this._undoMove();
    }
    return nodes;
  }
  setTurn(color) {
    if (this._turn == color) {
      return false;
    }
    this.move("--");
    return true;
  }
  turn() {
    return this._turn;
  }
  board() {
    const output = [];
    let row = [];
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (this._board[i] == null) {
        row.push(null);
      } else {
        row.push({
          square: algebraic(i),
          type: this._board[i].type,
          color: this._board[i].color
        });
      }
      if (i + 1 & 136) {
        output.push(row);
        row = [];
        i += 8;
      }
    }
    return output;
  }
  squareColor(square) {
    if (square in Ox88) {
      const sq = Ox88[square];
      return (rank(sq) + file(sq)) % 2 === 0 ? "light" : "dark";
    }
    return null;
  }
  history({ verbose = false } = {}) {
    const reversedHistory = [];
    const moveHistory = [];
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    while (true) {
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      if (verbose) {
        moveHistory.push(new Move(this, move));
      } else {
        moveHistory.push(this._moveToSan(move, this._moves()));
      }
      this._makeMove(move);
    }
    return moveHistory;
  }
  /*
   * Keeps track of position occurrence counts for the purpose of repetition
   * checking. Old positions are removed from the map if their counts are reduced to 0.
   */
  _getPositionCount(hash) {
    return this._positionCount.get(hash) ?? 0;
  }
  _incPositionCount() {
    this._positionCount.set(this._hash, (this._positionCount.get(this._hash) ?? 0) + 1);
  }
  _decPositionCount(hash) {
    const currentCount = this._positionCount.get(hash) ?? 0;
    if (currentCount === 1) {
      this._positionCount.delete(hash);
    } else {
      this._positionCount.set(hash, currentCount - 1);
    }
  }
  _pruneComments() {
    const reversedHistory = [];
    const currentComments = {};
    const copyComment = (fen) => {
      if (fen in this._comments) {
        currentComments[fen] = this._comments[fen];
      }
    };
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    copyComment(this.fen());
    while (true) {
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      this._makeMove(move);
      copyComment(this.fen());
    }
    this._comments = currentComments;
  }
  getComment() {
    return this._comments[this.fen()];
  }
  setComment(comment) {
    this._comments[this.fen()] = comment.replace("{", "[").replace("}", "]");
  }
  /**
   * @deprecated Renamed to `removeComment` for consistency
   */
  deleteComment() {
    return this.removeComment();
  }
  removeComment() {
    const comment = this._comments[this.fen()];
    delete this._comments[this.fen()];
    return comment;
  }
  getComments() {
    this._pruneComments();
    return Object.keys(this._comments).map((fen) => {
      return { fen, comment: this._comments[fen] };
    });
  }
  /**
   * @deprecated Renamed to `removeComments` for consistency
   */
  deleteComments() {
    return this.removeComments();
  }
  removeComments() {
    this._pruneComments();
    return Object.keys(this._comments).map((fen) => {
      const comment = this._comments[fen];
      delete this._comments[fen];
      return { fen, comment };
    });
  }
  setCastlingRights(color, rights) {
    for (const side of [KING, QUEEN]) {
      if (rights[side] !== void 0) {
        if (rights[side]) {
          this._castling[color] |= SIDES[side];
        } else {
          this._castling[color] &= ~SIDES[side];
        }
      }
    }
    this._updateCastlingRights();
    const result = this.getCastlingRights(color);
    return (rights[KING] === void 0 || rights[KING] === result[KING]) && (rights[QUEEN] === void 0 || rights[QUEEN] === result[QUEEN]);
  }
  getCastlingRights(color) {
    return {
      [KING]: (this._castling[color] & SIDES[KING]) !== 0,
      [QUEEN]: (this._castling[color] & SIDES[QUEEN]) !== 0
    };
  }
  moveNumber() {
    return this._moveNumber;
  }
};

// node_modules/maia3-js/dist/web/encoding.js
var SEQ_LEN = 64;
var PIECE_DIMS = 12;
var HISTORY = 8;
var FEATURE_DIM = HISTORY * PIECE_DIMS;
var TOKENS_PER_BOARD = SEQ_LEN * PIECE_DIMS;
var TOKENS_PER_POSITION = SEQ_LEN * FEATURE_DIM;
var PIECE_CHANNEL = {
  p: 0,
  n: 1,
  b: 2,
  r: 3,
  q: 4,
  k: 5
};
function mirrorBoard(chess) {
  const board = chess.board();
  const fen = chess.fen();
  const parts = fen.split(" ");
  let mirroredFen = "";
  for (let rank2 = 7; rank2 >= 0; rank2--) {
    let empty = 0;
    for (let file2 = 0; file2 < 8; file2++) {
      const piece = board[rank2][file2];
      if (piece) {
        if (empty > 0) {
          mirroredFen += empty;
          empty = 0;
        }
        mirroredFen += piece.color === "w" ? piece.type.toLowerCase() : piece.type.toUpperCase();
      } else {
        empty++;
      }
    }
    if (empty > 0)
      mirroredFen += empty;
    if (rank2 > 0)
      mirroredFen += "/";
  }
  const turn = parts[1] === "w" ? "b" : "w";
  let castling = parts[2];
  if (castling !== "-") {
    let nc = "";
    if (castling.includes("k"))
      nc += "K";
    if (castling.includes("q"))
      nc += "Q";
    if (castling.includes("K"))
      nc += "k";
    if (castling.includes("Q"))
      nc += "q";
    castling = nc || "-";
  }
  let ep = parts[3];
  if (ep !== "-") {
    const file2 = ep[0];
    const rank2 = 9 - parseInt(ep[1], 10);
    ep = `${file2}${rank2}`;
  }
  return new Chess(`${mirroredFen} ${turn} ${castling} ${ep} ${parts[4]} ${parts[5]}`);
}
function tokenizeBoard(chess) {
  const board = chess.turn() === "b" ? mirrorBoard(chess) : chess;
  const tokens = new Float32Array(TOKENS_PER_BOARD);
  const raw = board.board();
  for (let square = 0; square < SEQ_LEN; square++) {
    const rank2 = square >> 3;
    const file2 = square & 7;
    const piece = raw[7 - rank2][file2];
    if (!piece)
      continue;
    const colorOffset = piece.color === "w" ? 0 : 6;
    const channel = PIECE_CHANNEL[piece.type] + colorOffset;
    tokens[square * PIECE_DIMS + channel] = 1;
  }
  return tokens;
}
function buildHistoryTokens(boards) {
  if (boards.length === 0) {
    throw new Error("buildHistoryTokens requires at least one board");
  }
  if (boards.length > HISTORY) {
    boards = boards.slice(boards.length - HISTORY);
  }
  const perBoard = boards.map(tokenizeBoard);
  const padCount = HISTORY - perBoard.length;
  const earliest = perBoard[0];
  const slots = [];
  for (let i = 0; i < padCount; i++)
    slots.push(earliest);
  for (const t of perBoard)
    slots.push(t);
  const out = new Float32Array(TOKENS_PER_POSITION);
  for (let square = 0; square < SEQ_LEN; square++) {
    for (let slot = 0; slot < HISTORY; slot++) {
      const src = slots[slot];
      const srcOffset = square * PIECE_DIMS;
      const dstOffset = square * FEATURE_DIM + slot * PIECE_DIMS;
      for (let c = 0; c < PIECE_DIMS; c++) {
        out[dstOffset + c] = src[srcOffset + c];
      }
    }
  }
  return out;
}

// node_modules/maia3-js/dist/web/history.js
var STARTPOS_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
function resolveHistory(input) {
  if (input.priorFens && input.priorMoves) {
    throw new Error("resolveHistory: pass priorFens OR priorMoves, not both.");
  }
  const current = new Chess(input.fen);
  if (input.priorMoves && input.priorMoves.length > 0) {
    const base = input.baseFen ?? STARTPOS_FEN;
    const game = new Chess(base);
    const snapshots = [new Chess(game.fen())];
    for (const uci of input.priorMoves) {
      const result = game.move(uci, { strict: false });
      if (result === null) {
        throw new Error(`resolveHistory: priorMoves entry "${uci}" is not legal in position ${game.fen()}`);
      }
      snapshots.push(new Chess(game.fen()));
    }
    const finalFen = snapshots[snapshots.length - 1].fen();
    if (finalFen !== current.fen()) {
      snapshots.push(current);
    }
    return snapshots.length > 8 ? snapshots.slice(snapshots.length - 8) : snapshots;
  }
  if (input.priorFens && input.priorFens.length > 0) {
    const boards = input.priorFens.map((f) => new Chess(f));
    boards.push(current);
    return boards.length > 8 ? boards.slice(boards.length - 8) : boards;
  }
  return [current];
}

// node_modules/maia3-js/dist/web/moves.js
var FILES = "abcdefgh";
var PROMO_PIECES = ["q", "r", "b", "n"];
var NUM_FROM_TO_MOVES = 4096;
var NUM_PROMO_MOVES = 256;
var NUM_MOVES = NUM_FROM_TO_MOVES + NUM_PROMO_MOVES;
var _allMoves = null;
var _moveToIndex = null;
function generateAllMoves() {
  const moves = new Array(NUM_MOVES);
  let idx = 0;
  for (let rank2 = 0; rank2 < 8; rank2++) {
    for (let file2 = 0; file2 < 8; file2++) {
      const from = FILES[file2] + (rank2 + 1);
      for (let tRank = 0; tRank < 8; tRank++) {
        for (let tFile = 0; tFile < 8; tFile++) {
          const to = FILES[tFile] + (tRank + 1);
          moves[idx++] = from + to;
        }
      }
    }
  }
  for (let f = 0; f < 8; f++) {
    for (let t = 0; t < 8; t++) {
      for (const piece of PROMO_PIECES) {
        moves[idx++] = `${FILES[f]}7${FILES[t]}8${piece}`;
      }
    }
  }
  return moves;
}
function getAllMoves() {
  if (_allMoves === null) {
    _allMoves = generateAllMoves();
  }
  return _allMoves;
}
function getMoveToIndex() {
  if (_moveToIndex === null) {
    const all = getAllMoves();
    const m = /* @__PURE__ */ new Map();
    for (let i = 0; i < all.length; i++)
      m.set(all[i], i);
    _moveToIndex = m;
  }
  return _moveToIndex;
}

// node_modules/maia3-js/dist/web/model.js
var LOGITS_MOVE_DIM = 4352;
var LOGITS_VALUE_DIM = 3;

// node_modules/maia3-js/dist/web/infer-core.js
var DEFAULT_MAX_BATCH_SIZE = 64;
function validateBatch(tokens, selfElos, oppoElos) {
  if (selfElos.length !== tokens.length || oppoElos.length !== tokens.length) {
    throw new Error("inferBatch: tokens / selfElos / oppoElos length mismatch");
  }
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].length !== TOKENS_PER_POSITION) {
      throw new Error(`inferBatch: tokens[${i}] length ${tokens[i].length} \u2260 ${TOKENS_PER_POSITION}`);
    }
  }
}
function buildBatchFeeds(ort, tokens, selfElos, oppoElos) {
  const batchSize = tokens.length;
  let packed;
  if (batchSize === 1) {
    packed = tokens[0];
  } else {
    packed = new Float32Array(batchSize * TOKENS_PER_POSITION);
    for (let i = 0; i < batchSize; i++) {
      packed.set(tokens[i], i * TOKENS_PER_POSITION);
    }
  }
  const self2 = new BigInt64Array(batchSize);
  const oppo = new BigInt64Array(batchSize);
  for (let i = 0; i < batchSize; i++) {
    self2[i] = BigInt(Math.round(selfElos[i]));
    oppo[i] = BigInt(Math.round(oppoElos[i]));
  }
  return {
    tokens: new ort.Tensor("float32", packed, [batchSize, 64, 96]),
    self_elo: new ort.Tensor("int64", self2, [batchSize]),
    oppo_elo: new ort.Tensor("int64", oppo, [batchSize])
  };
}
function splitBatchOutputs(logitsMove, logitsValue, batchSize) {
  const expectedMove = batchSize * LOGITS_MOVE_DIM;
  const expectedValue = batchSize * LOGITS_VALUE_DIM;
  if (logitsMove.length < expectedMove || logitsValue.length < expectedValue) {
    throw new Error(`inferBatch: model returned ${logitsMove.length}/${logitsValue.length} logits for batch ${batchSize}, expected ${expectedMove}/${expectedValue}. The ONNX artifact may not support batching.`);
  }
  const out = new Array(batchSize);
  for (let i = 0; i < batchSize; i++) {
    out[i] = {
      logitsMove: logitsMove.slice(i * LOGITS_MOVE_DIM, (i + 1) * LOGITS_MOVE_DIM),
      logitsValue: logitsValue.slice(i * LOGITS_VALUE_DIM, (i + 1) * LOGITS_VALUE_DIM)
    };
  }
  return out;
}
function supportsDynamicBatch(session) {
  const metadata = session.outputMetadata;
  if (!metadata || metadata.length === 0)
    return true;
  for (const value of metadata) {
    const shape = value.shape;
    if (!shape || shape.length === 0)
      continue;
    if (typeof shape[0] === "number")
      return false;
  }
  return true;
}
var LEGACY_MODEL_WARNING = "maia3-js: this ONNX artifact was exported with a fixed batch size of 1, so batched inference is falling back to sequential runs. Delete your cached model directory to pick up the batch-enabled artifact.";
function* chunkRanges(total, size) {
  for (let start = 0; start < total; start += size) {
    yield [start, Math.min(start + size, total)];
  }
}

// node_modules/maia3-js/dist/web/scheduler.js
var DEFAULT_SCHEDULER_BATCH_SIZE = 32;
var BatchScheduler = class {
  inner;
  maxBatchSize;
  maxWaitMs;
  pending = [];
  timer = null;
  /** In-flight batched run, if any. Awaited by close(). */
  running = null;
  closed = false;
  constructor(inner, opts = {}) {
    this.inner = inner;
    this.maxBatchSize = Math.max(1, opts.maxBatchSize ?? DEFAULT_SCHEDULER_BATCH_SIZE);
    this.maxWaitMs = Math.max(0, opts.maxWaitMs ?? 0);
  }
  /** The model this scheduler wraps. */
  unwrap() {
    return this.inner;
  }
  async load() {
    return this.inner.load();
  }
  isLoaded() {
    return this.inner.isLoaded();
  }
  /** Queue a position; it resolves when its batch runs. */
  infer(tokens, selfElo, oppoElo) {
    if (this.closed) {
      return Promise.reject(new Error("BatchScheduler: closed."));
    }
    return new Promise((resolve, reject) => {
      this.pending.push({ tokens, selfElo, oppoElo, resolve, reject });
      this.schedule();
    });
  }
  /**
   * Pass straight through — the caller already has a full batch, so queuing
   * it would only add a tick of latency.
   */
  inferBatch(tokens, selfElos, oppoElos) {
    if (this.closed) {
      return Promise.reject(new Error("BatchScheduler: closed."));
    }
    return this.inner.inferBatch(tokens, selfElos, oppoElos);
  }
  schedule() {
    if (this.running)
      return;
    if (this.pending.length >= this.maxBatchSize) {
      this.clearTimer();
      void this.flush();
      return;
    }
    if (this.timer === null) {
      this.timer = setTimeout(() => {
        this.timer = null;
        void this.flush();
      }, this.maxWaitMs);
      this.timer.unref?.();
    }
  }
  flush() {
    if (this.running)
      return this.running;
    this.clearTimer();
    const batch = this.pending.splice(0, this.maxBatchSize);
    if (batch.length === 0)
      return Promise.resolve();
    const run = (async () => {
      try {
        const outputs = await this.inner.inferBatch(batch.map((c) => c.tokens), batch.map((c) => c.selfElo), batch.map((c) => c.oppoElo));
        for (let i = 0; i < batch.length; i++)
          batch[i].resolve(outputs[i]);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        for (const call of batch)
          call.reject(error);
      }
    })().finally(() => {
      this.running = null;
      if (this.pending.length > 0 && !this.closed)
        this.schedule();
    });
    this.running = run;
    return run;
  }
  clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  async close() {
    this.closed = true;
    this.clearTimer();
    if (this.running) {
      try {
        await this.running;
      } catch {
      }
    }
    const orphaned = this.pending;
    this.pending = [];
    for (const call of orphaned) {
      call.reject(new Error("BatchScheduler: closed before this call ran."));
    }
    await this.inner.close();
  }
};

// node_modules/maia3-js/dist/web/utils.js
function mirrorSquare(square) {
  const file2 = square[0];
  const rank2 = 9 - parseInt(square[1], 10);
  return `${file2}${rank2}`;
}
function mirrorMove(uci) {
  const from = mirrorSquare(uci.slice(0, 2));
  const to = mirrorSquare(uci.slice(2, 4));
  return from + to + uci.slice(4);
}
function softmax(logits, mask) {
  const n = logits.length;
  const out = new Array(n).fill(0);
  let max = -Infinity;
  for (let i = 0; i < n; i++) {
    if (mask && !mask[i])
      continue;
    const v = logits[i];
    if (v > max)
      max = v;
  }
  if (!Number.isFinite(max))
    return out;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    if (mask && !mask[i])
      continue;
    const e = Math.exp(logits[i] - max);
    out[i] = e;
    sum += e;
  }
  if (sum > 0) {
    for (let i = 0; i < n; i++)
      out[i] /= sum;
  }
  return out;
}
function softmax3(logits) {
  if (logits.length !== 3) {
    throw new Error(`softmax3 requires 3 logits, got ${logits.length}`);
  }
  const m = Math.max(logits[0], logits[1], logits[2]);
  const a = Math.exp(logits[0] - m);
  const b = Math.exp(logits[1] - m);
  const c = Math.exp(logits[2] - m);
  const s = a + b + c;
  return [a / s, b / s, c / s];
}
function wdlFromValueLogits(logits) {
  const [loss, draw, win] = softmax3(logits);
  return { win, draw, loss };
}
function winProbabilityFromWdl(wdl) {
  return wdl.win + 0.5 * wdl.draw;
}
function sampleIndex(probs, topP2, rand2 = Math.random) {
  const n = probs.length;
  if (n === 0)
    throw new Error("sampleIndex called with empty distribution");
  const order = new Array(n);
  for (let i = 0; i < n; i++)
    order[i] = i;
  order.sort((a, b) => probs[b] - probs[a]);
  let kept = 1;
  let cum = probs[order[0]];
  while (kept < n && cum < topP2) {
    cum += probs[order[kept]];
    kept++;
  }
  const r = rand2() * cum;
  let acc = 0;
  for (let k2 = 0; k2 < kept; k2++) {
    acc += probs[order[k2]];
    if (r <= acc)
      return order[k2];
  }
  return order[kept - 1];
}
function argmax(arr) {
  let best = 0;
  let bestVal = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > bestVal) {
      bestVal = arr[i];
      best = i;
    }
  }
  return best;
}
function clamp(x2, lo, hi) {
  return x2 < lo ? lo : x2 > hi ? hi : x2;
}

// node_modules/maia3-js/dist/web/variants.js
var HF_REPO_BASE = "https://huggingface.co/cemoss17/maia3-onnx/resolve/main";
var VARIANTS = {
  "5m": {
    alias: "5m",
    name: "maia3-5m",
    onnxFile: "maia3_5m.onnx",
    url: `${HF_REPO_BASE}/maia3_5m.onnx`,
    approxBytes: 25 * 1024 * 1024,
    bundled: true
  },
  "23m": {
    alias: "23m",
    name: "maia3-23m",
    onnxFile: "maia3_23m.onnx",
    url: `${HF_REPO_BASE}/maia3_23m.onnx`,
    approxBytes: 90 * 1024 * 1024,
    bundled: false
  },
  "79m": {
    alias: "79m",
    name: "maia3-79m",
    onnxFile: "maia3_79m.onnx",
    url: `${HF_REPO_BASE}/maia3_79m.onnx`,
    approxBytes: 310 * 1024 * 1024,
    bundled: false
  }
};
var DEFAULT_VARIANT = "5m";
function getVariant(alias) {
  const v = VARIANTS[alias];
  if (!v)
    throw new Error(`Unknown Maia3 variant: ${alias}`);
  return v;
}

// node_modules/maia3-js/dist/web/index.js
var DEFAULT_TEMPERATURE = 0;
var DEFAULT_TOP_P = 1;
var DEFAULT_TOP_K = 5;
var ELO_MIN = 0;
var ELO_MAX = 5e3;
var Maia3 = class {
  factory;
  /** What predict() talks to — the scheduler when autoBatch is on. */
  model = null;
  /** The underlying model, bypassing any scheduler. Used by predictBatch. */
  directModel = null;
  variant;
  defaults;
  autoBatch;
  constructor(factory, options = {}) {
    this.factory = factory;
    this.variant = options.variant ?? DEFAULT_VARIANT;
    this.defaults = {
      temperature: options.temperature ?? DEFAULT_TEMPERATURE,
      topP: options.topP ?? DEFAULT_TOP_P,
      topK: options.topK ?? DEFAULT_TOP_K
    };
    this.autoBatch = options.autoBatch === true ? {} : options.autoBatch === false || options.autoBatch === void 0 ? null : options.autoBatch;
  }
  async load() {
    if (this.model && this.model.isLoaded())
      return;
    if (!this.model) {
      this.directModel = await this.factory();
      this.model = this.autoBatch ? new BatchScheduler(this.directModel, this.autoBatch) : this.directModel;
    }
    await this.model.load();
  }
  isLoaded() {
    return this.model?.isLoaded() ?? false;
  }
  getVariant() {
    return this.variant;
  }
  async close() {
    if (this.model) {
      await this.model.close();
      this.model = null;
      this.directModel = null;
    }
  }
  async predict(input) {
    const model = this.requireModel("predict");
    const prepared = this.prepare(input, this.defaults.topK);
    const out = await model.infer(prepared.tokens, prepared.selfElo, prepared.oppoElo);
    const decoded = this.decode(prepared, out);
    const candidates = this.buildCandidates(prepared, decoded.ranked);
    const candidateOutputs = await model.inferBatch(candidates.tokens, candidates.selfElos, candidates.oppoElos);
    return this.assemble(decoded, candidates, candidateOutputs, 0);
  }
  async predictBatch(inputs, opts = {}) {
    const model = this.requireModel("predictBatch", true);
    if (inputs.length === 0)
      return [];
    const maxBatchSize = Math.max(1, opts.maxBatchSize ?? DEFAULT_MAX_BATCH_SIZE);
    const fallbackTopK = opts.topK ?? 0;
    const collectErrors = opts.onError === "collect";
    const results = new Array(inputs.length);
    for (let start = 0; start < inputs.length; start += maxBatchSize) {
      const end = Math.min(start + maxBatchSize, inputs.length);
      const prepared = new Array(end - start);
      for (let i = start; i < end; i++) {
        try {
          prepared[i - start] = this.prepare(inputs[i], fallbackTopK);
        } catch (err) {
          if (!collectErrors)
            throw err;
          prepared[i - start] = null;
          results[i] = err instanceof Error ? err : new Error(String(err));
        }
      }
      const live = [];
      for (let i = 0; i < prepared.length; i++) {
        const p = prepared[i];
        if (p)
          live.push({ index: start + i, prepared: p });
      }
      if (live.length === 0)
        continue;
      const outs = await model.inferBatch(live.map((l) => l.prepared.tokens), live.map((l) => l.prepared.selfElo), live.map((l) => l.prepared.oppoElo));
      const decoded = live.map((l, i) => this.decode(l.prepared, outs[i]));
      const flatTokens = [];
      const flatSelfElos = [];
      const flatOppoElos = [];
      const perPosition = live.map((l, i) => {
        const c = this.buildCandidates(l.prepared, decoded[i].ranked);
        const offset = flatTokens.length;
        flatTokens.push(...c.tokens);
        flatSelfElos.push(...c.selfElos);
        flatOppoElos.push(...c.oppoElos);
        return { candidates: c, offset };
      });
      const flatOutputs = flatTokens.length > 0 ? await model.inferBatch(flatTokens, flatSelfElos, flatOppoElos) : [];
      for (let i = 0; i < live.length; i++) {
        results[live[i].index] = this.assemble(decoded[i], perPosition[i].candidates, flatOutputs, perPosition[i].offset);
      }
    }
    return results;
  }
  /**
   * @param direct when true, return the underlying model rather than the
   *   auto-batch scheduler — for callers that already have a full batch.
   */
  requireModel(caller, direct = false) {
    if (!this.model || !this.model.isLoaded()) {
      throw new Error(`Maia3: call load() before ${caller}().`);
    }
    return direct ? this.directModel ?? this.model : this.model;
  }
  /**
   * Resolve inputs, tokenize, and compute the legal-move mask. Everything
   * that happens before the model sees the position.
   */
  prepare(input, fallbackTopK) {
    const temperature2 = input.temperature ?? this.defaults.temperature;
    const topP2 = input.topP ?? this.defaults.topP;
    const topK = input.topK ?? fallbackTopK;
    const selfElo = clamp(input.selfElo, ELO_MIN, ELO_MAX);
    const oppoElo = clamp(input.oppoElo ?? input.selfElo, ELO_MIN, ELO_MAX);
    const boards = resolveHistory(input);
    const current = boards[boards.length - 1];
    const mirrored = current.turn() === "b";
    const hasExplicitHistory = Array.isArray(input.priorFens) && input.priorFens.length > 0 || Array.isArray(input.priorMoves) && input.priorMoves.length > 0;
    const tokens = buildHistoryTokens(boards);
    if (tokens.length !== TOKENS_PER_POSITION) {
      throw new Error(`internal: token tensor wrong length (${tokens.length})`);
    }
    const moveToIndex = getMoveToIndex();
    const legal = current.moves({ verbose: true });
    const mask = new Uint8Array(NUM_MOVES);
    const legalEntries = [];
    for (const m of legal) {
      const promo = m.promotion ?? "";
      const uci = `${m.from}${m.to}${promo}`;
      const lookup = mirrored ? mirrorMove(uci) : uci;
      const idx = moveToIndex.get(lookup);
      if (idx === void 0)
        continue;
      mask[idx] = 1;
      legalEntries.push({ uci, lookup, index: idx });
    }
    if (legalEntries.length === 0) {
      throw new Error(`Maia3.predict: no legal moves at FEN ${current.fen()}; cannot recommend a move`);
    }
    return {
      tokens,
      boards,
      current,
      hasExplicitHistory,
      legalEntries,
      mask,
      selfElo,
      oppoElo,
      temperature: temperature2,
      topP: topP2,
      topK
    };
  }
  /**
   * Turn one position's raw logits into policy probabilities, a best move,
   * and the position WDL.
   */
  decode(prepared, out) {
    const { mask, legalEntries, temperature: temperature2, topP: topP2 } = prepared;
    const t = Math.max(temperature2, 1e-9);
    const scale = temperature2 > 0 ? 1 / t : 1;
    const scaledLogits = new Float64Array(NUM_MOVES);
    for (let i = 0; i < NUM_MOVES; i++) {
      scaledLogits[i] = mask[i] ? out.logitsMove[i] * scale : -Infinity;
    }
    const probs = softmax(scaledLogits, mask);
    const movesMap = /* @__PURE__ */ new Map();
    for (const e of legalEntries) {
      movesMap.set(e.uci, probs[e.index]);
    }
    const sortedMoves = new Map([...movesMap.entries()].sort((a, b) => b[1] - a[1]));
    let bestMove;
    if (temperature2 === 0) {
      const bestIdx = argmax(out.logitsMove.map((v, i) => mask[i] ? v : -Infinity));
      const bestEntry = legalEntries.find((e) => e.index === bestIdx);
      bestMove = bestEntry.uci;
    } else {
      const legalProbs = legalEntries.map((e) => probs[e.index]);
      const choice = sampleIndex(legalProbs, topP2);
      bestMove = legalEntries[choice].uci;
    }
    const ranked = legalEntries.map((e) => ({ entry: e, p: probs[e.index] })).sort((a, b) => b.p - a.p);
    const wdl = wdlFromValueLogits(out.logitsValue);
    return {
      prepared,
      bestMove,
      sortedMoves,
      ranked,
      wdl,
      winProbability: winProbabilityFromWdl(wdl)
    };
  }
  /**
   * Apply the top-K moves and tokenize the resulting positions, with Elos
   * swapped because the side to move flips after our move.
   */
  buildCandidates(prepared, ranked) {
    const { current, boards, hasExplicitHistory, selfElo, oppoElo, topK } = prepared;
    const k2 = Math.min(topK, ranked.length);
    const topEntries = ranked.slice(0, k2);
    const tokens = [];
    const selfElos = [];
    const oppoElos = [];
    for (const { entry } of topEntries) {
      const next = new Chess(current.fen());
      const moveResult = next.move(entry.uci, { strict: false });
      if (moveResult === null) {
        throw new Error(`Maia3.predict: top candidate ${entry.uci} did not apply on ${current.fen()}`);
      }
      let candidateHistory;
      if (hasExplicitHistory) {
        candidateHistory = [...boards, next];
        if (candidateHistory.length > 8) {
          candidateHistory = candidateHistory.slice(candidateHistory.length - 8);
        }
      } else {
        candidateHistory = [next];
      }
      tokens.push(buildHistoryTokens(candidateHistory));
      selfElos.push(oppoElo);
      oppoElos.push(selfElo);
    }
    return { tokens, selfElos, oppoElos, topEntries };
  }
  /**
   * Combine a decoded position with its candidate outputs. `outputs` may be a
   * flattened array covering several positions; `offset` is where this
   * position's candidates start.
   */
  assemble(decoded, candidates, outputs, offset) {
    const moveCandidates = candidates.topEntries.map((te, i) => {
      const wdlAfter = wdlFromValueLogits(outputs[offset + i].logitsValue);
      const wdl = {
        win: wdlAfter.loss,
        draw: wdlAfter.draw,
        loss: wdlAfter.win
      };
      return {
        uci: te.entry.uci,
        probability: te.p,
        wdl,
        winProbability: winProbabilityFromWdl(wdl)
      };
    });
    return {
      bestMove: decoded.bestMove,
      moves: decoded.sortedMoves,
      candidates: moveCandidates,
      wdl: decoded.wdl,
      winProbability: decoded.winProbability
    };
  }
};

// node_modules/maia3-js/dist/web/model.web.js
function defaultNumThreads() {
  const isolated = typeof globalThis !== "undefined" && globalThis.crossOriginIsolated === true;
  if (!isolated)
    return 1;
  const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency ?? 1 : 1;
  return Math.max(1, Math.min(4, Math.floor(cores / 2)));
}
var Maia3WebModel = class {
  session = null;
  ort = null;
  modelBytes;
  executionProviders;
  opts;
  maxBatchSize;
  /** False when the loaded artifact baked batch=1 into its graph. */
  batchCapable = true;
  warnedLegacy = false;
  constructor(opts) {
    this.modelBytes = opts.modelBytes;
    this.executionProviders = opts.executionProviders ?? ["wasm"];
    this.opts = opts;
    this.maxBatchSize = Math.max(1, opts.maxBatchSize ?? DEFAULT_MAX_BATCH_SIZE);
  }
  isLoaded() {
    return this.session !== null;
  }
  /** Whether the loaded graph supports batch > 1 in a single run. */
  supportsBatching() {
    return this.batchCapable;
  }
  async load() {
    if (this.session)
      return;
    this.ort = await Promise.resolve().then(() => (init_ort_wasm_min(), ort_wasm_min_exports));
    const wasm = this.ort.env.wasm;
    wasm.simd = this.opts.simd ?? true;
    wasm.numThreads = this.opts.numThreads ?? defaultNumThreads();
    if (this.opts.proxy !== void 0)
      wasm.proxy = this.opts.proxy;
    if (this.opts.wasmPaths !== void 0)
      wasm.wasmPaths = this.opts.wasmPaths;
    const bytes = this.modelBytes instanceof Uint8Array ? this.modelBytes : new Uint8Array(this.modelBytes);
    this.session = await this.ort.InferenceSession.create(bytes, {
      executionProviders: this.executionProviders,
      graphOptimizationLevel: "all"
    });
    this.batchCapable = supportsDynamicBatch(this.session);
  }
  async infer(tokens, selfElo, oppoElo) {
    return this.runSingle(tokens, selfElo, oppoElo);
  }
  async inferBatch(tokens, selfElos, oppoElos) {
    if (!this.session || !this.ort) {
      throw new Error("Maia3WebModel: call load() first.");
    }
    validateBatch(tokens, selfElos, oppoElos);
    const batchSize = tokens.length;
    if (batchSize === 0)
      return [];
    if (!this.batchCapable) {
      if (!this.warnedLegacy) {
        this.warnedLegacy = true;
        console.warn(LEGACY_MODEL_WARNING);
      }
      const outputs2 = new Array(batchSize);
      for (let i = 0; i < batchSize; i++) {
        outputs2[i] = await this.runSingle(tokens[i], selfElos[i], oppoElos[i]);
      }
      return outputs2;
    }
    const outputs = new Array(batchSize);
    for (const [start, end] of chunkRanges(batchSize, this.maxBatchSize)) {
      const chunk = await this.runBatch(tokens.slice(start, end), selfElos.slice(start, end), oppoElos.slice(start, end));
      for (let i = 0; i < chunk.length; i++)
        outputs[start + i] = chunk[i];
    }
    return outputs;
  }
  async runBatch(tokens, selfElos, oppoElos) {
    const feeds = buildBatchFeeds(this.ort, tokens, selfElos, oppoElos);
    const results = await this.session.run(feeds);
    return splitBatchOutputs(results.logits_move.data, results.logits_value.data, tokens.length);
  }
  async runSingle(tokens, selfElo, oppoElo) {
    if (!this.session || !this.ort) {
      throw new Error("Maia3WebModel: call load() first.");
    }
    if (tokens.length !== TOKENS_PER_POSITION) {
      throw new Error(`tokens length ${tokens.length} \u2260 ${TOKENS_PER_POSITION}`);
    }
    const feeds = {
      tokens: new this.ort.Tensor("float32", tokens, [1, 64, 96]),
      self_elo: new this.ort.Tensor("int64", BigInt64Array.from([BigInt(Math.round(selfElo))]), [1]),
      oppo_elo: new this.ort.Tensor("int64", BigInt64Array.from([BigInt(Math.round(oppoElo))]), [1])
    };
    const results = await this.session.run(feeds);
    return {
      logitsMove: results.logits_move.data.slice(0, LOGITS_MOVE_DIM),
      logitsValue: results.logits_value.data.slice(0, LOGITS_VALUE_DIM)
    };
  }
  async close() {
    if (this.session) {
      await this.session.release?.();
      this.session = null;
    }
  }
};

// node_modules/maia3-js/dist/web/download.web.js
var CACHE_NAME = "maia3-js";
async function readWithProgress(response, onProgress) {
  const total = Number(response.headers.get("content-length") ?? 0);
  if (!response.body)
    return response.arrayBuffer();
  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done)
      break;
    if (value) {
      chunks.push(value);
      loaded += value.byteLength;
      onProgress?.(loaded, total);
    }
  }
  const out = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out.buffer;
}
async function ensureModelWeb(opts) {
  const info = getVariant(opts.variant);
  const url = opts.url ?? info.url;
  if (typeof caches !== "undefined") {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        return await cached.arrayBuffer();
      }
      const response2 = await fetch(url);
      if (!response2.ok) {
        throw new Error(`[maia3-js] failed to download ${info.name}: HTTP ${response2.status}`);
      }
      const cacheClone = response2.clone();
      const bytes = await readWithProgress(response2, opts.onProgress);
      cache.put(url, cacheClone).catch(() => {
      });
      return bytes;
    } catch (err) {
      if (typeof console !== "undefined") {
        console.warn("[maia3-js] cache storage unavailable, falling back to direct fetch", err);
      }
    }
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`[maia3-js] failed to download ${info.name}: HTTP ${response.status}`);
  }
  return readWithProgress(response, opts.onProgress);
}

// node_modules/maia3-js/dist/web/index.web.js
var Maia32 = class extends Maia3 {
  constructor(opts = {}) {
    const variant = opts.variant ?? DEFAULT_VARIANT;
    const factory = async () => {
      const bytes = opts.modelBytes ?? await ensureModelWeb({
        variant,
        url: opts.url,
        onProgress: opts.onProgress
      });
      return new Maia3WebModel({
        modelBytes: bytes,
        executionProviders: opts.executionProviders,
        numThreads: opts.numThreads,
        simd: opts.simd,
        proxy: opts.proxy,
        wasmPaths: opts.wasmPaths,
        maxBatchSize: opts.maxBatchSize
      });
    };
    super(factory, { ...opts, variant });
  }
};

// maia-worker-source.js
var MAIA_MODEL_URL = new URL("./assets/maia3_5m.onnx", self.location.href).href;
var ORT_WASM_MJS_URL = new URL("./assets/ort/ort-wasm-simd-threaded.mjs", self.location.href).href;
var ORT_WASM_URL = new URL("./assets/ort/ort-wasm-simd-threaded.wasm", self.location.href).href;
B.wasm.numThreads = 1;
B.wasm.proxy = false;
B.wasm.wasmPaths = {
  mjs: ORT_WASM_MJS_URL,
  wasm: ORT_WASM_URL
};
var maia = null;
var loadPromise = null;
var currentFen = "startpos";
var elo = 2e3;
var temperature = 0;
var topP = 1;
var multiPv = 5;
var generation = 0;
function emit(line) {
  self.postMessage(line);
}
function emitDebug(payload) {
  emit(`info string maia-debug ${JSON.stringify(payload)}`);
}
function reportFatal(error) {
  const message = error instanceof Error ? error.message : String(error);
  emit(`info string maia-error ${message.replace(/[\r\n]+/g, " ")}`);
  throw error instanceof Error ? error : new Error(message);
}
async function ensureMaia() {
  if (maia) return maia;
  if (!loadPromise) {
    const startedAt = performance.now();
    loadPromise = (async () => {
      emitDebug({
        phase: "load-start",
        model: MAIA_MODEL_URL,
        ortMjs: ORT_WASM_MJS_URL,
        ortWasm: ORT_WASM_URL
      });
      const instance = new Maia32({
        variant: "5m",
        url: MAIA_MODEL_URL,
        executionProviders: ["wasm"],
        temperature,
        topP,
        topK: multiPv,
        onProgress: (loaded, total) => {
          if (!total) return;
          const percent = Math.max(0, Math.min(100, Math.round(loaded / total * 100)));
          emit(`info string maia-loading ${percent}`);
        }
      });
      await instance.load();
      maia = instance;
      emitDebug({
        phase: "load-ready",
        elapsedMs: Math.round(performance.now() - startedAt),
        backend: "wasm-external",
        ortThreads: 1
      });
      emit("info string maia-ready");
      return maia;
    })().catch((error) => {
      loadPromise = null;
      throw error;
    });
  }
  return loadPromise;
}
function parseSetOption(line) {
  const match = line.match(/^setoption\s+name\s+(.+?)(?:\s+value\s+(.*))?$/i);
  if (!match) return;
  const name = match[1].trim().toLowerCase();
  const value = (match[2] ?? "").trim();
  if (name === "uci_elo" || name === "elo" || name === "selfelo") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) elo = Math.max(400, Math.min(3200, Math.round(parsed)));
    return;
  }
  if (name === "temperature") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) temperature = parsed;
    return;
  }
  if (name === "topp") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) topP = Math.max(0, Math.min(1, parsed));
    return;
  }
  if (name === "multipv") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) multiPv = Math.max(1, Math.min(10, Math.round(parsed)));
  }
}
async function playMove(searchGeneration) {
  const engine = await ensureMaia();
  if (searchGeneration !== generation) return;
  const fen = !currentFen || currentFen === "startpos" ? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" : currentFen;
  const startedAt = performance.now();
  emitDebug({ phase: "predict-start", elo, temperature, topP, fen });
  const result = await engine.predict({
    fen,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    topK: multiPv
  });
  if (searchGeneration !== generation) return;
  const candidates = (result.candidates ?? []).map((candidate) => ({
    uci: candidate.uci,
    probability: Number(candidate.probability ?? 0)
  }));
  emitDebug({
    phase: "predict-result",
    elo,
    selfElo: elo,
    oppoElo: elo,
    temperature,
    topP,
    elapsedMs: Math.round(performance.now() - startedAt),
    bestMove: result.bestMove,
    candidates
  });
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const probability = Math.max(1e-9, candidate.probability);
    const pseudoCp = Math.round(Math.log(probability) * 100);
    emit(`info multipv ${i + 1} score cp ${pseudoCp} pv ${candidate.uci}`);
  }
  emit(`bestmove ${result.bestMove}`);
}
self.addEventListener("message", (event) => {
  const line = String(event.data ?? "").trim();
  if (!line) return;
  if (line === "uci") {
    emit("id name Maia3 5M");
    emit("id author CSSLab / browser bundle");
    emit("option name Elo type spin default 2000 min 400 max 3200");
    emit("option name Temperature type string default 0");
    emit("option name TopP type string default 1");
    emit("option name MultiPV type spin default 5 min 1 max 10");
    emit("uciok");
    void ensureMaia().catch(reportFatal);
    return;
  }
  if (line === "isready") {
    void ensureMaia().then(() => emit("readyok")).catch(reportFatal);
    return;
  }
  if (line === "ucinewgame") {
    generation += 1;
    currentFen = "startpos";
    return;
  }
  if (line === "stop") {
    generation += 1;
    return;
  }
  if (line.startsWith("setoption ")) {
    parseSetOption(line);
    return;
  }
  if (line.startsWith("position fen ")) {
    currentFen = line.slice("position fen ".length).trim();
    return;
  }
  if (line === "position startpos") {
    currentFen = "startpos";
    return;
  }
  if (line.startsWith("go")) {
    const searchGeneration = generation;
    void playMove(searchGeneration).catch(reportFatal);
  }
});
/*! Bundled license information:

onnxruntime-web/dist/ort.wasm.min.mjs:
  (*!
   * ONNX Runtime Web v1.27.0
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

chess.js/dist/esm/chess.js:
  (**
   * @license
   * Copyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   *    this list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the documentation
   *    and/or other materials provided with the distribution.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   *)
*/
