"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

export default function GeometriesPage() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		// Scene
		const scene = new THREE.Scene();

		// Object
		// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

		// const positionsArray = new Float32Array(9);
		// positionsArray[0] = 0;
		// positionsArray[1] = 0;
		// positionsArray[2] = 0;

		// positionsArray[3] = 0;
		// positionsArray[4] = 1;
		// positionsArray[5] = 0;

		// positionsArray[6] = 1;
		// positionsArray[7] = 0;
		// positionsArray[8] = 0;

		// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
		const geometry = new THREE.BufferGeometry();
		const count = 50;
		const positionsArray = new Float32Array(50 * 3 * 3);

		for (let i = 0; i < count * 3 * 3; i++) {
			positionsArray[i] = (Math.random() - 0.5) * 4;
		}

		const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
		geometry.setAttribute("position", positionsAttribute);

		const material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true,
		});
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Camera
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
		camera.position.z = 3;
		scene.add(camera);

		// Controls
		const controls = new OrbitControls(camera, canvasRef.current);

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasRef.current,
		});

		const tick = () => {
			renderer.setSize(sizes.width, sizes.height);
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
		};

		tick();
	}, []);

	return (
		<div className="flex justify-center items-center">
			<canvas ref={canvasRef} />
		</div>
	);
}
