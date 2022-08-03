const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor(new THREE.Color('#110000'))
document.body.appendChild( renderer.domElement )

const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

//===================================
const particleGeometry = new THREE.BufferGeometry 
const particlesCount = 5000

const positionArray = new Float32Array(particlesCount * 3)

for( let i = 0; i < particlesCount * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 5
}

particleGeometry.setAttribute('position', 
    new THREE.BufferAttribute(positionArray, 3))     
//===================================
const material = new THREE.MeshPhongMaterial( { color: 0x220000 } );
//     size: 0.005
// } );
const particlesMaterial = new THREE.PointsMaterial( { 
    size: 0.005
} );

{
    const color = 0xFFFFFF;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-100, 2, 4);
    scene.add(light);
  }


//Add objects to scene.
const particleMesh = new THREE.Points(particleGeometry, particlesMaterial)

const torus = new THREE.Mesh( geometry, material );
scene.add(particleMesh,  torus )



camera.position.z = 2.5

function animate() {
    requestAnimationFrame( animate )
    torus.rotation.x += 0.005
    torus.rotation.y += 0.005
    renderer.render( scene, camera )
}
animate()