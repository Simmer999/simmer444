// import * as THREE from '/three/build/three.module.js'

var scene, camera, renderer

let LINE_COUNT = 8000
let geom = new THREE.BufferGeometry()
geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6 * LINE_COUNT), 3 ))
geom.setAttribute('velocity', new THREE.BufferAttribute(new Float32Array(2 * LINE_COUNT), 1 ))
let pos = geom.getAttribute('position')
let pa = pos.array
let vel = geom.getAttribute('velocity')
let va = vel.array

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 500 )
    camera.position.z = 100

    renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    for (let line_index = 0; line_index < LINE_COUNT; line_index++ ) {
        var x = Math.random() * 400 - 200
        var y = Math.random() * 200 - 100
        var z = Math.random() * 500 - 100
        var xx = x
        var yy = y
        var zz = z

        pa[6 * line_index] = x
        pa[6 * line_index + 1] = y
        pa[6 * line_index + 2] = z
        pa[6 * line_index + 3] = xx
        pa[6 * line_index + 4] = yy
        pa[6 * line_index + 5] = zz

        va[2 * line_index] = va[2 * line_index + 1] = 0
    }
    let mat = new THREE.LineBasicMaterial({ color: 0xff0000 })
    let lines = new THREE.LineSegments(geom, mat)
    scene.add( lines )
    window.addEventListener('resize', onWindowResize, false )
    animate()
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}
function animate() {
    for (let line_index = 0; line_index < LINE_COUNT; line_index++ ) {
        va[ 2 * line_index ] += 0.003
        va[ 2 * line_index - 1 ] += 0.0025

        pa[ 6 * line_index + 2] += va[ 2 * line_index]
        pa[ 6 * line_index + 5] += va[ 2 * line_index + 1]

        if ( pa[ 6 * line_index + 5 ] > 200 ) {
            var z = Math.random() * 200 - 100
            pa[6 * line_index + 2] = z
            pa[6 * line_index + 5] = z
            pa[2 * line_index] = 0
            pa[2 * line_index + 1] = 0
        }
    }
    pos.needsUpdate = true
    renderer.render( scene, camera )
    requestAnimationFrame( animate )
}
init()