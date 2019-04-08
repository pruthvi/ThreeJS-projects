/*  
    Copyright Pruthvi // pruthv.com 
*/

var renderer = new THREE.WebGLRenderer({ antialias: true });
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls, clock;
var ambientLight, dirLight;

var texture, elf;

var bloom, composer, bloomComposer;
var gammaCorrectionShader;
var renderedScene;
var bloomPass, renderPass, effectCopy, renderScene;


function init() {

    clock = new THREE.Clock();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x004400);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
}

function setupCameraAndLight() {

    camera.position.set(0, 10, 30);
    camera.lookAt(scene.position);
    scene.add(new THREE.AmbientLight(0x666666));

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(3, 10, 3);
    spotLight.intensity = 0.6;
    scene.add(spotLight);

}

function createGeometry() {

    /* Skybox */
    var urls = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
    var loader = new THREE.CubeTextureLoader().setPath('textures/cube/');
    loader.load(urls, function (texture) {
        var pmremGenerator = new THREE.PMREMGenerator(texture);
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();
        scene.background = texture;
    });

    /* Collada Model */
    var loadingManager = new THREE.LoadingManager(function () {     // loading manager
        scene.add(elf);
    });
    var loader = new THREE.ColladaLoader(loadingManager);
    loader.load('./model/elf.dae', function (collada) {
        elf = collada.scene;
    });


    renderPass = new THREE.RenderPass(scene, camera);
    effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;
    bloomPass = new THREE.BloomPass(3, 25, 5.0, 256);
    gammaCorrectionShader = new THREE.ShaderPass(THREE.GammaCorrectionShader);

    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(effectCopy);
    composer.addPass(gammaCorrectionShader);

    renderScene = new THREE.TexturePass(composer.renderTarget2);
    bloomComposer = new THREE.EffectComposer(renderer);
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    bloomComposer.addPass(effectCopy);
}


function setupDatGui() {

    var controls = new function () {

        // bloompass
        this.strength = 3;
        this.kernelSize = 25;
        this.sigma = 5.0;
        this.resolution = 256;
        this.updateEffectBloom = function () {
            bloomPass = new THREE.BloomPass(controls.strength, controls.kernelSize, controls.sigma, controls.resolution);
            bloomComposer = new THREE.EffectComposer(renderer);
            bloomComposer.addPass(renderScene);
            bloomComposer.addPass(bloomPass);
            bloomComposer.addPass(effectCopy);
        };

       // this.gamma = true;
    };

    let gui = new dat.GUI();

    var bpFolder = gui.addFolder("BloomPass");
    bpFolder.add(controls, "strength", 1, 10).onChange(controls.updateEffectBloom);
    bpFolder.add(controls, "kernelSize", 1, 100).onChange(controls.updateEffectBloom);
    bpFolder.add(controls, "sigma", 1, 10).onChange(controls.updateEffectBloom);
    bpFolder.add(controls, "resolution", 0, 1024).onChange(controls.updateEffectBloom);
    // addBloomPassControls(gui, controls, bloomPass, function(updated) {bloomComposer.passes[1] = updated;});


    addShaderControl(gui, "GammaCorrection", gammaCorrectionShader, {});

    // var gcFolder = gui.addFolder("Gamma");
    // gcFolder.add(controls, "gamma").name("Enable")
    //     .onChange((e) => {
    //         if (e) {
    //             gammaCorrectionShader.enabled = true;
    //             console.log("True");
    //         }
    //         else {
    //             gammaCorrectionShader.enabled = false;
    //             console.log("false");
    //         }
    //     });


}

function render() {

    var delta = clock.getDelta();
    orbitControls.update(delta);

    renderer.autoClear = false;
    renderer.clear();

    composer.render(delta);
    bloomComposer.render(delta);

    requestAnimationFrame(render);

}

window.onload = () => {
    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    render();
}