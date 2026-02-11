import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SeoHead from '@/seo/SeoHead';

// Team members data - you can add more members here
const teamMembers = [
  // Original 3 team members
  {
    name: 'Nikhil Ramanlal',
    position: 'Managing Director & CEO',
    image: '/leadearship/Picture1.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Sreenivas Koganti',
    position: 'Director - Operations',
    image: '/leadearship/Picture2.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'S. Chandrasekhar',
    position: 'Director - Finance',
    image: '/leadearship/Picture3.jpg' // This will show initials until you upload the actual photo
  },
  // Additional 7 team members from Atandra
  {
    name: 'K. N Raja',
    position: 'Advisor',
    image: '/leadearship/Picture4.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'M. Achutanandan',
    position: 'Sr. Vice President South & East',
    image: '/leadearship/Picture5.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Sudhir Kumta',
    position: 'Vice President Technical',
    image: '/leadearship/Picture6.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Sudesh Kumta',
    position: 'Vice President Corporate Sales',
    image: '/leadearship/Picture7.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Ahamad Ali',
    position: 'Vice President North',
    image: '/leadearship/Picture8.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'N.S. Srikanth',
    position: 'Sr. Vice President Service',
    image: '/leadearship/Picture9.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Wasi Siddiqui',
    position: 'Vice President West',
    image: '/leadearship/Picture10.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Thiruvengadam S',
    position: 'Sr.Vice President IMS Operation',
    image: '/leadearship/Picture11.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'PS.Panchatasaram',
    position: 'Asst. Vice President Factory',
    image: '/leadearship/Picture12.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Mallikarjuna Rao',
    position: 'Asst. Vice President IMS',
    image: '/leadearship/Picture13.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Rahul Kumta',
    position: 'Asst. Vice President Software',
    image: '/leadearship/Picture14.jpg' // This will show initials until you upload the actual photo
  },
  {
    name: 'Dadasaheb N Vhatkar',
    position: 'Asst. Vice President IMS',
    image: '/leadearship/Picture15.jpg' // This will show initials until you upload the actual photo
  },

];

