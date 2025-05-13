import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer, RenderPass, ShaderPass } from "three/examples/jsm/Addons.js";
import { DotScreenShader } from "./shaders/postprocessing/vertex";
import bigSphereFragmentShader from "./shaders/bigSphere/fragment.glsl";
import bigSpereVertexShader from "./shaders/bigSphere/vertex.glsl";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GradientGlassEffect = () => {
  // Canvas ref
  const canvasRef = useRef(null);

  // Scene refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const meshRef = useRef(null);
  const clockRef = useRef(null);
  const composerRef = useRef(null);

  // Animation state
  const [state, setState] = useState({
    currentSection: 1,
    scrollProgress: 0,
    progressScale: 0,
  });

  // Animation frame ID ref for cleanup
  const animationFrameIdRef = useRef(null);

  // Mouse tracking for interactive effects
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  // Size reference
  const sizesRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  });

  useEffect(() => {
    // Define shader colors (consistent across sections)
    const shaderColors = {
      baseFirstColor: new THREE.Color(41 / 255, 196 / 255, 206 / 255), // #29C4CE
      baseSecondColor: new THREE.Color(206 / 255, 108 / 255, 41 / 255), // #CF6C29
      accentColor: new THREE.Color(0, 0, 0), // black
    };

    // Section-specific shader configurations (without colors)
    const sectionConfigs = [
      {
        // Section 1
        noiseScale: 2.0,
        noiseSpeed: 0.3,
        patternFrequency: 5.0,
        firstOffset: 0.0,
        secondOffset: 0.5,
      },
      {
        // Section 2
        noiseScale: 4.0,
        noiseSpeed: 0.4,
        patternFrequency: 10.0,
        firstOffset: 0.0,
        secondOffset: 0.25,
      },
      {
        // Section 3
        noiseScale: 1.5,
        noiseSpeed: 0.3,
        patternFrequency: 5.0,
        firstOffset: 0.0,
        secondOffset: 0.0,
      },
      {
        // Section 4
        noiseScale: 3.0,
        noiseSpeed: 0.2,
        patternFrequency: 20.0,
        firstOffset: 0.0,
        secondOffset: 1.5,
      },
    ];

    // Initialize scene, camera, renderer
    const initThree = () => {
      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        35,
        sizesRef.current.width / sizesRef.current.height,
        0.1,
        100,
      );
      camera.position.set(0, 0, 1);
      scene.add(camera);
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: false, // Prevent transparency issues
      });
      renderer.setSize(sizesRef.current.width, sizesRef.current.height);
      renderer.setPixelRatio(sizesRef.current.pixelRatio);
      renderer.setClearColor(0x000000, 1);
      rendererRef.current = renderer;

      // Create clock for animation
      clockRef.current = new THREE.Clock();

      // Create shader material and mesh
      createShaderPlane(scene, sectionConfigs[0], shaderColors);

      // Setup post-processing
      setupPostProcessing(scene, camera, renderer);
    };

    // Create shader material and mesh
    const createShaderPlane = (scene, initialConfig, shaderColors) => {
      const material = new THREE.ShaderMaterial({
        vertexShader: bigSpereVertexShader,
        fragmentShader: bigSphereFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(sizesRef.current.width, sizesRef.current.height),
          },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uBaseFirstColor: { value: shaderColors.baseFirstColor.clone() },
          uBaseSecondColor: { value: shaderColors.baseSecondColor.clone() },
          uAccentColor: { value: shaderColors.accentColor.clone() },
          uNoiseSpeed: { value: initialConfig.noiseSpeed },
          uNoiseScale: { value: initialConfig.noiseScale },
          uPatternFrequency: { value: initialConfig.patternFrequency },
          uFirstOffset: { value: initialConfig.firstOffset },
          uSecondOffset: { value: initialConfig.secondOffset },
        },
        side: THREE.DoubleSide,
      });

      const geometry = new THREE.PlaneGeometry(16, 9, 32, 32);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = -0.5;

      // Scale the mesh to fill the view
      if (cameraRef.current) {
        const distance = cameraRef.current.position.z - mesh.position.z;
        const vFov = THREE.MathUtils.degToRad(cameraRef.current.fov);
        const height = 2 * Math.tan(vFov / 2) * distance;
        const width = height * cameraRef.current.aspect;
        mesh.scale.set(width / 8, height / 4.5, 1);
      }

      scene.add(mesh);

      materialRef.current = material;
      meshRef.current = mesh;
    };

    // Helper to apply shader configuration
    const applyShaderConfig = (config) => {
      if (!materialRef.current) return;

      materialRef.current.uniforms.uNoiseScale.value = config.noiseScale;
      materialRef.current.uniforms.uPatternFrequency.value = config.patternFrequency;
      materialRef.current.uniforms.uFirstOffset.value = config.firstOffset;
      materialRef.current.uniforms.uSecondOffset.value = config.secondOffset;
      materialRef.current.uniforms.uNoiseSpeed.value = config.noiseSpeed;
    };

    // Setup post-processing
    const setupPostProcessing = (scene, camera, renderer) => {
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const dotScreenEffect = new ShaderPass(DotScreenShader);
      dotScreenEffect.uniforms["scale"].value = 4;
      composer.addPass(dotScreenEffect);

      composerRef.current = composer;
    };

    // Handle resize
    const handleResize = () => {
      sizesRef.current.width = window.innerWidth;
      sizesRef.current.height = window.innerHeight;
      sizesRef.current.pixelRatio = Math.min(window.devicePixelRatio, 2);

      if (
        cameraRef.current &&
        rendererRef.current &&
        composerRef.current &&
        materialRef.current
      ) {
        // Update camera
        cameraRef.current.aspect = sizesRef.current.width / sizesRef.current.height;
        cameraRef.current.updateProjectionMatrix();

        // Update renderer and composer
        rendererRef.current.setSize(sizesRef.current.width, sizesRef.current.height);
        rendererRef.current.setPixelRatio(sizesRef.current.pixelRatio);
        composerRef.current.setSize(sizesRef.current.width, sizesRef.current.height);

        // Update resolution uniform
        materialRef.current.uniforms.uResolution.value.set(
          sizesRef.current.width,
          sizesRef.current.height,
        );

        // Update mesh scale
        if (meshRef.current && cameraRef.current) {
          const distance = cameraRef.current.position.z - meshRef.current.position.z;
          const vFov = THREE.MathUtils.degToRad(cameraRef.current.fov);
          const height = 2 * Math.tan(vFov / 2) * distance;
          const width = height * cameraRef.current.aspect;
          meshRef.current.scale.set(width / 8, height / 4.5, 1);
        }
      }
    };

    // Animation tick function
    const tick = () => {
      if (
        !clockRef.current ||
        !materialRef.current ||
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current ||
        !composerRef.current
      ) {
        animationFrameIdRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsedTime = clockRef.current.getElapsedTime();

      // Update material time uniform
      materialRef.current.uniforms.uTime.value = elapsedTime;

      // Smoothly update mouse position with LERP
      mouseRef.current.x = mouseRef.current.x * 0.9 + mouseRef.current.targetX * 0.1;
      mouseRef.current.y = mouseRef.current.y * 0.9 + mouseRef.current.targetY * 0.1;
      materialRef.current.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y,
      );

      // Handle scroll-based shader transitions
      if (state.progressScale !== undefined) {
        // Special case for very beginning of page
        if (state.progressScale < 0.01) {
          applyShaderConfig(sectionConfigs[0]);
          setState((prev) => ({ ...prev, currentSection: 1 }));
        }
        // Special case for very end of page
        else if (state.progressScale >= 2.8) {
          applyShaderConfig(sectionConfigs[sectionConfigs.length - 1]);
          setState((prev) => ({ ...prev, currentSection: 4 }));
        }
        // Normal interpolation between sections
        else {
          // Calculate which sections to interpolate between
          const exactPosition = state.progressScale;
          const lowerIndex = Math.min(
            Math.floor(exactPosition),
            sectionConfigs.length - 2,
          );
          const upperIndex = Math.min(lowerIndex + 1, sectionConfigs.length - 1);
          const fraction = exactPosition - lowerIndex;

          // Get section configs
          const lowerConfig = sectionConfigs[lowerIndex];
          const upperConfig = sectionConfigs[upperIndex];

          // Smooth easing function for transitions
          const easeInOutCubic = (t) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const smoothMix = easeInOutCubic(fraction);

          // Interpolate all shader parameters
          materialRef.current.uniforms.uNoiseSpeed.value =
            lowerConfig.noiseSpeed +
            (upperConfig.noiseSpeed - lowerConfig.noiseSpeed) * smoothMix;

          materialRef.current.uniforms.uNoiseScale.value =
            lowerConfig.noiseScale +
            (upperConfig.noiseScale - lowerConfig.noiseScale) * smoothMix;

          materialRef.current.uniforms.uPatternFrequency.value =
            lowerConfig.patternFrequency +
            (upperConfig.patternFrequency - lowerConfig.patternFrequency) * smoothMix;

          materialRef.current.uniforms.uFirstOffset.value =
            lowerConfig.firstOffset +
            (upperConfig.firstOffset - lowerConfig.firstOffset) * smoothMix;

          materialRef.current.uniforms.uSecondOffset.value =
            lowerConfig.secondOffset +
            (upperConfig.secondOffset - lowerConfig.secondOffset) * smoothMix;

          // Update current section tracker
          setState((prev) => ({ ...prev, currentSection: lowerIndex + 1 }));
        }
      }

      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      composerRef.current.render();

      // Call next frame
      animationFrameIdRef.current = requestAnimationFrame(tick);
    };

    // Handle mouse movement
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      mouseRef.current.targetX = (event.clientX / sizesRef.current.width - 0.5) * 2;
      mouseRef.current.targetY = (event.clientY / sizesRef.current.height - 0.5) * 2;
    };

    // Setup initialization
    const setupInit = () => {
      // Create a preloader
      const preloader = document.createElement("div");
      preloader.className =
        "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50";
      preloader.innerHTML = '<div class="text-white text-lg">Loading shader...</div>';
      document.body.appendChild(preloader);

      // Initialize shader
      const initializeShader = () => {
        // Make sure camera and renderer are ready
        if (
          !cameraRef.current ||
          !rendererRef.current ||
          !sceneRef.current ||
          !composerRef.current
        ) {
          console.error("Required 3D elements not initialized");
          return;
        }

        console.log("Initializing shader...");

        // Apply initial shader config
        applyShaderConfig(sectionConfigs[0]);

        // Force multiple renders to ensure shader is properly initialized
        for (let i = 0; i < 5; i++) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          composerRef.current.render();
        }

        // Fade out preloader
        setTimeout(() => {
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => preloader.remove(),
          });
        }, 500);

        // Log successful initialization
        console.log("Shader initialized successfully");

        // Setup scroll tracking after shader is initialized
        setTimeout(() => {
          ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3, // Smoother, more responsive effect
            markers: false,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Convert progress from 0-1 to 0-3 for the four sections
              const progressScale = self.progress * 3;

              setState((prev) => ({
                ...prev,
                progressScale,
                scrollProgress: self.progress,
              }));

              // Debug log
              if (self.progress > 0) {
                console.log(
                  `Scroll progress: ${self.progress.toFixed(2)}, Scale: ${progressScale.toFixed(2)}`,
                );
              }
            },
            onToggle: (self) => {
              if (self.isActive && state.progressScale === 0) {
                applyShaderConfig(sectionConfigs[0]);
              }
            },
          });

          console.log("ScrollTrigger initialized");
        }, 200);
      };

      // Initialize after a short delay
      setTimeout(initializeShader, 500);
    };

    // Initialize Three.js
    initThree();

    // Setup handlers and initialize
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    setupInit();

    // Start animation loop
    tick();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      // Dispose resources
      if (meshRef.current && meshRef.current.geometry) {
        meshRef.current.geometry.dispose();
      }

      if (materialRef.current) {
        materialRef.current.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none hidden">
      <canvas
        ref={canvasRef}
        className="webgl w-full h-full object-cover hidden"
      ></canvas>
    </div>
  );
};

export default GradientGlassEffect;
