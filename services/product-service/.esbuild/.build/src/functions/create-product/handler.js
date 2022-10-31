var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// ../../node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  '../../node_modules/uuid/dist/rng.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require('crypto'));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, (poolPtr += 16));
    }
  },
});

// ../../node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  '../../node_modules/uuid/dist/regex.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _default =
      /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  '../../node_modules/uuid/dist/validate.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate2(uuid2) {
      return typeof uuid2 === 'string' && _regex.default.test(uuid2);
    }
    var _default = validate2;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  '../../node_modules/uuid/dist/stringify.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    exports.unsafeStringify = unsafeStringify;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    function unsafeStringify(arr, offset = 0) {
      return (
        byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]
      ).toLowerCase();
    }
    function stringify2(arr, offset = 0) {
      const uuid2 = unsafeStringify(arr, offset);
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError('Stringified UUID is invalid');
      }
      return uuid2;
    }
    var _default = stringify2;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  '../../node_modules/uuid/dist/v1.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v12(options, buf, offset) {
      let i = (buf && offset) || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [
            seedBytes[0] | 1,
            seedBytes[1],
            seedBytes[2],
            seedBytes[3],
            seedBytes[4],
            seedBytes[5],
          ];
        }
        if (clockseq == null) {
          clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = (clockseq + 1) & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = (tl >>> 24) & 255;
      b[i++] = (tl >>> 16) & 255;
      b[i++] = (tl >>> 8) & 255;
      b[i++] = tl & 255;
      const tmh = ((msecs / 4294967296) * 1e4) & 268435455;
      b[i++] = (tmh >>> 8) & 255;
      b[i++] = tmh & 255;
      b[i++] = ((tmh >>> 24) & 15) | 16;
      b[i++] = (tmh >>> 16) & 255;
      b[i++] = (clockseq >>> 8) | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.unsafeStringify)(b);
    }
    var _default = v12;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  '../../node_modules/uuid/dist/parse.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse2(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError('Invalid UUID');
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
      arr[1] = (v >>> 16) & 255;
      arr[2] = (v >>> 8) & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = ((v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776) & 255;
      arr[11] = (v / 4294967296) & 255;
      arr[12] = (v >>> 24) & 255;
      arr[13] = (v >>> 16) & 255;
      arr[14] = (v >>> 8) & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse2;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  '../../node_modules/uuid/dist/v35.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.URL = exports.DNS = void 0;
    exports.default = v35;
    var _stringify = require_stringify();
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    exports.DNS = DNS;
    var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
    exports.URL = URL;
    function v35(name, version2, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === 'string') {
          value = stringToBytes(value);
        }
        if (typeof namespace === 'string') {
          namespace = (0, _parse.default)(namespace);
        }
        if (
          ((_namespace = namespace) === null || _namespace === void 0
            ? void 0
            : _namespace.length) !== 16
        ) {
          throw TypeError(
            'Namespace must be array-like (16 iterable integer values, 0-255)'
          );
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = (bytes[6] & 15) | version2;
        bytes[8] = (bytes[8] & 63) | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.unsafeStringify)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {}
      generateUUID.DNS = DNS;
      generateUUID.URL = URL;
      return generateUUID;
    }
  },
});

// ../../node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  '../../node_modules/uuid/dist/md5.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require('crypto'));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
      }
      return _crypto.default.createHash('md5').update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  '../../node_modules/uuid/dist/v3.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v32 = (0, _v.default)('v3', 48, _md.default);
    var _default = v32;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/native.js
var require_native = __commonJS({
  '../../node_modules/uuid/dist/native.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require('crypto'));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = {
      randomUUID: _crypto.default.randomUUID,
    };
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  '../../node_modules/uuid/dist/v4.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _native = _interopRequireDefault(require_native());
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v42(options, buf, offset) {
      if (_native.default.randomUUID && !buf && !options) {
        return _native.default.randomUUID();
      }
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = (rnds[6] & 15) | 64;
      rnds[8] = (rnds[8] & 63) | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.unsafeStringify)(rnds);
    }
    var _default = v42;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  '../../node_modules/uuid/dist/sha1.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require('crypto'));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
      }
      return _crypto.default.createHash('sha1').update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  '../../node_modules/uuid/dist/v5.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v52 = (0, _v.default)('v5', 80, _sha.default);
    var _default = v52;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  '../../node_modules/uuid/dist/nil.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _default = '00000000-0000-0000-0000-000000000000';
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/version.js
var require_version = __commonJS({
  '../../node_modules/uuid/dist/version.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version2(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError('Invalid UUID');
      }
      return parseInt(uuid2.slice(14, 15), 16);
    }
    var _default = version2;
    exports.default = _default;
  },
});

