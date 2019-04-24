/* Pruthvi | pruthv.com */


/// <reference path="../libs/three.min.js" />
/// <reference path="../libs/dat.gui.min.js" />
/// <reference path="../libs/orbitcontrols.js" />


const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
const clock = new THREE.Clock();

var __shader = Shaders.BasicShader1;

var orbitControls, controls;

var plane, material, mesh, sphere;

Physijs.scripts.worker = 'libs/physijs_worker.js';
Physijs.scripts.ammo = 'libs/ammo.js';

var objects = [];


function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(0, 10, 30);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));
    scene.position.set(0, -10, 0);

    let directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(20, 30, 0);
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

    var urls = ['right.png', 'left.png', 'top.png', 'bottom.png', 'front.png', 'back.png'];
    var loader = new THREE.CubeTextureLoader().setPath('textures/cubemap/colloseum/');
    loader.load(urls, function (texture) {
        var pmremGenerator = new THREE.PMREMGenerator(texture);
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();
        scene.background = texture;
    });


    var texture = new THREE.TextureLoader().load("textures/general/weave.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    var bmptex = new THREE.TextureLoader().load("textures/general/weave-bump.jpg");
    bmptex.wrapS = THREE.RepeatWrapping;
    bmptex.wrapT = THREE.RepeatWrapping;
    bmptex.repeat.set(4, 4);

    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 20),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee, map: texture, bumpScale: 2.9, roughness: 0.05, bumpMap: bmptex })
    );
    plane.position.set(-10, 10, 0);
    plane.receiveShadow = true;
    plane.rotation.y = Math.PI * 0.5;
    scene.add(plane);



    __shader.uniforms.texture.value = new THREE.TextureLoader().load('textures/lavatile.jpg');
    material = new THREE.ShaderMaterial(
        {
            uniforms: __shader.uniforms,
            vertexShader: __shader.vertexShader,
            fragmentShader: __shader.fragmentShader
        });

    let floor = new Physijs.BoxMesh(
        new THREE.CubeGeometry(20, 1, 10),
        material
        , 0);
    floor.position.set(0, 0, 0);
    scene.add(floor);

        createBox(0x2666cc, 5);
        createBox(0xd60446, 7);
        createBox(0x2666cc, 9);
        createBox(0x019303, 11);


        createMatchstick(0x2666cc, 3, 4);
        createMatchstick(0xd60446, 5,-3);
        createMatchstick(0x019303, 7,4);
        createMatchstick(0x2666cc, -3, 0);
        createMatchstick(0xd60446, 3, -4);
        createMatchstick(0x019303, 5,3);

}

function createMatchstick(matchColor, x ,z) {
    
    let matchGeometry = new THREE.BoxGeometry(0.3, 1, 0.2);
    var matchMaterial = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: matchColor }), 0.5, 0);
    let match = new Physijs.BoxMesh(matchGeometry, matchMaterial, 0);
    match.position.set(x, 5, z);
    match.castShadow = true;
    match.receiveShadow = true;
    objects.push(match);
    scene.add(match);
}


function createBox(boxColor, y) {

    let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    var boxMaterial = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: boxColor }), 0.5, 0);
    let box = new Physijs.BoxMesh(boxGeometry, boxMaterial, 0);
    box.position.set(5, y, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    objects.push(box);
    scene.add(box);
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

function mouseDownHandler(event) {

    let pos = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );
    let vector = pos.unproject(camera);
    let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var firstElement = intersects[0].object;
        firstElement.mass = 1;
    }

    objects.forEach(obj => {
        obj.__dirtyPosition = true;
        obj.__dirtyRotation = true;
    });

}


function render() {
    scene.simulate();

    orbitControls.update();

    __shader.uniforms.time.value = clock.getElapsedTime();
    renderer.castShadow = true;

    renderer.render(scene, camera);
    requestAnimationFrame(render);

}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    window.addEventListener('mousedown', mouseDownHandler, false);
    render();

}
