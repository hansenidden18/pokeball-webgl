function Geometry (faces) {
  this.faces = faces || []
}

// mendapatkan titik dari OBJ file 
Geometry.parseOBJ = function (src) {
  var POSITION = /^v\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)/
  var NORMAL = /^vn\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)/
  var UV = /^vt\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)/
  var FACE = /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/
  var COLOR = /^usemtl\s+(Red|White|Black+)/

  lines = src.split('\n')
  current_color = new Vector3(1.0, 0.0, 0.0)
  var positions = []
  var uvs = []
  var normals = []
  var faces = []
  lines.forEach(function (line) {
    // Menggunakan regex yang sudah di define untuk tiap line pada data
    var result
    if ((result = POSITION.exec(line)) != null) {
      // Ambil vertex position
      positions.push(new Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])))
    } else if ((result = NORMAL.exec(line)) != null) {
      // Ambil vertex noemal
      normals.push(new Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])))
    } else if ((result = UV.exec(line)) != null) {
      // Ambil texture mapping point
      uvs.push(new Vector2(parseFloat(result[1]), 1 - parseFloat(result[2])))
    } else if ((result = FACE.exec(line)) != null) {
      // Ambil face atau segitiga
      var vertices = []
      // membuat 3 vertices pada tiap face yang didapatkan
      for (var i = 1; i < 10; i += 3) {
        var part = result.slice(i, i + 3)
        var position = positions[parseInt(part[0]) - 1]
        var uv = uvs[parseInt(part[1]) - 1]
        var normal = normals[parseInt(part[2]) - 1]
        vertices.push(new Vertex(position, normal, uv, current_color))
      }
      faces.push(new Face(vertices))
    } else if ((result = COLOR.exec(line)) != null) {
      if (result[1] === "Red") {
        current_color = new Vector3(1.0, 0.0, 0.0)
      } else if (result[1] === "White") {
        current_color = new Vector3(1.0, 1.0, 1.0)
      } else if (result[1] === "Black") {
        current_color = new Vector3(0.0, 0.0, 0.0)
      }
    }
  })

  return new Geometry(faces)
}

// Load OBJ File dan mendapatkan text nya
Geometry.loadOBJ = function (url) {
  return new Promise(function (resolve) {
    fetch(url).then(response=>response.text()).then(text=>resolve(Geometry.parseOBJ(text)))
  })
  
}

function Face (vertices) {
  this.vertices = vertices || []
}

function Vertex (position, normal, uv, color) {
  this.position = position || new Vector3()
  this.normal = normal || new Vector3()
  this.uv = uv || new Vector2()
  this.color = color || new Vector3()
}

function Vector3 (x, y, z) {
  this.x = Number(x) || 0
  this.y = Number(y) || 0
  this.z = Number(z) || 0
}

function Vector2 (x, y) {
  this.x = Number(x) || 0
  this.y = Number(y) || 0
}

Geometry.prototype.vertexCount = function () {
  return this.faces.length * 3
}

Geometry.prototype.positions = function () {
  var answer = []
  this.faces.forEach(function (face) {
    face.vertices.forEach(function (vertex) {
      var v = vertex.position
      answer.push(v.x, v.y, v.z)
    })
  })
  return answer
}

Geometry.prototype.normals = function () {
  var answer = []
  this.faces.forEach(function (face) {
    face.vertices.forEach(function (vertex) {
      var v = vertex.normal
      answer.push(v.x, v.y, v.z)
    })
  })
  return answer
}

Geometry.prototype.uvs = function () {
  var answer = []
  this.faces.forEach(function (face) {
    face.vertices.forEach(function (vertex) {
      var v = vertex.uv
      answer.push(v.x, v.y)
    })
  })
  return answer
}

Geometry.prototype.colors = function () {
  var answer = []
  this.faces.forEach(function (face) {
    face.vertices.forEach(function (vertex) {
      var v = vertex.color
      answer.push(v.x, v.y, v.z)
    })
  })
  return answer
}