/*  
    Copyright Pruthvi // pruthv.com 
*/

var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui,
    axesHelper;


var spoke;
var axle = new THREE.Object3D();
var wheels = [], wheel;

var speed = 0.01, rotateScene = false, rotateWheel = false;

var position = 0,
    outerRadius = 15,
    innerRadius = 14,
    axleRadius = 3,
    spokesNo = 12,
    wheelColor = 0x7a2e3b,
    axleColor = 0x7a2e3b;

function init() {
    scene = new THREE.Scene();
   
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
   
    document.body.appendChild(renderer.domElement);
  
    axesHelper = new THREE.AxesHelper(10);

    clock = new THREE.Clock();

}

function setupCameraAndLight() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-100, 50, 40);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));

    let spotLight = new THREE.SpotLight();
    spotLight.position.set(10, 60, 10);
    scene.add(spotLight);
    // let spotLightHelper = new THREE.SpotLightHelper(spotLight);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);
}

function createGeometry() {

    scene.add(axesHelper);

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshLambertMaterial({ color: 0x4286f4 })
    );
    plane.material.side = THREE.DoubleSide;
    plane.position.set(0, -12, 0);
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    /*
        var shape = new THREE.Shape( );
        shape.absellipse( 0, 0, 20, 30, 0, Math.PI * 2, true);
       // .absellipse ( x : Float, y : Float, xRadius : Float, yRadius : Float, startAngle : Float, endAngle : Float, clockwise : Float, rotation : Float ) : null
    
        var hole = new THREE.Path();
        hole.absellipse( 0, 0, 15, 15, 0, Math.PI * 2, false );
        shape.holes.push( hole );
    */

    createWheel(0, outerRadius, innerRadius, axleRadius, 8, wheelColor, axleColor);
    createWheel(10, outerRadius, innerRadius, axleRadius, 12, wheelColor, axleColor);
}


function createWheel(position, outerRadius, innerRadius, axleRadius, spokesNo, wheelColor, axleColor) {

    return new function () {

        wheel = new THREE.Group();

        // Axle
        this.axle = new THREE.Mesh(new THREE.CylinderGeometry(axleRadius, axleRadius, 4, 30), new THREE.MeshLambertMaterial({ color: axleColor }));
        this.axle.position.set(position, 25, 0);
        this.axle.rotation.z = Math.PI * 0.5;
        this.axle.castShadow = true;
        this.axle.receiveShadow = true;
        wheel.add(this.axle);
        scene.add(wheel);

        //  Spoke
        this.angle = 0;
        for (let i = 0; i < spokesNo; i++) {
            this.spoke = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 20, 10), new THREE.MeshLambertMaterial({ color: 0xa07f46 }));
            this.spoke.position.set(0, 0, 0);
            this.spoke.geometry.scale(1, 1, 1);
            this.spoke.rotation.x = Math.PI * 0.5;
            this.spoke.rotation.z = Math.PI * this.angle;
            this.angle += 1 / (spokesNo / 2);
            this.spoke.geometry.translate(0, 5, 0);
            this.spoke.castShadow = true;
            this.axle.add(this.spoke);
        }

        // Outer Ring
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
        this.ring.moveTo(50, 10);
        this.ring.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
        this.hole = new THREE.Path();
        this.hole.moveTo(20, 10);
        this.hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
        this.ring.holes.push(this.hole);
        this.ring = new THREE.Mesh(new THREE.ExtrudeGeometry(this.ring, this.extrudeSettings), new THREE.MeshLambertMaterial({ color: wheelColor }));
        this.ring.castShadow = true;
        this.ring.position.set(0, this.extrudeSettings.depth / 2, 0);
        this.ring.rotation.x = Math.PI * 0.5;
        this.axle.add(this.ring);
        wheels.push(this);

        this.rotateAxle = function (rotationSpeed) {
            this.axle.rotation.x += rotationSpeed * Math.PI;
        }
    }
}

function setupDatGui() {

    controls = new function () {

        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
        this.axleRadius = axleRadius;
        this.spokesNo = spokesNo;
        this.wColor = 0x654321;
        this.aColor = 0x48240a;
        this.rotateWheel = rotateWheel;
        this.rotate = rotateScene;
        this.position = position;
        this.newWheel = function () {
            createWheel(position, outerRadius, innerRadius, axleRadius, spokesNo, wheelColor, axleColor)
        }
    }

    let gui = new dat.GUI();
    gui.add(controls, 'outerRadius', 6, 20).name("Wheel Size").onChange((c) => outerRadius = c);
    gui.add(controls, 'innerRadius', 0, 20).name("Wheel Breadth").onChange((c) => innerRadius = c);
    gui.addColor(controls, 'wColor').name('Wheel Color').onChange((c) => { wheelColor = new THREE.Color(c); });
    gui.add(controls, 'axleRadius', 0, 5).name("Rim Size").onChange((c) => axleRadius = c);
    gui.addColor(controls, 'aColor').name('Axle Color').onChange((c) => { axleColor = new THREE.Color(c); });
    gui.add(controls, 'spokesNo', 2, 20).step(2).name("No. of Spoke").onChange((c) => spokesNo = c);
    gui.add(controls, 'position', -40, 40).name("Wheel PositionX").step(1).onChange((c) => position = c);
    gui.add(controls, 'rotateWheel').name("Rotate Wheel").onChange((c) => rotateWheel = c);
    gui.add(controls, 'rotate').name("Rotate Scene").onChange((c) => rotateScene = c);
    gui.add(controls, 'newWheel').name("Create Wheel");

}

function render() {

    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    
    if (rotateScene) {                  // rotates the scene
        scene.rotation.y += speed;  
    }
    if (rotateWheel) {
        wheels.forEach((wheel) => wheel.rotateAxle(0.005));
    }

    requestAnimationFrame(render);
}

window.onload = () => {
    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    render();
}