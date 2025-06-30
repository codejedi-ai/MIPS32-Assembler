import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface LaTeXRendererProps {
  math: string;
  block?: boolean;
}

export const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ math, block = false }) => {
  try {
    return block ? <BlockMath math={math} /> : <InlineMath math={math} />;
  } catch (error) {
    return (
      <span className="text-red-500 bg-red-50 px-2 py-1 rounded">
        LaTeX Error: {error instanceof Error ? error.message : 'Unknown error'}
      </span>
    );
  }
};