// ../../node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  '../../node_modules/uuid/dist/index.js'(exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    Object.defineProperty(exports, 'NIL', {
      enumerable: true,
      get: function () {
        return _nil.default;
      },
    });
    Object.defineProperty(exports, 'parse', {
      enumerable: true,
      get: function () {
        return _parse.default;
      },
    });
    Object.defineProperty(exports, 'stringify', {
      enumerable: true,
      get: function () {
        return _stringify.default;
      },
    });
    Object.defineProperty(exports, 'v1', {
      enumerable: true,
      get: function () {
        return _v.default;
      },
    });
    Object.defineProperty(exports, 'v3', {
      enumerable: true,
      get: function () {
        return _v2.default;
      },
    });
    Object.defineProperty(exports, 'v4', {
      enumerable: true,
      get: function () {
        return _v3.default;
      },
    });
    Object.defineProperty(exports, 'v5', {
      enumerable: true,
      get: function () {
        return _v4.default;
      },
    });
    Object.defineProperty(exports, 'validate', {
      enumerable: true,
      get: function () {
        return _validate.default;
      },
    });
    Object.defineProperty(exports, 'version', {
      enumerable: true,
      get: function () {
        return _version.default;
      },
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  },
});

// ../../node_modules/@middy/core/index.js
var require_core = __commonJS({
  '../../node_modules/@middy/core/index.js'(exports, module2) {
    'use strict';
    var middy2 = (baseHandler = () => {}, plugin) => {
      var _plugin$beforePrefetc;
      plugin === null || plugin === void 0
        ? void 0
        : (_plugin$beforePrefetc = plugin.beforePrefetch) === null ||
          _plugin$beforePrefetc === void 0
        ? void 0
        : _plugin$beforePrefetc.call(plugin);
      const beforeMiddlewares = [];
      const afterMiddlewares = [];
      const onErrorMiddlewares = [];
      const instance = (event = {}, context = {}) => {
        var _plugin$requestStart;
        plugin === null || plugin === void 0
          ? void 0
          : (_plugin$requestStart = plugin.requestStart) === null ||
            _plugin$requestStart === void 0
          ? void 0
          : _plugin$requestStart.call(plugin);
        const request = {
          event,
          context,
          response: void 0,
          error: void 0,
          internal: {},
        };
        return runRequest(
          request,
          [...beforeMiddlewares],
          baseHandler,
          [...afterMiddlewares],
          [...onErrorMiddlewares],
          plugin
        );
      };
      instance.use = (middlewares) => {
        if (Array.isArray(middlewares)) {
          for (const middleware of middlewares) {
            instance.applyMiddleware(middleware);
          }
          return instance;
        }
        return instance.applyMiddleware(middlewares);
      };
      instance.applyMiddleware = (middleware) => {
        const { before, after, onError } = middleware;
        if (!before && !after && !onError) {
          throw new Error(
            'Middleware must be an object containing at least one key among "before", "after", "onError"'
          );
        }
        if (before) instance.before(before);
        if (after) instance.after(after);
        if (onError) instance.onError(onError);
        return instance;
      };
      instance.before = (beforeMiddleware) => {
        beforeMiddlewares.push(beforeMiddleware);
        return instance;
      };
      instance.after = (afterMiddleware) => {
        afterMiddlewares.unshift(afterMiddleware);
        return instance;
      };
      instance.onError = (onErrorMiddleware) => {
        onErrorMiddlewares.push(onErrorMiddleware);
        return instance;
      };
      instance.__middlewares = {
        before: beforeMiddlewares,
        after: afterMiddlewares,
        onError: onErrorMiddlewares,
      };
      return instance;
    };
    var runRequest = async (
      request,
      beforeMiddlewares,
      baseHandler,
      afterMiddlewares,
      onErrorMiddlewares,
      plugin
    ) => {
      try {
        await runMiddlewares(request, beforeMiddlewares, plugin);
        if (request.response === void 0) {
          var _plugin$beforeHandler, _plugin$afterHandler;
          plugin === null || plugin === void 0
            ? void 0
            : (_plugin$beforeHandler = plugin.beforeHandler) === null ||
              _plugin$beforeHandler === void 0
            ? void 0
            : _plugin$beforeHandler.call(plugin);
          request.response = await baseHandler(request.event, request.context);
          plugin === null || plugin === void 0
            ? void 0
            : (_plugin$afterHandler = plugin.afterHandler) === null ||
              _plugin$afterHandler === void 0
            ? void 0
            : _plugin$afterHandler.call(plugin);
          await runMiddlewares(request, afterMiddlewares, plugin);
        }
      } catch (e) {
        request.response = void 0;
        request.error = e;
        try {
          await runMiddlewares(request, onErrorMiddlewares, plugin);
        } catch (e2) {
          e2.originalError = request.error;
          request.error = e2;
          throw request.error;
        }
        if (request.response === void 0) throw request.error;
      } finally {
        var _plugin$requestEnd;
        await (plugin === null || plugin === void 0
          ? void 0
          : (_plugin$requestEnd = plugin.requestEnd) === null ||
            _plugin$requestEnd === void 0
          ? void 0
          : _plugin$requestEnd.call(plugin, request));
      }
      return request.response;
    };
    var runMiddlewares = async (request, middlewares, plugin) => {
      for (const nextMiddleware of middlewares) {
        var _plugin$beforeMiddlew, _plugin$afterMiddlewa;
        plugin === null || plugin === void 0
          ? void 0
          : (_plugin$beforeMiddlew = plugin.beforeMiddleware) === null ||
            _plugin$beforeMiddlew === void 0
          ? void 0
          : _plugin$beforeMiddlew.call(
              plugin,
              nextMiddleware === null || nextMiddleware === void 0
                ? void 0
                : nextMiddleware.name
            );
        const res = await (nextMiddleware === null || nextMiddleware === void 0
          ? void 0
          : nextMiddleware(request));
        plugin === null || plugin === void 0
          ? void 0
          : (_plugin$afterMiddlewa = plugin.afterMiddleware) === null ||
            _plugin$afterMiddlewa === void 0
          ? void 0
          : _plugin$afterMiddlewa.call(
              plugin,
              nextMiddleware === null || nextMiddleware === void 0
                ? void 0
                : nextMiddleware.name
            );
        if (res !== void 0) {
          request.response = res;
          return;
        }
      }
    };
    module2.exports = middy2;
  },
});

