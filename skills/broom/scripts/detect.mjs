#!/usr/bin/env node

// scripts/skill-detect.ts
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rgb/parseNumber.js
var parseNumber = (color, len) => {
  if (typeof color !== "number") return;
  if (len === 3) {
    return {
      mode: "rgb",
      r: (color >> 8 & 15 | color >> 4 & 240) / 255,
      g: (color >> 4 & 15 | color & 240) / 255,
      b: (color & 15 | color << 4 & 240) / 255
    };
  }
  if (len === 4) {
    return {
      mode: "rgb",
      r: (color >> 12 & 15 | color >> 8 & 240) / 255,
      g: (color >> 8 & 15 | color >> 4 & 240) / 255,
      b: (color >> 4 & 15 | color & 240) / 255,
      alpha: (color & 15 | color << 4 & 240) / 255
    };
  }
  if (len === 6) {
    return {
      mode: "rgb",
      r: (color >> 16 & 255) / 255,
      g: (color >> 8 & 255) / 255,
      b: (color & 255) / 255
    };
  }
  if (len === 8) {
    return {
      mode: "rgb",
      r: (color >> 24 & 255) / 255,
      g: (color >> 16 & 255) / 255,
      b: (color >> 8 & 255) / 255,
      alpha: (color & 255) / 255
    };
  }
};
var parseNumber_default = parseNumber;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/colors/named.js
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  // Added in CSS Colors Level 4:
  // https://drafts.csswg.org/css-color/#changes-from-3
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
var named_default = named;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rgb/parseNamed.js
var parseNamed = (color) => {
  return parseNumber_default(named_default[color.toLowerCase()], 6);
};
var parseNamed_default = parseNamed;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rgb/parseHex.js
var hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
var parseHex = (color) => {
  let match;
  return (match = color.match(hex)) ? parseNumber_default(parseInt(match[1], 16), match[1].length) : void 0;
};
var parseHex_default = parseHex;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/util/regex.js
var num = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)";
var num_none = `(?:${num}|none)`;
var per = `${num}%`;
var per_none = `(?:${num}%|none)`;
var num_per = `(?:${num}%|${num})`;
var num_per_none = `(?:${num}%|${num}|none)`;
var hue = `(?:${num}(deg|grad|rad|turn)|${num})`;
var hue_none = `(?:${num}(deg|grad|rad|turn)|${num}|none)`;
var c = `\\s*,\\s*`;
var rx_num_per_none = new RegExp("^" + num_per_none + "$");

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rgb/parseRgbLegacy.js
var rgb_num_old = new RegExp(
  `^rgba?\\(\\s*${num}${c}${num}${c}${num}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
var rgb_per_old = new RegExp(
  `^rgba?\\(\\s*${per}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
var parseRgbLegacy = (color) => {
  let res = { mode: "rgb" };
  let match;
  if (match = color.match(rgb_num_old)) {
    if (match[1] !== void 0) {
      res.r = match[1] / 255;
    }
    if (match[2] !== void 0) {
      res.g = match[2] / 255;
    }
    if (match[3] !== void 0) {
      res.b = match[3] / 255;
    }
  } else if (match = color.match(rgb_per_old)) {
    if (match[1] !== void 0) {
      res.r = match[1] / 100;
    }
    if (match[2] !== void 0) {
      res.g = match[2] / 100;
    }
    if (match[3] !== void 0) {
      res.b = match[3] / 100;
    }
  } else {
    return void 0;
  }
  if (match[4] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, match[4] / 100));
  } else if (match[5] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, +match[5]));
  }
  return res;
};
var parseRgbLegacy_default = parseRgbLegacy;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/_prepare.js
var prepare = (color, mode) => color === void 0 ? void 0 : typeof color !== "object" ? parse_default(color) : color.mode !== void 0 ? color : mode ? { ...color, mode } : void 0;
var prepare_default = prepare;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/converter.js
var converter = (target_mode = "rgb") => (color) => (color = prepare_default(color, target_mode)) !== void 0 ? (
  // if the color's mode corresponds to our target mode
  color.mode === target_mode ? (
    // then just return the color
    color
  ) : (
    // otherwise check to see if we have a dedicated
    // converter for the target mode
    converters[color.mode][target_mode] ? (
      // and return its result...
      converters[color.mode][target_mode](color)
    ) : (
      // ...otherwise pass through RGB as an intermediary step.
      // if the target mode is RGB...
      target_mode === "rgb" ? (
        // just return the RGB
        converters[color.mode].rgb(color)
      ) : (
        // otherwise convert color.mode -> RGB -> target_mode
        converters.rgb[target_mode](converters[color.mode].rgb(color))
      )
    )
  )
) : void 0;
var converter_default = converter;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/modes.js
var converters = {};
var modes = {};
var parsers = [];
var colorProfiles = {};
var identity = (v) => v;
var useMode = (definition29) => {
  converters[definition29.mode] = {
    ...converters[definition29.mode],
    ...definition29.toMode
  };
  Object.keys(definition29.fromMode || {}).forEach((k4) => {
    if (!converters[k4]) {
      converters[k4] = {};
    }
    converters[k4][definition29.mode] = definition29.fromMode[k4];
  });
  if (!definition29.ranges) {
    definition29.ranges = {};
  }
  if (!definition29.difference) {
    definition29.difference = {};
  }
  definition29.channels.forEach((channel2) => {
    if (definition29.ranges[channel2] === void 0) {
      definition29.ranges[channel2] = [0, 1];
    }
    if (!definition29.interpolate[channel2]) {
      throw new Error(`Missing interpolator for: ${channel2}`);
    }
    if (typeof definition29.interpolate[channel2] === "function") {
      definition29.interpolate[channel2] = {
        use: definition29.interpolate[channel2]
      };
    }
    if (!definition29.interpolate[channel2].fixup) {
      definition29.interpolate[channel2].fixup = identity;
    }
  });
  modes[definition29.mode] = definition29;
  (definition29.parse || []).forEach((parser) => {
    useParser(parser, definition29.mode);
  });
  return converter_default(definition29.mode);
};
var getMode = (mode) => modes[mode];
var useParser = (parser, mode) => {
  if (typeof parser === "string") {
    if (!mode) {
      throw new Error(`'mode' required when 'parser' is a string`);
    }
    colorProfiles[parser] = mode;
  } else if (typeof parser === "function") {
    if (parsers.indexOf(parser) < 0) {
      parsers.push(parser);
    }
  }
};

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/parse.js
var IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/;
var IdentCodePoint = /[^\x00-\x7F]|[-\w]/;
var Tok = {
  Function: "function",
  Ident: "ident",
  Number: "number",
  Percentage: "percentage",
  ParenClose: ")",
  None: "none",
  Hue: "hue",
  Alpha: "alpha"
};
var _i = 0;
function is_num(chars) {
  let ch = chars[_i];
  let ch1 = chars[_i + 1];
  if (ch === "-" || ch === "+") {
    return /\d/.test(ch1) || ch1 === "." && /\d/.test(chars[_i + 2]);
  }
  if (ch === ".") {
    return /\d/.test(ch1);
  }
  return /\d/.test(ch);
}
function is_ident(chars) {
  if (_i >= chars.length) {
    return false;
  }
  let ch = chars[_i];
  if (IdentStartCodePoint.test(ch)) {
    return true;
  }
  if (ch === "-") {
    if (chars.length - _i < 2) {
      return false;
    }
    let ch1 = chars[_i + 1];
    if (ch1 === "-" || IdentStartCodePoint.test(ch1)) {
      return true;
    }
    return false;
  }
  return false;
}
var huenits = {
  deg: 1,
  rad: 180 / Math.PI,
  grad: 9 / 10,
  turn: 360
};
function num2(chars) {
  let value = "";
  if (chars[_i] === "-" || chars[_i] === "+") {
    value += chars[_i++];
  }
  value += digits(chars);
  if (chars[_i] === "." && /\d/.test(chars[_i + 1])) {
    value += chars[_i++] + digits(chars);
  }
  if (chars[_i] === "e" || chars[_i] === "E") {
    if ((chars[_i + 1] === "-" || chars[_i + 1] === "+") && /\d/.test(chars[_i + 2])) {
      value += chars[_i++] + chars[_i++] + digits(chars);
    } else if (/\d/.test(chars[_i + 1])) {
      value += chars[_i++] + digits(chars);
    }
  }
  if (is_ident(chars)) {
    let id = ident(chars);
    if (id === "deg" || id === "rad" || id === "turn" || id === "grad") {
      return { type: Tok.Hue, value: value * huenits[id] };
    }
    return void 0;
  }
  if (chars[_i] === "%") {
    _i++;
    return { type: Tok.Percentage, value: +value };
  }
  return { type: Tok.Number, value: +value };
}
function digits(chars) {
  let v = "";
  while (/\d/.test(chars[_i])) {
    v += chars[_i++];
  }
  return v;
}
function ident(chars) {
  let v = "";
  while (_i < chars.length && IdentCodePoint.test(chars[_i])) {
    v += chars[_i++];
  }
  return v;
}
function identlike(chars) {
  let v = ident(chars);
  if (chars[_i] === "(") {
    _i++;
    return { type: Tok.Function, value: v };
  }
  if (v === "none") {
    return { type: Tok.None, value: void 0 };
  }
  return { type: Tok.Ident, value: v };
}
function tokenize(str = "") {
  let chars = str.trim();
  let tokens = [];
  let ch;
  _i = 0;
  while (_i < chars.length) {
    ch = chars[_i++];
    if (ch === "\n" || ch === "	" || ch === " ") {
      while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
        _i++;
      }
      continue;
    }
    if (ch === ",") {
      return void 0;
    }
    if (ch === ")") {
      tokens.push({ type: Tok.ParenClose });
      continue;
    }
    if (ch === "+") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num2(chars));
        continue;
      }
      return void 0;
    }
    if (ch === "-") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num2(chars));
        continue;
      }
      if (is_ident(chars)) {
        tokens.push({ type: Tok.Ident, value: ident(chars) });
        continue;
      }
      return void 0;
    }
    if (ch === ".") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num2(chars));
        continue;
      }
      return void 0;
    }
    if (ch === "/") {
      while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
        _i++;
      }
      let alpha;
      if (is_num(chars)) {
        alpha = num2(chars);
        if (alpha.type !== Tok.Hue) {
          tokens.push({ type: Tok.Alpha, value: alpha });
          continue;
        }
      }
      if (is_ident(chars)) {
        if (ident(chars) === "none") {
          tokens.push({
            type: Tok.Alpha,
            value: { type: Tok.None, value: void 0 }
          });
          continue;
        }
      }
      return void 0;
    }
    if (/\d/.test(ch)) {
      _i--;
      tokens.push(num2(chars));
      continue;
    }
    if (IdentStartCodePoint.test(ch)) {
      _i--;
      tokens.push(identlike(chars));
      continue;
    }
    return void 0;
  }
  return tokens;
}
function parseColorSyntax(tokens) {
  tokens._i = 0;
  let token = tokens[tokens._i++];
  if (!token || token.type !== Tok.Function || token.value !== "color") {
    return void 0;
  }
  token = tokens[tokens._i++];
  if (token.type !== Tok.Ident) {
    return void 0;
  }
  const mode = colorProfiles[token.value];
  if (!mode) {
    return void 0;
  }
  const res = { mode };
  const coords = consumeCoords(tokens, false);
  if (!coords) {
    return void 0;
  }
  const channels = getMode(mode).channels;
  for (let ii = 0, c2, ch; ii < channels.length; ii++) {
    c2 = coords[ii];
    ch = channels[ii];
    if (c2.type !== Tok.None) {
      res[ch] = c2.type === Tok.Number ? c2.value : c2.value / 100;
      if (ch === "alpha") {
        res[ch] = Math.max(0, Math.min(1, res[ch]));
      }
    }
  }
  return res;
}
function consumeCoords(tokens, includeHue) {
  const coords = [];
  let token;
  while (tokens._i < tokens.length) {
    token = tokens[tokens._i++];
    if (token.type === Tok.None || token.type === Tok.Number || token.type === Tok.Alpha || token.type === Tok.Percentage || includeHue && token.type === Tok.Hue) {
      coords.push(token);
      continue;
    }
    if (token.type === Tok.ParenClose) {
      if (tokens._i < tokens.length) {
        return void 0;
      }
      continue;
    }
    return void 0;
  }
  if (coords.length < 3 || coords.length > 4) {
    return void 0;
  }
  if (coords.length === 4) {
    if (coords[3].type !== Tok.Alpha) {
      return void 0;
    }
    coords[3] = coords[3].value;
  }
  if (coords.length === 3) {
    coords.push({ type: Tok.None, value: void 0 });
  }
  return coords.every((c2) => c2.type !== Tok.Alpha) ? coords : void 0;
}
function parseModernSyntax(tokens, includeHue) {
  tokens._i = 0;
  let token = tokens[tokens._i++];
  if (!token || token.type !== Tok.Function) {
    return void 0;
  }
  let coords = consumeCoords(tokens, includeHue);
  if (!coords) {
    return void 0;
  }
  coords.unshift(token.value);
  return coords;
}
var parse = (color) => {
  if (typeof color !== "string") {
    return void 0;
  }
  const tokens = tokenize(color);
  const parsed = tokens ? parseModernSyntax(tokens, true) : void 0;
  let result2 = void 0;
  let i = 0;
  let len = parsers.length;
  while (i < len) {
    if ((result2 = parsers[i++](color, parsed)) !== void 0) {
      return result2;
    }
  }
  return tokens ? parseColorSyntax(tokens) : void 0;
};
var parse_default = parse;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rgb/parseRgb.js
function parseRgb(color, parsed) {
  if (!parsed || parsed[0] !== "rgb" && parsed[0] !== "rgba") {
    return void 0;
  }
  const res = { mode: "rgb" };
  const [, r2, g, b, alpha] = parsed;
  if (r2.type === Tok.Hue || g.type === Tok.Hue || b.type === Tok.Hue) {
    return void 0;
  }
  if (r2.type !== Tok.None) {
    res.r = r2.type === Tok.Number ? r2.value / 255 : r2.value / 100;
  }
  if (g.type !== Tok.None) {
    res.g = g.type === Tok.Number ? g.value / 255 : g.value / 100;
  }
  if (b.type !== Tok.None) {
    res.b = b.type === Tok.Number ? b.value / 255 : b.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
var parseRgb_default = parseRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rgb/parseTransparent.js
var parseTransparent = (c2) => c2 === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0;
var parseTransparent_default = parseTransparent;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/interpolate/lerp.js
var lerp = (a, b, t) => a + t * (b - a);

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/interpolate/piecewise.js
var get_classes = (arr) => {
  let classes = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let a = arr[i];
    let b = arr[i + 1];
    if (a === void 0 && b === void 0) {
      classes.push(void 0);
    } else if (a !== void 0 && b !== void 0) {
      classes.push([a, b]);
    } else {
      classes.push(a !== void 0 ? [a, a] : [b, b]);
    }
  }
  return classes;
};
var interpolatorPiecewise = (interpolator) => (arr) => {
  let classes = get_classes(arr);
  return (t) => {
    let cls = t * classes.length;
    let idx = t >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
    let pair = classes[idx];
    return pair === void 0 ? void 0 : interpolator(pair[0], pair[1], cls - idx);
  };
};

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/interpolate/linear.js
var interpolatorLinear = interpolatorPiecewise(lerp);

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/fixup/alpha.js
var fixupAlpha = (arr) => {
  let some_defined = false;
  let res = arr.map((v) => {
    if (v !== void 0) {
      some_defined = true;
      return v;
    }
    return 1;
  });
  return some_defined ? res : arr;
};

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rgb/definition.js
var definition = {
  mode: "rgb",
  channels: ["r", "g", "b", "alpha"],
  parse: [
    parseRgb_default,
    parseHex_default,
    parseRgbLegacy_default,
    parseNamed_default,
    parseTransparent_default,
    "srgb"
  ],
  serialize: "srgb",
  interpolate: {
    r: interpolatorLinear,
    g: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  gamut: true,
  white: { r: 1, g: 1, b: 1 },
  black: { r: 0, g: 0, b: 0 }
};
var definition_default = definition;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/a98/convertA98ToXyz65.js
var linearize = (v = 0) => Math.pow(Math.abs(v), 563 / 256) * Math.sign(v);
var convertA98ToXyz65 = (a982) => {
  let r2 = linearize(a982.r);
  let g = linearize(a982.g);
  let b = linearize(a982.b);
  let res = {
    mode: "xyz65",
    x: 0.5766690429101305 * r2 + 0.1855582379065463 * g + 0.1882286462349947 * b,
    y: 0.297344975250536 * r2 + 0.6273635662554661 * g + 0.0752914584939979 * b,
    z: 0.0270313613864123 * r2 + 0.0706888525358272 * g + 0.9913375368376386 * b
  };
  if (a982.alpha !== void 0) {
    res.alpha = a982.alpha;
  }
  return res;
};
var convertA98ToXyz65_default = convertA98ToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/a98/convertXyz65ToA98.js
var gamma = (v) => Math.pow(Math.abs(v), 256 / 563) * Math.sign(v);
var convertXyz65ToA98 = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = {
    mode: "a98",
    r: gamma(
      x * 2.0415879038107465 - y * 0.5650069742788597 - 0.3447313507783297 * z
    ),
    g: gamma(
      x * -0.9692436362808798 + y * 1.8759675015077206 + 0.0415550574071756 * z
    ),
    b: gamma(
      x * 0.0134442806320312 - y * 0.1183623922310184 + 1.0151749943912058 * z
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToA98_default = convertXyz65ToA98;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lrgb/convertRgbToLrgb.js
var fn = (c2 = 0) => {
  const abs2 = Math.abs(c2);
  if (abs2 <= 0.04045) {
    return c2 / 12.92;
  }
  return (Math.sign(c2) || 1) * Math.pow((abs2 + 0.055) / 1.055, 2.4);
};
var convertRgbToLrgb = ({ r: r2, g, b, alpha }) => {
  let res = {
    mode: "lrgb",
    r: fn(r2),
    g: fn(g),
    b: fn(b)
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertRgbToLrgb_default = convertRgbToLrgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz65/convertRgbToXyz65.js
var convertRgbToXyz65 = (rgb5) => {
  let { r: r2, g, b, alpha } = convertRgbToLrgb_default(rgb5);
  let res = {
    mode: "xyz65",
    x: 0.4123907992659593 * r2 + 0.357584339383878 * g + 0.1804807884018343 * b,
    y: 0.2126390058715102 * r2 + 0.715168678767756 * g + 0.0721923153607337 * b,
    z: 0.0193308187155918 * r2 + 0.119194779794626 * g + 0.9505321522496607 * b
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToXyz65_default = convertRgbToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lrgb/convertLrgbToRgb.js
var fn2 = (c2 = 0) => {
  const abs2 = Math.abs(c2);
  if (abs2 > 31308e-7) {
    return (Math.sign(c2) || 1) * (1.055 * Math.pow(abs2, 1 / 2.4) - 0.055);
  }
  return c2 * 12.92;
};
var convertLrgbToRgb = ({ r: r2, g, b, alpha }, mode = "rgb") => {
  let res = {
    mode,
    r: fn2(r2),
    g: fn2(g),
    b: fn2(b)
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertLrgbToRgb_default = convertLrgbToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz65/convertXyz65ToRgb.js
var convertXyz65ToRgb = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = convertLrgbToRgb_default({
    r: x * 3.2409699419045226 - y * 1.537383177570094 - 0.4986107602930034 * z,
    g: x * -0.9692436362808796 + y * 1.8759675015077204 + 0.0415550574071756 * z,
    b: x * 0.0556300796969936 - y * 0.2039769588889765 + 1.0569715142428784 * z
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToRgb_default = convertXyz65ToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/a98/definition.js
var definition2 = {
  ...definition_default,
  mode: "a98",
  parse: ["a98-rgb"],
  serialize: "a98-rgb",
  fromMode: {
    rgb: (color) => convertXyz65ToA98_default(convertRgbToXyz65_default(color)),
    xyz65: convertXyz65ToA98_default
  },
  toMode: {
    rgb: (color) => convertXyz65ToRgb_default(convertA98ToXyz65_default(color)),
    xyz65: convertA98ToXyz65_default
  }
};
var definition_default2 = definition2;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/util/normalizeHue.js
var normalizeHue = (hue3) => (hue3 = hue3 % 360) < 0 ? hue3 + 360 : hue3;
var normalizeHue_default = normalizeHue;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/fixup/hue.js
var hue2 = (hues, fn5) => {
  return hues.map((hue3, idx, arr) => {
    if (hue3 === void 0) {
      return hue3;
    }
    let normalized = normalizeHue_default(hue3);
    if (idx === 0 || hues[idx - 1] === void 0) {
      return normalized;
    }
    return fn5(normalized - normalizeHue_default(arr[idx - 1]));
  }).reduce((acc, curr) => {
    if (!acc.length || curr === void 0 || acc[acc.length - 1] === void 0) {
      acc.push(curr);
      return acc;
    }
    acc.push(curr + acc[acc.length - 1]);
    return acc;
  }, []);
};
var fixupHueShorter = (arr) => hue2(arr, (d) => Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d));

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/cubehelix/constants.js
var M = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0];
var degToRad = Math.PI / 180;
var radToDeg = 180 / Math.PI;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/cubehelix/convertRgbToCubehelix.js
var DE = M[3] * M[4];
var BE = M[1] * M[4];
var BCAD = M[1] * M[2] - M[0] * M[3];
var convertRgbToCubehelix = ({ r: r2, g, b, alpha }) => {
  if (r2 === void 0) r2 = 0;
  if (g === void 0) g = 0;
  if (b === void 0) b = 0;
  let l = (BCAD * b + r2 * DE - g * BE) / (BCAD + DE - BE);
  let x = b - l;
  let y = (M[4] * (g - l) - M[2] * x) / M[3];
  let res = {
    mode: "cubehelix",
    l,
    s: l === 0 || l === 1 ? void 0 : Math.sqrt(x * x + y * y) / (M[4] * l * (1 - l))
  };
  if (res.s) res.h = Math.atan2(y, x) * radToDeg - 120;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertRgbToCubehelix_default = convertRgbToCubehelix;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/cubehelix/convertCubehelixToRgb.js
var convertCubehelixToRgb = ({ h, s, l, alpha }) => {
  let res = { mode: "rgb" };
  h = (h === void 0 ? 0 : h + 120) * degToRad;
  if (l === void 0) l = 0;
  let amp = s === void 0 ? 0 : s * l * (1 - l);
  let cosh = Math.cos(h);
  let sinh = Math.sin(h);
  res.r = l + amp * (M[0] * cosh + M[1] * sinh);
  res.g = l + amp * (M[2] * cosh + M[3] * sinh);
  res.b = l + amp * (M[4] * cosh + M[5] * sinh);
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertCubehelixToRgb_default = convertCubehelixToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/difference.js
var differenceHueSaturation = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s) {
    return 0;
  }
  let std_h = normalizeHue_default(std.h);
  let smp_h = normalizeHue_default(smp.h);
  let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(std.s * smp.s) * dH;
};
var differenceHueNaive = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0) {
    return 0;
  }
  let std_h = normalizeHue_default(std.h);
  let smp_h = normalizeHue_default(smp.h);
  if (Math.abs(smp_h - std_h) > 180) {
    return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
  }
  return smp_h - std_h;
};
var differenceHueChroma = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c) {
    return 0;
  }
  let std_h = normalizeHue_default(std.h);
  let smp_h = normalizeHue_default(smp.h);
  let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(std.c * smp.c) * dH;
};

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/average.js
var averageAngle = (val) => {
  let sum = val.reduce(
    (sum2, val2) => {
      if (val2 !== void 0) {
        let rad = val2 * Math.PI / 180;
        sum2.sin += Math.sin(rad);
        sum2.cos += Math.cos(rad);
      }
      return sum2;
    },
    { sin: 0, cos: 0 }
  );
  let angle = Math.atan2(sum.sin, sum.cos) * 180 / Math.PI;
  return angle < 0 ? 360 + angle : angle;
};

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/cubehelix/definition.js
var definition3 = {
  mode: "cubehelix",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--cubehelix"],
  serialize: "--cubehelix",
  ranges: {
    h: [0, 360],
    s: [0, 4.614],
    l: [0, 1]
  },
  fromMode: {
    rgb: convertRgbToCubehelix_default
  },
  toMode: {
    rgb: convertCubehelixToRgb_default
  },
  interpolate: {
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter
    },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
var definition_default3 = definition3;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lch/convertLabToLch.js
var convertLabToLch = ({ l, a, b, alpha }, mode = "lch") => {
  if (a === void 0) a = 0;
  if (b === void 0) b = 0;
  let c2 = Math.sqrt(a * a + b * b);
  let res = { mode, l, c: c2 };
  if (c2) res.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertLabToLch_default = convertLabToLch;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lch/convertLchToLab.js
var convertLchToLab = ({ l, c: c2, h, alpha }, mode = "lab") => {
  if (h === void 0) h = 0;
  let res = {
    mode,
    l,
    a: c2 ? c2 * Math.cos(h / 180 * Math.PI) : 0,
    b: c2 ? c2 * Math.sin(h / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertLchToLab_default = convertLchToLab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz65/constants.js
var k = Math.pow(29, 3) / Math.pow(3, 3);
var e = Math.pow(6, 3) / Math.pow(29, 3);

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/constants.js
var D50 = {
  X: 0.3457 / 0.3585,
  Y: 1,
  Z: (1 - 0.3457 - 0.3585) / 0.3585
};
var D65 = {
  X: 0.3127 / 0.329,
  Y: 1,
  Z: (1 - 0.3127 - 0.329) / 0.329
};
var k2 = Math.pow(29, 3) / Math.pow(3, 3);
var e2 = Math.pow(6, 3) / Math.pow(29, 3);

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab65/convertLab65ToXyz65.js
var fn3 = (v) => Math.pow(v, 3) > e ? Math.pow(v, 3) : (116 * v - 16) / k;
var convertLab65ToXyz65 = ({ l, a, b, alpha }) => {
  if (l === void 0) l = 0;
  if (a === void 0) a = 0;
  if (b === void 0) b = 0;
  let fy = (l + 16) / 116;
  let fx = a / 500 + fy;
  let fz = fy - b / 200;
  let res = {
    mode: "xyz65",
    x: fn3(fx) * D65.X,
    y: fn3(fy) * D65.Y,
    z: fn3(fz) * D65.Z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLab65ToXyz65_default = convertLab65ToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab65/convertLab65ToRgb.js
var convertLab65ToRgb = (lab2) => convertXyz65ToRgb_default(convertLab65ToXyz65_default(lab2));
var convertLab65ToRgb_default = convertLab65ToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab65/convertXyz65ToLab65.js
var f = (value) => value > e ? Math.cbrt(value) : (k * value + 16) / 116;
var convertXyz65ToLab65 = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let f0 = f(x / D65.X);
  let f1 = f(y / D65.Y);
  let f22 = f(z / D65.Z);
  let res = {
    mode: "lab65",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f22)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToLab65_default = convertXyz65ToLab65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab65/convertRgbToLab65.js
var convertRgbToLab65 = (rgb5) => {
  let res = convertXyz65ToLab65_default(convertRgbToXyz65_default(rgb5));
  if (rgb5.r === rgb5.b && rgb5.b === rgb5.g) {
    res.a = res.b = 0;
  }
  return res;
};
var convertRgbToLab65_default = convertRgbToLab65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/dlch/constants.js
var kE = 1;
var kCH = 1;
var \u03B8 = 26 / 180 * Math.PI;
var cos\u03B8 = Math.cos(\u03B8);
var sin\u03B8 = Math.sin(\u03B8);
var factor = 100 / Math.log(139 / 100);

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/dlch/convertDlchToLab65.js
var convertDlchToLab65 = ({ l, c: c2, h, alpha }) => {
  if (l === void 0) l = 0;
  if (c2 === void 0) c2 = 0;
  if (h === void 0) h = 0;
  let res = {
    mode: "lab65",
    l: (Math.exp(l * kE / factor) - 1) / 39e-4
  };
  let G = (Math.exp(0.0435 * c2 * kCH * kE) - 1) / 0.075;
  let e4 = G * Math.cos(h / 180 * Math.PI - \u03B8);
  let f3 = G * Math.sin(h / 180 * Math.PI - \u03B8);
  res.a = e4 * cos\u03B8 - f3 / 0.83 * sin\u03B8;
  res.b = e4 * sin\u03B8 + f3 / 0.83 * cos\u03B8;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertDlchToLab65_default = convertDlchToLab65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/dlch/convertLab65ToDlch.js
var convertLab65ToDlch = ({ l, a, b, alpha }) => {
  if (l === void 0) l = 0;
  if (a === void 0) a = 0;
  if (b === void 0) b = 0;
  let e4 = a * cos\u03B8 + b * sin\u03B8;
  let f3 = 0.83 * (b * cos\u03B8 - a * sin\u03B8);
  let G = Math.sqrt(e4 * e4 + f3 * f3);
  let res = {
    mode: "dlch",
    l: factor / kE * Math.log(1 + 39e-4 * l),
    c: Math.log(1 + 0.075 * G) / (0.0435 * kCH * kE)
  };
  if (res.c) {
    res.h = normalizeHue_default((Math.atan2(f3, e4) + \u03B8) / Math.PI * 180);
  }
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertLab65ToDlch_default = convertLab65ToDlch;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/dlab/definition.js
var convertDlabToLab65 = (c2) => convertDlchToLab65_default(convertLabToLch_default(c2, "dlch"));
var convertLab65ToDlab = (c2) => convertLchToLab_default(convertLab65ToDlch_default(c2), "dlab");
var definition4 = {
  mode: "dlab",
  parse: ["--din99o-lab"],
  serialize: "--din99o-lab",
  toMode: {
    lab65: convertDlabToLab65,
    rgb: (c2) => convertLab65ToRgb_default(convertDlabToLab65(c2))
  },
  fromMode: {
    lab65: convertLab65ToDlab,
    rgb: (c2) => convertLab65ToDlab(convertRgbToLab65_default(c2))
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-40.09, 45.501],
    b: [-40.469, 44.344]
  },
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  }
};
var definition_default4 = definition4;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/dlch/definition.js
var definition5 = {
  mode: "dlch",
  parse: ["--din99o-lch"],
  serialize: "--din99o-lch",
  toMode: {
    lab65: convertDlchToLab65_default,
    dlab: (c2) => convertLchToLab_default(c2, "dlab"),
    rgb: (c2) => convertLab65ToRgb_default(convertDlchToLab65_default(c2))
  },
  fromMode: {
    lab65: convertLab65ToDlch_default,
    dlab: (c2) => convertLabToLch_default(c2, "dlch"),
    rgb: (c2) => convertLab65ToDlch_default(convertRgbToLab65_default(c2))
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 51.484],
    h: [0, 360]
  },
  interpolate: {
    l: interpolatorLinear,
    c: interpolatorLinear,
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter
    },
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
var definition_default5 = definition5;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsi/convertHsiToRgb.js
function convertHsiToRgb({ h, s, i, alpha }) {
  h = normalizeHue_default(h !== void 0 ? h : 0);
  if (s === void 0) s = 0;
  if (i === void 0) i = 0;
  let f3 = Math.abs(h / 60 % 2 - 1);
  let res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = {
        r: i * (1 + s * (3 / (2 - f3) - 1)),
        g: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
        b: i * (1 - s)
      };
      break;
    case 1:
      res = {
        r: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
        g: i * (1 + s * (3 / (2 - f3) - 1)),
        b: i * (1 - s)
      };
      break;
    case 2:
      res = {
        r: i * (1 - s),
        g: i * (1 + s * (3 / (2 - f3) - 1)),
        b: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1))
      };
      break;
    case 3:
      res = {
        r: i * (1 - s),
        g: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
        b: i * (1 + s * (3 / (2 - f3) - 1))
      };
      break;
    case 4:
      res = {
        r: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
        g: i * (1 - s),
        b: i * (1 + s * (3 / (2 - f3) - 1))
      };
      break;
    case 5:
      res = {
        r: i * (1 + s * (3 / (2 - f3) - 1)),
        g: i * (1 - s),
        b: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1))
      };
      break;
    default:
      res = { r: i * (1 - s), g: i * (1 - s), b: i * (1 - s) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsi/convertRgbToHsi.js
function convertRgbToHsi({ r: r2, g, b, alpha }) {
  if (r2 === void 0) r2 = 0;
  if (g === void 0) g = 0;
  if (b === void 0) b = 0;
  let M4 = Math.max(r2, g, b), m = Math.min(r2, g, b);
  let res = {
    mode: "hsi",
    s: r2 + g + b === 0 ? 0 : 1 - 3 * m / (r2 + g + b),
    i: (r2 + g + b) / 3
  };
  if (M4 - m !== 0)
    res.h = (M4 === r2 ? (g - b) / (M4 - m) + (g < b) * 6 : M4 === g ? (b - r2) / (M4 - m) + 2 : (r2 - g) / (M4 - m) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsi/definition.js
var definition6 = {
  mode: "hsi",
  toMode: {
    rgb: convertHsiToRgb
  },
  parse: ["--hsi"],
  serialize: "--hsi",
  fromMode: {
    rgb: convertRgbToHsi
  },
  channels: ["h", "s", "i", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    i: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
var definition_default6 = definition6;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsl/convertHslToRgb.js
function convertHslToRgb({ h, s, l, alpha }) {
  h = normalizeHue_default(h !== void 0 ? h : 0);
  if (s === void 0) s = 0;
  if (l === void 0) l = 0;
  let m1 = l + s * (l < 0.5 ? l : 1 - l);
  let m2 = m1 - (m1 - l) * 2 * Math.abs(h / 60 % 2 - 1);
  let res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = { r: m1, g: m2, b: 2 * l - m1 };
      break;
    case 1:
      res = { r: m2, g: m1, b: 2 * l - m1 };
      break;
    case 2:
      res = { r: 2 * l - m1, g: m1, b: m2 };
      break;
    case 3:
      res = { r: 2 * l - m1, g: m2, b: m1 };
      break;
    case 4:
      res = { r: m2, g: 2 * l - m1, b: m1 };
      break;
    case 5:
      res = { r: m1, g: 2 * l - m1, b: m2 };
      break;
    default:
      res = { r: 2 * l - m1, g: 2 * l - m1, b: 2 * l - m1 };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsl/convertRgbToHsl.js
function convertRgbToHsl({ r: r2, g, b, alpha }) {
  if (r2 === void 0) r2 = 0;
  if (g === void 0) g = 0;
  if (b === void 0) b = 0;
  let M4 = Math.max(r2, g, b), m = Math.min(r2, g, b);
  let res = {
    mode: "hsl",
    s: M4 === m ? 0 : (M4 - m) / (1 - Math.abs(M4 + m - 1)),
    l: 0.5 * (M4 + m)
  };
  if (M4 - m !== 0)
    res.h = (M4 === r2 ? (g - b) / (M4 - m) + (g < b) * 6 : M4 === g ? (b - r2) / (M4 - m) + 2 : (r2 - g) / (M4 - m) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/util/hue.js
var hueToDeg = (val, unit) => {
  switch (unit) {
    case "deg":
      return +val;
    case "rad":
      return val / Math.PI * 180;
    case "grad":
      return val / 10 * 9;
    case "turn":
      return val * 360;
  }
};
var hue_default = hueToDeg;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsl/parseHslLegacy.js
var hsl_old = new RegExp(
  `^hsla?\\(\\s*${hue}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
var parseHslLegacy = (color) => {
  let match = color.match(hsl_old);
  if (!match) return;
  let res = { mode: "hsl" };
  if (match[3] !== void 0) {
    res.h = +match[3];
  } else if (match[1] !== void 0 && match[2] !== void 0) {
    res.h = hue_default(match[1], match[2]);
  }
  if (match[4] !== void 0) {
    res.s = Math.min(Math.max(0, match[4] / 100), 1);
  }
  if (match[5] !== void 0) {
    res.l = Math.min(Math.max(0, match[5] / 100), 1);
  }
  if (match[6] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, match[6] / 100));
  } else if (match[7] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, +match[7]));
  }
  return res;
};
var parseHslLegacy_default = parseHslLegacy;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsl/parseHsl.js
function parseHsl(color, parsed) {
  if (!parsed || parsed[0] !== "hsl" && parsed[0] !== "hsla") {
    return void 0;
  }
  const res = { mode: "hsl" };
  const [, h, s, l, alpha] = parsed;
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (s.type !== Tok.None) {
    if (s.type === Tok.Hue) {
      return void 0;
    }
    res.s = s.value / 100;
  }
  if (l.type !== Tok.None) {
    if (l.type === Tok.Hue) {
      return void 0;
    }
    res.l = l.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
var parseHsl_default = parseHsl;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsl/definition.js
var definition7 = {
  mode: "hsl",
  toMode: {
    rgb: convertHslToRgb
  },
  fromMode: {
    rgb: convertRgbToHsl
  },
  channels: ["h", "s", "l", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [parseHsl_default, parseHslLegacy_default],
  serialize: (c2) => `hsl(${c2.h !== void 0 ? c2.h : "none"} ${c2.s !== void 0 ? c2.s * 100 + "%" : "none"} ${c2.l !== void 0 ? c2.l * 100 + "%" : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
var definition_default7 = definition7;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsv/convertHsvToRgb.js
function convertHsvToRgb({ h, s, v, alpha }) {
  h = normalizeHue_default(h !== void 0 ? h : 0);
  if (s === void 0) s = 0;
  if (v === void 0) v = 0;
  let f3 = Math.abs(h / 60 % 2 - 1);
  let res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = { r: v, g: v * (1 - s * f3), b: v * (1 - s) };
      break;
    case 1:
      res = { r: v * (1 - s * f3), g: v, b: v * (1 - s) };
      break;
    case 2:
      res = { r: v * (1 - s), g: v, b: v * (1 - s * f3) };
      break;
    case 3:
      res = { r: v * (1 - s), g: v * (1 - s * f3), b: v };
      break;
    case 4:
      res = { r: v * (1 - s * f3), g: v * (1 - s), b: v };
      break;
    case 5:
      res = { r: v, g: v * (1 - s), b: v * (1 - s * f3) };
      break;
    default:
      res = { r: v * (1 - s), g: v * (1 - s), b: v * (1 - s) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsv/convertRgbToHsv.js
function convertRgbToHsv({ r: r2, g, b, alpha }) {
  if (r2 === void 0) r2 = 0;
  if (g === void 0) g = 0;
  if (b === void 0) b = 0;
  let M4 = Math.max(r2, g, b), m = Math.min(r2, g, b);
  let res = {
    mode: "hsv",
    s: M4 === 0 ? 0 : 1 - m / M4,
    v: M4
  };
  if (M4 - m !== 0)
    res.h = (M4 === r2 ? (g - b) / (M4 - m) + (g < b) * 6 : M4 === g ? (b - r2) / (M4 - m) + 2 : (r2 - g) / (M4 - m) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hsv/definition.js
var definition8 = {
  mode: "hsv",
  toMode: {
    rgb: convertHsvToRgb
  },
  parse: ["--hsv"],
  serialize: "--hsv",
  fromMode: {
    rgb: convertRgbToHsv
  },
  channels: ["h", "s", "v", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
var definition_default8 = definition8;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hwb/convertHwbToRgb.js
function convertHwbToRgb({ h, w, b, alpha }) {
  if (w === void 0) w = 0;
  if (b === void 0) b = 0;
  if (w + b > 1) {
    let s = w + b;
    w /= s;
    b /= s;
  }
  return convertHsvToRgb({
    h,
    s: b === 1 ? 1 : 1 - w / (1 - b),
    v: 1 - b,
    alpha
  });
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hwb/convertRgbToHwb.js
function convertRgbToHwb(rgba) {
  let hsv2 = convertRgbToHsv(rgba);
  if (hsv2 === void 0) return void 0;
  let s = hsv2.s !== void 0 ? hsv2.s : 0;
  let v = hsv2.v !== void 0 ? hsv2.v : 0;
  let res = {
    mode: "hwb",
    w: (1 - s) * v,
    b: 1 - v
  };
  if (hsv2.h !== void 0) res.h = hsv2.h;
  if (hsv2.alpha !== void 0) res.alpha = hsv2.alpha;
  return res;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hwb/parseHwb.js
function ParseHwb(color, parsed) {
  if (!parsed || parsed[0] !== "hwb") {
    return void 0;
  }
  const res = { mode: "hwb" };
  const [, h, w, b, alpha] = parsed;
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (w.type !== Tok.None) {
    if (w.type === Tok.Hue) {
      return void 0;
    }
    res.w = w.value / 100;
  }
  if (b.type !== Tok.None) {
    if (b.type === Tok.Hue) {
      return void 0;
    }
    res.b = b.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
var parseHwb_default = ParseHwb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hwb/definition.js
var definition9 = {
  mode: "hwb",
  toMode: {
    rgb: convertHwbToRgb
  },
  fromMode: {
    rgb: convertRgbToHwb
  },
  channels: ["h", "w", "b", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [parseHwb_default],
  serialize: (c2) => `hwb(${c2.h !== void 0 ? c2.h : "none"} ${c2.w !== void 0 ? c2.w * 100 + "%" : "none"} ${c2.b !== void 0 ? c2.b * 100 + "%" : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    w: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueNaive
  },
  average: {
    h: averageAngle
  }
};
var definition_default9 = definition9;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hdr/constants.js
var YW = 203;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/hdr/transfer.js
var M1 = 0.1593017578125;
var M2 = 78.84375;
var C1 = 0.8359375;
var C2 = 18.8515625;
var C3 = 18.6875;
function transferPqDecode(v) {
  if (v < 0) return 0;
  const c2 = Math.pow(v, 1 / M2);
  return 1e4 * Math.pow(Math.max(0, c2 - C1) / (C2 - C3 * c2), 1 / M1);
}
function transferPqEncode(v) {
  if (v < 0) return 0;
  const c2 = Math.pow(v / 1e4, M1);
  return Math.pow((C1 + C2 * c2) / (1 + C3 * c2), M2);
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/itp/convertItpToXyz65.js
var toRel = (c2) => Math.max(c2 / YW, 0);
var convertItpToXyz65 = ({ i, t, p: p4, alpha }) => {
  if (i === void 0) i = 0;
  if (t === void 0) t = 0;
  if (p4 === void 0) p4 = 0;
  const l = transferPqDecode(
    i + 0.008609037037932761 * t + 0.11102962500302593 * p4
  );
  const m = transferPqDecode(
    i - 0.00860903703793275 * t - 0.11102962500302599 * p4
  );
  const s = transferPqDecode(
    i + 0.5600313357106791 * t - 0.32062717498731885 * p4
  );
  const res = {
    mode: "xyz65",
    x: toRel(
      2.070152218389422 * l - 1.3263473389671556 * m + 0.2066510476294051 * s
    ),
    y: toRel(
      0.3647385209748074 * l + 0.680566024947227 * m - 0.0453045459220346 * s
    ),
    z: toRel(
      -0.049747207535812 * l - 0.0492609666966138 * m + 1.1880659249923042 * s
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertItpToXyz65_default = convertItpToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/itp/convertXyz65ToItp.js
var toAbs = (c2 = 0) => Math.max(c2 * YW, 0);
var convertXyz65ToItp = ({ x, y, z, alpha }) => {
  const absX = toAbs(x);
  const absY = toAbs(y);
  const absZ = toAbs(z);
  const l = transferPqEncode(
    0.3592832590121217 * absX + 0.6976051147779502 * absY - 0.0358915932320289 * absZ
  );
  const m = transferPqEncode(
    -0.1920808463704995 * absX + 1.1004767970374323 * absY + 0.0753748658519118 * absZ
  );
  const s = transferPqEncode(
    0.0070797844607477 * absX + 0.0748396662186366 * absY + 0.8433265453898765 * absZ
  );
  const i = 0.5 * l + 0.5 * m;
  const t = 1.61376953125 * l - 3.323486328125 * m + 1.709716796875 * s;
  const p4 = 4.378173828125 * l - 4.24560546875 * m - 0.132568359375 * s;
  const res = { mode: "itp", i, t, p: p4 };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToItp_default = convertXyz65ToItp;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/itp/definition.js
var definition10 = {
  mode: "itp",
  channels: ["i", "t", "p", "alpha"],
  parse: ["--ictcp"],
  serialize: "--ictcp",
  toMode: {
    xyz65: convertItpToXyz65_default,
    rgb: (color) => convertXyz65ToRgb_default(convertItpToXyz65_default(color))
  },
  fromMode: {
    xyz65: convertXyz65ToItp_default,
    rgb: (color) => convertXyz65ToItp_default(convertRgbToXyz65_default(color))
  },
  ranges: {
    i: [0, 0.581],
    t: [-0.369, 0.272],
    p: [-0.164, 0.331]
  },
  interpolate: {
    i: interpolatorLinear,
    t: interpolatorLinear,
    p: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default10 = definition10;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jab/convertXyz65ToJab.js
var p = 134.03437499999998;
var d0 = 16295499532821565e-27;
var jabPqEncode = (v) => {
  if (v < 0) return 0;
  let vn3 = Math.pow(v / 1e4, M1);
  return Math.pow((C1 + C2 * vn3) / (1 + C3 * vn3), p);
};
var abs = (v = 0) => Math.max(v * 203, 0);
var convertXyz65ToJab = ({ x, y, z, alpha }) => {
  x = abs(x);
  y = abs(y);
  z = abs(z);
  let xp = 1.15 * x - 0.15 * z;
  let yp = 0.66 * y + 0.34 * x;
  let l = jabPqEncode(0.41478972 * xp + 0.579999 * yp + 0.014648 * z);
  let m = jabPqEncode(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z);
  let s = jabPqEncode(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z);
  let i = (l + m) / 2;
  let res = {
    mode: "jab",
    j: 0.44 * i / (1 - 0.56 * i) - d0,
    a: 3.524 * l - 4.066708 * m + 0.542708 * s,
    b: 0.199076 * l + 1.096799 * m - 1.295875 * s
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToJab_default = convertXyz65ToJab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jab/convertJabToXyz65.js
var p2 = 134.03437499999998;
var d02 = 16295499532821565e-27;
var jabPqDecode = (v) => {
  if (v < 0) return 0;
  let vp = Math.pow(v, 1 / p2);
  return 1e4 * Math.pow((C1 - vp) / (C3 * vp - C2), 1 / M1);
};
var rel = (v) => v / 203;
var convertJabToXyz65 = ({ j, a, b, alpha }) => {
  if (j === void 0) j = 0;
  if (a === void 0) a = 0;
  if (b === void 0) b = 0;
  let i = (j + d02) / (0.44 + 0.56 * (j + d02));
  let l = jabPqDecode(i + 0.13860504 * a + 0.058047316 * b);
  let m = jabPqDecode(i - 0.13860504 * a - 0.058047316 * b);
  let s = jabPqDecode(i - 0.096019242 * a - 0.8118919 * b);
  let res = {
    mode: "xyz65",
    x: rel(
      1.661373024652174 * l - 0.914523081304348 * m + 0.23136208173913045 * s
    ),
    y: rel(
      -0.3250758611844533 * l + 1.571847026732543 * m - 0.21825383453227928 * s
    ),
    z: rel(-0.090982811 * l - 0.31272829 * m + 1.5227666 * s)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertJabToXyz65_default = convertJabToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jab/convertRgbToJab.js
var convertRgbToJab = (rgb5) => {
  let res = convertXyz65ToJab_default(convertRgbToXyz65_default(rgb5));
  if (rgb5.r === rgb5.b && rgb5.b === rgb5.g) {
    res.a = res.b = 0;
  }
  return res;
};
var convertRgbToJab_default = convertRgbToJab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jab/convertJabToRgb.js
var convertJabToRgb = (color) => convertXyz65ToRgb_default(convertJabToXyz65_default(color));
var convertJabToRgb_default = convertJabToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jab/definition.js
var definition11 = {
  mode: "jab",
  channels: ["j", "a", "b", "alpha"],
  parse: ["--jzazbz"],
  serialize: "--jzazbz",
  fromMode: {
    rgb: convertRgbToJab_default,
    xyz65: convertXyz65ToJab_default
  },
  toMode: {
    rgb: convertJabToRgb_default,
    xyz65: convertJabToXyz65_default
  },
  ranges: {
    j: [0, 0.222],
    a: [-0.109, 0.129],
    b: [-0.185, 0.134]
  },
  interpolate: {
    j: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default11 = definition11;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jch/convertJabToJch.js
var convertJabToJch = ({ j, a, b, alpha }) => {
  if (a === void 0) a = 0;
  if (b === void 0) b = 0;
  let c2 = Math.sqrt(a * a + b * b);
  let res = {
    mode: "jch",
    j,
    c: c2
  };
  if (c2) {
    res.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertJabToJch_default = convertJabToJch;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jch/convertJchToJab.js
var convertJchToJab = ({ j, c: c2, h, alpha }) => {
  if (h === void 0) h = 0;
  let res = {
    mode: "jab",
    j,
    a: c2 ? c2 * Math.cos(h / 180 * Math.PI) : 0,
    b: c2 ? c2 * Math.sin(h / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertJchToJab_default = convertJchToJab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/jch/definition.js
var definition12 = {
  mode: "jch",
  parse: ["--jzczhz"],
  serialize: "--jzczhz",
  toMode: {
    jab: convertJchToJab_default,
    rgb: (c2) => convertJabToRgb_default(convertJchToJab_default(c2))
  },
  fromMode: {
    rgb: (c2) => convertJabToJch_default(convertRgbToJab_default(c2)),
    jab: convertJabToJch_default
  },
  channels: ["j", "c", "h", "alpha"],
  ranges: {
    j: [0, 0.221],
    c: [0, 0.19],
    h: [0, 360]
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    j: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
var definition_default12 = definition12;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz50/constants.js
var k3 = Math.pow(29, 3) / Math.pow(3, 3);
var e3 = Math.pow(6, 3) / Math.pow(29, 3);

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab/convertLabToXyz50.js
var fn4 = (v) => Math.pow(v, 3) > e3 ? Math.pow(v, 3) : (116 * v - 16) / k3;
var convertLabToXyz50 = ({ l, a, b, alpha }) => {
  if (l === void 0) l = 0;
  if (a === void 0) a = 0;
  if (b === void 0) b = 0;
  let fy = (l + 16) / 116;
  let fx = a / 500 + fy;
  let fz = fy - b / 200;
  let res = {
    mode: "xyz50",
    x: fn4(fx) * D50.X,
    y: fn4(fy) * D50.Y,
    z: fn4(fz) * D50.Z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLabToXyz50_default = convertLabToXyz50;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz50/convertXyz50ToRgb.js
var convertXyz50ToRgb = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = convertLrgbToRgb_default({
    r: x * 3.1341359569958707 - y * 1.6173863321612538 - 0.4906619460083532 * z,
    g: x * -0.978795502912089 + y * 1.916254567259524 + 0.03344273116131949 * z,
    b: x * 0.07195537988411677 - y * 0.2289768264158322 + 1.405386058324125 * z
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz50ToRgb_default = convertXyz50ToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab/convertLabToRgb.js
var convertLabToRgb = (lab2) => convertXyz50ToRgb_default(convertLabToXyz50_default(lab2));
var convertLabToRgb_default = convertLabToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz50/convertRgbToXyz50.js
var convertRgbToXyz50 = (rgb5) => {
  let { r: r2, g, b, alpha } = convertRgbToLrgb_default(rgb5);
  let res = {
    mode: "xyz50",
    x: 0.436065742824811 * r2 + 0.3851514688337912 * g + 0.14307845442264197 * b,
    y: 0.22249319175623702 * r2 + 0.7168870538238823 * g + 0.06061979053616537 * b,
    z: 0.013923904500943465 * r2 + 0.09708128566574634 * g + 0.7140993584005155 * b
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertRgbToXyz50_default = convertRgbToXyz50;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab/convertXyz50ToLab.js
var f2 = (value) => value > e3 ? Math.cbrt(value) : (k3 * value + 16) / 116;
var convertXyz50ToLab = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let f0 = f2(x / D50.X);
  let f1 = f2(y / D50.Y);
  let f22 = f2(z / D50.Z);
  let res = {
    mode: "lab",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f22)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz50ToLab_default = convertXyz50ToLab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab/convertRgbToLab.js
var convertRgbToLab = (rgb5) => {
  let res = convertXyz50ToLab_default(convertRgbToXyz50_default(rgb5));
  if (rgb5.r === rgb5.b && rgb5.b === rgb5.g) {
    res.a = res.b = 0;
  }
  return res;
};
var convertRgbToLab_default = convertRgbToLab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab/parseLab.js
function parseLab(color, parsed) {
  if (!parsed || parsed[0] !== "lab") {
    return void 0;
  }
  const res = { mode: "lab" };
  const [, l, a, b, alpha] = parsed;
  if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
    return void 0;
  }
  if (l.type !== Tok.None) {
    res.l = Math.min(Math.max(0, l.value), 100);
  }
  if (a.type !== Tok.None) {
    res.a = a.type === Tok.Number ? a.value : a.value * 125 / 100;
  }
  if (b.type !== Tok.None) {
    res.b = b.type === Tok.Number ? b.value : b.value * 125 / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
var parseLab_default = parseLab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab/definition.js
var definition13 = {
  mode: "lab",
  toMode: {
    xyz50: convertLabToXyz50_default,
    rgb: convertLabToRgb_default
  },
  fromMode: {
    xyz50: convertXyz50ToLab_default,
    rgb: convertRgbToLab_default
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  },
  parse: [parseLab_default],
  serialize: (c2) => `lab(${c2.l !== void 0 ? c2.l : "none"} ${c2.a !== void 0 ? c2.a : "none"} ${c2.b !== void 0 ? c2.b : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default13 = definition13;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lab65/definition.js
var definition14 = {
  ...definition_default13,
  mode: "lab65",
  parse: ["--lab-d65"],
  serialize: "--lab-d65",
  toMode: {
    xyz65: convertLab65ToXyz65_default,
    rgb: convertLab65ToRgb_default
  },
  fromMode: {
    xyz65: convertXyz65ToLab65_default,
    rgb: convertRgbToLab65_default
  },
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  }
};
var definition_default14 = definition14;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lch/parseLch.js
function parseLch(color, parsed) {
  if (!parsed || parsed[0] !== "lch") {
    return void 0;
  }
  const res = { mode: "lch" };
  const [, l, c2, h, alpha] = parsed;
  if (l.type !== Tok.None) {
    if (l.type === Tok.Hue) {
      return void 0;
    }
    res.l = Math.min(Math.max(0, l.value), 100);
  }
  if (c2.type !== Tok.None) {
    res.c = Math.max(
      0,
      c2.type === Tok.Number ? c2.value : c2.value * 150 / 100
    );
  }
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
var parseLch_default = parseLch;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lch/definition.js
var definition15 = {
  mode: "lch",
  toMode: {
    lab: convertLchToLab_default,
    rgb: (c2) => convertLabToRgb_default(convertLchToLab_default(c2))
  },
  fromMode: {
    rgb: (c2) => convertLabToLch_default(convertRgbToLab_default(c2)),
    lab: convertLabToLch_default
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  },
  parse: [parseLch_default],
  serialize: (c2) => `lch(${c2.l !== void 0 ? c2.l : "none"} ${c2.c !== void 0 ? c2.c : "none"} ${c2.h !== void 0 ? c2.h : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
var definition_default15 = definition15;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lch65/definition.js
var definition16 = {
  ...definition_default15,
  mode: "lch65",
  parse: ["--lch-d65"],
  serialize: "--lch-d65",
  toMode: {
    lab65: (c2) => convertLchToLab_default(c2, "lab65"),
    rgb: (c2) => convertLab65ToRgb_default(convertLchToLab_default(c2, "lab65"))
  },
  fromMode: {
    rgb: (c2) => convertLabToLch_default(convertRgbToLab65_default(c2), "lch65"),
    lab65: (c2) => convertLabToLch_default(c2, "lch65")
  },
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  }
};
var definition_default16 = definition16;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lchuv/convertLuvToLchuv.js
var convertLuvToLchuv = ({ l, u, v, alpha }) => {
  if (u === void 0) u = 0;
  if (v === void 0) v = 0;
  let c2 = Math.sqrt(u * u + v * v);
  let res = {
    mode: "lchuv",
    l,
    c: c2
  };
  if (c2) {
    res.h = normalizeHue_default(Math.atan2(v, u) * 180 / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLuvToLchuv_default = convertLuvToLchuv;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lchuv/convertLchuvToLuv.js
var convertLchuvToLuv = ({ l, c: c2, h, alpha }) => {
  if (h === void 0) h = 0;
  let res = {
    mode: "luv",
    l,
    u: c2 ? c2 * Math.cos(h / 180 * Math.PI) : 0,
    v: c2 ? c2 * Math.sin(h / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLchuvToLuv_default = convertLchuvToLuv;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/luv/convertXyz50ToLuv.js
var u_fn = (x, y, z) => 4 * x / (x + 15 * y + 3 * z);
var v_fn = (x, y, z) => 9 * y / (x + 15 * y + 3 * z);
var un = u_fn(D50.X, D50.Y, D50.Z);
var vn = v_fn(D50.X, D50.Y, D50.Z);
var l_fn = (value) => value <= e3 ? k3 * value : 116 * Math.cbrt(value) - 16;
var convertXyz50ToLuv = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let l = l_fn(y / D50.Y);
  let u = u_fn(x, y, z);
  let v = v_fn(x, y, z);
  if (!isFinite(u) || !isFinite(v)) {
    l = u = v = 0;
  } else {
    u = 13 * l * (u - un);
    v = 13 * l * (v - vn);
  }
  let res = {
    mode: "luv",
    l,
    u,
    v
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz50ToLuv_default = convertXyz50ToLuv;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/luv/convertLuvToXyz50.js
var u_fn2 = (x, y, z) => 4 * x / (x + 15 * y + 3 * z);
var v_fn2 = (x, y, z) => 9 * y / (x + 15 * y + 3 * z);
var un2 = u_fn2(D50.X, D50.Y, D50.Z);
var vn2 = v_fn2(D50.X, D50.Y, D50.Z);
var convertLuvToXyz50 = ({ l, u, v, alpha }) => {
  if (l === void 0) l = 0;
  if (l === 0) {
    return { mode: "xyz50", x: 0, y: 0, z: 0 };
  }
  if (u === void 0) u = 0;
  if (v === void 0) v = 0;
  let up = u / (13 * l) + un2;
  let vp = v / (13 * l) + vn2;
  let y = D50.Y * (l <= 8 ? l / k3 : Math.pow((l + 16) / 116, 3));
  let x = y * (9 * up) / (4 * vp);
  let z = y * (12 - 3 * up - 20 * vp) / (4 * vp);
  let res = { mode: "xyz50", x, y, z };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLuvToXyz50_default = convertLuvToXyz50;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lchuv/definition.js
var convertRgbToLchuv = (rgb5) => convertLuvToLchuv_default(convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb5)));
var convertLchuvToRgb = (lchuv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(convertLchuvToLuv_default(lchuv2)));
var definition17 = {
  mode: "lchuv",
  toMode: {
    luv: convertLchuvToLuv_default,
    rgb: convertLchuvToRgb
  },
  fromMode: {
    rgb: convertRgbToLchuv,
    luv: convertLuvToLchuv_default
  },
  channels: ["l", "c", "h", "alpha"],
  parse: ["--lchuv"],
  serialize: "--lchuv",
  ranges: {
    l: [0, 100],
    c: [0, 176.956],
    h: [0, 360]
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
var definition_default17 = definition17;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/lrgb/definition.js
var definition18 = {
  ...definition_default,
  mode: "lrgb",
  toMode: {
    rgb: convertLrgbToRgb_default
  },
  fromMode: {
    rgb: convertRgbToLrgb_default
  },
  parse: ["srgb-linear"],
  serialize: "srgb-linear"
};
var definition_default18 = definition18;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/luv/definition.js
var definition19 = {
  mode: "luv",
  toMode: {
    xyz50: convertLuvToXyz50_default,
    rgb: (luv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(luv2))
  },
  fromMode: {
    xyz50: convertXyz50ToLuv_default,
    rgb: (rgb5) => convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb5))
  },
  channels: ["l", "u", "v", "alpha"],
  parse: ["--luv"],
  serialize: "--luv",
  ranges: {
    l: [0, 100],
    u: [-84.936, 175.042],
    v: [-125.882, 87.243]
  },
  interpolate: {
    l: interpolatorLinear,
    u: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default19 = definition19;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklab/convertLrgbToOklab.js
var convertLrgbToOklab = ({ r: r2, g, b, alpha }) => {
  if (r2 === void 0) r2 = 0;
  if (g === void 0) g = 0;
  if (b === void 0) b = 0;
  let L = Math.cbrt(
    0.412221469470763 * r2 + 0.5363325372617348 * g + 0.0514459932675022 * b
  );
  let M4 = Math.cbrt(
    0.2119034958178252 * r2 + 0.6806995506452344 * g + 0.1073969535369406 * b
  );
  let S = Math.cbrt(
    0.0883024591900564 * r2 + 0.2817188391361215 * g + 0.6299787016738222 * b
  );
  let res = {
    mode: "oklab",
    l: 0.210454268309314 * L + 0.7936177747023054 * M4 - 0.0040720430116193 * S,
    a: 1.9779985324311684 * L - 2.42859224204858 * M4 + 0.450593709617411 * S,
    b: 0.0259040424655478 * L + 0.7827717124575296 * M4 - 0.8086757549230774 * S
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertLrgbToOklab_default = convertLrgbToOklab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklab/convertRgbToOklab.js
var convertRgbToOklab = (rgb5) => {
  let res = convertLrgbToOklab_default(convertRgbToLrgb_default(rgb5));
  if (rgb5.r === rgb5.b && rgb5.b === rgb5.g) {
    res.a = res.b = 0;
  }
  return res;
};
var convertRgbToOklab_default = convertRgbToOklab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklab/convertOklabToLrgb.js
var convertOklabToLrgb = ({ l, a, b, alpha }) => {
  if (l === void 0) l = 0;
  if (a === void 0) a = 0;
  if (b === void 0) b = 0;
  let L = Math.pow(l + 0.3963377773761749 * a + 0.2158037573099136 * b, 3);
  let M4 = Math.pow(l - 0.1055613458156586 * a - 0.0638541728258133 * b, 3);
  let S = Math.pow(l - 0.0894841775298119 * a - 1.2914855480194092 * b, 3);
  let res = {
    mode: "lrgb",
    r: 4.076741636075957 * L - 3.3077115392580616 * M4 + 0.2309699031821044 * S,
    g: -1.2684379732850317 * L + 2.6097573492876887 * M4 - 0.3413193760026573 * S,
    b: -0.0041960761386756 * L - 0.7034186179359362 * M4 + 1.7076146940746117 * S
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertOklabToLrgb_default = convertOklabToLrgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklab/convertOklabToRgb.js
var convertOklabToRgb = (c2) => convertLrgbToRgb_default(convertOklabToLrgb_default(c2));
var convertOklabToRgb_default = convertOklabToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/okhsl/helpers.js
function toe(x) {
  const k_1 = 0.206;
  const k_2 = 0.03;
  const k_3 = (1 + k_1) / (1 + k_2);
  return 0.5 * (k_3 * x - k_1 + Math.sqrt((k_3 * x - k_1) * (k_3 * x - k_1) + 4 * k_2 * k_3 * x));
}
function toe_inv(x) {
  const k_1 = 0.206;
  const k_2 = 0.03;
  const k_3 = (1 + k_1) / (1 + k_2);
  return (x * x + k_1 * x) / (k_3 * (x + k_2));
}
function compute_max_saturation(a, b) {
  let k0, k1, k22, k32, k4, wl, wm, ws;
  if (-1.88170328 * a - 0.80936493 * b > 1) {
    k0 = 1.19086277;
    k1 = 1.76576728;
    k22 = 0.59662641;
    k32 = 0.75515197;
    k4 = 0.56771245;
    wl = 4.0767416621;
    wm = -3.3077115913;
    ws = 0.2309699292;
  } else if (1.81444104 * a - 1.19445276 * b > 1) {
    k0 = 0.73956515;
    k1 = -0.45954404;
    k22 = 0.08285427;
    k32 = 0.1254107;
    k4 = 0.14503204;
    wl = -1.2684380046;
    wm = 2.6097574011;
    ws = -0.3413193965;
  } else {
    k0 = 1.35733652;
    k1 = -915799e-8;
    k22 = -1.1513021;
    k32 = -0.50559606;
    k4 = 692167e-8;
    wl = -0.0041960863;
    wm = -0.7034186147;
    ws = 1.707614701;
  }
  let S = k0 + k1 * a + k22 * b + k32 * a * a + k4 * a * b;
  let k_l = 0.3963377774 * a + 0.2158037573 * b;
  let k_m = -0.1055613458 * a - 0.0638541728 * b;
  let k_s = -0.0894841775 * a - 1.291485548 * b;
  {
    let l_ = 1 + S * k_l;
    let m_ = 1 + S * k_m;
    let s_ = 1 + S * k_s;
    let l = l_ * l_ * l_;
    let m = m_ * m_ * m_;
    let s = s_ * s_ * s_;
    let l_dS = 3 * k_l * l_ * l_;
    let m_dS = 3 * k_m * m_ * m_;
    let s_dS = 3 * k_s * s_ * s_;
    let l_dS2 = 6 * k_l * k_l * l_;
    let m_dS2 = 6 * k_m * k_m * m_;
    let s_dS2 = 6 * k_s * k_s * s_;
    let f3 = wl * l + wm * m + ws * s;
    let f1 = wl * l_dS + wm * m_dS + ws * s_dS;
    let f22 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;
    S = S - f3 * f1 / (f1 * f1 - 0.5 * f3 * f22);
  }
  return S;
}
function find_cusp(a, b) {
  let S_cusp = compute_max_saturation(a, b);
  let rgb5 = convertOklabToLrgb_default({ l: 1, a: S_cusp * a, b: S_cusp * b });
  let L_cusp = Math.cbrt(1 / Math.max(rgb5.r, rgb5.g, rgb5.b));
  let C_cusp = L_cusp * S_cusp;
  return [L_cusp, C_cusp];
}
function find_gamut_intersection(a, b, L1, C12, L0, cusp = null) {
  if (!cusp) {
    cusp = find_cusp(a, b);
  }
  let t;
  if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C12 <= 0) {
    t = cusp[1] * L0 / (C12 * cusp[0] + cusp[1] * (L0 - L1));
  } else {
    t = cusp[1] * (L0 - 1) / (C12 * (cusp[0] - 1) + cusp[1] * (L0 - L1));
    {
      let dL = L1 - L0;
      let dC = C12;
      let k_l = 0.3963377774 * a + 0.2158037573 * b;
      let k_m = -0.1055613458 * a - 0.0638541728 * b;
      let k_s = -0.0894841775 * a - 1.291485548 * b;
      let l_dt = dL + dC * k_l;
      let m_dt = dL + dC * k_m;
      let s_dt = dL + dC * k_s;
      {
        let L = L0 * (1 - t) + t * L1;
        let C = t * C12;
        let l_ = L + C * k_l;
        let m_ = L + C * k_m;
        let s_ = L + C * k_s;
        let l = l_ * l_ * l_;
        let m = m_ * m_ * m_;
        let s = s_ * s_ * s_;
        let ldt = 3 * l_dt * l_ * l_;
        let mdt = 3 * m_dt * m_ * m_;
        let sdt = 3 * s_dt * s_ * s_;
        let ldt2 = 6 * l_dt * l_dt * l_;
        let mdt2 = 6 * m_dt * m_dt * m_;
        let sdt2 = 6 * s_dt * s_dt * s_;
        let r2 = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1;
        let r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
        let r22 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;
        let u_r = r1 / (r1 * r1 - 0.5 * r2 * r22);
        let t_r = -r2 * u_r;
        let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1;
        let g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
        let g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;
        let u_g = g1 / (g1 * g1 - 0.5 * g * g2);
        let t_g = -g * u_g;
        let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s - 1;
        let b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt;
        let b22 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2;
        let u_b = b1 / (b1 * b1 - 0.5 * b2 * b22);
        let t_b = -b2 * u_b;
        t_r = u_r >= 0 ? t_r : 1e6;
        t_g = u_g >= 0 ? t_g : 1e6;
        t_b = u_b >= 0 ? t_b : 1e6;
        t += Math.min(t_r, Math.min(t_g, t_b));
      }
    }
  }
  return t;
}
function get_ST_max(a_, b_, cusp = null) {
  if (!cusp) {
    cusp = find_cusp(a_, b_);
  }
  let L = cusp[0];
  let C = cusp[1];
  return [C / L, C / (1 - L)];
}
function get_Cs(L, a_, b_) {
  let cusp = find_cusp(a_, b_);
  let C_max = find_gamut_intersection(a_, b_, L, 1, L, cusp);
  let ST_max = get_ST_max(a_, b_, cusp);
  let S_mid = 0.11516993 + 1 / (7.4477897 + 4.1590124 * b_ + a_ * (-2.19557347 + 1.75198401 * b_ + a_ * (-2.13704948 - 10.02301043 * b_ + a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))));
  let T_mid = 0.11239642 + 1 / (1.6132032 - 0.68124379 * b_ + a_ * (0.40370612 + 0.90148123 * b_ + a_ * (-0.27087943 + 0.6122399 * b_ + a_ * (299215e-8 - 0.45399568 * b_ - 0.14661872 * a_))));
  let k4 = C_max / Math.min(L * ST_max[0], (1 - L) * ST_max[1]);
  let C_a = L * S_mid;
  let C_b = (1 - L) * T_mid;
  let C_mid = 0.9 * k4 * Math.sqrt(
    Math.sqrt(
      1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
    )
  );
  C_a = L * 0.4;
  C_b = (1 - L) * 0.8;
  let C_0 = Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b)));
  return [C_0, C_mid, C_max];
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/okhsl/convertOklabToOkhsl.js
function convertOklabToOkhsl(lab2) {
  const l = lab2.l !== void 0 ? lab2.l : 0;
  const a = lab2.a !== void 0 ? lab2.a : 0;
  const b = lab2.b !== void 0 ? lab2.b : 0;
  const ret = { mode: "okhsl", l: toe(l) };
  if (lab2.alpha !== void 0) {
    ret.alpha = lab2.alpha;
  }
  let c2 = Math.sqrt(a * a + b * b);
  if (!c2) {
    ret.s = 0;
    return ret;
  }
  let [C_0, C_mid, C_max] = get_Cs(l, a / c2, b / c2);
  let s;
  if (c2 < C_mid) {
    let k_0 = 0;
    let k_1 = 0.8 * C_0;
    let k_2 = 1 - k_1 / C_mid;
    let t = (c2 - k_0) / (k_1 + k_2 * (c2 - k_0));
    s = t * 0.8;
  } else {
    let k_0 = C_mid;
    let k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
    let k_2 = 1 - k_1 / (C_max - C_mid);
    let t = (c2 - k_0) / (k_1 + k_2 * (c2 - k_0));
    s = 0.8 + 0.2 * t;
  }
  if (s) {
    ret.s = s;
    ret.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
  }
  return ret;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/okhsl/convertOkhslToOklab.js
function convertOkhslToOklab(hsl3) {
  let h = hsl3.h !== void 0 ? hsl3.h : 0;
  let s = hsl3.s !== void 0 ? hsl3.s : 0;
  let l = hsl3.l !== void 0 ? hsl3.l : 0;
  const ret = { mode: "oklab", l: toe_inv(l) };
  if (hsl3.alpha !== void 0) {
    ret.alpha = hsl3.alpha;
  }
  if (!s || l === 1) {
    ret.a = ret.b = 0;
    return ret;
  }
  let a_ = Math.cos(h / 180 * Math.PI);
  let b_ = Math.sin(h / 180 * Math.PI);
  let [C_0, C_mid, C_max] = get_Cs(ret.l, a_, b_);
  let t, k_0, k_1, k_2;
  if (s < 0.8) {
    t = 1.25 * s;
    k_0 = 0;
    k_1 = 0.8 * C_0;
    k_2 = 1 - k_1 / C_mid;
  } else {
    t = 5 * (s - 0.8);
    k_0 = C_mid;
    k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
    k_2 = 1 - k_1 / (C_max - C_mid);
  }
  let C = k_0 + t * k_1 / (1 - k_2 * t);
  ret.a = C * a_;
  ret.b = C * b_;
  return ret;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/okhsl/modeOkhsl.js
var modeOkhsl = {
  ...definition_default7,
  mode: "okhsl",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--okhsl"],
  serialize: "--okhsl",
  fromMode: {
    oklab: convertOklabToOkhsl,
    rgb: (c2) => convertOklabToOkhsl(convertRgbToOklab_default(c2))
  },
  toMode: {
    oklab: convertOkhslToOklab,
    rgb: (c2) => convertOklabToRgb_default(convertOkhslToOklab(c2))
  }
};
var modeOkhsl_default = modeOkhsl;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/okhsv/convertOklabToOkhsv.js
function convertOklabToOkhsv(lab2) {
  let l = lab2.l !== void 0 ? lab2.l : 0;
  let a = lab2.a !== void 0 ? lab2.a : 0;
  let b = lab2.b !== void 0 ? lab2.b : 0;
  let c2 = Math.sqrt(a * a + b * b);
  let a_ = c2 ? a / c2 : 1;
  let b_ = c2 ? b / c2 : 1;
  let [S_max, T] = get_ST_max(a_, b_);
  let S_0 = 0.5;
  let k4 = 1 - S_0 / S_max;
  let t = T / (c2 + l * T);
  let L_v = t * l;
  let C_v = t * c2;
  let L_vt = toe_inv(L_v);
  let C_vt = C_v * L_vt / L_v;
  let rgb_scale = convertOklabToLrgb_default({ l: L_vt, a: a_ * C_vt, b: b_ * C_vt });
  let scale_L = Math.cbrt(
    1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
  );
  l = l / scale_L;
  c2 = c2 / scale_L * toe(l) / l;
  l = toe(l);
  const ret = {
    mode: "okhsv",
    s: c2 ? (S_0 + T) * C_v / (T * S_0 + T * k4 * C_v) : 0,
    v: l ? l / L_v : 0
  };
  if (ret.s) {
    ret.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
  }
  if (lab2.alpha !== void 0) {
    ret.alpha = lab2.alpha;
  }
  return ret;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/okhsv/convertOkhsvToOklab.js
function convertOkhsvToOklab(hsv2) {
  const ret = { mode: "oklab" };
  if (hsv2.alpha !== void 0) {
    ret.alpha = hsv2.alpha;
  }
  const h = hsv2.h !== void 0 ? hsv2.h : 0;
  const s = hsv2.s !== void 0 ? hsv2.s : 0;
  const v = hsv2.v !== void 0 ? hsv2.v : 0;
  const a_ = Math.cos(h / 180 * Math.PI);
  const b_ = Math.sin(h / 180 * Math.PI);
  const [S_max, T] = get_ST_max(a_, b_);
  const S_0 = 0.5;
  const k4 = 1 - S_0 / S_max;
  const L_v = 1 - s * S_0 / (S_0 + T - T * k4 * s);
  const C_v = s * T * S_0 / (S_0 + T - T * k4 * s);
  const L_vt = toe_inv(L_v);
  const C_vt = C_v * L_vt / L_v;
  const rgb_scale = convertOklabToLrgb_default({
    l: L_vt,
    a: a_ * C_vt,
    b: b_ * C_vt
  });
  const scale_L = Math.cbrt(
    1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
  );
  const L_new = toe_inv(v * L_v);
  const C = C_v * L_new / L_v;
  ret.l = L_new * scale_L;
  ret.a = C * a_ * scale_L;
  ret.b = C * b_ * scale_L;
  return ret;
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/okhsv/modeOkhsv.js
var modeOkhsv = {
  ...definition_default8,
  mode: "okhsv",
  channels: ["h", "s", "v", "alpha"],
  parse: ["--okhsv"],
  serialize: "--okhsv",
  fromMode: {
    oklab: convertOklabToOkhsv,
    rgb: (c2) => convertOklabToOkhsv(convertRgbToOklab_default(c2))
  },
  toMode: {
    oklab: convertOkhsvToOklab,
    rgb: (c2) => convertOklabToRgb_default(convertOkhsvToOklab(c2))
  }
};
var modeOkhsv_default = modeOkhsv;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklab/parseOklab.js
function parseOklab(color, parsed) {
  if (!parsed || parsed[0] !== "oklab") {
    return void 0;
  }
  const res = { mode: "oklab" };
  const [, l, a, b, alpha] = parsed;
  if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
    return void 0;
  }
  if (l.type !== Tok.None) {
    res.l = Math.min(
      Math.max(0, l.type === Tok.Number ? l.value : l.value / 100),
      1
    );
  }
  if (a.type !== Tok.None) {
    res.a = a.type === Tok.Number ? a.value : a.value * 0.4 / 100;
  }
  if (b.type !== Tok.None) {
    res.b = b.type === Tok.Number ? b.value : b.value * 0.4 / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
var parseOklab_default = parseOklab;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklab/definition.js
var definition20 = {
  ...definition_default13,
  mode: "oklab",
  toMode: {
    lrgb: convertOklabToLrgb_default,
    rgb: convertOklabToRgb_default
  },
  fromMode: {
    lrgb: convertLrgbToOklab_default,
    rgb: convertRgbToOklab_default
  },
  ranges: {
    l: [0, 1],
    a: [-0.4, 0.4],
    b: [-0.4, 0.4]
  },
  parse: [parseOklab_default],
  serialize: (c2) => `oklab(${c2.l !== void 0 ? c2.l : "none"} ${c2.a !== void 0 ? c2.a : "none"} ${c2.b !== void 0 ? c2.b : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`
};
var definition_default20 = definition20;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklch/parseOklch.js
function parseOklch(color, parsed) {
  if (!parsed || parsed[0] !== "oklch") {
    return void 0;
  }
  const res = { mode: "oklch" };
  const [, l, c2, h, alpha] = parsed;
  if (l.type !== Tok.None) {
    if (l.type === Tok.Hue) {
      return void 0;
    }
    res.l = Math.min(
      Math.max(0, l.type === Tok.Number ? l.value : l.value / 100),
      1
    );
  }
  if (c2.type !== Tok.None) {
    res.c = Math.max(
      0,
      c2.type === Tok.Number ? c2.value : c2.value * 0.4 / 100
    );
  }
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
var parseOklch_default = parseOklch;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/oklch/definition.js
var definition21 = {
  ...definition_default15,
  mode: "oklch",
  toMode: {
    oklab: (c2) => convertLchToLab_default(c2, "oklab"),
    rgb: (c2) => convertOklabToRgb_default(convertLchToLab_default(c2, "oklab"))
  },
  fromMode: {
    rgb: (c2) => convertLabToLch_default(convertRgbToOklab_default(c2), "oklch"),
    oklab: (c2) => convertLabToLch_default(c2, "oklch")
  },
  parse: [parseOklch_default],
  serialize: (c2) => `oklch(${c2.l !== void 0 ? c2.l : "none"} ${c2.c !== void 0 ? c2.c : "none"} ${c2.h !== void 0 ? c2.h : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  ranges: {
    l: [0, 1],
    c: [0, 0.4],
    h: [0, 360]
  }
};
var definition_default21 = definition21;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/p3/convertP3ToXyz65.js
var convertP3ToXyz65 = (rgb5) => {
  let { r: r2, g, b, alpha } = convertRgbToLrgb_default(rgb5);
  let res = {
    mode: "xyz65",
    x: 0.486570948648216 * r2 + 0.265667693169093 * g + 0.1982172852343625 * b,
    y: 0.2289745640697487 * r2 + 0.6917385218365062 * g + 0.079286914093745 * b,
    z: 0 * r2 + 0.0451133818589026 * g + 1.043944368900976 * b
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertP3ToXyz65_default = convertP3ToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/p3/convertXyz65ToP3.js
var convertXyz65ToP3 = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = convertLrgbToRgb_default(
    {
      r: x * 2.4934969119414263 - y * 0.9313836179191242 - 0.402710784450717 * z,
      g: x * -0.8294889695615749 + y * 1.7626640603183465 + 0.0236246858419436 * z,
      b: x * 0.0358458302437845 - y * 0.0761723892680418 + 0.9568845240076871 * z
    },
    "p3"
  );
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToP3_default = convertXyz65ToP3;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/p3/definition.js
var definition22 = {
  ...definition_default,
  mode: "p3",
  parse: ["display-p3"],
  serialize: "display-p3",
  fromMode: {
    rgb: (color) => convertXyz65ToP3_default(convertRgbToXyz65_default(color)),
    xyz65: convertXyz65ToP3_default
  },
  toMode: {
    rgb: (color) => convertXyz65ToRgb_default(convertP3ToXyz65_default(color)),
    xyz65: convertP3ToXyz65_default
  }
};
var definition_default22 = definition22;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/prophoto/convertXyz50ToProphoto.js
var gamma2 = (v) => {
  let abs2 = Math.abs(v);
  if (abs2 >= 1 / 512) {
    return Math.sign(v) * Math.pow(abs2, 1 / 1.8);
  }
  return 16 * v;
};
var convertXyz50ToProphoto = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = {
    mode: "prophoto",
    r: gamma2(
      x * 1.3457868816471585 - y * 0.2555720873797946 - 0.0511018649755453 * z
    ),
    g: gamma2(
      x * -0.5446307051249019 + y * 1.5082477428451466 + 0.0205274474364214 * z
    ),
    b: gamma2(x * 0 + y * 0 + 1.2119675456389452 * z)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz50ToProphoto_default = convertXyz50ToProphoto;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/prophoto/convertProphotoToXyz50.js
var linearize2 = (v = 0) => {
  let abs2 = Math.abs(v);
  if (abs2 >= 16 / 512) {
    return Math.sign(v) * Math.pow(abs2, 1.8);
  }
  return v / 16;
};
var convertProphotoToXyz50 = (prophoto2) => {
  let r2 = linearize2(prophoto2.r);
  let g = linearize2(prophoto2.g);
  let b = linearize2(prophoto2.b);
  let res = {
    mode: "xyz50",
    x: 0.7977666449006423 * r2 + 0.1351812974005331 * g + 0.0313477341283922 * b,
    y: 0.2880748288194013 * r2 + 0.7118352342418731 * g + 899369387256e-16 * b,
    z: 0 * r2 + 0 * g + 0.8251046025104602 * b
  };
  if (prophoto2.alpha !== void 0) {
    res.alpha = prophoto2.alpha;
  }
  return res;
};
var convertProphotoToXyz50_default = convertProphotoToXyz50;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/prophoto/definition.js
var definition23 = {
  ...definition_default,
  mode: "prophoto",
  parse: ["prophoto-rgb"],
  serialize: "prophoto-rgb",
  fromMode: {
    xyz50: convertXyz50ToProphoto_default,
    rgb: (color) => convertXyz50ToProphoto_default(convertRgbToXyz50_default(color))
  },
  toMode: {
    xyz50: convertProphotoToXyz50_default,
    rgb: (color) => convertXyz50ToRgb_default(convertProphotoToXyz50_default(color))
  }
};
var definition_default23 = definition23;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rec2020/convertXyz65ToRec2020.js
var \u03B1 = 1.09929682680944;
var \u03B2 = 0.018053968510807;
var gamma3 = (v) => {
  const abs2 = Math.abs(v);
  if (abs2 > \u03B2) {
    return (Math.sign(v) || 1) * (\u03B1 * Math.pow(abs2, 0.45) - (\u03B1 - 1));
  }
  return 4.5 * v;
};
var convertXyz65ToRec2020 = ({ x, y, z, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = {
    mode: "rec2020",
    r: gamma3(
      x * 1.7166511879712683 - y * 0.3556707837763925 - 0.2533662813736599 * z
    ),
    g: gamma3(
      x * -0.6666843518324893 + y * 1.6164812366349395 + 0.0157685458139111 * z
    ),
    b: gamma3(
      x * 0.0176398574453108 - y * 0.0427706132578085 + 0.9421031212354739 * z
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToRec2020_default = convertXyz65ToRec2020;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rec2020/convertRec2020ToXyz65.js
var \u03B12 = 1.09929682680944;
var \u03B22 = 0.018053968510807;
var linearize3 = (v = 0) => {
  let abs2 = Math.abs(v);
  if (abs2 < \u03B22 * 4.5) {
    return v / 4.5;
  }
  return (Math.sign(v) || 1) * Math.pow((abs2 + \u03B12 - 1) / \u03B12, 1 / 0.45);
};
var convertRec2020ToXyz65 = (rec20202) => {
  let r2 = linearize3(rec20202.r);
  let g = linearize3(rec20202.g);
  let b = linearize3(rec20202.b);
  let res = {
    mode: "xyz65",
    x: 0.6369580483012911 * r2 + 0.1446169035862083 * g + 0.1688809751641721 * b,
    y: 0.262700212011267 * r2 + 0.6779980715188708 * g + 0.059301716469862 * b,
    z: 0 * r2 + 0.0280726930490874 * g + 1.0609850577107909 * b
  };
  if (rec20202.alpha !== void 0) {
    res.alpha = rec20202.alpha;
  }
  return res;
};
var convertRec2020ToXyz65_default = convertRec2020ToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/rec2020/definition.js
var definition24 = {
  ...definition_default,
  mode: "rec2020",
  fromMode: {
    xyz65: convertXyz65ToRec2020_default,
    rgb: (color) => convertXyz65ToRec2020_default(convertRgbToXyz65_default(color))
  },
  toMode: {
    xyz65: convertRec2020ToXyz65_default,
    rgb: (color) => convertXyz65ToRgb_default(convertRec2020ToXyz65_default(color))
  },
  parse: ["rec2020"],
  serialize: "rec2020"
};
var definition_default24 = definition24;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyb/constants.js
var bias = 0.0037930732552754493;
var bias_cbrt = Math.cbrt(bias);

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyb/convertRgbToXyb.js
var transfer = (v) => Math.cbrt(v) - bias_cbrt;
var convertRgbToXyb = (color) => {
  const { r: r2, g, b, alpha } = convertRgbToLrgb_default(color);
  const l = transfer(0.3 * r2 + 0.622 * g + 0.078 * b + bias);
  const m = transfer(0.23 * r2 + 0.692 * g + 0.078 * b + bias);
  const s = transfer(
    0.2434226892454782 * r2 + 0.2047674442449682 * g + 0.5518098665095535 * b + bias
  );
  const res = {
    mode: "xyb",
    x: (l - m) / 2,
    y: (l + m) / 2,
    /* Apply default chroma from luma (subtract Y from B) */
    b: s - (l + m) / 2
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertRgbToXyb_default = convertRgbToXyb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyb/convertXybToRgb.js
var transfer2 = (v) => Math.pow(v + bias_cbrt, 3);
var convertXybToRgb = ({ x, y, b, alpha }) => {
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (b === void 0) b = 0;
  const l = transfer2(x + y) - bias;
  const m = transfer2(y - x) - bias;
  const s = transfer2(b + y) - bias;
  const res = convertLrgbToRgb_default({
    r: 11.031566904639861 * l - 9.866943908131562 * m - 0.16462299650829934 * s,
    g: -3.2541473810744237 * l + 4.418770377582723 * m - 0.16462299650829934 * s,
    b: -3.6588512867136815 * l + 2.7129230459360922 * m + 1.9459282407775895 * s
  });
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertXybToRgb_default = convertXybToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyb/definition.js
var definition25 = {
  mode: "xyb",
  channels: ["x", "y", "b", "alpha"],
  parse: ["--xyb"],
  serialize: "--xyb",
  toMode: {
    rgb: convertXybToRgb_default
  },
  fromMode: {
    rgb: convertRgbToXyb_default
  },
  ranges: {
    x: [-0.0154, 0.0281],
    y: [0, 0.8453],
    b: [-0.2778, 0.388]
  },
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default25 = definition25;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz50/definition.js
var definition26 = {
  mode: "xyz50",
  parse: ["xyz-d50"],
  serialize: "xyz-d50",
  toMode: {
    rgb: convertXyz50ToRgb_default,
    lab: convertXyz50ToLab_default
  },
  fromMode: {
    rgb: convertRgbToXyz50_default,
    lab: convertLabToXyz50_default
  },
  channels: ["x", "y", "z", "alpha"],
  ranges: {
    x: [0, 0.964],
    y: [0, 0.999],
    z: [0, 0.825]
  },
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default26 = definition26;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz65/convertXyz65ToXyz50.js
var convertXyz65ToXyz50 = (xyz652) => {
  let { x, y, z, alpha } = xyz652;
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = {
    mode: "xyz50",
    x: 1.0479298208405488 * x + 0.0229467933410191 * y - 0.0501922295431356 * z,
    y: 0.0296278156881593 * x + 0.990434484573249 * y - 0.0170738250293851 * z,
    z: -0.0092430581525912 * x + 0.0150551448965779 * y + 0.7518742899580008 * z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz65ToXyz50_default = convertXyz65ToXyz50;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz65/convertXyz50ToXyz65.js
var convertXyz50ToXyz65 = (xyz502) => {
  let { x, y, z, alpha } = xyz502;
  if (x === void 0) x = 0;
  if (y === void 0) y = 0;
  if (z === void 0) z = 0;
  let res = {
    mode: "xyz65",
    x: 0.9554734527042182 * x - 0.0230985368742614 * y + 0.0632593086610217 * z,
    y: -0.0283697069632081 * x + 1.0099954580058226 * y + 0.021041398966943 * z,
    z: 0.0123140016883199 * x - 0.0205076964334779 * y + 1.3303659366080753 * z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
var convertXyz50ToXyz65_default = convertXyz50ToXyz65;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/xyz65/definition.js
var definition27 = {
  mode: "xyz65",
  toMode: {
    rgb: convertXyz65ToRgb_default,
    xyz50: convertXyz65ToXyz50_default
  },
  fromMode: {
    rgb: convertRgbToXyz65_default,
    xyz50: convertXyz50ToXyz65_default
  },
  ranges: {
    x: [0, 0.95],
    y: [0, 1],
    z: [0, 1.088]
  },
  channels: ["x", "y", "z", "alpha"],
  parse: ["xyz", "xyz-d65"],
  serialize: "xyz-d65",
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default27 = definition27;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/yiq/convertRgbToYiq.js
var convertRgbToYiq = ({ r: r2, g, b, alpha }) => {
  if (r2 === void 0) r2 = 0;
  if (g === void 0) g = 0;
  if (b === void 0) b = 0;
  const res = {
    mode: "yiq",
    y: 0.29889531 * r2 + 0.58662247 * g + 0.11448223 * b,
    i: 0.59597799 * r2 - 0.2741761 * g - 0.32180189 * b,
    q: 0.21147017 * r2 - 0.52261711 * g + 0.31114694 * b
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertRgbToYiq_default = convertRgbToYiq;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/yiq/convertYiqToRgb.js
var convertYiqToRgb = ({ y, i, q, alpha }) => {
  if (y === void 0) y = 0;
  if (i === void 0) i = 0;
  if (q === void 0) q = 0;
  const res = {
    mode: "rgb",
    r: y + 0.95608445 * i + 0.6208885 * q,
    g: y - 0.27137664 * i - 0.6486059 * q,
    b: y - 1.10561724 * i + 1.70250126 * q
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
var convertYiqToRgb_default = convertYiqToRgb;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/yiq/definition.js
var definition28 = {
  mode: "yiq",
  toMode: {
    rgb: convertYiqToRgb_default
  },
  fromMode: {
    rgb: convertRgbToYiq_default
  },
  channels: ["y", "i", "q", "alpha"],
  parse: ["--yiq"],
  serialize: "--yiq",
  ranges: {
    i: [-0.595, 0.595],
    q: [-0.522, 0.522]
  },
  interpolate: {
    y: interpolatorLinear,
    i: interpolatorLinear,
    q: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
var definition_default28 = definition28;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/round.js
var r = (value, precision) => Math.round(value * (precision = Math.pow(10, precision))) / precision;
var round = (precision = 4) => (value) => typeof value === "number" ? r(value, precision) : value;
var round_default = round;

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/formatter.js
var twoDecimals = round_default(2);
var clamp = (value) => Math.max(0, Math.min(1, value || 0));
var fixup = (value) => Math.round(clamp(value) * 255);
var rgb = converter_default("rgb");
var hsl = converter_default("hsl");
var serializeHex = (color) => {
  if (color === void 0) {
    return void 0;
  }
  let r2 = fixup(color.r);
  let g = fixup(color.g);
  let b = fixup(color.b);
  return "#" + (1 << 24 | r2 << 16 | g << 8 | b).toString(16).slice(1);
};
var formatHex = (c2) => serializeHex(rgb(c2));

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/clamp.js
var rgb2 = converter_default("rgb");
var fixup_rgb = (c2) => {
  const res = {
    mode: c2.mode,
    r: Math.max(0, Math.min(c2.r !== void 0 ? c2.r : 0, 1)),
    g: Math.max(0, Math.min(c2.g !== void 0 ? c2.g : 0, 1)),
    b: Math.max(0, Math.min(c2.b !== void 0 ? c2.b : 0, 1))
  };
  if (c2.alpha !== void 0) {
    res.alpha = c2.alpha;
  }
  return res;
};
var to_displayable_srgb = (c2) => fixup_rgb(rgb2(c2));
var inrange_rgb = (c2) => {
  return c2 !== void 0 && (c2.r === void 0 || c2.r >= 0 && c2.r <= 1) && (c2.g === void 0 || c2.g >= 0 && c2.g <= 1) && (c2.b === void 0 || c2.b >= 0 && c2.b <= 1);
};
function displayable(color) {
  return inrange_rgb(rgb2(color));
}
function inGamut(mode = "rgb") {
  const { gamut } = getMode(mode);
  if (!gamut) {
    return (color) => true;
  }
  const conv = converter_default(typeof gamut === "string" ? gamut : mode);
  return (color) => inrange_rgb(conv(color));
}
function clampGamut(mode = "rgb") {
  const { gamut } = getMode(mode);
  if (!gamut) {
    return (color) => prepare_default(color);
  }
  const destMode = typeof gamut === "string" ? gamut : mode;
  const destConv = converter_default(destMode);
  const inDestGamut = inGamut(destMode);
  return (color) => {
    const original = prepare_default(color);
    if (!original) {
      return void 0;
    }
    const converted = destConv(original);
    if (inDestGamut(converted)) {
      return original;
    }
    const clamped = fixup_rgb(converted);
    if (original.mode === clamped.mode) {
      return clamped;
    }
    return converter_default(original.mode)(clamped);
  };
}
function clampChroma(color, mode = "lch", rgbGamut = "rgb") {
  color = prepare_default(color);
  let inDestinationGamut = rgbGamut === "rgb" ? displayable : inGamut(rgbGamut);
  let clipToGamut = rgbGamut === "rgb" ? to_displayable_srgb : clampGamut(rgbGamut);
  if (color === void 0 || inDestinationGamut(color)) return color;
  let conv = converter_default(color.mode);
  color = converter_default(mode)(color);
  let clamped = { ...color, c: 0 };
  if (!inDestinationGamut(clamped)) {
    return conv(clipToGamut(clamped));
  }
  let start = 0;
  let end = color.c !== void 0 ? color.c : 0;
  let range = getMode(mode).ranges.c;
  let resolution = (range[1] - range[0]) / Math.pow(2, 13);
  let _last_good_c = clamped.c;
  while (end - start > resolution) {
    clamped.c = start + (end - start) * 0.5;
    if (inDestinationGamut(clamped)) {
      _last_good_c = clamped.c;
      start = clamped.c;
    } else {
      end = clamped.c;
    }
  }
  return conv(
    inDestinationGamut(clamped) ? clamped : { ...clamped, c: _last_good_c }
  );
}

// ../../node_modules/.pnpm/culori@4.0.2/node_modules/culori/src/index.js
var a98 = useMode(definition_default2);
var cubehelix = useMode(definition_default3);
var dlab = useMode(definition_default4);
var dlch = useMode(definition_default5);
var hsi = useMode(definition_default6);
var hsl2 = useMode(definition_default7);
var hsv = useMode(definition_default8);
var hwb = useMode(definition_default9);
var itp = useMode(definition_default10);
var jab = useMode(definition_default11);
var jch = useMode(definition_default12);
var lab = useMode(definition_default13);
var lab65 = useMode(definition_default14);
var lch = useMode(definition_default15);
var lch65 = useMode(definition_default16);
var lchuv = useMode(definition_default17);
var lrgb = useMode(definition_default18);
var luv = useMode(definition_default19);
var okhsl = useMode(modeOkhsl_default);
var okhsv = useMode(modeOkhsv_default);
var oklab = useMode(definition_default20);
var oklch = useMode(definition_default21);
var p3 = useMode(definition_default22);
var prophoto = useMode(definition_default23);
var rec2020 = useMode(definition_default24);
var rgb3 = useMode(definition_default);
var xyb = useMode(definition_default25);
var xyz50 = useMode(definition_default26);
var xyz65 = useMode(definition_default27);
var yiq = useMode(definition_default28);

// ../../packages/core/src/color.ts
var toOklch = converter_default("oklch");
var clamp01 = (n) => Math.min(1, Math.max(0, n));
function hex2(color) {
  const inGamut2 = clampChroma({ mode: "oklch", l: clamp01(color.l), c: Math.max(0, color.c), h: color.h }, "oklch");
  return formatHex(inGamut2) ?? "#000000";
}
function lch2(hexOrCss) {
  const parsed = parse_default(hexOrCss);
  if (!parsed) throw new Error(`Unparseable color: ${hexOrCss}`);
  const c2 = toOklch(parsed);
  return { l: c2.l, c: c2.c ?? 0, h: Number.isFinite(c2.h) ? c2.h : 0 };
}

// ../../packages/core/src/detectors-shared.ts
var toPx = (value) => {
  const v = value.trim();
  return v.endsWith("%") ? v : `${+(parseFloat(v) * (/r?em$/i.test(v) ? 16 : 1)).toFixed(2)}px`;
};
var hex6 = (value) => {
  const h = value.replace(/^#/, "").toLowerCase();
  return `#${h.length <= 4 ? h.slice(0, 3).replace(/./g, (c2) => c2 + c2) : h.slice(0, 6)}`;
};
var BRAND = /primary|accent|brand|main|theme|highlight|cta|link|interactive/i;
function tone(value) {
  const v = value.trim();
  try {
    return lch2(/^-?\d/.test(v) && v.includes("%") ? `hsl(${v})` : v);
  } catch {
    return void 0;
  }
}
var isPurple = (value) => {
  const t = tone(value);
  return !!t && t.c >= 0.06 && t.h >= 270 && t.h < 335;
};
var bare = (k4) => k4.replace(/^--/, "").replace(/^colou?r[-_]/i, "");
var PAGE_TOKEN = /^(?:background|bg|page|canvas|body)(?:[-_]?(?:default|base|primary))?$/i;
var SURFACE_TOKEN = /^(?:card|surface|panel|popover)(?:[-_]?(?:default|base|primary|bg|background))?$/i;
var BORDER_TOKEN = /^(?:border|stroke|outline|divider|separator)(?:[-_]?(?!foreground)\w+)?$/i;
var sameColour = (a, b) => {
  const x = tone(a);
  const y = tone(b);
  if (!x || !y) return a.trim().toLowerCase() === b.trim().toLowerCase();
  return Math.abs(x.l - y.l) < 5e-3 && Math.abs(x.c - y.c) < 5e-3 && (x.c < 0.01 || Math.abs(((x.h ?? 0) - (y.h ?? 0) + 540) % 360 - 180) < 2);
};
function separationOf(system2) {
  const tokens = Object.entries(system2.colorTokens).filter(([, v]) => !/var\(/.test(v)).map(([k4, v]) => [bare(k4), v]);
  const page = tokens.find(([k4]) => PAGE_TOKEN.test(k4))?.[1];
  const surfaces = tokens.filter(([k4]) => SURFACE_TOKEN.test(k4)).map(([, v]) => v);
  if (!page || !surfaces.length || !tokens.some(([k4]) => BORDER_TOKEN.test(k4))) return "fill";
  const same = surfaces.filter((v) => sameColour(v, page)).length;
  return !same ? "fill" : same === surfaces.length ? "stroke" : "mixed";
}
var mutedBy = (muted) => (f3) => muted.some((m) => m.ban === f3.ban && (!m.only || m.only.includes(f3.detector)));
function mutedFor(system2) {
  const muted = [];
  const branded = Object.entries(system2.colorTokens).filter(([k4, v]) => BRAND.test(k4) && tone(v));
  const loudest = [...system2.colors].sort((a, b) => (tone(b)?.c ?? 0) - (tone(a)?.c ?? 0))[0];
  const purple = branded.length ? branded.find(([, v]) => isPurple(v)) : loudest && isPurple(loudest) ? ["the colour", loudest] : void 0;
  if (purple) muted.push({ ban: "purple-accent", reason: `Your system declares ${purple[0]} as ${purple[1]}, a purple: it is your brand, so purple is not flagged.` });
  const pill = system2.radii.find((r2) => parseFloat(r2) >= (r2.endsWith("%") ? 50 : 100));
  if (pill) muted.push({ ban: "big-radius", reason: `Your system declares a ${pill} radius, so pill shapes are part of it.` });
  const effects = Object.entries(system2.effects ?? {});
  const blur = effects.find(([k4, v]) => /blur|glass|frost/i.test(k4) || /blur\(/i.test(v));
  const blurs = system2.blurs ?? [];
  if (blur) muted.push({ ban: "glass", reason: `Your system declares ${blur[0]} (${blur[1]}), so backdrop blur is part of it.` });
  else if (blurs.length)
    muted.push({ ban: "glass", reason: `Your product uses a backdrop blur (${blurs[0]}${blurs.length > 1 ? ` and ${blurs.length - 1} more` : ""}), so a translucent fill with a blur is yours.` });
  if (separationOf(system2) === "stroke")
    muted.push({
      ban: "double-separation",
      only: ["fill-and-border", "figma-fill-and-stroke"],
      reason: "Your surfaces share the page's colour and separate by a stroke, so the stroke is yours: a border beside a fill is not flagged, a border with a shadow still is."
    });
  const gradient = [...effects, ...Object.entries(system2.colorTokens)].find(([k4, v]) => /gradient/i.test(k4) || /gradient\(/i.test(v));
  if (gradient) muted.push({ ban: "gradients", reason: `Your system declares ${gradient[0]}, so gradients are part of it.` });
  const blacks = Object.entries(system2.colorTokens).filter(([, v]) => (tone(v)?.l ?? 1) < 1e-3 && !/rgba|hsla|\/|#[0-9a-f]{4}(?:[0-9a-f]{4})?\b/i.test(v));
  const black = blacks.find(([k4]) => !/backdrop|overlay|scrim|shadow|modal/i.test(k4));
  if (black) muted.push({ ban: "neon-dark", reason: `Your system declares ${black[0]} as pure black, so #000 is yours.` });
  else if (!blacks.length && system2.colors.includes("#000000")) muted.push({ ban: "neon-dark", reason: "Your system declares #000000 among its colours, so pure black is yours." });
  const shadow = effects.find(([k4]) => /shadow|elevation/i.test(k4));
  if (shadow) muted.push({ ban: "card-everything", reason: `Your system declares ${shadow[0]} (${shadow[1]}), so shadows are part of it.` });
  const label = system2.components.find((c2) => /^(?:eyebrow|kicker|overline)$/i.test(c2.name));
  if (label) muted.push({ ban: "icon-everywhere", reason: `Your system has its own ${label.name} component, so a label above a heading is part of it.` });
  const spinner = system2.components.find((c2) => /^(?:\w*Spinner|Loader|\w*ActivityIndicator|LoadingIndicator)$/.test(c2.name));
  if (spinner) muted.push({ ban: "toast-spam", reason: `Your system has its own ${spinner.name} component, so a spinner as the loading state is part of it.` });
  return muted;
}
var WEIGHT = { universal: 2, drift: 1, taste: 0.5 };
var scoreOf = (findings2, scanned) => scanned ? Math.round(findings2.reduce((sum, f3) => sum + WEIGHT[f3.kind], 0) * 1e4 / scanned) / 10 : 0;
var SCORE_BANDS = [
  { id: "clean", label: "Clean", note: "nothing generic to speak of", from: 0, to: 3 },
  { id: "light", label: "Light", note: "a few generic patterns", from: 3, to: 10 },
  { id: "noticeable", label: "Noticeable", note: "generic patterns across the product", from: 10, to: 20 },
  { id: "heavy", label: "Heavy", note: "the interface reads as generated", from: 20, to: null }
];
var scoreBand = (score2) => SCORE_BANDS.find((b) => b.to === null || score2 < b.to) ?? SCORE_BANDS[SCORE_BANDS.length - 1];

// ../../packages/core/src/source-files.ts
var NATIVE_THEME = String.raw`(?:^|\/)(?:\w*(?:theme|colou?rs?|palette|typography|shapes?|radii|dimens|spacing|fonts?|styles|design_?system|design_?tokens)|type|tokens?)(?:\+\w+)?\.(?:dart|swift|kt)$`;
var MAX_FILE = 4e5;
var UI_FILE = /\.(tsx|jsx|ts|js|mjs|vue|svelte|astro|html|css|scss|dart|swift|kt)$/;
var NOT_UI = /\.(test|spec|stories|story|d|min)\.\w+$|(^|\/)[\w.-]+\.config\.[cm]?[jt]s$|\.(?:g|freezed|gr|mocks|config|pb)\.dart$|_test\.dart$|(^|\/)GeneratedPluginRegistrant\.\w+$/;
var CONFIG_FILE = new RegExp(
  String.raw`(^|\/)(package\.json|tailwind\.config\.[cm]?[jt]s|(?:design-)?tokens?[\w.-]*\.json|theme[\w.-]*\.json|pubspec\.yaml|[^/]+\.colorset\/Contents\.json|res\/values(?:-night)?\/(?:colors|themes|styles)\.xml)$|${NATIVE_THEME}`,
  "i"
);
var SKIPPED = /(^|\/)(node_modules|dist|build|out|coverage|vendor|storybook-static|__tests__|__mocks__|tests?|e2e|cypress|bin|scripts|Pods|Carthage|DerivedData|generated|androidTest|[\w-]+Tests|\.[^/]+)\//;
var RULES_FILE = /(^|\/)(DESIGN[^/]*\.md|CLAUDE\.md|AGENTS\.md|\.cursorrules)$/;
var keepSource = (path, size) => size <= MAX_FILE && !SKIPPED.test(path) && (CONFIG_FILE.test(path) || RULES_FILE.test(path) || UI_FILE.test(path) && !NOT_UI.test(path));
var isSource = (path) => UI_FILE.test(path) && !NOT_UI.test(path);
var PLAIN_SCRIPT = /\.(ts|js|mjs)$/;
var TOUCHES_UI = /\bdocument\.|\bwindow\.|innerHTML|querySelector|createElement|classList|className|\bclass="|<[A-Za-z][\w-]*[\s>/]|\bstyle\s*[.=]|from\s+["'](?:react|vue|svelte|preact|solid-js|lit)\b/;
var APP_CODE = /\.(dart|swift|kt)$/;
var BUILDS_UI = /\bWidget\s+build\s*\(|\bsome\s+View\b|:\s*(?:[\w.]+\s*,\s*)*View\s*[,{]|@Composable\b|\bUI(?:View|ViewController|Label|Button|StackView|TableViewCell|CollectionViewCell)\b|\bsetContentView\s*\(/;
var isUiSource = (file) => isSource(file.path) && (PLAIN_SCRIPT.test(file.path) ? TOUCHES_UI.test(file.text) : !APP_CODE.test(file.path) || BUILDS_UI.test(file.text));

// ../../packages/core/src/detectors.ts
var MARKUP = [".tsx", ".jsx", ".vue", ".svelte", ".html", ".astro"];
var CODE = [...MARKUP, ".ts", ".js", ".mjs"];
var ALL = [...CODE, ".css", ".scss"];
var Q = String.raw`"'\x60`;
var AT = String.raw`(?<=[\s${Q}:])`;
var BASE = String.raw`(?<=[\s${Q}])`;
var END = String.raw`(?=[\s${Q};!]|$)`;
var SAME = String.raw`[^\n${Q}]{0,400}`;
var IN_CLASS = String.raw`(?<=(?:[${Q}]|@apply\s)[^\n${Q}>]{0,600})`;
var attrs = (n = 400) => String.raw`(?:=>|[^>]){0,${n}}?`;
var ATTRS = attrs();
var PALETTE_PREFIX = String.raw`(?:bg|text|border(?:-[trblxyse])?|ring(?:-offset)?|outline|divide|from|via|to|fill|stroke|decoration|accent|caret|placeholder|shadow)`;
var HUES = "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
var SHADE = String.raw`(?:50|[1-9]00|950)`;
var ALPHA = String.raw`(?:\/(?:\d{1,3}|\[[\d.]+%?\]))?`;
var LENGTH = String.raw`\d*\.?\d+(?:px|rem|em)`;
var SPACE = String.raw`(?![01](?:\.0+)?px|0(?:\.0+)?r?em)\d*\.?\d+(?:px|rem|em)`;
var MS = String.raw`(?:30[1-9]|3[1-9]\d|[4-9]\d\d|[1-9]\d{3,})`;
var SEC = String.raw`(?:0?\.(?:3\d*[1-9]|[4-9])\d*|[1-9]\d*(?:\.\d+)?)`;
var MS_SHEET = String.raw`(?:30[1-9]|3[1-9]\d|400)`;
var MS_SCREEN = String.raw`(?:40[1-9]|4[1-4]\d|450)`;
var MS_OVER = String.raw`(?:45[1-9]|4[6-9]\d|[5-9]\d\d|[1-9]\d{3,})`;
var SEC_SHEET = String.raw`(?:0?\.(?:3\d*[1-9]\d*|40*))`;
var SEC_SCREEN = String.raw`(?:0?\.4(?:[1-4]\d*|0+[1-9]\d*|50*))`;
var SEC_OVER = String.raw`(?:0?\.(?:4(?:5\d*[1-9]|[6-9])\d*|[5-9]\d*)|[1-9]\d*(?:\.\d+)?)`;
var SHEET_WORD = String.raw`(?:(?<![Ss]tyle|[Ss]pread)[Ss]heet|[Dd]rawer)`;
var SCREEN_WORD = String.raw`(?:[Ff]ull-?[Ss]creen|(?:[Pp]age|[Rr]oute|[Ss]creen)-?(?:[Tt]ransition|enter|leave|exit)|view-transition)`;
var BLOCK = String.raw`[^{}]{0,2000}`;
var SEL = String.raw`[^{};]{0,2000}`;
var VALUE = String.raw`[^;{}]{0,400}`;
var notNamed = (word) => String.raw`(?<!(?:^|[{};])${SEL}?${word}${SEL}\{${BLOCK})(?<!${word}[^\n]{0,400})(?![^\n]{0,400}${word})`;
var ANY_DURATION = String.raw`(?:(?<![\w.])\d*\.?\d+m?s(?![\w-])|(?<=[\s${Q}:])duration-)`;
var FAST = String.raw`(?:(?<![\w.])(?:\d{1,2}|1\d\d|200)ms(?![\w-])|(?<![\w.])0?\.(?:[01]\d*|20*)s(?![\w-])|(?<=[\s${Q}:])duration-(?:75|100|150|200|\[(?:\d{1,2}|1\d\d|200)ms\])(?=[\s${Q}]))`;
var ACCORDION_WORD = String.raw`(?:[Aa]ccordion|[Cc]ollaps(?:e|ible)|[Dd]isclosure|(?<![\w-])details(?![\w-]))`;
var HEIGHT_PROP = String.raw`(?<![\w-])(?:max-|min-)?height(?![\w-])`;
var NOT_ACCORDION = String.raw`(?!(?:(?<=(?:^|[{};])${SEL}?${ACCORDION_WORD}${SEL}\{${BLOCK})|(?<=${ACCORDION_WORD}[^\n]{0,400})|(?=[^\n]{0,400}${ACCORDION_WORD}))(?=(?:(?!${ANY_DURATION})[^{}]){0,300}${FAST}))`;
var LAYOUT_MOVE = String.raw`(?:${HEIGHT_PROP}${NOT_ACCORDION}|(?<![\w-])(?:(?:max-|min-)?width|padding(?:-[a-z]+)?|margin(?:-[a-z]+)?)(?![\w-]))`;
var OVERSHOOT = String.raw`(?:-\d*\.?\d+|1\.\d*[1-9]\d*|[2-9](?:\.\d+)?)`;
var BOUNCY = String.raw`(?:bounce|wobble|jiggle|jello|tada|swing|rubber-?band|elastic)`;
var BIG = String.raw`(?:h|w|size)-(?:[6-9]|1\d|2[0-4]|\[(?:2[4-9]|[3-9]\d)px\])`;
var BORDER = String.raw`${BASE}border(?:-[1-9]\d*)?(?=[\s${Q};])`;
var SHADOW = String.raw`${BASE}shadow(?:-(?:xs|sm|md|lg|xl|2xl))?(?=[\s${Q};])`;
var CLEAR_BORDER = String.raw`(?<!${BASE}border-(?:[xytrblse]-)?transparent${SAME})(?!${SAME}${BASE}border-(?:[xytrblse]-)?transparent(?=[\s${Q}]))`;
var STATE_RULE = String.raw`(?::hover|:focus|:active|:checked|:target|\[data-state|\[aria-(?:selected|current|expanded|pressed|checked)|\[open\]|\.(?:is-)?(?:active|selected|open|current)\b)[^{};]{0,160}\{[^{}]{0,2000}`;
var WIDE_CSS = String.raw`(?:(?:0?\.(?:0[5-9]|[1-9])\d*|[1-9]\d*(?:\.\d+)?)r?em|[1-9]\d*(?:\.\d+)?px)(?![\w.])`;
var WIDE = String.raw`${BASE}tracking-(?:wide|wider|widest|\[${WIDE_CSS}\])${END}`;
var WIDE_JS = String.raw`(?:[${Q}]${WIDE_CSS}[${Q}]|[1-9]\d*(?:\.\d+)?(?![\w.%]))`;
var UPPER = String.raw`${BASE}uppercase${END}`;
var FIELD = String.raw`<(?:input|textarea|select|selecttrigger)\b[^>]{0,800}`;
var TAG_END = String.raw`(?<![=-]|\S[ \t]+)>`;
var IN_TEXT = String.raw`(?<=(?:${TAG_END}[^<>{}${Q}]{0,300}|[${Q}][^<>{}${Q}\n]{0,200}))`;
var NOT_COMMENT = String.raw`(?<!(?:(?:^|\n)[ \t]*(?:\/\/|\/\*|\*|\{\/\*|<!--)|(?<![:\w\/${Q}=])\/\/)(?<=[\/*-])[^\n]{0,2000})`;
var FLOATS = String.raw`dialog|modal|popover|popper|menu|dropdown|tooltip|toast|snackbar|sheet|drawer|popup|overlay|hover-?card|command|combobox|listbox|autocomplete|floating|lightbox|fab|thumb(?!nail)|knob|segment`;
var FLOAT_PATH = String.raw`dialog|modal|popover|popper|menu|dropdown|tooltip|toast|snackbar|(?<!style)sheet|drawer|popup|overlay|hover-?card|command|combobox|listbox|autocomplete|floating|lightbox|(?<![a-z])fab(?![a-z])|thumb(?!nail)|select|segment|toggle-?group`;
var FLOATING = String.raw`(?:${BASE}(?:fixed|absolute)${END}|(?<=[\s${Q}:-])(?:${FLOATS})(?=[\s${Q}-]))`;
var FLOAT_RULE = String.raw`(?:${FLOAT_PATH}|dock|picker|handle|knob|toolbar|palette|calendar|banner)`;
var CONTROL_TAG = String.raw`<(?:button|input|select|selecttrigger|textarea|chip|toggle|togglegroupitem|badge|tag)\b|\b(?:button|chip|toggle|badge)Variants\s*\(`;
var CONTROL_CVA = String.raw`\b(?:button|input|select|textarea|chip|toggle|badge|tag)\w*Variants\s*=\s*(?:cva|tv)\(\s*`;
var square = (id, scope2) => String.raw`(?:(?<=[\s${Q}:])(?:size-[^\s${Q}]+|aspect-square)(?=[\s${Q}])` + String.raw`|(?<=[\s${Q}])w-(?<w${id}>[\w.\[\]]+)(?=[\s${Q}])${scope2}{0,1200}?(?<=[\s${Q}])h-\k<w${id}>(?=[\s${Q}])` + String.raw`|(?<=[\s${Q}])h-(?<h${id}>[\w.\[\]]+)(?=[\s${Q}])${scope2}{0,1200}?(?<=[\s${Q}])w-\k<h${id}>(?=[\s${Q}])` + String.raw`|\bsize\s*[=:]\s*\{?\s*[${Q}]icon|\btype\s*=\s*\{?\s*[${Q}](?:radio|checkbox|range|color)\b)`;
var SQUARE_CSS = String.raw`(?:aspect-ratio\s*:\s*1\b|(?<![-\w])width\s*:\s*(?<cw>[\d.]+(?:px|r?em))[^}]{0,2000}?(?<![-\w])height\s*:\s*\k<cw>(?![\w.])|(?<![-\w])height\s*:\s*(?<ch>[\d.]+(?:px|r?em))[^}]{0,2000}?(?<![-\w])width\s*:\s*\k<ch>(?![\w.]))`;
var PILL_CSS = String.raw`(?:(?:9\d\d|[1-9]\d{3,})(?:\.\d+)?px|[1-9]\d{2,}(?:\.\d+)?r?em|50%|100%)(?![\w%.])`;
var NO_BLUR = String.raw`(?<!\{[^{}]{0,2000}backdrop-(?:filter|blur)[^{}]{0,2000})(?![^{}]{0,2000}backdrop-(?:filter|blur))`;
var TRANSLUCENT = String.raw`(?:(?<=[\s${Q}:])bg-(?!\[url)[^\s${Q}]*\/(?:\d{1,3}|\[[\d.]+%?\])(?=[\s${Q}])|(?<=[\s${Q}:])bg-\[(?:rgba|hsla|color-mix)\(|(?<=[\s${Q}:])bg-opacity-\d)`;
var TRANSLUCENT_CSS = String.raw`(?<![-\w])background(?:-color)?\s*:${VALUE}?(?:rgba\(|hsla\(|\/\s*(?:0?\.\d+|\d{1,2}(?:\.\d+)?%)\s*\)|#[0-9a-fA-F]{8}\b|color-mix\()`;
var TRANSLUCENT_JS = String.raw`(?<![-\w])background(?:Color)?\s*:\s*[${Q}][^${Q}]{0,400}?(?:rgba\(|hsla\(|\/\s*(?:0?\.\d+|\d{1,2}(?:\.\d+)?%)|#[0-9a-fA-F]{8}\b)`;
var STUCK = String.raw`(?<=[\s${Q}:])(?:sticky|fixed)(?=[\s${Q}])`;
var NOT_PAGE = String.raw`(?!(?:transparent|none|inherit|initial|unset|white|#fff\b|#ffffff\b|var\(--(?:bg|background|page|body|canvas)[\w-]*\)))`;
var FILL_AHEAD = String.raw`(?<![-\w])background(?:-color)?\s*:\s*(?!\s)${NOT_PAGE}`;
var FILL_DECL = String.raw`(?<![-\w])(?=background(?:-color)?\s*:\s*(?!\s)${NOT_PAGE})background(?:-color)?\s*:\s*(?!\s)[^;{}]{1,80};`;
var SIDEWAYS = String.raw`translate(?:X|3d)?\(\s*(?:calc\(\s*)?-`;
var PURPLES = "6366f1|4f46e5|4338ca|818cf8|8b5cf6|7c3aed|6d28d9|a78bfa|a855f7|9333ea|7e22ce|c084fc|d946ef|c026d3|a21caf|e879f9|667eea|764ba2|6c63ff|7f5af0";
var neutral = (id) => String.raw`(?:#(?:0{3,8}|[fF]{3,8})(?![\da-fA-F])|#(?<n${id}a>[\da-fA-F]{2})\k<n${id}a>\k<n${id}a>(?:[\da-fA-F]{2})?(?![\da-fA-F])|#(?<n${id}b>[\da-fA-F])\k<n${id}b>\k<n${id}b>[\da-fA-F]?(?![\da-fA-F])` + String.raw`|rgba?\(\s*(?<n${id}c>\d{1,3})\s*[,\s]\s*\k<n${id}c>\s*[,\s]\s*\k<n${id}c>(?!\d)|hsla?\(\s*[\d.]+(?:deg)?\s*[,\s]\s*0%|black\b|white\b|gr[ae]y\b|transparent\b|currentColor\b` + String.raw`|var\(--(?![\w-]*(?:primary|accent|brand|glow|neon))|theme\()`;
var textRule = (body) => String.raw`(?<=(?:^|[{};])${SEL}?(?:(?<![\w.#-])(?:p|article${body ? "|body" : ""})(?![\w-])|\.[\w-]*(?:prose|paragraph|lead|copy|description${body ? "|body" : ""})[\w-]*)${SEL}\{${BLOCK})`;
var CONTROL_RULE = String.raw`(?<=(?:^|[{};])${SEL}?(?:(?<![\w.#-])(?:button|a|label|input|select)(?![\w-])|\.[\w-]*(?:btn|button|link|label|chip|badge|tab)[\w-]*)${SEL}\{${BLOCK})`;
var IN_P = String.raw`(?<=<p\b${ATTRS})`;
var P_TEXT = (n) => String.raw`(?=${ATTRS}>\s*[^\s<>{}][^<>{}]{${n - 1},})`;
var STRIPE = String.raw`(?:[3-9]|[1-9]\d)(?:\.\d+)?px`;
var ROUNDED = String.raw`(?<=[\s${Q}:])rounded(?!-none)(?:-[\w\[\].]+)?(?=[\s${Q}])`;
var ROUND_FULL = String.raw`(?<=[\s${Q}:])rounded-full(?=[\s${Q}])`;
var CARD = "Card|v-card|el-card|mat-card";
var hexFill = (not, name) => String.raw`\bfill\s*=\s*\{?\s*["']?${not.length ? String.raw`(?!(?:${not.map((n) => String.raw`\k<${n}>`).join("|")})(?![\da-fA-F]))` : ""}${name ? `(?<${name}>` : "(?:"}#[\da-fA-F]{3,8})(?![\da-fA-F])`;
var nextFill = (name, not) => String.raw`(?:(?!<\/svg>|${hexFill(not)})[\s\S]){0,6000}${hexFill(not, name)}`;
var HEADING_NEXT = String.raw`(?=\s*<(?:h[1-3]\b|[A-Z]\w*(?:Title|Heading)\b))`;
var LABEL_TEXT = String.raw`\s*(?:<[A-Z][\w.]*${ATTRS}\/>\s*)?(?!\d|(?:Step|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b)[^<>{}\n]{2,40}`;
var DARK_BG = String.raw`(?<=[\s${Q}:])bg-(?:black|(?:slate|gray|zinc|neutral|stone)-(?:800|900|950)|\[#[01][\da-fA-F][01][\da-fA-F][0-2][\da-fA-F]\])(?:\/\d+)?(?=[\s${Q}])`;
var HAIRLINE = String.raw`(?<![\d.])[12](?:\.\d+)?px[\s_]*[,_][\s_]*transparent`;
var COMPUTED = String.raw`(?![^;\n]{0,300}?(?:\$\{[^}\n]{1,60}\}|[${Q}]\s*\+\s*[\w.()]{1,40}\s*\+\s*[${Q}])\s*%)`;
var FROM_TR = String.raw`(?<=[\s${Q}:])(?:from|via|to)-transparent`;
var HYPE = String.raw`supercharge[sd]?|seamless(?:ly)?|effortless(?:ly)?|unleash(?:es|ed|ing)?|revolutioni[sz](?:e[sd]?|ing)|empower(?:s|ed|ing)?|streamlin(?:e[sd]?|ing)|leverag(?:e[sd]?|ing)` + String.raw`|cutting[- ]edge|next[- ]gen(?:eration)?|game[- ]chang(?:er|ers|ing)|state[- ]of[- ]the[- ]art|enterprise[- ]grade|mission[- ]critical|future[- ]proof|(?:blazing(?:ly)?|lightning)[- ]fast` + String.raw`|unparalleled|reimagin(?:e[sd]?|ing)|harness(?:es|ed|ing)? the power|synerg(?:y|ies|istic)`;
var CLAIM = String.raw`(?<![\p{L}\d.,])(?!9+\+)\d{1,3}(?:[,. ]\d{3})*(?:\.\d+)?\s?[KMB]?\+(?=\s*(?:[\p{L}<${Q}]|$))` + String.raw`|\b(?:since|est\.?|established(?:\s+in)?|founded(?:\s+in)?)\s+(?:19|20)\d{2}\b|(?<!\p{L})с\s+(?:19|20)\d{2}\s*(?:г\.|года)|\b(?:19|20)\d{2}\s*-?\s*yil(?:dan)?\s+beri\b` + String.raw`|(?<![\w.\[(-])99(?:\.\d+)?\s?%|(?<![\w.\[(-])100\s?%(?=\s+\p{L})|(?<![\w&#])(?:#|№\s?)1(?!\d)(?=\s+\p{L})` + String.raw`|\b(?:best[- ]in[- ]class|world[- ]class|(?:industry|market)[- ]leading|award[- ]winning|the\s+(?:world'?s\s+)?leading|trusted\s+by|loved\s+by|used\s+by\s+(?:over\s+|more\s+than\s+)?\d)`;
var PLACEHOLDER_URL = String.raw`(?:https?:)?\/\/(?:[\w-]+\.)*(?:picsum\.photos|placehold\.(?:co|it)|placeholder\.com|dummyimage\.com|unsplash\.it|source\.unsplash\.com|loremflickr\.com|placekitten\.com|fakeimg\.pl)(?![\w-])`;
var MARKUP_CSS = [...MARKUP, ".css", ".scss"];
var CHROME_NAME = String.raw`(?<![\w-])(?:browser[-_]?(?:bar|chrome|frame|window|mockup)|fake[-_]?browser|mock[-_]?window|terminal[-_]?header)(?![\w-])`;
var chromeDot = (hue3) => String.raw`<(?:div|span)\b(?=${ATTRS}(?<=[\s${Q}])rounded-full(?=[\s${Q}]))(?=${ATTRS}(?<=[\s${Q}])bg-(?:${hue3})-\d{2,3}(?=[\s${Q}]))${ATTRS}\/?>(?:\s*<\/(?:div|span)>)?`;
var HEADING_RULE = String.raw`(?<=(?:^|[{};])${SEL}?(?:(?<![\w.#-])h[12](?![\w-])|\.[\w-]*(?<!sub-?)(?:title|heading|headline|display)[\w-]*)${SEL}\{${BLOCK})`;
var ITALIC = String.raw`${BASE}italic${END}`;
var INSET_PROP = String.raw`(?<![\w-])(?:top|left|right|bottom|inset(?:-[a-z]+)?)(?![\w-])`;
var MOVED_PROP = String.raw`(?:${LAYOUT_MOVE}|${INSET_PROP})`;
var FOCUS_RULE = String.raw`(?<=(?:^|[{};])${SEL}?:focus(?:-visible|-within)?${SEL}\{${BLOCK})`;
var HIGH_Z = String.raw`(?:9\d\d|[1-9]\d{3,})`;
var HERO = String.raw`(?:hero|banner|masthead|splash)`;
var SUB_ONE = String.raw`(?:0?\.\d+(?![\d.])|[1-9]\d?%)`;
var TIGHT_LEADING = String.raw`${BASE}leading-\[${SUB_ONE}\]${END}`;
var VENDOR_HOST = String.raw`(?:fonts\.(?:googleapis|gstatic)\.com|fonts\.bunny\.net|(?:use|p)\.typekit\.net|fast\.fonts\.net|(?:use|kit)\.fontawesome\.com|cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|ajax\.googleapis\.com|code\.jquery\.com|(?:stackpath|maxcdn|netdna)\.bootstrapcdn\.com|api\.iconify\.design|cdn\.simpleicons\.org|raw\.githubusercontent\.com)`;
var INK_VALUE = String.raw`(?:(?:hsla?|rgba?|oklch|lab|lch)\(\s*)?(?:#(?:[0-3][\da-fA-F]){3}(?![\da-fA-F])|#[0-3]{3}(?![\da-fA-F])|black(?![\w-])|var\(--(?:[\w-]*-)?(?:ink|foreground|on-surface|on-background)(?:-[\w-]*)?\))`;
var PANEL_RULE = String.raw`(?<=(?:^|[{};])${SEL}?(?:(?<![\w.#-])(?:section|footer)(?![\w-])|\.[\w-]*(?:section|panel|card|banner|hero|footer)[\w-]*)${SEL}\{${BLOCK})`;
var EDITORIAL = String.raw`(?:article|prose|editorial|blog|essay|story|markdown|entry-content|post-(?:body|content))`;
var EDITORIAL_PATH = String.raw`(?:^|\/)(?:articles?|blog|posts?|prose|editorial|essays?|stories)\/|\.mdx?$`;
var FIXED_H = String.raw`${BASE}h-(?:\d+(?:\.5)?|px|\[\d*\.?\d+(?:px|r?em)\])${END}`;
var ROOT_RULE = String.raw`(?<=(?:^|[{};,])\s*(?:html|:root)(?:[.\[:#][^\s,{};]*)?\s*(?:,${SEL})?\{${BLOCK})`;
var CONSENT = String.raw`(?:newsletter|marketing|subscri(?:be|ption)|promo(?:tion)?(?:al|s)?|special[ _-]?offers?|opt[ _-]?in(?![a-z])|mailing[ _-]?list|consent|(?:accept|agree)[\w ]{0,20}terms|terms[\w -]{0,20}(?:accept|agree|conditions)|share[ _-]?(?:my[ _-]?)?data|data[ _-]?sharing)`;
var CONSENT_ID = String.raw`(?!(?:show|open|is(?:open|visible|shown)|visible|display|has(?:seen)?)[A-Z_\w])\w*(?:newsletter|opt_?in(?![a-z])|consent|(?:accept|agree)\w*terms|terms\w*(?:accept|agree)|marketing(?:emails?|mail|opt\w*|consent|updates)|subscribe(?!d)|promo\w*emails?|mailing_?list|share_?data)\w*(?<!open|visible|shown|modal|dialog|popup|banner|loading|error)`;
var NEAR_BACK = String.raw`(?:[^<]|<(?!\/label\b|\/form\b)){0,240}`;
var NEAR_AHEAD = String.raw`(?:[^<]|<(?!\/label\b|\/form\b|input\b)){0,240}`;
var SCARCE = String.raw`(?:viewers?|viewing|watching|in[ _-]?stock|stock[ _-]?(?:left|count)|(?:spots?|seats?|rooms?|items?|units?|tickets?|only)[ _-]?left|hurry|people[ _-]?(?:are[ _-]?)?(?:viewing|watching|looking))`;
var TEST_SKIP = String.raw`(?:^|\/)(?:node_modules|__tests__|__mocks__|tests?|e2e|cypress|playwright|\.storybook)\/|\.(?:test|spec|stories|story|cy)\.\w+$`;
var DIALOG = "alert|confirm|prompt";
var OWN_DIALOG = String.raw`(?<![\w.$])(?<k>${DIALOG})(?:(?<=(?:\bfunction\s*\*?|\b(?:const|let|var)|\bimport|\bas)\s*\w+)\b|(?<=[{,]\s*\w+)\s*[,}=]|\s*\([^()\n]*\)\s*\{)`;
var CLICHE = String.raw`(?:\w*(?:Sparkle|Wand|Magic|Rocket)\w*|AutoAwesome\w*|AutoFixHigh\w*)(?![\w$])`;
var ICON_PACKAGE = String.raw`(?:lucide-react|lucide-vue-next|lucide-svelte|lucide-react-native|@lucide\/[\w-]+|@heroicons\/[\w\/-]+|react-icons\/[\w\/-]+|@hugeicons\/[\w\/-]+|@phosphor-icons\/[\w\/-]+|phosphor-react|@tabler\/icons[\w\/-]*|@radix-ui\/react-icons|@mui\/icons-material[\w\/-]*|react-feather|iconoir-react|@iconify[\w\/-]*|@fortawesome\/[\w\/-]+|@expo\/vector-icons[\w\/-]*|react-native-vector-icons[\w\/-]*)`;
var CJK = String.raw`(?:ja|zh|ko)(?:-[\w-]+)?`;
var tagAttrs = (n) => String.raw`(?:[=&]>|\s>\s|[^>]){0,${n}}?`;
var LINK_WIRED = String.raw`(?<![\w:.-])(?:(?:on[Cc]lick|id|role|hx-[\w-]+|data-(?:bs-)?(?:toggle|target|action)|aria-(?:controls|haspopup|expanded))\s*=|(?:@click|v-on:click|on:click|x-on:click)(?![\w-])|\{\s*\.\.\.)`;
var NOWHERE = String.raw`(?:#|javascript:\s*(?:void\s*\(?\s*0\s*\)?\s*;?|;)?)?`;
var DEAD_LINK = String.raw`<(?:a|Link|NuxtLink|RouterLink)\b(?!${tagAttrs(800)}${LINK_WIRED})${tagAttrs(800)}(?<![\w:.-])(?:href|to)\s*=\s*(?:\{\s*[${Q}]${NOWHERE}[${Q}]\s*\}|[${Q}]${NOWHERE}[${Q}](?=[\s/>]))${NOT_COMMENT}`;
var SCRIPT = String.raw`<script\b|scripts were not kept`;
var BUTTON_WIRED = String.raw`(?<![\w:.-])(?:(?:on[A-Z]\w*|ref|id|name|form\w*|popover\w*|command\w*|data-[\w-]+|aria-(?:controls|expanded|haspopup|pressed)|slot)\s*=|disabled(?![\w-])|type\s*=\s*\{?\s*[${Q}](?:submit|reset)|\{\s*\.\.\.)`;
var FORMISH = String.raw`<form\b|<Form\b|[Ss]ubmit|formAction|useFormStatus`;
var headingGap = (n) => String.raw`<h${n}\b(?:(?!<h[1-6]\b|<[A-Z][\w.]*(?:Title|Heading|Header)\b)[\s\S]){0,20000}<`;
var NATIVE = [".dart", ".swift", ".kt"];
var NATIVE_SKIP = String.raw`(?:^|\/)(?:Pods|Carthage|DerivedData|generated|tests?|androidTest|\w+Tests)\/|\.(?:g|freezed|gr|mocks|config|pb)\.dart$|_test\.dart$|GeneratedPluginRegistrant`;
var NATIVE_DRIFT_SKIP = `${NATIVE_SKIP}|${NATIVE_THEME}`;
var IN_STR = String.raw`(?<=(?:^|\n)(?:[^'"\n]|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")*(?:'(?:\\.|[^'\\\n])*|"(?:\\.|[^"\\\n])*))`;
var STR_REST = String.raw`(?:\\.|[^'"\\\n])*`;
var NOT_LOG = String.raw`(?<!\b(?:print|debugPrint|println|NSLog|os_log|log|console\.\w+|Log\.[a-z]+|Timber\.\w+|logger\.\w+)\s*\([^\n]{0,2000})`;
var ARG = String.raw`(?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))`;
var AT_REST = String.raw`(?!\s*null\b)(?![^,()\[\]]*\?)`;
var ONE_SIDE = String.raw`(?!\s*(?:const\s+)?Border\(\s*(?:top|bottom|left|right)\s*:\s*(?:const\s+)?BorderSide\([^()]*\)\s*,?\s*\))`;
var CHAIN = String.raw`(?:[^\n]{0,2000}(?=\n[ \t]*(?:[.)}\]]|(?:RoundedRectangle|UnevenRoundedRectangle|Capsule|Circle|Ellipse|Rectangle|ContainerRelativeShape)\b))\n[ \t]*)`;
var STROKE = String.raw`\.(?:stroke|strokeBorder|border)\(`;
var within = (x) => String.raw`${ARG}*?(?:${x}|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*?(?:${x}|\((?:[^()]|\([^()]*\))*?(?:${x}|\([^()]*?${x})))`;
var CLEAR = String.raw`(?:\b[Tt]ransparent\b|\bclear\b|with(?:Opacity|Alpha)\(\s*0(?:\.0+)?\s*\)|withValues\(\s*alpha\s*:\s*0(?:\.0+)?\s*\)|\.opacity\(\s*0(?:\.0+)?\s*\)|copy\(\s*alpha\s*=\s*0(?:\.0+)?f?\s*\))`;
var WIDE_PT = String.raw`(?:0?\.[5-9]\d*|[1-9]\d*(?:\.\d+)?)`;
var PILL_N = String.raw`(?:[1-9]\d{2,}(?:\.\d+)?(?![\d.])|double\.infinity|\.infinity\b)`;
var squareNear = (id) => String.raw`\b(?:width|height)\s*:\s*(?<${id}>\d+(?:\.\d+)?)\s*,\s*(?:width|height)\s*:\s*\k<${id}>(?![\d.])`;
var SWIFT_COLOR_ARG = String.raw`\.(?:foregroundColor|foregroundStyle|tint|accentColor|background|fill|stroke|strokeBorder|border|listRowBackground)\(\s*\.`;
var SWIFTUI_HUES = "red|orange|yellow|green|mint|teal|cyan|blue|indigo|purple|pink|brown|gray";
var PURPLES_ANY_CASE = PURPLES.replace(/[a-f]/g, (c2) => `[${c2}${c2.toUpperCase()}]`);
var ATMOSPHERE = String.raw`(?:^|\/)tokens\/atmosphere\.css$`;
var EYEBROW = String.raw`[^\n${Q}]{0,400}[${Q}]${ATTRS}>[ \t]*(?:<[A-Z][\w.]*${ATTRS}\/>[ \t]*)?[^\s<>{}]+(?:[ \t]+[^\s<>{}]+){0,2}[ \t]*<\/[\w.]+>[ \t]*(?:\n[ \t]*)?<(?:h[1-6]\b|[A-Z]\w*(?:Title|Heading)\b)`;
var EM_DASH = String.raw`(?:—|&mdash;|&#8212;|&#x2014;)`;
var IN_COPY = String.raw`(?:(?<=${TAG_END}[^<>{}=;"\x60]{0,300})(?<!<(?:code|pre|kbd|samp)\b[^<>]*>[^<]{0,300})|(?<=(?<![\w-])(?:label|title|placeholder|aria-label|alt)\s*=\s*\{?\s*[${Q}][^${Q}\n]{0,200}))`;
var TEXT_PICTOGRAPH = "[\u2139\u2702\u270F\u2714\u2716\u2764\u26A0\u27A1]";
var PAD = String.raw`(?:\d*\.?\d+(?:px|r?em)|0)(?![\w.%])`;
var TW_PAD = String.raw`(?:\d+(?:\.5)?|px|\[${LENGTH}\])`;
var INSET_EXEMPT = String.raw`(?<!(?:::?(?:before|after|placeholder|marker)|(?<![\w-])(?:input|select|textarea|ul|ol|li|dd|blockquote)(?![\w-])|[\w-]*(?:input|field|search|select|combobox|indent|nested|tree|level)[\w-]*)[^{};]{0,160}\{${BLOCK})(?<!${STATE_RULE})`;
var IN_FIELD_TAG = String.raw`(?<!<(?:input|textarea|select|Input|Textarea|Select\w*|Combobox\w*|\w*Search\w*|\w*Field)\b${ATTRS})`;
var twPair = (a, b) => String.raw`(?=p${a}-)${IN_FIELD_TAG}${BASE}p${a}-${TW_PAD}${END}${SAME}${BASE}p${b}-${TW_PAD}${END}`;
var cssPair = (a, b) => String.raw`(?<![-\w])padding-${a}\s*:${INSET_EXEMPT}\s*${PAD}[^{}]{0,600}?(?<![-\w])padding-${b}\s*:\s*${PAD}`;
var ONLY_PREVENT = String.raw`(?:\(\s*\w*\s*\)|\w+)\s*=>\s*(?:\{\s*)?\w+\.preventDefault\(\)\s*;?\s*(?:return\s+false\s*;?\s*)?\}?`;
var ZERO_SCALE = String.raw`(?:(?<![-\w])scale(?:3d)?\(\s*0(?:\.0+)?\s*[,)]|(?<![-\w])scale\s*:\s*0(?![\d.%]))`;
var KIND_NAME = String.raw`[${Q}](?:[\w.-]*?(?:[Ee]-?[Mm]ail|[Pp]hone|[Mm]obile|[Ww]ebsite)|(?:[\w.]*(?:[-_.]|[a-z](?=[TU])))?(?:[Tt]el(?:ephone)?|[Uu]rl|URL))(?:[-_]?(?:[Aa]ddress|[Nn]umber))?[${Q}]`;
var MONEY = String.raw`[$€£¥₽₹]`;
var DETECTORS = [
  // ── universal ──────────────────────────────────────────────────────────────────────────────
  {
    id: "emoji",
    ban: "exclamation",
    kind: "universal",
    exts: [...CODE, ...NATIVE],
    skip: NATIVE_SKIP,
    // Not on a comment line, after a trailing comment, or in a print or log call.
    pattern: String.raw`^(?![ \t]*(?:\/\/|\/?\*|\{\/\*|<!--))(?![^\n]*console\.)[^\n]*?(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}️|${TEXT_PICTOGRAPH})${NOT_COMMENT}${NOT_LOG}`,
    flags: "mu",
    message: "Remove the emoji; the words carry the meaning, and an icon from your set does the rest."
  },
  {
    id: "exclamation",
    ban: "exclamation",
    kind: "universal",
    exts: [...MARKUP, ...NATIVE],
    skip: NATIVE_SKIP,
    pattern: String.raw`(?:(?<=[\p{L}\d)\]}][ \t]?)!+(?=\s*<[\/a-zA-Z])|(?<=[${Q}]\p{Lu}[^\n${Q}]{0,120}[\p{L}\d)])!+(?=[${Q}]))${NOT_COMMENT}${NOT_LOG}`,
    flags: "u",
    message: "End UI copy with a full stop or nothing; the product does not shout."
  },
  {
    id: "vague-error",
    ban: "vague-errors",
    kind: "universal",
    exts: [...CODE, ...NATIVE],
    skip: NATIVE_SKIP,
    pattern: String.raw`(?<!console\.\w+\([^\n]{0,80})\b(?:something went wrong|an (?:unexpected |unknown )?error (?:has )?occurred|unknown error)(?![\s\S]{0,200}\b(?:try again|retry|refresh|reload|contact|check|go back)\b)${NOT_COMMENT}${NOT_LOG}`,
    flags: "i",
    message: 'Say what failed and what to do next, in one line: "Could not save the invoice. Check the connection and retry."'
  },
  {
    id: "generic-cta",
    ban: "vague-cta",
    kind: "universal",
    exts: [...MARKUP, ...NATIVE],
    skip: NATIVE_SKIP,
    pattern: String.raw`(?:(?<=>\s*)(?:[Ss]ubmit|SUBMIT|[Cc]lick here)(?=\s*<)|(?<=[${Q}])(?:Submit|SUBMIT|Click here)(?=[${Q}]))${NOT_COMMENT}${NOT_LOG}`,
    message: 'Name the result on the button ("Save invoice", "Send 3 reminders") instead of Submit or Click here.'
  },
  {
    id: "generic-copy",
    ban: "marketing-copy",
    kind: "universal",
    exts: [...CODE, ...NATIVE],
    skip: NATIVE_SKIP,
    pattern: String.raw`(?<=(?:>|[${Q}])\s*)(?:Get [Ss]tarted|GET STARTED|Oops|OOPS)\b${NOT_COMMENT}${NOT_LOG}`,
    message: 'Say what the action or the failure actually is ("Create your first project") instead of "Get started" or "Oops".'
  },
  {
    id: "input-glow",
    ban: "input-glow",
    kind: "universal",
    exts: ALL,
    pattern: String.raw`(?<=${FIELD})(?<=[\s${Q}])focus(?:-visible|-within)?:(?:shadow(?:-[^\s${Q}]+)?|ring-(?:[3-8]|\[\d+(?:\.\d+)?px\])|ring-(?:opacity-\d+|[a-z]+(?:-\d{2,3})?\/\d{1,3}))(?=[\s${Q};])` + String.raw`|(?<=(?:input|textarea|select|\.[\w-]*(?:input|field|control)[\w-]*)[^{};]{0,200}:focus(?:-visible|-within)?[^{};]{0,200}\{[^}]{0,800})(?<![-\w])box-shadow\s*:(?!\s*none\b)`,
    flags: "i",
    message: "Show focus on inputs by switching the border to the focus colour; no glow, halo or translucent ring."
  },
  {
    id: "spinner-page",
    ban: "spinner-loading",
    kind: "universal",
    exts: CODE,
    pattern: String.raw`(?<=${BASE}${BIG}${END}${SAME})(?<=[\s${Q}:])animate-spin${END}|(?<=[\s${Q}:])animate-spin${END}(?=${SAME}${BASE}${BIG}${END})`,
    message: "Replace the page-level spinner with a skeleton shaped like the content; spinners belong inside buttons only."
  },
  {
    id: "transition-all",
    ban: "long-motion",
    kind: "universal",
    exts: ALL,
    pattern: String.raw`${AT}transition-all${END}|(?<![-\w])transition(?:-property)?\s*:\s*[${Q}]?all\b`,
    message: "Transition only the properties that change (colors, opacity, transform), never all."
  },
  {
    id: "long-duration",
    ban: "long-motion",
    kind: "universal",
    exts: ALL,
    pattern: String.raw`${AT}duration-(?:${MS_OVER}|\[${MS_OVER}ms\]|\[${SEC_OVER}s\]|(?:${MS_SCREEN}|\[${MS_SCREEN}ms\]|\[${SEC_SCREEN}s\])${END}${notNamed(SCREEN_WORD)}|(?:${MS_SHEET}|\[${MS_SHEET}ms\]|\[${SEC_SHEET}s\])${END}${notNamed(SCREEN_WORD)}${notNamed(SHEET_WORD)})${END}` + String.raw`|(?<![\w.])(?=\.?\d)(?<=(?<![-\w])(?:transition|animation)(?:-duration)?\s*:[^;{}\n]{0,200})(?:${MS_OVER}ms|${SEC_OVER}s|(?:${MS_SCREEN}ms|${SEC_SCREEN}s)(?![\w-])${notNamed(SCREEN_WORD)}|(?:${MS_SHEET}ms|${SEC_SHEET}s)(?![\w-])${notNamed(SCREEN_WORD)}${notNamed(SHEET_WORD)})(?![\w-])(?![^;{}\n]{0,400}\binfinite\b)` + String.raw`|(?<![-\w])(?=duration\s*:)(?<=\btransition\s*[=:]\s*\{\{?[^}]{0,200})duration\s*:\s*(?:${SEC_OVER}|${SEC_SCREEN}(?![\d.]|\s*(?:ms|s)\b)${notNamed(SCREEN_WORD)}|${SEC_SHEET}(?![\d.]|\s*(?:ms|s)\b)${notNamed(SCREEN_WORD)}${notNamed(SHEET_WORD)})(?![\d.]|\s*(?:ms|s)\b)`,
    message: "Keep a control's motion at or under 300ms, a sheet or a drawer under 400ms and a full-screen change under 450ms; longer makes the product feel slow."
  },
  {
    id: "bounce-easing",
    ban: "long-motion",
    kind: "universal",
    exts: ALL,
    pattern: String.raw`${AT}animate-${BOUNCY}(?:-[\w-]+)?${END}|cubic-bezier\([\s_]*[\d.]+[\s_]*,[\s_]*${OVERSHOOT}[\s_]*,|cubic-bezier\([\s_]*[\d.]+[\s_]*,[\s_]*-?[\d.]+[\s_]*,[\s_]*[\d.]+[\s_]*,[\s_]*${OVERSHOOT}[\s_]*\)` + String.raw`|\b(?:ease(?:In|Out|InOut)(?:Back|Bounce|Elastic)|back(?:Out|InOut)|bounce(?:Out|InOut)|anticipate)\b` + // The dotted names a motion library takes as a string: `ease: "back.out(1.7)"`, `"elastic.out(1, 0.3)"`.
    String.raw`|\b(?:back|bounce|elastic)\.(?:in|out|inOut)\b` + String.raw`|(?<![-\w])(?:animation(?:-name)?|animationName)\s*:\s*[${Q}]?[^;{}\n${Q}]{0,400}?(?<![\w-])${BOUNCY}[\w-]*`,
    message: "Ease out on enter and in on exit; no bounce, overshoot or looping decoration."
  },
  {
    id: "border-and-shadow",
    ban: "double-separation",
    kind: "universal",
    exts: ALL,
    pattern: (
      // A transparent border is no technique: forced colours paint it, so it is kept on purpose (§2.0).
      String.raw`${IN_CLASS}(?<=${BORDER}${SAME})${SHADOW}${CLEAR_BORDER}|${IN_CLASS}${SHADOW}(?=${SAME}${BORDER})${CLEAR_BORDER}` + String.raw`|(?<![-\w])(?=box-shadow\s*:)(?<=\{[^{}]{0,600}(?<![-\w])(?=border\s*:(?!\s*(?:none|0|0px)\b)(?!${VALUE}transparent))border\s*:[^;{}]{1,80};[^{}]{0,600})box-shadow\s*:(?!\s*none\b)(?<!${STATE_RULE})` + String.raw`|(?<![-\w])box-shadow\s*:(?!\s*none\b)(?=[^{}]{0,600}(?<![-\w])border\s*:(?!\s*(?:none|0|0px)\b)(?!${VALUE}transparent))(?<!${STATE_RULE})`
    ),
    message: "Separate the element with one technique, a fill first: drop the border or the shadow (a hover may add a shadow, a state may add a border)."
  },
  {
    // A filled element that also draws a border — the user's first rule, colour first. A rule with a backdrop blur
    // is the glass pair, one technique, and is left alone. CSS rules only: a Tailwind
    // `bg-card border` cannot be judged without the page colour, and a white or page-token fill is left alone for
    // the same reason. A transparent border reserves the space for a state and is not a technique.
    id: "fill-and-border",
    ban: "double-separation",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`(?<![-\w])(?=border\s*:)(?<=\{[^{}]{0,600}${FILL_DECL}[^{}]{0,600})border\s*:(?!\s*(?:none|0|0px)\b)(?!${VALUE}transparent)(?<!${STATE_RULE})${NO_BLUR}` + String.raw`|(?<![-\w])border\s*:(?!\s*(?:none|0|0px)\b)(?!${VALUE}transparent)(?=[^{}]{0,600}${FILL_AHEAD})(?<!${STATE_RULE})${NO_BLUR}`,
    flags: "i",
    message: "Separate the element with one technique: if its fill differs from what is behind it, drop the border; if it is the same colour, drop the fill and keep the border (a state may add one)."
  },
  {
    // A filled element that also casts a shadow at rest: a shadow means it floats, and a status dot, a card or a
    // tile does not. Rules for things that float (menu, dialog, toast, a slider thumb…) are named by their selector
    // and left alone; a state rule and an inset shadow are not separation.
    id: "fill-and-shadow",
    ban: "double-separation",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`(?<![-\w])(?=box-shadow\s*:)(?<!${FLOAT_RULE}[^{};]{0,160}\{${BLOCK})(?<=\{[^{}]{0,600}${FILL_DECL}[^{}]{0,600})box-shadow\s*:(?!\s*(?:none|inset)\b)(?<!${STATE_RULE})${NO_BLUR}` + String.raw`|(?<![-\w])(?=box-shadow\s*:)(?<!${FLOAT_RULE}[^{};]{0,160}\{${BLOCK})box-shadow\s*:(?!\s*(?:none|inset)\b)(?=[^{}]{0,600}${FILL_AHEAD})(?<!${STATE_RULE})${NO_BLUR}`,
    flags: "i",
    message: "Separate the element with one technique, colour first: it has a fill, so drop the shadow \u2014 a shadow is for what floats."
  },
  {
    id: "fake-content",
    ban: "adjective-arguments",
    kind: "universal",
    exts: CODE,
    pattern: String.raw`${PLACEHOLDER_URL}${IN_TEXT}${NOT_COMMENT}|\blorem ipsum\b${IN_TEXT}${NOT_COMMENT}[^<>{}${Q}\n]*`,
    flags: "i",
    message: "Use the real image or the real text, or leave the slot out; never a placeholder photo or lorem ipsum."
  },
  {
    id: "broken-image",
    ban: "adjective-arguments",
    kind: "universal",
    exts: MARKUP,
    // No src at all (a spread, Svelte's {src} and Vue's :src count as one), or an empty or "#" src. The tag is read
    // 800 characters deep, as the link and button checks read theirs (unbounded, an unclosed `<img` read to the end).
    pattern: String.raw`<img\b(?!(?:=>|[^>]){0,800}?(?:(?<![\w:-])(?:data-)?(?:src|srcset|srcSet)\s*=|:src\b|v-bind:src\b|\[src\]|\{\s*(?:src|\.\.\.)))(?:=>|[^>]){0,800}>` + String.raw`|<img\b(?:=>|[^>]){0,800}?(?<![-\w:])src\s*=\s*(?:""|''|"\s+"|'\s+'|"#"|'#'|\{\s*(?:""|''|null|undefined)\s*\})`,
    message: "Give the image a real file or remove it; an empty or missing src ships a broken box."
  },
  {
    id: "unverified-claim",
    ban: "adjective-arguments",
    kind: "universal",
    exts: CODE,
    // One finding per line of copy: the first claim, then the rest of the run.
    pattern: String.raw`(?:${CLAIM})${IN_TEXT}${NOT_COMMENT}[^<>{}${Q}\n]*`,
    flags: "iu",
    message: "Verify the claim against real data or remove it; never invent a number, a date, a rank or a superlative."
  },
  // ── taste that outranks drift: a coloured shadow class is a palette class too, and the glow is the point ──
  {
    id: "glow",
    ban: "gradients",
    kind: "taste",
    exts: ALL,
    skip: ATMOSPHERE,
    // A shadow in a hue (Tailwind's coloured shadows, a brand token), or a zero-offset blurred shadow in a colour.
    pattern: String.raw`${AT}shadow-(?:(?:${HUES})-${SHADE}|primary|accent|brand)${ALPHA}${END}` + String.raw`|${AT}(?:drop-)?shadow-\[(?:inset_)?0(?:px)?_0(?:px)?_(?:[5-9]|[1-9]\d+)(?:\.\d+)?px(?:_-?\d+(?:\.\d+)?px)?_(?!${neutral("t")})[^\]\s]+\]${END}` + String.raw`|(?<![-\w])(?:box-shadow|text-shadow|boxShadow|textShadow)\s*:\s*[${Q}]?(?:[^;{}${Q}\n]{0,400}?,\s*)?(?:inset\s+)?0(?:px)?\s+0(?:px)?\s+(?:[5-9]|[1-9]\d+)(?:\.\d+)?px(?:\s+-?\d+(?:\.\d+)?px)?\s+(?!${neutral("c")})(?:#[\da-fA-F]{3,8}(?![\da-fA-F])|rgba?\(|hsla?\(|oklch\(|var\()`,
    message: "Drop the coloured glow; elevation is one neutral shadow from your tokens, and only on what floats."
  },
  // ── drift: values their system does not declare ─────────────────────────────────────────────
  {
    id: "hex-off-system",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`(?<![\w&#/\\-])(?<!(?:href|to)\s*=\s*[${Q}{]?\s*)(?<!(?:fill|stroke|stop-?[cC]olor|flood-?[cC]olor)\s*[=:]\s*[${Q}{]?\s*)(?<!url\(\s*)(?<v>#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|(?<=(?:[:(\[=,{${Q}]|solid|dashed|dotted|double)\s*#)[0-9a-fA-F]{3,4}))(?![\w-])${NOT_COMMENT}`,
    allow: "colors",
    message: "Use one of your colour tokens instead of a hard-coded hex."
  },
  {
    id: "palette-class",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`${AT}${PALETTE_PREFIX}-(?<v>(?:slate|gray|zinc|neutral|stone|${HUES})-${SHADE})${ALPHA}${END}`,
    allow: "colors",
    message: "Use a class or variable from your own colour tokens instead of the framework's default palette."
  },
  {
    id: "root-font-px",
    ban: "type-faults",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`(?<![-\w])(?=font-size\s*:)${ROOT_RULE}font-size\s*:\s*\d*\.?\d+px(?![\w%.])`,
    message: "Set the root font size relatively (100% or a rem value) so the reader's own browser size still scales the whole page."
  },
  {
    id: "font-size-class",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`${AT}text-\[(?<v>${LENGTH})\]${END}`,
    allow: "fontSizes",
    message: "Use a size from your type scale instead of a one-off value."
  },
  {
    id: "font-size-css",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`(?<![-\w])font-size\s*:\s*(?<v>${LENGTH})(?![\w%.])`,
    allow: "fontSizes",
    message: "Use a size from your type scale instead of a one-off value."
  },
  {
    id: "font-size-style",
    ban: "drift",
    kind: "drift",
    exts: CODE,
    pattern: String.raw`(?<![-\w])fontSize\s*:\s*[${Q}]?(?<v>\d*\.?\d+(?:px|rem|em)?)(?![\w%.])`,
    allow: "fontSizes",
    message: "Use a size from your type scale instead of a one-off value."
  },
  {
    id: "radius-class",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`${AT}rounded(?:-(?:[trblse]|tl|tr|bl|br|ss|se|es|ee))?-\[(?<v>${LENGTH})\]${END}`,
    allow: "radii",
    message: "Use a radius from your scale instead of a one-off value."
  },
  {
    id: "radius-css",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`(?<![-\w])border(?:-(?:top|bottom|start|end)-(?:left|right|start|end))?-radius\s*:\s*(?<v>${LENGTH})(?![\w%.])`,
    allow: "radii",
    message: "Use a radius from your scale instead of a one-off value."
  },
  {
    id: "radius-style",
    ban: "drift",
    kind: "drift",
    exts: CODE,
    pattern: String.raw`(?<![-\w])border(?:Top|Bottom)?(?:Left|Right)?Radius\s*:\s*[${Q}]?(?<v>\d*\.?\d+(?:px|rem|em)?)(?![\w%.])`,
    allow: "radii",
    message: "Use a radius from your scale instead of a one-off value."
  },
  // Spacing: a padding, margin or gap off their declared scale. 0 and 1px are not spacing (a reset, a hairline nudge).
  {
    id: "spacing-class",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`${AT}(?:p[xytrblse]?|m[xytrblse]?|gap(?:-[xy])?|space-[xy])-\[(?<v>${SPACE})\]${END}`,
    allow: "spacing",
    message: "Use a step from your spacing scale instead of a one-off value."
  },
  {
    id: "spacing-css",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    // Every length in the declaration, so `padding: 12px 18px` reports the 18 alone when 12 is theirs.
    pattern: String.raw`(?<=[\s:,(])(?=\.?\d)(?<=(?<![-\w])(?:padding|margin)(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?\s*:[^;{}\n]{0,60}|(?<![-\w])(?:row-|column-)?gap\s*:[^;{}\n]{0,40})(?<![\w.#-])(?<v>${SPACE})(?![\w%.])`,
    allow: "spacing",
    message: "Use a step from your spacing scale instead of a one-off value."
  },
  {
    id: "spacing-style",
    ban: "drift",
    kind: "drift",
    exts: CODE,
    pattern: String.raw`(?<![-\w])(?:(?:padding|margin)(?:Top|Bottom|Left|Right|Horizontal|Vertical|Start|End|Inline|Block)?|gap|rowGap|columnGap)\s*:\s*[${Q}]?(?<v>(?![01](?:\.0+)?(?:px)?(?![\d.]))\d*\.?\d+(?:px|rem|em)?)(?![\w%.])`,
    allow: "spacing",
    message: "Use a step from your spacing scale instead of a one-off value."
  },
  {
    id: "font-family-class",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    // `font-[550]` is a weight, not a family.
    pattern: String.raw`${AT}font-\[(?![\d.]+\])(?<v>[^\]\s]+)\]${END}`,
    allow: "fonts",
    message: "Use one of your font families by its token instead of naming a face in the component."
  },
  {
    id: "font-family-css",
    ban: "drift",
    kind: "drift",
    exts: ALL,
    pattern: String.raw`(?<![-\w])font-family\s*:\s*(?<v>[^;{}\n]+)`,
    allow: "fonts",
    message: "Use one of your font families by its token instead of naming a face in the component."
  },
  {
    id: "font-family-style",
    ban: "drift",
    kind: "drift",
    exts: CODE,
    pattern: String.raw`(?<![-\w])fontFamily\s*:\s*[${Q}](?<v>[^${Q}\n]+)[${Q}]`,
    allow: "fonts",
    message: "Use one of your font families by its token instead of naming a face in the component."
  },
  {
    id: "raw-element",
    ban: "drift",
    kind: "drift",
    exts: MARKUP,
    pattern: String.raw`(?<=<)(?<v>button|input|select|textarea)(?=[\s\/>])(?![^>]{0,400}(?:\btype\s*=\s*[${Q}{]?\s*[${Q}]?(?:hidden|file|checkbox|radio|range|color)\b|\b\w+Variants\())`,
    allow: "components",
    message: "Use your own component (Button, Input, Select, Textarea) instead of the raw element."
  },
  // ── taste: our opinions, muted where their system declares the thing ─────────────────────────
  {
    id: "purple-class",
    ban: "purple-accent",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`${AT}${PALETTE_PREFIX}-(?<v>(?:indigo|violet|purple|fuchsia)-${SHADE})${ALPHA}${END}`,
    allow: "colors",
    message: "Use your accent token; indigo and violet are the generic AI default, not a brand."
  },
  {
    id: "purple-hex",
    ban: "purple-accent",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`(?<![\w&#/\\-])(?<v>#(?:${PURPLES})(?:[0-9a-f]{2})?)(?![\w-])${NOT_COMMENT}`,
    flags: "i",
    allow: "colors",
    message: "Use your accent token; indigo and violet are the generic AI default, not a brand."
  },
  {
    id: "cyan-on-dark",
    ban: "neon-dark",
    kind: "taste",
    exts: ALL,
    // Cyan type in dark mode (`dark:`) or on a near-black fill in the same class string.
    pattern: String.raw`(?:(?<=[\s${Q}]dark:)|${BASE})(?:text|border|ring|fill|stroke|decoration)-(?<v>cyan-(?:200|300|400|500))${ALPHA}${END}` + String.raw`(?:(?<=dark:[^\s${Q}]+)|(?=${SAME}${DARK_BG})|(?<=${DARK_BG}${SAME}[^\s${Q}]+))`,
    allow: "colors",
    message: "Use your accent token; cyan type on a near-black ground is the stock AI dark mode, not a brand."
  },
  {
    id: "gradient-text",
    ban: "gradients",
    kind: "taste",
    exts: ALL,
    // Anchored on the gradient itself, so the general `gradient` rule does not report the same span again.
    pattern: String.raw`${AT}bg-(?:gradient-to-[trbl]{1,2}|(?:linear|radial|conic)(?:-[^\s${Q}]+)?)${END}(?:(?=${SAME}${AT}bg-clip-text${END})|(?<=${AT}bg-clip-text${END}${SAME}bg-[^\s${Q}]+))` + String.raw`|(?<![-\w])(?:repeating-)?(?:linear|radial|conic)-gradient\((?:(?=[^\n${Q}]{0,600}${AT}bg-clip-text${END})|(?<=${AT}bg-clip-text${END}[^\n${Q}]{0,600}gradient\())` + String.raw`|(?<![-\w])(?:repeating-)?(?:linear|radial|conic)-gradient\((?:(?=[^{}]*(?:(?<![-\w])(?:-webkit-)?background-clip\s*:\s*text|[bB]ackgroundClip\s*:\s*[${Q}]text))|(?<=(?:(?<![-\w])(?:-webkit-)?background-clip\s*:\s*text|[bB]ackgroundClip\s*:\s*[${Q}]text)[^{}]*gradient\())`,
    message: "Set the text in a solid colour from your tokens; gradient text is decoration."
  },
  {
    id: "grid-lines",
    ban: "gradients",
    kind: "taste",
    exts: ALL,
    skip: ATMOSPHERE,
    // A grid or dot field drawn with hairline hard stops, or a background-pattern utility.
    pattern: String.raw`${AT}bg-(?:grid|dot|dots)(?:-[\w\[\]\/.%-]+)?${END}` + String.raw`|(?<![-\w])linear-gradient\((?=[^;{}]{0,200}?${HAIRLINE})(?=[^;{}]{0,200}?\)[\s_]*,[\s_]*linear-gradient\([^;{}]{0,200}?${HAIRLINE})` + String.raw`|(?<![-\w])radial-gradient\((?=[^;{}]{0,200}?${HAIRLINE})`,
    message: "Drop the grid or dot background; keep the surface a plain fill from your tokens."
  },
  {
    id: "gradient",
    ban: "gradients",
    kind: "taste",
    exts: ALL,
    skip: ATMOSPHERE,
    // A linear fade to transparent is a scroll edge; a radial or repeating one is a halo, a spotlight or stripes.
    pattern: String.raw`(?<!${FROM_TR}${SAME})${AT}bg-(?:gradient-to-[trbl]{1,2}|linear-(?:to-[trbl]{1,2}|\d+|\[[^\]\s]+\]))${END}(?!${SAME}${FROM_TR})` + String.raw`|${AT}bg-(?:radial(?:-\[[^\]\s]+\])?|conic(?:-\d+|-\[[^\]\s]+\])?)${END}` + String.raw`|(?<![-\w])(?:repeating-(?:linear|radial|conic)|radial|conic)-gradient\(${COMPUTED}` + String.raw`|(?<![-\w])linear-gradient\((?![^;\n]{0,300}\btransparent(?:\b|(?=_)))${COMPUTED}`,
    message: "Use a flat fill from your tokens; here the gradient is decoration."
  },
  {
    id: "pill-control",
    ban: "big-radius",
    kind: "taste",
    exts: ALL,
    // rounded-full or ≥ 999px on a control that is not square; checked back to the tag, variants call or cva string.
    pattern: String.raw`${AT}rounded-(?:full|\[(?:9\d\d|[1-9]\d{3,})px\])${END}` + String.raw`(?:(?<=(?![^>]{0,1200}?${square("t", "[^>]")})(?:${CONTROL_TAG})[^>]{0,600}rounded-[^\s${Q}]+)|(?<=${CONTROL_CVA}(?![${Q}][^${Q}]{0,1200}?${square("c", `[^${Q}]`)})[${Q}][^${Q}]{0,1200}rounded-[^\s${Q}]+))` + String.raw`|(?<![-\w])border-radius\s*:\s*${PILL_CSS}(?<=(?:button|\.btn|input|select|textarea|\.chip|\.badge|\.tag)\b[^{};]{0,200}(?!\{[^}]{0,2000}?${SQUARE_CSS})\{[^}]{0,600})(?<!(?:radio|checkbox|switch|avatar|dot|thumb|knob|range)[^{};]{0,200}\{[^}]{0,2000})`,
    flags: "i",
    message: "A rounded control is half its own height in px (28 \u2192 14, 36 \u2192 18, 44 \u2192 22) and the list it opens takes the same number; never rounded-full or 9999."
  },
  {
    id: "glass",
    ban: "glass",
    kind: "taste",
    exts: ALL,
    // U1 allows a blur with a translucent fill on a stuck, fixed or bar element; a blurred card is still glass.
    pattern: String.raw`${AT}backdrop-blur(?:-(?:sm|md|lg|xl|2xl|3xl|\[[^\]\s]+\]))?${END}` + String.raw`(?<!(?=[${Q}][^\n${Q}]{0,600}${TRANSLUCENT})(?=[${Q}][^\n${Q}]{0,600}${STUCK})[${Q}][^\n${Q}]{0,600})` + String.raw`(?<!<[\w.]*(?:[Hh]eader|[Nn]av|[Ff]ooter|[Bb]ar)\b[^>]{0,600}?(?=[${Q}][^\n${Q}]{0,600}${TRANSLUCENT})[${Q}][^\n${Q}]{0,600})` + String.raw`|(?<![-\w])(?:-webkit-)?backdrop-filter\s*:\s*[^;\n]{0,400}blur\(` + String.raw`(?<!(?=\{${BLOCK}${TRANSLUCENT_CSS})(?=\{${BLOCK}(?<![-\w])position\s*:\s*(?:sticky|fixed))\{${BLOCK})(?<!(?:header|nav|footer|bar)\b[^{};]{0,200}(?=\{${BLOCK}${TRANSLUCENT_CSS})\{${BLOCK})` + String.raw`|(?<![-\w])backdropFilter\s*:\s*[${Q}][^${Q}\n]{0,400}blur\((?<!(?=\{${BLOCK}${TRANSLUCENT_JS})(?=\{${BLOCK}(?<![-\w])position\s*:\s*[${Q}](?:sticky|fixed))\{${BLOCK})`,
    message: "Give content surfaces an opaque fill; a backdrop blur belongs only on a sticky bar or floating control over a translucent fill."
  },
  {
    id: "resting-shadow",
    ban: "card-everything",
    kind: "taste",
    exts: ALL,
    skip: FLOAT_PATH,
    // A shadow with no state prefix on something that does not float: not fixed/absolute, not styled or named as an overlay.
    pattern: String.raw`${BASE}shadow-(?:xs|sm|md|lg|xl|2xl)${END}(?!${SAME}${FLOATING})(?<!${FLOATING}${SAME}shadow-\w+)` + String.raw`(?<!<[\w.]*(?:${FLOATS})[\w.]*\b[^>]{0,600}shadow-\w+)(?<!\b\w*(?:${FLOATS})\w*[${Q}]?\s*[=:]\s*(?:(?:cva|tv)\(\s*)?[${Q}][^${Q}]{0,1200}shadow-\w+)` + String.raw`|(?<![-\w])box-shadow\s*:(?!\s*(?:none\b|var\(|inherit\b|initial\b|unset\b|0(?:px)?\s*[;}!]|(?:inset\s+)?0(?:px)?\s+0(?:px)?\s+0(?:px)?\s))` + String.raw`(?<!${STATE_RULE})(?<!(?:${FLOATS})[^{};]{0,160}\{${BLOCK})(?<!(?=\{${BLOCK}(?<![-\w])position\s*:\s*(?:fixed|absolute))\{${BLOCK})` + String.raw`|(?<![-\w])boxShadow\s*:\s*[${Q}](?!none|var\(|(?:inset\s+)?0(?:px)?\s+0(?:px)?\s+0(?:px)?\s)` + String.raw`(?<!(?:hover|focus|active|pressed|selected|checked|open|${FLOATS})[\w-]*[${Q}]?\s*:\s*\{${BLOCK})(?<!(?=\{${BLOCK}(?<![-\w])position\s*:\s*[${Q}](?:fixed|absolute))\{${BLOCK})`,
    flags: "i",
    message: "Separate a resting surface by its fill; keep shadows for what floats (dialog, menu, popover, toast), or add one on hover."
  },
  {
    id: "uppercase-heading",
    ban: "uppercase-headings",
    kind: "taste",
    exts: CODE,
    pattern: String.raw`${UPPER}(?<=<h[1-6]\b[^>]{0,400}uppercase)`,
    message: "Set headings in sentence case from your type scale."
  },
  {
    id: "uppercase-label",
    ban: "uppercase-headings",
    kind: "taste",
    exts: ALL,
    // Uppercase with wide tracking in any family, mono included (U6). One short eyebrow (up to three words) with a heading
    // on the same or the next line is allowed; in CSS the heading cannot be seen, so a stylesheet rule still reports.
    pattern: String.raw`${UPPER}(?:(?<=${WIDE}${SAME}uppercase)|(?=${SAME}${WIDE}))(?!${EYEBROW})` + String.raw`|(?<![-\w])text-transform\s*:\s*uppercase\b(?:(?=[^{}]{0,400}(?<![-\w])letter-spacing\s*:\s*${WIDE_CSS})|(?<=(?<![-\w])letter-spacing\s*:\s*${WIDE_CSS}[^{}]{0,400}text-transform\s*:\s*uppercase))` + String.raw`|(?<![-\w])textTransform\s*:\s*[${Q}]uppercase[${Q}](?:(?=[^{}]{0,400}(?<![-\w])letterSpacing\s*:\s*${WIDE_JS})|(?<=(?<![-\w])letterSpacing\s*:\s*${WIDE_JS}[^{}]{0,400}textTransform\s*:\s*[${Q}]uppercase[${Q}]))`,
    message: "Set labels and badges in sentence case in the body family, without wide tracking."
  },
  {
    id: "body-case",
    ban: "uppercase-headings",
    kind: "taste",
    exts: ALL,
    // Running text (a paragraph with 30+ characters of copy, a body rule) set in capitals or tracked wide.
    pattern: String.raw`(?=uppercase)${IN_P}${UPPER}${P_TEXT(30)}` + String.raw`|(?=tracking-)${IN_P}${WIDE}(?!${ATTRS}${UPPER})(?<!${UPPER}${ATTRS}tracking-[^\s${Q}]+)${P_TEXT(20)}` + String.raw`|(?<![-\w])text-transform\s*:\s*uppercase\b${textRule(true)}(?!${BLOCK}letter-spacing\s*:\s*${WIDE_CSS})(?<!letter-spacing\s*:\s*${WIDE_CSS}${BLOCK})` + String.raw`|(?<![-\w])letter-spacing\s*:\s*${WIDE_CSS}${textRule(true)}(?!${BLOCK}text-transform\s*:\s*uppercase)(?<!text-transform\s*:\s*uppercase${BLOCK})`,
    message: "Set running text in sentence case at the family's own tracking; capitals and wide letter-spacing slow reading."
  },
  {
    id: "crushed-tracking",
    ban: "uppercase-headings",
    kind: "taste",
    exts: ALL,
    // Tighter than −0.05em (Tailwind's tracking-tighter): letters start to touch.
    pattern: String.raw`${AT}tracking-\[-(?:0?\.(?:0[6-9]|[1-9])\d*|[1-9]\d*(?:\.\d+)?)em\]${END}` + String.raw`|(?<![-\w])(?:letter-spacing|letterSpacing)\s*:\s*[${Q}]?-(?:0?\.(?:0[6-9]|[1-9])\d*|[1-9]\d*(?:\.\d+)?)em(?![\w.])`,
    message: "Tighten display type by a few hundredths of an em at most; past \u22120.05em the letters collide."
  },
  {
    id: "justified-text",
    ban: "justified-text",
    kind: "taste",
    exts: ALL,
    // Long editorial reading may be justified: an article, a blog or a prose path, a rule or a class string that names it.
    skip: EDITORIAL_PATH,
    pattern: String.raw`${AT}text-justify${END}(?!${SAME}${AT}(?:hyphens-auto|prose)(?=[\s${Q}-]))(?<!${AT}(?:hyphens-auto|prose)(?:-[\w-]+)?${END}${SAME}text-justify)` + String.raw`|(?<![-\w])text-align\s*:\s*justify\b(?!${BLOCK}(?<![-\w])(?:-webkit-)?hyphens\s*:\s*auto)(?<!(?<![-\w])(?:-webkit-)?hyphens\s*:\s*auto${BLOCK})(?<!(?:^|[{};])${SEL}?${EDITORIAL}${SEL}\{${BLOCK})` + String.raw`|(?<![-\w])textAlign\s*:\s*[${Q}]justify[${Q}]`,
    message: "Align interface text to its start edge; justified lines open uneven gaps between words, and only hyphenated editorial reading may take them."
  },
  {
    id: "tight-leading",
    ban: "gray-text",
    kind: "taste",
    exts: ALL,
    // Under 1.3 on running text: a paragraph with 40+ characters of copy, or a paragraph rule.
    pattern: String.raw`(?=leading-)${IN_P}${AT}leading-(?:none|tight|\[(?:0?\.\d+|1(?:\.[0-2]\d*)?)\])${END}${P_TEXT(40)}` + String.raw`|(?<![-\w])line-height\s*:\s*(?:0?\.\d+|1(?:\.[0-2]\d*)?|(?:[1-9]\d|1[0-2]\d)(?:\.\d+)?%)(?![\w.%])${textRule(false)}`,
    message: "Give running text a line height of at least 1.4 (1.5 reads best); tighter leading makes paragraphs hard to track."
  },
  {
    id: "tiny-text",
    ban: "gray-text",
    kind: "taste",
    exts: ALL,
    // Running text under 12px; controls and links under 11px; a native label under 10pt.
    pattern: String.raw`(?=text-\[)${IN_P}${AT}text-\[(?:(?:[1-9]|1[01])(?:\.\d+)?px|0?\.[0-6]\d*rem)\]${END}` + String.raw`|(?=text-\[)(?<=<(?:button|a|label|Button|Link|Label)\b${ATTRS})${AT}text-\[(?:(?:[1-9]|10)(?:\.\d+)?px|0?\.(?:[0-5]\d*|6[0-2]\d*)rem)\]${END}` + String.raw`|(?<![-\w])font-size\s*:\s*(?:(?:[1-9]|1[01])(?:\.\d+)?px|0?\.[0-6]\d*r?em)(?![\w.%])${textRule(true)}` + String.raw`|(?<![-\w])font-size\s*:\s*(?:(?:[1-9]|10)(?:\.\d+)?px|0?\.(?:[0-5]\d*|6[0-2]\d*)r?em)(?![\w.%])${CONTROL_RULE}` + String.raw`|(?<![-\w])fontSize\s*:\s*[1-9](?:\.\d+)?(?![\d.%\w])`,
    message: "Set running text at 12px or more (14\u201316 reads best) and controls at 11px or more; smaller text fails on real screens."
  },
  {
    id: "hover-lift",
    ban: "layout-shift-hover",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`${BASE}(?:group-)?hover:(?:scale-(?:10[1-9]|1[1-9]\d|[2-9]\d\d|\[1\.\d*[1-9]\d*\])|-?translate-y-(?:px|0\.5|[1-9]\d*|\[[^\]\s]+\])|-?rotate-(?:[1-9]\d*|\[[^\]\s]+\]))${END}` + String.raw`|(?<=:hover[^{}]{0,100}\{[^}]{0,400})(?<![-\w])transform\s*:\s*(?:scale\(\s*1\.\d*[1-9]|translateY\(\s*-|translate\(\s*[^,)]+,\s*-|rotate\()` + String.raw`|\bwhileHover\s*=\s*\{\{[^}]{0,200}?\b(?:scale\s*:\s*1\.\d*[1-9]|y\s*:\s*-|rotate\s*:)`,
    message: "Change the fill on hover or add a shadow; do not lift, scale or tilt the element."
  },
  {
    id: "layout-transition",
    ban: "layout-shift-hover",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`${AT}transition-\[(?=[^\]\s]*?${LAYOUT_MOVE})[^\]\s]+\]${END}` + String.raw`|(?<![-\w])transition(?:-property|Property)?\s*:\s*[${Q}]?(?![^;{}${Q}\n]{0,400}?(?<![-\w])all\b)[^;{}${Q}\n]{0,400}?${LAYOUT_MOVE}`,
    message: "Animate transform or opacity (grid-template-rows for a height); a transition on width, height, padding or margin re-lays the page out every frame. An accordion's height in 200ms or less is the one exception."
  },
  {
    id: "pure-black",
    ban: "neon-dark",
    kind: "taste",
    exts: ALL,
    // `v` is the hex or the Tailwind colour name, so a `black` their config redefines is theirs.
    pattern: String.raw`(?<v>(?<![\w&#/\\-])(?<!(?:href|to)\s*=\s*[${Q}{]?\s*)(?<!(?:fill|stroke|stop-?[cC]olor|flood-?[cC]olor)\s*[=:]\s*[${Q}{]?\s*)(?<!url\(\s*)` + String.raw`#(?:000000|(?<=(?:[:(\[=,{${Q}]|solid|dashed|dotted|double)\s*#)000)(?![\w-])|(?<=[\s${Q}:](?:bg|text)-)black(?=[\s${Q};!]|$))${NOT_COMMENT}`,
    allow: "colors",
    message: "Use your near-black token (a tinted ink around #101010) instead of pure #000, for text and dark surfaces alike."
  },
  {
    id: "side-stripe",
    ban: "side-rule",
    kind: "taste",
    exts: ALL,
    // A thick border on one side (3px+, or 2px+ on a rounded element); a quote's rule, a spinner's arc and a CSS triangle are not stripes.
    pattern: String.raw`${BASE}border-(?:[lrse]-(?:4|8|\[${STRIPE}\])|(?:[lrse]-2|[tb]-(?:2|4|8|\[(?:[2-9]|[1-9]\d)(?:\.\d+)?px\]))(?:(?=${END}${SAME}${ROUNDED})|(?<=${ROUNDED}${SAME}border-[^\s${Q}]+)))${END}` + String.raw`(?!${SAME}${AT}(?:animate-spin|border-(?:[xytrblse]-)?transparent))(?<!${AT}(?:animate-spin|border-(?:[xytrblse]-)?transparent)${SAME}border-[^\s${Q}]+)(?<!<(?:blockquote|pre|code)\b[^>]{0,600})` + String.raw`|(?<![-\w])border-(?:left|right|inline-start|inline-end)(?:\s*:\s*${STRIPE}\s+(?:solid|double)\s+(?!${neutral("s")})|-width\s*:\s*${STRIPE})(?<!(?:blockquote|pre|code|kbd)[^{};]{0,200}\{[^{}]*)` + String.raw`|(?<![-\w])border-(?:top|bottom)\s*:\s*(?:[2-9]|[1-9]\d)(?:\.\d+)?px\s+(?:solid|double)\s+(?!${neutral("b")})(?:(?=[^{}]*border-radius)|(?<=border-radius[^{}]*))` + String.raw`|(?<![-\w])border(?:Left|Right|Start|End)(?:Width\s*:\s*|\s*:\s*[${Q}])(?:[3-9]|[1-9]\d)(?![\d.])`,
    message: "Remove the coloured stripe on the edge; mark the status with a tint of its colour, an icon or a dot, and keep the container's one separation technique."
  },
  {
    id: "nested-card",
    ban: "three-layers",
    kind: "taste",
    exts: MARKUP,
    // A card opened inside a card that has not closed yet.
    pattern: String.raw`<(?:${CARD})(?=[\s>\/])(?<=<(?:${CARD})(?=[\s>])${attrs(600)}(?<![\/=])>(?:(?!<\/(?:${CARD})>)[\s\S]){0,4000}?<(?:${CARD}))`,
    message: "Take the inner card out: inside a card, group by spacing or an inverted fill, never a second card."
  },
  {
    id: "icon-tile",
    ban: "pastel-icon-circles",
    kind: "taste",
    exts: MARKUP,
    // A tinted square or circle (32–64px) around an icon, above a heading, repeated by a loop: the feature-grid template.
    pattern: String.raw`<(?:div|span)\b(?=${ATTRS}(?<=[\s${Q}])bg-[\w\[])(?=${ATTRS}(?<=[\s${Q}])rounded)(?=${ATTRS}(?<=[\s${Q}])(?:size|h)-(?:8|9|10|11|12|14|16)(?=[\s${Q}]))${ATTRS}>` + String.raw`\s*(?:<svg\b|<[\w.]*[iI]con[\w.]*[\s\/>]|<[A-Z]\w*\s(?=${ATTRS}(?<=[\s${Q}])(?:size|h|w)-[3-7](?:\.5)?(?=[\s${Q}]))|\{[\w.]*[iI]con[\w.]*[\s(}])` + String.raw`(?=[\s\S]{0,600}?<(?:h[1-6]\b|[A-Z]\w*(?:Title|Heading)\b))(?<=(?:\.map\(|v-for\s*=|\{#each\b)[\s\S]{0,1600})`,
    message: "Put the icon inline in the text colour; a tinted tile behind every item's icon is the feature-grid template (one tile may anchor a single card or an empty state)."
  },
  {
    id: "kicker",
    ban: "icon-everywhere",
    kind: "taste",
    exts: MARKUP,
    // A small label directly above a heading: a pill, capitals (untracked; tracked capitals are uppercase-label), or bold accent text.
    pattern: String.raw`<(?<kt>p|span|div|small)\b` + String.raw`(?:(?=${ATTRS}${ROUND_FULL})(?=${ATTRS}(?<=[\s${Q}])(?:border|bg)(?:-[^\s${Q}]+)?(?=[\s${Q}]))|(?=${ATTRS}${UPPER})(?!${ATTRS}${WIDE})|(?=${ATTRS}(?<=[\s${Q}])font-(?:semibold|bold)(?=[\s${Q}]))(?=${ATTRS}(?<=[\s${Q}])text-(?:primary|accent|brand|(?:${HUES})-[4-7]00)(?=[\s${Q}])))` + String.raw`${ATTRS}>${LABEL_TEXT}<\/\k<kt>>${HEADING_NEXT}` + String.raw`|<(?<kc>Badge|Chip|Pill|Tag)\b${ATTRS}>${LABEL_TEXT}<\/\k<kc>>(?=\s*<(?:h[12]\b|[A-Z]\w*(?:Hero|Page|Section)(?:Title|Heading)\b))`,
    message: "Delete the label above the heading and let the heading say what the section is; an eyebrow over every heading is a template."
  },
  {
    id: "section-numbering",
    ban: "icon-everywhere",
    kind: "taste",
    exts: CODE,
    pattern: String.raw`\b(?:i|j|k|n|idx|index)\s*\+\s*1\b[^;\n]{0,40}?\.padStart\(\s*2\s*,\s*[${Q}]0[${Q}]\s*\)` + String.raw`|(?<=>\s*)0\{\s*(?:i|j|k|n|idx|index)\s*\+\s*1\s*\}|(?<=[${Q}])0\$\{\s*(?:i|j|k|n|idx|index)\s*\+\s*1\s*\}` + String.raw`|(?<=(?:${TAG_END}|[${Q}])\s*)0[1-9][ \t]*(?:\/(?![ \t]*\d)|—|–)`,
    message: "Title each section with what it is; drop the 01 / 02 numbering, which says nothing."
  },
  {
    id: "marquee",
    ban: "long-motion",
    kind: "taste",
    exts: ALL,
    // The element, a class or keyframes named for it, an `animation` whose keyframes slide sideways forever (each name in
    // a linear infinite `animation` is a match `k`, kept when `needs` finds its keyframes sliding), or Framer's x loop.
    pattern: String.raw`<marquee\b|${AT}animate-(?:(?:marquee|ticker|infinite-scroll|scroll)(?:-[\w-]+)?|\[(?:marquee|ticker|infinite-scroll|scroll)[^\]\s]*\])${END}` + String.raw`|@keyframes\s+[\w-]*(?:marquee|ticker)[\w-]*|(?<![-\w])(?:animation(?:-name)?|animationName)\s*:\s*[^;{}\n]{0,400}?\b(?:marquee|ticker)\b` + // The first name from the property itself, as before; a later name in the same value from its own position, its
    // property found by the nearest colon (trying every colon 400 back cost 1.4 s on 400 KB of `animation: x `).
    String.raw`|(?:(?<![-\w])animation\s*:(?=${VALUE}\blinear\b)(?=${VALUE}\binfinite\b)${VALUE}?(?<![\w-])` + String.raw`|(?<![\w-])(?=[A-Za-z])(?<=(?<![-\w])(?=animation\s*:${VALUE}\blinear\b)(?=animation\s*:${VALUE}\binfinite\b)animation\s*:[^;{}:]{0,400}))` + String.raw`(?!(?:linear|infinite|ease(?:-in-out|-in|-out)?|alternate(?:-reverse)?|reverse|normal|forwards|backwards|both|none|running|paused|initial|inherit|unset)(?![\w-]))(?<k>[A-Za-z][\w-]*)(?![\w(-])` + String.raw`|\brepeat\s*:\s*Infinity\b(?:(?=[^{}]{0,200}\bease\s*:\s*[${Q}]linear[${Q}])|(?<=\{[^{}]{0,200}\bease\s*:\s*[${Q}]linear[${Q}][^{}]{0,200}))` + String.raw`(?:(?<=\b(?:x|translateX)\s*:\s*(?:\[|[${Q}]-)[^<>]{0,400})|(?=[^<>]{0,400}\b(?:x|translateX)\s*:\s*(?:\[|[${Q}]-)))`,
    needs: String.raw`@keyframes\s+(?<k>[\w-]+)\s*\{[^@]{0,600}?${SIDEWAYS}`,
    message: "Show the items still, or in a carousel that steps one at a time and swipes; readable content never runs in an infinite marquee."
  },
  {
    id: "pulsing-dot",
    ban: "long-motion",
    kind: "taste",
    exts: ALL,
    // A small round dot that pings or pulses forever to look live.
    pattern: String.raw`${AT}animate-ping${END}(?:(?=${SAME}${ROUND_FULL})|(?<=${ROUND_FULL}${SAME}animate-ping))` + String.raw`|${AT}animate-pulse${END}(?:(?=${SAME}${ROUND_FULL})|(?<=${ROUND_FULL}${SAME}animate-pulse))(?:(?=${SAME}${BASE}(?:size|h|w)-(?:1|1\.5|2|2\.5|3)(?=[\s${Q}]))|(?<=${BASE}(?:size|h|w)-(?:1|1\.5|2|2\.5|3)[\s${Q}]${SAME}animate-pulse))` + String.raw`|(?<![-\w])animation\s*:(?=${VALUE}\binfinite\b)${VALUE}?(?<![\w-])[\w-]*(?:pulse|ping|breathe)[\w-]*(?![\w-])` + String.raw`(?<=(?=\{${BLOCK}(?<![-\w])border-radius\s*:\s*(?:50%|9\d{2,}px|[1-9]\d{3,}px))(?=\{${BLOCK}(?<![-\w])width\s*:\s*(?:[1-9]|1[0-6])(?:\.\d+)?px)\{${BLOCK})`,
    message: "Show the status as a still dot with a word beside it; a looping pulse fakes liveness."
  },
  {
    id: "blinking-cursor",
    ban: "long-motion",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`${AT}animate-(?:blink|caret|cursor|typewriter)(?:-[\w-]+)?${END}` + String.raw`|<span\b(?=${ATTRS}animate-(?:pulse|ping)\b)${ATTRS}>\s*(?:\||▋|▌|▍|█|_)\s*<\/span>` + String.raw`|(?<![-\w])(?:animation(?:-name)?|animationName)\s*:\s*[${Q}]?[^;{}\n${Q}]{0,400}?(?<![\w-])(?:blink|caret|cursor|typewriter)[\w-]*`,
    message: "Remove the fake blinking caret; only a real text field draws one."
  },
  {
    id: "shape-illustration",
    ban: "decorative-imagery",
    kind: "taste",
    exts: MARKUP,
    // An inline drawing of 200px and more built from eight or more primitive shapes: clip art, not an icon or a chart.
    // The open tag is read 2 000 characters deep (unbounded, every unclosed `<svg` read to the end of the file).
    pattern: String.raw`<svg\b(?=[^>]{0,2000}(?:(?<![-\w])(?:width|height)\s*=\s*[${Q}{]?\s*(?:[2-9]\d\d|\d{4,})(?![\d.])|\bviewBox\s*=\s*[${Q}{]?\s*[${Q}]?\s*[-\d.]+[\s,]+[-\d.]+[\s,]+(?:[2-9]\d\d|\d{4,})(?:\.\d+)?[\s,]+(?:[2-9]\d\d|\d{4,})(?![\d])))` + String.raw`(?=(?:(?:(?!<\/svg>)[\s\S]){0,3000}?<(?:rect|circle|ellipse|polygon)\b){8})` + // …in three or more fill colours: a one-colour wordmark built from polygons is a logo.
    String.raw`(?=${nextFill("fa", [])}${nextFill("fb", ["fa"])}${nextFill("fc", ["fa", "fb"])})`,
    message: "Replace the drawing assembled from shapes with a real image, the product itself, or nothing."
  },
  {
    id: "organic-clip-path",
    ban: "decorative-imagery",
    kind: "taste",
    exts: ALL,
    // A path() with three or more curves, or a polygon of twelve or more points: a blob or torn edge drawn in CSS.
    pattern: String.raw`(?<![-\w])clip-?[pP]ath\s*:\s*[${Q}]?\s*(?:path\(\s*[${Q}](?=(?:[^${Q}]*?[CSQTAcsqta]){3})|polygon\((?=(?:[^()]*?,){11}))`,
    message: "Use a real cut-out image or a plain shape; a clip-path blob imitates a produced edge."
  },
  {
    id: "hype-copy",
    ban: "marketing-copy",
    kind: "taste",
    exts: CODE,
    pattern: String.raw`\b(?:${HYPE})\b${IN_TEXT}${NOT_COMMENT}|(?<=(?:>|[${Q}])\s*)(?:welcome back|unlock)\b${IN_TEXT}${NOT_COMMENT}`,
    flags: "i",
    message: "Replace the hype word with the plain fact: what it does, with a number."
  },
  {
    id: "slogan-copy",
    ban: "marketing-copy",
    kind: "taste",
    exts: CODE,
    // "Not a tool. A platform." and "X theater": a manufactured contrast or a dismissal where a plain statement belongs.
    pattern: String.raw`(?<=(?:^|[>${Q}]|[.!?])\s*)Not (?:a|an|just a|just an|another) [^.!?<>{}\n${Q}]{1,40}[.!]\s+(?:(?:It'?s|It is|This is)\s+)?(?:A|An|The|Just)\s[^.!?<>{}\n${Q}]{1,60}[.!]${IN_TEXT}${NOT_COMMENT}` + String.raw`|\b(?:(?:security|privacy|compliance|productivity|process|meeting|innovation|agile|growth|hiring|safety|metrics?|dashboard|kpi|okr|accountability|transparency|culture|design)\s+|(?:just|pure|mere|nothing but)\s+)theat(?:er|re)\b${IN_TEXT}${NOT_COMMENT}`,
    flags: "i",
    message: 'Say plainly what it does; a slogan-shaped line ("Not a tool. A platform.", "security theater") is a generated tic.'
  },
  // ── Last on the web list, so an older rule that already read the same span keeps it ──────────
  {
    id: "fake-chrome",
    ban: "fake-chrome",
    kind: "taste",
    exts: MARKUP_CSS,
    // The macOS traffic lights by their own hexes, three red / yellow / green dots side by side (a status legend
    // has its labels between them), or a name that says what is being faked. A real <dialog> and a desktop app's
    // own title bar are not this, so `titlebar` and `window-controls` are deliberately not in the list.
    pattern: String.raw`#ff5f5[67]\b[\s\S]{0,200}?#f[fe]b[cd]2e\b` + String.raw`|${chromeDot("red|rose")}\s*${chromeDot("yellow|amber|orange")}\s*${chromeDot("green|emerald|lime")}` + String.raw`|${CHROME_NAME}`,
    flags: "i",
    message: "Show the screen itself, at its own size; a drawn browser bar or phone bezel around it is set dressing."
  },
  {
    id: "italic-heading",
    ban: "italic-heading",
    kind: "taste",
    exts: ALL,
    // Italic on a main heading (h1, h2, a component, CSS rule or style key named for one), and an <em> opened inside
    // any heading. A subhead in lowercase italic is allowed: h3–h6 unless set in capitals, and anything named
    // subtitle, subhead or subheading. An <em> inside a paragraph is emphasis and stays; so does an <i> icon.
    pattern: (
      // In a lookbehind the parts run right to left, so the capitals check sits before the level it qualifies: after it,
      // it ran at every step back, 400 by 400 (4 s for 400 KB of `italic`).
      String.raw`${ITALIC}(?<=<h(?:[12]|(?=[3-6][^>]{0,400}${UPPER})[3-6])\b[^>]{0,400}italic)` + String.raw`|${ITALIC}(?<=<[A-Z]\w*(?<!Sub)(?:Title|Heading|Headline|Display)\b[^>]{0,400}italic)` + String.raw`|(?<![-\w])font-style\s*:\s*italic\b${HEADING_RULE}` + String.raw`|(?<![-\w])fontStyle\s*:\s*[${Q}]italic[${Q}](?<=(?<![Ss]ub)(?:[Tt]itle|[Hh]eading|[Hh]eadline|[Dd]isplay)\w*[${Q}]?\s*:\s*\{[^{}]{0,300}fontStyle\s*:\s*[${Q}]italic[${Q}])` + String.raw`|<h[1-6]\b${ATTRS}>[^<>]{0,200}<em(?=[\s>])`
    ),
    message: "Set the heading upright in your display face; italics belong to a quotation or a term, not to a whole heading."
  },
  {
    id: "animated-layout",
    ban: "long-motion",
    kind: "universal",
    exts: ALL,
    // `transition: all` is `transition-all`'s and a width or height is `layout-transition`'s: both start at the
    // same character, so the ordering rule leaves them theirs and this one speaks for the insets they do not read.
    pattern: String.raw`${AT}transition-\[(?=[^\]\s]*?${MOVED_PROP})[^\]\s]+\]${END}` + String.raw`|(?<![-\w])transition(?:-property|Property)?\s*:\s*[${Q}]?(?![^;{}${Q}\n]{0,400}?(?<![-\w])all\b)[^;{}${Q}\n]{0,400}?${MOVED_PROP}`,
    message: "Move the element with transform and fade it with opacity; a transition on top, left, right, bottom, width, height, padding or margin re-lays the page out on every frame."
  },
  {
    id: "focus-transition",
    ban: "no-keyboard",
    kind: "universal",
    exts: ALL,
    // A transition on the ring inside the rule that draws it: for the length of it the keyboard has no indicator.
    pattern: String.raw`(?<![-\w])transition(?:-property)?\s*:(?!${VALUE}(?<![-\w])all\b)${VALUE}?(?<![\w-])(?:outline|box-shadow)(?![\w-])${FOCUS_RULE}`,
    message: "Draw the focus ring at once and transition the colours only; a ring that fades in leaves the keyboard with no indicator while it does."
  },
  {
    id: "arbitrary-z",
    ban: "three-layers",
    kind: "universal",
    exts: ALL,
    pattern: String.raw`(?:${AT}-?z-(?:${HIGH_Z}|\[-?${HIGH_Z}\])${END}` + String.raw`|(?<![-\w])z-index\s*:\s*-?${HIGH_Z}(?![\d.])` + String.raw`|(?<![-\w])zIndex\s*:\s*[${Q}]?-?${HIGH_Z}(?![\d.]))${NOT_COMMENT}`,
    message: "Put the element on a named step of your own layer scale; a z-index of 999 is a guess the next overlay has to beat."
  },
  {
    id: "viewport-width",
    ban: "viewport-sizing",
    kind: "universal",
    exts: ALL,
    // `max-w-screen-lg` is a breakpoint, not the viewport, and `END` refuses it.
    pattern: String.raw`${AT}(?:min-|max-)?w-(?:screen|\[100vw\])${END}` + String.raw`|(?<![-\w])(?:min-|max-)?width\s*:\s*100vw(?![\w.])` + String.raw`|(?<![-\w])(?:min|max)?[Ww]idth\s*:\s*[${Q}]100vw[${Q}]`,
    message: "Size the element with 100% or its container; 100vw counts the scrollbar, so the page overflows by its width whenever one is visible."
  },
  {
    id: "full-height-hero",
    ban: "viewport-sizing",
    kind: "taste",
    exts: ALL,
    // Only where the element names itself a hero: a layout shell may fill the window, and often must.
    pattern: String.raw`${AT}(?:min-)?h-screen${END}` + String.raw`(?:(?<=<[\w.]*${HERO}[\w.]*\b(?:=>|[^>]){0,600}h-screen)|(?<=[\s${Q}][\w-]*${HERO}[^\n${Q}]{0,300}h-screen)|(?=[^\n${Q}]{0,300}${HERO}))` + String.raw`|(?<![-\w])min-height\s*:\s*100vh(?![\w.])(?<=(?:^|[{};])[^{};]*?${HERO}[^{};]*\{[^{}]*)`,
    flags: "i",
    message: "Let the hero be as tall as its content and your spacing scale; a full-window band pushes everything below the fold and clips itself on a short screen."
  },
  {
    id: "caps-tight-leading",
    ban: "uppercase-headings",
    kind: "universal",
    exts: ALL,
    pattern: String.raw`${UPPER}(?:(?=${SAME}${TIGHT_LEADING})|(?<=${TIGHT_LEADING}${SAME}uppercase))` + String.raw`|(?<![-\w])text-transform\s*:\s*uppercase\b(?:(?=[^{}]{0,400}(?<![-\w])line-height\s*:\s*${SUB_ONE})|(?<=(?<![-\w])line-height\s*:\s*${SUB_ONE}[^{}]{0,400}text-transform\s*:\s*uppercase))` + String.raw`|(?<![-\w])textTransform\s*:\s*[${Q}]uppercase[${Q}](?:(?=[^{}]{0,400}(?<![-\w])lineHeight\s*:\s*0?\.\d+(?![\d.]))|(?<=(?<![-\w])lineHeight\s*:\s*0?\.\d+[^{}]{0,400}textTransform\s*:\s*[${Q}]uppercase[${Q}]))`,
    message: "Set the label in sentence case, or give the capitals a line height of at least 1.1; capitals have no descenders, so the next line's cap-tops touch the one above."
  },
  {
    id: "ascii-punctuation",
    ban: "ascii-punctuation",
    kind: "universal",
    exts: CODE,
    // Copy only, and only where the periods end a word: a spread (`{...props}`, `f(...args)`, `[...list]`), a path,
    // a comment and a log call all fail one of the three guards. Straight quotes are not read — in source they are
    // the quotes.
    pattern: String.raw`(?<=[\p{L}\d)\]!?])\.\.\.${IN_TEXT}${NOT_COMMENT}${NOT_LOG}`,
    flags: "u",
    message: "Write the ellipsis as one character (\u2026) in copy; three periods is a typewriter's way of drawing it."
  },
  {
    id: "em-dash",
    ban: "ascii-punctuation",
    kind: "taste",
    exts: MARKUP,
    // Between words, in a text node or a copy attribute (label, title, placeholder, aria-label, alt). A lone dash
    // standing for an empty value has no word beside it; an en dash, a comment, code and a Markdown file are not read.
    pattern: String.raw`(?<=[\p{L}\d)\].,!?’”][ \t\u00a0]*)(?<!\b0[1-9][ \t]*)${IN_COPY}${EM_DASH}(?=[ \t\u00a0]*[\p{L}\d(‘“])${NOT_COMMENT}`,
    flags: "u",
    message: "Replace the em dash with a comma, a colon, a full stop or parentheses; keep the en dash for ranges."
  },
  {
    id: "vendor-asset",
    ban: "vendor-assets",
    kind: "universal",
    exts: ALL,
    // Anchored on the attribute or the `url()` that fetches it, so an https in prose, an xmlns and a schema URL
    // are never read. Known hosts only: any other origin cannot be told from the product's own CDN.
    pattern: String.raw`(?:(?<=(?:src|srcset|href|poster|data-src)\s*=\s*[${Q}{]?\s*[${Q}]?)(?:https?:)?\/\/${VENDOR_HOST}` + String.raw`|(?<![-\w])url\(\s*[${Q}]?(?:https?:)?\/\/${VENDOR_HOST}` + String.raw`|@import\s+(?:url\(\s*)?[${Q}]?(?:https?:)?\/\/${VENDOR_HOST})(?![\w-])${NOT_COMMENT}`,
    flags: "i",
    message: "Serve the font, the icon set and the script from your own origin; a third-party CDN puts another company in the page's critical path."
  },
  {
    id: "no-alt",
    ban: "no-alt",
    kind: "universal",
    exts: MARKUP,
    // No alt at all (a spread, Svelte's {alt} and Vue's :alt count as one), or an alt that names the file or the
    // medium. An explicit alt="" is how decoration is marked and is correct.
    pattern: (
      // The look for an alt stops where the tag must: 400 characters (unbounded, it read every unclosed `<img` to the end).
      String.raw`<img\b(?!(?:=>|[^>]){0,400}?(?:(?<![\w:-])alt\s*=|:alt\b|v-bind:alt\b|\[alt\]|\{\s*(?:alt|\.\.\.)))(?:=>|[^>]){0,400}\/?>` + String.raw`|<img\b(?:=>|[^>]){0,400}?(?<![-\w:])alt\s*=\s*[${Q}]\s*(?:[\w/.-]*\.(?:png|jpe?g|gif|svg|webp|avif)|(?:image|photo|picture|icon|img)s?)\s*[${Q}]`
    ),
    flags: "i",
    message: 'Say in the alt what the image shows, or set alt="" when it is decoration; a file name or the word "image" tells a screen reader nothing.'
  },
  {
    id: "ink-on-ink",
    ban: "ink-on-ink",
    kind: "taste",
    exts: ALL,
    // Both colours dark in one rule — the inverted section whose type never followed. A dark fill with no colour
    // at all is not read: `.hero { background: #111 }` with `.hero h1 { color: #fff }` beside it is ordinary CSS.
    pattern: String.raw`(?<![-\w])background(?:-color)?\s*:\s*${INK_VALUE}${VALUE};[^{}]{0,400}?(?<![-\w])color\s*:\s*(?:inherit|currentColor|${INK_VALUE})${PANEL_RULE}` + String.raw`|(?<![-\w])color\s*:\s*(?:inherit|currentColor|${INK_VALUE})${VALUE};[^{}]{0,400}?(?<![-\w])background(?:-color)?\s*:\s*${INK_VALUE}${PANEL_RULE}`,
    flags: "i",
    message: "Flip the type with the surface: a dark fill takes the paper colour, never the ink or an inherited one."
  },
  {
    id: "native-dialog",
    ban: "native-dialog",
    kind: "universal",
    exts: CODE,
    skip: TEST_SKIP,
    // The browser's own alert, confirm and prompt, bare or on window: a member call on anything else is a
    // library's, and a name the file declares, imports or destructures is the product's own function.
    pattern: String.raw`(?<![\w.$])(?:(?:window|globalThis|self)\.)?(?<k>${DIALOG})\(${NOT_COMMENT}`,
    unless: OWN_DIALOG,
    message: "Ask in your own dialog, with the action named on its button; the browser's alert, confirm and prompt block the page and cannot be styled or read well."
  },
  {
    id: "div-button",
    ban: "div-button",
    kind: "taste",
    exts: MARKUP,
    skip: TEST_SKIP,
    // A click handler on an element the keyboard cannot reach. Any role, a tabindex or a key handler in the same tag
    // says someone thought about it; a handler that only stops propagation is a guard, not an action.
    pattern: String.raw`<(?:div|span|li|td|img)\b` + String.raw`(?=${attrs(800)}(?<![\w:.-])(?:(?:onClick|onclick)\s*=(?!\s*\{\s*\(?\s*\w*\s*\)?\s*=>\s*\w+\.stopPropagation\(\)\s*;?\s*\})(?!\s*[${Q}]\s*event\.stopPropagation\(\)\s*;?\s*[${Q}])|(?:@click|v-on:click|on:click)(?:[.|]\w+)*\s*=))` + String.raw`(?!${attrs(800)}(?<![\w:.-])(?:role|tabIndex|tabindex|:tabindex|onKey(?:Down|Up|Press)|onkey(?:down|up|press)|(?:@|v-on:|on:)key(?:down|up|press))\b)`,
    message: "Make the clickable thing a button (or a link when it goes somewhere); a div or span with a click handler cannot be reached or pressed from the keyboard."
  },
  {
    id: "custom-cursor",
    ban: "custom-cursor",
    kind: "taste",
    exts: ALL,
    // An image cursor anywhere, and the pointer hidden for the whole page. A canvas or a video player may hide it.
    pattern: String.raw`(?<![-\w])cursor\s*:\s*[${Q}]?url\(|${AT}cursor-\[url\(` + String.raw`|(?<![-\w])cursor\s*:\s*none\b(?<=(?:^|[{};,])\s*(?:html|body|\*|:root)\s*(?:,${SEL})?\{${BLOCK})` + String.raw`|${AT}cursor-none${END}(?<=<(?:body|html)\b${attrs(800)})` + String.raw`|\bdocument\.(?:body|documentElement)\.style\.cursor\s*=\s*[${Q}](?:none|url\()`,
    flags: "i",
    message: "Keep the system pointer; a drawn or hidden cursor lags behind the hand and hides where a click will land."
  },
  {
    id: "scroll-cue",
    ban: "scroll-cue",
    kind: "taste",
    exts: MARKUP,
    // The whole text of an element, or a whole quoted string that carries a direction: "Scroll to top" is a control
    // and stays, and a sentence that goes on after the words is prose.
    pattern: String.raw`(?<=>\s*)(?:Scroll|Swipe)(?:\s+(?:down|up|for more|to (?:explore|discover|continue|see more|learn more|begin|start)))?\s*[↓⌄↡⇣]?\s*(?=<)` + String.raw`|(?<=[${Q}])(?:Scroll|Swipe)\s+(?:down|for more|to (?:explore|discover|continue|see more|learn more|begin|start))\s*[↓⌄↡⇣]?(?=[${Q}])`,
    flags: "i",
    message: "Let the next section show its own top edge above the fold; a line telling people to scroll means the page gave them no reason to."
  },
  {
    id: "cliche-glyph",
    ban: "cliche-glyph",
    kind: "taste",
    exts: CODE,
    // Only a name imported from an icon package, or an icon set's own string or class: a product's component called
    // Rocket and a star for a rating are not this. The name is matched before the `import {` is looked for, and the
    // import list is bounded: an unbounded walk back at every position cost 5 s on one 80 KB line.
    pattern: String.raw`(?<![\w$])(?=${CLICHE})(?:(?<=\bimport\s+(?:type\s+)?\{[^}]{0,2000})${CLICHE}(?=[^}]{0,2000}\}\s*from\s*[${Q}]${ICON_PACKAGE})` + String.raw`|(?<=\bimport\s+)${CLICHE}(?=\s+from\s*[${Q}]${ICON_PACKAGE}))` + String.raw`|(?<=[${Q}])(?:lucide|mdi|ph|tabler|heroicons[\w-]*|material-symbols[\w-]*|fa6?-[\w-]+|hugeicons|ri|carbon|solar|iconoir|mingcute):[\w-]*(?:sparkle|magic|wand|rocket)[\w-]*(?=[${Q}])` + String.raw`|(?<=[\s${Q}])(?:fa|ph|ti|hgi|bi|ri)-[\w-]*(?:sparkle|magic|wand|rocket)[\w-]*(?=[\s${Q}])`,
    message: 'Draw the thing the feature actually does; sparkles, a magic wand and a rocket say "AI" and "launch" and nothing about your product.'
  },
  {
    id: "sideways-text",
    ban: "sideways-text",
    kind: "taste",
    exts: ALL,
    // Vertical writing for Japanese, Chinese or Korean is the script's own; it is left alone where the line or the
    // rule names the language.
    pattern: String.raw`(?:(?<![-\w])writing-mode\s*:\s*|\[writing-mode:|(?<![-\w])writingMode\s*:\s*[${Q}])(?:vertical|sideways)-(?:rl|lr)` + String.raw`(?<!lang\s*=\s*[${Q}{]?\s*[${Q}]?${CJK}[^\n]{0,2000})(?![^\n]{0,2000}lang\s*=\s*[${Q}{]?\s*[${Q}]?${CJK})(?<!(?::lang\(\s*${CJK}\s*\)|\[lang[|^*~]?=\s*[${Q}]?${CJK})${BLOCK}\{${BLOCK})`,
    flags: "i",
    message: "Set the label horizontally and give it the room; text turned on its side is read by tilting the head, and not at all by most people."
  },
  {
    id: "dead-link",
    ban: "dead-ends",
    kind: "universal",
    exts: [".tsx", ".jsx", ".vue", ".svelte"],
    skip: TEST_SKIP,
    // Here a handler is an attribute of the tag, so a link that has none and goes to # really goes nowhere.
    pattern: DEAD_LINK,
    message: "Point the link at the page it names, or make it a button that does the thing; a link to # goes nowhere."
  },
  {
    id: "dead-link-page",
    ban: "dead-ends",
    kind: "universal",
    exts: [".html", ".astro"],
    skip: TEST_SKIP,
    // A page with a script can wire a link by its class from anywhere, so only a page without one is judged.
    pattern: DEAD_LINK,
    unless: SCRIPT,
    message: "Point the link at the page it names, or make it a button that does the thing; a link to # goes nowhere."
  },
  {
    id: "dead-handler",
    ban: "dead-ends",
    kind: "universal",
    exts: MARKUP,
    skip: TEST_SKIP,
    // An empty body, a comment, nothing at all, or a log line: the control looks alive and does nothing.
    pattern: String.raw`(?<![\w:.-])(?:onClick|onPress|onTap|on:click)\s*=\s*\{\s*(?:undefined|null|void 0|(?:async\s*)?(?:\([^()]*\)|\w+)\s*=>\s*(?:\{\s*(?:(?:\/\/[^\n]*|\/\*[^*]*\*\/)\s*)*\}|null|undefined|void 0|\{?\s*console\.\w+\([^()\n]*\)\s*;?\s*\}?))\s*\}` + String.raw`|(?<![\w:.-])(?:@click|v-on:click)(?:\.\w+)*\s*=\s*[${Q}]\s*(?:\(\s*\)\s*=>\s*\{\s*\}|\{\s*\})?\s*[${Q}]` + String.raw`|(?<![\w:.-])onclick\s*=\s*[${Q}]\s*(?:void\s*\(?\s*0\s*\)?\s*;?)?\s*[${Q}]`,
    message: "Give the control its action, or remove it until it has one; a handler that does nothing is a button that lies."
  },
  {
    id: "inert-button",
    ban: "dead-ends",
    kind: "taste",
    exts: [".tsx", ".jsx"],
    skip: TEST_SKIP,
    // React has no attribute fall-through, so a button with no handler, no ref, no id and no spread does nothing —
    // unless it submits a form its parent renders, or a trigger it sits in (asChild) hands it one. Both are excluded.
    pattern: String.raw`<button\b(?<!(?:(?:asChild|as=\{Fragment\})[^<>]{0,120}|<(?:a|Link|NextLink|RouterLink)\b[^<>]{0,300})>\s*(?:\{[^{}]*\}\s*)?<button)(?!${tagAttrs(800)}${BUTTON_WIRED})${tagAttrs(800)}>${NOT_COMMENT}`,
    unless: FORMISH,
    message: "Give the button its action, or remove it until it has one; a button wired to nothing looks like it works."
  },
  {
    id: "heading-skip",
    ban: "heading-outline",
    kind: "taste",
    exts: MARKUP,
    skip: TEST_SKIP,
    // The heading after an hN, when it is deeper than hN+1: the match is the skipped-to tag's name, so its line is reported.
    pattern: String.raw`(?<=<)(?:h[3-6](?<=${headingGap(1)}h[3-6])|h[4-6](?<=${headingGap(2)}h[4-6])|h[56](?<=${headingGap(3)}h[56])|h6(?<=${headingGap(4)}h6))\b`,
    message: "Take the heading's level from the outline, one under the heading it belongs to, and its size from the type scale."
  },
  {
    id: "multiple-h1",
    ban: "heading-outline",
    kind: "taste",
    exts: [".html", ".astro"],
    skip: TEST_SKIP,
    // A page file: every h1 after the first. A component file may hold an h1 per branch, so it is not read.
    // The earlier h1 is looked for nearest first: greedy, every h1 walked back to the start of the file.
    pattern: String.raw`(?<=<)h1\b(?<=<h1\b[\s\S]*?<h1)`,
    message: "Keep one h1, the page's own name; the other headings take the next level down."
  },
  {
    id: "zoom-locked",
    ban: "zoom-locked",
    kind: "universal",
    exts: CODE,
    skip: TEST_SKIP,
    // Inside a quoted value (a viewport meta's content, a setAttribute call) or a framework's viewport export. A cap
    // above 1 still lets people zoom, and so does an initial scale of 1.
    pattern: String.raw`(?:(?<=[${Q}][^${Q}\n]{0,200})(?:user-scalable\s*=\s*(?:no|0)|maximum-scale\s*=\s*(?:1(?:\.0+)?|0?\.\d+))` + String.raw`|(?<=\bviewport\b[^}]{0,300})(?:userScalable\s*:\s*false|maximumScale\s*:\s*(?:1(?:\.0+)?|0?\.\d+)))(?![\w.])${NOT_COMMENT}`,
    flags: "i",
    message: "Let people zoom: drop the scale cap and the zoom switch from the viewport, and fix whatever broke under zoom in the layout itself."
  },
  {
    id: "blocked-paste",
    ban: "blocked-paste",
    kind: "universal",
    exts: CODE,
    skip: TEST_SKIP,
    // Only a handler that does nothing but refuse: one that reads the clipboard and inserts it itself is a paste.
    pattern: String.raw`(?:(?<![\w:.-])on[Pp]aste\s*=\s*\{\s*${ONLY_PREVENT}\s*\}` + String.raw`|(?<![\w:.-])onpaste\s*=\s*[${Q}]\s*(?:return\s+false|(?:event|e)\.preventDefault\(\))\s*;?\s*[${Q}]` + String.raw`|(?<![\w:.-])(?:@|v-on:)paste(?:\.\w+)*\.prevent(?:\.\w+)*(?=[\s/>])` + String.raw`|(?<![\w:.-])on:paste(?:\|\w+)*\|preventDefault(?:\|\w+)*(?=[\s/>])` + String.raw`|\baddEventListener\(\s*[${Q}]paste[${Q}]\s*,\s*(?:function\s*\(\s*\w*\s*\)\s*\{\s*\w+\.preventDefault\(\)\s*;?\s*(?:return\s+false\s*;?\s*)?\}|${ONLY_PREVENT})\s*[,)])${NOT_COMMENT}`,
    message: "Let the field take paste: a password manager, a copied code and a long address all arrive that way, and refusing them only makes people type."
  },
  {
    id: "positive-tabindex",
    ban: "no-keyboard",
    kind: "universal",
    exts: CODE,
    skip: TEST_SKIP,
    // 0 and -1 are how focus is managed; a value that is computed cannot be judged here.
    pattern: String.raw`(?:(?<![\w.-])(?:v-bind)?:?tab[Ii]ndex\s*=\s*(?:\{\s*|[${Q}]\s*)\+?[1-9]\d*(?![\w.])` + String.raw`|\.tabIndex\s*=\s*\+?[1-9]\d*(?![\w.])|\bsetAttribute\(\s*[${Q}]tabindex[${Q}]\s*,\s*[${Q}]?\+?[1-9]\d*(?![\w.]))${NOT_COMMENT}`,
    message: "Set tabindex to 0 (or -1 for focus moved by script) and put the markup in the order it is read; a positive tabindex makes the keyboard jump around the page."
  },
  {
    id: "pop-from-zero",
    ban: "pop-from-zero",
    kind: "taste",
    exts: ALL,
    // The first frame of an entrance only: a keyframe's opening block (a ripple, a ping or a loader may start at a
    // point), a starting style, a transition's enter class, a motion library's initial state, Tailwind's entry variants.
    // An exit to 0 and a plain resting `scale-0` are not judged.
    pattern: String.raw`(?:(?<=@keyframes\s+(?![\w-]*(?:ripple|ping|pulse|wave|spin|load))[\w-]+\s*\{\s*(?:from|0%)\s*\{[^{}]*)${ZERO_SCALE}` + String.raw`|(?<=@starting-style\s*\{(?:[^{}]*\{)?[^{}]*)${ZERO_SCALE}` + String.raw`|(?<=-enter(?:-from)?(?![\w-])[^{}]{0,120}\{[^{}]*)${ZERO_SCALE}` + String.raw`|(?<=\b(?:initial|from|hidden|enter|enterFrom)\s*[=:]\s*\{\{?[^{}]*)(?<![-\w])scale\s*:\s*0(?![\d.%])` + String.raw`|(?<=\.from(?:To)?\(\s*[^,()]+,\s*\{[^{}]*)(?<![-\w])scale\s*:\s*0(?![\d.%])` + String.raw`|(?<=[\s${Q}:])(?:starting|data-\[starting-style\]|data-starting-style|data-\[state=closed\]|data-closed|data-\[closed\]|data-\[enter\]|data-enter):scale-0${END}` + String.raw`|(?<=\b(?:enterFrom|enter-from-class)\s*=\s*[${Q}][^${Q}\n]{0,200}[\s${Q}])scale-0(?=[\s${Q}]))${NOT_COMMENT}`,
    message: "Start the entrance at a scale of 0.9 to 0.97 with the opacity at 0; growing out of a point reads as a pop, not an arrival."
  },
  {
    id: "weak-input-type",
    ban: "weak-input",
    kind: "taste",
    exts: MARKUP,
    skip: TEST_SKIP,
    // A field named for an email, a phone or a web address and typed as plain text, with no input mode to call the
    // right keyboard. Named by its name, id or autocomplete token: a placeholder ("Email subject") says too little.
    pattern: String.raw`<(?:input|Input|TextField)\b(?=${attrs(800)}(?<![\w:.-])type\s*=\s*[${Q}]text[${Q}])` + String.raw`(?=${attrs(800)}(?<![\w:.-])(?:name|id|autoComplete|autocomplete)\s*=\s*${KIND_NAME})(?!${attrs(800)}(?<![\w:.-])input[Mm]ode\s*=)${attrs(800)}>`,
    message: "Give the field its real type (email, tel, url) or input mode, so the phone shows the right keyboard and the browser can fill it."
  },
  {
    id: "mobile-autofocus",
    ban: "weak-input",
    kind: "taste",
    exts: [".tsx", ".jsx", ".js", ".ts"],
    skip: TEST_SKIP,
    // React Native only, read from the file's own import. A search field opening its search screen is focused on purpose.
    pattern: String.raw`<(?![\w.]*[Ss]earch)[\w.]+\b(?!${attrs(800)}[Ss]earch)${attrs(800)}(?<![\w:.-])autoFocus(?:\s*=\s*\{\s*true\s*\})?(?=[\s/>])`,
    needs: String.raw`\bfrom\s*[${Q}]react-native[${Q}]`,
    message: "Let the person tap the field: a field focused on arrival throws a keyboard over half the screen before they have read it."
  },
  {
    id: "hand-currency",
    ban: "hand-formatted",
    kind: "taste",
    exts: CODE,
    skip: TEST_SKIP,
    // A currency character glued to a fixed decimal: in a template (`$${n.toFixed(2)}`), in JSX (`€{n.toFixed(2)}`),
    // or by concatenation. JSX's `${…}` is left alone: it cannot be told from a template's own interpolation.
    pattern: String.raw`(?:(?:\$\$|[€£¥₽₹]\$?)\{[^{}\n]{0,120}?\.toFixed\(` + String.raw`|[${Q}]${MONEY}[${Q}]\s*\+\s*[\w.$()[\]]+\.toFixed\(` + String.raw`|\.toFixed\(\s*\d?\s*\)\s*\+\s*[${Q}]\s*(?:${MONEY}|USD|EUR|GBP|UZS|RUB)[${Q}])${NOT_COMMENT}`,
    message: "Format the amount with Intl.NumberFormat in the reader's locale and currency; a symbol glued to toFixed lands on the wrong side, with the wrong separators, for most of the world."
  },
  // ── Dart, Swift, Kotlin. Copy is read inside string literals only; drift never inside their theme files ──
  {
    id: "border-and-shadow-native",
    ban: "double-separation",
    kind: "universal",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    // Flutter: a decoration with a border and a shadow at rest, a Card or Material with a side and an elevation.
    // SwiftUI and Compose: .shadow and a stroke or border in one modifier chain; Compose: a Card or Surface given both.
    // The chain's line is read 2 000 characters each way, like NOT_COMMENT's.
    pattern: String.raw`(?:\bBoxDecoration\((?=${ARG}*?\bborder\s*:${AT_REST}${ONE_SIDE})(?=${ARG}*?\bboxShadow\s*:${AT_REST}(?!\s*(?:const\s*)?\[\s*\]))` + String.raw`|\b(?:ShapeDecoration|Card|Material)\((?=${ARG}*?\bshape\s*:\s*(?:const\s+)?\w+\(${ARG}*?\bside\s*:(?!\s*BorderSide\.none\b)${AT_REST})` + String.raw`(?=${ARG}*?\b(?:shadows\s*:${AT_REST}(?!\s*(?:const\s*)?\[\s*\])|elevation\s*:\s*(?!0(?:\.0+)?(?![\d.]))\d))` + String.raw`|\b(?:Card|ElevatedCard|OutlinedCard|Surface)\((?=${ARG}*?\bborder\s*=(?!\s*null\b))(?=${ARG}*?\b(?:elevation|shadowElevation)\s*=(?![^,()]*\(?[^,()]*(?<![\d.])0(?:\.0+)?\.dp))` + String.raw`|\.shadow\((?!\s*(?:(?:radius|elevation)\s*[:=]\s*)?0(?:\.0+)?(?:\.dp)?\s*[,)]|\s*color\s*:\s*(?:Color)?\.clear\b)(?![^()\n]*(?:\?|\bif\b))` + String.raw`(?:(?<=${STROKE}${CHAIN}{0,10}[^\n]{0,2000})|(?=${CHAIN}{0,10}[^\n]{0,2000}?${STROKE})))${NOT_COMMENT}`,
    message: "Separate the element with one technique, a fill first: drop the border or the shadow (a pressed or selected state may add the second)."
  },
  {
    id: "bounce-easing-native",
    ban: "long-motion",
    kind: "universal",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    // Bounce, elastic and back curves, a bezier that overshoots, and a spring that does: SwiftUI bounce over 0.2, a damping ratio under 0.75.
    pattern: String.raw`(?:\bCurves\.(?:bounce(?:In|Out|InOut)|elastic(?:In|Out|InOut)|ease(?:In|Out|InOut)Back)\b|\bElastic(?:In|Out|InOut)Curve\(` + String.raw`|\b(?:Cubic|CubicBezierEasing)\(\s*[\d.]+f?\s*,\s*${OVERSHOOT}f?\s*,|\b(?:Cubic|CubicBezierEasing)\(\s*[\d.]+f?\s*,\s*-?[\d.]+f?\s*,\s*[\d.]+f?\s*,\s*${OVERSHOOT}f?\s*\)` + String.raw`|\.bouncy\b|\bbounce\s*:\s*(?:0?\.(?:2\d*[1-9]|[3-9])\d*|1(?:\.0+)?)(?![\d.])` + String.raw`|\bdamping(?:Fraction\s*:|Ratio\s*=)\s*0?\.(?:[0-6]\d*|7(?:[0-4]\d*)?)f?(?![\d.])|\bSpring\.DampingRatio(?:Medium|High)Bouncy\b` + String.raw`|\b(?:Overshoot|Bounce|AnticipateOvershoot)Interpolator\()${NOT_COMMENT}`,
    message: "Settle motion without bounce or overshoot: an ease-out curve, or a spring that does not overshoot (bounce 0.2 or less, damping 0.75 or more)."
  },
  {
    id: "fake-content-native",
    ban: "adjective-arguments",
    kind: "universal",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    pattern: String.raw`${PLACEHOLDER_URL}${IN_STR}${NOT_COMMENT}|\blorem ipsum\b${IN_STR}${NOT_COMMENT}${STR_REST}`,
    flags: "i",
    message: "Use the real image or the real text, or leave the slot out; never a placeholder photo or lorem ipsum."
  },
  {
    id: "unverified-claim-native",
    ban: "adjective-arguments",
    kind: "universal",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    pattern: String.raw`(?:${CLAIM})${IN_STR}${NOT_COMMENT}${NOT_LOG}${STR_REST}`,
    flags: "iu",
    message: "Verify the claim against real data or remove it; never invent a number, a date, a rank or a superlative."
  },
  {
    id: "hex-off-system-native",
    ban: "drift",
    kind: "drift",
    exts: NATIVE,
    skip: NATIVE_DRIFT_SKIP,
    // `v` is 0xAARRGGBB or #RRGGBB, which `allowed()` compares with their colours; a colour built from channels never matches one.
    pattern: String.raw`(?<v>(?<=\b(?:Color|UIColor|NSColor)\(\s*(?:hex\s*:\s*)?)0x[\da-fA-F]{6}(?:[\da-fA-F]{2})?(?![\da-fA-F])|(?<=['"])#[\da-fA-F]{6}(?:[\da-fA-F]{2})?(?=['"])` + String.raw`|\b(?:Color|UIColor|NSColor)\(\s*(?:\.\w+\s*,\s*)?(?:red|hue|white)\s*[:=][^()\n]*(?:\([^()\n]*\)[^()\n]*)*\)|\bColor\.(?:from|fromARGB|fromRGBO|rgb|argb)\([^()\n]*\)|#colorLiteral\([^()\n]*\)` + String.raw`|(?<=\bColor\(\s*)[\d.]+f\s*,\s*[\d.]+f\s*,\s*[\d.]+f(?:\s*,\s*[\d.]+f)?(?=\s*\)))${NOT_COMMENT}`,
    allow: "colors",
    message: "Use one of your colour tokens instead of a colour written into the view."
  },
  {
    id: "palette-native",
    ban: "drift",
    kind: "drift",
    exts: NATIVE,
    skip: NATIVE_DRIFT_SKIP,
    // Flutter's Colors.*, SwiftUI's and UIKit's system colours, Compose's Color constants; black, white and clear are not a palette.
    pattern: String.raw`(?<v>(?<=\bColors\.)(?:deepPurple|deepOrange|lightBlue|lightGreen|blueGrey|red|pink|purple|indigo|blue|cyan|teal|green|lime|yellow|amber|orange|brown|grey)(?=(?:Accent)?\b)` + String.raw`|(?<=\bColor\.)(?:${SWIFTUI_HUES}|Red|Green|Blue|Yellow|Cyan|Magenta|Gray|LightGray|DarkGray|RED|GREEN|BLUE|YELLOW|CYAN|MAGENTA|GRAY|LTGRAY|DKGRAY)\b` + String.raw`|(?<=\b(?:UI|NS)Color\.system)(?:Red|Orange|Yellow|Green|Mint|Teal|Cyan|Blue|Indigo|Purple|Pink|Brown|Gray\d?)\b|(?<=\b(?:UI|NS)Color\.)(?:lightGray|darkGray|gray|red|green|blue|cyan|yellow|magenta|orange|purple|brown)\b` + String.raw`|(?<=${SWIFT_COLOR_ARG})(?:${SWIFTUI_HUES})\b)${NOT_COMMENT}`,
    allow: "colors",
    message: "Use one of your colour tokens instead of the framework's default palette."
  },
  {
    id: "font-size-native",
    ban: "drift",
    kind: "drift",
    exts: NATIVE,
    skip: NATIVE_DRIFT_SKIP,
    pattern: String.raw`(?<=(?<![\w-])fontSize\s*[:=]\s*|\.system\(\s*size\s*:\s*|\.custom\(\s*"[^"\n]*"\s*,\s*(?:fixedSize|size)\s*:\s*|\bUIFont\.\w*[sS]ystemFont\(\s*ofSize\s*:\s*|\bUIFont\(\s*name\s*:\s*"[^"\n]*"\s*,\s*size\s*:\s*)` + String.raw`(?<v>\d+(?:\.\d+)?)(?:\.sp\b|(?![\w.]))${NOT_COMMENT}`,
    allow: "fontSizes",
    message: "Use a size from your type scale instead of a one-off value."
  },
  {
    id: "radius-native",
    ban: "drift",
    kind: "drift",
    exts: NATIVE,
    skip: NATIVE_DRIFT_SKIP,
    // Up to 99: a pill is pill-control-native's; Compose's RoundedCornerShape(50) is a percentage.
    pattern: String.raw`(?<=\b(?:BorderRadius|Radius)\.circular\(\s*|\.cornerRadius\(\s*|\bcornerRadius\s*:\s*|\b(?:top|bottom)(?:Leading|Trailing)Radius\s*:\s*|\bRoundedCornerShape\(\s*(?:size\s*=\s*)?|\b(?:top|bottom)(?:Start|End)\s*=\s*)` + String.raw`(?!0(?:\.0+)?(?![\d.]))(?<v>\d{1,2}(?:\.\d+)?)(?:\.dp\b|(?<!\bRoundedCornerShape\([^()]*)(?![\d.\w]))${NOT_COMMENT}`,
    allow: "radii",
    message: "Use a radius from your scale instead of a one-off value."
  },
  {
    id: "font-family-native",
    ban: "drift",
    kind: "drift",
    exts: NATIVE,
    skip: NATIVE_DRIFT_SKIP,
    pattern: String.raw`(?<v>(?<=\bfontFamily\s*:\s*['"]\.?|\.custom\(\s*"|\bUIFont\(\s*name\s*:\s*"|\bGoogleFont\(\s*")[^'"\n]+(?=['"])` + String.raw`|(?<=\bGoogleFonts\.)(?!get)[a-z]\w*?(?=(?:TextTheme)?\s*\()|(?<=\bR\.font\.)\w+)${NOT_COMMENT}`,
    allow: "fonts",
    message: "Use one of your font families by its token instead of naming a face in the view."
  },
  {
    id: "purple-native",
    ban: "purple-accent",
    kind: "taste",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    pattern: String.raw`(?<v>(?<=\bColors\.)(?:deepPurple|purple|indigo)(?=(?:Accent)?\b)|(?<=\bColor\.)(?:purple|indigo|Magenta|MAGENTA)\b|(?<=\b(?:UI|NS)Color\.system)(?:Purple|Indigo)\b|(?<=\b(?:UI|NS)Color\.)(?:purple|magenta)\b` + String.raw`|(?<=${SWIFT_COLOR_ARG})(?:purple|indigo)\b|(?<=\b(?:Color|UIColor|NSColor)\(\s*(?:hex\s*:\s*)?)0x(?:[\da-fA-F]{2})?(?:${PURPLES_ANY_CASE})(?![\da-fA-F])` + String.raw`|(?<=['"])#(?:${PURPLES_ANY_CASE})(?:[\da-fA-F]{2})?(?=['"]))${NOT_COMMENT}`,
    allow: "colors",
    message: "Use your accent token; indigo and violet are the generic AI default, not a brand."
  },
  {
    id: "pill-control-native",
    ban: "big-radius",
    kind: "taste",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    // A stadium or capsule, a 100+ / infinite radius or 50% corner on anything not square, a CircleShape on a button, chip or field.
    pattern: String.raw`(?:\bStadiumBorder\(|\b(?:BorderRadius|Radius)\.circular\(\s*${PILL_N}\s*\)(?<!(?=${squareNear("pa")})[^;]{0,200})(?![^;]{0,200}?${squareNear("pb")})` + String.raw`|\bCapsule\((?![^\n]{0,200}?\.frame\(\s*${squareNear("pc")})|\.capsule\b|(?:\.cornerRadius\(|\bcornerRadius\s*:)\s*${PILL_N}` + String.raw`|\bRoundedCornerShape\(\s*(?:percent\s*=\s*)?50\s*\)|\bRoundedCornerShape\(\s*(?:size\s*=\s*)?[1-9]\d{2,}(?:\.\d+)?\.dp\s*\)` + String.raw`|\b(?!Icon|FloatingAction|SmallFloatingAction|LargeFloatingAction)\w*(?:Button|Chip|TextField|SearchBar)\((?!${ARG}*?\.size\(\s*[\d.]+\.dp\s*\))${ARG}*?\bshape\s*=\s*CircleShape\b)${NOT_COMMENT}`,
    message: "Give a rounded control a radius of half its height in px (36 \u2192 18, 44 \u2192 22), so the list it opens can take the same number; never a stadium, a capsule or 999."
  },
  {
    id: "gradient-native",
    ban: "gradients",
    kind: "taste",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    // A linear fade to transparent is a scrim or a scroll edge; radial, sweep and angular ones are halos and spotlights.
    pattern: String.raw`(?:(?:\b(?:LinearGradient|Brush\.(?:linear|horizontal|vertical)Gradient)|\.linearGradient)\((?!${within(CLEAR)})` + String.raw`|(?:\b(?:RadialGradient|SweepGradient|AngularGradient|EllipticalGradient|MeshGradient|GradientDrawable|Brush\.(?:radial|sweep)Gradient)|\.(?:radial|angular|elliptical)Gradient)\(` + String.raw`|(?<=(?:\bColor|\(\s*)\.\w{1,24})\.gradient\b)${NOT_COMMENT}`,
    message: "Fill with a flat colour from your tokens; a gradient on a card, a button or text is decoration."
  },
  {
    id: "spinner-page-native",
    ban: "toast-spam",
    kind: "taste",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    // A spinner that is the screen's content: the child of a Center, a ProgressView filling the view or labelled, one in a full-size Box.
    pattern: String.raw`(?:\bCenter\(${ARG}*?\bchild\s*:${ARG}*?\b(?:CircularProgressIndicator(?:\.adaptive)?|CupertinoActivityIndicator)\(` + String.raw`|\bProgressView\(\s*(?:"[^"\n]*"\s*)?\)(?=\s*\.(?:frame\(\s*maxWidth\s*:\s*\.infinity\s*,\s*maxHeight\s*:\s*\.infinity|controlSize\(\s*\.(?:large|extraLarge)|scaleEffect\())|\bProgressView\(\s*"[^"\n]*"\s*\)` + String.raw`|(?<=\bfillMaxSize\(\)[^{}]{0,300}\{\s*)CircularProgressIndicator\()${NOT_COMMENT}`,
    message: "Show a skeleton shaped like the content while the screen loads; keep spinners for buttons and pull-to-refresh."
  },
  {
    id: "hype-copy-native",
    ban: "marketing-copy",
    kind: "taste",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    pattern: String.raw`\b(?:${HYPE})\b${IN_STR}${NOT_COMMENT}${NOT_LOG}|(?<=['"]\s*)(?:welcome back|unlock)\b${IN_STR}${NOT_COMMENT}${NOT_LOG}`,
    flags: "i",
    message: "Replace the hype word with the plain fact: what it does, with a number."
  },
  {
    id: "uppercase-label-native",
    ban: "uppercase-headings",
    kind: "taste",
    exts: NATIVE,
    skip: NATIVE_SKIP,
    // Capitals tracked 0.5 and wider (U6): Flutter's toUpperCase() or a capitals literal with letterSpacing, Compose's
    // uppercase() with letterSpacing, SwiftUI's textCase(.uppercase) with tracking or kerning in the same chain.
    pattern: String.raw`(?:(?:\.toUpperCase\(\)|\.uppercase\(\)|\bText\(\s*(?:text\s*=\s*)?['"](?=[^'"\n]*[A-Z]{3})[A-Z\d .,&:/-]{3,40}['"])(?=[^;]{0,300}?\bletterSpacing\s*[:=]\s*${WIDE_PT}(?:\.sp)?(?![\d.]))` + String.raw`|\.textCase\(\s*\.uppercase\s*\)(?:(?=${CHAIN}{0,4}[^\n]{0,2000}?\.(?:tracking|kerning)\(\s*${WIDE_PT}(?![\d.]))|(?<=\.(?:tracking|kerning)\(\s*${WIDE_PT}\s*\)${CHAIN}{0,4}[^\n]{0,2000})))${NOT_COMMENT}`,
    message: "Set labels and badges in sentence case in the body family, without wide tracking."
  },
  {
    id: "mobile-autofocus-native",
    ban: "weak-input",
    kind: "taste",
    exts: [".dart"],
    skip: NATIVE_SKIP,
    // Flutter's `autofocus: true` on a field; one near a search field or hint is a search screen focusing its own field.
    pattern: String.raw`(?<![Ss]earch[^;]{0,300})(?<![\w])autofocus\s*:\s*true\b(?![^;]{0,300}[Ss]earch)${NOT_COMMENT}`,
    message: "Let the person tap the field: a field focused on arrival throws a keyboard over half the screen before they have read it."
  },
  // ── taste v5: justified text has its own rule above; stuck text areas, fonts, grids, will-change, consent, urgency
  {
    id: "stuck-textarea",
    ban: "stuck-textarea",
    kind: "taste",
    exts: ALL,
    // Resizing off on a fixed height: in a text area's class string, or in a rule that names a textarea. A field that
    // sizes itself to its content (field-sizing) or only has a minimum height can still grow.
    pattern: String.raw`(?<=<textarea\b${ATTRS})${AT}resize-none${END}(?=${SAME}${FIXED_H}|(?<=${FIXED_H}${SAME}resize-none))(?!${SAME}field-sizing-content)(?<!field-sizing-content${SAME})` + String.raw`|(?<![-\w])(?=resize\s*:)(?<=(?:^|[{};])${SEL}?textarea${SEL}\{${BLOCK})resize\s*:\s*none\b(?=${BLOCK}(?<![-\w])height\s*:\s*\d|(?<=(?<![-\w])height\s*:\s*\d${BLOCK}))(?!${BLOCK}field-sizing)(?<!field-sizing${BLOCK})`,
    flags: "i",
    message: "Let the text area grow with what is typed, or resize vertically from a minimum height; a fixed box with resizing off hides the person's own words."
  },
  {
    id: "font-import",
    ban: "type-faults",
    kind: "taste",
    exts: ALL,
    // A stylesheet @imported from another origin at run time, which in practice is a font's (rsms.me/inter, a font
    // service's css); the hosts vendor-asset knows are reported there. A bundled package or a local file is inlined.
    pattern: String.raw`@import\s+(?:url\(\s*)?[${Q}]?(?:https?:)?\/\/[^\s${Q})]+${NOT_COMMENT}`,
    flags: "i",
    message: "Self-host the font as woff2 with @font-face and preload what the first screen needs; an @import makes the browser wait for one stylesheet before it can find the next."
  },
  {
    id: "auto-fill-grid",
    ban: "grid-hole",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`(?<![-\w])repeat\(\s*auto-fill(?![\w-])`,
    message: "Use auto-fit for a card grid, so the cards stretch across the row instead of leaving empty phantom tracks at its end."
  },
  {
    id: "will-change-all",
    ban: "long-motion",
    kind: "taste",
    exts: ALL,
    pattern: String.raw`(?:(?<![-\w])will-change\s*:\s*|(?<![\w$])willChange\s*:\s*[${Q}])all(?![\w-])|${AT}will-change-\[all\]${END}`,
    message: "Name only what moves (transform, opacity, filter) in will-change, and only while the animation runs."
  },
  {
    id: "pre-checked-consent",
    ban: "dark-pattern",
    kind: "universal",
    exts: CODE,
    skip: TEST_SKIP,
    // A box for a newsletter, marketing, a subscription or the terms that starts ticked: a checked or defaultChecked
    // attribute with the consent words in its tag or its label, or the state behind it initialised to true.
    pattern: String.raw`(?<![\w-])(?:defaultChecked|checked)(?<=<(?:input|[\w.]*Checkbox|[\w.]*Switch|Toggle)\b${ATTRS}(?:defaultChecked|checked))(?=\s*=\s*\{\s*true\s*\}|\s*=\s*[${Q}](?:true|checked)?[${Q}]|[\s\/>])(?:(?<=${CONSENT}${NEAR_BACK}(?:defaultChecked|checked))|(?=${NEAR_AHEAD}${CONSENT}))` + String.raw`|(?<![\w$.])(?:const|let|var)\s+\[\s*${CONSENT_ID}\s*,[^\]\n]{0,60}\]\s*=\s*(?:React\.)?useState(?:<[^>()\n]{0,20}>)?\(\s*true\s*\)` + String.raw`|(?<![\w$.])${CONSENT_ID}\s*=\s*(?:ref|useState|signal|createSignal|writable|\$state)(?:<[^>()\n]{0,20}>)?\(\s*true\s*\)` + String.raw`|(?<![\w$.])let\s+${CONSENT_ID}\s*=\s*true\b` + String.raw`|(?<![\w$.])${CONSENT_ID}\s*:\s*true\b(?<=\bdefault\w*\s*[:=]\s*\{[^{}]{0,400})`,
    flags: "i",
    message: "Leave the box empty until the person ticks it; consent to marketing, a subscription or the terms given in advance is not consent."
  },
  {
    id: "chat-leftover",
    ban: "performed-copy",
    kind: "taste",
    exts: CODE,
    pattern: String.raw`(?:\bI hope this helps\b|\bLet me know if\b|\bFeel free to (?:ask|reach out|let me know)\b|\bI(?:'|’)d be happy to\b|\bGreat question\b|\bAs an AI\b` + String.raw`|(?<=(?:>|[${Q}])\s*)Here(?:'|’)s (?:a|an|the|your|what|how|some)\b)${IN_TEXT}${NOT_COMMENT}${NOT_LOG}`,
    flags: "i",
    message: "Write the interface as the interface, a label or a plain statement; a chat assistant's turn of phrase does not belong on a screen."
  },
  {
    id: "fake-urgency",
    ban: "dark-pattern",
    kind: "universal",
    exts: CODE,
    skip: TEST_SKIP,
    // A viewer count or a stock level drawn at random, one typed into the copy as a fixed number, and an offer's
    // deadline counted from the moment the page loads, which resets on every visit.
    pattern: String.raw`\bMath\.random\(\)(?:(?<=${SCARCE}[^\n]{0,120}Math\.random\(\))|(?=[^\n]{0,120}${SCARCE}))` + String.raw`|\bonly \d+ (?:left|remaining|(?:spots?|seats?|rooms?|items?|tickets?) left|in stock)\b${IN_TEXT}` + String.raw`|\b\d+ (?:people|others|shoppers|customers|users) (?:are )?(?:viewing|looking at|watching)\b${IN_TEXT}` + String.raw`|(?<![\w$.])\w*(?:offer|deal|sale|promo|discount|flash)\w*\s*[:=]\s*(?:new\s+Date\(\s*)?Date\.now\(\)\s*\+`,
    flags: "i",
    message: "Show a deadline or a stock level only from real data; a number drawn at random or typed in, or a timer that restarts on every visit, is invented pressure."
  },
  // ── opposite insets. The regex finds a pair of opposite paddings in one rule or one class string; `allowed()`
  // does the arithmetic (the icon side 2px tighter, a text container's bottom one step larger, a 0 is no inset).
  {
    id: "uneven-padding",
    ban: "uneven-padding",
    kind: "taste",
    exts: ALL,
    skip: ATMOSPHERE,
    pattern: [twPair("l", "r"), twPair("r", "l"), twPair("t", "b"), twPair("b", "t")].join("|") + "|" + [cssPair("left", "right"), cssPair("right", "left"), cssPair("top", "bottom"), cssPair("bottom", "top")].join("|") + String.raw`|(?<![-\w])padding(?:-inline|-block)?\s*:${INSET_EXEMPT}\s*${PAD}\s+${PAD}(?:\s+${PAD}){0,2}\s*(?=[;}!]|$)`,
    flags: "m",
    allow: "insets",
    message: "Make opposite insets equal (the icon side may be 2px tighter, a text block's bottom one step larger); pick the step of your spacing scale that both sides share."
  }
];
var lookbehind;
var LOOKBEHIND_DETECTORS = () => lookbehind ??= new Set(DETECTORS.filter((d) => [IN_STR, IN_TEXT].some((p4) => d.pattern.includes(p4))).map((d) => d.id));
var LONG_LINE = 2e3;
var gateKeys = (source, text) => {
  const keys = /* @__PURE__ */ new Set();
  let any = false;
  for (const m of text.matchAll(new RegExp(source, "g"))) {
    any = true;
    if (m.groups?.k !== void 0) keys.add(m.groups.k);
  }
  return { keyed: source.includes("(?<k>"), keys, any };
};
var gated = (k4, unless, needs) => !!unless && (unless.keyed ? k4 !== void 0 && unless.keys.has(k4) : unless.any) || !!needs && (needs.keyed ? k4 !== void 0 && !needs.keys.has(k4) : !needs.any);
var longestLine = (text, starts) => {
  let longest = 0;
  for (let i = 0; i < starts.length; i++) longest = Math.max(longest, (i + 1 < starts.length ? starts[i + 1] - 1 : text.length) - starts[i]);
  return longest;
};
var GENERIC_FAMILY = /^(?:sans-serif|serif|monospace|cursive|fantasy|system-ui|ui-[\w-]+|-apple-system|BlinkMacSystemFont|emoji|math|fangsong|inherit|initial|unset|revert|var\(|theme\(|--)/i;
var family = (f3) => f3.trim().replace(/^["'`]|["'`]$/g, "").replace(/_/g, " ").replace(/[-\s]*\d{3}(?=\w*$)/, "").replace(/[-\s]*(?:(?:extra|semi|ultra)?(?:thin|light|regular|medium|bold|black)|italic|variable)+$/i, "").replace(/[\s-]+/g, "").toLowerCase();
var SCALE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160];
var px = (v) => v === "px" ? 1 : v.startsWith("[") ? parseFloat(toPx(v.slice(1, -1))) : /^\d+(?:\.5)?$/.test(v) ? parseFloat(v) * 4 : parseFloat(toPx(v));
function insetsAgree(match) {
  const pairs = [];
  const tw = [...match.matchAll(/(?<![\w:-])p([lrtb])-(\d+(?:\.5)?|px|\[[^\]\s]+\])/g)];
  const long = [...match.matchAll(/(?<![-\w])padding-(left|right|top|bottom)\s*:\s*([\d.]+(?:px|r?em)?)/gi)];
  const short = /(?<![-\w])padding(-inline|-block)?\s*:\s*([^;}!\n]+)/i.exec(match);
  const side = (list) => {
    const first = list[0];
    const opposite = { l: "r", r: "l", t: "b", b: "t", left: "right", right: "left", top: "bottom", bottom: "top" }[first[1].toLowerCase()];
    const other = [...list].reverse().find((m) => m[1].toLowerCase() === opposite);
    if (!other) return;
    const start = /^(?:l|left|t|top)$/i.test(first[1]);
    const [a, b] = start ? [first, other] : [other, first];
    pairs.push([/^(?:l|r|left|right)$/i.test(first[1]) ? "x" : "y", px(a[2]), px(b[2])]);
  };
  if (tw.length >= 2) side(tw);
  else if (long.length >= 2) side(long);
  else if (short) {
    const v = short[2].trim().split(/\s+/).map(px);
    if (short[1]) pairs.push([short[1] === "-inline" ? "x" : "y", v[0], v[1]]);
    else {
      pairs.push(["y", v[0], v[2] ?? v[0]]);
      if (v.length === 4) pairs.push(["x", v[3], v[1]]);
    }
  }
  return pairs.every(([axis, a, b]) => {
    if (!a || !b || Math.abs(a - b) <= 2) return true;
    if (axis === "x") return Math.max(a, b) >= 28 && Math.max(a, b) >= 2 * Math.min(a, b);
    return b < a || b <= (SCALE.find((s) => s > a) ?? a * 1.5);
  });
}
function allowed(d, value, system2, file) {
  if (d.allow === "components") {
    const names = value === "input" ? ["input", "textfield", "textinput"] : [value];
    const own = system2.components.filter((c2) => names.includes(c2.name.toLowerCase()));
    return !own.length || own.some((c2) => {
      const p4 = c2.importPath.replace(/^(?:@|~|#|@@|\$lib)\//, "");
      const dir2 = /^@[\w.-]+\/[\w.-]+$/.test(p4) ? `${p4.split("/")[1]}/` : p4.slice(p4.startsWith("@") ? p4.indexOf("/") + 1 : 0, p4.lastIndexOf("/") + 1);
      return dir2 !== "" && `/${file}`.includes(`/${dir2}`);
    });
  }
  if (d.allow === "colors") {
    const v = value.replace(/^0x(?:[\da-f]{2}(?=[\da-f]{6}$))?/i, "#");
    const declared = v.startsWith("#") ? system2.colors.includes(hex6(v)) : v in system2.colorTokens || v.replace(/-\d+$/, "") in system2.colorTokens;
    return declared || d.kind === "drift" && !system2.colors.length && !Object.keys(system2.colorTokens).length;
  }
  if (d.allow === "fonts") {
    const first = value.split(",")[0].trim().replace(/^family-name:/, "");
    if (!first || GENERIC_FAMILY.test(first.replace(/^["'`]/, ""))) return true;
    return system2.fonts.some((f3) => family(f3) === family(first)) || d.kind === "drift" && !system2.fonts.length;
  }
  if (d.allow === "insets") return insetsAgree(value);
  const list = d.allow === "radii" ? system2.radii : d.allow === "spacing" ? system2.spacing ?? [] : system2.fontSizes;
  return list.length ? list.includes(toPx(value)) : d.kind === "drift";
}
function detect(files, system2) {
  const muted = mutedFor(system2);
  const off = mutedBy(muted);
  const active = DETECTORS.filter((d) => !off({ ban: d.ban, detector: d.id })).map((d) => ({ d, re: new RegExp(d.pattern, `${d.flags ?? ""}g`), skip: d.skip ? new RegExp(d.skip, "i") : void 0 }));
  const findings2 = [];
  let scanned = 0;
  for (const { path, text } of files) {
    const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
    const starts = [0];
    for (let i = text.indexOf("\n"); i !== -1; i = text.indexOf("\n", i + 1)) starts.push(i + 1);
    if (text) scanned += starts.length;
    const long = longestLine(text, starts) > LONG_LINE;
    const seen = /* @__PURE__ */ new Set();
    for (const { d, re, skip } of active) {
      if (!d.exts.includes(ext) || skip?.test(path) || long && LOOKBEHIND_DETECTORS().has(d.id)) continue;
      const unless = d.unless ? gateKeys(d.unless, text) : void 0;
      const needs = d.needs ? gateKeys(d.needs, text) : void 0;
      if (unless && !unless.keyed && unless.any || needs && !needs.keyed && !needs.any) continue;
      for (const m of text.matchAll(re)) {
        if (seen.has(m.index) || gated(m.groups?.k, unless, needs) || d.allow && allowed(d, m.groups?.v ?? m[0], system2, path)) continue;
        seen.add(m.index);
        const at = m.index + Math.max(m[0].length - 1, 0);
        let lo = 0;
        for (let hi = starts.length - 1; lo < hi; ) {
          const mid = lo + hi + 1 >> 1;
          if (starts[mid] <= at) lo = mid;
          else hi = mid - 1;
        }
        const end = text.indexOf("\n", starts[lo]);
        const excerpt = text.slice(starts[lo], end === -1 ? void 0 : end).trim().slice(0, 160);
        findings2.push({ detector: d.id, ban: d.ban, kind: d.kind, file: path, line: lo + 1, excerpt, message: d.message });
      }
    }
  }
  findings2.push(...projectFindings(files, system2).filter((f3) => !off(f3)));
  return { findings: findings2, muted, scanned, score: scoreOf(findings2, scanned) };
}
var PROJECT_RULES = {
  "no-not-found": { ban: "dead-ends", kind: "universal", message: "Add a not-found page in your own look, with a way back: a mistyped or old address now lands on a blank screen or the host's default." },
  "default-head": { ban: "bare-share", kind: "universal", message: "Name the page yourself: a missing title or the framework's own title and icon is what a shared link and a browser tab show." },
  "bare-share": { ban: "bare-share", kind: "taste", message: "Give the page what its share card and its search result are drawn from: a description, a preview image, a canonical address and your icon." },
  "duplicate-title": { ban: "bare-share", kind: "taste", message: "Give each page its own title; two pages under one name look like one page in a tab, a history list and a search result." },
  "icon-families": { ban: "icon-restyle", kind: "taste", message: "Draw every icon from one family: swap these for the glyphs of the family the rest of the product uses." }
};
var lineAt = (text, index) => {
  const line = text.slice(0, index).split("\n").length;
  const start = text.lastIndexOf("\n", index - 1) + 1;
  const end = text.indexOf("\n", index);
  return { line, excerpt: text.slice(start, end === -1 ? void 0 : end).trim().slice(0, 160) };
};
function iconFamily(spec, clause) {
  const SETS = { fa: "Font Awesome", fa6: "Font Awesome", md: "Material", hi: "Heroicons", hi2: "Heroicons", lu: "Lucide", tb: "Tabler", pi: "Phosphor", fi: "Feather", io: "Ionicons", io5: "Ionicons", bi: "Boxicons", ri: "Remix", ai: "Ant Design", bs: "Bootstrap", fontawesome: "Font Awesome", fontawesome5: "Font Awesome", fontawesome6: "Font Awesome", materialicons: "Material", materialcommunityicons: "Material", ionicons: "Ionicons", feather: "Feather", antdesign: "Ant Design" };
  const set = (name) => SETS[name.toLowerCase()] ?? name;
  if (/^(?:simple-icons|react-icons\/si|@fortawesome\/free-brands)/.test(spec)) return [];
  if (/^(?:lucide-(?:react|vue-next|svelte|react-native|angular)|@lucide\/[\w-]+)$/.test(spec)) return ["Lucide"];
  if (/^@heroicons\//.test(spec)) return ["Heroicons"];
  if (/^(?:@phosphor-icons\/|phosphor-(?:react|vue|svelte))/.test(spec)) return ["Phosphor"];
  if (/^@tabler\/icons/.test(spec)) return ["Tabler"];
  if (spec === "@radix-ui/react-icons") return ["Radix"];
  if (/^(?:@mui\/icons-material|@material-symbols\/|@material-design-icons\/)/.test(spec)) return ["Material"];
  if (/^(?:react-feather|feather-icons)$/.test(spec)) return ["Feather"];
  if (spec === "iconoir-react") return ["Iconoir"];
  if (/^@fortawesome\//.test(spec)) return ["Font Awesome"];
  if (/^@hugeicons\//.test(spec)) return ["Hugeicons"];
  const sub = /^(?:react-icons|react-native-vector-icons)\/(\w+)$/.exec(spec);
  if (sub) return [set(sub[1])];
  if (spec === "@expo/vector-icons" || spec === "@expo/vector-icons/") return [...new Set([...clause.matchAll(/\b([A-Z]\w+)/g)].map((m) => set(m[1])))];
  return [];
}
function projectFindings(files, system2) {
  const skip = new RegExp(String.raw`${TEST_SKIP}|(?:^|\/)(?:node_modules|dist|build|out|\.next|coverage)\/`, "i");
  const own = files.filter((f3) => !skip.test(f3.path));
  if (own.length < 2) return [];
  const out = [];
  const add = (id, file, index, note) => {
    const r2 = PROJECT_RULES[id];
    out.push({ detector: id, ban: r2.ban, kind: r2.kind, file: file.path, ...lineAt(file.text, Math.max(index, 0)), message: note ? `${r2.message} (${note})` : r2.message });
  };
  const find = (re) => own.filter((f3) => re.test(f3.path)).sort((a, b) => a.path.length - b.path.length)[0];
  const phone = system2.productType === "mobile-app";
  if (!phone) {
    const nextApp = find(/(?:^|\/)app\/layout\.(?:tsx|jsx|js|ts)$/) && find(/(?:^|\/)app\/(?:.*\/)?page\.(?:tsx|jsx|js|ts)$/) ? find(/(?:^|\/)app\/layout\.(?:tsx|jsx|js|ts)$/) : void 0;
    const nextPages = find(/(?:^|\/)pages\/_app\.(?:tsx|jsx|js|ts)$/);
    const kit = find(/(?:^|\/)src\/routes\/(?:.*\/)?\+page\.svelte$/);
    const astro = find(/(?:^|\/)src\/pages\/(?:.*\/)?[^/]+\.astro$/);
    const nuxt = own.some((f3) => /<NuxtPage\b|<NuxtLayout\b|\bdefinePageMeta\(/.test(f3.text)) ? find(/(?:^|\/)pages\/(?:.*\/)?[^/]+\.vue$/) : void 0;
    const framework = nextApp ?? nextPages ?? kit ?? astro ?? nuxt;
    if (framework) {
      const handled = nextApp || nextPages ? find(/(?:^|\/)(?:app\/not-found|pages\/(?:404|_error))\.(?:tsx|jsx|js|ts)$/) : kit ? find(/(?:^|\/)\+error\.svelte$/) : astro ? find(/(?:^|\/)src\/pages\/404\.(?:astro|html)$/) : find(/(?:^|\/)error\.vue$/);
      if (!handled) add("no-not-found", framework, 0);
    } else {
      const ROUTER = /from\s*["'](?:react-router(?:-dom)?|vue-router|@tanstack\/(?:react|vue|solid)-router)["']/;
      const CREATE = /create(?:Browser|Hash|Memory)Router\(|<(?:Browser|Hash)Router\b|<Routes\b|\buseRoutes\(|\bcreateRouter\(|\bcreateRootRoute\(/;
      const router = own.find((f3) => ROUTER.test(f3.text) && CREATE.test(f3.text));
      const CATCH = /\bpath\s*[:=]\s*\{?\s*["'`][^"'`\n]*\*["'`]|:pathMatch|:catchAll|\(\.\*\)\*|\berrorElement\b|\bErrorBoundary\b|[nN]otFoundComponent|\bNotFoundRoute\b/;
      if (router && !own.some((f3) => CATCH.test(f3.text))) add("no-not-found", router, router.text.search(CREATE));
      if (!router && !own.some((f3) => /(?:^|\/)_?(?:layouts|includes)\//.test(f3.path))) {
        const pages = own.filter((f3) => f3.path.endsWith(".html") && /<(?:html|body)\b/i.test(f3.text));
        const index = pages.find((f3) => /(?:^|\/)index\.html$/.test(f3.path));
        if (pages.length >= 2 && index && !pages.some((f3) => /(?:^|\/)404\.html$/.test(f3.path))) add("no-not-found", index, 0);
      }
    }
  }
  if (!phone) {
    const titles = /* @__PURE__ */ new Map();
    for (const f3 of own.filter((x) => /\.(?:html|astro)$/.test(x.path) && !/(?:^|\/)e?mails?\//i.test(x.path))) {
      const at = f3.text.search(/<head\b/i);
      if (at === -1) continue;
      const close = f3.text.indexOf("</head", at);
      const head = f3.text.slice(at, close === -1 ? void 0 : close);
      const title = /<title\b[^>]{0,2000}>([\s\S]{0,2000}?)<\/title>/i.exec(head);
      const name = title?.[1]?.replace(/\s+/g, " ").trim() ?? "";
      const has = (re) => re.test(head);
      const icon = /<link\b[^>]{0,2000}\brel\s*=\s*["'][^"']*\b(?:icon|apple-touch-icon)\b[^"']*["'][^>]{0,2000}>/i.exec(head);
      const stock = [
        !name ? "no title" : /^(?:Vite \+ .+|Vite App|React App|Create Next App|Document|Untitled(?: document)?|SvelteKit app|Svelte app|Welcome to Astro|Nuxt(?: App)?)$/i.test(name) ? `the title "${name}"` : "",
        icon && /\/(?:vite|react|next|svelte|nuxt|vercel)(?:-logo)?\.svg["']/i.test(icon[0]) ? "the framework's own icon" : ""
      ].filter(Boolean);
      if (stock.length) add("default-head", f3, at + (title && name ? head.indexOf(title[0]) : 0), stock.join(", "));
      const full = system2.productType !== "web-app" && !/(?:^|\/)404\.(?:html|astro)$/.test(f3.path);
      const missing = [
        full && !has(/<meta\b[^>]{0,2000}\bname\s*=\s*["']description["']/i) ? "description" : "",
        full && !has(/<meta\b[^>]{0,2000}\b(?:property|name)\s*=\s*["'](?:og:image|twitter:image)["']/i) ? "preview image" : "",
        full && !has(/<link\b[^>]{0,2000}\brel\s*=\s*["']canonical["']/i) ? "canonical address" : "",
        !icon ? "icon" : ""
      ].filter(Boolean);
      if (missing.length) add("bare-share", f3, at, `no ${missing.join(", no ")}`);
      if (name && !/[{}]/.test(name)) titles.set(name, [...titles.get(name) ?? [], { ...f3, index: at + head.indexOf(title[0]) }]);
    }
    for (const [name, pages] of titles) for (const p4 of pages.slice(1)) add("duplicate-title", p4, p4.index, `"${name}" is also ${pages[0].path}`);
    for (const f3 of own.filter((x) => /(?:^|\/)app\/(?:.*\/)?layout\.(?:tsx|jsx|js|ts)$/.test(x.path))) {
      const stock = /\b(?:title\s*:\s*["'`]Create Next App["'`]|description\s*:\s*["'`]Generated by create next app["'`])/.exec(f3.text);
      if (stock) add("default-head", f3, stock.index, "create-next-app's metadata");
    }
    const root2 = own.filter((x) => /(?:^|\/)app\/layout\.(?:tsx|jsx|js|ts)$/.test(x.path)).sort((a, b) => a.path.length - b.path.length)[0];
    if (root2 && system2.productType === "website") {
      const meta = /export\s+(?:const\s+metadata\b|(?:async\s+)?function\s+generateMetadata\b)/.exec(root2.text);
      const missing = meta ? [!/\btitle\s*:/.test(root2.text) && "title", !/\bdescription\s*:/.test(root2.text) && "description"].filter(Boolean) : ["title", "description"];
      if (missing.length) add("bare-share", root2, meta?.index ?? 0, `no ${missing.join(", no ")} in the root layout's metadata`);
    }
  }
  const families = /* @__PURE__ */ new Map();
  for (const f3 of own.filter((x) => CODE.includes(x.path.slice(x.path.lastIndexOf(".")).toLowerCase()))) {
    for (const m of f3.text.matchAll(/\bimport\s+([^;]{0,400}?)\s*from\s*["']([^"'\n]+)["']|\brequire\(\s*["']([^"'\n]+)["']\s*\)/g)) {
      for (const fam of iconFamily(m[2] ?? m[3], m[1] ?? "")) {
        const hit = families.get(fam) ?? { files: /* @__PURE__ */ new Set(), first: { ...f3, index: m.index } };
        hit.files.add(f3.path);
        families.set(fam, hit);
      }
    }
  }
  if (families.size > 1) {
    const [major, ...rest] = [...families].sort((a, b) => b[1].files.size - a[1].files.size);
    for (const [fam, hit] of rest) add("icon-families", hit.first, hit.first.index, `${fam} in ${hit.files.size} file${hit.files.size === 1 ? "" : "s"}, beside ${major[0]} in ${major[1].files.size}`);
  }
  return out;
}

// src/derive.ts
import { posix } from "node:path";
var TAILWIND_CONFIG = /(^|\/)tailwind\.config\.[cm]?[jt]s$/;
var THEME_FILE = /(^|\/)(?:theme|tokens?|design-tokens|colou?rs|palette|variables)[\w.-]*\.(?:[cm]?[jt]s|json)$|(^|\/)(?:theme|tokens)\/[^/]+\.(?:[cm]?[jt]s|json)$/i;
var TW_TEXT = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, "4xl": 36, "5xl": 48, "6xl": 60, "7xl": 72, "8xl": 96, "9xl": 128 };
var TW_RADIUS = { sm: 2, "": 4, md: 6, lg: 8, xl: 12, "2xl": 16, "3xl": 24 };
var TW_SPACE_STEPS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
var SPACE_NAME = /^(?:--|\$)(?:[a-z\d]+-)*?(?:space|spacing|gap|gutter)(?:$|[-_])/i;
var NOT_SPACE = /(?:^|[-$])(?:letter|line|word)-|-reverse$/i;
var UI_LIB = /^(?:@mui\/(?:material|joy)|@chakra-ui\/react|antd|@mantine\/core|@radix-ui\/themes|react-bootstrap|@nextui-org\/react|@heroui\/react|react-native-paper|tamagui|@carbon\/react|@fluentui\/react-components|@adobe\/react-spectrum|@shopify\/polaris|@geist-ui\/core|primereact\/[\w-]+|vuetify\/components|@ionic\/react|@ark-ui\/react)$/;
var COMPONENT_MODULE = /(^|\/)(?:components?|ui|design-system|ds|primitives|widgets)(?:\/|$)/;
var IMPORT = /import\s+(?!type\b)(?:([\w$]+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*["']([^"']+)["']/g;
var FRAMEWORKS = [["next", "Next.js"], ["nuxt", "Nuxt"], ["@sveltejs/kit", "SvelteKit"], ["astro", "Astro"], ["@remix-run/react", "Remix"], ["expo", "Expo"], ["react-native", "React Native"], ["@angular/core", "Angular"], ["vue", "Vue"], ["svelte", "Svelte"], ["solid-js", "Solid"], ["react", "React"]];
var GENERIC_FONT = /^(?:sans-serif|serif|monospace|cursive|system-ui|ui-\w+|inherit|initial|unset|-apple-system|BlinkMacSystemFont|Segoe UI|Helvetica(?: Neue)?|Arial|Roboto|emoji|var\(.*)$/i;
function toHex(raw) {
  const v = raw.trim().replace(/\s*\/\s*<alpha-value>\s*/, "");
  if (/^#[0-9a-f]{3,8}$/i.test(v)) return hex6(v);
  const css = /^-?\d/.test(v) && v.includes("%") ? `hsl(${v})` : v;
  if (!/^(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb|color)\(/i.test(css)) return void 0;
  try {
    return hex2(lch2(css));
  } catch {
    return void 0;
  }
}
function blocks(text, key) {
  const out = [];
  for (const m of text.matchAll(new RegExp(String.raw`\b${key}\s*:\s*\{`, "g"))) {
    let depth = 1;
    let i = m.index + m[0].length;
    for (; i < text.length && depth; i++) depth += text[i] === "{" ? 1 : text[i] === "}" ? -1 : 0;
    out.push(text.slice(m.index + m[0].length, i - 1));
  }
  return out;
}
function entries(body) {
  const out = [];
  const path = [];
  for (const m of body.matchAll(/(["']?)([\w.-]+)\1\s*:\s*(?:(\{)|\[\s*["'`]([^"'`]*)["'`]|["'`]([^"'`]*)["'`]|(-?\d*\.?\d+)(?![\w.]))|(\})/g)) {
    if (m[7]) path.pop();
    else if (m[3]) path.push(m[2]);
    else {
      const key = [...path, m[2]].filter((k4) => k4 !== "DEFAULT").join("-");
      if (key) out.push([key, m[4] ?? m[5] ?? m[6]]);
    }
  }
  return out;
}
var BLURS_MAX = 20;
function deriveSystem(sources2, configs2, redesign, figma) {
  const declared = [];
  const vars = /* @__PURE__ */ new Map();
  for (const f3 of sources2) {
    if (!/\.(css|scss)$/.test(f3.path)) continue;
    for (const m of f3.text.matchAll(/(--[\w-]+|\$[\w-]+)\s*:\s*([^;{}]+?)\s*(?:!default\s*)?(?=[;}])/g)) {
      declared.push([m[1], m[2]]);
      if (!vars.has(m[1])) vars.set(m[1], m[2]);
    }
  }
  const resolve2 = (value, depth = 0) => depth > 5 ? value : value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g, (all2, name, fallback) => vars.has(name) ? resolve2(vars.get(name), depth + 1) : fallback?.trim() || all2);
  const length = (raw) => {
    const v = resolve2(raw);
    const calc = /calc\(\s*(-?[\d.]+(?:px|r?em))\s*([-+])\s*([\d.]+(?:px|r?em))\s*\)/.exec(v);
    if (calc) {
      const [a, b] = [parseFloat(toPx(calc[1])), parseFloat(toPx(calc[3]))];
      return `${+(calc[2] === "-" ? a - b : a + b).toFixed(2)}px`;
    }
    const times = /calc\(\s*(?:(-?[\d.]+(?:px|r?em))\s*\*\s*([\d.]+)|([\d.]+)\s*\*\s*(-?[\d.]+(?:px|r?em)))\s*\)/.exec(v);
    if (times) return `${+(parseFloat(toPx(times[1] ?? times[4])) * parseFloat(times[2] ?? times[3])).toFixed(2)}px`;
    const m = /(?<![\w.-])(\d*\.?\d+)(px|r?em)\b/.exec(v) ?? /^\s*(\d*\.?\d+)\s*$/.exec(v);
    return m ? toPx(`${m[1]}${m[2] ?? "px"}`) : void 0;
  };
  const colors = /* @__PURE__ */ new Set();
  const colorTokens = {};
  const effects = {};
  const radii = /* @__PURE__ */ new Set();
  const sizes = /* @__PURE__ */ new Set();
  const spacing = /* @__PURE__ */ new Set();
  let twBase;
  let twSpacingReplaced = false;
  const twRadius = {};
  const twText = {};
  const addColour = (key, raw, named2 = false) => {
    const value = resolve2(raw).trim().replace(/\s*\/\s*<alpha-value>\s*/, "");
    const h = toHex(value);
    if (h) colors.add(h);
    if (key && (h || named2 && !/^(?:inherit|current|currentColor|transparent)$/i.test(value))) colorTokens[key] ??= value;
    return h;
  };
  for (const [name, raw] of declared) {
    const value = resolve2(raw).trim();
    if (toHex(value)) {
      addColour(name, raw);
      continue;
    }
    if (/blur|glass|frost|gradient|shadow|elevation/i.test(name) || /blur\(|gradient\(/i.test(value)) effects[name] ??= value;
    const px2 = length(raw);
    if (!px2) continue;
    if (/radius|rounded|corner/i.test(name)) {
      radii.add(px2);
      const v42 = /^--radius-([\w-]+)$/.exec(name);
      if (v42) twRadius[v42[1]] ??= px2;
    } else if (/font-?size|^--fs-|^--text-(?:xs|sm|base|lg|\d*xl)$/i.test(name)) {
      sizes.add(px2);
      const v42 = /^--text-(\w+)$/.exec(name);
      if (v42) twText[v42[1]] ??= px2;
    } else if (SPACE_NAME.test(name) && !NOT_SPACE.test(name)) {
      if (name === "--spacing") twBase ??= px2;
      else spacing.add(px2);
    }
  }
  for (const f3 of configs2.filter((c2) => TAILWIND_CONFIG.test(c2.path))) {
    for (const block of blocks(f3.text, "colors")) for (const [key, raw] of entries(block)) addColour(key, raw, true);
    for (const block of blocks(f3.text, "borderRadius")) {
      for (const [key, raw] of entries(block)) {
        const px2 = length(raw);
        if (!px2) continue;
        radii.add(px2);
        twRadius[key] = px2;
      }
    }
    for (const block of blocks(f3.text, "fontSize")) {
      for (const [key, raw] of entries(block)) {
        const px2 = !/line|letter|weight/i.test(key) && length(raw);
        if (!px2) continue;
        sizes.add(px2);
        twText[key] ??= px2;
      }
    }
    const own = blocks(f3.text, "spacing");
    if (own.length > blocks(f3.text, "extend").flatMap((e4) => blocks(e4, "spacing")).length) twSpacingReplaced = true;
    for (const block of own) for (const [, raw] of entries(block)) {
      const px2 = length(raw);
      if (px2) spacing.add(px2);
    }
    for (const name of ["backdropBlur", "backgroundImage", "boxShadow"]) for (const block of blocks(f3.text, name)) for (const [key, raw] of entries(block)) effects[`${name}.${key}`] ??= raw;
  }
  for (const f3 of [...sources2, ...configs2].filter((s) => THEME_FILE.test(s.path))) {
    for (const [key, raw] of entries(f3.text)) {
      if (addColour(key, raw)) continue;
      const px2 = length(raw);
      if (px2 && /radi|round|corner/i.test(key)) radii.add(px2);
      else if (px2 && /font-?size|text-?size|type-?scale/i.test(key)) sizes.add(px2);
      else if (px2 && /(?:^|[-_.])(?:space|spacing|gaps?|gutter)(?:$|[-_.])/i.test(key) && !/letter|line|word/i.test(key)) spacing.add(px2);
    }
    for (const m of f3.text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) colors.add(hex6(m[0]));
  }
  const deps = /* @__PURE__ */ new Set();
  for (const f3 of configs2.filter((c2) => c2.path.endsWith("package.json"))) {
    try {
      const p4 = JSON.parse(f3.text);
      for (const k4 of [...Object.keys(p4.dependencies ?? {}), ...Object.keys(p4.devDependencies ?? {})]) deps.add(k4);
    } catch {
    }
  }
  const tailwind = deps.has("tailwindcss") || configs2.some((c2) => TAILWIND_CONFIG.test(c2.path));
  const v4 = !!twBase || sources2.some((f3) => /\.(css|scss)$/.test(f3.path) && /@import\s+["']tailwindcss["']|@theme\b/.test(f3.text));
  if (tailwind && !twSpacingReplaced) {
    const unit = twBase ? parseFloat(twBase) : 4;
    const steps = v4 ? [0.5, 1.5, 2.5, 3.5, ...Array.from({ length: 96 }, (_, i) => i + 1)] : TW_SPACE_STEPS;
    for (const n of steps) spacing.add(`${+(n * unit).toFixed(2)}px`);
  } else if (twBase) spacing.add(twBase);
  const used = /* @__PURE__ */ new Map();
  if (tailwind) {
    for (const f3 of sources2) {
      for (const m of f3.text.matchAll(/(?<=[\s"'`:])text-(xs|sm|base|lg|xl|[2-9]xl)(?=[\s"'`;!/]|$)/g)) {
        const px2 = twText[m[1]] ?? `${TW_TEXT[m[1]]}px`;
        used.set(px2, (used.get(px2) ?? 0) + 1);
      }
      for (const m of f3.text.matchAll(/(?<=[\s"'`:])rounded(?:-(?:[trblse]|tl|tr|bl|br|ss|se|es|ee))?(?:-(sm|md|lg|xl|2xl|3xl))?(?=[\s"'`;!]|$)/g)) {
        const key = m[1] ?? "";
        const px2 = twRadius[key] ?? (key in TW_RADIUS ? `${TW_RADIUS[key]}px` : void 0);
        if (px2) radii.add(px2);
      }
    }
  }
  const imports = /* @__PURE__ */ new Map();
  for (const f3 of sources2) {
    if (!/\.(tsx|jsx|ts|js|vue|svelte)$/.test(f3.path)) continue;
    for (const m of f3.text.matchAll(IMPORT)) {
      const spec = m[3];
      const local = spec.startsWith(".") || /^(?:@|~|#|@@|\$lib)\//.test(spec) || /^@[\w.-]+\/[\w.-]+/.test(spec) || spec.startsWith("src/");
      if (!UI_LIB.test(spec) && !(local && COMPONENT_MODULE.test(spec))) continue;
      const path = spec.startsWith(".") ? posix.normalize(posix.join(posix.dirname(f3.path), spec)) : spec;
      const names = [m[1], ...(m[2] ?? "").split(",").map((n) => /^\s*type\s/.test(n) ? "" : n.trim().split(/\s+as\s+/)[0])];
      for (const name of names) {
        if (!name || !/^[A-Z][A-Za-z0-9]+$/.test(name) || /(?:Props|Context|Provider|Type|Config|Variants|Theme)$/.test(name)) continue;
        const byPath = imports.get(name) ?? /* @__PURE__ */ new Map();
        byPath.set(path, (byPath.get(path) ?? 0) + 1);
        imports.set(name, byPath);
      }
    }
  }
  const total = (m) => [...m.values()].reduce((a, b) => a + b, 0);
  const components = [...imports].sort((a, b) => total(b[1]) - total(a[1]) || a[0].localeCompare(b[0])).slice(0, 60).map(([name, byPath]) => ({ name, importPath: [...byPath].sort((a, b) => Number(a[0].startsWith(".")) - Number(b[0].startsWith(".")) || b[1] - a[1])[0][0] }));
  const fonts = /* @__PURE__ */ new Map();
  const addFont = (raw) => {
    const f3 = raw.trim().replace(/^["'`]|["'`]$/g, "").replace(/_/g, " ").trim();
    if (/^[A-Za-z][\w .'-]{1,39}$/.test(f3) && !GENERIC_FONT.test(f3)) fonts.set(f3.toLowerCase(), f3);
  };
  for (const f3 of [...redesign?.repo?.fonts ?? [], ...figma?.fonts ?? []]) if (f3) addFont(f3);
  for (const f3 of sources2) {
    for (const m of f3.text.matchAll(/import\s*\{([^}]{2,200})\}\s*from\s*["']next\/font\/google["']/g)) for (const n of m[1].split(",")) addFont(n.split(/\s+as\s+/)[0]);
    for (const m of f3.text.matchAll(/["']@(?:fontsource(?:-variable)?|expo-google-fonts)\/([\w-]+)/g)) addFont(m[1].replace(/-/g, " ").replace(/\b\w/g, (c2) => c2.toUpperCase()));
    for (const m of f3.text.matchAll(/\blocalFont\s*\([\s\S]{0,800}?["'`]([^"'`\n]+\.(?:woff2?|ttf|otf))["'`]/g))
      addFont(m[1].split("/").pop().replace(/\.\w+$/, "").replace(/(?:[-_ ]?(?:\d{3}|Thin|ExtraLight|Light|Regular|Medium|SemiBold|Bold|ExtraBold|Black|Italic|Variable|VF))+$/i, "").replace(/([a-z])([A-Z])/g, "$1 $2"));
    if (/\.(css|scss)$/.test(f3.path)) for (const m of f3.text.matchAll(/font-family\s*:\s*([^,;}]+)/g)) addFont(m[1]);
  }
  if (figma) {
    for (const c2 of figma.colors.slice(0, 32)) if (/^#[0-9a-f]{3,8}$/i.test(c2)) colors.add(hex6(c2));
    for (const t of figma.found?.tokens ?? []) {
      const n = parseFloat(t.value);
      if (/radi|corner|round/i.test(`${t.group ?? ""} ${t.name}`) && n > 0 && n < 1e3) radii.add(toPx(String(n)));
      else if (/spac|gap|gutter/i.test(`${t.group ?? ""} ${t.name}`) && n > 0 && n < 1e3) spacing.add(toPx(String(n)));
    }
    for (const s of figma.fontSizes) sizes.add(toPx(String(s)));
    const have = new Set(components.map((c2) => c2.name.toLowerCase()));
    for (const raw of figma.components) {
      const name = raw.split(/[/,=]/)[0].trim();
      if (!/^[A-Za-z][\w -]{1,39}$/.test(name) || have.has(name.toLowerCase()) || components.length >= 90) continue;
      have.add(name.toLowerCase());
      components.push({ name, importPath: "" });
    }
  }
  const blurs = /* @__PURE__ */ new Set();
  for (const f3 of sources2) {
    f3.text.split("\n").forEach((line, i) => {
      if (blurs.size >= BLURS_MAX) return;
      const decl = /(?:-webkit-)?backdrop-filter\s*:\s*([^;}{"'`]+)|(?:Webkit|webkit)?[bB]ackdropFilter\s*:\s*["'`]([^"'`]+)/.exec(line);
      const cls = /(?<=[\s"'`:])(?:[\w-]+:)*(backdrop-blur(?:-(?:none|xs|sm|md|lg|xl|2xl|3xl|\[[^\]\s]+\]))?)(?=[\s"'`;!]|$)/.exec(line);
      const value = decl?.[1] ?? decl?.[2];
      const what = value && !/^\s*none\b/.test(value) ? `backdrop-filter: ${value.trim()}` : cls && !cls[1].endsWith("-none") ? cls[1] : "";
      if (what) blurs.add(`${f3.path}:${i + 1} ${what}`.slice(0, 160));
    });
  }
  const framework = FRAMEWORKS.find(([dep]) => deps.has(dep))?.[1];
  const byPx = (a, b) => parseFloat(a) - parseFloat(b);
  return {
    stack: redesign?.repo?.stack || [framework, tailwind ? "Tailwind" : ""].filter(Boolean).join(" + "),
    colors: [...colors],
    colorTokens,
    radii: [...radii].sort(byPx),
    // Most used first (a handoff reads the base size from the first), then the declared rest.
    fontSizes: [.../* @__PURE__ */ new Set([...[...used].sort((a, b) => b[1] - a[1]).map(([px2]) => px2), ...[...sizes].sort(byPx)])],
    fonts: [...fonts.values()].slice(0, 8),
    components,
    effects,
    spacing: [...spacing].sort(byPx),
    ...blurs.size ? { blurs: [...blurs] } : {}
  };
}
var NATIVE_UI = /\.(dart|swift|kt)$/;
var RN_IMPORT = /\bfrom\s+["']react-native["']|require\(\s*["']react-native["']/;
function uiKind(sources2) {
  let native = 0;
  let web = 0;
  for (const s of sources2) {
    if (NATIVE_UI.test(s.path) || RN_IMPORT.test(s.text)) native++;
    else web++;
  }
  return { native, web, mostlyNative: native > web };
}
function withNative(web, native) {
  const union = (a, b = []) => [.../* @__PURE__ */ new Set([...a, ...b])];
  return {
    stack: union(web.stack.split(" + "), native.stack?.split(" + ")).filter(Boolean).join(" + "),
    colors: union(web.colors, native.colors),
    colorTokens: { ...native.colorTokens, ...web.colorTokens },
    radii: union(web.radii, native.radii),
    fontSizes: union(web.fontSizes, native.fontSizes),
    fonts: union(web.fonts, native.fonts),
    components: [...new Map([...native.components ?? [], ...web.components].map((c2) => [c2.name, c2])).values()],
    effects: { ...native.effects, ...web.effects },
    spacing: union(web.spacing ?? [], native.spacing).sort((a, b) => parseFloat(a) - parseFloat(b)),
    ...web.blurs?.length ? { blurs: web.blurs } : {},
    ...web.productType ? { productType: web.productType } : {}
  };
}
var productTypeOf = (draft, system2, sources2 = []) => {
  if (draft.productType) return draft.productType;
  const { native, web, mostlyNative } = uiKind(sources2);
  if (native || web) return mostlyNative ? "mobile-app" : "web-app";
  return /Expo|React Native|Flutter|SwiftUI|UIKit|Compose/.test(system2.stack) ? "mobile-app" : "web-app";
};

// src/derive-native.ts
function deriveNative(files) {
  const all2 = [...new Map(files.map((f3) => [f3.path, f3])).values()];
  const code = all2.filter((f3) => CODE2.test(f3.path));
  const theme = code.filter((f3) => THEME.test(f3.path));
  const assets = colorSets(all2);
  if (!code.length && !assets.size && !all2.some((f3) => PUBSPEC.test(f3.path) || COLORS_XML.test(f3.path))) return {};
  const colors = /* @__PURE__ */ new Set();
  const colorTokens = {};
  const token = (name, hex3) => {
    if (!hex3) return;
    colors.add(hex3);
    if (!PROPERTY.test(name)) colorTokens[name] ??= hex3;
  };
  for (const [name, hex3] of assets) token(name, hex3);
  for (const f3 of all2.filter((x) => COLORS_XML.test(x.path))) {
    for (const m of f3.text.matchAll(/<(?:color|item)\s+name="(?:android:)?([\w.]+)"\s*>\s*(#[\da-fA-F]{3,8})\s*</g)) token(m[1], androidHex(m[2]));
  }
  for (const f3 of code) {
    const isTheme = THEME.test(f3.path);
    for (const m of f3.text.matchAll(NAMED_COLOR)) if (isTheme || declares(f3.text, m.index, m[1])) token(m[1], colorOf(m[2], assets));
    if (isTheme) {
      for (const m of f3.text.matchAll(LITERAL_G)) if (!m[0].startsWith("Colors.")) addHex(colors, colorOf(m[0], assets));
    }
  }
  for (const f3 of theme) {
    for (const m of f3.text.matchAll(/\b(\w+)\s*[:=]\s*(?:\w+\.)?(\w+)\s*(?=[,)\n])/g)) {
      const hex3 = colorTokens[m[2]];
      if (hex3 && !PROPERTY.test(m[1])) colorTokens[m[1]] ??= hex3;
    }
  }
  const sizeUse = /* @__PURE__ */ new Map();
  const declaredRadii = /* @__PURE__ */ new Set();
  const declaredSizes = /* @__PURE__ */ new Set();
  const declaredSpacing = /* @__PURE__ */ new Set();
  const tally = (m, px2) => m.set(px2, (m.get(px2) ?? 0) + 1);
  for (const f3 of code) {
    const isTheme = THEME.test(f3.path);
    for (const m of f3.text.matchAll(RADIUS)) {
      const n = parseFloat(m.slice(1).find(Boolean));
      if (!(n > 0 && n < 100)) continue;
      if (isTheme) declaredRadii.add(toPx(String(n)));
    }
    for (const m of f3.text.matchAll(NAMED_RADIUS)) if (declares(f3.text, m.index, m[1]) && +m[2] > 0 && +m[2] < 100) declaredRadii.add(toPx(m[2]));
    for (const n of members(f3.text, /radi|corner/i)) if (+n > 0 && +n < 100) declaredRadii.add(toPx(n));
    for (const n of members(f3.text, /spac|gaps?$|gutter|insets?$/i)) if (+n > 0 && +n < 200) declaredSpacing.add(toPx(n));
    for (const h of f3.text.matchAll(HEIGHT)) {
      const near = f3.text.slice(Math.max(0, h.index - 200), h.index + 200);
      for (const r2 of near.matchAll(RADIUS)) if (2 * parseFloat(r2.slice(1).find(Boolean)) === +h[1]) declaredRadii.add(toPx(String(+h[1] / 2)));
    }
    for (const m of f3.text.matchAll(FONT_SIZE)) {
      const px2 = toPx(m.slice(1).find(Boolean));
      tally(sizeUse, px2);
      if (isTheme) declaredSizes.add(px2);
    }
    for (const m of f3.text.matchAll(NAMED_SIZE)) if (declares(f3.text, m.index, m[1])) declaredSizes.add(toPx(m[2]));
    for (const n of members(f3.text, /font.?size|text.?size/i)) declaredSizes.add(toPx(n));
    for (const m of f3.text.matchAll(PLATFORM_STYLE)) {
      const px2 = `${m[1] ? M3[m[1]] : SWIFTUI[m[2]]}px`;
      tally(sizeUse, px2);
      declaredSizes.add(px2);
    }
  }
  const byPx = (a, b) => parseFloat(a) - parseFloat(b);
  const repeated = (m) => [...m].filter(([, n]) => n >= 2).map(([px2]) => px2);
  const radii = new Set(declaredRadii);
  const pill = theme.some((f3) => THEME_PILL.test(f3.text)) || code.some((f3) => [...f3.text.matchAll(NAMED_PILL)].some((m) => declares(f3.text, m.index, m[1])) || members(f3.text, /radi|corner/i).some((n) => +n >= 100));
  if (pill) radii.add("9999px");
  const fontSizes = [.../* @__PURE__ */ new Set([...declaredSizes, ...repeated(sizeUse)])].sort((a, b) => (sizeUse.get(b) ?? 0) - (sizeUse.get(a) ?? 0) || byPx(a, b));
  const fonts = /* @__PURE__ */ new Map();
  const addFont = (raw) => {
    const f3 = fontName(raw);
    if (/^[A-Za-z][\w .'-]{1,39}$/.test(f3) && !SYSTEM_FONT.test(f3)) fonts.set(f3.toLowerCase(), f3);
  };
  for (const f3 of all2.filter((x) => PUBSPEC.test(x.path))) {
    for (const line of f3.text.split("\n")) if (!/^\s*#/.test(line)) addFont(/^\s*-\s*family\s*:\s*["']?([^"'#\n]+?)["']?\s*$/.exec(line)?.[1] ?? "");
  }
  for (const f3 of theme) for (const m of f3.text.matchAll(THEME_FONT)) addFont(m.slice(1).find(Boolean));
  for (const f3 of code) for (const m of f3.text.matchAll(/\bGoogleFonts\.(?!get)([a-z]\w*?)(?:TextTheme)?\s*\(|\bGoogleFont\(\s*"([^"\n]+)"/g)) addFont(m[1] ?? m[2]);
  const pubspecs = all2.filter((f3) => PUBSPEC.test(f3.path)).map((f3) => ({ dir: f3.path.slice(0, -"pubspec.yaml".length), name: /^name:\s*([\w-]+)/m.exec(f3.text)?.[1] }));
  const defined = /* @__PURE__ */ new Map();
  for (const f3 of code) {
    const pkg = /^package\s+([\w.]+)/m.exec(f3.text)?.[1];
    const own = pubspecs.find((p4) => p4.name && f3.path.startsWith(`${p4.dir}lib/`));
    for (const m of f3.text.matchAll(COMPONENT)) {
      const name = m[1] ?? m[2] ?? m[3];
      if (NOT_COMPONENT.test(name) || defined.has(name)) continue;
      const importPath = f3.path.endsWith(".dart") && own ? `package:${own.name}/${f3.path.slice(own.dir.length + 4)}` : f3.path.endsWith(".kt") && pkg ? `${pkg}.${name}` : f3.path;
      defined.set(name, { importPath, file: f3.path });
    }
  }
  const used = /* @__PURE__ */ new Map();
  if (defined.size) {
    const call = new RegExp(String.raw`\b(${[...defined.keys()].join("|")})\s*[({]`, "g");
    for (const f3 of code) for (const m of f3.text.matchAll(call)) if (defined.get(m[1]).file !== f3.path) used.set(m[1], (used.get(m[1]) ?? 0) + 1);
  }
  const components = [...defined].filter(([name, c2]) => used.has(name) || THEME.test(c2.file) || SHARED_DIR.test(c2.file)).sort((a, b) => (used.get(b[0]) ?? 0) - (used.get(a[0]) ?? 0) || a[0].localeCompare(b[0])).slice(0, 60).map(([name, c2]) => ({ name, importPath: c2.importPath }));
  const effects = {};
  for (const f3 of code) {
    for (const m of f3.text.matchAll(NAMED_EFFECT)) {
      if (declares(f3.text, m.index, m[1]) && (m[2] || /shadow|elevation/i.test(m[1]))) effects[m[1]] ??= `${m[2] ?? m[3]}(\u2026)`;
    }
  }
  const builds = (ext, re) => code.some((f3) => f3.path.endsWith(ext) && re.test(f3.text));
  const stack = [
    builds(".dart", /\bWidget\s+build\s*\(/) && "Flutter",
    builds(".swift", /\bsome\s+View\b/) && "SwiftUI",
    builds(".swift", /\bclass\s+\w+\s*:\s*UI(?:View|ViewController|TableViewCell|CollectionViewCell)\b/) && "UIKit",
    builds(".kt", /@Composable\b/) && "Jetpack Compose"
  ].filter(Boolean).join(" + ");
  const out = {};
  if (stack) out.stack = stack;
  if (colors.size) out.colors = [...colors];
  if (Object.keys(colorTokens).length) out.colorTokens = colorTokens;
  if (radii.size) out.radii = [...radii].sort(byPx);
  if (fontSizes.length) out.fontSizes = fontSizes;
  if (declaredSpacing.size) out.spacing = [...declaredSpacing].sort(byPx);
  if (fonts.size) out.fonts = [...fonts.values()].slice(0, 8);
  if (components.length) out.components = components;
  if (Object.keys(effects).length) out.effects = effects;
  return out;
}
var CODE2 = /\.(dart|swift|kt)$/;
var THEME = new RegExp(NATIVE_THEME, "i");
var PUBSPEC = /(^|\/)pubspec\.yaml$/;
var COLORS_XML = /(^|\/)res\/values(?:-night)?\/(?:colors|themes|styles)\.xml$/;
var SHARED_DIR = /(^|\/)(?:widgets?|components?|ui|design_?system|common|shared)\//i;
var PROPERTY = /^(?:color|value|it|this|default)$/;
var SYSTEM_FONT = /^(?:sans-serif|serif|monospace|cursive|system-ui|default|Roboto|SF Pro(?: Text| Display| Rounded)?|San Francisco|Helvetica(?: Neue)?|Arial)$/i;
var NOT_COMPONENT = /(?:Screen|Page|App|Activity|Route|Router|Preview|Previews|Theme|NavHost|NavGraph)$|^ContentView$/;
var LITERAL = String.raw`(?:(?:Color|UIColor|NSColor)(?:\.(?:from|fromARGB|fromRGBO|rgb|argb|parseColor))?\((?:[^()\n]|\([^()\n]*\))*\)|#colorLiteral\([^()\n]*\)|Colors\.\w+(?!\s*[.[\w]))`;
var LITERAL_G = new RegExp(LITERAL, "g");
var NAMED_COLOR = new RegExp(String.raw`\b(\w+)\s*(?::\s*[\w.?]+\s*)?[:=]\s*(?:const\s+)?(${LITERAL})`, "g");
function declares(text, at, name) {
  const prefix = text.slice(text.lastIndexOf("\n", at - 1) + 1, at);
  return /\bstatic\s+(?:const|final|let|var)\s+(?:[\w<>?.]+\s+)?$|^(?:const|final)\s+(?:[\w<>?.]+\s+)?$/.test(prefix) || /\b(?:const\s+)?val\s+$/.test(prefix) && /^[A-Z]/.test(name);
}
var MATERIAL = {
  red: "#f44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  deepPurple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196f3",
  lightBlue: "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  lightGreen: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deepOrange: "#ff5722",
  brown: "#795548",
  grey: "#9e9e9e",
  blueGrey: "#607d8b",
  black: "#000000",
  white: "#ffffff"
};
var addHex = (set, hex3) => hex3 && set.add(hex3);
var rgb4 = (xs) => `#${xs.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("")}`;
var channel = (s) => {
  const [a, b] = s.replace(/^\s*\w+\(|\)\s*$/g, "").replace(/(\d)f\b/g, "$1").split("/").map((x) => parseFloat(x));
  return b ? a / b : a;
};
var androidHex = (h) => hex6(h.length === 9 ? `#${h.slice(3)}` : h.length === 5 ? `#${h.slice(2)}` : h);
function colorOf(expr, assets) {
  const e4 = expr.trim();
  let m = /^(?:Color|UIColor|NSColor)\(\s*(?:hex\s*:\s*)?0x([\da-f]{6}(?:[\da-f]{2})?)\b/i.exec(e4);
  if (m) return `#${m[1].slice(-6).toLowerCase()}`;
  m = /^(?:Color|UIColor|NSColor)(?:\.parseColor)?\(\s*(?:hex(?:String)?\s*:\s*)?["']#?([\da-f]{6}|[\da-f]{3})(?:[\da-f]{2})?["']/i.exec(e4);
  if (m) return hex6(`#${m[1]}`);
  m = /^Color\.(?:fromARGB|argb)\(\s*\d+\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(e4) ?? /^Color\.(?:fromRGBO|rgb)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(e4);
  if (m) return rgb4([+m[1], +m[2], +m[3]]);
  m = /\bred\s*[:=]\s*([^,]+?)\s*,\s*green\s*[:=]\s*([^,]+?)\s*,\s*blue\s*[:=]\s*([^,)]+(?:\([^()]*\))?)/.exec(e4);
  if (m) {
    const xs = [m[1], m[2], m[3]].map(channel);
    return xs.some((x) => !Number.isFinite(x)) ? void 0 : rgb4(xs.map((x) => xs.every((y) => y <= 1) ? x * 255 : x));
  }
  m = /^Color\(\s*([\d.]+)f\s*,\s*([\d.]+)f\s*,\s*([\d.]+)f/.exec(e4);
  if (m) return rgb4([+m[1] * 255, +m[2] * 255, +m[3] * 255]);
  m = /^(?:Color|UIColor)\(\s*white\s*:\s*([\d.]+)/.exec(e4);
  if (m) return rgb4([+m[1] * 255, +m[1] * 255, +m[1] * 255]);
  m = /^(?:Color\(|UIColor\(\s*named\s*:)\s*"([^"\n]+)"/.exec(e4);
  if (m) return assets.get(m[1]);
  m = /^Colors\.(\w+)$/.exec(e4);
  return m ? MATERIAL[m[1]] : void 0;
}
function colorSets(files) {
  const out = /* @__PURE__ */ new Map();
  for (const f3 of files) {
    const name = /(?:^|\/)([^/]+)\.colorset\/Contents\.json$/.exec(f3.path)?.[1];
    if (!name) continue;
    try {
      const c2 = JSON.parse(f3.text).colors?.[0]?.color?.components;
      if (!c2) continue;
      out.set(name, rgb4(["red", "green", "blue"].map((k4) => {
        const v = String(c2[k4] ?? "0");
        return v.startsWith("0x") ? parseInt(v, 16) : v.includes(".") ? parseFloat(v) * 255 : parseInt(v, 10);
      })));
    } catch {
    }
  }
  return out;
}
var RADIUS = /\b(?:BorderRadius|Radius)\.circular\(\s*(\d+(?:\.\d+)?)\s*\)|(?:\.cornerRadius\(|\bcornerRadius\s*:)\s*(\d+(?:\.\d+)?)(?![\d.])|\bRoundedCornerShape\(\s*(?:size\s*=\s*)?(\d+(?:\.\d+)?)\.dp|\b(?:top|bottom)(?:Start|End)\s*=\s*(\d+(?:\.\d+)?)\.dp/g;
var NAMED_RADIUS = /\b((?!blur|spread|shadow)\w*(?:[Rr]adius|[Rr]adii|[Cc]orner)\w*)\s*(?::\s*\w+\s*)?=\s*(\d+(?:\.\d+)?)(?:\.dp)?\b/g;
var NAMESPACE = /\b(?:enum|struct|class|object|extension)\s+(\w+)[^{\n]*\{/g;
var MEMBER = /\b(?:static\s+(?:let|var|const|final)|(?:const\s+)?val)\s+(?:[\w<>?]+\s+)?\w+\s*(?::\s*\w+\s*)?=\s*(\d+(?:\.\d+)?)(?:\.(?:dp|sp))?\b/g;
function members(text, kind) {
  const out = [];
  for (const m of text.matchAll(NAMESPACE)) {
    if (!kind.test(m[1])) continue;
    let depth = 1;
    let i = m.index + m[0].length;
    for (; i < text.length && depth; i++) depth += text[i] === "{" ? 1 : text[i] === "}" ? -1 : 0;
    for (const v of text.slice(m.index + m[0].length, i - 1).matchAll(MEMBER)) out.push(v[1]);
  }
  return out;
}
var HEIGHT = /\bheight\s*[:=(]\s*(?:height\s*[:=]\s*)?(\d+(?:\.\d+)?)(?:\.dp)?\b/g;
var THEME_PILL = /(?:\b\w*Theme(?:Data)?|\bShapes)\([^;{}]{0,400}?(?:\bStadiumBorder\(|\bcircular\(\s*(?:[1-9]\d{2,}|double\.infinity)|\bRoundedCornerShape\(\s*(?:percent\s*=\s*)?50\s*\)|\.capsule\b|\bCircleShape\b)/;
var NAMED_PILL = /\b(\w+)\s*(?::\s*\w+\s*)?=\s*(?:const\s+)?(?:StadiumBorder\(|Capsule\(|CircleShape\b|RoundedCornerShape\(\s*(?:percent\s*=\s*)?50\s*\)|[1-9]\d{2,}(?:\.\d+)?(?![\d.])|double\.infinity)/g;
var FONT_SIZE = /(?<![\w-])fontSize\s*:\s*(\d+(?:\.\d+)?)(?![\w.])|\bfontSize\s*=\s*(\d+(?:\.\d+)?)\.sp\b|\.system\(\s*size\s*:\s*(\d+(?:\.\d+)?)|\.custom\(\s*"[^"\n]*"\s*,\s*(?:fixedSize|size)\s*:\s*(\d+(?:\.\d+)?)|\bUIFont\.\w*[sS]ystemFont\(\s*ofSize\s*:\s*(\d+(?:\.\d+)?)|\bUIFont\(\s*name\s*:\s*"[^"\n]*"\s*,\s*size\s*:\s*(\d+(?:\.\d+)?)/g;
var NAMED_SIZE = /\b(\w*(?:[Ff]ont|[Tt]ext)\w*[Ss]ize\w*)\s*(?::\s*\w+\s*)?=\s*(\d+(?:\.\d+)?)(?:\.sp)?\b/g;
var M3 = { displayLarge: 57, displayMedium: 45, displaySmall: 36, headlineLarge: 32, headlineMedium: 28, headlineSmall: 24, titleLarge: 22, titleMedium: 16, titleSmall: 14, bodyLarge: 16, bodyMedium: 14, bodySmall: 12, labelLarge: 14, labelMedium: 12, labelSmall: 11 };
var SWIFTUI = { largeTitle: 34, title: 28, title2: 22, title3: 20, headline: 17, subheadline: 15, body: 17, callout: 16, footnote: 13, caption: 12, caption2: 11 };
var PLATFORM_STYLE = new RegExp(String.raw`\b(?:textTheme|typography)\.(${Object.keys(M3).join("|")})\b|\.font\(\s*(?:Font)?\.(${Object.keys(SWIFTUI).join("|")})\b(?!\s*\()`, "g");
var THEME_FONT = /\bfontFamily\s*:\s*['"]\.?([^'"\n]+)['"]|\.custom\(\s*"([^"\n]+)"|\bUIFont\(\s*name\s*:\s*"([^"\n]+)"|\bR\.font\.(\w+)/g;
var fontName = (raw) => raw.trim().replace(/^\./, "").replace(/[-_ ]?(?:\d{3}|thin|extralight|ultralight|light|regular|book|medium|semibold|demibold|bold|extrabold|heavy|black|italic|variable)+$/i, "").replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b[a-z]/g, (c2) => c2.toUpperCase()).trim();
var COMPONENT = /^class\s+([A-Z]\w*)\s+extends\s+(?:StatelessWidget|StatefulWidget|ConsumerWidget|ConsumerStatefulWidget|HookWidget|HookConsumerWidget)\b|^[ \t]*(?:public\s+|internal\s+)?struct\s+([A-Z]\w*)\s*:\s*(?:[\w.]+\s*,\s*)*(?:View|ButtonStyle|PrimitiveButtonStyle|ToggleStyle|LabelStyle|ViewModifier)\b|@Composable\s+(?:@\w+(?:\([^)]*\))?\s+)*(?:(?:public|internal)\s+)?fun\s+([A-Z]\w*)\s*\(/gm;
var NAMED_EFFECT = /\b(\w+)\s*(?::\s*[\w<>.]+\s*)?=\s*(?:const\s+)?(?:(LinearGradient|RadialGradient|SweepGradient|AngularGradient|Brush\.\w+Gradient)\(|\[?\s*(?:const\s+)?(BoxShadow|Shadow)\()/g;

// scripts/skill-detect.ts
var USAGE = "Usage: node detect.mjs [dir=.] [--changed] [--json]";
var MAX_KEPT = 48e6;
var MAX_FILES = 5e3;
var MANIFESTS = ["package.json", "pubspec.yaml", "Package.swift", "build.gradle", "build.gradle.kts"];
function productOf(dir2) {
  const cwd = process.cwd();
  const up = relative(cwd, dir2);
  if (up === ".." || up.startsWith(`..${sep}`) || isAbsolute(up)) return dir2;
  for (let d = dir2; d !== cwd; d = dirname(d)) if (MANIFESTS.some((m) => existsSync(join(d, m)))) return d;
  return cwd;
}
function stop(message, code = 2) {
  console.error(message);
  process.exit(code);
}
function read(root2) {
  const out = [];
  let kept = 0;
  const walk = (dir2, rel2) => {
    let entries2;
    try {
      entries2 = readdirSync(dir2, { withFileTypes: true });
    } catch {
      return;
    }
    const key = (e4) => e4.name + (e4.isDirectory() ? "/" : "");
    for (const e4 of entries2.sort((a, b) => key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0)) {
      const path = rel2 + e4.name;
      if (e4.isDirectory()) {
        if (!SKIPPED.test(`${path}/`)) walk(join(dir2, e4.name), `${path}/`);
      } else if (e4.isFile() && keepSource(path, 0)) {
        try {
          const size = statSync(join(dir2, e4.name)).size;
          if (!keepSource(path, size) || kept + size > MAX_KEPT || out.length >= MAX_FILES) continue;
          out.push({ path, text: readFileSync(join(dir2, e4.name), "utf8") });
          kept += size;
        } catch {
        }
      }
    }
  };
  walk(root2, "");
  return out;
}
function changed(root2) {
  const git = (...args2) => execFileSync("git", ["-C", root2, ...args2], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 }).split("\0").filter(Boolean);
  try {
    return /* @__PURE__ */ new Set([...git("diff", "--name-only", "-z", "--relative", "HEAD"), ...git("ls-files", "-z", "--others", "--exclude-standard")]);
  } catch {
    stop("--changed needs git (a repository with a commit); pass a folder instead: node detect.mjs src/", 0);
  }
}
var args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
var flags = new Set(args.filter((a) => a.startsWith("-")));
var dirs = args.filter((a) => !a.startsWith("-"));
if ([...flags].some((f3) => f3 !== "--changed" && f3 !== "--json") || dirs.length > 1) stop(USAGE);
var dir = resolve(dirs[0] ?? ".");
if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) stop(`No such directory: ${dirs[0] ?? "."}`);
var root = productOf(dir);
var scope = relative(root, dir).split(sep).join("/");
var all = read(root);
var sources = all.filter(isUiSource);
var configs = all.filter((f3) => CONFIG_FILE.test(f3.path));
var derived = withNative(deriveSystem(sources, configs, void 0, void 0), deriveNative(all));
var system = { ...derived, productType: productTypeOf({}, derived, sources) };
var only = flags.has("--changed") ? changed(root) : void 0;
var part = !!scope || !!only;
var checked = sources.filter((f3) => (!scope || f3.path.startsWith(`${scope}/`)) && (!only || only.has(f3.path)));
var result = detect(checked, system);
var findings = (part ? result.findings.filter((f3) => !(f3.detector in PROJECT_RULES)) : result.findings).sort((a, b) => a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line);
var score = part ? scoreOf(findings, result.scanned) : result.score;
var band = scoreBand(score).id;
var shown = (f3) => relative(process.cwd(), join(root, f3.file)).split(sep).join("/");
if (!checked.length) console.error(only ? "No UI file has changed since the last commit." : `No UI source under ${dirs[0] ?? "."}: nothing to check.`);
if (flags.has("--json")) {
  const summary = {
    stack: system.stack,
    productType: system.productType,
    separation: separationOf(system),
    colorTokens: Object.keys(system.colorTokens).length,
    colors: system.colors.length,
    fonts: system.fonts,
    fontSizes: system.fontSizes,
    radii: system.radii,
    spacing: system.spacing?.length ?? 0,
    components: system.components.length,
    blurs: system.blurs?.length ?? 0
  };
  const rows = findings.map((f3) => ({ file: shown(f3), line: f3.line, kind: f3.kind, detector: f3.detector, ban: f3.ban, message: f3.message, excerpt: f3.excerpt }));
  console.log(JSON.stringify({ system: summary, muted: result.muted, findings: rows, score, band, scanned: { files: checked.length, lines: result.scanned } }, null, 2));
} else {
  const lines = [];
  for (const [group, kind] of [["must", "universal"], ["drift", "drift"], ["taste", "taste"]]) {
    const list = findings.filter((f3) => f3.kind === kind);
    if (!list.length) continue;
    lines.push(`${group} (${list.length})`, ...list.map((f3) => `${shown(f3)}:${f3.line}  ${f3.message}  [${f3.detector}]`), "");
  }
  if (result.muted.length) lines.push("Kept as theirs:", ...result.muted.map((m) => `- ${m.ban}: ${m.reason}`), "");
  const count = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  lines.push(`${count(findings.length, "finding")} in ${count(checked.length, "file")} \xB7 score ${score.toFixed(1)} (${band})`);
  console.log(lines.join("\n"));
}
