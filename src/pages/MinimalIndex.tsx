import React from 'react';

const MinimalIndex = () => {
  console.log('🏠 MinimalIndex page rendering...');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#ffffff', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          margin: '0',
          fontSize: '2rem'
        }}>
          🏢 Atandra Energy - Minimal Version
        </h1>
        <p style={{ 
          color: '#666', 
          margin: '10px 0 0 0',
          fontSize: '1.1rem'
        }}>
          Power & Energy Management Solutions
        </p>
      </header>

      <main>
        <section style={{
          backgroundColor: '#e3f2fd',
          padding: '30px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#1976d2', marginBottom: '15px' }}>
            Our Solutions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#f57c00', marginBottom: '10px' }}>⚡ Measure</h3>
              <p style={{ color: '#666', margin: '0' }}>
                Advanced measurement tools and equipment for precise diagnostics
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#1976d2', marginBottom: '10px' }}>🛡️ Protect</h3>
              <p style={{ color: '#666', margin: '0' }}>
                Reliable power protection solutions including UPS and stabilizers
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#388e3c', marginBottom: '10px' }}>🌱 Conserve</h3>
              <p style={{ color: '#666', margin: '0' }}>
                Energy management and conservation solutions
              </p>
            </div>
          </div>
        </section>

        <section style={{
          backgroundColor: '#f5f5f5',
          padding: '30px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#333', marginBottom: '15px' }}>
            About Atandra Energy
          </h2>
          <p style={{ 
            color: '#666', 
            lineHeight: '1.6',
            fontSize: '1.1rem'
          }}>
            Atandra Energy Pvt. Ltd., headquartered in Chennai, draws upon a rich foundation 
            of more than 40+ years of expertise in the realm of Power & Energy Management. 
            We are India's leading power conditioning brand.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginTop: '20px'
          }}>
            <div style={{ textAlign: 'center', padding: '15px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🏆</div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>India's No.1</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Servo Stabilizer Manufacturer</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '15px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🏢</div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>100+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Service Centers</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '15px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>⭐</div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>40+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Years Experience</div>
            </div>
          </div>
        </section>

        <section style={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '30px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Contact Us</h2>
          <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
            Ready to discuss your power management needs?
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div>
              <strong>📞 Phone:</strong> +91 95000 97966
            </div>
            <div>
              <strong>✉️ Email:</strong> enquiry@atandra.in
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0' }}>
          © 2025 Atandra Energy Private Limited. All rights reserved.
        </p>
      </footer>
      
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '25px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
      onClick={() => {
        console.log('Chat button clicked');
        alert('Chat functionality would be here!');
      }}>
        💬 Chat
      </div>
    </div>
  );
};

export default MinimalIndex;
