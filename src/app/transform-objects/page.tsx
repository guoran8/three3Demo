"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TransformObjects() {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		const scene = new THREE.Scene();
		// Objects
		const group = new THREE.Group();
		group.position.y = 1;
		group.scale.y = 2;
		group.rotation.y = 1;
		scene.add(group);

		const cube1 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({
				color: 0xff0000,
			}),
		);

		group.add(cube1);

		const cube2 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({
				color: 0x00ff00,
			}),
		);
		cube2.position.x = -2;
		group.add(cube2);

		const cube3 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({
				color: 0x0000ff,
			}),
		);
		cube3.position.x = 2;
		group.add(cube3);

		// const geometry = new THREE.BoxGeometry(1, 1, 1);
		// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		// const mesh = new THREE.Mesh(geometry, material);

		// mesh.position.x = 0.7;
		// mesh.position.y = -0.6;
		// mesh.position.z = 3;

		// mesh.position.normalize();
		// mesh.position.set(0.7, -0.6, 1);
		// scene.add(mesh);

		// Scale
		// mesh.scale.x = 2;
		// mesh.scale.y = 0.5;
		// mesh.scale.z = 0.5;
		// mesh.scale.set(2, 0.5, 0.5);

		// Rotation
		// mesh.rotation.reorder("YXZ");
		// mesh.rotation.x = Math.PI * 0.25;
		// mesh.rotation.y = Math.PI * 0.25;

		// Axes Helper
		const axesHelper = new THREE.AxesHelper();
		scene.add(axesHelper);

		// Sizes
		const sizes = {
			width: 800,
			height: 600,
		};

		// Camera
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
		camera.position.z = 3;
		// camera.position.x = 1;
		// camera.position.y = 1;
		scene.add(camera);

		// camera.lookAt(mesh.position);

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasRef?.current,
		});

		renderer.setSize(sizes.width, sizes.height);
		renderer.render(scene, camera);
	}, []);

	return (
		<div className="w-full h-full flex items-center justify-center">
			<canvas ref={canvasRef} />
		</div>
	);
}
