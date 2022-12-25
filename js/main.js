var renderer = new Renderer(document.getElementById('webgl-canvas'))
renderer.setClearColor(100, 149, 237)
var gl = renderer.getContext()

var objects = []

Mesh.load(gl, 'pokeball-webgl/assets/pokeball.txt')
    .then(function (mesh) {
      objects.push(mesh)
    })

ShaderProgram.load(gl, 'pokeball-webgl/shaders/basic.vert', 'pokeball-webgl/shaders/basic.frag')
            .then(function (shader) {
              renderer.setShader(shader)
            })

var camera = new Camera()
camera.setOrthographic(16, 10, 10)
var light = new Light()

loop()

function loop () {
  renderer.render(camera, light, objects)
  camera.position = camera.position.rotateY(Math.PI / 120)
  requestAnimationFrame(loop)
}
