

/// <reference path="../libs/three.min.js" />
/// <reference path="../libs/dat.gui.min.js" />
/// <reference path="../libs/orbitcontrols.js" />


const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);
const clock = new THREE.Clock();

const __shader1 = Shaders.BasicShader1;
const __shader2 = Shaders.BasicShader2;
const __shader3 = Shaders.BasicShader3;
const __shader4 = Shaders.BasicShader4;

var mesh, material;
var orbitControls, controls,
    speed = 0.01,
    toRotate = true;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x327ffc);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function setupCameraAndLight() {
    camera.position.set(100, 10, 0);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));
    scene.position.set(0, -10, 0);

    let directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(20, 60, 10);
    directionalLight.castShadow = true;
    directionalLight.target = scene;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    let hemiSphereLight = new THREE.HemisphereLight(0x7777cc, 0x00ff00, 0.6);//skycolor, groundcolor, intensity  
    hemiSphereLight.position.set(0, 100, 0);
    scene.add(hemiSphereLight);
}

function createGeometry() {

    scene.add(new THREE.AxesHelper(100));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 100),
        new THREE.MeshLambertMaterial({ color: 0xeeeeee })
    );
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);


    /* Shader 1 - Basic Texture */
    __shader1.uniforms.texture.value = new THREE.TextureLoader().load('assets/textures/general/floor-wood.jpg');
    material1 = new THREE.ShaderMaterial(
    	{
    	    uniforms: __shader1.uniforms,
    		vertexShader: __shader1.vertexShader,
    		fragmentShader: __shader1.fragmentShader
        });
    mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        material1
    );
    mesh1.position.set(0, 10, 10);
    mesh1.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh1.castShadow = true;
    scene.add(mesh1);

        /* Shader 2 - Basic Texture */
        __shader2.uniforms.texture.value = new THREE.TextureLoader().load('assets/textures/general/floor-wood.jpg');
        __shader2.uniforms.alphatexture.value = new THREE.TextureLoader().load('assets/textures/alpha/partial-transparency.png');
    material2 = new THREE.ShaderMaterial(
    	{
    	    uniforms: __shader2.uniforms,
    		vertexShader: __shader2.vertexShader,
    		fragmentShader: __shader2.fragmentShader
        });
    mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        material2
    );
    mesh2.position.set(0, 10, 30);
    mesh2.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh2.castShadow = true;
    scene.add(mesh2);


        /* Shader 3 - Basic Texture */
    __shader3.uniforms.texture.value = new THREE.TextureLoader().load('assets/textures/general/floor-wood.jpg');
    __shader3.uniforms.alphatexture.value = new THREE.TextureLoader().load('assets/textures/alpha/partial-transparency.png');
    material3 = new THREE.ShaderMaterial(
    	{
    	    uniforms: __shader3.uniforms,
    		vertexShader: __shader3.vertexShader,
    		fragmentShader: __shader3.fragmentShader
        });
    mesh3 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        material3
    );
    mesh3.position.set(0, 10, -10);
    mesh3.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh3.castShadow = true;
    scene.add(mesh3);


        /* Shader 4 - Basic Texture */
    __shader4.uniforms.texture.value = new THREE.TextureLoader().load('assets/textures/general/floor-wood.jpg');
    __shader4.uniforms.alphatexture.value = new THREE.TextureLoader().load('assets/textures/alpha/partial-transparency.png');
    material4 = new THREE.ShaderMaterial(
    	{
    	    uniforms: __shader4.uniforms,
    		vertexShader: __shader4.vertexShader,
    		fragmentShader: __shader4.fragmentShader
        });
    mesh4 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        material4
    );
    mesh4.position.set(0, 10, -30);
    mesh4.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    mesh4.castShadow = true;
    scene.add(mesh4);


}

function setupDatGui() {

    controls = new function() {

        this.shader1 = function () {
            __shader = Shaders.BasicShader1;
            material = new THREE.ShaderMaterial(
                {
                    uniforms: __shader.uniforms,
                    vertexShader: __shader.vertexShader,
                    fragmentShader: __shader.fragmentShader
                });
                mesh.material = material;
            console.log("Shader 1");
        };
        this.shader2 = function () {
            __shader = Shaders.BasicShader2;
            material = new THREE.ShaderMaterial(
                {
                    uniforms: __shader.uniforms,
                    vertexShader: __shader.vertexShader,
                    fragmentShader: __shader.fragmentShader
                });
                mesh.material = material;

            console.log("Shader 2");
        };        
        this.shader3 = function () {
            console.log("Shader 3");
            __shader = Shaders.BasicShader3;
            __shader.uniforms.texture.value = new THREE.TextureLoader().load('assets/textures/general/floor-wood.jpg');
            material = new THREE.ShaderMaterial(
                {
                    uniforms: __shader.uniforms,
                    vertexShader: __shader.vertexShader,
                    fragmentShader: __shader.fragmentShader
                });
                mesh.material = material;


        };        
        this.shader4 = function () {
            console.log("Shader 4");
            
        };
    }

    let gui = new dat.GUI();
    // var bpFolder = gui.addFolder("BloomPass");
    // bpFolder.add(controls, "strength", 1, 10).onChange(controls.updateEffectBloom);


    gui.add(controls, 'shader1').name("Shader 1");
    gui.add(controls, 'shader2').name("Shader 2");
    gui.add(controls, 'shader3').name("Shader 3");
    gui.add(controls, 'shader4').name("Shader 4");


}

function render() {

    orbitControls.update();
    // if (toRotate)
    //     scene.rotation.y += speed;//rotates the scene  
    // __shader1.uniforms.time.value = clock.getElapsedTime();
    // __shader2.uniforms.time.value = clock.getElapsedTime();
    __shader3.uniforms.time.value = clock.getElapsedTime();
    __shader4.uniforms.time.value = clock.getElapsedTime();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
  //  setupDatGui();
    render();

}
