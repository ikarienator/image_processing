#include "packing.include.glsl"
#include "index.include.glsl"
#line 3

uniform sampler2D texture0;

void main() {
  vec4 color = vec4(0);
  color += getd(texture0, 0, -1) * 0.25;
  color += getd(texture0, 0, 0) * 0.5;
  color += getd(texture0, 0, 1) * 0.25;
  gl_FragColor = color;
}