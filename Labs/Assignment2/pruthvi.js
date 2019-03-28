
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls;

var ambientLight, dirLight;
var rotateScene, speedX, speedY, speedZ;

var objects = [];

var score = 0, lostBox = 0;
var text, instruText, lostText;
var axle = new THREE.Object3D();
var texture;
var spotlightHepler;

Physijs.scripts.worker = 'libs/physijs_worker.js';
Physijs.scripts.ammo = 'libs/ammo.js';
var stats;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;


    scene.setGravity(new THREE.Vector3(0, -50, 0)); //specify gravity
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    //document.body.appendChild(stats.dom);


    rotateScene = true;
    speedX = 0;
    speedY = 0;
    speedZ = 0;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {

    camera.position.set(0, 10, 30);
    camera.lookAt(scene.position);
    scene.add(new THREE.AmbientLight(0x666666));

    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.set(0, 0, 0);
    scene.add(ambientLight);

    dirLight = new THREE.DirectionalLight(0xFFFFFF);
    dirLight.position.set(3, 10, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);



}

function createGeometry() {

    scene.add(new THREE.AxesHelper(10));

    text = document.createElement('div');
    text.style.position = 'absolute';
    text.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    text.style.width = 100;
    text.style.height = 100;
    text.style.backgroundColor = "white";
    text.style.color = "red";
    text.style.fontSize = "20px";
    text.style.top = 50 + 'px';
    text.style.left = 50 + 'px';
    document.body.appendChild(text);


    instruText = document.createElement('div');
    instruText.style.fontFamily = 'sans-serif';
    instruText.style.position = 'absolute';
    instruText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    instruText.style.width = 100;
    instruText.style.height = 100;
    instruText.style.color = "white";
    instruText.style.fontSize = "14px";
    instruText.style.bottom = 20 + 'px';
    instruText.style.right = 20 + 'px';
    instruText.innerHTML = "+10 points for removing block <br />  -10 points if block falls off table  <br /> Click anywhere to change rotation.";
    document.body.appendChild(instruText);

    lostText = document.createElement('div');
    lostText.style.fontFamily = 'sans-serif';
    lostText.style.textAlign = 'center';
    lostText.style.position = 'absolute';
    lostText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    lostText.style.width = 100;
    lostText.style.height = 100;
    lostText.style.backgroundColor = "black";
    lostText.style.color = "red";
    lostText.style.fontSize = "20px";
    lostText.style.top = 100 + 'px';
    lostText.style.left = 50 + 'px';
    document.body.appendChild(lostText);



    // load a texture, set wrap mode to repeat
    texture = new THREE.TextureLoader().load("assets/textures/wood.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);


    let floor = new Physijs.BoxMesh(
        new THREE.CubeGeometry(20, 1, 10),
        new THREE.MeshBasicMaterial({ color: 0xeeeeee, map: texture })
        , 0);
    floor.position.set(0, 0, 0);
     scene.add(floor);

}


function createBox(size, boxColor, x, y, z) {

    let boxGeometry = new THREE.BoxGeometry(size, size, size);
    var boxMaterial = Physijs.createMaterial(
        new THREE.MeshStandardMaterial({ color: boxColor }),
        0.5, 0);
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
    let onlineurl = '/Advance_Graphics/Labs/Assignment2/assets/games/' +  filename + '.json';
    let request = new XMLHttpRequest();
    // console.log("URL : " + onlineurl);
    request.open('GET', onlineurl);
    request.responseType = 'text'; //try text if this doesn’t work
    request.send();
    request.onload = () => {
        let data = request.responseText;
console.log(data); //debugging code
createGame(data);
      //  createGame(JSON.parse(data)); //convert text to json
    }
}

function createGame(data) {
    console.log(data.setting.rotation_y);
    console.log(data);

    speedX = parseFloat(data.setting.rotation_x);
    speedY = parseFloat(data.setting.rotation_y);
    speedZ = parseFloat(data.setting.rotation_z);

    var count = Object.keys(data.info).length;
    for (i = 0; i < count; i++) {
        var iSize = data.info[i].size;
        var iColor = parseInt(data.info[i].color, 16);
        var iX = data.info[i].x;
        var iY = data.info[i].y;
        var iZ = data.info[i].z;
        createBox(iSize, iColor, iX, iY, iZ);
    }

}

function setupDatGui() {

    controls = new function () {
        this.lvl1 = function () {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
            lostBox = 0;
            readFile(5500, "lvl1");

            createFloor(5, 0);

        };
        this.lvl2 = function () {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
            lostBox = 0;
            createFloor(7, 90);

            readFile(5500, "lvl2");
        };
        this.lvl3 = function () {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
            lostBox = 0;
            createFloor(1.75, 0);
            readFile(5500, "lvl3");
        };
        this.lvl4 = function () {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
            lostBox = 0;
            createFloor(2, 0);
            createFloor(2, 90);

            readFile(5500, "lvl4");
        };
        this.lvl5 = function () {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
            lostBox = 0;
            createFloor(2, 0);
            createFloor(2, 90);

            readFile(5500, "lvl5");
        };

    }

    let gui = new dat.GUI();
    gui.add(controls, 'lvl1').name('Level 1');
    gui.add(controls, 'lvl2').name('Level 2');
    gui.add(controls, 'lvl3').name('Level 3');
    gui.add(controls, 'lvl4').name('Level 4');
    gui.add(controls, 'lvl5').name('Level 5');


}

function createFloor(z, angle) {
    scene.add(dirLight);
    scene.add(ambientLight);
    let floor = new Physijs.BoxMesh(
        new THREE.CubeGeometry(20, 1, z),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee, map: texture })
        , 0);
    floor.position.set(0, 0, 0);
    floor.rotation.y = angle;
    floor.castShadow = true;
    floor.receiveShadow = true;
    scene.add(floor);
}

function mouseDownHandler(event) {

    let pos = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );
    console.log(pos);
    let vector = pos.unproject(camera);
    let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObjects(objects);
    intersects.forEach((obj) => {
        scene.remove(obj.object);
        score = score + 10;
    });

    objects.forEach(obj => {
        obj.__dirtyPosition = true;
        obj.__dirtyRotation = true;

    });

}


function checkLocation() {


    text.innerHTML = " &nbsp;&nbsp;Score : " + score + "&nbsp;&nbsp;";
    lostText.innerHTML = "Level <br />  &nbsp;&nbsp;Lost Boxes : " + lostBox + "&nbsp;&nbsp;";


    for (let i = 0; i < objects.length; i++) {
        if (objects[i].position.y <= -10) {
            scene.remove(objects[i]);
            objects.splice(i, 1);
            lostBox = lostBox + 1;

            score = score - 10;
        }
    }

}

function render() {
    if (rotateScene == true) {

        scene.rotation.x += speedX;
        scene.rotation.y += speedY;
        scene.rotation.z += speedZ;
    }

    stats.update();
    checkLocation();

    scene.simulate();

    orbitControls.update();



    renderer.render(scene, camera);
    // scene.simulate(undefined, 1);
    renderer.castShadow = true;

    requestAnimationFrame(render);
}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    window.addEventListener('mousedown', mouseDownHandler, false);

    render();

}
