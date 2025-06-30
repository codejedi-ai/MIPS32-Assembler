import React from 'react';
import { LaTeXRenderer } from './components/LaTeXRenderer';
import { MermaidRenderer } from './components/MermaidRenderer';

function App() {
  // Sample LaTeX equations
  const quadraticFormula = "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}";
  const eulerIdentity = "e^{i\\pi} + 1 = 0";
  const integralExample = "\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}";
  
  // Sample Mermaid diagrams
  const flowchartDiagram = `
    graph TD
      A[Start] --> B{Is it working?}
      B -->|Yes| C[Great!]
      B -->|No| D[Debug]
      D --> B
      C --> E[End]
  `;

  const sequenceDiagram = `
    sequenceDiagram
      participant A as Alice
      participant B as Bob
      A->>B: Hello Bob, how are you?
      B-->>A: Great, thanks for asking!
      A->>B: Want to grab coffee?
      B-->>A: Sure! When?
  `;

  const classDiagram = `
    classDiagram
      class Animal {
        +String name
        +int age
        +makeSound()
      }
      class Dog {
        +String breed
        +bark()
      }
      class Cat {
        +String color
        +meow()
      }
      Animal <|-- Dog
      Animal <|-- Cat
  `;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          LaTeX & Mermaid Demo
        </h1>
        
        {/* LaTeX Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">LaTeX Equations</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600 mb-3">Quadratic Formula</h3>
              <div className="text-center">
                <LaTeXRenderer math={quadraticFormula} block />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600 mb-3">Euler's Identity</h3>
              <div className="text-center">
                <LaTeXRenderer math={eulerIdentity} block />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600 mb-3">Gaussian Integral</h3>
              <div className="text-center">
                <LaTeXRenderer math={integralExample} block />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-600 mb-3">Inline Math</h3>
              <p className="text-gray-700">
                The famous equation <LaTeXRenderer math="E = mc^2" /> shows the mass-energy equivalence.
                Also, the derivative of <LaTeXRenderer math="f(x) = x^2" /> is <LaTeXRenderer math="f'(x) = 2x" />.
              </p>
            </div>
          </div>
        </section>

        {/* Mermaid Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Mermaid Diagrams</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-600 mb-3">Flowchart</h3>
              <MermaidRenderer chart={flowchartDiagram} id="flowchart-1" />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-600 mb-3">Sequence Diagram</h3>
              <MermaidRenderer chart={sequenceDiagram} id="sequence-1" />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-600 mb-3">Class Diagram</h3>
              <MermaidRenderer chart={classDiagram} id="class-1" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;