// ../../node_modules/@middy/http-json-body-parser/node_modules/@middy/util/codes.json
var require_codes = __commonJS({
  '../../node_modules/@middy/http-json-body-parser/node_modules/@middy/util/codes.json'(
    exports,
    module2
  ) {
    module2.exports = {
      100: 'Continue',
      101: 'Switching Protocols',
      102: 'Processing',
      103: 'Early Hints',
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
      203: 'Non-Authoritative Information',
      204: 'No Content',
      205: 'Reset Content',
      206: 'Partial Content',
      207: 'Multi-Status',
      208: 'Already Reported',
      226: 'IM Used',
      300: 'Multiple Choices',
      301: 'Moved Permanently',
      302: 'Found',
      303: 'See Other',
      304: 'Not Modified',
      305: 'Use Proxy',
      306: '(Unused)',
      307: 'Temporary Redirect',
      308: 'Permanent Redirect',
      400: 'Bad Request',
      401: 'Unauthorized',
      402: 'Payment Required',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      406: 'Not Acceptable',
      407: 'Proxy Authentication Required',
      408: 'Request Timeout',
      409: 'Conflict',
      410: 'Gone',
      411: 'Length Required',
      412: 'Precondition Failed',
      413: 'Payload Too Large',
      414: 'URI Too Long',
      415: 'Unsupported Media Type',
      416: 'Range Not Satisfiable',
      417: 'Expectation Failed',
      418: "I'm a teapot",
      421: 'Misdirected Request',
      422: 'Unprocessable Entity',
      423: 'Locked',
      424: 'Failed Dependency',
      425: 'Unordered Collection',
      426: 'Upgrade Required',
      428: 'Precondition Required',
      429: 'Too Many Requests',
      431: 'Request Header Fields Too Large',
      451: 'Unavailable For Legal Reasons',
      500: 'Internal Server Error',
      501: 'Not Implemented',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
      505: 'HTTP Version Not Supported',
      506: 'Variant Also Negotiates',
      507: 'Insufficient Storage',
      508: 'Loop Detected',
      509: 'Bandwidth Limit Exceeded',
      510: 'Not Extended',
      511: 'Network Authentication Required',
    };
  },
});

