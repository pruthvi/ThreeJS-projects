
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls;

var ambientLight, dirLight, hemLight, spotLight;
var rotateScene, speed = 0.01;

var objects = [];


var axle = new THREE.Object3D();

Physijs.scripts.worker = 'libs/physijs_worker.js';
Physijs.scripts.ammo = 'libs/ammo.js';


function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;


    scene.setGravity(new THREE.Vector3(0, -50, 0)); //specify gravity


    rotateScene = false;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    readFile(5500, "lvl1");

}

function setupCameraAndLight() {

    camera.position.set(0, 5, 20);
    camera.lookAt(scene.position);
    scene.add(new THREE.AmbientLight(0x666666));

    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.set(5, 0, 20);
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(0xFF3366);
    spotLight.position.set(5, 10, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);

}

function createGeometry() {

    scene.add(new THREE.AxesHelper(10));

    // load a texture, set wrap mode to repeat
    var texture = new THREE.TextureLoader().load("assets/textures/wood.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);


    let floor = new Physijs.BoxMesh(
        new THREE.CubeGeometry(20, 1, 10),
        new THREE.MeshBasicMaterial({ color: 0xeeeeee, map: texture })
        , 0);
    floor.position.set(0, 0, 0);
    scene.add(floor);






    var blockGeom = new THREE.BoxGeometry(1, 0.2, 1);
    let blockMat = Physijs.createMaterial(new THREE.MeshStandardMaterial({
        color: 0xff7777, transparent: true, opacity: 0.9
    }),
        0.3,       //friction
        0.7); //restitution 

    let block = new Physijs.BoxMesh(blockGeom, blockMat);
    block.position.set(0, 10, 0);
    block.castShadow = true;
  //  scene.add(block);


  //  createBox(2, 0x394dce, 1, 10, 2);
 //   createBox(1, 0xd11d47, 1, 20, 2);


}


function createBox(size, boxColor, x, y, z) {

    let boxGeometry = new THREE.BoxGeometry(size, size, size);
    let boxMaterial = new THREE.MeshLambertMaterial({ color: boxColor });

    let box = new Physijs.BoxMesh(boxGeometry, boxMaterial);

    box.position.set(x, y, z);
    box.castShadow = true;
    box.receiveShadow = true;
    objects.push(box);
    scene.add(box);

}

function readFile(port, filename) {
    let url = 'http://127.0.0.1:' +
        port + //port number from data.gui
        '/assets/games/' + //url path
        filename + //file name from dat.gui
        '.json'; //extension
    //console.log(url); //debugging code
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'text'; //try text if this doesn’t work
    request.send();
    request.onload = () => {
        let data = request.responseText;
        //console.log(data); //debugging code
        //createGame(data);
        createGame(JSON.parse(data)); //convert text to json
    }
}

function createGame(data){
    console.log(data.setting.color); 
    console.log(data);
    var count = Object.keys(data.info).length;
    console.log(count);

    console.log(data.info[1].size); 

    for(i=0;i<count;i++){

        var iSize = data.info[i].size;
        var iColor =  parseInt(data.info[i].color, 16);
        var iX = data.info[i].x;
        var iY = data.info[i].y;
        var iZ = data.info[i].z;
        createBox(iSize, iColor, iX, iY, iZ) ;
    } 

}

function setupDatGui() {

    controls = new function () {
        this.rotateS = rotateScene;
    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotateS').name('Rotate').onChange((e) => rotateScene = e);

}

function mouseDownHandler(event){

    let pos = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );
    console.log(pos);
    let vector = pos.unproject(camera);
    let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObjects(objects);
    intersects.forEach((obj) => scene.remove(obj.object));

}



function render() {

    scene.simulate();

    orbitControls.update();

    if (rotateScene == true) {
        scene.rotation.y += speed;
    }

    renderer.render(scene, camera);
    // scene.simulate(undefined, 1);

    requestAnimationFrame(render);
}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    window.addEventListener('mousedown', mouseDownHandler,false);

    render();

}
