"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

export default function FullScreenAndResizing() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		// Scene
		const scene = new THREE.Scene();

		// Objects
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
		});
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// camera
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
		camera.position.z = 3;
		scene.add(camera);

		// Controls
		const controls = new OrbitControls(camera, canvasRef.current);

		const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const tick = () => {
			renderer.setSize(sizes.width, sizes.height);
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
		};

		window.addEventListener("resize", () => {
			// Update sizes
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;

			// Update camera
			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio));
		});

		window.addEventListener("dblclick", () => {
			if (!document.fullscreenElement) {
				canvasRef.current?.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		});

		tick();

		return () => {};
	}, []);

	return (
		<div className="flex items-center">
			<canvas ref={canvasRef} />;
		</div>
	);
}
