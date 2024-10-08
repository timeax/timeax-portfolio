/* eslint-disable no-cond-assign */
/* eslint-disable no-loop-func */
/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable new-parens */
/* eslint-disable no-redeclare */
/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

//(function(){
/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {string} [fogC='#1D1C2E'] 
 * @param {number} [R=250] 
 */
export function createWorld(canvas, fogC = '#1D1C2E', R = 250) {
	let canva = canvas
	//(function(){
	var AMOUNT = 200, d = 25, adjustment = true, adaptive = true,
		obliquity = 23 / 180 * 3.14, roV1 = .0022, roV2 = -.0005, ro1 = 0, ro2 = 0,
		point,
		canvas = '#earth', color = '#420236', T_earth = 'https://mapplix.github.io/earth/earth.png';

	var camera, scene, renderer;

	var positions = [], particles, particle, count = 0, dpr, lastW,
		W = window.innerWidth, H = window.innerHeight, aspect = W / H, vMin = Math.min(W, H);

	var mouseX = 0, mouseY = 0, x0, y0;
	var lookAt = new THREE.Vector3(0, 0, 0), canvas = canva;

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas });//
	renderer.setSize(W, H);
	//renderer.context.getExtension('OES_standard_derivatives');
	camera = new THREE.PerspectiveCamera(18, aspect, 1, 10000);
	scene = new THREE.Scene();
	var Emap = (new THREE.TextureLoader()).load(T_earth);
	Emap.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()) || 1;
	var Wmaterial = new THREE.MeshStandardMaterial({
		onBeforeCompile: function (sh) {
			sh.vertexShader = '\
#define MYSHADER\n\
attribute float center, bright;\n\
varying vec3 vCenter, vPos, vV0, vV1, vV2;\n\
varying float vBright;\n\
'			+ sh.vertexShader.replace(/}\s*$/, '\
	vBright=bright;\n\
	int c=int(center);\n\
	vCenter = vec3(c==0, c==1, c==2);\n\
	vPos=position;\n\
	gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1);\n\
	vV0=vCenter[0]*vPos;\n\
	vV1=vCenter[1]*vPos;\n\
	vV2=vCenter[2]*vPos;\n\
}\			');
			sh.fragmentShader = '\
#define MYSHADER\n\
varying vec3 vCenter, vPos, vV0, vV1, vV2;\n\
varying float vBright;\n\
'			+ sh.fragmentShader.replace('#include <alphamap_fragment>', '\
	#include <alphamap_fragment>\n\
	vec3 d = fwidth( vCenter );\n\
	vec3 a3 = smoothstep( vec3(0.0), d * 1.4, vCenter+0.4*d-1.0/fogDepth );\n\
	float scale = dot(normalize(vViewPosition), vNormal);\n\
	scale = 1.0-scale*scale;\n\
	float dist = distance(vPos, vV0.xyz/vCenter.x);\n\
	dist = min(dist, distance(vPos, vV1.xyz/vCenter.y));\n\
	dist = min(dist, distance(vPos, vV2.xyz/vCenter.z));\n\
	float b3 = smoothstep(1.5, 1.8, dist-1.5*scale*scale );\n\
	float edgeFactorTri=min(b3,min( min( a3.x, a3.y ), a3.z ));\n\
	diffuseColor.a *= mix( 1.0,  0.0, edgeFactorTri );\n\
	float dissipation='+ (posZ + .5 * R + .01) + ';\n\
	diffuseColor.a *= smoothstep( 20.0,  0.0, fogDepth-dissipation );\n\
\			').replace('	#include <fog_fragment>', '\
	float lVc=length(vCenter);\n\
	gl_FragColor.rgb *= smoothstep( '+ R * .8888 + ', ' + R * 1.201 + ', fogDepth );\n\
	gl_FragColor.rgb = mix( gl_FragColor.rgb, vec3(3), (.1*lVc+pow(lVc,8.0))*vBright );\n\
	#include <fog_fragment>\
\			');
			//console.log(sh, sh.vertexShader, sh.fragmentShader);
		},
		roughness: .5,
		metalness: .964,
		envMapIntensity: 5,
		emissive: 0,
		// refractionRatio: -0.12,
		transparent: true, alphaTest: 0.05
	});//, opacity: 0
	Wmaterial.color.set(fogC);
	Wmaterial.side = 2;
	Wmaterial.extensions = { derivatives: 1 };
	var geometry = new THREE.IcosahedronGeometry(R, 3);//OctahedronGeometry

	for (var i = 0; i < geometry.vertices.length; i++) {
		geometry.vertices[i].applyEuler(new THREE.Euler(Math.random() * .06, Math.random() * .06, Math.random() * .06))
	}
	var bGeometry = (new THREE.BufferGeometry).fromGeometry(geometry);
	var position = bGeometry.attributes.position;
	var centers = new Int8Array(position.count);
	var brights = new Float32Array(position.count);
	var points = [], activePoints = [], vCount = geometry.vertices.length, dCount = 0, dMid = 0;

	for (var i = 0, l = position.count; i < l; i++) {
		var c = centers[i] = i % 3, j = (i - c) / 3;
		brights[i] = 0;
		if (i < vCount) points[i] = { siblings: [], distances: [], indexes: [], brightness: 0, v: 0, a: 0, f: 0, dr: 0, r: 1 };
	}
	function addSiblings(a, b, one) {
		if (points[a].siblings.indexOf(points[b]) < 0) {
			points[a].pos = geometry.vertices[a].clone();
			points[a].siblings.push(points[b]);
			var d = geometry.vertices[a].distanceTo(geometry.vertices[b]);
			points[a].distances.push(d);
			dMid += d; dCount++;
		}
		if (!one) addSiblings(b, a, 1)
	}
	geometry.faces.forEach(function (face, i) {
		addSiblings(face.a, face.b);
		addSiblings(face.a, face.c);
		addSiblings(face.c, face.b);
		points[face.a].indexes.push(i * 3);
		points[face.b].indexes.push(i * 3 + 1);
		points[face.c].indexes.push(i * 3 + 2);
	});
	dMid /= dCount;
	var ttl = 10;
	(function setActive(n) {
		if (!n) return
		var i = parseInt(Math.random() * vCount)
		if (geometry.vertices[i].z < -100) setActive()
		else points[i].isActive = ttl, activePoints.push(points[i]);
		setActive(n - 1)
	})(10);

	bGeometry.addAttribute('center', new THREE.BufferAttribute(centers, 1));
	bGeometry.addAttribute('bright', new THREE.BufferAttribute(brights, 1));

	var Ematerial = Wmaterial.clone();
	Ematerial.alphaMap = Emap; Ematerial.transparent = false; Ematerial.side = 0;
	var cubeCamera = new THREE.CubeCamera(1, 2 * R, 256);
	cubeCamera.position.z = .47 * R
	Ematerial.envMap = cubeCamera.renderTarget.texture;
	Ematerial.envMap.minFilter = THREE.LinearMipMapLinearFilter;
	Ematerial.envMap.mapping = THREE.CubeReflectionMapping;
	var Earth = new THREE.Mesh(new THREE.IcosahedronGeometry(R * .77, 3), Ematerial)
	var wGeometry = geometry.clone();
	particles = new THREE.Group();
	let world = new THREE.Group();
	var Net = new THREE.Mesh(bGeometry, Wmaterial);
	particles.add(Net, Earth);//new THREE.Points(geometry, Pmaterial), 
	//particles.rotation.order='YXZ'
	world.add(particles);
	scene.add(world);
	// POSITIONS :
	var posZ = 1700; //distance to camera
	//scene.position.set(-12,54,0);

	//camera.position.y=camera.position.z=2000

	scene.fog = new THREE.Fog(fogC, posZ - R / 2, posZ + R);
	let hLight = new THREE.HemisphereLight('#fff', 0, 23)
	world.add(hLight);
	hLight.position.set(0, 0, 1)

	// interactions
	var dx, dy = dx = x0 = y0 = 0, active, abc = ['a', 'b', 'c'], movedPoints = [], activeF = [], ready,
		raycaster = new THREE.Raycaster(),
		mouse = new THREE.Vector2();
	window.getWpos = function () {
		return [scene.position, scene.rotation, camera]
	}
	function interact() {
		mouse.x = (x0 / W) * 2 - 1;
		mouse.y = - (y0 / H) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		movedPoints.forEach(function (point, i) { point.f = 0 });
		activeF = [];
		if (!active) return;
		var inters = raycaster.intersectObject(Net)[0], ind, vert;
		if (!inters) return;
		point = Net.worldToLocal(inters.point.clone());
		for (var i = 0; i < 3; i++) {
			ind = inters.face[abc[i]];
			if (!points.some(function (p, i) { return p.indexes.indexOf(ind) >= 0 && (vert = i + '') })) return;
			activeF[vert] = Math.max(1 - point.distanceTo(points[vert].pos) / dMid, 0) * 100
		}
		// console.log(activeF, points[vert]);
	}
	canvas.onpointerdown = canvas.onmousedown = canvas.ontouchstart = function (e) {
		active = e.changedTouches ? e.changedTouches[0] : e;
		x0 = active.clientX;
		y0 = active.clientY;
		e.preventDefault();
		interact();
	};
	var onpointermove, onmousemove, ontouchmove, ontouchcancel, ontouchup, onBeforeCompile;
	onpointermove = onmousemove = ontouchmove = function (e) {
		if (!active || !ready) return
		if (!e.buttons) {
			active = false;
			return;
		}
		var touches = e.changedTouches;
		if (active.identifier !== undefined && e.type !== 'touchmove') return;
		if (touches) {
			if (touches[0].identifier === active.identifier) e = touches[0]
			else return
		}
		else { e.preventDefault() };
		//if (e.type==mousemove && !e.which) return
		dx = (5 * dx + x0 - (x0 = e.clientX)) / 6;
		dy = (5 * dy + y0 - (y0 = e.clientY)) / 6;
		//console.log(e.type, active.identifier, dx, x0)
		interact();
		ready = 0;
	};
	onmouseup = onpointerup = ontouchup = ontouchcancel = onpointercancel = onblur = function (e) {
		active = false;
		//console.log()
		interact();
	}

	var t0 = new Date() * 1, dMax = 80, dMin = 1000 / 33, dT = 1000 / 50, af, Pactive = [], m = 3000000, k = 400, k0 = 1, f0 = .01, fv = 1000,
		posArr = bGeometry.attributes.position.array,
		pUp = 0, pDn = [], flTimer = [], vecTest = new THREE.Vector3(), transStart, pLast, transactions = [];
	requestAnimationFrame(function animate() {
		requestAnimationFrame(animate);
		var t = new Date() * 1, dt = t - t0;
		if (dt < dMin) return; // !Eh || 
		dt = Math.min(dt, dMax);
		t0 = t;
		var dd = dt / dT;
		var pos = canvas.getBoundingClientRect(), dY = window.innerHeight - document.documentElement.getBoundingClientRect().bottom;
		if (pos.bottom <= 0 || pos.top >= window.innerHeight) return;
		if (dpr !== (dpr = window.devicePixelRatio) || W !== (W = window.innerWidth) || H !== (H = window.innerHeight)) {
			vMin = Math.min(W, H);
			renderer.setSize(W, H);
			renderer.setPixelRatio(dpr);
			camera.aspect = W / H;
			camera.updateProjectionMatrix();
		}
		var addPoints = [];
		activePoints.forEach(function (point, i) {
			var b = point.brightness;
			if (point.isActive && (b += (point.speed || .3) * (b + .05) * dd) > 1) {//
				point.siblings.forEach(function (s, j) {
					if (activePoints.indexOf(s) > -1) return //console.log(11);
					s.speed = 3.7 / point.distances[j];
					//s.from=point;
					if (s.isActive = (Math.random() > .6)) activePoints.push(s);
				})
				point.isActive = 0;
			} else if (!point.isActive && (b -= b * .056 * dd) < 0.005) {
				b = 0;//point.from=
				activePoints.splice(i, 1)
			}
			point.brightness = b;
			point.indexes.forEach(function (i) {
				brights[i] = b;
			});
		});
		points.forEach(function (point, i) {
			var d = 0;
			point.siblings.forEach(function (s, j) { d += s.dr; });
			d = d / point.siblings.length - point.dr;
			point.f = -(activeF[i] || 0) * .4 + d * k - point.dr * k0 * (1 + Math.abs(1 - point.r)) - point.v * fv;
			point.v += point.f * dt / m;
			point.r = 1 + point.dr;
			point.indexes.forEach(function (j) {
				//brights[i]+=point.f; return;
				posArr[j *= 3] = point.r * point.pos.x;
				posArr[j + 1] = point.r * point.pos.y;
				posArr[j + 2] = point.r * point.pos.z;
			});
		});
		points.forEach(function (point, i) {
			if (!point.v) return;
			var dd = point.v * dt;
			point.dr += dd;
		});
		bGeometry.attributes.bright.needsUpdate = true;
		bGeometry.attributes.position.needsUpdate = true;
		camera.position.z += (posZ - camera.position.z) * .085 * dd;
		ro1 += roV1 * dd; ro2 += roV2 * dd;
		particles.rotation.set(0, 0, 0);
		particles.rotateY(ro2).rotateX(obliquity).rotateY(ro1);
		particles.rotation.y -= .0009

		dx *= (1 - .03 * dd);
		dy *= (1 - .03 * dd);
		ro2 -= dx * .002;//+(W/2-y0)*(W/2-x0)*dy/vMin*.00004;
		world.rotation.x -= dy * .002;
		var sro = world.rotation.x *= .92;
		Net.applyMatrix(new THREE.Matrix4().getInverse(particles.matrixWorld).multiply(
			new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(-dy * .003, -dx * .002, 0))
		).multiply(particles.matrixWorld)//new THREE.Matrix4()
		);
		Earth.visible = !1;
		scene.scale.set(.33, .33, .65)//.applyEuler(new THREE.Euler(-sro,0,0))
		cubeCamera.update(renderer, scene);
		Earth.visible = !0;
		scene.scale.set(1, 1, 1)
		particles.matrixWorldNeedsUpdate = true;
		renderer.render(scene, camera);
		ready = 1;
	})
}
