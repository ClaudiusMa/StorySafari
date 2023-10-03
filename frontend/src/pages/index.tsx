import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PromptInput from '../components/PromptInput';
import Button from '@/components/Button';

export default function Home() {
  const [companyName, setCompanyName] = useState('');
  const [names, setNames] = useState([]);
  const [urls, setUrls] = useState([]);

  const containerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<THREE.Group>(new THREE.Group());

  const fetchPortfolio = async (companyName) => {
    const response = await fetch('/api/call-gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName }),
    });
    const data = await response.json();
    const newNames = data.results.map(result => result.title);
    const newUrls = data.results.map(result => result.url);
    setNames(newNames);
    setUrls(newUrls);
    console.log(newNames)
    console.log(newUrls)
  };

  const handleSearch = () => {
    console.log('Searching for:', companyName);
    fetchPortfolio(companyName);
  };

  // Initialization of the 3D scene
  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const scene = new THREE.Scene()
    const point = new THREE.PointLight(0xffffff)
    point.position.set(400, 200, 300)
    const ambient = new THREE.AmbientLight(0x444444)
    scene.add(point) // Add point light to the scene
    scene.add(ambient)

    const width = window.innerWidth
    const height = window.innerHeight
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000)
    camera.position.set(0, 0, 3000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = false
    renderer.setPixelRatio(window.devicePixelRatio)
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    window.addEventListener('resize', () => {
      const width = window.innerWidth
      const height = window.innerHeight

      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    })

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update() // Update controls to reflect the camera's state

    // Add group to scene
    scene.add(groupRef.current);

    function onDocumentMouseClick(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(groupRef.current.children);

      if (intersects.length > 0) {
        const index = names.indexOf(intersects[0].object.name);
        if (index !== -1) {
          window.open(urls[index], '_blank');
        }
      }
    }

    window.addEventListener('click', onDocumentMouseClick, false);

    function onDocumentMouseMove(event) {
      event.preventDefault();
    
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
    
      const intersects = raycaster.intersectObjects(groupRef.current.children);
    
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    }
    
    window.addEventListener('mousemove', onDocumentMouseMove, false);

    function render() {
      renderer.render(scene, camera)
      groupRef.current.rotateY(-0.0001)
      groupRef.current.rotateX(0.0001)
      controls.update()
      requestAnimationFrame(render)
    }
    render() // Call the render function
    return () => {
      window.removeEventListener('click', onDocumentMouseClick, false);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [])

  // Update sprites whenever names changes
  useEffect(() => {
    // Remove old sprites from group
    for (let i = groupRef.current.children.length - 1; i >= 0; i--) {
      groupRef.current.remove(groupRef.current.children[i]);
    }

    // Add new sprites to group
    for (let i = 0, l = names.length; i < l; i++) {
      const sprite = createSprite(names[i]);
      sprite.scale.set(120, 60, 1) // Increase sprite scale
      const phi = Math.acos(-1 + (2 * i) / l)
      const theta = Math.sqrt(l * Math.PI) * phi
      sprite.position.setFromSphericalCoords(800, phi, theta)
      groupRef.current.add(sprite);
    }
  }, [names]);

  function createSprite(name: string) {
    const canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 250
    const context = canvas.getContext('2d')
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.beginPath()
      context.translate(canvas.width / 2, canvas.height / 2)
      context.fillStyle = '#ffffff'
      context.font = '62px Arial'
      context.textBaseline = 'middle'
      context.textAlign = 'start'
      context.fillText(name, 0, 0)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const material = new THREE.SpriteMaterial({ map: texture })
    const sprite = new THREE.Sprite(material);
    sprite.name = name; // set the name of the sprite
    return sprite;
  }

  return (
    <>
      <Head>
        <title>StorySafari</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className=' flex flex-col  bg-black'>
          <PromptInput
            displayBox={true}
            prompt='Company'
            placeholder='Enter the Company Name'
            value={companyName}
            onChange={(value: string) => setCompanyName(value)}
          />
          <Button
            text='Search'
            onClick={handleSearch}
          />
          <div ref={containerRef} />
          {names.map((name, index) => (
            <a key={index} href={urls[index]} target="_blank" rel="noopener noreferrer">{name}</a>
          ))}
        </div>
      </div>
    </>
  )
}