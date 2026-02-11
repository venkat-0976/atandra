import React, { useMemo } from 'react';
import { Mail, MapPin, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SeoHead from '@/seo/SeoHead';

type Job = {
  title: string;
  team: string;
  location: string;
  applyEmail: string;
  poster: string;
  highlights: string[];
  align?: 'left' | 'right';
};

/** ✅ Background layers (SmartFactory-style). Only visuals, no layout/content changes. */
const SmartFactoryBg: React.FC<{ variant?: 'hero' | 'page' }> = ({ variant = 'page' }) => {
  const isHero = variant === 'hero';

  return (
    <>
      {/* Skew panel */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute top-0 right-0 w-3/4 h-full ${isHero ? 'bg-green-50' : 'bg-green-50/70'
            } rounded-bl-[100px] transform -skew-x-12`}
        />
        <div className="absolute bottom-16 left-0 w-72 h-72 bg-green-400 rounded-full opacity-10" />
      </div>

      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 left-6 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-200/25 to-green-300/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-200/20 to-emerald-300/15 rounded-full blur-lg animate-pulse delay-500" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2316a34a' stroke-width='1'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
};

const Careers: React.FC = () => {
  const JOBS: Job[] = useMemo(
    () => [
      {
        title: 'Engineer – Technical Support',
        team: 'Test & Measurement',
        location: 'Chennai',
        applyEmail: 'careers@atandra.in',
        poster: '/Careers/hiring-1.jpeg',
        highlights: [
          'Customer-facing technical assistance and solution guidance',
          'Support product demos, installation and troubleshooting',
          'Coordinate with engineering and sales for closure',
        ],
      },
      {
        title: 'Asst. Sales Manager',
        team: 'Test & Measurement',
        location: 'Bengaluru',
        applyEmail: 'careers@atandra.in',
        poster: '/Careers/hiring-2.jpeg',
        highlights: [
          'Drive regional sales pipeline and customer relationships',
          'Prepare proposals and coordinate technical discussions',
          'Meet targets with solution-led selling approach',
        ],
      },
      {
        title: 'Inside Sales',
        team: 'Sales',
        location: 'Chennai',
        applyEmail: 'careers@atandra.in',
        poster: '/Careers/hiring-3.jpeg',
        highlights: [
          'Manage inbound leads and qualification',
          'Coordinate quotations, follow-ups and documentation',
          'Maintain CRM hygiene and support field sales',
        ],
      },

    ],

    []
  );

  return (
    <>
      <SeoHead
        title="Careers | Atandra Energy"
        description="Explore current openings at Atandra Energy. Email your resume to careers@atandra.in with subject: Job Application – Role Name."
        keywords="Atandra careers, jobs, hiring, openings, Chennai, Bengaluru"
        canonical="https://atandra.in/about/careers"
      />

      <PageLayout hideHero hideBreadcrumbs>
        <div className="min-h-screen w-full overflow-x-hidden bg-[#e6f7f1] font-['Open_Sans']">
          <style>{`
            nav.mb-10 { display: none !important; }
            .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
            * { font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
          `}</style>

          {/* Header */}
          <section className="relative w-full overflow-hidden bg-[#e6f7f1]">
            <SmartFactoryBg variant="hero" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E3A8A]">
                Careers at Atandra Energy
              </h1>
              <p className="mt-3 text-base sm:text-lg text-gray-900 font-semibold">
                Discover opportunities to grow with us—browse open roles and submit your application via email.
              </p>
            </div>

            <div className="h-6 sm:h-8 bg-gradient-to-b from-[#e6f7f1] to-[#e6f7f1]" />
          </section>

          {/* Jobs section */}
          <section className="relative pb-10 sm:pb-14 bg-[#e6f7f1] overflow-hidden">
            <SmartFactoryBg variant="page" />

            <div className="relative z-10">
              {JOBS.map((job, i) => {
                // Determine layout: standard (false) or reverse (true)
                // Reverse (true): Image Left, Text Right
                const reverse = job.align === 'right' ? true :
                  job.align === 'left' ? false :
                    i % 2 === 1;

                const subject = `Job Application – ${job.title}`;
                const mailtoHref = `mailto:${job.applyEmail}?subject=${encodeURIComponent(subject)}`;

                return (
                  <div key={i} className="py-8 sm:py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                          }`}
                      >
                        {/* Text Content */}
                        <div className="space-y-5">
                          <div className="inline-block w-full sm:w-auto">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl shadow-md">
                              <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
                                {job.title}
                              </h2>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 border border-gray-200 shadow-sm">
                              <Briefcase className="w-4 h-4 text-gray-700" />
                              <span className="text-sm font-extrabold text-gray-900">{job.team}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 border border-gray-200 shadow-sm">
                              <MapPin className="w-4 h-4 text-gray-700" />
                              <span className="text-sm font-extrabold text-gray-900">{job.location}</span>
                            </div>
                          </div>

                          <p className="text-gray-800 font-semibold leading-relaxed">
                            We are looking for strong, responsible candidates who can work with teams and customers to deliver measurable impact.
                          </p>

                          <div className="space-y-3">
                            {job.highlights.map((h, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-800 font-semibold leading-relaxed">{h}</p>
                              </div>
                            ))}
                          </div>

                          {/* Apply area */}
                          <div className="pt-4 border-t border-gray-300/70">
                            <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] sm:items-start gap-4">
                              <a
                                href={mailtoHref}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href = mailtoHref;
                                }}
                                role="button"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold shadow-md transition whitespace-nowrap cursor-pointer"
                              >
                                <Mail className="w-5 h-5" />
                                Apply via Email
                                <ArrowRight className="w-4 h-4" />
                              </a>

                              <div className="text-sm text-gray-800 font-semibold leading-snug min-w-0">
                                <div className="grid grid-cols-[60px,1fr] gap-x-1 gap-y-2 items-start">
                                  <span className="font-extrabold whitespace-nowrap">Email:</span>
                                  <span className="break-all">{job.applyEmail}</span>
                                  <span className="font-extrabold whitespace-nowrap">Subject:</span>
                                  <span className="[overflow-wrap:anywhere] break-words">
                                    Job Application – {job.title}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Image Container */}
                        <div className={`relative flex justify-center ${reverse ? 'lg:justify-start' : 'lg:justify-end'}`}>
                          <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg w-full">
                            <img
                              src={job.poster}
                              alt={`${job.title} position`}
                              className="w-full h-auto object-contain scale-[0.98]"
                              loading={i === 0 ? 'eager' : 'lazy'}
                              decoding="async"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="mt-10 border-b border-gray-300/60" />
                    </div>
                  </div>
                );
              })}

              <style>{`
                section.pb-10 > div:last-child .border-b { display: none; }
              `}</style>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
};

export default Careers;
