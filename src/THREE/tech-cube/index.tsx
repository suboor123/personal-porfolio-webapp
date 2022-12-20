import React, { useEffect, useLayoutEffect } from "react";
import * as THREE from "three";

const TechCube = () => {
  let cube, renderer, scene, camera;
  const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 400);
    document.getElementById("tech-cube").appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
  };

  const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  useLayoutEffect(() => {
    init();
    animate();
  }, []);

  return <div id="tech-cube"></div>;
};

export default TechCube;
