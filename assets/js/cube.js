let cube, camera, renderer
function init() {
const scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
    camera.position.z = 5
renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )    
const cubeG = new THREE.BoxGeometry()
const cubeM = new THREE.MeshStandardMaterial({ color: 0x550000 })
cube = new THREE.Mesh( cubeG, cubeM )
const intensity = .8
const light1 = new THREE.PointLight( 0xffffff, 10, 100 )
    light1.position.y = intensity
const light2 = new THREE.PointLight( 0xffffff, 10, 100 )
    light2.position.z = intensity  
scene.add( light1, light2 )
const planeG = new THREE.PlaneGeometry( 200, 100 )
const planeM = new THREE.MeshStandardMaterial( { color: 0x000022 })
const plane = new THREE.Mesh( planeG, planeM )
    plane.position.z = -50
scene.add( plane )
scene.add( cube )
    function animate() {
        requestAnimationFrame( animate )
        cube.rotation.x += 0.005
        cube.rotation.y += 0.005
        renderer.render( scene, camera )
    }
animate()    
}    
init()
window.addEventListener( 'resize', onWindowResize )
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
}
const controls = new OrbitControls( camera, renderer.domElement)
// import * as THREE from 'three';
// import { _SRGBAFormat } from 'three';
// import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
