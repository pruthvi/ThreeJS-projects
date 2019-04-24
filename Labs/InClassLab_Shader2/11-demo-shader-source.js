var Shaders = {};

Shaders.BasicShader = {

    name: 'BasicShader',

    uniforms: {},

    vertexShader: [

        'void main(){',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',

        '}'

    ].join('\n'),

    fragmentShader: [

        'void main(){',

        'gl_FragColor = vec4(1.0, 0, 0, 0.5);',

        '}'

    ].join('\n')


};


Shaders.BasicShader1 = {

    name: 'BasicShader1',

    uniforms: {
        'time': { type: 'f', value: 0 }
    },

    vertexShader: [

        'uniform float time;',

        'void main(){',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position * abs(sin(time * 5.0)), 1.0);',

        '}'

    ].join('\n'),

    fragmentShader: [

        'uniform float time;',

        'void main(){',

        'gl_FragColor = vec4(abs(sin(time)), abs(sin(time*3.0)), 0, 0.5);',

        '}'

    ].join('\n')

};

Shaders.BasicShader2 = {

    name: 'BasicShader2',

    uniforms: {
        'time': { type: 'f', value: 0 }
    },

    vertexShader: [

        'uniform float time;',

        'void main(){',
        'vec3 pos = position;',
        ' pos.z+= 4.0 * sin(time) * sin(pos.x) * sin(pos.y);',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);',

        '}'

    ].join('\n'),

    fragmentShader: [

        'uniform float time;',
        'vec3 colora = vec3(0.062, 0.384, 0.91);',
        'vec3 colorb = vec3(0.909, 0.062, 0.062);',


        'void main(){',
        'vec3 color = mix(colora, colorb, abs(sin(time)));',

        'gl_FragColor = vec4(color, 1.0);',

        '}'

    ].join('\n')

};
Shaders.BasicShader3 = {

    name: 'BasicShader3',

  
    uniforms: {
        'time': { type: 'f', value: 0 }
    },

    vertexShader: [

        'uniform float time; varying vec2 vUv;',

        'void main(){',
        'vUv = uv;',
        'vec3 pos = position;',
        ' pos.z+= 4.0 * sin(time) * sin(pos.x + time) * sin(pos.y);',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);',

        '}'

    ].join('\n'),

    fragmentShader: [

        'uniform float time; varying vec2 vUv;',
        'vec3 colora = vec3(0.062, 0.384, 0.91);',
        'vec3 colorb = vec3(0.909, 0.062, 0.062);',


        'void main(){',
        'vec3 color = mix(colora, colorb, abs(sin(time)));',

        'gl_FragColor = vec4(vec3(vUv + sin(time), 0.0), 1.0);',

        '}'

    ].join('\n')

};