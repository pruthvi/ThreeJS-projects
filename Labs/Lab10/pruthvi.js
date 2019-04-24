/// <reference path="../libs/three.min.js" />
/// <reference path="../libs/dat.gui.min.js" />
/// <reference path="../libs/orbitcontrols.js" />


const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
const clock = new THREE.Clock();

var __shader = Shaders.BasicShader1;

var orbitControls, controls;

var plane, plane1, material, mesh, sphere;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(-30, 10, 30);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));
    scene.position.set(0, -10, 0);

    let directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(20, 60, 10);
    directionalLight.castShadow = true;
    directionalLight.target = scene;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    let hemiSphereLight = new THREE.HemisphereLight(0x7777cc, 0x00ff00, 0.6);
    hemiSphereLight.position.set(0, 100, 0);
    scene.add(hemiSphereLight);
}

function createGeometry() {

    scene.add(new THREE.AxesHelper(100));


    __shader.uniforms.texture.value = new THREE.TextureLoader().load('textures/lavatile.jpg');
    material = new THREE.ShaderMaterial(
        {
            uniforms: __shader.uniforms,
            vertexShader: __shader.vertexShader,
            fragmentShader: __shader.fragmentShader
        });


    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 60, 100, 100, 100),
        material
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    mesh = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1, 0.4, 64, 8),
        material
    );
    mesh.position.set(0, 10, 0);
    mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh.castShadow = true;
    scene.add(mesh);



    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        material
    );
    sphere.position.set(20, 10, 0);
    sphere.castShadow = true;
    scene.add(sphere);


}

function changeShader(__shader) {

    __shader.uniforms.texture.value = new THREE.TextureLoader().load('textures/lavatile.jpg');
    material = new THREE.ShaderMaterial(
        {
            uniforms: __shader.uniforms,
            vertexShader: __shader.vertexShader,
            fragmentShader: __shader.fragmentShader
        });
    mesh.material = material;
    plane.material = material;
    sphere.material = material;
    console.log(`${__shader.name}`);

}

function setupDatGui() {

    controls = new function () {

        this.shader1 = function () {
            __shader = Shaders.BasicShader1;
            changeShader(__shader);
        }
        this.shader2 = function () {
            __shader = Shaders.BasicShader2;
            changeShader(__shader);

        }

        this.shader3 = function () {
            __shader = Shaders.BasicShader3;
            changeShader(__shader);

        }
    }

    let gui = new dat.GUI();
    gui.add(controls, 'shader1').name("Shader 1");
    gui.add(controls, 'shader2').name("Shader 2");
    gui.add(controls, 'shader3').name("Shader 3");


}

function render() {

    orbitControls.update();

    __shader.uniforms.time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.onload = () => {

    init();
    setupDatGui();
    setupCameraAndLight();
    createGeometry();
    render();

}
