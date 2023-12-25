"use client"
import * as THREE from "three"
import { useEffect, useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

export default function TexturePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  
  // const image = new Image()
  // const texture = new THREE.Texture(image)
  // image.onload = () => {
  //   texture.needsUpdate = true
  // }
  // image.src = "/color.jpg"


  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()

    // Texture
    // const textureLoader = new THREE.TextureLoader()
    // const texture = textureLoader.load("/color.jpg", () => {
    //   console.log('load')
    // }, () => {
    //   console.log('progress')
    // }, () => {
    //   console.log('error')
    // })
    const loadingManager = new THREE.LoadingManager()

    loadingManager.onStart = () => {
      console.log('onStart')
    }
    loadingManager.onLoad = () => {
      console.log('onLoad')
    }
    loadingManager.onProgress = () => {
      console.log('onProgress')
    }
    loadingManager.onError = () => {
      console.log('onError')
    }
    const textureLoader = new THREE.TextureLoader(loadingManager)
    const colorTexture = textureLoader.load("/textures/minecraft.png")
    const alphaTexture = textureLoader.load('/alpha.jpg')
    const heightTexture = textureLoader.load('/height.jpg')
    const normalTexture = textureLoader.load('/normal.jpg')
    const ambientOcclusionTexture = textureLoader.load('/ambientOcclusion.jpg')
    const metalnessTexture = textureLoader.load('/metalness.jpg')
    const roughnessTexture = textureLoader.load('/roughness.jpg')

    // colorTexture.repeat.x = 2
    // colorTexture.repeat.y = 3 
    // colorTexture.wrapS = THREE.MirroredRepeatWrapping
    // colorTexture.wrapT = THREE.MirroredRepeatWrapping

    // colorTexture.offset.x = 0.5
    // colorTexture.offset.y = 0.5

    // colorTexture.rotation = Math.PI / 4 
    // colorTexture.center.x = 0.5
    // colorTexture.center.y = 0.5

    colorTexture.generateMipmaps = false
    colorTexture.magFilter = THREE.NearestFilter

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // console.log("geometry", geometry.attributes.uv)
    // const geometry = new THREE.SphereGeometry(1, 32, 32)
    // const geometry = new THREE.ConeGeometry(1, 1, 12)
    // const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)
    const material = new THREE.MeshBasicMaterial({ map: colorTexture})
    // material.wireframe = true
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    scene.add(camera)
    
    // Controls 
    new OrbitControls(camera, canvasRef.current)

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
  })

  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef} />
    </div>
  )
}