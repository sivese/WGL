
//vertex
async function load_vshader_source() {
    fetch('/shader/vshader.glsl');
}

//fragment
async function load_fshader_source() {
    fetch('/shader/fshader.glsl');
}

// gl -> gl context!
function create_shader(gl, shader_type, shader_source) {
    let shader = gl.createShader(shader_type);
    
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

async function main() {
    let canvas = document.querySelector("#c");
    let gl = canvas.getContext("webgl2");

    if(!gl) {
        console.error("failed to get gl2 context!");
        return;
    }

    var vshader_source = await load_vshader_source();
    var fshader_source = await load_fshader_source();
}

main();