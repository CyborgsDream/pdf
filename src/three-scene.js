import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class ThreeApp {
  constructor(options = {}){
    this.canvas = options.canvas || document.getElementById('three-canvas');
    this.svg = options.svg || document.getElementById('svg-overlay');
    this.hudDot = this.svg ? this.svg.getElementById('hud-dot') : null;

    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    this.init();
  }

  init(){
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b0f1a);

    this.camera = new THREE.PerspectiveCamera(50, this.width/this.height, 0.1, 2000);
    this.camera.position.set(2.5, 1.5, 4);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.setupLights();
    this.addSampleObjects();

    window.addEventListener('resize', () => this.onResize(), { passive:true });
    this.renderer.domElement.addEventListener('pointermove', (e)=>this.onPointerMove(e), { passive:true });

    this._last = performance.now();
    this.animate();
  }

  setupLights(){
    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5,10,7.5);
    this.scene.add(dir);
  }

  addSampleObjects(){
    const g = new THREE.BoxGeometry(1,1,1);
    const m = new THREE.MeshStandardMaterial({ color: 0x4dd0e1, metalness:0.2, roughness:0.4 });
    this.box = new THREE.Mesh(g,m);
    this.box.position.set(0,0.5,0);
    this.scene.add(this.box);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.MeshStandardMaterial({ color:0x071025 }));
    ground.rotation.x = -Math.PI/2;
    ground.position.y = 0;
    this.scene.add(ground);
  }

  onPointerMove(e){
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // raycast to sample objects (example)
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObject(this.box);
    if(hits.length){
      this.box.material.color.set(0xff5252);
    } else {
      this.box.material.color.set(0x4dd0e1);
    }
  }

  projectToSVG(position){
    // position: THREE.Vector3 in world space -> returns {x(px), y(px)} in SVG coords
    const vec = position.clone();
    vec.project(this.camera);
    const halfWidth = this.renderer.domElement.clientWidth / 2;
    const halfHeight = this.renderer.domElement.clientHeight / 2;
    return {
      x: (vec.x * halfWidth) + halfWidth,
      y: -(vec.y * halfHeight) + halfHeight
    };
  }

  onResize(){
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate(){
    this.animId = requestAnimationFrame(()=>this.animate());
    const now = performance.now();
    const dt = (now - this._last) / 1000;
    this._last = now;

    // simple rotation for demo
    if(this.box) this.box.rotation.y += dt * 0.6;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    // position HUD element above the box
    if(this.hudDot && this.box){
      const pos = new THREE.Vector3();
      this.box.getWorldPosition(pos);
      const screen = this.projectToSVG(pos);
      this.hudDot.setAttribute('cx', String(screen.x));
      this.hudDot.setAttribute('cy', String(screen.y));
    }
  }

  dispose(){
    cancelAnimationFrame(this.animId);
    this.renderer.dispose();
  }
}
