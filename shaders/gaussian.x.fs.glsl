#include "packing.include.glsl"
#include "index.include.glsl"
#line 3

uniform sampler2D uTexture;

void main() {
  vec4 color = vec4(0);
  color += getd(uTexture, -4, 0) * 0.05;
  color += getd(uTexture, -3, 0) * 0.09;
  color += getd(uTexture, -2, 0) * 0.12;
  color += getd(uTexture, -1, 0) * 0.15;
  color += getd(uTexture, 0, 0) * 0.16;
  color += getd(uTexture, 1, 0) * 0.15;
  color += getd(uTexture, 2, 0) * 0.12;
  color += getd(uTexture, 3, 0) * 0.09;
  color += getd(uTexture, 4, 0) * 0.05;
  gl_FragColor = color;
}