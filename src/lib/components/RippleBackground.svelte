<script lang="ts">
  import * as THREE from 'three';
  import {BufferGeometry} from 'three';
  import {onDestroy, onMount} from 'svelte';
  import {fade} from "svelte/transition";
  import {OrbitControls} from 'three/addons/controls/OrbitControls';

  let t = 0;
  let f = 0.002;
  let a = 3;

  const count = 100;
  const sep = 3;

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let canvas: HTMLCanvasElement;
  let geometry: BufferGeometry;

  onMount(() => {
    init();
    animate();
  });

  onDestroy(() => {
    controls?.dispose();
  });

  function init() {
    const positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z) - 30;
        positions.push(x, y, z);
      }
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(132.61946894496282,20.498173466151506,-46.48686210396995)
    camera.lookAt(131.68564773446846,20.353838480410996,-46.15953144741281);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const imgTex = new THREE.TextureLoader().load('/circle.png');
    const material = new THREE.PointsMaterial({
      map: imgTex,
      color: 0x00AAFF,
      size: 0.5,
      sizeAttenuation: true,
      transparent: false,
      alphaTest: 0.5,
      opacity: 1.0,
    });

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.20;
    controls.screenSpacePanning = true;

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function graph(x: number, z: number) {
    return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  }

  function animate() {
    requestAnimationFrame(animate);

    t += 15;

    const positions = geometry.attributes.position.array;
    let i = 0;

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    geometry.attributes.position.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
  }
</script>

<style>
    canvas {
        width: 100vw;
        height: 100vh;
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>

<canvas in:fade|global bind:this={canvas}/>
