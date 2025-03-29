// @n.eqq









import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
document.body.style.cursor = 'url("Curs/ArrowFarCursor.png"), auto';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);
scene.add(new THREE.AmbientLight(0x333333, 1));




const loader = new GLTFLoader();
loader.load(
  './models/Endorfina/scene.gltf',
  (gltf) => {
    const object = gltf.scene;
    object.scale.set(6, 7, 6);
    object.position.set(-100, 150, 0);
    scene.add(object);
  },
  (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`),
  (error) => console.error(error)
);


camera.position.z = 500;
document.addEventListener('contextmenu', (event) => event.preventDefault());
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



function animate() {
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}





animate();
