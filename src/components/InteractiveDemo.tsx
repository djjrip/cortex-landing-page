'use client';

import { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';

export default function InteractiveDemo() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const graphRef = useRef<any>(null);

  // Mock data representing a typical startup/architecture brain map
  const data = {
    nodes: [
      { id: '1', name: 'Startup Idea', val: 20, color: '#3b82f6' },
      { id: '2', name: 'Monetization', val: 10, color: '#10b981' },
      { id: '3', name: 'Stripe API', val: 5, color: '#10b981' },
      { id: '4', name: 'Subscriptions', val: 5, color: '#10b981' },
      { id: '5', name: 'Architecture', val: 10, color: '#8b5cf6' },
      { id: '6', name: 'Rust Core', val: 5, color: '#8b5cf6' },
      { id: '7', name: 'Next.js UI', val: 5, color: '#8b5cf6' },
      { id: '8', name: 'Marketing', val: 10, color: '#f59e0b' },
      { id: '9', name: 'Twitter Viral', val: 5, color: '#f59e0b' },
      { id: '10', name: 'Cold DMs', val: 5, color: '#f59e0b' },
    ],
    links: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '2', target: '4' },
      { source: '1', target: '5' },
      { source: '5', target: '6' },
      { source: '5', target: '7' },
      { source: '1', target: '8' },
      { source: '8', target: '9' },
      { source: '8', target: '10' },
    ]
  };

  useEffect(() => {
    // Set initial dimensions
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Handle resize
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    
    // Auto-rotate the camera to make it feel cinematic
    let angle = 0;
    const distance = 400;
    const interval = setInterval(() => {
      if (graphRef.current) {
        graphRef.current.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle)
        });
        angle += Math.PI / 800; // Super slow rotation
      }
    }, 16); // ~60fps

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  if (dimensions.width === 0) return null; // Avoid hydration mismatch

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto opacity-60">
      <ForceGraph3D
        ref={graphRef}
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#000000"
        nodeLabel="name"
        nodeColor="color"
        nodeRelSize={6}
        linkWidth={1.5}
        linkOpacity={0.3}
        linkColor={() => 'rgba(255,255,255,0.2)'}
        enableNodeDrag={true}
        enableNavigationControls={true}
        showNavInfo={false}
      />
    </div>
  );
}
