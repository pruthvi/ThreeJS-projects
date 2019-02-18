var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui,
    axesHelper;

var spoke;
 
 
 
function init(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);
    axesHelper = new THREE.AxesHelper(5);

    clock = new THREE.Clock();
 
}
 
function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(100,0,0);
    camera.lookAt(scene.position);
 
    let ambient = new THREE.AmbientLight(0x3c3c3c,5);
    ambient.position.set(0,0,0);
    scene.add(ambient);
 
    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);
}
 
 
 
function createGeometry(){
 
    scene.add(axesHelper);

    let geom = new THREE.PlaneGeometry(60,60,1,1);
    mat = new THREE.MeshLambertMaterial({color: 0xf20051});
    let plane = new THREE.Mesh(geom, mat);
    //    plane.rotateX = 0.5 * Math.PI;
     plane.rotation.x = Math.PI * -0.5;

   // plane.rotation.x = -90;
    plane.position.set(0,0,0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);


    var geometry = new THREE.CylinderGeometry( 5, 5, 5, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.set(0, 50, 0);
    cylinder.rotation.z = -0.5 * Math.PI;
    scene.add( cylinder );



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

    scene.add(meshS);
                

    spoke = new THREE.Object3D();
    spoke.position.set(0,50,0);
    addSpoke(spoke, 0xf20051, 30);
 
    spoke2 = new THREE.Object3D();
    spoke2.position.set(0,50,0);
    addSpoke(spoke2, 0xf20051, 180);
}
 
 
function addSpoke(container, myColor, angle){
 
        let geometry = new THREE.CylinderGeometry( 3, 3, 50, 32 );
        var material = new THREE.MeshPhongMaterial( {color: myColor} );
        var cylinder = new THREE.Mesh( geometry, material );
        
        cylinder.rotation.x = angle;
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
 
        container.add(cylinder);
        scene.add(container);
 
}
 
 
 
function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
   
  /*  sun.rotation.y = 0;
    planet1.rotation.y += 0.01;
    planet2.rotation.y += 0.02;
    moon2.rotation.z += 0.01;
    moon1.rotation.z += 0.01;  
   */
    requestAnimationFrame(render);
}
 
window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}