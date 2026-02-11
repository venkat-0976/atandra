import React from "react";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  console.log('🎨 SimpleLayout component rendering...');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Simple Navigation */}
      <nav style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            KRYKARD
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="/measure" style={{ color: 'white', textDecoration: 'none' }}>Measure</a>
            <a href="/protect" style={{ color: 'white', textDecoration: 'none' }}>Protect</a>
            <a href="/conserve" style={{ color: 'white', textDecoration: 'none' }}>Conserve</a>
            <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
            <a href="/about/careers" style={{ color: 'white', textDecoration: 'none' }}>Careers</a>
            <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ minHeight: 'calc(100vh - 140px)' }}>
        {children}
      </main>

      {/* Simple Footer */}
      <footer style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ margin: '0' }}>
            © 2025 Atandra Energy Private Limited. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SimpleLayout;
