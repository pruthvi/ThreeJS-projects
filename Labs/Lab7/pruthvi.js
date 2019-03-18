var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    axesHelper;
   
var plane, cube;
var cubeGeo, cubeMaterial;

 var objects = [];
 var mouse, raycaster;
 var rollOverMesh, rollOverMaterial;



function init(){

   
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf2e8ff);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    var gridHelper = new THREE.GridHelper( 10, 10 );
    scene.add( gridHelper );


    raycaster = new THREE.Raycaster();


    document.addEventListener( 'mousemove', mouseOver, false );

    window.addEventListener( 'resize', onWindowResize, false );

    clock = new THREE.Clock();



}



function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);

}

function createGeometry(){



    var dirLight = new THREE.DirectionalLight(0xFFF33F);
    dirLight.position.set(5,0,20);
    dirLight.castShadow = true; 
    scene.add(dirLight);
    scene.add(dirLight);

    var hemLight = new THREE.HemisphereLight(0xFF33FF);
    hemLight.position.set(5,0,20);
    hemLight.castShadow = true;
    scene.add(hemLight);
    scene.add(hemLight);


    var rollOverGeo = new THREE.BoxBufferGeometry( 1, 1, 1 );
    rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
    rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
    scene.add( rollOverMesh );

    mouse = new THREE.Vector2();



    let geom = new THREE.PlaneGeometry(1,1,1,1);
    mat = new THREE.MeshLambertMaterial({color: 0xf20051});
    let plane = new THREE.Mesh(geom, mat);
    plane.rotateX( - Math.PI / 2 );
    plane.position.set(0.5,0,0.5);
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);



    let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    let boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ff , map: new THREE.TextureLoader().load( 'assets/textures/square.jpg') });
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0.5,0.5,0.5);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);

/*
     var voxel = new THREE.Mesh( boxGeometry, mat );
     voxel.position.copy( intersect.point ).add( intersect.face.normal );
     voxel.position.divideScalar( 10 ).floor().multiplyScalar( 10 ).addScalar( 25 );
     scene.add( voxel );
     objects.push( voxel );
*/



}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function mouseOver( event ){
    event.preventDefault();
    mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects );
    if ( intersects.length > 0 ) {
        var intersect = intersects[ 0 ];
        rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
        rollOverMesh.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 0.5 );
    }
    render();    

}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}

