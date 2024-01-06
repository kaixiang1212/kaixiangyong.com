<script lang="ts">
  import * as THREE from 'three';
  import {BufferGeometry} from 'three';
  import {onDestroy, onMount} from 'svelte';
  import {fade} from "svelte/transition";
  import {OrbitControls} from 'three/addons/controls/OrbitControls';

  let t = 0;

  const count = 100;
  const sep = 3;

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let canvas: HTMLCanvasElement;
  let geometry: BufferGeometry;
  let points: THREE.Points;

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
        let y = 0; // Initialize y-coordinate to 0
        positions.push(x, y, z);
      }
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(165.38, 21.75, -0.20)

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

    points = new THREE.Points(geometry, material);
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

  function animate() {
    requestAnimationFrame(animate);

    t += 0.02; // Adjust the time increment based on the desired speed of the wave

    const positions = geometry.getAttribute('position');
    const array = positions.array as Float32Array;

    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      const z = array[i + 2];

      // Adjust the water wave function for a more realistic effect
      const frequencyX = 0.1;
      const frequencyZ = 0.1;
      const amplitude = 1.5;
      const damping = 0.005;

      const waveX = amplitude * Math.sin(frequencyX * x - t);
      const waveZ = amplitude * Math.sin(frequencyZ * z - t);

      // Apply damping to reduce excessive oscillation
      const dampingFactor = Math.exp(-damping * t);
      array[i + 1] = (waveX + waveZ) * dampingFactor;
    }

    positions.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
    // updateCameraPositionText();
  }

  // debug...
  // let cameraPositionText = ''
  // function updateCameraPositionText() {
  //   const cameraPosition = camera.position;
  //   cameraPositionText = `Camera Position: x: ${cameraPosition.x.toFixed(2)}, y: ${cameraPosition.y.toFixed(2)}, z: ${cameraPosition.z.toFixed(2)}`;
  // }
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

<canvas in:fade|global bind:this={canvas} />
<!--<div class="camera-info">{cameraPositionText}</div>-->
