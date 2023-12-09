"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function Animations() {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		// Scene
		const scene = new THREE.Scene();

		// objects
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
		});
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Sizes
		const sizes = {
			width: 800,
			height: 600,
		};

		// camera
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
		camera.position.z = 3;
		scene.add(camera);

		// renderer
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasRef.current,
		});
		renderer.setSize(sizes.width, sizes.height);

		// Clock
		// const clock = new THREE.Clock();
		gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
		gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

		const tick = () => {
			// const elapsedTime = clock.getElapsedTime();
			// Update object
			// camera.position.x = Math.cos(elapsedTime);
			// camera.position.y = Math.sin(elapsedTime);
			// camera.lookAt(mesh.position);

			// Render
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
		};

		tick();
	}, []);

	return (
		<div className="w-full h-full flex justify-center items-center">
			<canvas ref={canvasRef} />
		</div>
	);
}
