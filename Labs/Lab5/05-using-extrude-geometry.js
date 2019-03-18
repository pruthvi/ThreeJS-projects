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
var wheels =[];
var rotate;
 
 
function init(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);
    axesHelper = new THREE.AxesHelper(10);

    clock = new THREE.Clock();
    
    controls = new function() {

        this.rotate = true;

    }
    let gui = new dat.GUI();
    gui.add(controls, 'rotate').onChange((e) =>{
             if(e){  rotate = true;    }
             else{   rotate = false;   }
        });

}
 
function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(200,50,0);
    camera.lookAt(scene.position);
 
    let ambient = new THREE.AmbientLight(0x3c3c3c,2);
    ambient.position.set(0,0,0);
    scene.add(ambient);

    let point = new THREE.PointLight(0x3c3c3c,5);
    point.position.set(0,10,0);
    scene.add(point);

 
    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);
}
 
 
 
function createGeometry(){
 
    scene.add(axesHelper);

    let geom = new THREE.PlaneGeometry(100,100,1,1);
    mat = new THREE.MeshLambertMaterial({color: 0xf20051});
    let plane = new THREE.Mesh(geom, mat);
    plane.position.set(0,0,0);    
    plane.rotation.x = Math.PI * -0.5;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);



    var shape = new THREE.Shape( );
    shape.absellipse( 0, 0, 20, 30, 0, Math.PI * 2, true);
   // .absellipse ( x : Float, y : Float, xRadius : Float, yRadius : Float, startAngle : Float, endAngle : Float, clockwise : Float, rotation : Float ) : null

    var hole = new THREE.Path();
    hole.absellipse( 0, 0, 15, 15, 0, Math.PI * 2, false );
    shape.holes.push( hole );
    var extrudeSettings = { steps: 5, depth: 16, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 1 };
    var geomS = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var matS = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var meshS = new THREE.Mesh( geomS, matS ) ;
   // meshS.rotation.y = -0.5 * Math.PI;

   // scene.add(meshS);
                
    createWheel(0,15,14,3);
    createWheel(10,15,14,3);

}


function createWheel(position, outerRadius, InnerRadius, axleRadius){

    return new function(){

    // Center
    this.axle = new THREE.Mesh(new THREE.CylinderGeometry(axleRadius, axleRadius, 4, 30),new THREE.MeshLambertMaterial({ color: 0x7a2e3b }));
    this.axle.position.set(position, 25, 0);
    this.axle.rotation.z = Math.PI * 0.5;
    this.axle.castShadow = true;
    scene.add(this.axle);

    //  Rims
        this.angle = 0;
        for(let i = 0; i<12; i++){
            this.spoke = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 20, 10),new THREE.MeshLambertMaterial({ color: 0xa07f46 }));
            this.spoke.position.set(0, 0, 0);
            this.spoke.geometry.scale(1, 1, 1); 
            this.spoke.rotation.x =Math.PI * 0.5;
            this.spoke.rotation.z =Math.PI * this.angle;
            this.angle += 1/6;
            this.spoke.geometry.translate(0, 5, 0);
            this.spoke.castShadow = true;
            this.axle.add(this.spoke);
        }
    // Tire
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
            this.ring = new THREE.Mesh( new THREE.ExtrudeGeometry( this.ring,this.extrudeSettings ),new THREE.MeshLambertMaterial({ color: 0x7a2e3b }) );
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
 
 
 
function render(){
   
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    if(rotate == true){
        scene.rotation.y += 0.01;
    }
    requestAnimationFrame(render);
}
 
window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}