// import React, { Suspense, memo, useMemo } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   Decal,
//   Float,
//   OrbitControls,
//   Preload,
//   useTexture,
// } from "@react-three/drei";
// import CanvasLoader from "../Loader";

// const Sphere = memo(({ imgUrl }) => {
//   const decal = useTexture(imgUrl);

//   return (
//     <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[0, 0, 0.05]} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshStandardMaterial
//           color="#ccc"
//           polygonOffset
//           polygonOffsetFactor={-5}
//           flatShading
//         />
//         <Decal
//           position={[0, 0, 1]}
//           rotation={[0, 0, 0]}
//           scale={1}
//           map={decal}
//         />
//       </mesh>
//     </Float>
//   );
// });

// const SkillSphere = ({ icon }) => (
//   <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} frameloop="demand">
//     <Suspense fallback={<CanvasLoader />}>
//       <OrbitControls enableZoom={false} />
//       <Sphere imgUrl={icon} />
//     </Suspense>
//     <Preload all />
//   </Canvas>
// );

// export default SkillSphere;
