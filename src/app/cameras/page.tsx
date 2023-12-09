"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const sizes = {
	width: 800,
	height: 600,
};

const cursor = {
	x: 0,
	y: 0,
};

export default function Cameras() {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		window.addEventListener("mousemove", (event) => {
			cursor.x = event.clientX / sizes.width - 0.5;
			cursor.y = -(event.clientY / sizes.height - 0.5);
		});

		const scene = new THREE.Scene();

		// Object
		const mesh = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
			new THREE.MeshBasicMaterial({ color: 0xff0000 }),
		);
		scene.add(mesh);

		// Camera
		const camera = new THREE.PerspectiveCamera(
			75,
			sizes.width / sizes.height,
			0.1,
			100,
		);
		camera.position.z = 3;
		camera.lookAt(mesh.position);

		// OrthographicCamera
		// const aspectRatio = sizes.width / sizes.height;
		// const camera = new THREE.OrthographicCamera(
		// 	-1 * aspectRatio,
		// 	1 * aspectRatio,
		// 	1,
		// 	-1,
		// 	0.1,
		// 	100,
		// );
		// camera.position.x = 2;
		// camera.position.y = 2;
		// camera.position.z = 2;
		// camera.lookAt(mesh.position);
		scene.add(camera);

		// Controls
		const controls = new OrbitControls(camera, canvasRef.current);
		controls.enableDamping = true;
		// controls.target.y = 2;
		// controls.update();

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasRef.current,
		});

		renderer.setSize(sizes.width, sizes.height);

		const clock = new THREE.Clock();

		const tick = () => {
			// const elapsedTime = clock.getElapsedTime();
			// mesh.rotation.y += elapsedTime * 0.01;
			// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
			// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
			// camera.position.y = cursor.y * 5;
			// camera.lookAt(mesh.position);

			// Update controls
			controls.update();

			//
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
		};

		tick();
	}, []);

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-white">
			<canvas ref={canvasRef} />
		</div>
	);
}
