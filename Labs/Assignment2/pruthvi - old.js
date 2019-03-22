
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls;

var ambientLight, dirLight, hemLight, spotLight;
var rotateScene, speed = 0.01;


var axle = new THREE.Object3D();





function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    rotateScene = false;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {

    camera.position.set(0, 5, 20);
    camera.lookAt(scene.position);
    scene.add(new THREE.AmbientLight(0x666666));

    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.set(5,0,20);
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(0xFF3366);
    spotLight.position.set(5,10,20);
    spotLight.castShadow = true;
    scene.add(spotLight);

}

function createGeometry() {

    scene.add(new THREE.AxesHelper(10));

// load a texture, set wrap mode to repeat
var texture = new THREE.TextureLoader().load( "assets/textures/wood.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

//new THREE.TextureLoader().load( 'assets/textures/wood.jpg')
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee ,  map: texture })
    );
    plane.material.side = THREE.DoubleSide;
    plane.position.set(0,0,0);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    createBox(2,0x394dce,1,1,2);
    createBox(1,0xd11d47,5,1,2);


}


function  createBox(size, boxColor,x,y,z){

  let boxGeometry = new THREE.BoxGeometry(size,size,size);
      let boxMaterial = new THREE.MeshLambertMaterial({ color: boxColor});
      let box = new THREE.Mesh(boxGeometry, boxMaterial);
  //    let box = new Physijs.BoxMesh(boxGeometry, boxMaterial, 0);

      box.position.set(x,y,z);
      box.castShadow = true;
      box.receiveShadow = true;
      scene.add(box);

}

function setupDatGui() {

    controls = new function() {

        this.rotateS = rotateScene;

    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotateS').name('Rotate').onChange((e) => rotateScene = e);

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
    setupDatGui();
    render();

}
