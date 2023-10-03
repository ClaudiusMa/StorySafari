import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export default function Home() {
  const [companyName, setCompanyName] = useState('');
  const [names, setNames] = useState([]);
  const [urls, setUrls] = useState([]);

  const containerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<THREE.Group>(new THREE.Group());

  const fetchPortfolio = async (companyName) => {
    try {
      const response = await fetch('/api/call-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.results) {
        const newNames = data.results.map(result => result.title);
        const newUrls = data.results.map(result => result.url);
        setNames(newNames);
        setUrls(newUrls);
        console.log(newNames)
        console.log(newUrls)
      } else {
        console.error('Results not found in response', data);
      }
    } catch (error) {
      console.error('Fetch failed', error);
    }
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
      const fontSize = 62; // the font size you're using for the canvas text
      const textHeight = fontSize * 1.2; // estimate the text height

      // Create new objects at the world positions of the children
      const worldChildren = groupRef.current.children.map(child => {
        const worldChild = child.clone();
        worldChild.position.copy(child.localToWorld(child.position.clone()));
        worldChild.name = child.name; // copy the name

        // Manually create a bounding box that fits the visible area of the sprite
        const halfWidth = child.scale.x / 2;
        const halfHeight = (child.scale.y + textHeight) / 2;
        worldChild.geometry.boundingBox = new THREE.Box3(
          new THREE.Vector3(-halfWidth, -halfHeight + textHeight / 2, -0.1),
          new THREE.Vector3(halfWidth, halfHeight + textHeight / 2, 0.1)
        );

        return worldChild;
      });

      const intersects = raycaster.intersectObjects(worldChildren, true);

      console.log(intersects)

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
      // // Log positions inside the animation loop
      // groupRef.current.children.forEach((child, index) => {
      //   const worldPosition = child.localToWorld(child.position.clone());
      //   console.log(`Child ${index} world position:`, worldPosition);
      // });

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

      <div className='flex flex-row bg-black'>
        <div className=' flex flex-col w-1/4 ml-20 absolute self-center'>
          <p className='text-3xl font-bold text-lightgrey'><span className='text-5xl'>S</span>torySafari</p>
          <p className='mt-2 text-lg font-light text-lightgrey'>Discover dream company portfolios and craft compelling stories for your own</p>
          <div className='mt-5'>
            <div className='flex items-center p-2 w-full text-white bg-lightgrey/20 backdrop-blur-lg rounded-sm hover:bg-lightgrey/40'>
              <p className='mx-2'>Company</p>
              <input
                type="text"
                className='flex-grow text-right bg-transparent outline-none'
                placeholder='Enter your desirable company'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <button className='p-2 mt-2 w-full text-white bg-lightgrey/20  backdrop-blur-lg rounded-sm hover:bg-lightgrey/40' onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className='w-3/4'>
          <div></div>
          <div ref={containerRef} />
          {names.map((name, index) => (
            <a key={index} href={urls[index]} target="_blank" rel="noopener noreferrer">{name}</a>
          ))}
        </div>

      </div>
    </>
  )
}