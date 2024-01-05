'use client'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import GUI from 'lil-gui'
import gsap from 'gsap'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

export default function DebugUI() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const gui = new GUI()
        gui.add(window.document, 'title')

        // Scene
        const scene = new THREE.Scene()

        /**
         * Object
         */
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height
        )
        camera.position.z = 3
        scene.add(camera)

        // Debug
        const parameters = {
            spin: () => {
                gsap.to(mesh.rotation, { duration: 1, y: 10 })
            },
        }
        gui.add(mesh.position, 'x', -3, 3, 0.01).name('elevation')
        gui.add(mesh.position, 'y', -3, 3, 0.01)
        gui.add(mesh.position, 'z', -3, 3, 0.01)
        gui.add(mesh, 'visible')
        gui.add(material, 'wireframe')
        gui.addColor(material, 'color')
        gui.add(parameters, 'spin')

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
        })

        const tick = () => {
            renderer.setSize(sizes.width, sizes.height)
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }

        tick()
    })

    return (
        <div className="flex justify-center items-center">
            <canvas ref={canvasRef} />
        </div>
    )
}