// ../../node_modules/@middy/http-json-body-parser/node_modules/@middy/util/index.js
var require_util = __commonJS({
  '../../node_modules/@middy/http-json-body-parser/node_modules/@middy/util/index.js'(
    exports,
    module2
  ) {
    'use strict';
    var { Agent: Agent2 } = require('https');
    var awsClientDefaultOptions2 = {
      httpOptions: {
        agent: new Agent2({
          secureProtocol: 'TLSv1_2_method',
        }),
      },
    };
    var createPrefetchClient = (options) => {
      const awsClientOptions = {
        ...awsClientDefaultOptions2,
        ...options.awsClientOptions,
      };
      const client = new options.AwsClient(awsClientOptions);
      if (options.awsClientCapture) {
        return options.awsClientCapture(client);
      }
      return client;
    };
    var createClient = async (options, request) => {
      let awsClientCredentials = {};
      if (options.awsClientAssumeRole) {
        if (!request) throw new Error('Request required when assuming role');
        awsClientCredentials = await getInternal(
          {
            credentials: options.awsClientAssumeRole,
          },
          request
        );
      }
      awsClientCredentials = {
        ...awsClientCredentials,
        ...options.awsClientOptions,
      };
      return createPrefetchClient({
        ...options,
        awsClientOptions: awsClientCredentials,
      });
    };
    var canPrefetch = (options) => {
      return (
        !(
          options !== null &&
          options !== void 0 &&
          options.awsClientAssumeRole
        ) &&
        !(options !== null && options !== void 0 && options.disablePrefetch)
      );
    };
    var getInternal = async (variables, request) => {
      if (!variables || !request) return {};
      let keys = [];
      let values = [];
      if (variables === true) {
        keys = values = Object.keys(request.internal);
      } else if (typeof variables === 'string') {
        keys = values = [variables];
      } else if (Array.isArray(variables)) {
        keys = values = variables;
      } else if (typeof variables === 'object') {
        keys = Object.keys(variables);
        values = Object.values(variables);
      }
      const promises = [];
      for (const internalKey of values) {
        var _valuePromise;
        const pathOptionKey = internalKey.split('.');
        const rootOptionKey = pathOptionKey.shift();
        let valuePromise = request.internal[rootOptionKey];
        if (
          typeof ((_valuePromise = valuePromise) === null ||
          _valuePromise === void 0
            ? void 0
            : _valuePromise.then) !== 'function'
        ) {
          valuePromise = Promise.resolve(valuePromise);
        }
        promises.push(
          valuePromise.then((value) =>
            pathOptionKey.reduce(
              (p, c) => (p === null || p === void 0 ? void 0 : p[c]),
              value
            )
          )
        );
      }
      values = await Promise.allSettled(promises);
      const errors = values
        .filter((res) => res.status === 'rejected')
        .map((res) => res.reason.message);
      if (errors.length) throw new Error(JSON.stringify(errors));
      return keys.reduce(
        (obj, key, index) => ({
          ...obj,
          [sanitizeKey(key)]: values[index].value,
        }),
        {}
      );
    };
    var sanitizeKeyPrefixLeadingNumber = /^([0-9])/;
    var sanitizeKeyRemoveDisallowedChar = /[^a-zA-Z0-9]+/g;
    var sanitizeKey = (key) => {
      return key
        .replace(sanitizeKeyPrefixLeadingNumber, '_$1')
        .replace(sanitizeKeyRemoveDisallowedChar, '_');
    };
    var cache = {};
    var processCache = (options, fetch = () => void 0, request) => {
      const { cacheExpiry, cacheKey } = options;
      if (cacheExpiry) {
        const cached = getCache(cacheKey);
        const unexpired =
          cached && (cacheExpiry < 0 || cached.expiry > Date.now());
        if (unexpired && cached.modified) {
          const value2 = fetch(request, cached.value);
          cache[cacheKey] = {
            value: {
              ...cached.value,
              ...value2,
            },
            expiry: cached.expiry,
          };
          return cache[cacheKey];
        }
        if (unexpired) {
          return {
            ...cached,
            cache: true,
          };
        }
      }
      const value = fetch(request);
      const expiry = Date.now() + cacheExpiry;
      if (cacheExpiry) {
        cache[cacheKey] = {
          value,
          expiry,
        };
      }
      return {
        value,
        expiry,
      };
    };
    var getCache = (key) => {
      return cache[key];
    };
    var modifyCache = (cacheKey, value) => {
      if (!cache[cacheKey]) return;
      cache[cacheKey] = {
        ...cache[cacheKey],
        value,
        modified: true,
      };
    };
    var clearCache = (keys = null) => {
      var _keys;
      keys =
        (_keys = keys) !== null && _keys !== void 0
          ? _keys
          : Object.keys(cache);
      if (!Array.isArray(keys)) keys = [keys];
      for (const cacheKey of keys) {
        cache[cacheKey] = void 0;
      }
    };
    var jsonSafeParse2 = (string, reviver) => {
      if (typeof string !== 'string') return string;
      const firstChar = string[0];
      if (firstChar !== '{' && firstChar !== '[' && firstChar !== '"')
        return string;
      try {
        return JSON.parse(string, reviver);
      } catch (e) {}
      return string;
    };
    var normalizeHttpResponse2 = (response) => {
      var _response$headers, _response2;
      if (response === void 0) {
        response = {};
      } else if (
        Array.isArray(response) ||
        typeof response !== 'object' ||
        response === null
      ) {
        response = {
          body: response,
        };
      }
      response.headers =
        (_response$headers =
          (_response2 = response) === null || _response2 === void 0
            ? void 0
            : _response2.headers) !== null && _response$headers !== void 0
          ? _response$headers
          : {};
      return response;
    };
    var statuses = require_codes();
    var { inherits } = require('util');
    var createErrorRegexp = /[^a-zA-Z]/g;
    var createError = (code, message, properties = {}) => {
      const name = statuses[code].replace(createErrorRegexp, '');
      const className = name.substr(-5) !== 'Error' ? name + 'Error' : name;
      function HttpError(message2) {
        const msg =
          message2 !== null && message2 !== void 0 ? message2 : statuses[code];
        const err = new Error(msg);
        Error.captureStackTrace(err, HttpError);
        Object.setPrototypeOf(err, HttpError.prototype);
        Object.defineProperty(err, 'message', {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true,
        });
        Object.defineProperty(err, 'name', {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true,
        });
        return err;
      }
      inherits(HttpError, Error);
      const desc = Object.getOwnPropertyDescriptor(HttpError, 'name');
      desc.value = className;
      Object.defineProperty(HttpError, 'name', desc);
      Object.assign(
        HttpError.prototype,
        {
          status: code,
          statusCode: code,
          expose: code < 500,
        },
        properties
      );
      return new HttpError(message);
    };
    module2.exports = {
      createPrefetchClient,
      createClient,
      canPrefetch,
      getInternal,
      sanitizeKey,
      processCache,
      getCache,
      modifyCache,
      clearCache,
      jsonSafeParse: jsonSafeParse2,
      normalizeHttpResponse: normalizeHttpResponse2,
      createError,
    };
  },
});

