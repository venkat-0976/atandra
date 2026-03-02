import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SeoHead from '@/seo/SeoHead';
import { motion } from 'framer-motion';

// Static fallback team members (used when WP fetch fails or returns no data)
const staticTeamMembers = [
  { name: 'Nikhil Ramanlal', position: 'Managing Director & CEO', image: '/leadearship/Picture1.jpg' },
  { name: 'Sreenivas Koganti', position: 'Director - Operations', image: '/leadearship/Picture2.jpg' },
  { name: 'S. Chandrasekhar', position: 'Director - Finance', image: '/leadearship/Picture3.jpg' },
  { name: 'K. N Raja', position: 'Advisor', image: '/leadearship/Picture4.jpg' },
  { name: 'M. Achutanandan', position: 'Sr. Vice President South & East', image: '/leadearship/Picture5.jpg' },
  { name: 'Sudhir Kumta', position: 'Vice President Technical', image: '/leadearship/Picture6.jpg' },
  { name: 'Sudesh Kumta', position: 'Vice President Corporate Sales', image: '/leadearship/Picture7.jpg' },
  { name: 'Ahamad Ali', position: 'Vice President North', image: '/leadearship/Picture8.jpg' },
  { name: 'N.S. Srikanth', position: 'Sr. Vice President Service', image: '/leadearship/Picture9.jpg' },
  { name: 'Wasi Siddiqui', position: 'Vice President West', image: '/leadearship/Picture10.jpg' },
  { name: 'Thiruvengadam S', position: 'Sr.Vice President IMS Operation', image: '/leadearship/Picture11.jpg' },
  { name: 'PS.Panchatasaram', position: 'Asst. Vice President Factory', image: '/leadearship/Picture12.jpg' },
  { name: 'Mallikarjuna Rao', position: 'Asst. Vice President IMS', image: '/leadearship/Picture13.jpg' },
  { name: 'Rahul Kumta', position: 'Asst. Vice President Software', image: '/leadearship/Picture14.jpg' },
  { name: 'Dadasaheb N Vhatkar', position: 'Asst. Vice President IMS', image: '/leadearship/Picture15.jpg' },
];

interface TeamMember {
  name: string;
  position: string;
  image: string;
  initials: string;
}

const extractImageUrl = (photoField: any): string => {
  if (!photoField) return '';
  if (typeof photoField === 'string' && photoField.startsWith('http')) return photoField;
  if (typeof photoField === 'object') {
    if (photoField.url && typeof photoField.url === 'string') return photoField.url;
    if (photoField.sizes?.large) return photoField.sizes.large;
    if (photoField.sizes?.medium) return photoField.sizes.medium;
    if (photoField.sizes?.thumbnail) return photoField.sizes.thumbnail;
  }
  return '';
};

const deriveInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const OurLeadership: React.FC<{ data?: any }> = ({ data: initialData }) => {
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'leadership') {
      return initialData.acf || initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

  useEffect(() => {
    if (wpData) return;

    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=leadership&acf_format=standard');
        if (!response.ok) throw new Error('Response not ok');
        const data = await response.json();
        if (data && data.length > 0) {
          setWpData(data[0].acf);
        }
      } catch (error) {
        console.error('Error fetching WordPress leadership data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWpData();
  }, [wpData]);

  const getTeamMembers = (): TeamMember[] => {
    if (!wpData) {
      return staticTeamMembers.map((m) => ({ ...m, initials: deriveInitials(m.name) }));
    }

    const members: TeamMember[] = [];

    for (let i = 1; i <= 20; i++) {
      const leaderKey = `leader_${i}`;
      const leader = wpData[leaderKey];

      if (!leader || !leader.name || leader.name.trim() === '') continue;

      let imageUrl = extractImageUrl(leader.photo);
      if (!imageUrl) {
        const staticFallback = staticTeamMembers[i - 1];
        imageUrl = staticFallback?.image || '';
      }

      const rawInitials = (leader.initials || '').trim();
      const initialsLooksValid =
        rawInitials.length >= 1 && rawInitials.length <= 3 && /^[A-Za-z]+$/.test(rawInitials);
      const initials = initialsLooksValid ? rawInitials.toUpperCase() : deriveInitials(leader.name);

      members.push({
        name: leader.name.trim(),
        position: (leader.designation || '').trim(),
        image: imageUrl,
        initials,
      });
    }

    if (members.length === 0) {
      return staticTeamMembers.map((m) => ({ ...m, initials: deriveInitials(m.name) }));
    }

    return members;
  };

  const teamMembers = getTeamMembers();

  const pageTitle = wpData?.page_title || 'Management Team';
  const pageSubtitle = wpData?.page_subtitle || 'Meet our experienced leadership team driving innovation and excellence across all operations.';
  const bottomQuote = wpData?.bottom_quote || '"Leadership is not about being in charge. It\'s about taking care of those in your charge."';
  const seoTitle = wpData?.seo_title || 'Our Leadership Team | Atandra Energy';
  const seoDescription = wpData?.seo_description || 'Meet our experienced leadership team driving innovation and excellence, led by Managing Director & CEO Nikhil Ramanlal with expertise';

  if (isLoading) {
    return (
      <>
        <SeoHead title={seoTitle} description={seoDescription} canonical="https://atandra.in/about/our-leadership" />
        <PageLayout category="about" hideHero={true} hideBreadcrumbs={true}>
          <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
            />
          </div>
        </PageLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        keywords="Atandra Energy leadership, management team, CEO, directors, vice presidents, power management leadership, India power solutions leadership"
        canonical="https://atandra.in/about/our-leadership"
      />
      <PageLayout category="about" hideHero={true} hideBreadcrumbs={true}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            minHeight: '100vh',
          }}
        >
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1
              style={{
                color: '#1a202c',
                fontSize: '3.0rem',
                fontWeight: 800,
                marginBottom: '1rem',
                letterSpacing: '-2px',
                background: 'linear-gradient(135deg, #1a202c 0%, #4a5568 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {pageTitle}
            </h1>
            <div
              style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #3182ce, #63b3ed)',
                margin: '0 auto 1.5rem auto',
                borderRadius: '2px',
              }}
            />
            <p
              style={{
                color: '#4a5568',
                fontSize: '1.2rem',
                maxWidth: '650px',
                margin: '0 auto',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              {pageSubtitle}
            </p>
          </div>

          {/* Team Members Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
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
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
              >
                <div
                  style={{
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
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      zIndex: 1,
                      position: 'absolute',
                      userSelect: 'none',
                    }}
                  >
                    {member.initials}
                  </span>
                  {member.image && (
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                      }}
                      width={150}
                      height={150}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <h3
                  style={{
                    color: '#1a202c',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    margin: '0 0 0.5rem 0',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {member.name}
                </h3>

                <p
                  style={{
                    color: '#3182ce',
                    fontSize: '1rem',
                    fontWeight: 600,
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {member.position}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Quote */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '3rem',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
            }}
          >
            <p style={{ color: '#4a5568', fontSize: '1.1rem', fontStyle: 'italic', margin: 0 }}>{bottomQuote}</p>
          </div>

          {/* SEO Content Section */}
          <section style={{ padding: '1rem 0', marginTop: '3rem', background: '#ffffff' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  .seo-details-leadership summary { list-style: none; }
                  .seo-details-leadership summary::-webkit-details-marker { display: none; }
                  .seo-details-leadership[open] .arrow-rotate { transform: rotate(180deg); }
                `,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <details className="seo-details-leadership group" style={{ width: '100%' }}>
                  <summary
                    style={{
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
                      border: 'none',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fde68a')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fef3c7')}
                  >
                    <span>Learn More</span>
                    <span className="arrow-rotate" style={{ color: '#d97706', fontSize: '1.25rem', transition: 'transform 0.3s', display: 'inline-block' }}>
                      ▼
                    </span>
                  </summary>

                  <div
                    style={{
                      padding: '1rem',
                      marginTop: '0.5rem',
                      border: '1px solid #fde68a',
                      borderRadius: '0.5rem',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a202c', marginBottom: '0.5rem', marginTop: '1rem' }}>
                        Leadership Excellence at Atandra Energy
                      </h3>
                      <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
                        Atandra Energy's leadership team represents over 40 years of combined expertise in power management, electrical engineering, manufacturing excellence, and business innovation. Led by Managing Director & CEO Nikhil Ramanlal, our executive team brings together diverse backgrounds in operations, finance, technical development, sales, service, and software solutions.
                      </p>

                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a202c', marginBottom: '0.5rem', marginTop: '1rem' }}>
                        Strategic Vision and Operational Excellence
                      </h3>
                      <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
                        Our leadership structure combines strategic vision with hands-on operational expertise, enabling Atandra Energy to maintain its position as India's leading power conditioning brand.
                      </p>

                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a202c', marginBottom: '0.5rem', marginTop: '1rem' }}>
                        Innovation and Industry Leadership
                      </h3>
                      <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
                        The Atandra Energy leadership team drives continuous innovation in power management technologies, from traditional servo stabilizers to advanced smart factory solutions.
                      </p>

                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a202c', marginBottom: '0.5rem', marginTop: '1rem' }}>
                        Building India's Power Management Future
                      </h3>
                      <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.75 }}>
                        Under the guidance of our experienced leadership team, Atandra Energy continues to expand its product portfolio, service network, and market presence while maintaining the highest standards of quality, reliability, and customer service.
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
