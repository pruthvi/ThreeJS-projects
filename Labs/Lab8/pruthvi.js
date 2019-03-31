/*  
    Copyright Pruthvi // pruthv.com 
*/

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();


//const scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls;

var ambientLight, dirLight;

var axle = new THREE.Object3D();

var texture, elf;

var bloom, composer;
var params = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0,
    bloomRadius: 0
};
var rotateScene;

var stats;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    var clock = new THREE.Clock();

    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    //document.body.appendChild(stats.dom);

    rotateScene = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);


    var urls = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
    var loader = new THREE.CubeTextureLoader().setPath('textures/cube/');
    loader.load(urls, function (texture) {
        var pmremGenerator = new THREE.PMREMGenerator(texture);
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);
        var envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();
        scene.background = texture;
    });

       
    // loading manager
    var loadingManager = new THREE.LoadingManager( function () {
        scene.add( elf );
    } );

    // collada
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.load( './model/elf.dae', function ( collada ) {
        elf = collada.scene;
    } );

    var renderScene = new THREE.RenderPass( scene, camera );

    // var bloomPass = new THREE.BloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    // bloomPass.threshold = params.bloomThreshold;
    // bloomPass.strength = params.bloomStrength;
    // bloomPass.radius = params.bloomRadius;

    // composer = new THREE.EffectComposer( renderer );
    // composer.setSize( window.innerWidth, window.innerHeight );
    // composer.addPass( renderScene );
    // composer.addPass( bloomPass );

    var webgl = new THREE.WebGLRenderer();    

    //webgl.gammaInput = true;

//     var renderScene = new THREE.RenderPass(scene, camera);
    
//     var bloomPass = new THREE.BloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
//    // bloomPass = new THREE.BloomPass(2,3, 0.2, 0.3);
//    bloomPass.threshold = params.bloomThreshold;
//    bloomPass.strength = params.bloomStrength;
//    bloomPass.radius = params.bloomRadius;

//    var renderPass = new THREE.RenderPass();
//     composer = new THREE.EffectComposer( renderScene );
//    composer.setSize( window.innerWidth, window.innerHeight );
//    composer.addPass( renderPass );
//    composer.addPass( bloomPass );
// //     bloom = new THREE.BloomPass();
//      scene.add(bloomPass);
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

   // scene.add(new THREE.AxesHelper(10));




}

window.onresize = function () {

    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );

};


function setupDatGui() {

    controls = new function () {

        this.lvl1 = function () {

        };

    }

    let gui = new dat.GUI();
    gui.add(controls, 'lvl1').name('Level 1');


}


function render() {

    //composer.render();

			//	const delta = clock.getDelta();
//composer.render(delta);
    // stats.update();       // For updating stats and fps
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
    render();
}
