import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");
  return (
    <group dispose={null}>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <directionalLight
        position={[20, 100, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <primitive
        object={scene}
        scale={isMobile ? 0.55 : 0.75}
        position={isMobile ? [0, -3.3, -1] : [0, -3.4, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={window.devicePixelRatio}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
