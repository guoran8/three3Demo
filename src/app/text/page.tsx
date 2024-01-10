'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry  } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export default function TextPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }

        // Scene
        const scene = new THREE.Scene()

        //Axes helper
        const axesHelper = new THREE.AxesHelper()
        scene.add(axesHelper)

        // Texture
        const textureLoader = new THREE.TextureLoader()
        const matcapTexture = textureLoader.load("/matcaps/1.png")

        // fonts
        const fontLoader = new FontLoader() 
        fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
            const textGeometry = new TextGeometry('Mumu', {
                font, 
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4 
            })
            textGeometry.center()
            // textGeometry.computeBoundingBox()
            // textGeometry.translate(
            //     -(textGeometry.boundingBox!.max.x - 0.02) * 0.5,
            //     -(textGeometry.boundingBox!.max.y - 0.02) * 0.5,
            //     -(textGeometry.boundingBox!.max.z - 0.03) * 0.5,
            //    )
            // textGeometry.computeBoundingBox()
            // console.log(textGeometry.boundingBox)

            const material = new THREE.MeshMatcapMaterial()
            material.matcap = matcapTexture
            // textMaterial.wireframe = true
            const text = new THREE.Mesh(textGeometry, material)
            scene.add(text)

            console.time("donuts")
                const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            Array(1000).fill(0).forEach(item => {
                const donut = new THREE.Mesh(donutGeometry, material)
                donut.position.x = (Math.random() - 0.5) * 10
donut.position.y = (Math.random() - 0.5) * 10
donut.position.z = (Math.random() - 0.5) * 10

donut.rotation.x = Math.random() * Math.PI
donut.rotation.y = Math.random() * Math.PI

const scale = Math.random()
donut.scale.set(scale, scale, scale)
                scene.add(donut)
            })
            console.timeEnd("donuts")

        })
    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current
    })

    const tick = () => {
        renderer.setSize(sizes.width, sizes.height)
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
    }

    tick()

    }, [])


    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    )
}
