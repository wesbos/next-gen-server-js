import {
  A as s,
  E as l,
  Fa as n,
  K as h,
  P as x,
  Q as v,
  Qa as S,
  R as y,
  S as p,
  W as _,
  Y as E,
  c as m,
  f as r,
} from "./chunk-3R5WIEPD.js";
// import "./chunk-E4N5LSO5.js";
import { a as d, b as u } from "./chunk-XVNU34J2.js";
import { a as o } from "./chunk-6UBWOGX3.js";
import { h as f } from "./chunk-FSZRLV7Q.js";
var T = `
precision highp float;
uniform vec2    u_mouse;
uniform float   u_time;
varying vec3    v_position;
varying vec3    v_normal;
varying vec2    v_texcoord;

void main(void) {
  v_position = position;
  v_normal = normal;
  v_texcoord = uv;

  v_position.y += u_mouse.x * 0.001;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
}
`;
var C = `

precision highp float;

uniform vec2        u_mouse;
uniform float       u_scrollY;
uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;
uniform float       u_devicePixelScale;
uniform sampler2D   u_tex1;
uniform vec2        u_tex1Resolution;
uniform sampler2D   u_tex2;
uniform sampler2D   u_tex3;
uniform vec3        u_light;
uniform float       u_hueRotation;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec3        v_position;
varying vec3        v_normal;

varying vec2        v_texcoord;

vec3 hue_shift(vec3 color, float dhue) {
	float s = sin(dhue);
	float c = cos(dhue);
	return (color * c) + (color * s) * mat3(
		vec3(0.167444, 0.329213, -0.496657),
		vec3(-0.327948, 0.035669, 0.292279),
		vec3(1.250268, -1.047561, -0.202707)
	) + dot(vec3(0.299, 0.587, 0.114), color) * (1.0 - c);
}

/*
original_author: Patricio Gonzalez Vivo
description: decimate a value with an specific presicion
use: decimate(<float|vec2|vec3|vec4> value, <float|vec2|vec3|vec4> presicion)
*/

#ifndef FNC_DECIMATION
#define FNC_DECIMATION

#define decimate(value, presicion) (floor(value * presicion)/presicion)

#endif
/*
original_author: Patricio Gonzalez Vivo
description: scale a 2D space variable
use: scale(<vec2> st, <vec2|float> scale_factor [, <vec2> center])
options:
  - CENTER
  - CENTER_2D
  - CENTER_3D
*/

#ifndef FNC_SCALE
#define FNC_SCALE
float scale(in float st, in float s, in float center) {
  return (st - center) * s + center;
}

float scale(in float st, in float s) {
  #ifdef CENTER_2D
  return scale(st,  s, CENTER);
  #else
  return scale(st,  s, .5);
  #endif
}


vec2 scale(in vec2 st, in vec2 s, in vec2 center) {
  return (st - center) * s + center;
}

vec2 scale(in vec2 st, in float value, in vec2 center) {
  return scale(st, vec2(value), center);
}

vec2 scale(in vec2 st, in vec2 s) {
  #ifdef CENTER_2D
  return scale(st,  s, CENTER_2D);
  #else
  return scale(st,  s, vec2(.5));
  #endif
}

vec2 scale(in vec2 st, in float value) {
  return scale(st, vec2(value));
}

vec3 scale(in vec3 st, in vec3 s, in vec3 center) {
  return (st - center) * s + center;
}

vec3 scale(in vec3 st, in float value, in vec3 center) {
  return scale(st, vec3(value), center);
}

vec3 scale(in vec3 st, in vec3 s) {
  #ifdef CENTER_3D
  return scale(st,  s, CENTER_3D);
  #else
  return scale(st,  s, vec3(.5));
  #endif
}

vec3 scale(in vec3 st, in float value) {
  return scale(st, vec3(value));
}
#endif

/*
original_author: Patricio Gonzalez Vivo
description: pass a value and get some random normalize value between 0 and 1
use: float random[2|3](<float|vec2|vec3> value)
*/

#ifndef FNC_RANDOM
#define FNC_RANDOM
float random(in float x) {
return fract(sin(x) * 43758.5453);
}

float random(in vec2 st) {
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float random(in vec3 pos) {
return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

float random(in vec4 pos) {
  float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
  return fract(sin(dot_product) * 43758.5453);
}

// Hash function from https://www.shadertoy.com/view/4djSRW
#ifndef RANDOM_SCALE3
#define RANDOM_SCALE3 vec3(.1031, .1030, .0973)
#endif

#ifndef RANDOM_SCALE4
#define RANDOM_SCALE4 vec4(1031, .1030, .0973, .1099)
#endif
vec2 random2(float p) {
  vec3 p3 = fract(vec3(p) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec2 random2(vec2 p) {
  vec3 p3 = fract(p.xyx * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec2 random2(vec3 p3) {
  p3 = fract(p3 * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx+19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec3 random3(float p) {
  vec3 p3 = fract(vec3(p) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx+19.19);
  return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 random3(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yxz+19.19);
  return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 random3(vec3 p) {
  p = fract(p * RANDOM_SCALE3);
  p += dot(p, p.yxz+19.19);
  return fract((p.xxy + p.yzz)*p.zyx);
}

vec4 random4(float p) {
  vec4 p4 = fract(vec4(p) * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec2 p) {
  vec4 p4 = fract(vec4(p.xyxy) * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec3 p) {
  vec4 p4 = fract(vec4(p.xyzx)  * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec4 p4) {
  p4 = fract(p4  * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}


#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description: modulus of 289
use: mod289(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif



/*
original_author: [Ian McEwan, Ashima Arts]
description: permute
use: permute(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description:
use: taylorInvSqrt(<float|vec4> x)
*/

#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT

float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

#endif
/*
original_author: [Ian McEwan, Ashima Arts]
description: grad4, used for snoise(vec4 v)
use: grad4(<float> j, <vec4> ip)
*/

#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

  return p;
}
#endif


/*
original_author: [Ian McEwan, Ashima Arts]
description: Simplex Noise https://github.com/ashima/webgl-noise
use: snoise(<vec2|vec3|vec4> pos)
license: |
  Copyright (C) 2011 Ashima Arts. All rights reserved.
  Copyright (C) 2011-2016 by Stefan Gustavson (Classic noise and others)
  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  Neither the name of the GPUImage framework nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(in vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  // First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


float snoise(in vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                              dot(p2,x2), dot(p3,x3) ) );
}

float snoise(in vec4 v) {
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
                      0.276393202250021,  // 2 * G4
                      0.414589803375032,  // 3 * G4
                      -0.447213595499958); // -1 + 4 * G4

  // First corner
  vec4 i  = floor(v + dot(v, vec4(.309016994374947451)) ); // (sqrt(5) - 1)/4
  vec4 x0 = v -   i + dot(i, C.xxxx);

  // Other corners

  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C.xxxx
  //  x1 = x0 - i1  + 1.0 * C.xxxx
  //  x2 = x0 - i2  + 2.0 * C.xxxx
  //  x3 = x0 - i3  + 3.0 * C.xxxx
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

  // Permutations
  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
              i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
          + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
          + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
          + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

  // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
              + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec2 snoise2( vec2 x ){
  float s  = snoise(vec2( x ));
  float s1 = snoise(vec2( x.y - 19.1, x.x + 47.2 ));
  return vec2( s , s1 );
}

vec3 snoise3( vec3 x ){
  float s  = snoise(vec3( x ));
  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
  return vec3( s , s1 , s2 );
}

vec3 snoise3( vec4 x ){
  float s  = snoise(vec4( x ));
  float s1 = snoise(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
  float s2 = snoise(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
  return vec3( s , s1 , s2 );
}

#endif

#ifndef SAMPLER_FNC

#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif

#endif

// #ifndef FNC_SAMPLE
// #define FNC_SAMPLE
// vec4 sample(sampler2D tex, vec2 uv) { return SAMPLER_FNC(tex, uv); }
// #endif

/*
original_author: Patricio Gonzalez Vivo
description: fakes a clamp to edge texture
use: <vec4> sampleClamp2edge(<sampler2D> tex, <vec2> st [, <vec2> texResolution]);
options:
  - SAMPLER_FNC(TEX, UV)
*/

#ifndef FNC_SAMPLECLAMP2EDGE
#define FNC_SAMPLECLAMP2EDGE
vec4 sampleClamp2edge(sampler2D tex, vec2 st, vec2 texResolution) {
  vec2 pixel = 1.0/texResolution;
  return SAMPLER_FNC( tex, clamp(st, pixel, 1.0-pixel) );
}

vec4 sampleClamp2edge(sampler2D tex, vec2 st) {
  return SAMPLER_FNC( tex, clamp(st, vec2(0.01), vec2(0.99) ) );
}
#endif
#ifndef SAMPLER_FNC

#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif

#endif

// #ifndef FNC_SAMPLE
// #define FNC_SAMPLE
// vec4 sample(sampler2D tex, vec2 uv) { return SAMPLER_FNC(tex, uv); }
// #endif

/*
original_author: [Patricio Gonzalez Vivo, Johan Ismael]
description: Samples multiple times a texture in the specified direction
use: stretch(<sampler2D> tex, <vec2> st, <vec2> direction [, int samples])
options:
  - SAMPLER_FNC(TEX, UV): optional depending the target version of GLSL (texture2D(...) or texture(...))
  - STRETCH_SAMPLES: number of samples taken, defaults to 20
  - STRETCH_TYPE: return type, defauls to vec4
  - STRETCH_SAMPLER_FNC(TEX, UV): function used to sample the input texture, defaults to texture2D(tex, TEX, UV)
  - STRETCH_WEIGHT: shaping equation to multiply the sample weight.
*/

#ifndef STRETCH_SAMPLES
#define STRETCH_SAMPLES 20
#endif

#ifndef STRETCH_TYPE
#define STRETCH_TYPE vec4
#endif

#ifndef STRETCH_SAMPLER_FNC
#define STRETCH_SAMPLER_FNC(TEX, UV) SAMPLER_FNC(TEX, UV)
#endif

#ifndef FNC_STRETCH
#define FNC_STRETCH
STRETCH_TYPE stretch(in sampler2D tex, in vec2 st, in vec2 direction, const int i_samples) {
  float f_samples = float(i_samples);
  STRETCH_TYPE color = STRETCH_TYPE(0.);

  #ifdef PLATFORM_WEBGL
  for (int i = 0; i < 50; i++) {
      if (i == i_samples) break;
  #else
  for (int i = 0; i < i_samples; i++) {
  #endif

      float f_sample = float(i);
      STRETCH_TYPE tx = STRETCH_SAMPLER_FNC(tex, st + direction * f_sample);
      #ifdef STRETCH_WEIGHT
      tx *= STRETCH_WEIGHT;
      #endif
      color += tx;
  }
  return color / f_samples;
}

STRETCH_TYPE stretch(in sampler2D tex, in vec2 st, in vec2 direction) {
  float f_samples = float(STRETCH_SAMPLES);
  STRETCH_TYPE color = STRETCH_TYPE(0.);
  for (int i = 0; i < STRETCH_SAMPLES; i++) {
      float f_sample = float(i);
      STRETCH_TYPE tx = STRETCH_SAMPLER_FNC(tex, st + direction * f_sample);
      #ifdef STRETCH_WEIGHT
      tx *= STRETCH_WEIGHT;
      #endif
      color += tx;
  }
  return color / f_samples;
}
#endif

#ifndef SAMPLER_FNC

#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif

#endif

// #ifndef FNC_SAMPLE
// #define FNC_SAMPLE
// vec4 sample(sampler2D tex, vec2 uv) { return SAMPLER_FNC(tex, uv); }
// #endif

/*
original_author: Patricio Gonzalez Vivo
description: sample a texture with a looping flow animation, using a direction to push, an elapse time and a cycle.
use: sampleFlow(<sampler2D> tex, <vec2> st, <vec2> dir, <float> time, <float> cycle)
options:
  - SAMPLER_FNC(TEX, UV): optional depending the target version of GLSL (texture2D(...) or texture(...))
*/

#ifndef FNC_SAMPLEFLOW
#define FNC_SAMPLEFLOW
vec4 sampleFlow(sampler2D tex, vec2 st, vec2 dir, float time, float cycle) {
  float halfCycle = cycle * 0.5;

  float flowOffset0 = mod(time, cycle);
  float flowOffset1 = mod(time + halfCycle, cycle);

  float phase0 = flowOffset0;
  float phase1 = flowOffset1;

  // Sample normal map.
  vec4 A = SAMPLER_FNC(tex, (st + dir * phase0) );
  vec4 B = SAMPLER_FNC(tex, (st + dir * phase1) );

  float f = (abs(halfCycle - flowOffset0) / halfCycle);
  return mix( A, B, f );
}
#endif

vec3 A = vec3(0.4, 0.45, 0.94);
vec3 B = vec3(0.43, 0.68, 0.87);

void main(void) {
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  float scrollShift = u_scrollY * 0.0008;
  color.rg = v_texcoord;

  vec2 pixel = 1.0/u_resolution;
  vec2 st = vec2(gl_FragCoord.xy * pixel);

  float myScreenWidth = 1713.;
  float myScreenHeight = 1000.;
  float textMarginTop = 300. * pow(u_devicePixelScale, 5.);
  float screenAspect = u_resolution.x / u_resolution.y;
  float imageAspect = 2.;
  float screenScaleX = u_resolution.x / myScreenWidth;
  float screenScaleY = u_resolution.y / myScreenHeight;
  float screenImageRatioX = u_resolution.x / u_tex0Resolution.x;
  float screenImageRatioY = u_resolution.y / u_tex0Resolution.y;
  float imageScale = min(1.0, u_resolution.x / u_tex0Resolution.x) * u_devicePixelScale;
  float imageWidth = u_tex0Resolution.x * imageScale;
  float imageHeight = u_tex0Resolution.y * imageScale;
  float textOffsetX = (u_resolution.x - imageWidth) / imageWidth / 2. * imageScale / u_devicePixelScale;
  float textOffsetY = (u_resolution.y - imageHeight) / imageHeight * imageScale - textMarginTop / (u_resolution.y / screenScaleY);
  float textX = st.x * screenScaleX / imageScale - textOffsetX;
  float textY = st.y * screenScaleY / imageScale * 1.176 - textOffsetY / 1.06 / imageScale;
  // float text = texture2D(u_tex0, vec2(textX, textY - scrollShift)).r;
  float dissolve = max(0.0, random(st) * (scrollShift) * 0.75);
  float textScale = (1. + scrollShift * -1.0);
  float textShiftX = scrollShift * (sin(st.x * 7.) + 0.2);
  float textShiftY = scrollShift * sin(st.x * 5.) + scrollShift;
  float text = texture2D(u_tex0, vec2(textX * textScale + dissolve - textShiftX, textY * textScale - textShiftY)).r;

  vec2 uv = vec2(v_texcoord.y, (v_texcoord.x + v_texcoord.y) * sin(v_texcoord.x * 3.));
  uv.x = 1.0-uv.x;

  // This extra UV set is for animating a rolling texture. vec2(4.0, 2.0) is the scale and 0.05 the speed
  vec2 uv2 = uv * vec2(4.0, 18.0) - vec2(u_time * 0.004, 0.0);
  uv2.y += sin(uv.x + u_time * 0.2) * 0.1;

  vec2 uv3 = uv * vec2(51.0, 5.5) - vec2(u_time * 0.004, 0.0);
  uv3.y += sin(uv.x + u_time * 0.2) * 0.4;

  // directional light
  vec3 light_dir = u_light;

  // directional light
  vec3 light_dir_bottom = vec3(u_light.x * -1.2, u_light.y * -2., u_light.z * -3.);

  // Load the normals
  vec3 normalmap = texture2D(u_tex2, vec2(uv2.x, uv2.y)).yxz * 16.0 - 1.0;
  vec3 normal = normalmap;

  // Load the noise

  vec3 noisemap = texture2D(u_tex3, vec2(uv3.x, uv3.y)).yxz * 2.0 - 1.0;
  vec3 noise = noisemap;

  // Manually sample the Albedo color texture
  color = texture2D(u_tex1, vec2(uv2.x, uv2.y));

  color.rgb += pow(dot(normal * 0.1, vec3(1.0,1.0,1.0)) * 0.5, 1.5) * 0.15;
  color.r -= pow(1.0 - dot(noise * 0.13, vec3(1.0,1.0,1.0)) * 3.8, 1.3) * 0.06;
  color.g -= pow(1.0 - dot(noise * 0.14, vec3(1.0,1.0,1.0)) * 3.9, 1.2) * 0.06;
  color.b -= pow(1.0 - dot(noise * 0.05, vec3(1.0,1.0,1.0)) * 2.5, 1.1) * 0.08;
  color.rgb = mix(mix(vec3(0.95), color.rgb - scrollShift, clamp(1.0 - scrollShift * 4., 0.0, 1.0)),
                  vec3(0.95),
                  text);
  color.rgb = hue_shift(color.rgb, u_hueRotation);
  gl_FragColor = color;
}`;
var R = `

precision highp float;
uniform vec2    u_mouse;
uniform float   u_time;
uniform float   u_scrollY;
uniform float   u_scrollVelocity;
varying vec3    v_position;
varying vec3    v_normal;
varying vec2    v_texcoord;

attribute vec4  tangent;
varying vec4    v_tangent;
varying mat3    v_tangentToWorld;

#ifndef QTR_PI
#define QTR_PI 0.78539816339
#endif
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966192313216916398
#endif
#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif
#ifndef TAU
#define TAU 6.2831853071795864769252867665590
#endif
#ifndef ONE_OVER_PI
#define ONE_OVER_PI 0.31830988618
#endif
#ifndef SQRT_HALF_PI
#define SQRT_HALF_PI 1.25331413732
#endif
#ifndef PHI
#define PHI 1.618033988749894848204586834
#endif
#ifndef EPSILON
#define EPSILON 0.0000001
#endif
#ifndef GOLDEN_RATIO
#define GOLDEN_RATIO 1.6180339887
#endif
#ifndef GOLDEN_RATIO_CONJUGATE
#define GOLDEN_RATIO_CONJUGATE 0.61803398875
#endif
#ifndef GOLDEN_ANGLE // (3.-sqrt(5.0))*PI radians
#define GOLDEN_ANGLE 2.39996323
#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description: modulus of 289
use: mod289(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif



/*
original_author: [Ian McEwan, Ashima Arts]
description: permute
use: permute(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description:
use: taylorInvSqrt(<float|vec4> x)
*/

#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT

float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

#endif
/*
original_author: [Ian McEwan, Ashima Arts]
description: grad4, used for snoise(vec4 v)
use: grad4(<float> j, <vec4> ip)
*/

#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

  return p;
}
#endif


/*
original_author: [Ian McEwan, Ashima Arts]
description: Simplex Noise https://github.com/ashima/webgl-noise
use: snoise(<vec2|vec3|vec4> pos)
license: |
  Copyright (C) 2011 Ashima Arts. All rights reserved.
  Copyright (C) 2011-2016 by Stefan Gustavson (Classic noise and others)
  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  Neither the name of the GPUImage framework nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(in vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  // First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


float snoise(in vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                              dot(p2,x2), dot(p3,x3) ) );
}

float snoise(in vec4 v) {
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
                      0.276393202250021,  // 2 * G4
                      0.414589803375032,  // 3 * G4
                      -0.447213595499958); // -1 + 4 * G4

  // First corner
  vec4 i  = floor(v + dot(v, vec4(.309016994374947451)) ); // (sqrt(5) - 1)/4
  vec4 x0 = v -   i + dot(i, C.xxxx);

  // Other corners

  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C.xxxx
  //  x1 = x0 - i1  + 1.0 * C.xxxx
  //  x2 = x0 - i2  + 2.0 * C.xxxx
  //  x3 = x0 - i3  + 3.0 * C.xxxx
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

  // Permutations
  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
              i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
          + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
          + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
          + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

  // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
              + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec2 snoise2( vec2 x ){
  float s  = snoise(vec2( x ));
  float s1 = snoise(vec2( x.y - 19.1, x.x + 47.2 ));
  return vec2( s , s1 );
}

vec3 snoise3( vec3 x ){
  float s  = snoise(vec3( x ));
  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
  return vec3( s , s1 , s2 );
}

vec3 snoise3( vec4 x ){
  float s  = snoise(vec4( x ));
  float s1 = snoise(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
  float s2 = snoise(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
  return vec3( s , s1 , s2 );
}

#endif

/*
original_author: Patricio Gonzalez Vivo
description: pass a value and get some random normalize value between 0 and 1
use: float random[2|3](<float|vec2|vec3> value)
*/

#ifndef FNC_RANDOM
#define FNC_RANDOM
float random(in float x) {
return fract(sin(x) * 43758.5453);
}

float random(in vec2 st) {
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float random(in vec3 pos) {
return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

float random(in vec4 pos) {
  float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
  return fract(sin(dot_product) * 43758.5453);
}

// Hash function from https://www.shadertoy.com/view/4djSRW
#ifndef RANDOM_SCALE3
#define RANDOM_SCALE3 vec3(.1031, .1030, .0973)
#endif

#ifndef RANDOM_SCALE4
#define RANDOM_SCALE4 vec4(1031, .1030, .0973, .1099)
#endif
vec2 random2(float p) {
  vec3 p3 = fract(vec3(p) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec2 random2(vec2 p) {
  vec3 p3 = fract(p.xyx * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec2 random2(vec3 p3) {
  p3 = fract(p3 * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx+19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec3 random3(float p) {
  vec3 p3 = fract(vec3(p) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx+19.19);
  return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 random3(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yxz+19.19);
  return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 random3(vec3 p) {
  p = fract(p * RANDOM_SCALE3);
  p += dot(p, p.yxz+19.19);
  return fract((p.xxy + p.yzz)*p.zyx);
}

vec4 random4(float p) {
  vec4 p4 = fract(vec4(p) * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec2 p) {
  vec4 p4 = fract(vec4(p.xyxy) * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec3 p) {
  vec4 p4 = fract(vec4(p.xyzx)  * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec4 p4) {
  p4 = fract(p4  * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}


#endif

/*
original_author: Patricio Gonzalez Vivo
description: Signed Random
use: srandomX(<vec2|vec3> x)
*/

#ifndef FNC_SRANDOM
#define FNC_SRANDOM

float srandom(in float x) {
return -1. + 2. * fract(sin(x) * 43758.5453);
}

float srandom(in vec2 st) {
return -1. + 2. * fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float srandom(in vec3 pos) {
return -1. + 2. * fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

float srandom(in vec4 pos) {
  float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
  return -1. + 2. * fract(sin(dot_product) * 43758.5453);
}

vec2 srandom2(in vec2 st) {
  const vec2 k = vec2(.3183099, .3678794);
  st = st * k + k.yx;
  return -1. + 2. * fract(16. * k * fract(st.x * st.y * (st.x + st.y)));
}

vec3 srandom3(in vec3 p) {
  p = vec3( dot(p, vec3(127.1, 311.7, 74.7)),
          dot(p, vec3(269.5, 183.3, 246.1)),
          dot(p, vec3(113.5, 271.9, 124.6)));
  return -1. + 2. * fract(sin(p) * 43758.5453123);
}

vec2 srandom2(in vec2 p, const in float tileLength) {
  p = mod(p, vec2(tileLength));
  return srandom2(p);
}

vec3 srandom3(in vec3 p, const in float tileLength) {
  p = mod(p, vec3(tileLength));
  return srandom3(p);
}

#endif
/*
original_author: Inigo Quiles
description: cubic polynomial https://iquilezles.org/articles/smoothsteps/
use: <float|vec2|vec3|vec4> cubic(<float|vec2|vec3|vec4> value[, <float> in, <float> out]);
*/

#ifndef FNC_CUBIC
#define FNC_CUBIC
float cubic(const in float v) { return v*v*(3.0-2.0*v); }
vec2  cubic(const in vec2 v)  { return v*v*(3.0-2.0*v); }
vec3  cubic(const in vec3 v)  { return v*v*(3.0-2.0*v); }
vec4  cubic(const in vec4 v)  { return v*v*(3.0-2.0*v); }

float cubic(const in float value, in float slope0, in float slope1) {
  float a = slope0 + slope1 - 2.;
  float b = -2. * slope0 - slope1 + 3.;
  float c = slope0;
  float value2 = value * value;
  float value3 = value * value2;
  return a * value3 + b * value2 + c * value;
}

vec2 cubic(const in vec2 value, in float slope0, in float slope1) {
  float a = slope0 + slope1 - 2.;
  float b = -2. * slope0 - slope1 + 3.;
  float c = slope0;
  vec2 value2 = value * value;
  vec2 value3 = value * value2;
  return a * value3 + b * value2 + c * value;
}

vec3 cubic(const in vec3 value, in float slope0, in float slope1) {
  float a = slope0 + slope1 - 2.;
  float b = -2. * slope0 - slope1 + 3.;
  float c = slope0;
  vec3 value2 = value * value;
  vec3 value3 = value * value2;
  return a * value3 + b * value2 + c * value;
}

vec4 cubic(const in vec4 value, in float slope0, in float slope1) {
  float a = slope0 + slope1 - 2.;
  float b = -2. * slope0 - slope1 + 3.;
  float c = slope0;
  vec4 value2 = value * value;
  vec4 value3 = value * value2;
  return a * value3 + b * value2 + c * value;
}
#endif
/*
original_author: Inigo Quiles
description: quintic polynomial https://iquilezles.org/articles/smoothsteps/
use: <float|vec2|vec3|vec4> quintic(<float|vec2|vec3|vec4> value);
*/

#ifndef FNC_QUINTIC
#define FNC_QUINTIC

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif

/*
original_author: Patricio Gonzalez Vivo
description: gradient Noise
use: gnoise(<float> x)
*/

#ifndef FNC_GNOISE
#define FNC_GNOISE

float gnoise(float x) {
  float i = floor(x);  // integer
  float f = fract(x);  // fraction
  return mix(random(i), random(i + 1.0), smoothstep(0.,1.,f));
}

float gnoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = cubic(f);
  return mix( a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
}

float gnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = quintic(f);
  return -1.0 + 2.0 * mix( mix( mix( random(i + vec3(0.0,0.0,0.0)),
                                      random(i + vec3(1.0,0.0,0.0)), u.x),
                              mix( random(i + vec3(0.0,1.0,0.0)),
                                      random(i + vec3(1.0,1.0,0.0)), u.x), u.y),
                          mix( mix( random(i + vec3(0.0,0.0,1.0)),
                                      random(i + vec3(1.0,0.0,1.0)), u.x),
                              mix( random(i + vec3(0.0,1.0,1.0)),
                                      random(i + vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
}

float gnoise(vec3 p, float tileLength) {
  vec3 i = floor(p);
  vec3 f = fract(p);

  vec3 u = quintic(f);

  return mix( mix( mix( dot( srandom3(i + vec3(0.0,0.0,0.0), tileLength), f - vec3(0.0,0.0,0.0)),
                          dot( srandom3(i + vec3(1.0,0.0,0.0), tileLength), f - vec3(1.0,0.0,0.0)), u.x),
                  mix( dot( srandom3(i + vec3(0.0,1.0,0.0), tileLength), f - vec3(0.0,1.0,0.0)),
                          dot( srandom3(i + vec3(1.0,1.0,0.0), tileLength), f - vec3(1.0,1.0,0.0)), u.x), u.y),
              mix( mix( dot( srandom3(i + vec3(0.0,0.0,1.0), tileLength), f - vec3(0.0,0.0,1.0)),
                          dot( srandom3(i + vec3(1.0,0.0,1.0), tileLength), f - vec3(1.0,0.0,1.0)), u.x),
                  mix( dot( srandom3(i + vec3(0.0,1.0,1.0), tileLength), f - vec3(0.0,1.0,1.0)),
                          dot( srandom3(i + vec3(1.0,1.0,1.0), tileLength), f - vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
}

#endif


/*
original_author: Patricio Gonzalez Vivo
description: Fractal Brownian Motion
use: fbm(<vec2> pos)
options:
  FBM_OCTAVES: numbers of octaves. Default is 4.
  FBM_NOISE_FNC(UV): noise function to use Default 'snoise(UV)' (simplex noise)
  FBM_VALUE_INITIAL: initial value. Default is 0.
  FBM_SCALE_SCALAR: scalar. Defualt is 2.
  FBM_AMPLITUD_INITIAL: initial amplitud value. Default is 0.5
  FBM_AMPLITUD_SCALAR: amplitud scalar. Default is 0.5
*/

#ifndef FBM_OCTAVES
#define FBM_OCTAVES 4
#endif

#ifndef FBM_NOISE_FNC
#define FBM_NOISE_FNC(UV) snoise(UV)
#endif

#ifndef FBM_NOISE2_FNC
#define FBM_NOISE2_FNC(UV) FBM_NOISE_FNC(UV)
#endif

#ifndef FBM_NOISE3_FNC
#define FBM_NOISE3_FNC(UV) FBM_NOISE_FNC(UV)
#endif

#ifndef FBM_NOISE_TILABLE_FNC
#define FBM_NOISE_TILABLE_FNC(UV, TILE) gnoise(UV, TILE)
#endif

#ifndef FBM_NOISE3_TILABLE_FNC
#define FBM_NOISE3_TILABLE_FNC(UV, TILE) FBM_NOISE_TILABLE_FNC(UV, TILE)
#endif

#ifndef FBM_NOISE_TYPE
#define FBM_NOISE_TYPE float
#endif

#ifndef FBM_VALUE_INITIAL
#define FBM_VALUE_INITIAL 0.0
#endif

#ifndef FBM_SCALE_SCALAR
#define FBM_SCALE_SCALAR 2.0
#endif

#ifndef FBM_AMPLITUD_INITIAL
#define FBM_AMPLITUD_INITIAL 0.5
#endif

#ifndef FBM_AMPLITUD_SCALAR
#define FBM_AMPLITUD_SCALAR 0.5
#endif

#ifndef FNC_FBM
#define FNC_FBM
FBM_NOISE_TYPE fbm(in vec2 st) {
  // Initial values
  FBM_NOISE_TYPE value = FBM_NOISE_TYPE(FBM_VALUE_INITIAL);
  float amplitud = FBM_AMPLITUD_INITIAL;

  // Loop of octaves
  for (int i = 0; i < FBM_OCTAVES; i++) {
      value += amplitud * FBM_NOISE2_FNC(st);
      st *= FBM_SCALE_SCALAR;
      amplitud *= FBM_AMPLITUD_SCALAR;
  }
  return value;
}

FBM_NOISE_TYPE fbm(in vec3 pos) {
  // Initial values
  FBM_NOISE_TYPE value = FBM_NOISE_TYPE(FBM_VALUE_INITIAL);
  float amplitud = FBM_AMPLITUD_INITIAL;

  // Loop of octaves
  for (int i = 0; i < FBM_OCTAVES; i++) {
      value += amplitud * FBM_NOISE3_FNC(pos);
      pos *= FBM_SCALE_SCALAR;
      amplitud *= FBM_AMPLITUD_SCALAR;
  }
  return value;
}

FBM_NOISE_TYPE fbm(vec3 p, float tileLength) {
  const float persistence = 0.5;
  const float lacunarity = 2.0;

  float amplitude = 0.5;
  float total = 0.0;
  float normalization = 0.0;

  for (int i = 0; i < FBM_OCTAVES; ++i) {
      float noiseValue = FBM_NOISE3_TILABLE_FNC(p, tileLength * lacunarity * 0.5) * 0.5 + 0.5;
      total += noiseValue * amplitude;
      normalization += amplitude;
      amplitude *= persistence;
      p = p * lacunarity;
  }

  return total / normalization;
}
#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description: modulus of 289
use: mod289(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif



/*
original_author: [Ian McEwan, Ashima Arts]
description: permute
use: permute(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description:
use: taylorInvSqrt(<float|vec4> x)
*/

#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT

float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

#endif
/*
original_author: [Ian McEwan, Ashima Arts]
description: grad4, used for snoise(vec4 v)
use: grad4(<float> j, <vec4> ip)
*/

#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

  return p;
}
#endif


/*
original_author: [Ian McEwan, Ashima Arts]
description: Simplex Noise https://github.com/ashima/webgl-noise
use: snoise(<vec2|vec3|vec4> pos)
license: |
  Copyright (C) 2011 Ashima Arts. All rights reserved.
  Copyright (C) 2011-2016 by Stefan Gustavson (Classic noise and others)
  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  Neither the name of the GPUImage framework nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(in vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  // First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


float snoise(in vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                              dot(p2,x2), dot(p3,x3) ) );
}

float snoise(in vec4 v) {
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
                      0.276393202250021,  // 2 * G4
                      0.414589803375032,  // 3 * G4
                      -0.447213595499958); // -1 + 4 * G4

  // First corner
  vec4 i  = floor(v + dot(v, vec4(.309016994374947451)) ); // (sqrt(5) - 1)/4
  vec4 x0 = v -   i + dot(i, C.xxxx);

  // Other corners

  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C.xxxx
  //  x1 = x0 - i1  + 1.0 * C.xxxx
  //  x2 = x0 - i2  + 2.0 * C.xxxx
  //  x3 = x0 - i3  + 3.0 * C.xxxx
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

  // Permutations
  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
              i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
          + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
          + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
          + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

  // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
              + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec2 snoise2( vec2 x ){
  float s  = snoise(vec2( x ));
  float s1 = snoise(vec2( x.y - 19.1, x.x + 47.2 ));
  return vec2( s , s1 );
}

vec3 snoise3( vec3 x ){
  float s  = snoise(vec3( x ));
  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
  return vec3( s , s1 , s2 );
}

vec3 snoise3( vec4 x ){
  float s  = snoise(vec4( x ));
  float s1 = snoise(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
  float s2 = snoise(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
  return vec3( s , s1 , s2 );
}

#endif

/*
original_author: Patricio Gonzalez Vivo
description: returns a 4x4 rotation matrix
use: rotate4dZ(<float> radians)
*/

#ifndef FNC_ROTATE4DZ
#define FNC_ROTATE4DZ
mat4 rotate4dZ(in float psi){
  return mat4(
      vec4(cos(psi),-sin(psi),0.,0),
      vec4(sin(psi),cos(psi),0.,0.),
      vec4(0.,0.,1.,0.),
      vec4(0.,0.,0.,1.));
}
#endif


/*
function: rotateZ
original_author: Patricio Gonzalez Vivo
description: rotate a 2D space by a radian angle
use: rotateZ(<vec3|vec4> pos, float radian [, vec3 center])
options:
- CENTER_3D
*/

#ifndef FNC_ROTATEZ
#define FNC_ROTATEZ
vec4 rotateZ(in vec4 pos, in float radian, in vec4 center) {
  return rotate4dZ(radian) * (pos - center) + center;
}

vec4 rotateZ(in vec4 pos, in float radian) {
  #ifdef CENTER_4D
  return rotateZ(pos, radian, CENTER_3D);
  #else
  return rotateZ(pos, radian, vec4(.0));
  #endif
}

vec3 rotateZ(in vec3 pos, in float radian, in vec3 center) {
  return (rotate4dZ(radian) * vec4(pos - center, 0.) ).xyz + center;
}

vec3 rotateZ(in vec3 pos, in float radian) {
  #ifdef CENTER_3D
  return rotateZ(pos, radian, CENTER_3D);
  #else
  return rotateZ(pos, radian, vec3(.0));
  #endif
}
#endif


vec3 displace(vec3 _pos) {
  float mouseShiftY = (u_mouse.x - _pos.x) * -0.00003;
  float mouseShiftX = (u_mouse.y - _pos.y) * -0.00006;
  float curveZ = cos((_pos.y * 0.3 + 0.55) * HALF_PI) * -0.8;
  float curveX = cos((_pos.y * 0.3 + 0.55) * HALF_PI) * 3.4;
  float curveX2 = sin((_pos.y * 12. + 0.55 + u_time * 0.55) * HALF_PI) * 0.01;
  float curveX3 = sin((_pos.y * 3.2 + 1.55 + u_time * 0.52) * HALF_PI + u_time * 0.25 + u_scrollY * 0.002) * 0.05;
  float curveY = cos(_pos.x * HALF_PI * 0.5 + u_scrollY * 0.0003) * -0.4;
  float curveY2 = sin(u_time * 0.5 + _pos.x * HALF_PI * 3.5 + u_scrollY * 0.005) * 0.02;
  float curveY3 = cos(u_time * 0.9 + _pos.x * HALF_PI * 17.5 + u_scrollY * 0.006) * 0.01;
  _pos.z += curveX + curveX2 + curveX3 + curveY + curveY2 + curveY3;
  _pos.z -= fbm(vec3( _pos.xy * 0.30 + sin(_pos.x * 0.01 - mouseShiftX) * 0.5 + mouseShiftY + u_scrollY * 0.00002, 0.004) ) * 1.0;
  _pos.y -= fbm(vec3( _pos.xy * 0.13 + sin(_pos.x * 0.01 + mouseShiftY) * 0.9 + mouseShiftX + u_scrollY * 0.00002, 0.005) ) * 0.7;
  _pos.y -= fbm(vec3( _pos.xy * 0.13 + sin(_pos.y * 0.01 - mouseShiftY) * 0.9 + mouseShiftX + u_scrollY * 0.00002, 0.005) ) * 1.3;
  _pos.x -= fbm(vec3( _pos.yz * 0.2 + sin(_pos.x * 0.01 - mouseShiftY) * 0.3 + mouseShiftX + u_scrollY * 0.00002 + u_time * 0.02, 0.05) ) * 0.54;
  _pos.x -= curveZ;
  return _pos;
}

void main(void) {
  v_position = position;
  v_normal = normal;
  v_texcoord = uv;

  vec3 pos = displace(v_position.xyz);
  float offset = 0.01;
  v_normal = cross( displace(v_position.xyz - vec3(0.0, offset, 0.0)) - pos, displace(v_position.xyz - vec3(offset, 0.0, 0.0)) - pos  );
  v_position.xyz = pos * 1.55;

  v_position.z -= 4.5;
  v_position.y += 0.2;

  v_tangent = tangent;
  vec3 worldTangent = tangent.xyz;
  vec3 worldBiTangent = cross(v_normal, worldTangent);// * sign(tangent.w);
  v_tangentToWorld = mat3(normalize(worldTangent), normalize(worldBiTangent), normalize(v_normal));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
}

`;
var A = `

precision highp float;

uniform vec2        u_mouse;
uniform float       u_scrollY;
uniform float       u_scrollVelocity;
uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;
uniform float       u_devicePixelScale;
uniform sampler2D   u_tex1;
uniform vec2        u_tex1Resolution;
uniform sampler2D   u_tex2;
uniform sampler2D   u_tex3;
uniform vec3        u_light;
uniform float       u_hueRotation;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec3        v_position;
varying vec3        v_normal;

varying vec2        v_texcoord;

varying vec4        v_tangent;
varying mat3        v_tangentToWorld;

vec3 hue_shift(vec3 color, float dhue) {
	float s = sin(dhue);
	float c = cos(dhue);
	return (color * c) + (color * s) * mat3(
		vec3(0.167444, 0.329213, -0.496657),
		vec3(-0.327948, 0.035669, 0.292279),
		vec3(1.250268, -1.047561, -0.202707)
	) + dot(vec3(0.299, 0.587, 0.114), color) * (1.0 - c);
}

/*
original_author: Patricio Gonzalez Vivo
description: decimate a value with an specific presicion
use: decimate(<float|vec2|vec3|vec4> value, <float|vec2|vec3|vec4> presicion)
*/

#ifndef FNC_DECIMATION
#define FNC_DECIMATION

#define decimate(value, presicion) (floor(value * presicion)/presicion)

#endif
/*
original_author: Patricio Gonzalez Vivo
description: scale a 2D space variable
use: scale(<vec2> st, <vec2|float> scale_factor [, <vec2> center])
options:
  - CENTER
  - CENTER_2D
  - CENTER_3D
*/

#ifndef FNC_SCALE
#define FNC_SCALE
float scale(in float st, in float s, in float center) {
  return (st - center) * s + center;
}

float scale(in float st, in float s) {
  #ifdef CENTER_2D
  return scale(st,  s, CENTER);
  #else
  return scale(st,  s, .5);
  #endif
}


vec2 scale(in vec2 st, in vec2 s, in vec2 center) {
  return (st - center) * s + center;
}

vec2 scale(in vec2 st, in float value, in vec2 center) {
  return scale(st, vec2(value), center);
}

vec2 scale(in vec2 st, in vec2 s) {
  #ifdef CENTER_2D
  return scale(st,  s, CENTER_2D);
  #else
  return scale(st,  s, vec2(.5));
  #endif
}

vec2 scale(in vec2 st, in float value) {
  return scale(st, vec2(value));
}

vec3 scale(in vec3 st, in vec3 s, in vec3 center) {
  return (st - center) * s + center;
}

vec3 scale(in vec3 st, in float value, in vec3 center) {
  return scale(st, vec3(value), center);
}

vec3 scale(in vec3 st, in vec3 s) {
  #ifdef CENTER_3D
  return scale(st,  s, CENTER_3D);
  #else
  return scale(st,  s, vec3(.5));
  #endif
}

vec3 scale(in vec3 st, in float value) {
  return scale(st, vec3(value));
}
#endif

/*
original_author: Patricio Gonzalez Vivo
description: pass a value and get some random normalize value between 0 and 1
use: float random[2|3](<float|vec2|vec3> value)
*/

#ifndef FNC_RANDOM
#define FNC_RANDOM
float random(in float x) {
return fract(sin(x) * 43758.5453);
}

float random(in vec2 st) {
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float random(in vec3 pos) {
return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

float random(in vec4 pos) {
  float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
  return fract(sin(dot_product) * 43758.5453);
}

// Hash function from https://www.shadertoy.com/view/4djSRW
#ifndef RANDOM_SCALE3
#define RANDOM_SCALE3 vec3(.1031, .1030, .0973)
#endif

#ifndef RANDOM_SCALE4
#define RANDOM_SCALE4 vec4(1031, .1030, .0973, .1099)
#endif
vec2 random2(float p) {
  vec3 p3 = fract(vec3(p) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec2 random2(vec2 p) {
  vec3 p3 = fract(p.xyx * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec2 random2(vec3 p3) {
  p3 = fract(p3 * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx+19.19);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec3 random3(float p) {
  vec3 p3 = fract(vec3(p) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yzx+19.19);
  return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 random3(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * RANDOM_SCALE3);
  p3 += dot(p3, p3.yxz+19.19);
  return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 random3(vec3 p) {
  p = fract(p * RANDOM_SCALE3);
  p += dot(p, p.yxz+19.19);
  return fract((p.xxy + p.yzz)*p.zyx);
}

vec4 random4(float p) {
  vec4 p4 = fract(vec4(p) * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec2 p) {
  vec4 p4 = fract(vec4(p.xyxy) * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec3 p) {
  vec4 p4 = fract(vec4(p.xyzx)  * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

vec4 random4(vec4 p4) {
  p4 = fract(p4  * RANDOM_SCALE4);
  p4 += dot(p4, p4.wzxy+19.19);
  return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}


#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description: modulus of 289
use: mod289(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif



/*
original_author: [Ian McEwan, Ashima Arts]
description: permute
use: permute(<float|vec2|vec3|vec4> x)
*/

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif

/*
original_author: [Ian McEwan, Ashima Arts]
description:
use: taylorInvSqrt(<float|vec4> x)
*/

#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT

float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

#endif
/*
original_author: [Ian McEwan, Ashima Arts]
description: grad4, used for snoise(vec4 v)
use: grad4(<float> j, <vec4> ip)
*/

#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

  return p;
}
#endif


/*
original_author: [Ian McEwan, Ashima Arts]
description: Simplex Noise https://github.com/ashima/webgl-noise
use: snoise(<vec2|vec3|vec4> pos)
license: |
  Copyright (C) 2011 Ashima Arts. All rights reserved.
  Copyright (C) 2011-2016 by Stefan Gustavson (Classic noise and others)
  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  Neither the name of the GPUImage framework nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(in vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  // First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


float snoise(in vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                              dot(p2,x2), dot(p3,x3) ) );
}

float snoise(in vec4 v) {
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
                      0.276393202250021,  // 2 * G4
                      0.414589803375032,  // 3 * G4
                      -0.447213595499958); // -1 + 4 * G4

  // First corner
  vec4 i  = floor(v + dot(v, vec4(.309016994374947451)) ); // (sqrt(5) - 1)/4
  vec4 x0 = v -   i + dot(i, C.xxxx);

  // Other corners

  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C.xxxx
  //  x1 = x0 - i1  + 1.0 * C.xxxx
  //  x2 = x0 - i2  + 2.0 * C.xxxx
  //  x3 = x0 - i3  + 3.0 * C.xxxx
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

  // Permutations
  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
              i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
          + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
          + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
          + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

  // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
              + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec2 snoise2( vec2 x ){
  float s  = snoise(vec2( x ));
  float s1 = snoise(vec2( x.y - 19.1, x.x + 47.2 ));
  return vec2( s , s1 );
}

vec3 snoise3( vec3 x ){
  float s  = snoise(vec3( x ));
  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
  return vec3( s , s1 , s2 );
}

vec3 snoise3( vec4 x ){
  float s  = snoise(vec4( x ));
  float s1 = snoise(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
  float s2 = snoise(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
  return vec3( s , s1 , s2 );
}

#endif

#ifndef SAMPLER_FNC

#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif

#endif

// #ifndef FNC_SAMPLE
// #define FNC_SAMPLE
// vec4 sample(sampler2D tex, vec2 uv) { return SAMPLER_FNC(tex, uv); }
// #endif

/*
original_author: Patricio Gonzalez Vivo
description: fakes a clamp to edge texture
use: <vec4> sampleClamp2edge(<sampler2D> tex, <vec2> st [, <vec2> texResolution]);
options:
  - SAMPLER_FNC(TEX, UV)
*/

#ifndef FNC_SAMPLECLAMP2EDGE
#define FNC_SAMPLECLAMP2EDGE
vec4 sampleClamp2edge(sampler2D tex, vec2 st, vec2 texResolution) {
  vec2 pixel = 1.0/texResolution;
  return SAMPLER_FNC( tex, clamp(st, pixel, 1.0-pixel) );
}

vec4 sampleClamp2edge(sampler2D tex, vec2 st) {
  return SAMPLER_FNC( tex, clamp(st, vec2(0.01), vec2(0.99) ) );
}
#endif
#ifndef SAMPLER_FNC

#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif

#endif

// #ifndef FNC_SAMPLE
// #define FNC_SAMPLE
// vec4 sample(sampler2D tex, vec2 uv) { return SAMPLER_FNC(tex, uv); }
// #endif

/*
original_author: [Patricio Gonzalez Vivo, Johan Ismael]
description: Samples multiple times a texture in the specified direction
use: stretch(<sampler2D> tex, <vec2> st, <vec2> direction [, int samples])
options:
  - SAMPLER_FNC(TEX, UV): optional depending the target version of GLSL (texture2D(...) or texture(...))
  - STRETCH_SAMPLES: number of samples taken, defaults to 20
  - STRETCH_TYPE: return type, defauls to vec4
  - STRETCH_SAMPLER_FNC(TEX, UV): function used to sample the input texture, defaults to texture2D(tex, TEX, UV)
  - STRETCH_WEIGHT: shaping equation to multiply the sample weight.
*/

#ifndef STRETCH_SAMPLES
#define STRETCH_SAMPLES 20
#endif

#ifndef STRETCH_TYPE
#define STRETCH_TYPE vec4
#endif

#ifndef STRETCH_SAMPLER_FNC
#define STRETCH_SAMPLER_FNC(TEX, UV) SAMPLER_FNC(TEX, UV)
#endif

#ifndef FNC_STRETCH
#define FNC_STRETCH
STRETCH_TYPE stretch(in sampler2D tex, in vec2 st, in vec2 direction, const int i_samples) {
  float f_samples = float(i_samples);
  STRETCH_TYPE color = STRETCH_TYPE(0.);

  #ifdef PLATFORM_WEBGL
  for (int i = 0; i < 50; i++) {
      if (i == i_samples) break;
  #else
  for (int i = 0; i < i_samples; i++) {
  #endif

      float f_sample = float(i);
      STRETCH_TYPE tx = STRETCH_SAMPLER_FNC(tex, st + direction * f_sample);
      #ifdef STRETCH_WEIGHT
      tx *= STRETCH_WEIGHT;
      #endif
      color += tx;
  }
  return color / f_samples;
}

STRETCH_TYPE stretch(in sampler2D tex, in vec2 st, in vec2 direction) {
  float f_samples = float(STRETCH_SAMPLES);
  STRETCH_TYPE color = STRETCH_TYPE(0.);
  for (int i = 0; i < STRETCH_SAMPLES; i++) {
      float f_sample = float(i);
      STRETCH_TYPE tx = STRETCH_SAMPLER_FNC(tex, st + direction * f_sample);
      #ifdef STRETCH_WEIGHT
      tx *= STRETCH_WEIGHT;
      #endif
      color += tx;
  }
  return color / f_samples;
}
#endif

#ifndef SAMPLER_FNC

#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif

#endif

// #ifndef FNC_SAMPLE
// #define FNC_SAMPLE
// vec4 sample(sampler2D tex, vec2 uv) { return SAMPLER_FNC(tex, uv); }
// #endif

/*
original_author: Patricio Gonzalez Vivo
description: sample a texture with a looping flow animation, using a direction to push, an elapse time and a cycle.
use: sampleFlow(<sampler2D> tex, <vec2> st, <vec2> dir, <float> time, <float> cycle)
options:
  - SAMPLER_FNC(TEX, UV): optional depending the target version of GLSL (texture2D(...) or texture(...))
*/

#ifndef FNC_SAMPLEFLOW
#define FNC_SAMPLEFLOW
vec4 sampleFlow(sampler2D tex, vec2 st, vec2 dir, float time, float cycle) {
  float halfCycle = cycle * 0.5;

  float flowOffset0 = mod(time, cycle);
  float flowOffset1 = mod(time + halfCycle, cycle);

  float phase0 = flowOffset0;
  float phase1 = flowOffset1;

  // Sample normal map.
  vec4 A = SAMPLER_FNC(tex, (st + dir * phase0) );
  vec4 B = SAMPLER_FNC(tex, (st + dir * phase1) );

  float f = (abs(halfCycle - flowOffset0) / halfCycle);
  return mix( A, B, f );
}
#endif


vec3 A = vec3(0.4, 0.45, 0.94);
vec3 B = vec3(0.43, 0.68, 0.87);

void main(void) {
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  float scrollShift = u_scrollY * 0.0008;
  color.rg = v_texcoord;

  vec2 pixel = 1.0/u_resolution;
  vec2 st = vec2(gl_FragCoord.xy * pixel);

  float myScreenWidth = 1713.;
  float myScreenHeight = 1000.;
  float textMarginTop = 300. * pow(u_devicePixelScale, 5.);
  float screenAspect = u_resolution.x / u_resolution.y;
  float imageAspect = 2.;
  float screenScaleX = u_resolution.x / myScreenWidth;
  float screenScaleY = u_resolution.y / myScreenHeight;
  float screenImageRatioX = u_resolution.x / u_tex0Resolution.x;
  float screenImageRatioY = u_resolution.y / u_tex0Resolution.y;
  float imageScale = min(1.0, u_resolution.x / u_tex0Resolution.x) * u_devicePixelScale;
  float imageWidth = u_tex0Resolution.x * imageScale;
  float imageHeight = u_tex0Resolution.y * imageScale;
  float textOffsetX = (u_resolution.x - imageWidth) / imageWidth / 2. * imageScale / u_devicePixelScale;
  float textOffsetY = (u_resolution.y - imageHeight) / imageHeight * imageScale - textMarginTop / (u_resolution.y / screenScaleY);
  float textX = st.x * screenScaleX / imageScale - textOffsetX;
  float textY = st.y * screenScaleY / imageScale * 1.176 - textOffsetY / 1.06 / imageScale;
  float dissolve = max(0.0, random(st) * (scrollShift) * 0.75);
  float textScale = (1. + scrollShift * -1.0);
  float textShiftX = scrollShift * (sin(st.x * 7.));
  float textShiftY = scrollShift * sin(st.x * 5.) + scrollShift;
  float text = texture2D(u_tex0, vec2(textX * textScale + dissolve - textShiftX, textY * textScale - textShiftY)).r;
  // float text = texture2D(u_tex0, vec2(textX, textY)).r;

  vec2 uv = v_texcoord.yx;
  uv.x = 1.0-uv.x;

  // directional light
  vec3 light_dir = u_light;

  // directional light
  vec3 light_dir_bottom = vec3(u_light.x * -1.2, u_light.y * -2., u_light.z * -3.);

  // This extra UV set is for animating a rolling texture. vec2(4.0, 2.0) is the scale and 0.05 the speed
  vec2 uv2 = uv * vec2(2.0, 3.5) - vec2(u_time * 0.004, 0.0);
  uv2.y += sin(uv.x + u_time * 0.2) * 0.1;

  vec2 uv3 = uv * vec2(51.0, 5.5) - vec2(u_time * 0.004, 0.0);
  uv3.y += sin(uv.x + u_time * 0.2) * 0.4;

  // Load the normals
  vec3 normalmap = texture2D(u_tex2, uv2).yxz * 2.0 - 1.0;
  vec3 normal = v_tangentToWorld * normalmap;

  vec3 noisemap = texture2D(u_tex3, vec2(uv3.x, uv3.y)).yxz * 2.0 - 1.0;
  vec3 noise = v_tangentToWorld * noisemap;

  // Manually sample the Albedo color texture
  color = texture2D(u_tex1, vec2(uv2.x, uv2.y));

  // Very basic shading
  color.r += pow(1.0 - dot(normal * 0.13, light_dir) * 3.8, 1.3) * 0.16;
  color.g += pow(1.0 - dot(normal * 0.15, light_dir) * 3.9, 1.2) * 0.16;
  color.b += pow(1.0 - dot(normal * 0.9, light_dir) * 2.5, 1.1) * 0.19;
  color.r -= pow(1.0 - dot(noise * 0.13, light_dir) * 3.8, 1.3) * 0.06;
  color.g -= pow(1.0 - dot(noise * 0.14, light_dir) * 3.9, 1.2) * 0.06;
  color.b -= pow(1.0 - dot(noise * 0.15, light_dir) * 2.5, 1.1) * 0.08;
  color.rgb = clamp(color.rgb, 0.01, 0.98);
  color.r = clamp(color.r, 0.24, 0.8);
  color.g = clamp(color.g, 0.04, 0.8);
  color.b = clamp(color.b, 0.6, 0.98);
  color.g += uv2.y * 0.06;

  // highlight the edge
  color.rgb += (1. - smoothstep(pow((uv2.y - sin(uv.x + u_time * 0.2) * 0.1) * 0.5, 2.), 0.00006, 0.0001)) * 0.2;
  color.rgb += (1. - smoothstep(pow((uv2.y - sin(uv.x + u_time * 0.2) * 0.1) * 0.5, 2.), 0.00002, 0.0008)) * 0.15;
  color.rgb += (1. - smoothstep(pow((uv2.y - sin(uv.x + u_time * 0.2) * 0.1) * 0.5, 2.), 0.0, 0.00003)) * 0.3;

  // if the mask is not the text is gray otherwise is full white
  color.rgb = mix(mix(color.rgb, vec3(0.95), clamp(1.0 - scrollShift * 4., 0.0, 1.0)),
  color.rgb,
  text);

  color.rgb = hue_shift(color.rgb, u_hueRotation);
  gl_FragColor = color;
}
`;
var z = class extends d {
  constructor() {
    super(...arguments);
    this.sessionsTextureLoadCount = 0;
    this.sessionsWaveTexturesLoaded = !1;
    this.initialized = !1;
    this.userState = { prop: "", propParam: 0 };
    this.isHero = document.querySelector(".Sessions23Wave--isHero") !== null;
    this.scrollY = window.scrollY;
    this.newScrollY = window.scrollY;
    this.scrollVelocity = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.timeScale = 3.5;
    this.fps = 60;
    this.fpsRatio = 1;
    this.skipFrame = 0;
    this.colorFrame = 0;
    this.isTouchScreen = !1;
    this.isScrolling = !1;
    this.isSmallScreen = !1;
    this.hasDispatchedHighPerformanceEvent = !1;
    this.blankTextureSrc =
      "https://images.ctfassets.net/fzn2n1nzq965/29khQTOKKH9yzcPGGtATkS/b4fd68220e99248739caa8e4464e8687/white.png";
    this.sessionsTextureSrc = this.isHero
      ? "https://images.ctfassets.net/fzn2n1nzq965/1loYptcWT447BLbZ8ZK8Dw/dba58eaf79655065db56992e43b169de/sessions_bw.png"
      : this.blankTextureSrc;
    this.noiseTextureSrc =
      "https://images.ctfassets.net/fzn2n1nzq965/7MCxeOrQAw5EX4i8t5wxfW/9c4a0a86254713c2a9f17f17aace3075/sessions_noise.png";
    this.normalsTextureSrc =
      "https://images.ctfassets.net/fzn2n1nzq965/1zkh9sA1qvX2nw5LRUqLak/cb10bc091e16c559380a0e1490441b1a/sessions_normals.png";
    this.linesTextureSrc =
      "https://images.ctfassets.net/fzn2n1nzq965/2ZLSpeMHtztRQrLy8wiBxU/0ea8aaec1a232d36759e03c2030ae81b/sessions_texture.png";
    this.sessionsTextureLoaded = () => {
      (this.sessionsTextureLoadCount += 1),
        this.sessionsTextureLoadCount === 4 &&
          !this.sessionsWaveTexturesLoaded &&
          ((this.sessionsWaveTexturesLoaded = !0),
          document.body.classList.add("Sessions23Wave--isLoaded"));
    };
    this.sessionsTexture = new n().load(
      this.sessionsTextureSrc,
      this.sessionsTextureLoaded
    );
    this.linesTexture = new n().load(
      this.linesTextureSrc,
      this.sessionsTextureLoaded
    );
    this.normalsTexture = new n().load(
      this.normalsTextureSrc,
      this.sessionsTextureLoaded
    );
    this.noiseTexture = new n().load(
      this.noiseTextureSrc,
      this.sessionsTextureLoaded
    );
    this.uniforms = {
      u_time: { type: "f", value: 1 },
      u_resolution: { type: "v2", value: new s() },
      u_mouse: { type: "v2", value: new s() },
      u_hueRotation: { type: "f", value: 0 },
      u_scrollY: { type: "f", value: 0 },
      u_scrollVelocity: { type: "f", value: 0 },
      u_tex0: { type: "t", value: this.sessionsTexture },
      u_devicePixelScale: { type: "f", value: 1 },
      u_tex0Resolution: {
        type: "v2",
        value: new s(
          1712 / window.devicePixelRatio,
          856 / window.devicePixelRatio
        ),
      },
      u_tex1: { type: "t", value: this.linesTexture },
      u_tex1Resolution: { type: "v2", value: new s(3840, 1080) },
      u_tex2: { type: "t", value: this.normalsTexture },
      u_tex3: { type: "t", value: this.noiseTexture },
      u_light: { type: "v3", value: new l(5.2, 3.6, 2.4) },
      u_hueShift: { type: "v3", value: new l(1, 1, 1) },
      u_widthScale: { type: "f", value: 1 },
      u_heightScale: { type: "f", value: 1 },
      u_frequency: { type: "f", value: 1 },
    };
    this.renderer = new _();
    this.canvas = this.renderer.domElement;
    this.camera = new y(
      75,
      document.body.clientWidth / window.innerHeight,
      0.1,
      1e3
    );
    this.clock = new S();
    this.scene = new E();
    this.stripeGeometry = new p(2, 10, 50, 400);
    this.textGeometry = new p(220, 160);
    this.textMaterial = new v({
      uniforms: this.uniforms,
      vertexShader: T,
      fragmentShader: C,
    });
    this.stripeMaterial = new v({
      uniforms: this.uniforms,
      vertexShader: R,
      fragmentShader: A,
      side: m,
    });
    this.stripeMesh = new x(this.stripeGeometry, this.stripeMaterial);
    this.textMesh = new x(this.textGeometry, this.textMaterial);
    this.disconnect = () => {
      window.removeEventListener("touchstart", this.touchstarthandler),
        window.removeEventListener("keydown", this.keydownhandler),
        window.removeEventListener("resize", this.resizehandler),
        window.removeEventListener("mousemove", this.mousemovehandler),
        window.removeEventListener("scroll", this.scrollhandler),
        window.removeEventListener("wheel", this.wheelhandler);
    };
    this.scrollhandler = () => {
      if (
        window.location.search.includes("instrument") &&
        this.userState.prop !== ""
      )
        return;
      (this.isScrolling = !0),
        clearTimeout(this.scrollTimeout),
        (this.scrollTimeout = setTimeout(() => {
          this.isScrolling = !1;
        }, 200)),
        (this.newScrollY = window.scrollY);
      let e = scrollY - this.newScrollY;
      (this.scrollVelocity *= 0.2 * (this.scrollVelocity - e)),
        (this.uniforms.u_scrollY.value = this.newScrollY),
        (this.uniforms.u_scrollVelocity.value = this.scrollVelocity),
        (this.scrollY = this.newScrollY),
        this.el.dispatchEvent(
          new CustomEvent("Wave:scroll", { detail: this.scrollY, bubbles: !0 })
        );
    };
    this.wheelhandler = (e) => {
      if (!window.location.search.includes("instrument")) return;
      let t = e.deltaY * 0.001;
      switch (this.userState.prop) {
        case "light":
          this.userState.propParam === 0
            ? (this.uniforms.u_light.value.x += t)
            : this.userState.propParam === 1
            ? (this.uniforms.u_light.value.y += t)
            : this.userState.propParam === 2 &&
              (this.uniforms.u_light.value.z += t),
            o.info(`light: ${this.uniforms.u_light.value.x},
          ${this.uniforms.u_light.value.y},
          ${this.uniforms.u_light.value.z},
        `);
          break;
        case "rotation":
          this.userState.propParam === 0
            ? (this.stripeMesh.rotation.x += t)
            : this.userState.propParam === 1
            ? (this.stripeMesh.rotation.y += t)
            : this.userState.propParam === 2 &&
              (this.stripeMesh.rotation.z += t),
            o.info(`rotation: ${this.stripeMesh.rotation.x},
          ${this.stripeMesh.rotation.y},
          ${this.stripeMesh.rotation.z}
        `);
          break;
        case "position":
          this.userState.propParam === 0
            ? (this.stripeMesh.position.x += t)
            : this.userState.propParam === 1
            ? (this.stripeMesh.position.y += t)
            : this.userState.propParam === 2 &&
              (this.stripeMesh.position.z += t),
            o.info(`position: ${this.stripeMesh.position.x},
          ${this.stripeMesh.position.y},
          ${this.stripeMesh.position.z},
        }`);
          break;
        case "widthScale":
          (this.stripeMesh.scale.x += t * 0.03),
            o.info(`widthScale: ${this.stripeMesh.scale.x}`);
          break;
        case "heightScale":
          (this.stripeMesh.scale.y += t * 0.03),
            o.info(`heightScale: ${this.stripeMesh.scale.y}`);
          break;
        case "frequency":
          (this.uniforms.u_frequency.value += t * 0.1),
            o.info(`frequency: ${this.uniforms.u_frequency.value}`);
          break;
        case "speed":
          (this.timeScale += t), o.info(`speed: ${this.timeScale}`);
          break;
        case "color":
          this.userState.propParam === 0
            ? (this.uniforms.u_hueShift.value.x = Math.max(
                Math.min(5, this.uniforms.u_hueShift.value.x + t * 0.1),
                0
              ))
            : this.userState.propParam === 1
            ? (this.uniforms.u_hueShift.value.y = Math.max(
                Math.min(5, this.uniforms.u_hueShift.value.y + t * 0.1),
                0
              ))
            : this.userState.propParam === 2 &&
              (this.uniforms.u_hueShift.value.z = Math.max(
                Math.min(5, this.uniforms.u_hueShift.value.z + t * 0.1),
                0
              )),
            o.info(`hueShift: ${this.uniforms.u_hueShift.value}`);
          break;
        default:
          break;
      }
    };
    this.mousemovehandler = (e) => {
      this.isHero &&
        ((this.mouseX = e.pageX * -1), (this.mouseY = e.pageY - scrollY));
    };
    this.touchstarthandler = () => {
      this.isTouchScreen = !0;
    };
    this.keydownhandler = (e) => {
      !window.location.search.includes("instrument") ||
        (e.key === "x" || e.key === "Escape"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = ""),
            (document.body.style.overflow = "auto"))
          : e.key === "l"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "light"),
            (document.body.style.overflow = "hidden"))
          : e.key === "r"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "rotation"),
            (document.body.style.overflow = "hidden"))
          : e.key === "p"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "position"),
            (document.body.style.overflow = "hidden"))
          : e.key === "c"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "color"),
            (document.body.style.overflow = "hidden"))
          : e.key === "f"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "frequency"),
            (document.body.style.overflow = "hidden"))
          : e.key === "h"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "heightScale"),
            (document.body.style.overflow = "hidden"))
          : e.key === "w"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "widthScale"),
            (document.body.style.overflow = "hidden"))
          : e.key === "s"
          ? ((this.userState.propParam = 0),
            (this.userState.prop = "speed"),
            (document.body.style.overflow = "hidden"))
          : e.key === "1"
          ? (this.userState.propParam = 0)
          : e.key === "2"
          ? (this.userState.propParam = 1)
          : e.key === "3" && (this.userState.propParam = 2));
    };
    this.resizehandler = () => {
      let e = document.body.clientWidth;
      if (
        ((this.isSmallScreen = window.innerWidth < 900),
        this.isTouchScreen && this.isScrolling)
      )
        return;
      let t = window.innerHeight;
      (this.canvas.width = e),
        (this.canvas.height = t),
        (this.uniforms.u_resolution.value.x = e),
        (this.uniforms.u_resolution.value.y = t),
        (this.uniforms.u_tex0Resolution.value.x =
          1712 / window.devicePixelRatio),
        (this.uniforms.u_tex0Resolution.value.y =
          856 / window.devicePixelRatio),
        (this.uniforms.u_devicePixelScale.value = window.devicePixelRatio / 2),
        this.renderer.setSize(e, t),
        (this.camera.aspect = e / t),
        this.renderer.setPixelRatio(window.devicePixelRatio),
        this.camera.updateProjectionMatrix(),
        (this.stripeMesh.position.x = this.isSmallScreen ? 1.95 : 2.15),
        (this.stripeMesh.rotation.z = this.isSmallScreen
          ? -0.73 - (window.innerWidth / 400) * 0.2
          : -0.93);
    };
    this.initialize = () => {
      (this.initialized = !0),
        this.scene.add(this.camera),
        (this.camera.position.z = 3),
        (this.camera.position.x = 1),
        (this.camera.position.y = 1),
        (this.camera.rotation.y = 0.5),
        (window.devicePixelRatio = 2),
        this.stripeGeometry.computeVertexNormals(),
        this.stripeGeometry.computeTangents(),
        (this.normalsTexture.anisotropy = 2),
        (this.noiseTexture.anisotropy = 2),
        (this.linesTexture.anisotropy = 2),
        (this.linesTexture.wrapS = r),
        (this.normalsTexture.wrapS = r),
        (this.noiseTexture.wrapS = r),
        (this.linesTexture.wrapT = r),
        (this.normalsTexture.wrapT = r),
        (this.noiseTexture.wrapT = r),
        (this.stripeMesh.rotation.z = this.isSmallScreen
          ? -0.73 - (window.innerWidth / 400) * 0.2
          : -0.93),
        (this.stripeMesh.rotation.y = this.isHero ? -0.3 : -0.2),
        (this.stripeMesh.rotation.x = Math.PI / 1.2),
        (this.stripeMesh.position.x = this.isSmallScreen ? 1.95 : 2.15),
        (this.stripeMesh.position.y = this.isHero ? -0.8 : -2.2),
        (this.stripeMesh.position.z = this.isHero ? 1.5 : 2),
        (this.textMesh.position.z = -10),
        this.scene.add(this.stripeMesh),
        this.isHero && this.scene.add(this.textMesh),
        this.renderer.setPixelRatio(window.devicePixelRatio),
        this.renderer.setClearColor(15921906, 1),
        (this.scene.background = new h(15921906)),
        document.querySelector(".Sessions23Wave").appendChild(this.canvas),
        this.animate();
    };
    this.animate = (e = 0) => {
      let t = this.newScrollY - scrollY;
      (this.scrollVelocity += 0.2 * (t - this.scrollVelocity)),
        (this.uniforms.u_scrollY.value = this.newScrollY),
        (this.uniforms.u_scrollVelocity.value = this.scrollVelocity),
        (this.uniforms.u_mouse.value.x +=
          0.02 * (this.mouseX - this.uniforms.u_mouse.value.x)),
        (this.uniforms.u_mouse.value.y +=
          0.02 * (this.mouseY - this.uniforms.u_mouse.value.y)),
        (this.scrollY = this.newScrollY);
      let a = e;
      if (
        (this.timeScale > 0.501 &&
          ((this.camera.position.x += 0.009 * (0 - this.camera.position.x)),
          (this.camera.position.y += 0.009 * (0 - this.camera.position.y)),
          (this.camera.rotation.y += 0.009 * (0 - this.camera.rotation.y)),
          (this.uniforms.u_light.value.x +=
            0.009 * (3.2 - this.uniforms.u_light.value.x)),
          (this.uniforms.u_light.value.y +=
            0.009 * (1.6 - this.uniforms.u_light.value.y)),
          (this.uniforms.u_light.value.z +=
            0.009 * (0.4 - this.uniforms.u_light.value.z)),
          (this.timeScale += 0.009 * (0.5 - this.timeScale))),
        (this.uniforms.u_time.value +=
          this.clock.getDelta() * this.timeScale * this.fpsRatio),
        this.sessionsWaveTexturesLoaded)
      ) {
        a = performance.now();
        let c = a - e;
        if (c >= 8 && c <= 33) {
          let i = 1e3 / c / this.fps;
          this.fpsRatio += (i - this.fpsRatio) * 0.05;
        }
        if (
          (!this.hasDispatchedHighPerformanceEvent &&
            this.fpsRatio > 1.5 &&
            (this.el.dispatchEvent(
              new CustomEvent("Wave:highPerformant", { bubbles: !0 })
            ),
            (this.hasDispatchedHighPerformanceEvent = !0)),
          (this.fpsRatio > 1.5 ||
            this.skipFrame % 2 == 0 ||
            this.isSmallScreen ||
            this.isTouchScreen) &&
            this.renderer.render(this.scene, this.camera),
          this.skipFrame % 8 == 0 && !this.isScrolling)
        ) {
          this.colorFrame += 1;
          let i = (Math.sin(this.colorFrame * 0.025 - 2.14) * 65 + 45) / 360;
          this.uniforms.u_hueRotation.value = i * -3;
          // console.log(i);
          let N = `hsl(${205 + i * 255}, 97%, 62%)`,
            I = `hsl(${243 + i * 255}, 100%, 68%)`,
            w = `hsl(${205 + i * 255}, 87%, 52%)`,
            g = `hsl(${243 + i * 255}, 100%, 64%)`,
            L = `hsl(${202 + i * 255}, 73%, 69%)`,
            O = `hsl(${235 + i * 255}, 95%, 67%)`;
          document.body.style.setProperty("--buttonGradientStart", N),
            document.body.style.setProperty("--buttonGradientEnd", I),
            document.body.style.setProperty("--buttonGradientStartHover", w),
            document.body.style.setProperty("--buttonGradientEndHover", g),
            document.body.style.setProperty("--textGradientStart", L),
            document.body.style.setProperty("--textGradientEnd", O);
        }
      }
      requestAnimationFrame(() => {
        (this.skipFrame += 1), this.animate(a);
      });
    };
  }
  connect() {
    return f(this, null, function* () {
      document.querySelector(".Sessions23Wave canvas") ||
        (this.initialize(),
        window.addEventListener("touchstart", this.touchstarthandler),
        window.addEventListener("keydown", this.keydownhandler),
        window.addEventListener("resize", this.resizehandler),
        window.addEventListener("mousemove", this.mousemovehandler),
        window.addEventListener("scroll", this.scrollhandler),
        window.addEventListener("wheel", this.wheelhandler),
        this.resizehandler());
    });
  }
};
u.register("SessionsWave", z);
export { z as SessionsWave };