// ../../node_modules/@middy/http-json-body-parser/index.js
var require_http_json_body_parser = __commonJS({
  '../../node_modules/@middy/http-json-body-parser/index.js'(exports, module2) {
    'use strict';
    var mimePattern = /^application\/(.+\+)?json(;.*)?$/;
    var defaults3 = {
      reviver: void 0,
    };
    var httpJsonBodyParserMiddleware = (opts = {}) => {
      const options = {
        ...defaults3,
        ...opts,
      };
      const httpJsonBodyParserMiddlewareBefore = async (request) => {
        var _headers$ContentType;
        const { headers, body } = request.event;
        const contentTypeHeader =
          (_headers$ContentType =
            headers === null || headers === void 0
              ? void 0
              : headers['Content-Type']) !== null &&
          _headers$ContentType !== void 0
            ? _headers$ContentType
            : headers === null || headers === void 0
            ? void 0
            : headers['content-type'];
        if (mimePattern.test(contentTypeHeader)) {
          try {
            const data = request.event.isBase64Encoded
              ? Buffer.from(body, 'base64').toString()
              : body;
            request.event.rawBody = body;
            request.event.body = JSON.parse(data, options.reviver);
          } catch (err) {
            const { createError } = require_util();
            throw createError(
              422,
              'Content type defined as JSON but an invalid JSON was provided'
            );
          }
        }
      };
      return {
        before: httpJsonBodyParserMiddlewareBefore,
      };
    };
    module2.exports = httpJsonBodyParserMiddleware;
  },
});

