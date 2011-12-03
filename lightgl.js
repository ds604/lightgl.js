/*
 * lightgl.js
 * http://github.com/evanw/lightgl.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var GL=function(){function G(){d.MODELVIEW=B|1;d.PROJECTION=B|2;var b=new l,c=new l;d.modelviewMatrix=new l;d.projectionMatrix=new l;var a=[],e=[],f,i;d.matrixMode=function(g){switch(g){case d.MODELVIEW:f="modelviewMatrix";i=a;break;case d.PROJECTION:f="projectionMatrix";i=e;break;default:throw"invalid matrix mode "+g;}};d.loadIdentity=function(){l.identity(d[f])};d.loadMatrix=function(g){g=g.m;for(var h=d[f].m,k=0;k<16;k++)h[k]=g[k]};d.multMatrix=function(g){d.loadMatrix(l.multiply(d[f],g,c))};d.perspective=
function(g,h,k,m){d.multMatrix(l.perspective(g,h,k,m,b))};d.frustum=function(g,h,k,m,n,o){d.multMatrix(l.frustum(g,h,k,m,n,o,b))};d.ortho=function(g,h,k,m,n,o){d.multMatrix(l.ortho(g,h,k,m,n,o,b))};d.scale=function(g,h,k){d.multMatrix(l.scale(g,h,k,b))};d.translate=function(g,h,k){d.multMatrix(l.translate(g,h,k,b))};d.rotate=function(g,h,k,m){d.multMatrix(l.rotate(g,h,k,m,b))};d.lookAt=function(g,h,k,m,n,o,H,I,J){d.multMatrix(l.lookAt(g,h,k,m,n,o,H,I,J,b))};d.pushMatrix=function(){i.push(Array.prototype.slice.call(d[f].m))};
d.popMatrix=function(){var g=i.pop();d[f].m=C?new Float32Array(g):g};d.project=function(g,h,k,m,n,o){m=m||d.modelviewMatrix;n=n||d.projectionMatrix;o=o||d.getParameter(d.VIEWPORT);g=n.transformPoint(m.transformPoint(new j(g,h,k)));return new j(o[0]+o[2]*(g.x*0.5+0.5),o[1]+o[3]*(g.y*0.5+0.5),g.z*0.5+0.5)};d.unProject=function(g,h,k,m,n,o){m=m||d.modelviewMatrix;n=n||d.projectionMatrix;o=o||d.getParameter(d.VIEWPORT);g=new j((g-o[0])/o[2]*2-1,(h-o[1])/o[3]*2-1,k*2-1);return l.inverse(l.multiply(n,m,
b),c).transformPoint(g)};d.matrixMode(d.MODELVIEW)}function K(){var b={mesh:new p({coords:true,colors:true,triangles:false}),mode:-1,coord:[0,0,0,0],color:[1,1,1,1],pointSize:1,shader:new y("uniform float pointSize;varying vec4 color;varying vec4 coord;varying vec2 pixel;void main(){color=gl_Color;coord=gl_TexCoord;gl_Position=gl_ModelViewProjectionMatrix*gl_Vertex;pixel=gl_Position.xy/gl_Position.w*0.5+0.5;gl_PointSize=pointSize;}",
"uniform sampler2D texture;uniform float pointSize;uniform bool useTexture;uniform vec2 windowSize;varying vec4 color;varying vec4 coord;varying vec2 pixel;void main(){gl_FragColor=color;if(useTexture)gl_FragColor*=texture2D(texture,coord.xy);}")};d.pointSize=function(c){b.shader.uniforms({pointSize:c})};d.begin=function(c){if(b.mode!=-1)throw"mismatched gl.begin() and gl.end() calls";b.mode=c;b.mesh.colors=[];b.mesh.coords=
[];b.mesh.vertices=[]};d.color=function(c,a,e,f){b.color=arguments.length==1?c.toArray().concat(1):[c,a,e,f||1]};d.texCoord=function(c,a){b.coord=arguments.length==1?c.toArray(2):[c,a]};d.vertex=function(c,a,e){b.mesh.colors.push(b.color);b.mesh.coords.push(b.coord);b.mesh.vertices.push(arguments.length==1?c.toArray():[c,a,e])};d.end=function(){if(b.mode==-1)throw"mismatched gl.begin() and gl.end() calls";b.mesh.compile();b.shader.uniforms({windowSize:[d.canvas.width,d.canvas.height],useTexture:!!d.getParameter(d.TEXTURE_BINDING_2D)}).draw(b.mesh,
b.mode);b.mode=-1}}function L(){function b(f){for(var i=f.pageX,g=f.pageY,h=d.canvas;h;h=h.offsetParent){i-=h.offsetLeft;g-=h.offsetTop}f.deltaX=i-c;f.deltaY=g-a;f.x=i;f.y=g;c=i;a=g;f.dragging=false;for(var k in e)if(e[k])f.dragging=true}var c=0,a=0,e={};s(d.canvas,"mousedown",function(f){e[f.which]=true;b(f);d.onmousedown&&d.onmousedown(f)});s(d.canvas,"mousemove",function(f){b(f);d.onmousemove&&d.onmousemove(f)});s(d.canvas,"mouseup",function(f){e[f.which]=false;b(f);d.onmouseup&&d.onmouseup(f)})}
function D(b){return{8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"}[b]||(b>=65&&b<=90?String.fromCharCode(b):null)}function s(b,c,a){b.addEventListener(c,a)}function M(){(function(b){d.makeCurrent=function(){d=b}})(d);d.animate=function(){function b(){d=e;var f=new Date;d.onupdate&&d.onupdate((f-a)/1E3);d.ondraw&&d.ondraw();c(b);a=f}var c=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(f){setTimeout(f,
1E3/60)},a=new Date,e=d;b()};d.fullscreen=function(b){function c(){d.canvas.width=window.innerWidth-e-f;d.canvas.height=window.innerHeight-a-i;d.viewport(0,0,d.canvas.width,d.canvas.height);if(b.camera||!("camera"in b)){d.matrixMode(d.PROJECTION);d.loadIdentity();d.perspective(b.fov||45,d.canvas.width/d.canvas.height,b.near||0.1,b.far||1E3);d.matrixMode(d.MODELVIEW)}d.ondraw&&d.ondraw()}b=b||{};var a=b.paddingTop||0,e=b.paddingLeft||0,f=b.paddingRight||0,i=b.paddingBottom||0;if(!document.body)throw"document.body doesn't exist yet (call gl.fullscreen() from window.onload() or from inside the <body> tag)";
document.body.appendChild(d.canvas);document.body.style.overflow="hidden";d.canvas.style.position="absolute";d.canvas.style.left=e+"px";d.canvas.style.top=a+"px";window.addEventListener("resize",c);c()}}function l(){var b=Array.prototype.concat.apply([],arguments);b.length||(b=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);this.m=C?new Float32Array(b):b}function w(){this.unique=[];this.indices=[];this.map={}}function x(b,c){this.buffer=null;this.target=b;this.type=c;this.data=[]}function p(b){b=b||{};this.vertexBuffers=
{};this.indexBuffers={};this.addVertexBuffer("vertices","gl_Vertex");b.coords&&this.addVertexBuffer("coords","gl_TexCoord");b.normals&&this.addVertexBuffer("normals","gl_Normal");b.colors&&this.addVertexBuffer("colors","gl_Color");if(!("triangles"in b)||b.triangles)this.addIndexBuffer("triangles");b.lines&&this.addIndexBuffer("lines")}function E(b){return new j((b&1)*2-1,(b&2)-1,(b&4)/2-1)}function t(b,c,a){this.t=arguments.length?b:Number.MAX_VALUE;this.hit=c;this.normal=a}function u(){var b=d.getParameter(d.VIEWPORT),
c=d.modelviewMatrix.m,a=new j(c[0],c[4],c[8]),e=new j(c[1],c[5],c[9]),f=new j(c[2],c[6],c[10]);c=new j(c[3],c[7],c[11]);this.eye=new j(-c.dot(a),-c.dot(e),-c.dot(f));a=b[0];e=a+b[2];f=b[1];c=f+b[3];this.ray00=d.unProject(a,f,1).subtract(this.eye);this.ray10=d.unProject(e,f,1).subtract(this.eye);this.ray01=d.unProject(a,c,1).subtract(this.eye);this.ray11=d.unProject(e,c,1).subtract(this.eye);this.viewport=b}function y(b,c){function a(g,h,k){for(;(result=g.exec(h))!=null;)k(result)}function e(g,h){var k=
/^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(h);h=k?k[1]+g+h.substr(k[1].length):g+h;a(/\bgl_\w+\b/g,g,function(m){h=h.replace(RegExp(m,"g"),"_"+m)});return h}function f(g,h){var k=d.createShader(g);d.shaderSource(k,h);d.compileShader(k);if(!d.getShaderParameter(k,d.COMPILE_STATUS))throw"compile error: "+d.getShaderInfoLog(k);return k}b=e("attribute vec4 gl_Vertex;attribute vec4 gl_TexCoord;attribute vec3 gl_Normal;attribute vec4 gl_Color;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;",
b);c=e("precision highp float;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;",c);this.program=d.createProgram();d.attachShader(this.program,f(d.VERTEX_SHADER,b));d.attachShader(this.program,f(d.FRAGMENT_SHADER,c));d.linkProgram(this.program);if(!d.getProgramParameter(this.program,d.LINK_STATUS))throw"link error: "+d.getProgramInfoLog(this.program);this.attributes={};var i={};a(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g,
b+c,function(g){i[g[2]]=1});this.isSampler=i;this.needsMVP=(b+c).indexOf("gl_ModelViewProjectionMatrix")!=-1}function r(b,c,a){a=a||{};this.id=d.createTexture();this.width=b;this.height=c;this.format=a.format||d.RGBA;this.type=a.type||d.UNSIGNED_BYTE;d.bindTexture(d.TEXTURE_2D,this.id);d.pixelStorei(d.UNPACK_FLIP_Y_WEBGL,1);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,a.filter||a.magFilter||d.LINEAR);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,a.filter||a.minFilter||d.LINEAR);d.texParameteri(d.TEXTURE_2D,
d.TEXTURE_WRAP_S,a.wrap||a.wrapS||d.CLAMP_TO_EDGE);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,a.wrap||a.wrapT||d.CLAMP_TO_EDGE);d.texImage2D(d.TEXTURE_2D,0,this.format,b,c,0,this.format,this.type,null)}function j(b,c,a){this.x=b||0;this.y=c||0;this.z=a||0}var d,v={create:function(b){b=b||{};var c=document.createElement("canvas");c.width=800;c.height=600;if(!("alpha"in b))b.alpha=false;try{d=c.getContext("webgl",b)}catch(a){}try{d=d||c.getContext("experimental-webgl",b)}catch(e){}if(!d)throw"WebGL not supported";
G();K();L();M();return d},keys:{},Matrix:l,Indexer:w,Buffer:x,Mesh:p,HitTest:t,Raytracer:u,Shader:y,Texture:r,Vector:j};s(document,"keydown",function(b){if(!b.altKey&&!b.ctrlKey&&!b.metaKey){var c=D(b.keyCode);if(c)v.keys[c]=true;v.keys[b.keyCode]=true}});s(document,"keyup",function(b){if(!b.altKey&&!b.ctrlKey&&!b.metaKey){var c=D(b.keyCode);if(c)v.keys[c]=false;v.keys[b.keyCode]=false}});var B=305397760,C=typeof Float32Array!="undefined";l.prototype={inverse:function(){return l.inverse(this,new l)},
transpose:function(){return l.transpose(this,new l)},multiply:function(b){return l.multiply(this,b,new l)},transformPoint:function(b){var c=this.m;return(new j(c[0]*b.x+c[1]*b.y+c[2]*b.z+c[3],c[4]*b.x+c[5]*b.y+c[6]*b.z+c[7],c[8]*b.x+c[9]*b.y+c[10]*b.z+c[11])).divide(c[12]*b.x+c[13]*b.y+c[14]*b.z+c[15])},transformVector:function(b){var c=this.m;return new j(c[0]*b.x+c[1]*b.y+c[2]*b.z,c[4]*b.x+c[5]*b.y+c[6]*b.z,c[8]*b.x+c[9]*b.y+c[10]*b.z)}};l.inverse=function(b,c){c=c||new l;var a=b.m,e=c.m;e[0]=a[5]*
a[10]*a[15]-a[5]*a[14]*a[11]-a[6]*a[9]*a[15]+a[6]*a[13]*a[11]+a[7]*a[9]*a[14]-a[7]*a[13]*a[10];e[1]=-a[1]*a[10]*a[15]+a[1]*a[14]*a[11]+a[2]*a[9]*a[15]-a[2]*a[13]*a[11]-a[3]*a[9]*a[14]+a[3]*a[13]*a[10];e[2]=a[1]*a[6]*a[15]-a[1]*a[14]*a[7]-a[2]*a[5]*a[15]+a[2]*a[13]*a[7]+a[3]*a[5]*a[14]-a[3]*a[13]*a[6];e[3]=-a[1]*a[6]*a[11]+a[1]*a[10]*a[7]+a[2]*a[5]*a[11]-a[2]*a[9]*a[7]-a[3]*a[5]*a[10]+a[3]*a[9]*a[6];e[4]=-a[4]*a[10]*a[15]+a[4]*a[14]*a[11]+a[6]*a[8]*a[15]-a[6]*a[12]*a[11]-a[7]*a[8]*a[14]+a[7]*a[12]*
a[10];e[5]=a[0]*a[10]*a[15]-a[0]*a[14]*a[11]-a[2]*a[8]*a[15]+a[2]*a[12]*a[11]+a[3]*a[8]*a[14]-a[3]*a[12]*a[10];e[6]=-a[0]*a[6]*a[15]+a[0]*a[14]*a[7]+a[2]*a[4]*a[15]-a[2]*a[12]*a[7]-a[3]*a[4]*a[14]+a[3]*a[12]*a[6];e[7]=a[0]*a[6]*a[11]-a[0]*a[10]*a[7]-a[2]*a[4]*a[11]+a[2]*a[8]*a[7]+a[3]*a[4]*a[10]-a[3]*a[8]*a[6];e[8]=a[4]*a[9]*a[15]-a[4]*a[13]*a[11]-a[5]*a[8]*a[15]+a[5]*a[12]*a[11]+a[7]*a[8]*a[13]-a[7]*a[12]*a[9];e[9]=-a[0]*a[9]*a[15]+a[0]*a[13]*a[11]+a[1]*a[8]*a[15]-a[1]*a[12]*a[11]-a[3]*a[8]*a[13]+
a[3]*a[12]*a[9];e[10]=a[0]*a[5]*a[15]-a[0]*a[13]*a[7]-a[1]*a[4]*a[15]+a[1]*a[12]*a[7]+a[3]*a[4]*a[13]-a[3]*a[12]*a[5];e[11]=-a[0]*a[5]*a[11]+a[0]*a[9]*a[7]+a[1]*a[4]*a[11]-a[1]*a[8]*a[7]-a[3]*a[4]*a[9]+a[3]*a[8]*a[5];e[12]=-a[4]*a[9]*a[14]+a[4]*a[13]*a[10]+a[5]*a[8]*a[14]-a[5]*a[12]*a[10]-a[6]*a[8]*a[13]+a[6]*a[12]*a[9];e[13]=a[0]*a[9]*a[14]-a[0]*a[13]*a[10]-a[1]*a[8]*a[14]+a[1]*a[12]*a[10]+a[2]*a[8]*a[13]-a[2]*a[12]*a[9];e[14]=-a[0]*a[5]*a[14]+a[0]*a[13]*a[6]+a[1]*a[4]*a[14]-a[1]*a[12]*a[6]-a[2]*
a[4]*a[13]+a[2]*a[12]*a[5];e[15]=a[0]*a[5]*a[10]-a[0]*a[9]*a[6]-a[1]*a[4]*a[10]+a[1]*a[8]*a[6]+a[2]*a[4]*a[9]-a[2]*a[8]*a[5];a=a[0]*e[0]+a[1]*e[4]+a[2]*e[8]+a[3]*e[12];for(var f=0;f<16;f++)e[f]/=a;return c};l.transpose=function(b,c){c=c||new l;var a=b.m,e=c.m;e[0]=a[0];e[1]=a[4];e[2]=a[8];e[3]=a[12];e[4]=a[1];e[5]=a[5];e[6]=a[9];e[7]=a[13];e[8]=a[2];e[9]=a[6];e[10]=a[10];e[11]=a[14];e[12]=a[3];e[13]=a[7];e[14]=a[11];e[15]=a[15];return c};l.multiply=function(b,c,a){a=a||new l;b=b.m;c=c.m;var e=a.m;
e[0]=b[0]*c[0]+b[1]*c[4]+b[2]*c[8]+b[3]*c[12];e[1]=b[0]*c[1]+b[1]*c[5]+b[2]*c[9]+b[3]*c[13];e[2]=b[0]*c[2]+b[1]*c[6]+b[2]*c[10]+b[3]*c[14];e[3]=b[0]*c[3]+b[1]*c[7]+b[2]*c[11]+b[3]*c[15];e[4]=b[4]*c[0]+b[5]*c[4]+b[6]*c[8]+b[7]*c[12];e[5]=b[4]*c[1]+b[5]*c[5]+b[6]*c[9]+b[7]*c[13];e[6]=b[4]*c[2]+b[5]*c[6]+b[6]*c[10]+b[7]*c[14];e[7]=b[4]*c[3]+b[5]*c[7]+b[6]*c[11]+b[7]*c[15];e[8]=b[8]*c[0]+b[9]*c[4]+b[10]*c[8]+b[11]*c[12];e[9]=b[8]*c[1]+b[9]*c[5]+b[10]*c[9]+b[11]*c[13];e[10]=b[8]*c[2]+b[9]*c[6]+b[10]*c[10]+
b[11]*c[14];e[11]=b[8]*c[3]+b[9]*c[7]+b[10]*c[11]+b[11]*c[15];e[12]=b[12]*c[0]+b[13]*c[4]+b[14]*c[8]+b[15]*c[12];e[13]=b[12]*c[1]+b[13]*c[5]+b[14]*c[9]+b[15]*c[13];e[14]=b[12]*c[2]+b[13]*c[6]+b[14]*c[10]+b[15]*c[14];e[15]=b[12]*c[3]+b[13]*c[7]+b[14]*c[11]+b[15]*c[15];return a};l.identity=function(b){b=b||new l;var c=b.m;c[0]=c[5]=c[10]=c[15]=1;c[1]=c[2]=c[3]=c[4]=c[6]=c[7]=c[8]=c[9]=c[11]=c[12]=c[13]=c[14]=0;return b};l.perspective=function(b,c,a,e,f){b=Math.tan(b*Math.PI/360)*a;c=b*c;return l.frustum(-c,
c,-b,b,a,e,f)};l.frustum=function(b,c,a,e,f,i,g){g=g||new l;var h=g.m;h[0]=2*f/(c-b);h[1]=0;h[2]=(c+b)/(c-b);h[3]=0;h[4]=0;h[5]=2*f/(e-a);h[6]=(e+a)/(e-a);h[7]=0;h[8]=0;h[9]=0;h[10]=-(i+f)/(i-f);h[11]=-2*i*f/(i-f);h[12]=0;h[13]=0;h[14]=-1;h[15]=0;return g};l.ortho=function(b,c,a,e,f,i,g){g=g||new l;var h=g.m;h[0]=2/(c-b);h[1]=0;h[2]=0;h[3]=-(c+b)/(c-b);h[4]=0;h[5]=2/(e-a);h[6]=0;h[7]=-(e+a)/(e-a);h[8]=0;h[9]=0;h[10]=-2/(i-f);h[11]=-(i+f)/(i-f);h[12]=0;h[13]=0;h[14]=0;h[15]=1;return g};l.scale=function(b,
c,a,e){e=e||new l;var f=e.m;f[0]=b;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=c;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=a;f[11]=0;f[12]=0;f[13]=0;f[14]=0;f[15]=1;return e};l.translate=function(b,c,a,e){e=e||new l;var f=e.m;f[0]=1;f[1]=0;f[2]=0;f[3]=b;f[4]=0;f[5]=1;f[6]=0;f[7]=c;f[8]=0;f[9]=0;f[10]=1;f[11]=a;f[12]=0;f[13]=0;f[14]=0;f[15]=1;return e};l.rotate=function(b,c,a,e,f){if(!b||!c&&!a&&!e)return l.identity(f);f=f||new l;var i=f.m,g=Math.sqrt(c*c+a*a+e*e);b*=Math.PI/180;c/=g;a/=g;e/=g;g=Math.cos(b);b=Math.sin(b);
var h=1-g;i[0]=c*c*h+g;i[1]=c*a*h-e*b;i[2]=c*e*h+a*b;i[3]=0;i[4]=a*c*h+e*b;i[5]=a*a*h+g;i[6]=a*e*h-c*b;i[7]=0;i[8]=e*c*h-a*b;i[9]=e*a*h+c*b;i[10]=e*e*h+g;i[11]=0;i[12]=0;i[13]=0;i[14]=0;i[15]=1;return f};l.lookAt=function(b,c,a,e,f,i,g,h,k,m){m=m||new l;var n=m.m;b=new j(b,c,a);e=new j(e,f,i);h=new j(g,h,k);g=b.subtract(e).unit();h=h.cross(g).unit();k=g.cross(h).unit();n[0]=h.x;n[1]=h.y;n[2]=h.z;n[3]=-h.dot(b);n[4]=k.x;n[5]=k.y;n[6]=k.z;n[7]=-k.dot(b);n[8]=g.x;n[9]=g.y;n[10]=g.z;n[11]=-g.dot(b);n[12]=
0;n[13]=0;n[14]=0;n[15]=1;return m};w.prototype={add:function(b){var c=JSON.stringify(b);if(!(c in this.map)){this.map[c]=this.unique.length;this.unique.push(b)}return this.map[c]}};x.prototype={compile:function(b){for(var c=[],a=0;a<this.data.length;a+=1E4)c=Array.prototype.concat.apply(c,this.data.slice(a,a+1E4));a=this.data.length?c.length/this.data.length:0;if(a!=Math.round(a))throw"buffer elements not of consistent size, average size is "+a;this.buffer=this.buffer||d.createBuffer();this.buffer.length=
c.length;this.buffer.spacing=a;d.bindBuffer(this.target,this.buffer);d.bufferData(this.target,new this.type(c),b||d.STATIC_DRAW)}};p.prototype={addVertexBuffer:function(b,c){(this.vertexBuffers[c]=new x(d.ARRAY_BUFFER,Float32Array)).name=b;this[b]=[]},addIndexBuffer:function(b){this.indexBuffers[b]=new x(d.ELEMENT_ARRAY_BUFFER,Int16Array);this[b]=[]},compile:function(){for(var b in this.vertexBuffers){var c=this.vertexBuffers[b];c.data=this[c.name];c.compile()}for(var a in this.indexBuffers){c=this.indexBuffers[a];
c.data=this[a];c.compile()}},transform:function(b){this.vertices=this.vertices.map(function(a){return b.transformPoint(j.fromArray(a)).toArray()});if(this.normals){var c=b.inverse().transpose();this.normals=this.normals.map(function(a){return c.transformVector(j.fromArray(a)).unit().toArray()})}this.compile();return this},computeNormals:function(){this.normals||this.addVertexBuffer("normals","gl_Normal");for(var b=0;b<this.vertices.length;b++)this.normals[b]=new j;for(b=0;b<this.triangles.length;b++){var c=
this.triangles[b],a=j.fromArray(this.vertices[c[0]]),e=j.fromArray(this.vertices[c[1]]),f=j.fromArray(this.vertices[c[2]]);a=e.subtract(a).cross(f.subtract(a)).unit();this.normals[c[0]]=this.normals[c[0]].add(a);this.normals[c[1]]=this.normals[c[1]].add(a);this.normals[c[2]]=this.normals[c[2]].add(a)}for(b=0;b<this.vertices.length;b++)this.normals[b]=this.normals[b].unit().toArray();this.compile();return this},computeWireframe:function(){for(var b=new w,c=0;c<this.triangles.length;c++)for(var a=this.triangles[c],
e=0;e<a.length;e++){var f=a[e],i=a[(e+1)%a.length];b.add([Math.min(f,i),Math.max(f,i)])}this.lines||this.addIndexBuffer("lines");this.lines=b.unique;this.compile();return this},getAABB:function(){var b={min:new j(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)};b.max=b.min.negative();for(var c=0;c<this.vertices.length;c++){var a=j.fromArray(this.vertices[c]);b.min=j.min(b.min,a);b.max=j.max(b.max,a)}return b},getBoundingSphere:function(){var b=this.getAABB();b={center:b.min.add(b.max).divide(2),
radius:0};for(var c=0;c<this.vertices.length;c++)b.radius=Math.max(b.radius,j.fromArray(this.vertices[c]).subtract(b.center).length());return b}};p.plane=function(b){b=b||{};var c=new p(b);detailX=b.detailX||b.detail||1;detailY=b.detailY||b.detail||1;for(b=0;b<=detailY;b++)for(var a=b/detailY,e=0;e<=detailX;e++){var f=e/detailX;c.vertices.push([2*f-1,2*a-1,0]);c.coords&&c.coords.push([f,a]);c.normals&&c.normals.push([0,0,1]);if(e<detailX&&b<detailY){f=e+b*(detailX+1);c.triangles.push([f,f+1,f+detailX+
1]);c.triangles.push([f+detailX+1,f+1,f+detailX+2])}}c.compile();return c};var F=[[0,4,2,6,-1,0,0],[1,3,5,7,+1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,+1,0],[0,2,1,3,0,0,-1],[4,5,6,7,0,0,+1]];p.cube=function(b){b=new p(b);for(var c=0;c<F.length;c++){for(var a=F[c],e=c*4,f=0;f<4;f++){b.vertices.push(E(a[f]).toArray());b.coords&&b.coords.push([f&1,(f&2)/2]);b.normals&&b.normals.push(a.slice(4,7))}b.triangles.push([e,e+1,e+2]);b.triangles.push([e+2,e+1,e+3])}b.compile();return b};p.sphere=function(b){b=b||
{};var c=new p(b),a=new w;detail=b.detail||6;for(b=0;b<8;b++)for(var e=E(b),f=e.x*e.y*e.z>0,i=[],g=0;g<=detail;g++){for(var h=0;g+h<=detail;h++){var k=g/detail,m=h/detail,n=(detail-g-h)/detail;m={vertex:(new j(k+(k-k*k)/2,m+(m-m*m)/2,n+(n-n*n)/2)).unit().multiply(e).toArray()};if(c.coords)m.coord=e.y>0?[1-k,n]:[n,1-k];i.push(a.add(m))}if(g>0)for(h=0;g+h<=detail;h++){k=(g-1)*(detail+1)+(g-1-(g-1)*(g-1))/2+h;m=g*(detail+1)+(g-g*g)/2+h;c.triangles.push(f?[i[k],i[m],i[k+1]]:[i[k],i[k+1],i[m]]);g+h<detail&&
c.triangles.push(f?[i[m],i[m+1],i[k+1]]:[i[m],i[k+1],i[m+1]])}}c.vertices=a.unique.map(function(o){return o.vertex});if(c.coords)c.coords=a.unique.map(function(o){return o.coord});if(c.normals)c.normals=c.vertices;c.compile();return c};p.load=function(b,c){c=c||{};if(!("coords"in c))c.coords=!!b.coords;if(!("normals"in c))c.normals=!!b.normals;var a=new p(c);a.vertices=b.vertices;if(a.coords)a.coords=b.coords;if(a.normals)a.normals=b.normals;a.triangles=b.triangles||[];a.lines=b.lines||[];a.compile();
return a};t.prototype={mergeWith:function(b){if(b.t>0&&b.t<this.t){this.t=b.t;this.hit=b.hit;this.normal=b.normal}}};u.prototype={getRayForPixel:function(b,c){b=(b-this.viewport[0])/this.viewport[2];c=1-(c-this.viewport[1])/this.viewport[3];var a=j.lerp(this.ray00,this.ray10,b),e=j.lerp(this.ray01,this.ray11,b);return j.lerp(a,e,c).unit()}};u.hitTestBox=function(b,c,a,e){var f=a.subtract(b).divide(c),i=e.subtract(b).divide(c),g=j.min(f,i);f=j.max(f,i);g=g.max();f=f.min();if(g>0&&g<f){b=b.add(c.multiply(g));
a=a.add(1.0E-6);e=e.subtract(1.0E-6);return new t(g,b,new j((b.x>e.x)-(b.x<a.x),(b.y>e.y)-(b.y<a.y),(b.z>e.z)-(b.z<a.z)))}return null};u.hitTestSphere=function(b,c,a,e){var f=b.subtract(a),i=c.dot(c),g=2*c.dot(f);f=f.dot(f)-e*e;f=g*g-4*i*f;if(f>0){i=(-g-Math.sqrt(f))/(2*i);b=b.add(c.multiply(i));return new t(i,b,b.subtract(a).divide(e))}return null};u.hitTestTriangle=function(b,c,a,e,f){var i=e.subtract(a),g=f.subtract(a);f=i.cross(g).unit();e=f.dot(a.subtract(b)).divide(f.dot(c));if(e>0){b=b.add(c.multiply(e));
var h=b.subtract(a);a=g.dot(g);c=g.dot(i);g=g.dot(h);var k=i.dot(i);i=i.dot(h);h=a*k-c*c;k=(k*g-c*i)/h;i=(a*i-c*g)/h;if(k>=0&&i>=0&&k+i<=1)return new t(e,b,f)}return null};y.prototype={uniforms:function(b){d.useProgram(this.program);for(var c in b){var a=d.getUniformLocation(this.program,c);if(a){var e=b[c];if(e instanceof j)e=[e.x,e.y,e.z];else if(e instanceof l)e=e.m;var f=Object.prototype.toString.call(e);if(f=="[object Array]"||f=="[object Float32Array]")switch(e.length){case 1:d.uniform1fv(a,
new Float32Array(e));break;case 2:d.uniform2fv(a,new Float32Array(e));break;case 3:d.uniform3fv(a,new Float32Array(e));break;case 4:d.uniform4fv(a,new Float32Array(e));break;case 9:d.uniformMatrix3fv(a,false,new Float32Array([e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]]));break;case 16:d.uniformMatrix4fv(a,false,new Float32Array([e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14],e[3],e[7],e[11],e[15]]));break;default:throw"don't know how to load uniform \""+c+'" of length '+e.length;
}else{f=Object.prototype.toString.call(e);if(f=="[object Number]"||f=="[object Boolean]")(this.isSampler[c]?d.uniform1i:d.uniform1f).call(d,a,e);else throw'attempted to set uniform "'+c+'" to invalid value '+e;}}}return this},draw:function(b,c){this.drawBuffers(b.vertexBuffers,b.indexBuffers[c==d.LINES?"lines":"triangles"],arguments.length<2?d.TRIANGLES:c)},drawBuffers:function(b,c,a){this.uniforms({_gl_ModelViewMatrix:d.modelviewMatrix,_gl_ProjectionMatrix:d.projectionMatrix});this.needsMVP&&this.uniforms({_gl_ModelViewProjectionMatrix:d.projectionMatrix.multiply(d.modelviewMatrix)});
var e=0,f;for(f in b){var i=b[f],g=this.attributes[f]||d.getAttribLocation(this.program,f.replace(/^gl_/,"_gl_"));if(!(g==-1||!i.buffer)){this.attributes[f]=g;d.bindBuffer(d.ARRAY_BUFFER,i.buffer);d.enableVertexAttribArray(g);d.vertexAttribPointer(g,i.buffer.spacing,d.FLOAT,false,0,0);e=i.buffer.length/i.buffer.spacing}}for(f in this.attributes)f in b||d.disableVertexAttribArray(this.attributes[f]);if(e&&(!c||c.buffer))if(c){d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,c.buffer);d.drawElements(a,c.buffer.length,
d.UNSIGNED_SHORT,0)}else d.drawArrays(a,0,e);return this}};var z,q,A;r.prototype={bind:function(b){d.activeTexture(d.TEXTURE0+(b||0));d.bindTexture(d.TEXTURE_2D,this.id)},unbind:function(b){d.activeTexture(d.TEXTURE0+(b||0));d.bindTexture(d.TEXTURE_2D,null)},drawTo:function(b){var c=d.getParameter(d.VIEWPORT);z=z||d.createFramebuffer();q=q||d.createRenderbuffer();d.bindFramebuffer(d.FRAMEBUFFER,z);d.bindRenderbuffer(d.RENDERBUFFER,q);if(this.width!=q.width||this.height!=q.height){q.width=this.width;
q.height=this.height;d.renderbufferStorage(d.RENDERBUFFER,d.DEPTH_COMPONENT16,this.width,this.height)}d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,this.id,0);d.framebufferRenderbuffer(d.FRAMEBUFFER,d.DEPTH_ATTACHMENT,d.RENDERBUFFER,q);d.viewport(0,0,this.width,this.height);b();d.bindFramebuffer(d.FRAMEBUFFER,null);d.bindRenderbuffer(d.RENDERBUFFER,null);d.viewport(c[0],c[1],c[2],c[3])},swapWith:function(b){var c;c=b.id;b.id=this.id;this.id=c;c=b.width;b.width=this.width;this.width=
c;c=b.height;b.height=this.height;this.height=c}};r.fromImage=function(b,c){c=c||{};var a=new r(b.width,b.height,c);try{d.texImage2D(d.TEXTURE_2D,0,a.format,a.format,a.type,b)}catch(e){if(location.protocol=="file:")throw'image not loaded for security reasons (serve this page over "http://" instead)';else throw"image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)";}c.minFilter&&c.minFilter!=d.NEAREST&&c.minFilter!=d.LINEAR&&
d.generateMipmap(d.TEXTURE_2D);return a};r.fromURL=function(b,c){A=A||function(){var f=document.createElement("canvas").getContext("2d");f.canvas.width=f.canvas.height=128;for(var i=0;i<f.canvas.height;i+=16)for(var g=0;g<f.canvas.width;g+=16){f.fillStyle=(g^i)&16?"#FFF":"#DDD";f.fillRect(g,i,16,16)}return f.canvas}();var a=r.fromImage(A,c),e=new Image;e.onload=function(){r.fromImage(e,c).swapWith(a)};e.src=b;return a};j.prototype={negative:function(){return new j(-this.x,-this.y,-this.z)},add:function(b){return b instanceof
j?new j(this.x+b.x,this.y+b.y,this.z+b.z):new j(this.x+b,this.y+b,this.z+b)},subtract:function(b){return b instanceof j?new j(this.x-b.x,this.y-b.y,this.z-b.z):new j(this.x-b,this.y-b,this.z-b)},multiply:function(b){return b instanceof j?new j(this.x*b.x,this.y*b.y,this.z*b.z):new j(this.x*b,this.y*b,this.z*b)},divide:function(b){return b instanceof j?new j(this.x/b.x,this.y/b.y,this.z/b.z):new j(this.x/b,this.y/b,this.z/b)},equals:function(b){return this.x==b.x&&this.y==b.y&&this.z==b.z},dot:function(b){return this.x*
b.x+this.y*b.y+this.z*b.z},cross:function(b){return new j(this.y*b.z-this.z*b.y,this.z*b.x-this.x*b.z,this.x*b.y-this.y*b.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},toAngles:function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}},toArray:function(b){return[this.x,this.y,this.z].slice(0,
b||3)},clone:function(){return new j(this.x,this.y,this.z)},init:function(b,c,a){this.x=b;this.y=c;this.z=a;return this}};j.negative=function(b,c){c.x=-b.x;c.y=-b.y;c.z=-b.z;return c};j.add=function(b,c,a){if(c instanceof j){a.x=b.x+c.x;a.y=b.y+c.y;a.z=b.z+c.z}else{a.x=b.x+c;a.y=b.y+c;a.z=b.z+c}return a};j.subtract=function(b,c,a){if(c instanceof j){a.x=b.x-c.x;a.y=b.y-c.y;a.z=b.z-c.z}else{a.x=b.x-c;a.y=b.y-c;a.z=b.z-c}return a};j.multiply=function(b,c,a){if(c instanceof j){a.x=b.x*c.x;a.y=b.y*c.y;
a.z=b.z*c.z}else{a.x=b.x*c;a.y=b.y*c;a.z=b.z*c}return a};j.divide=function(b,c,a){if(c instanceof j){a.x=b.x/c.x;a.y=b.y/c.y;a.z=b.z/c.z}else{a.x=b.x/c;a.y=b.y/c;a.z=b.z/c}return a};j.cross=function(b,c,a){a.x=b.y*c.z-b.z*c.y;a.y=b.z*c.x-b.x*c.z;a.z=b.x*c.y-b.y*c.x;return a};j.unit=function(b,c){var a=b.length();c.x=b.x/a;c.y=b.y/a;c.z=b.z/a;return c};j.fromAngles=function(b,c){return new j(Math.cos(b)*Math.cos(c),Math.sin(c),Math.sin(b)*Math.cos(c))};j.randomDirection=function(){return j.fromAngles(Math.random()*
Math.PI*2,Math.asin(Math.random()*2-1))};j.min=function(b,c){return new j(Math.min(b.x,c.x),Math.min(b.y,c.y),Math.min(b.z,c.z))};j.max=function(b,c){return new j(Math.max(b.x,c.x),Math.max(b.y,c.y),Math.max(b.z,c.z))};j.lerp=function(b,c,a){return c.subtract(b).multiply(a).add(b)};j.fromArray=function(b){return new j(b[0],b[1],b[2])};return v}();
