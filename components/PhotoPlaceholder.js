import React from 'react';

const PhotoPlaceholder = ({ number, width = 120, height = 120 }) => {
  const colors = [
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ];

  const messages = [
    '💕 Foto 1',
    '🥰 Foto 2', 
    '❤️ Foto 3',
    '😍 Foto 4',
    '💖 Foto 5',
    '🌸 Foto 6'
  ];

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: colors[number - 1] || colors[0],
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        textAlign: 'center',
        border: '4px solid white',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer'
      }}
    >
      {messages[number - 1] || `Foto ${number}`}
    </div>
  );
};

export default PhotoPlaceholder;