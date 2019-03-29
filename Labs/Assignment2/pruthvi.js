/*  
    Copyright Pruthvi // pruthv.com 
    https://pruthvi.github.io/Advance_Graphics/Labs/Assignment2/assignment2.html
    https://codepen.io/pruthv/pen/pYMpda 
*/

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls;
var ambientLight, dirLight;
var axle = new THREE.Object3D();

var texture;
var objects = [];
var rotateScene, speedX, speedY, speedZ, gameLoad;

var score = 0, lostBox = 0;
var text, instruText, lostText, resultText;

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

    // Score Text
    text = document.createElement('div');
    text.style.position = 'absolute';
    text.style.width = 100;
    text.style.height = 100;
    text.style.backgroundColor = "white";
    text.style.color = "red";
    text.style.fontSize = "20px";
    text.style.top = 50 + 'px';
    text.style.left = 50 + 'px';
    document.body.appendChild(text);

    // Level Lost Boxes Text
    lostText = document.createElement('div');
    lostText.style.fontFamily = 'sans-serif';
    lostText.style.textAlign = 'center';
    lostText.style.position = 'absolute';
    lostText.style.width = 100;
    lostText.style.height = 100;
    lostText.style.backgroundColor = "black";
    lostText.style.color = "red";
    lostText.style.fontSize = "20px";
    lostText.style.top = 100 + 'px';
    lostText.style.left = 50 + 'px';
    document.body.appendChild(lostText);

    // Level Lost Boxes Text
    resultText = document.createElement('div');
    resultText.style.fontFamily = 'sans-serif';
    resultText.style.textAlign = 'center';
    resultText.style.position = 'fixed';
    resultText.style.width = 100;
    resultText.style.height = 100;
    resultText.style.backgroundColor = "White";
    resultText.style.color = "red";
    resultText.style.fontSize = "48px";
    resultText.style.top = (window.innerHeight - 100) / 2 + 'px';
    resultText.style.left = (window.innerWidth - 100) / 2 + 'px';
    document.body.appendChild(resultText);

    // Instruction Text
    instruText = document.createElement('div');
    instruText.style.fontFamily = 'sans-serif';
    instruText.style.position = 'absolute';
    instruText.style.width = 100;
    instruText.style.height = 100;
    instruText.style.color = "white";
    instruText.style.fontSize = "14px";
    instruText.style.bottom = 20 + 'px';
    instruText.style.right = 20 + 'px';
    instruText.innerHTML = "+10 points for removing block <br />  -10 points if block falls off table  <br /> Click anywhere to change rotation.";
    document.body.appendChild(instruText);

    // Load table texture, set wrap mode to repeat
    texture = new THREE.TextureLoader().load("assets/textures/wood.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    // Initial Scene Floor
    let floor = new Physijs.BoxMesh(
        new THREE.CubeGeometry(20, 1, 10),
        new THREE.MeshBasicMaterial({ color: 0xeeeeee, map: texture })
        , 0);
    floor.position.set(0, 0, 0);
    scene.add(floor);
    gameLoad = false;
}


function setupDatGui() {

    controls = new function () {

        this.lvl1 = function () {       // clears scene
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
            lostBox = 0;    // resets 'level lost box' count
            readFile(5500, "lvl1"); // loads json file
            createFloor(5, 0);  // adds static scene elements
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
        new THREE.MeshStandardMaterial({ color: 0xeeeeee, map: texture }), 0);
    floor.position.set(0, 0, 0);
    floor.rotation.y = angle;
    floor.castShadow = true;
    floor.receiveShadow = true;
    scene.add(floor);
}

function readFile(port, filename) {

    //   let url = 'http://127.0.0.1:' + // Change link to localhost if required
    //        port + '/assets/games/' + filename + '.json';
    let onlineurl = 'https://pruthvi.github.io/Advance_Graphics/Labs/Assignment2/assets/games/' + filename + '.json'; /* Online Link */
    let request = new XMLHttpRequest();
    request.open('GET', onlineurl);
    // request.open('GET', url);

    request.responseType = 'text';
    request.send();
    request.onload = () => {
        let data = request.responseText;
        //   createGame(data);               // for online link
        createGame(JSON.parse(data));
    }
}

function createGame(data) {

    speedX = parseFloat(data.setting.rotation_x);   // Sets Rotation
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
    gameLoad = true;
}

function createBox(size, boxColor, x, y, z) {

    let boxGeometry = new THREE.BoxGeometry(size, size, size);
    var boxMaterial = Physijs.createMaterial(new THREE.MeshStandardMaterial({ color: boxColor }), 0.5, 0);
    let box = new Physijs.BoxMesh(boxGeometry, boxMaterial);
    box.position.set(x, y, z);
    box.castShadow = true;
    box.receiveShadow = true;
    objects.push(box);
    scene.add(box);
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
        scene.remove(firstElement);
        objects.splice(objects.lastIndexOf(firstElement), 1);
        score = score + 10;
    }

    objects.forEach(obj => {
        obj.__dirtyPosition = true;
        obj.__dirtyRotation = true;
    });

}

function constantUpdate() {

    text.innerHTML = " &nbsp;&nbsp;Score : " + score + "&nbsp;&nbsp;";          // Checks score on each frame
    lostText.innerHTML = "Level <br />  &nbsp;&nbsp;Lost Boxes : " + lostBox + "&nbsp;&nbsp;";  // Checks lost box on each frame

    for (let i = 0; i < objects.length; i++) {      // Checks if box fell from certain height and reduce points accordingly
        if (objects[i].position.y <= -10) {
            scene.remove(objects[i]);
            objects.splice(i, 1);
            lostBox = lostBox + 1;
            score = score - 10;
        }
    }

    if (gameLoad) {     // checks win and lose condition if game is loaded
        resultText.innerHTML ="";
        if (objects.length == 0) {
            console.log("YOU WON!");
            resultText.innerHTML = " &nbsp;&nbsp; You WON! &nbsp;&nbsp;";  // display Win condion
            speedX = 0;   // stops Rotation
            speedY = 0;
            speedZ = 0;
            gameLoad = false;
        } else{
            resultText.innerHTML ="";
        }

        if (score < 0) {
            console.log("YOU LOST!");
            resultText.innerHTML = " &nbsp;&nbsp; You LOST! &nbsp;&nbsp;";
            instruText.innerHTML = " You can not play another level. <br /> Refresh the page to Restart!";
            speedX = 0;
            speedY = 0;
            speedZ = 0;
            gameLoad = false;
        }
        
    }
   
}

function render() {

    if (rotateScene == true) {          // Rotates scene according to level
        scene.rotation.x += speedX;
        scene.rotation.y += speedY;
        scene.rotation.z += speedZ;
    }

    constantUpdate();    // check movement of box and update stat

    // stats.update();       // For updating stats and fps
    scene.simulate();
    orbitControls.update();
    renderer.castShadow = true;
    renderer.render(scene, camera);
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