// src/functions/create-product/handler.ts
var handler_exports = {};
__export(handler_exports, {
  main: () => main,
});
module.exports = __toCommonJS(handler_exports);

// src/libs/logger.ts
var logger = (method, handler) => (message) => {
  console[method](`[${method.toUpperCase()}] ${handler}: ${message}`);
};
var loggers = (handler) => {
  return {
    LOG: logger('log', handler),
    WARN: logger('warn', handler),
    ERROR: logger('error', handler),
  };
};
function errorMessage(e) {
  const message = e.message || e.errorMessage || JSON.stringify(e, null, 2);
  return String(message);
}

// ../../environments/dynamo-db-table-names.ts
var DynamoDbTableNames = {
  Products: process.env.PRODUCT_TABLE_NAME ?? 'products',
  Stocks: process.env.STOCK_TABLE_NAME ?? 'stocks',
};

// src/libs/db.ts
var AWS = __toESM(require('aws-sdk'));
var dynamo = new AWS.DynamoDB.DocumentClient();
var DB = class {
  static async scan(TableName) {
    const scanResults = await dynamo.scan({ TableName }).promise();
    return scanResults.Items;
  }
  static async query(TableName, options = {}) {
    return await dynamo
      .query({
        TableName,
        ...options,
      })
      .promise();
  }
  static async put(TableName, Item = {}) {
    return await dynamo
      .put({
        TableName,
        Item,
      })
      .promise();
  }
};
var db_default = DB;

// ../../node_modules/uuid/wrapper.mjs
var import_dist = __toESM(require_dist(), 1);
var v1 = import_dist.default.v1;
var v3 = import_dist.default.v3;
var v4 = import_dist.default.v4;
var v5 = import_dist.default.v5;
var NIL = import_dist.default.NIL;
var version = import_dist.default.version;
var validate = import_dist.default.validate;
var stringify = import_dist.default.stringify;
var parse = import_dist.default.parse;

// src/services/product.service.ts
var ProductService = class {
  static async getProductById(id) {
    var _a, _b, _c, _d;
    const product =
      (_b =
        (_a = await db_default.query(DynamoDbTableNames.Products, {
          KeyConditionExpression: `id = :id`,
          ExpressionAttributeValues: { [`:id`]: id },
        })) == null
          ? void 0
          : _a.Items) == null
        ? void 0
        : _b[0];
    const productStock =
      (_d =
        (_c = await db_default.query(DynamoDbTableNames.Stocks, {
          KeyConditionExpression: `product_id = :id`,
          ExpressionAttributeValues: { [`:id`]: id },
        })) == null
          ? void 0
          : _c.Items) == null
        ? void 0
        : _d[0];
    return { ...product, count: productStock.count };
  }
  static async getProducts() {
    const products = await db_default.scan(DynamoDbTableNames.Products);
    const stocks = await db_default.scan(DynamoDbTableNames.Stocks);
    return products.map((product, index) => ({
      ...product,
      count: stocks[index],
    }));
  }
  static async createProduct(payload) {
    const id = v4();
    const product = { id, ...payload };
    const productStock = { product_id: id, count: product.count };
    await db_default.put(DynamoDbTableNames.Products, product);
    await db_default.put(DynamoDbTableNames.Stocks, productStock);
    return product;
  }
};

