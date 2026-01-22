
import React from 'react';

const FloatingMath: React.FC = () => {
  const symbols = ['{ }', '[ ]', '=>', '∫', 'λ', '0x1', 'f(x)', 'π', '∑', '</>'];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((symbol, i) => (
        <div 
          key={i}
          className="math-float text-xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * -2}s`,
            animationDuration: `${15 + Math.random() * 20}s`
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingMath;
