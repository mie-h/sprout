"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader, GLTFLoader } from "three-stdlib";
import { Mesh, AnimationMixer } from "three";
import { useGLTF } from "@react-three/drei";

import { useAnimations } from "@react-three/drei";

function MeshComponent() {
  const fileUrl = "/sheep_-_cloud_-_animated/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  // useFrame(() => {
  //   mesh.current.rotation.y += 0.01;
  // });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}


export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas className='h-2xl w-2xl'>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
      <button className="btn btn-primary">Button</button>
      <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
    </div>
  );
}

