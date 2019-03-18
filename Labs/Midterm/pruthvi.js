
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls;

var ambientLight, dirLight, hemLight, spotLight;    
var rotateScene, speed = 0.01;
var armColour, arm, bodyColour, body; 

var armMat, towerMat, axleMat;

var armInclination = 0.25;

var axle = new THREE.Object3D();



function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    rotateScene = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {

    camera.position.set(-100, 50, 40);
    camera.lookAt(scene.position);
    scene.add(new THREE.AmbientLight(0x666666));

    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.set(5,0,20);
    scene.add(ambientLight);

    dirLight = new THREE.DirectionalLight(0xFFF33F);
    dirLight.position.set(5,0,20);
    dirLight.castShadow = true; 
    scene.add(dirLight);

    hemLight = new THREE.HemisphereLight(0xFF33FF);
    hemLight.position.set(5,0,20);
    scene.add(hemLight);

    spotLight = new THREE.SpotLight(0xFF3366);
    spotLight.position.set(5,0,20);
    spotLight.castShadow = true; 
    scene.add(spotLight);

}

function createGeometry() {

    scene.add(new THREE.AxesHelper(100));

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee })
    );
    plane.material.side = THREE.DoubleSide;
    plane.position.set(0,-10,0);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

}


function  createWindmillMaterials(){

    armMat =  new THREE.MeshLambertMaterial({ color: 0x4286f4 });
    towerMat = new THREE.MeshStandardMaterial({ color: 0xb71d1d });
    axleMat = new THREE.MeshStandardMaterial({ color: 0xb71d1d });


}

function setupDatGui() {

   initGuiControls();

}

function initGuiControls(){
    controls = new function() {

        this.rotateS = rotateScene;
        this.spLight = true;
        this.armColor = 0x4286f4;
        this.showArm = true;
        this.bodyColor = 0xb71d1d;
        this.showBody = true;
        this.rotateSpeed = 0.1;
        this.armLength = 16;
        this.armNo = 3;
        this.towerHeight = 22;
        this.createWindmill = function(armLength,towerHeight,armNo, armInclination ){  
            var obj = new THREE.Object3D();
            let tower = new THREE.Mesh(new THREE.CylinderGeometry(towerHeight, towerHeight, 4, 30), towerMat);
            obj.add(tower);

            var armAxle = new THREE.Object3D();
            let arm = new THREE.Mesh(new THREE.BoxGeometry(4,armLength,0.2), armMat);

            obj.add(armAxle);

            scene.add(obj);
            console.log("Create Windmill");
        };

    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotateS').name('Rotate').onChange((e) => rotateScene = e);
    gui.add(controls, 'spLight').name('Spot Light').onChange((e) => { 
        if(e){  spotLight.visible = true;    }
        else{   spotLight.visible = false;   }
    });

    gui.addColor(controls, 'armColor').name('Arm Color').onChange((c) => { armColour = new THREE.Color(c); });
    gui.add(controls, 'showBody').name('Show Body').onChange((e) =>  { 
        if(e){  body.visible = true;    }
        else{   body.visible = false;   }
    });
    gui.addColor(controls, 'bodyColor').name('Body Color').onChange((c) => { bodyColour = new THREE.Color(c); });
    gui.add(controls, 'showArm').name('Show Arm').onChange((e) =>  { 
        if(e){  arm.visible = true;    }
        else{   arm.visible = false;   }
    });

    gui.add(controls, 'rotateSpeed', 0, 0.4).name('Rotation Speed').onChange((s) => speed = s);

    var wind = gui.addFolder('Windmill');
    wind.add(controls, 'armLength', 12, 18).name('Arm Length').step(2);
    wind.add(controls, 'armNo', 2, 5).name('Number of Arms').step(1);
    wind.add(controls, 'towerHeight', 18, 27).name('Tower Height').step(3);

    gui.add(controls, 'createWindmill').name('Create');

}


function render() {

    orbitControls.update();


    if (rotateScene == true){
        scene.rotation.y += speed;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    createWindmillMaterials();
    setupDatGui();
    render();

}
