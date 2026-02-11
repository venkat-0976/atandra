import React, { useState, useEffect } from 'react';
import SimpleLayout from "@/components/layout/SimpleLayout";

const SimpleIndex = () => {
  console.log('🏠 SimpleIndex page rendering...');
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    '/background_images/Slide_1.png',
    '/background_images/Slide_2.png',
    '/background_images/Slide_3.png',
    '/background_images/Slide_4.png',
    '/background_images/Slide_5.png',
  ];

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const productCategories = [
    {
      title: 'Measure',
      image: '/background_images/test and measurement.jpg',
      description: 'Advanced measurement tools and equipment for precise diagnostics',
      redirectUrl: '/measure'
    },
    {
      title: 'Online UPS',
      image: 'https://www.j-schneider.de/fileadmin/_processed_/4/8/csm_USV_1ad6803997.jpg',
      description: 'Reliable uninterrupted power supply solutions for critical applications',
      redirectUrl: '/protect/ups'
    },
    {
      title: 'Power Conditioners',
      image: '/StaticVoltageRegulator (1).jpg',
      description: 'Advanced servo stabilizers and voltage regulation systems',
      redirectUrl: '/protect/servo-stabilizers'
    },
    {
      title: 'Static Voltage Regulators',
      image: 'https://spectronstabilizer.com/wp-content/uploads/2021/03/About-US-4.jpg',
      description: 'High-performance voltage regulation for critical applications',
      redirectUrl: '/protect/static-stabilizers'
    }
  ];

  return (
    <SimpleLayout>
      <div style={{ backgroundColor: '#ffffff' }}>
        {/* Hero Carousel */}
        <div style={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5'
        }}>
          <div style={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            height: '100%',
            transform: `translateX(-${currentSlide * 100}%)`
          }}>
            {bannerImages.map((image, index) => (
              <div key={index} style={{
                width: '100%',
                height: '100%',
                flexShrink: 0,
                position: 'relative',
                backgroundColor: '#e0e0e0'
              }}>
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    console.log(`Banner image ${index + 1} failed to load`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + bannerImages.length) % bannerImages.length)}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % bannerImages.length)}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            ›
          </button>
        </div>

        {/* Product Categories */}
        <div style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              marginBottom: '50px',
              color: '#333'
            }}>
              Our Product Categories
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {productCategories.map((category, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => window.location.href = category.redirectUrl}
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={category.image}
                      alt={category.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        console.log(`Category image failed to load: ${category.title}`);
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                        }
                      }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      color: '#333'
                    }}>
                      {category.title}
                    </h3>
                    <p style={{
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '15px'
                    }}>
                      {category.description}
                    </p>
                    <button style={{
                      backgroundColor: '#1976d2',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      Know More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '60px 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '20px',
              color: '#333'
            }}>
              Our Legacy
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px auto'
            }}>
              Atandra Energy Pvt. Ltd., headquartered in Chennai, draws upon a rich foundation 
              of more than 40+ years of expertise in the realm of Power & Energy Management.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
              marginTop: '40px'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏆</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                  INDIA'S NO.1
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  MANUFACTURER OF SERVO STABILISERS
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏢</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                  100+
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  SERVICE CENTRES
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⭐</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                  40+
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  YEARS EXPERIENCE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default SimpleIndex;
