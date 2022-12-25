#ifdef GL_ES
precision highp float;
#endif

uniform vec3 lightDirection;
uniform float ambientLight;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vColor;

void main() {
    float lightness = -clamp(dot(normalize(vNormal), normalize(lightDirection)), -1., 0.);
    lightness = ambientLight + (1. - ambientLight) * lightness;
    gl_FragColor = vec4(vColor* lightness, 1.);
}
