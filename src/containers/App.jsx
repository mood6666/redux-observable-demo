import React from 'react';

export default function App({ children }, text) {

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      {children}
    </div>
  );
}
