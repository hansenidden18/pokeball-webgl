function VBO (gl, data, count) {
  // Membuat buffer
  var bufferObject = gl.createBuffer()
  // Buffer object ke vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject)
  // Write data
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
  this.gl = gl
  this.size = data.length / count
  this.count = count
  this.data = bufferObject
}

VBO.prototype.bindToAttribute = function (attribute) {
  var gl = this.gl
  // Buffer object ke vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, this.data)
  // Enable attribute ke shader
  gl.enableVertexAttribArray(attribute)
  // Define format attribute array sesuai shader
  gl.vertexAttribPointer(attribute, this.size, gl.FLOAT, false, 0, 0)
}
