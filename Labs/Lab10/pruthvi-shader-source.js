var Shaders = {};

Shaders.BasicShader1 = {

    name: 'BasicShader1',

    uniforms: {

        'texture': { value: null },
        'time': { type: 'f', value: 0 }

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
        uniform sampler2D texture;
        uniform float time;
        varying vec2 vUv;

        void main(void)
        {
            vec3 color;
            vec4 tex = texture2D(texture, vUv);

            //color = cA.rgb * cA.a + cT.rgb * cT.a * (1.0 - cA.a); 
            color = vec3(0.1 - tex.r, 1.0 - tex.g,  0.5 - tex.b);

            gl_FragColor= vec4(color,1.0);

           // gl_FragColor= vec4(tex.r* sin(time), tex.g , tex.b, tex.a);
        }

        `

    ].join('\n')

};

Shaders.BasicShader2 = {

    name: 'BasicShader2',

    uniforms: {

        'texture': { value: null },
        'time': { type: 'f', value: 0 }

    },

    vertexShader: [

        `
        varying vec2 vUv;
        uniform float time;
        uniform sampler2D texture;
        void main(){
            
            vUv = uv;
            vec4 color = texture2D(texture, vUv);
    
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position + (normal * color.r * sin(time) * 0.45), 1.0);
    

        }

        `

    ].join('\n'),

    fragmentShader: [

        `
        uniform sampler2D texture;
        uniform float time;
        varying vec2 vUv;

        void main(void)
        {
            vec3 color;
            vec4 tex = texture2D(texture, vUv);

            // color = cA.rgb * cA.a + cT.rgb * cT.a * (1.0 - cA.a); 
            color = vec3(0.1 - tex.r, 1.0 - tex.g,  0.5 - tex.b);

            gl_FragColor= vec4(color, 1.0);

           // gl_FragColor= vec4(tex.r* sin(time), tex.g , tex.b, tex.a);

        }
        `

    ].join('\n')

};

Shaders.BasicShader3 = {

    name: 'BasicShader3',

    uniforms: {

        'texture': { value: null },
        'time': { type: 'f', value: 0 }

    },

    vertexShader: [

        `
        varying vec2 vUv;
        uniform float time;
        uniform sampler2D texture;
        void main(){
            
            vUv = vec2(fract(uv.x + time * 0.1), uv.y);
            vec4 color = texture2D(texture, vUv);
    
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position + abs(normal * color.r * sin(time) * 0.45), 1.0);
    

        }

        `

    ].join('\n'),

    fragmentShader: [

        `
        uniform sampler2D texture;
        uniform float time;
        varying vec2 vUv;

        void main(void)
        {
            vec3 color;
            vec4 tex = texture2D(texture, vUv);

            // color = cA.rgb * cA.a + cT.rgb * cT.a * (1.0 - cA.a); 
            color = vec3(0.1 - tex.r, 1.0 - tex.g,  0.5 - tex.b);

            gl_FragColor= vec4(color, 1.0);

           // gl_FragColor= vec4(tex.r* sin(time), tex.g , tex.b, tex.a);

        }
        `

    ].join('\n')

};