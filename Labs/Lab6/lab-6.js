
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls,
    speed = 0.01,
    toRotate = true;

var spoke;
var axle = new THREE.Object3D();
var wheels =[];

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(-100, 50, 40);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));

    let directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(20, 60, 10);
  /*  directionalLight.castShadow = true;
    directionalLight.target = scene;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
  */  scene.add(directionalLight);

    let hemiSphereLight = new THREE.HemisphereLight(0x7777cc, 0x00ff00, 0.6);   //skycolor, groundcolor, intensity
    hemiSphereLight.position.set(0, 100, 0);
   // scene.add(hemiSphereLight);
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

    let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshLambertMaterial({ color: 0x7777ff })
    );
    mesh.position.set(0, 10, 0);
    mesh.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh.castShadow = true;


createWheel(20,15,14,3);

}

function createWheel(position,outerRadius,InnerRadius,axleRadius){

    return new function(){

    // Creating Axle
    this.axle = new THREE.Mesh(new THREE.CylinderGeometry(axleRadius, axleRadius, 4, 30),new THREE.MeshLambertMaterial({ color: 0x808080 }));
    this.axle.position.set(position, 16, 0);
    this.axle.rotation.z = Math.PI * 0.5;
    this.axle.castShadow = true;
    scene.add(this.axle);

    //  Generating Spokes
        this.angle = 0;
        for(let i = 0; i<12; i++){
            this.spoke = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 35, 10),new THREE.MeshLambertMaterial({ color: 0xffffff }));
            this.spoke.position.set(0, 0, 0);
            this.spoke.geometry.scale(1, 1, 1);
            this.spoke.rotation.x =Math.PI * 0.5;
            this.spoke.rotation.z =Math.PI * this.angle;
            this.angle += 1/6;
            this.spoke.geometry.translate(0, 5, 0);
            this.spoke.castShadow = true;
            this.axle.add(this.spoke);
        }
    //  Create outer Ring
        this.extrudeSettings = {
            steps: 10,
            depth: 5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1,
            curveSegments: 32
            };

            this.ring = new THREE.Shape();
            this.ring.moveTo( 50, 10 );
            this.ring.absarc( 0, 0, outerRadius, 0, Math.PI * 2, false );
            this.hole = new THREE.Path();
            this.hole.moveTo( 20, 10 );
            this.hole.absarc( 0, 0, InnerRadius, 0, Math.PI * 2, true );
            this.ring.holes.push(this.hole);
            this.ring = new THREE.Mesh( new THREE.ExtrudeGeometry( this.ring,this.extrudeSettings ),new THREE.MeshLambertMaterial({ color: 0x654321 }) );
            this.ring.castShadow = true;
            this.ring.position.set(0,this.extrudeSettings.depth/2,0);
            this.ring.rotation.x=Math.PI*0.5;
            this.axle.add(this.ring);
            wheels.push(this);

            this.rotateAxle = function(rotationSpeed){
                this.axle.rotation.x += rotationSpeed;
            }
        }
}

function setupDatGui() {

    controls = new function() {

        this.rotate = toRotate;
    }

    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) => toRotate = e);

}

function render() {

    orbitControls.update();

   // wheels.forEach((wheel) => wheel.rotateAxle(0.1));

    if (toRotate)
        scene.rotation.y += speed;  //rotates the scene
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
