function SceneManager() {
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
    // renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth/window.innerHeight, 1, 20000 )
    camera.position.set( 30, 30, 100 )
const sky = new Sky()
    sky.scale.setScalar( 10000 )
    scene.add( sky )
const pmremGenerator = new THREE. PMREMGenerator( renderer )
const sun = new THREE.Vector3()
    const theta = Math.PI * ( 0.4999 - 0.5 )
    const phi = 2 * Math.PI * ( .205 - .5 )
    sun.x = Math.cos( phi)
    sun.y = Math.sin( phi) * Math.sin( theta ) - .02
    sun.z = Math.sin( phi) * Math.cos( theta )
    sky.material.uniforms['sunPosition'].value.copy( sun )
    scene.environment = pmremGenerator.fromScene( sky ).texture
const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 )
const water = new Water (
    waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function ( texture ) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }),
        alpha: 1.0,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
    })
    water.rotation.x =- Math.PI / 2
scene.add( water )
const waterUniforms = water.material.uniforms
const geometry = new THREE.BoxGeometry( 20, 20, 20 )
const material = new THREE.MeshStandardMaterial( { color: 0xfcc742 })
const sphere = new THREE.Mesh( geometry, material )
// scene.add( sphere )
const controls = new OrbitControls( camera, renderer.domElement )
    controls.maxPolarAngle = Math.PI * 0.495
    controls.target.set( 0, 10, 0 )
    controls.minDistance = 40.0
    controls.maxDistance = 200.0
    controls.update()
this.update = function() {
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0
    const time = performance.now() * 0.001
    // sphere.position.y = Math.sin( time ) * 2
    // sphere.position.x = time * 0.3
    // sphere.position.z = time * 0.3
    renderer.render( scene, camera )
    }
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
    }
    window.addEventListener( 'resize', onWindowResize)
}
const  sceneManager = new SceneManager()
function animate() {
    requestAnimationFrame( animate )
    sceneManager.update()
}
animate()

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/controls/OrbitControls.js';
import { Water } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/objects/Water.js';
import { Sky } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/objects/Sky.js';
