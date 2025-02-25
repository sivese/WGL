
//vertex
async function load_vshader_source() {
    let res = await fetch('./shader/vshader.glsl');
    return res.text();
}

//fragment
async function load_fshader_source() {
    let res = await fetch('./shader/fshader.glsl');
    return res.text();
}

// gl -> gl context!
function create_shader(gl, shader_type, shader_source) {
    let shader = gl.createShader(shader_type);
    
    console.log(`load shader code\n${shader_source}`)
    //toss source to shader object, then compile it!
    gl.shaderSource(shader, shader_source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

// v -> vertex, f -> fragment
function create_program(gl, vshader, fshader) {
    let program = gl.createProgram();
    
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    
    if(success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

async function GLMain() {
    let canvas = document.querySelector("#c");
    let gl = canvas.getContext("webgl2");

    if(!gl) {
        console.error("failed to get gl2 context!");
        return;
    }

    let vshader_source = await load_vshader_source();
    let vshader = create_shader(gl, gl.VERTEX_SHADER, vshader_source);

    let fshader_source = await load_fshader_source();
    let fshader = create_shader(gl, gl.FRAGMENT_SHADER, fshader_source);

    let gl_program = create_program(gl, vshader, fshader);

    let position_attribute_location = gl.getAttribLocation(gl_program, "a_position");
    let resolution_uniform_location = gl.getUniformLocation(gl_program, "u_resolution");

    let position_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);

    let positions = [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    //VAO = vertext array object
    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(position_attribute_location);

    // vertext attribute pointer parameters
    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    gl.vertexAttribPointer(
        position_attribute_location, size, type, normalize, stride, offset
    );

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(gl_program);
    gl.uniform2f(resolution_uniform_location, gl.canvas.width, gl.canvas.height);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    let primitiveType = gl.TRIANGLES;
    let count = 6;
    offset = 0; //variable reuse
    
    gl.drawArrays(primitiveType, offset, count);
}

export default GLMain;