var Shaders = {};

Shaders.BasicShader1 = {

    name: 'BasicShader1',

    uniforms: {
        'texture': { value: null }
    },

    vertexShader: [
        `
        varying vec2 vUv;
        void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        
        `

    ].join('\n'),

    fragmentShader: [

        `
       varying vec2 vUv;
       uniform sampler2D texture;

       void main()
       {
            vec4 color = texture2D(texture, vUv);

            gl_FragColor = vec4(color);
       }
    
       `

    ].join('\n')


};


Shaders.BasicShader2 = {

    name: 'BasicShader2',

    uniforms: {

        'texture': { value: null },
        'alphatexture': { value: null }

    },

    vertexShader: [

        `
        varying vec2 vUv;
        void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }

        `

    ].join('\n'),

    fragmentShader: [

        `
        uniform float time;
        uniform sampler2D texture;
        uniform sampler2D alphatexture;

        varying vec2 vUv;

        void main(void)
        {
            vec3 color;
            vec4 cA = texture2D(alphatexture, vUv);
            vec4 cT = texture2D(texture, vUv);
            color = cA.rgb * cA.a + cT.rgb * cT.a * (1.0 - cA.a); 
            gl_FragColor= vec4(color, 1.0);
        }

        `

    ].join('\n')

};

Shaders.BasicShader3 = {

    name: 'BasicShader3',

    uniforms: {
        'time': { type: 'f', value: 0 },

        'texture': { value: null },
        'alphatexture': { value: null }

    },

    vertexShader: [

        `
        varying vec2 vUv;
        void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }

        `

    ].join('\n'),

    fragmentShader: [

        `
        uniform float time;
        uniform sampler2D texture;
        uniform sampler2D alphatexture;

        varying vec2 vUv;

        void main(void)
        {
            vec3 color;
           // vUv = vec2(vUv.x + sin(time), vUv.y);
            vec4 cA = texture2D(alphatexture, vUv) * sin(time);
            vec4 cT = texture2D(texture, vUv);
            color = cA.rgb * cA.a + cT.rgb * cT.a * (1.0 - cA.a); 
            gl_FragColor= vec4(color, 1.0);
        }


        `

    ].join('\n')

};

Shaders.BasicShader4 = {

    name: 'BasicShader4',

    uniforms: {
        'time': { type: 'f', value: 0 },

        'texture': { value: null },

        'alphatexture': { value: null }

    },

    vertexShader: [

        `
        uniform float time;

        varying vec2 vUv;
        void main(){
        vUv = uv;
        vec3 pos = position;
       // pos.z+= 4.0 * sin(time) * sin(pos.x + time) * sin(pos.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }

        `

    ].join('\n'),

    fragmentShader: [

        `
        uniform float time;
        uniform sampler2D texture;
        uniform sampler2D alphatexture;

        varying vec2 vUv;

        void main(void)
        {
            vec3 color;
           // vUv = vec2(vUv.x + sin(time), vUv.y);
            vec4 cA = texture2D(alphatexture, vUv);
            vec4 cT = texture2D(texture, vUv);
            color = cA.rgb * cA.a + cT.rgb * cT.a * (1.0 - cA.a); 
            gl_FragColor= vec4(color, 1.0);
        }

        `

    ].join('\n')

};