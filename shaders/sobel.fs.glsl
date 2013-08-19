#include "packing.include.glsl"
#include "index.include.glsl"
#line 3

uniform sampler2D uTexture;

void main() {
  vec4 gx =
    (getd(uTexture, -1, -1) - getd(uTexture, 1, -1)) +
    (getd(uTexture, -1, 0) - getd(uTexture, 1, 0)) * 2.0 +
    (getd(uTexture, -1, 1) - getd(uTexture, 1, 1));
  vec4 gy =
    (getd(uTexture, -1, -1) - getd(uTexture, -1, 1)) +
    (getd(uTexture, 0, -1) - getd(uTexture, 0, 1)) * 2.0 +
    (getd(uTexture, 1, -1) - getd(uTexture, 1, 1));
  gl_FragColor = 1.0 - sqrt(gx * gx + gy * gy);
}