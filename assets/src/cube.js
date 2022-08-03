const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 1000 )
    camera.position.z = 5
const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
const cubeGeometry = new THREE.BoxGeometry()
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x990000 })
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial )
scene.add( cube )
function animate() {
    requestAnimationFrame( animate )
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render( scene, camera )
}
animate()
const light = new THREE.PointLight( 0xffffff, 2, 100 )
    light.position.set( 10, 10, 10 )
scene.add( light )
const planeGeometry = new THREE.PlaneGeometry( 10, 20 )
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x000099 })
const plane = new THREE.Mesh( planeGeometry, planeMaterial )
    plane.position.set( 0, 0, -5 )
scene.add( light, plane )
const controls = new OrbitControls( camera, renderer.domElement )
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
