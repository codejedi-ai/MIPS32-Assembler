import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  chart: string;
  id?: string;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart, id }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    if (elementRef.current) {
      elementRef.current.innerHTML = chart;
      mermaid.init(undefined, elementRef.current);
    }
  }, [chart]);

  return (
    <div 
      ref={elementRef}
      id={chartId}
      className="mermaid bg-white p-4 rounded-lg shadow-lg border"
    />
  );
};