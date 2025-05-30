'use client';

import React from 'react';

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

const Steps: React.FC<StepsProps> = ({ children, className = '' }) => {
  // Convertir los hijos a un array para poder manipularlos
  const childrenArray = React.Children.toArray(children);
  
  // Crear un array nuevo con los hijos modificados
  const stepsWithNumbers = childrenArray.map((child, index) => {
    if (React.isValidElement(child)) {
      // Clonar el elemento hijo y añadir el número de paso
      return React.cloneElement(child, {
        ...child.props,
        stepNumber: index + 1,
      });
    }
    return child;
  });
  
  return (
    <div className={`space-y-12 ${className}`}>
      {stepsWithNumbers}
    </div>
  );
};

export default Steps; 