// ../../libs/http/src/lib/api-gateway.ts
var formatJSONResponse = (response) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
var formatErrorResponse = (statusCode, message) => {
  return {
    statusCode,
    message,
  };
};

// ../../libs/http/src/lib/lambda.ts
var import_core = __toESM(require_core());
var import_http_json_body_parser = __toESM(require_http_json_body_parser());

// ../../node_modules/@middy/util/index.js
var import_https = require('https');
var _response;
var awsClientDefaultOptions = {
  httpOptions: {
    agent: new import_https.Agent({
      keepAlive: true,
      secureProtocol: 'TLSv1_2_method',
    }),
  },
};
var jsonSafeParse = (text, reviver) => {
  if (typeof text !== 'string') return text;
  const firstChar = text[0];
  if (firstChar !== '{' && firstChar !== '[' && firstChar !== '"') return text;
  try {
    return JSON.parse(text, reviver);
  } catch (e) {}
  return text;
};
var normalizeHttpResponse = (request) => {
  let { response } = request;
  if (typeof response === 'undefined') {
    response = {};
  } else if (
    typeof (response == null ? void 0 : response.statusCode) === 'undefined' &&
    typeof (response == null ? void 0 : response.body) === 'undefined' &&
    typeof (response == null ? void 0 : response.headers) === 'undefined'
  ) {
    response = {
      body: response,
    };
  }
  (_response = response).headers ?? (_response.headers = {});
  request.response = response;
  return response;
};

// ../../node_modules/@middy/http-cors/index.js
var getOrigin = (incomingOrigin, options = {}) => {
  if (options.origins.length > 0) {
    if (incomingOrigin && options.origins.includes(incomingOrigin)) {
      return incomingOrigin;
    } else {
      return options.origins[0];
    }
  } else {
    if (incomingOrigin && options.credentials && options.origin === '*') {
      return incomingOrigin;
    }
    return options.origin;
  }
};
var defaults = {
  getOrigin,
  credentials: void 0,
  headers: void 0,
  methods: void 0,
  origin: '*',
  origins: [],
  exposeHeaders: void 0,
  maxAge: void 0,
  requestHeaders: void 0,
  requestMethods: void 0,
  cacheControl: void 0,
  vary: void 0,
};
var httpCorsMiddleware = (opts = {}) => {
  const options = {
    ...defaults,
    ...opts,
  };
  const httpCorsMiddlewareAfter = async (request) => {
    var _a;
    normalizeHttpResponse(request);
    const { headers } = request.response;
    const existingHeaders = Object.keys(headers);
    if (existingHeaders.includes('Access-Control-Allow-Credentials')) {
      options.credentials =
        headers['Access-Control-Allow-Credentials'] === 'true';
    }
    if (options.credentials) {
      headers['Access-Control-Allow-Credentials'] = String(options.credentials);
    }
    if (
      options.headers &&
      !existingHeaders.includes('Access-Control-Allow-Headers')
    ) {
      headers['Access-Control-Allow-Headers'] = options.headers;
    }
    if (
      options.methods &&
      !existingHeaders.includes('Access-Control-Allow-Methods')
    ) {
      headers['Access-Control-Allow-Methods'] = options.methods;
    }
    if (!existingHeaders.includes('Access-Control-Allow-Origin')) {
      const eventHeaders = request.event.headers ?? {};
      const incomingOrigin = eventHeaders.Origin ?? eventHeaders.origin;
      headers['Access-Control-Allow-Origin'] = options.getOrigin(
        incomingOrigin,
        options
      );
    }
    let vary = options.vary;
    if (headers['Access-Control-Allow-Origin'] !== '*' && !vary) {
      vary = 'Origin';
    }
    if (vary && !existingHeaders.includes('Vary')) {
      headers.Vary = vary;
    }
    if (
      options.exposeHeaders &&
      !existingHeaders.includes('Access-Control-Expose-Headers')
    ) {
      headers['Access-Control-Expose-Headers'] = options.exposeHeaders;
    }
    if (options.maxAge && !existingHeaders.includes('Access-Control-Max-Age')) {
      headers['Access-Control-Max-Age'] = String(options.maxAge);
    }
    if (
      options.requestHeaders &&
      !existingHeaders.includes('Access-Control-Request-Headers')
    ) {
      headers['Access-Control-Request-Headers'] = options.requestHeaders;
    }
    if (
      options.requestMethods &&
      !existingHeaders.includes('Access-Control-Request-Methods')
    ) {
      headers['Access-Control-Request-Methods'] = options.requestMethods;
    }
    const httpMethod =
      (_a = getVersionHttpMethod[request.event.version ?? '1.0']) == null
        ? void 0
        : _a.call(getVersionHttpMethod, request.event);
    if (!httpMethod) {
      throw new Error('[http-cors] Unknown http event format');
    }
    if (
      httpMethod === 'OPTIONS' &&
      options.cacheControl &&
      !existingHeaders.includes('Cache-Control')
    ) {
      headers['Cache-Control'] = options.cacheControl;
    }
    request.response.headers = headers;
  };
  const httpCorsMiddlewareOnError = async (request) => {
    if (request.response === void 0) return;
    return httpCorsMiddlewareAfter(request);
  };
  return {
    after: httpCorsMiddlewareAfter,
    onError: httpCorsMiddlewareOnError,
  };
};
var getVersionHttpMethod = {
  '1.0': (event) => event.httpMethod,
  '2.0': (event) => event.requestContext.http.method,
};
var http_cors_default = httpCorsMiddleware;

