import React from 'react';

const Navbar = () => {
  return (
    <header style={{ 
      padding: '1rem 2rem', 
      backgroundColor: '#1e293b', 
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard de Ciencia de Datos</h1>
      <p style={{ margin: 0, fontWeight: 'bold' }}>Alumno: Alma Victoria López Bañuelos</p>
    </header>
  );
};

export default Navbar;