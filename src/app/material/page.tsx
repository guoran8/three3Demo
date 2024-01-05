'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

export default function MaterialPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const gui = new GUI()

        /**
         * Textures
         */
        const textureLoader = new THREE.TextureLoader()
        const cubeTextureLoader = new THREE.CubeTextureLoader()
        const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
        const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
        const doorAmbientOcclusionTexture = textureLoader.load(
            '/textures/door/ambientOcclusion.jpg'
        )
        const doorHeightTexture = textureLoader.load(
            '/textures/door/height.jpg'
        )
        const doorNormalTexture = textureLoader.load(
            '/textures/door/normal.jpg'
        )
        const doorMetalnessTexture = textureLoader.load(
            '/textures/door/metalness.jpg'
        )
        const doorRoughnessTexture = textureLoader.load(
            '/textures/door/roughness.jpg'
        )
        const matcapTexture = textureLoader.load('/matcaps/2.png')
        const gradientTexture = textureLoader.load('/gradients/5.jpg')
        gradientTexture.minFilter = THREE.NearestFilter
        gradientTexture.magFilter = THREE.NearestFilter
        gradientTexture.generateMipmaps = false

        const environmentMapTexture = cubeTextureLoader.load([
            '/textures/environmentMaps/1/px.jpg',
            '/textures/environmentMaps/1/nx.jpg',
            '/textures/environmentMaps/1/py.jpg',
            '/textures/environmentMaps/1/ny.jpg',
            '/textures/environmentMaps/1/pz.jpg',
            '/textures/environmentMaps/1/nz.jpg',
        ])

        // Scene
        const scene = new THREE.Scene()

        /**
         * Objects
         */
        // const material = new THREE.MeshBasicMaterial()
        // material.map = doorColorTexture
        // material.color.set('yellow')
        // material.color = new THREE.Color('0x00ff00')
        // material.wireframe = true

        // material.transparent = true
        // material.opacity = 0.5

        // material.alphaMap = doorAlphaTexture
        // material.side = THREE.DoubleSide

        // const material = new THREE.MeshNormalMaterial()

        // material.wireframe = true
        // material.flatShading = true

        // const material = new THREE.MeshMatcapMaterial()
        // material.matcap = matcapTexture

        // const material = new THREE.MeshDepthMaterial()
        // const material = new THREE.MeshLambertMaterial()

        // const material = new THREE.MeshPhongMaterial();
        // material.shininess = 100;
        // material.specular = new THREE.Color(0xff0000);

        // const material = new THREE.MeshToonMaterial()
        // material.gradientMap = gradientTexture

        // const material = new THREE.MeshStandardMaterial()
        // material.metalness = 0.45
        // material.roughness = 0.65
        // material.map = doorColorTexture
        // material.aoMap = doorAmbientOcclusionTexture
        // material.aoMapIntensity = 1
        // material.displacementMap = doorHeightTexture
        // material.displacementScale = 0.05
        // material.metalnessMap = doorMetalnessTexture
        // material.roughnessMap = doorRoughnessTexture
        // material.normalMap = doorNormalTexture
        // material.normalScale.set(0.5, 0.5)
        // material.transparent = true
        // material.alphaMap = doorAlphaTexture
        const material = new THREE.MeshStandardMaterial()
        material.metalness = 0.7
        material.roughness = 0.2
        material.envMap = environmentMapTexture

        gui.add(material, 'metalness', 0, 1, 0.0001)
        gui.add(material, 'roughness', 0, 1, 0.0001)
        gui.add(material, 'aoMapIntensity', 0, 10, 0.0001)
        gui.add(material, 'wireframe')
        gui.add(material, 'displacementScale', 0, 1, 0.0001)

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 64, 64),
            material
        )
        sphere.position.x = -1.5
        sphere.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
        )

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 100, 100),
            material
        )

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(0.3, 0.2, 64, 128),
            material
        )
        torus.position.x = 1.5

        scene.add(sphere, plane, torus)

        /**
         * Light
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 0.5)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        scene.add(pointLight)

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            100
        )
        camera.position.x = 1
        camera.position.y = 1
        camera.position.z = 2
        scene.add(camera)
        // sphere.position.x = -1.5

        // Controls
        const controls = new OrbitControls(camera, canvasRef.current)
        controls.enableDamping = true

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const clock = new THREE.Clock()

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            // Update objects
            sphere.rotation.y = 0.1 * elapsedTime
            plane.rotation.y = 0.1 * elapsedTime
            torus.rotation.y = 0.1 * elapsedTime

            sphere.rotation.x = 0.15 * elapsedTime
            plane.rotation.x = 0.15 * elapsedTime
            torus.rotation.x = 0.15 * elapsedTime

            controls.update()

            renderer.setSize(sizes.width, sizes.height)
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }

        tick()
    }, [])

    return <canvas ref={canvasRef} />
}
