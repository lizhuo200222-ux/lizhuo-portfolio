export function mountReferenceFluid(canvas,wrapper,video){const c={current:canvas},l={current:wrapper},d={current:null},u=window,r=4,a=.5,o=1,s=.8;let e=c.current,t=l.current;if(!e||!t)return;let i=e,f=i.getContext(`webgl`,{alpha:!0});if(!f)return;let p=f;p.getExtension(`OES_texture_float`),p.getExtension(`OES_texture_float_linear`),p.clearColor(0,0,0,0);let m={cursorSize:.5+(a-.1)*4.5/.9,cursorPower:5+(o-.1)*45/.9,distortionPower:s},h=1.2,g={x:.65*t.clientWidth,y:.5*t.clientHeight,dx:0,dy:0,moved:!1},_={w:0,h:0},v,y,ee,b,x=null,S=1,C=!1,w=`
precision highp float;

varying vec2 vUv;
attribute vec2 a_position;

varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 u_texel;

void main () {
  vUv = .5 * (a_position + 1.);
  vL = vUv - vec2(u_texel.x, 0.);
  vR = vUv + vec2(u_texel.x, 0.);
  vT = vUv + vec2(0., u_texel.y);
  vB = vUv - vec2(0., u_texel.y);
  gl_Position = vec4(a_position, 0., 1.);
}
`;function T(e,t){let n=p.createShader(t);if(p.shaderSource(n,e),p.compileShader(n),!p.getShaderParameter(n,p.COMPILE_STATUS)){let e=p.getShaderInfoLog(n)||`Shader compile error`;throw p.deleteShader(n),Error(e)}return n}function E(e,t){let n=p.createProgram(),r=T(e,p.VERTEX_SHADER),i=T(t,p.FRAGMENT_SHADER);if(p.attachShader(n,r),p.attachShader(n,i),p.bindAttribLocation(n,0,`a_position`),p.linkProgram(n),!p.getProgramParameter(n,p.LINK_STATUS)){let e=p.getProgramInfoLog(n)||`Program link error`;throw Error(e)}let a={},o=p.getProgramParameter(n,p.ACTIVE_UNIFORMS);for(let e=0;e<o;e++){let t=p.getActiveUniform(n,e);t&&(a[t.name]=p.getUniformLocation(n,t.name))}return{program:n,uniforms:a}}const quadVertices=p.createBuffer(),quadIndices=p.createBuffer();p.bindBuffer(p.ARRAY_BUFFER,quadVertices);p.bufferData(p.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),p.STATIC_DRAW);p.bindBuffer(p.ELEMENT_ARRAY_BUFFER,quadIndices);p.bufferData(p.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),p.STATIC_DRAW);function D(e=null){p.bindBuffer(p.ARRAY_BUFFER,quadVertices);p.bindBuffer(p.ELEMENT_ARRAY_BUFFER,quadIndices);p.vertexAttribPointer(0,2,p.FLOAT,!1,0,0);p.enableVertexAttribArray(0);if(e==null){p.viewport(0,0,p.drawingBufferWidth,p.drawingBufferHeight);p.bindFramebuffer(p.FRAMEBUFFER,null);}else{p.viewport(0,0,e.width,e.height);p.bindFramebuffer(p.FRAMEBUFFER,e.fbo);}p.drawElements(p.TRIANGLES,6,p.UNSIGNED_SHORT,0)}function O(e,t){p.activeTexture(p.TEXTURE0);let n=p.createTexture();p.bindTexture(p.TEXTURE_2D,n),p.texParameteri(p.TEXTURE_2D,p.TEXTURE_MIN_FILTER,p.LINEAR),p.texParameteri(p.TEXTURE_2D,p.TEXTURE_MAG_FILTER,p.LINEAR),p.texParameteri(p.TEXTURE_2D,p.TEXTURE_WRAP_S,p.CLAMP_TO_EDGE),p.texParameteri(p.TEXTURE_2D,p.TEXTURE_WRAP_T,p.CLAMP_TO_EDGE),p.texImage2D(p.TEXTURE_2D,0,p.RGB,e,t,0,p.RGB,p.FLOAT,null);let r=p.createFramebuffer();return p.bindFramebuffer(p.FRAMEBUFFER,r),p.framebufferTexture2D(p.FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,n,0),p.viewport(0,0,e,t),p.clear(p.COLOR_BUFFER_BIT),{fbo:r,width:e,height:t,attach(e){return p.activeTexture(p.TEXTURE0+e),p.bindTexture(p.TEXTURE_2D,n),e}}}function k(e,t){let n=O(e,t),r=O(e,t);return{width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,read:()=>n,write:()=>r,swap(){let e=n;n=r,r=e}}}let A=E(w,`
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D u_input_texture;
uniform float u_ratio;
uniform float u_img_ratio;
uniform vec3 u_point_value;
uniform vec2 u_point;
uniform float u_point_size;

void main () {
  vec2 p = vUv - u_point.xy;
  p.x *= u_ratio;
  vec3 splat = .6 * pow(2., -dot(p, p) / u_point_size) * u_point_value;
  vec3 base = texture2D(u_input_texture, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.);
}
`),j=E(w,`
precision highp float;
precision highp sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D u_velocity_texture;

void main () {
  float L = texture2D(u_velocity_texture, vL).x;
  float R = texture2D(u_velocity_texture, vR).x;
  float T = texture2D(u_velocity_texture, vT).y;
  float B = texture2D(u_velocity_texture, vB).y;
  float div = .25 * (R - L + T - B);
  gl_FragColor = vec4(div, 0., 0., 1.);
}
`),M=E(w,`
precision highp float;
precision highp sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D u_pressure_texture;
uniform sampler2D u_divergence_texture;

void main () {
  float L = texture2D(u_pressure_texture, vL).x;
  float R = texture2D(u_pressure_texture, vR).x;
  float T = texture2D(u_pressure_texture, vT).x;
  float B = texture2D(u_pressure_texture, vB).x;
  float divergence = texture2D(u_divergence_texture, vUv).x;
  float pressure = (L + R + B + T - divergence) * .25;
  gl_FragColor = vec4(pressure, 0., 0., 1.);
}
`),N=E(w,`
precision highp float;
precision highp sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D u_pressure_texture;
uniform sampler2D u_velocity_texture;

void main () {
  float L = texture2D(u_pressure_texture, vL).x;
  float R = texture2D(u_pressure_texture, vR).x;
  float T = texture2D(u_pressure_texture, vT).x;
  float B = texture2D(u_pressure_texture, vB).x;
  vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0., 1.);
}
`),P=E(w,`
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D u_velocity_texture;
uniform sampler2D u_input_texture;
uniform vec2 u_texel;
uniform vec2 u_output_textel;
uniform float u_dt;
uniform float u_dissipation;

vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}

void main () {
  vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
  vec4 velocity = bilerp(u_input_texture, coord, u_output_textel);
  gl_FragColor = u_dissipation * velocity;
}
`),F=E(w,`
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_disturb_power;
uniform sampler2D u_output_texture;
uniform sampler2D u_velocity_texture;
uniform sampler2D u_text_texture;
uniform vec2 u_point;
uniform float u_canvas_scale; // scale < 1.0 to render image smaller than canvas
uniform float u_inner_scale; // additional inner rectangle scale (e.g., 0.8333)

vec2 get_img_uv() {
  // Start from canvas UV and center
  vec2 uv = vUv - 0.5;

  // First shrink to container size inside overscanned canvas
  uv *= u_canvas_scale;

  // Map only the central inner rectangle to the image by expanding UVs
  // Dividing by the inner scale means only a center region of size u_inner_scale
  // in canvas space maps into [0,1]; outside becomes <0 or >1 and thus transparent
  uv /= u_inner_scale;

  // Apply object-fit: cover mapping (from reverse-fish-eye implementation)
  float containerAspect = u_ratio; // width / height of container (not canvas)
  float imageAspect = u_img_ratio; // image width / height
  vec2 scale = vec2(1.0);
  if (containerAspect > imageAspect) {
    // Container is wider than image: scale to fill height, crop left/right
    scale.y = imageAspect / containerAspect;
  } else {
    // Container is taller than image: scale to fill width, crop top/bottom
    scale.x = containerAspect / imageAspect;
  }
  uv *= scale;
  return uv + 0.5;
}

// Frame UVs define the inner rectangle region (no cover scaling)
vec2 get_frame_uv() {
  vec2 uv = vUv - 0.5;
  uv *= u_canvas_scale;
  uv /= u_inner_scale;
  return uv + 0.5;
}

float get_img_frame_alpha(vec2 uv, float img_frame_width) {
  float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);
  img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);
  return img_frame_alpha;
}

// Reduce striation when sampling outside the image bounds
vec3 sample_image_smooth(vec2 uv) {
  vec2 uvc = clamp(uv, 0.0, 1.0);
  vec3 base = texture2D(u_text_texture, vec2(uvc.x, 1.0 - uvc.y)).rgb;

  float yBelow = step(uv.y, 0.0);
  float yAbove = step(1.0, uv.y);
  float xLeft = step(uv.x, 0.0);
  float xRight = step(1.0, uv.x);
  float outOfBounds = max(max(yBelow, yAbove), max(xLeft, xRight));

  // If sampling outside bounds, blur to avoid repeating single edge pixels
  if (outOfBounds > 0.0) {
    float d = 0.002; // small kernel
    vec3 sum = vec3(0.0);
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x - d, 0.0, 1.0), 1.0 - clamp(uvc.y - d, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x, 0.0, 1.0), 1.0 - clamp(uvc.y - d, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x + d, 0.0, 1.0), 1.0 - clamp(uvc.y - d, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x - d, 0.0, 1.0), 1.0 - clamp(uvc.y, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x, 0.0, 1.0), 1.0 - clamp(uvc.y, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x + d, 0.0, 1.0), 1.0 - clamp(uvc.y, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x - d, 0.0, 1.0), 1.0 - clamp(uvc.y + d, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x, 0.0, 1.0), 1.0 - clamp(uvc.y + d, 0.0, 1.0))).rgb;
    sum += texture2D(u_text_texture, vec2(clamp(uvc.x + d, 0.0, 1.0), 1.0 - clamp(uvc.y + d, 0.0, 1.0))).rgb;
    base = sum / 9.0;
  }
  return base;
}

void main () {
  float offset = texture2D(u_output_texture, vUv).r;

  vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
  velocity += .001;
//        velocity = normalize(velocity);

  vec2 img_uv = get_img_uv();
  img_uv -= u_disturb_power * normalize(velocity) * offset;
  img_uv -= u_disturb_power * normalize(velocity) * offset;

  // Use a disturbance on the frame UVs too so the border ripple propagates outward
  vec2 frame_uv = get_frame_uv();
  frame_uv -= u_disturb_power * normalize(velocity) * offset;

  vec3 img = sample_image_smooth(img_uv);
  // Use the disturbed image UVs to compute opacity so ripples affect the border
  float opacity = get_img_frame_alpha(frame_uv, .002);
  gl_FragColor = vec4(img * opacity, opacity);
}
`);z(),L();let I=te();V(0),B();function L(){v=k(_.w,_.h),y=k(_.w,_.h),ee=O(_.w,_.h),b=k(_.w,_.h)}function R(e,t){g.moved=!0,g.dx=6*(e-g.x),g.dy=6*(t-g.y),g.x=e,g.y=t}function te(){let e=()=>{C=!0},n=()=>{C=!1,g.moved=!1},r=e=>{if(!C)return;let n=t.getBoundingClientRect();R(e.clientX-n.left,e.clientY-n.top)},a=e=>{if(!C)return;let n=t.getBoundingClientRect();R(e.clientX-n.left,e.clientY-n.top)},o=e=>{C=!0,e.preventDefault();let n=e.targetTouches[0],r=t.getBoundingClientRect();R(n.clientX-r.left,n.clientY-r.top)},s=()=>{C=!0},c=()=>{C=!1,g.moved=!1},l=()=>{z(),L(),x&&p.bindTexture(p.TEXTURE_2D,x)};i.addEventListener(`mouseenter`,e),i.addEventListener(`mouseleave`,n),i.addEventListener(`click`,r),i.addEventListener(`mousemove`,a),i.addEventListener(`touchstart`,s,{passive:!0}),i.addEventListener(`touchend`,c,{passive:!0}),i.addEventListener(`touchmove`,o,{passive:!1}),u.addEventListener(`resize`,l);let d=new ResizeObserver(()=>{l()});return d.observe(t),()=>{i.removeEventListener(`mouseenter`,e),i.removeEventListener(`mouseleave`,n),i.removeEventListener(`click`,r),i.removeEventListener(`mousemove`,a),i.removeEventListener(`touchstart`,s),i.removeEventListener(`touchend`,c),i.removeEventListener(`touchmove`,o),u.removeEventListener(`resize`,l),d.disconnect()}}function z(){let e=t.clientWidth,n=t.clientHeight,a=Math.min(u.devicePixelRatio||1,2);i.width=Math.max(2,Math.round(e*h*a)),i.height=Math.max(2,Math.round(n*h*a));let o=e*h,s=n*h;i.style.width=`${o}px`,i.style.height=`${s}px`;let c=o/s,l=128+(r-1)*384/9;_.w=Math.round(l*c),_.h=Math.round(l)}function ne(){let e=t.clientWidth*h,n=t.clientHeight*h,r=.5*(e-t.clientWidth),i=.5*(n-t.clientHeight);return{u:(g.x+r)/e,v:1-(g.y+i)/n}}function B(){S=video.videoWidth/Math.max(1,video.videoHeight);x=p.createTexture();p.bindTexture(p.TEXTURE_2D,x);p.texParameteri(p.TEXTURE_2D,p.TEXTURE_MIN_FILTER,p.LINEAR);p.texParameteri(p.TEXTURE_2D,p.TEXTURE_MAG_FILTER,p.LINEAR);p.texParameteri(p.TEXTURE_2D,p.TEXTURE_WRAP_S,p.CLAMP_TO_EDGE);p.texParameteri(p.TEXTURE_2D,p.TEXTURE_WRAP_T,p.CLAMP_TO_EDGE);}let lastUploadedTime=-1;function V(e){let n=1/60;if(g.moved){g.moved=!1,p.useProgram(A.program),p.uniform1i(A.uniforms.u_input_texture,y.read().attach(1)),p.uniform1f(A.uniforms.u_ratio,t.clientWidth/Math.max(1,t.clientHeight));let e=ne();p.uniform2f(A.uniforms.u_point,e.u,e.v),p.uniform3f(A.uniforms.u_point_value,g.dx,-g.dy,0),p.uniform1f(A.uniforms.u_point_size,m.cursorSize*.001),D(y.write()),y.swap(),p.uniform1i(A.uniforms.u_input_texture,v.read().attach(1)),p.uniform3f(A.uniforms.u_point_value,m.cursorPower*.001,0,0),D(v.write()),v.swap()}p.useProgram(j.program),p.uniform2f(j.uniforms.u_texel,y.texelSizeX,y.texelSizeY),p.uniform1i(j.uniforms.u_velocity_texture,y.read().attach(1)),D(ee),p.useProgram(M.program),p.uniform2f(M.uniforms.u_texel,y.texelSizeX,y.texelSizeY),p.uniform1i(M.uniforms.u_divergence_texture,ee.attach(1));for(let e=0;e<16;e++)p.uniform1i(M.uniforms.u_pressure_texture,b.read().attach(2)),D(b.write()),b.swap();p.useProgram(N.program),p.uniform2f(N.uniforms.u_texel,y.texelSizeX,y.texelSizeY),p.uniform1i(N.uniforms.u_pressure_texture,b.read().attach(1)),p.uniform1i(N.uniforms.u_velocity_texture,y.read().attach(2)),D(y.write()),y.swap(),p.useProgram(P.program),p.uniform2f(P.uniforms.u_texel,y.texelSizeX,y.texelSizeY),p.uniform2f(P.uniforms.u_output_textel,y.texelSizeX,y.texelSizeY),p.uniform1i(P.uniforms.u_velocity_texture,y.read().attach(1)),p.uniform1i(P.uniforms.u_input_texture,y.read().attach(1)),p.uniform1f(P.uniforms.u_dt,n),p.uniform1f(P.uniforms.u_dissipation,.97),D(y.write()),y.swap(),p.useProgram(P.program),p.uniform2f(P.uniforms.u_output_textel,v.texelSizeX,v.texelSizeY),p.uniform1i(P.uniforms.u_input_texture,v.read().attach(2)),p.uniform1f(P.uniforms.u_dt,8*n),p.uniform1f(P.uniforms.u_dissipation,.98),D(v.write()),v.swap(),p.useProgram(F.program);let r=ne();p.uniform2f(F.uniforms.u_point,r.u,r.v),p.uniform1i(F.uniforms.u_velocity_texture,y.read().attach(2)),p.uniform1f(F.uniforms.u_ratio,t.clientWidth/Math.max(1,t.clientHeight)),p.uniform1f(F.uniforms.u_img_ratio,S),p.uniform1f(F.uniforms.u_disturb_power,m.distortionPower),p.uniform1i(F.uniforms.u_output_texture,v.read().attach(1)),p.uniform1f(F.uniforms.u_canvas_scale,1),p.uniform1f(F.uniforms.u_inner_scale,.8333333333333334);if(x&&video.readyState>=2&&video.currentTime!==lastUploadedTime){lastUploadedTime=video.currentTime;S=video.videoWidth/Math.max(1,video.videoHeight);p.activeTexture(p.TEXTURE0);p.bindTexture(p.TEXTURE_2D,x);p.texImage2D(p.TEXTURE_2D,0,p.RGBA,p.RGBA,p.UNSIGNED_BYTE,video);}x&&(p.activeTexture(p.TEXTURE0),p.bindTexture(p.TEXTURE_2D,x),p.uniform1i(F.uniforms.u_text_texture,0)),D(),p.viewport(0,0,p.drawingBufferWidth,p.drawingBufferHeight),p.bindFramebuffer(p.FRAMEBUFFER,null),p.drawElements(p.TRIANGLES,6,p.UNSIGNED_SHORT,0),d.current=requestAnimationFrame(V)}return()=>{d.current&&cancelAnimationFrame(d.current);typeof I==`function`&&I();p.deleteBuffer(quadVertices);p.deleteBuffer(quadIndices);}}



