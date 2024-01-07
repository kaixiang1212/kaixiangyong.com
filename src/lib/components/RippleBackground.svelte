<script lang="ts">
  import * as THREE from "three";
  import { BufferGeometry } from "three";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
    camera.position.set(
      150.92910266899122,
      9.856573436881405,
      -52.18159472090241,
    );
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
    controls.minDistance = 10;
    controls.maxDistance = 160;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 3;
    controls.enablePan = false;

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
      const amplitude = 2;
      const damping = 0.00;

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
  // let cameraPosition: null | Vector3 = null;
  // function updateCameraPositionText() {
  //   if (cameraPosition && (camera.position.x !== cameraPosition.x || camera.position.y !== cameraPosition.y || camera.position.z !== cameraPosition.z)) {
  //     cameraPosition.x = camera.position.x;
  //     cameraPosition.y = camera.position.y;
  //     cameraPosition.z = camera.position.z;
  //   } else if (cameraPosition === null) {
  //     cameraPosition = new Vector3(camera.position.x, camera.position.y, camera.position.z);
  //   }
  // }
  //
  // $: console.log(cameraPosition)
  // $: cameraPositionText = `Camera Position: x: ${cameraPosition?.x.toFixed(2)}, y: ${cameraPosition?.y.toFixed(2)}, z: ${cameraPosition?.z.toFixed(2)}`;
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