// ../../node_modules/@middy/http-error-handler/index.js
var defaults2 = {
  logger: console.error,
  fallbackMessage: null,
};
var httpErrorHandlerMiddleware = (opts = {}) => {
  const options = {
    ...defaults2,
    ...opts,
  };
  const httpErrorHandlerMiddlewareOnError = async (request) => {
    if (request.response !== void 0) return;
    if (typeof options.logger === 'function') {
      options.logger(request.error);
    }
    if (request.error.statusCode && request.error.expose === void 0) {
      request.error.expose = request.error.statusCode < 500;
    }
    if (
      options.fallbackMessage &&
      (!request.error.statusCode || !request.error.expose)
    ) {
      request.error = {
        statusCode: 500,
        message: options.fallbackMessage,
        expose: true,
      };
    }
    if (request.error.expose) {
      normalizeHttpResponse(request);
      const { statusCode, message, headers } = request.error;
      request.response = {
        ...request.response,
        statusCode,
        body: message,
        headers: {
          ...headers,
          ...request.response.headers,
          'Content-Type':
            typeof jsonSafeParse(message) === 'string'
              ? 'text/plain'
              : 'application/json',
        },
      };
    }
  };
  return {
    onError: httpErrorHandlerMiddlewareOnError,
  };
};
var http_error_handler_default = httpErrorHandlerMiddleware;

// ../../libs/http/src/lib/lambda.ts
var middyfy = (handler) => {
  return (0, import_core.default)(handler)
    .use((0, import_http_json_body_parser.default)())
    .use(http_cors_default({ origin: '*', methods: '*', requestMethods: '*' }))
    .use(http_error_handler_default());
};

// src/functions/create-product/handler.ts
var { LOG, ERROR } = loggers('createProduct');
var createProduct = async (event) => {
  try {
    const payload = event.body;
    LOG(`Creating product ${JSON.stringify(payload)}`);
    const product = await ProductService.createProduct(payload);
    return formatJSONResponse({ product });
  } catch (err) {
    const message = errorMessage(err);
    ERROR(message);
    return formatErrorResponse(500, message);
  }
};
var main = middyfy(createProduct);
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    main,
  });
//# sourceMappingURL=handler.js.map
