'use client';

import { useEffect, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

const DEMO_NODES = [
  { id: 'hub', label: 'YOUR MIND', val: 30, color: '#10b981', type: 'hub' },
  { id: 'rev', label: 'Revenue', val: 16, color: '#3b82f6', type: 'branch' },
  { id: 'stripe', label: 'Stripe API', val: 8, color: '#3b82f6', type: 'leaf' },
  { id: 'subs', label: 'Subscriptions', val: 8, color: '#3b82f6', type: 'leaf' },
  { id: 'ent', label: 'Enterprise', val: 8, color: '#3b82f6', type: 'leaf' },
  { id: 'arch', label: 'Architecture', val: 16, color: '#8b5cf6', type: 'branch' },
  { id: 'rust', label: 'Rust Core', val: 8, color: '#8b5cf6', type: 'leaf' },
  { id: 'next', label: 'Next.js UI', val: 8, color: '#8b5cf6', type: 'leaf' },
  { id: 'sql', label: 'SQLite', val: 8, color: '#8b5cf6', type: 'leaf' },
  { id: 'mkt', label: 'Marketing', val: 16, color: '#f59e0b', type: 'branch' },
  { id: 'ph', label: 'Product Hunt', val: 8, color: '#f59e0b', type: 'leaf' },
  { id: 'dm', label: 'Cold DMs', val: 8, color: '#f59e0b', type: 'leaf' },
  { id: 'tw', label: 'Twitter Viral', val: 8, color: '#f59e0b', type: 'leaf' },
  { id: 'ai', label: 'AI Engine', val: 16, color: '#ec4899', type: 'branch' },
  { id: 'gpt', label: 'GPT-4o', val: 8, color: '#ec4899', type: 'leaf' },
  { id: 'map', label: 'Neural Map', val: 8, color: '#ec4899', type: 'leaf' },
  { id: 'vec', label: 'Embeddings', val: 8, color: '#ec4899', type: 'leaf' },
];

const DEMO_LINKS = [
  { source: 'hub', target: 'rev' }, { source: 'hub', target: 'arch' },
  { source: 'hub', target: 'mkt' }, { source: 'hub', target: 'ai' },
  { source: 'rev', target: 'stripe' }, { source: 'rev', target: 'subs' }, { source: 'rev', target: 'ent' },
  { source: 'arch', target: 'rust' }, { source: 'arch', target: 'next' }, { source: 'arch', target: 'sql' },
  { source: 'mkt', target: 'ph' }, { source: 'mkt', target: 'dm' }, { source: 'mkt', target: 'tw' },
  { source: 'ai', target: 'gpt' }, { source: 'ai', target: 'map' }, { source: 'ai', target: 'vec' },
  { source: 'gpt', target: 'map' }, { source: 'stripe', target: 'subs' }, { source: 'ph', target: 'tw' },
];

export default function InteractiveDemo() {
  const graphRef = useRef<any>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;
    if (graphRef.current) {
      graphRef.current.cameraPosition({ x: 0, y: 0, z: 380 });
    }

    let angle = 0;
    const interval = setInterval(() => {
      if (graphRef.current) {
        const r = 380;
        graphRef.current.cameraPosition({
          x: r * Math.sin(angle),
          y: 30 * Math.sin(angle * 0.4),
          z: r * Math.cos(angle),
        });
        angle += Math.PI / 1200;
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const paintNode = (node: any) => {
    const group = new THREE.Group();
    const isHub = node.type === 'hub';
    const size = isHub ? 14 : node.type === 'branch' ? 7 : 4;
    const color = node.color || '#10b981';

    // Core sphere
    const geo = new THREE.SphereGeometry(size * 0.5, 32, 32);
    const mat = new THREE.MeshPhysicalMaterial({
      color,
      emissive: color,
      emissiveIntensity: isHub ? 0.8 : 0.4,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1,
    });
    group.add(new THREE.Mesh(geo, mat));

    // Volumetric glow sprite
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    const hex = color;
    grad.addColorStop(0, hex + 'ff');
    grad.addColorStop(0.3, hex + '88');
    grad.addColorStop(0.7, hex + '22');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: isHub ? 2 : 1.2,
    }));
    sprite.scale.set(size * (isHub ? 10 : 7), size * (isHub ? 10 : 7), 1);
    group.add(sprite);

    return group;
  };

  return (
    <div ref={mountRef} className="absolute inset-0 z-0">
      <ForceGraph3D
        ref={graphRef}
        graphData={{ nodes: DEMO_NODES.map(n => ({ ...n })), links: DEMO_LINKS.map(l => ({ ...l })) }}
        width={typeof window !== 'undefined' ? window.innerWidth : 1440}
        height={typeof window !== 'undefined' ? window.innerHeight : 900}
        backgroundColor="rgba(0,0,0,0)"
        nodeThreeObject={paintNode}
        nodeLabel="label"
        linkColor={() => 'rgba(255,255,255,0.06)'}
        linkWidth={1}
        linkDirectionalParticles={3}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={0.004}
        linkDirectionalParticleColor={(link: any) => {
          const n = DEMO_NODES.find(n => n.id === (link.target?.id || link.target));
          return n?.color || '#10b981';
        }}
        enableNodeDrag={true}
        enableNavigationControls={true}
        showNavInfo={false}
        d3VelocityDecay={0.2}
        cooldownTicks={200}
      />
    </div>
  );
}