const OurLeadership: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Our Leadership Team | Atandra Energy"
        description="Meet our experienced leadership team driving innovation and excellence, led by Managing Director & CEO Nikhil Ramanlal with expertise"
        keywords="Atandra Energy leadership, management team, CEO, directors, vice presidents, power management leadership, India power solutions leadership"
        canonical="https://atandra.in/about/our-leadership"
      />
      <PageLayout category="about" hideHero={true} hideBreadcrumbs={true}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          minHeight: '100vh'
        }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{
              color: '#1a202c',
              fontSize: '3.0rem',
              fontWeight: 800,
              marginBottom: '1rem',
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, #1a202c 0%, #4a5568 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Management Team
            </h1>
            <div style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #3182ce, #63b3ed)',
              margin: '0 auto 1.5rem auto',
              borderRadius: '2px'
            }}></div>
            <p style={{
              color: '#4a5568',
              fontSize: '1.2rem',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontWeight: 400
            }}>
              Meet our experienced leadership team driving innovation and excellence across all operations.
            </p>
          </div>

          {/* Team Members Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
              >
                {/* Profile Image */}
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem auto',
                  overflow: 'hidden',
                  border: '4px solid #f0f4f8',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #3182ce, #63b3ed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 2
                    }}
                    width={320}
                    height={240}
                    onError={(e) => {
                      // Hide image if it fails to load, showing the initials background
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Initials fallback - always present but behind the image */}
                  <span style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}>
                    {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </span>
                </div>

                {/* Member Info */}
                <h3 style={{
                  color: '#1a202c',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '-0.5px'
                }}>
                  {member.name}
                </h3>

                <p style={{
                  color: '#3182ce',
                  fontSize: '1rem',
                  fontWeight: 600,
                  margin: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {member.position}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{
              color: '#4a5568',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              margin: 0
            }}>
              "Leadership is not about being in charge. It's about taking care of those in your charge."
            </p>
          </div>

          {/* SEO Content Section - 250+ Words in Collapsible Details */}
          <section style={{ padding: '1rem 0', marginTop: '3rem', background: '#ffffff' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
              <style dangerouslySetInnerHTML={{
                __html: `
                .seo-details-leadership summary {
                  list-style: none;
                }
                .seo-details-leadership summary::-webkit-details-marker {
                  display: none;
                }
                .seo-details-leadership[open] .arrow-rotate {
                  transform: rotate(180deg);
                }
              `}} />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <details className="seo-details-leadership group" style={{ width: '100%' }}>
                  <summary style={{
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#1a202c',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#fef3c7',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: 'fit-content',
                    margin: '0 auto',
                    transition: 'background-color 0.3s',
                    border: 'none'
                  }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fde68a'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fef3c7'}>
                    <span>Learn More</span>
                    <span className="arrow-rotate" style={{
                      color: '#d97706',
                      fontSize: '1.25rem',
                      transition: 'transform 0.3s',
                      display: 'inline-block'
                    }}>▼</span>
                  </summary>

                  <div style={{
                    padding: '1rem',
                    marginTop: '0.5rem',
                    border: '1px solid #fde68a',
                    borderRadius: '0.5rem',
                    backgroundColor: '#ffffff'
                  }}>
                    <div style={{ maxWidth: 'none' }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#1a202c',
                        marginBottom: '0.5rem',
                        marginTop: '1rem'
                      }}>
                        Leadership Excellence at Atandra Energy
                      </h3>
                      <p style={{
                        color: '#4a5568',
                        fontSize: '0.875rem',
                        lineHeight: 1.75,
                        marginBottom: '0.75rem'
                      }}>
                        Atandra Energy's leadership team represents over 40 years of combined expertise in power management, electrical engineering, manufacturing excellence, and business innovation. Led by Managing Director & CEO Nikhil Ramanlal, our executive team brings together diverse backgrounds in operations, finance, technical development, sales, service, and software solutions. Our directors and vice presidents oversee critical functions including regional operations across North, South, East, and West India, ensuring comprehensive market coverage and localized customer support for our nationwide client base.
                      </p>

                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#1a202c',
                        marginBottom: '0.5rem',
                        marginTop: '1rem'
                      }}>
                        Strategic Vision and Operational Excellence
                      </h3>
                      <p style={{
                        color: '#4a5568',
                        fontSize: '0.875rem',
                        lineHeight: 1.75,
                        marginBottom: '0.75rem'
                      }}>
                        Our leadership structure combines strategic vision with hands-on operational expertise, enabling Atandra Energy to maintain its position as India's leading power conditioning brand. The leadership team oversees manufacturing facilities, quality assurance processes, research and development initiatives, customer relationship management, and service network expansion. With advisors providing industry insights and senior vice presidents managing regional operations, technical services, and corporate functions, our leadership ensures that every aspect of our business delivers excellence, innovation, and customer satisfaction across all touchpoints.
                      </p>

                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#1a202c',
                        marginBottom: '0.5rem',
                        marginTop: '1rem'
                      }}>
                        Innovation and Industry Leadership
                      </h3>
                      <p style={{
                        color: '#4a5568',
                        fontSize: '0.875rem',
                        lineHeight: 1.75,
                        marginBottom: '0.75rem'
                      }}>
                        The Atandra Energy leadership team drives continuous innovation in power management technologies, from traditional servo stabilizers to advanced smart factory solutions, energy management systems, and IoT-enabled monitoring platforms. Our technical leadership, including Vice Presidents overseeing technical development and IMS (Industrial Measurement Solutions) operations, ensures that our products meet international standards, incorporate cutting-edge features, and address evolving industry requirements. The leadership's commitment to quality, customer-centricity, and sustainable growth has established Atandra Energy as a trusted partner for thousands of businesses across India, from small enterprises to Fortune 500 companies.
                      </p>

                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#1a202c',
                        marginBottom: '0.5rem',
                        marginTop: '1rem'
                      }}>
                        Building India's Power Management Future
                      </h3>
                      <p style={{
                        color: '#4a5568',
                        fontSize: '0.875rem',
                        lineHeight: 1.75
                      }}>
                        Under the guidance of our experienced leadership team, Atandra Energy continues to expand its product portfolio, service network, and market presence while maintaining the highest standards of quality, reliability, and customer service. Our leaders foster a culture of innovation, collaboration, and excellence that empowers our 500+ team members to deliver exceptional results. With a clear vision for the future of power management in India, our leadership team is committed to helping businesses achieve energy efficiency, operational reliability, and sustainable growth through advanced power conditioning, measurement, and conservation solutions.
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
};

export default OurLeadership;