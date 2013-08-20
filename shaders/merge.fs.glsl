#include "packing.include.glsl"
#include "index.include.glsl"
#line 3

uniform sampler2D texture0, texture1;

void main() {
  vec4 sobelpx = getd(texture0, 0, 0);
  vec3 color = getd(texture1, 0, 0).xyz * sobelpx.xyz;
  float sobel = clamp(smoothstep(0.7, 1.0, dot(sobelpx, sobelpx) / 4.0) + 0.5, 0.0, 1.0);
  gl_FragColor = vec4(color * (sobel + 0.3) / 1.3, 1);
}