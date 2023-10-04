import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function fitTextToCanvas(canvas, context, text) {
  let fontSize = 100; // Start with a large font size
  context.font = `${fontSize}px Arial`;

  // Reduce the font size until the text fits the canvas
  while (context.measureText(text).width > canvas.width) {
    fontSize--;
    context.font = `${fontSize}px Arial`;
  }

  // Now the text should fit the canvas
  context.fillText(text, 0, fontSize); // Adjust the y-coordinate as needed
}

export default function Home() {
  const [companyName, setCompanyName] = useState('');
  const [names, setNames] = useState([]);
  const [urls, setUrls] = useState([]);

  const containerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const namesRef = useRef([]);
  namesRef.current = names;
  const urlsRef = useRef(urls);

  useEffect(() => {
    namesRef.current = names; // Update the ref whenever names changes
    urlsRef.current = urls; // Update the ref whenever urls changes
  }, [names, urls]);

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


      // console.log("Names state:", namesRef.current);
      // const boxHelper = new THREE.Box3Helper(worldChild.geometry.boundingBox);
      // scene.add(boxHelper);
      return worldChild;
    });

    const intersects = raycaster.intersectObjects(worldChildren, true);

    // if (intersects.length > 0) {
    //   console.log(intersects[0].object.name)
    // } 
    // name works

    if (intersects.length > 0) {
      const clickedName = intersects[0].object.name;
      const index = namesRef.current.indexOf(clickedName);
      if (index !== -1 && urlsRef.current[index]) { // Use the ref here
        window.open(urlsRef.current[index], '_blank');
      } else {
        console.error(`No URL found for clicked name: ${clickedName}`);
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
  fetchPortfolio('Apple');
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
  canvas.width = 200
  canvas.height = 100
  const context = canvas.getContext('2d')
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.translate(canvas.width / 2, canvas.height / 2)
    context.fillStyle = '#ffffff'
    context.textBaseline = 'middle'
    context.textAlign = 'start'
    fitTextToCanvas(canvas, context, name) // Use the function here
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  const material = new THREE.SpriteMaterial({ map: texture })
  const sprite = new THREE.Sprite(material);
  sprite.name = name; // set the name of the sprite
  console.log("Sprite name:", name);
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

    <div className='flex flex-col md:flex-row bg-black '>
      <div className=' flex flex-col py-10 w-4/5 mx-auto md:w-1/4 md:ml-20 absolute self-center'>
        {/* <img className='w-10 h-10 bg-white/10 rounded-3xl' src='/icon.png' /> */}
        <p className=' mt-2 text-3xl font-bold text-lightgrey'><span className='text-5xl'>S</span>torySafari</p>
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