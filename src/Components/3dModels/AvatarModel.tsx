import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, Suspense } from "react";

type AvatarModelProps = {
  isIntersecting: boolean;
};

const AvatarModel: React.FC<AvatarModelProps> = ({
  isIntersecting,
}) => {
  const controls = useRef();
  //  const [model, setModel] = useState();

  const avatar = useGLTF("./avatar.gltf");
  //  const texture = useLoader(TextureLoader, "./example.png");

  if (!avatar) return <div>Loading...</div>;

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Canvas>
        <OrbitControls
          ref={controls}
          enableZoom={false}
          position={[3, 2, 5]}
          target={[0, 1, 0]}
          autoRotate={isIntersecting}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 2.6}
          rotateSpeed={0.5}
          rotation={[-Math.PI / 4, 0, 0]}
        />
        <primitive
          object={avatar.scene}
          position-z={0}
          position-y={-1.5}
          scale={3}
        />
        <ambientLight intensity={1} />
        <directionalLight position={[1, 2, 5]} />
        {/* <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
               <circleGeometry args={[2, 32]} />
               <meshBasicMaterial map={texture} />
            </mesh> */}
      </Canvas>
    </Suspense>
  );
};

export default AvatarModel;
