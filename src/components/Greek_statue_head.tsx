import * as React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GLTFResult = {
  nodes: {
    ["lambert1-material"]: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.Material;
  };
};

type ModelProps = React.ComponentProps<"group">;

export function Model(props: ModelProps) {
  const { nodes, materials } = useGLTF(
    "/models/greek_statue_head-transformed.glb"
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["lambert1-material"].geometry}
        material={materials.lambert1}
        position={[-0.073, -1.113, -0.038]}
        scale={0.038}
      />
    </group>
  );
}

useGLTF.preload("/models/greek_statue_head-transformed.glb");
