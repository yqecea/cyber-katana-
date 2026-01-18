import React, { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'right' | 'center' | 'full';
}

export const Section: React.FC<SectionProps> = ({ id, children, className = '', align = 'center' }) => {
  let alignClass = 'items-center text-center';
  if (align === 'left') alignClass = 'items-start text-left';
  if (align === 'right') alignClass = 'items-end text-right';

  return (
    <section 
      id={id}
      className={`relative min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-20 z-10 ${alignClass} ${className}`}
      style={{ perspective: '1000px' }}
    >
      {children}
    </section>
  );
};