function Mesh (gl, geometry) {
  var vertexCount = geometry.vertexCount()
  this.positions = new VBO(gl, geometry.positions(), vertexCount)
  this.normals = new VBO(gl, geometry.normals(), vertexCount)
  this.uvs = new VBO(gl, geometry.uvs(), vertexCount)
  this.colors = new VBO(gl, geometry.colors(), vertexCount)
  this.vertexCount = vertexCount
  this.position = new Transformation()
  this.gl = gl
}

Mesh.prototype.draw = function (shaderProgram) {
  this.positions.bindToAttribute(shaderProgram.position)
  this.normals.bindToAttribute(shaderProgram.normal)
  this.uvs.bindToAttribute(shaderProgram.uv)
  this.colors.bindToAttribute(shaderProgram.color)
  this.position.sendToGpu(this.gl, shaderProgram.model)
  this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount)
}

Mesh.load = function (gl, modelUrl) {
  var geometry = Geometry.loadOBJ(modelUrl)
  return Promise.all([geometry]).then(function (params) {
    return new Mesh(gl, params[0])
  })
}
