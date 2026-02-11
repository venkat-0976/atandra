import { FC } from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";

// --- Reusable Components (same as before) ---

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export const FooterLink: FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-white hover:text-blue-400 transition-colors duration-300 text-base font-['Open_Sans'] py-1 px-0 flex items-center text-left"
    >
      {children}
    </a>
  );
};

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

export const SocialButton: FC<SocialButtonProps> = ({ href, icon, label, color }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-14 h-14 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full ${color} flex items-center justify-center touch-manipulation border-2 border-white/10 sm:border-none`}
      aria-label={label}
    >
      {icon}
    </a>
  );
};

// --- Main Professional Footer Component ---

const ProfessionalFooter: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-gray-950 py-16 text-gray-200 font-['Open_Sans']">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <img
                src="/unnamed.png"
                alt="KRYKARD Logo"
                className="h-14 w-auto object-contain mb-5"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />

              {/* Original descriptive paragraph */}
              <p className="leading-relaxed mb-10 text-white text-base font-['Open_Sans']">
                With over four decades as India's trusted leader in Power & Energy Management, we deliver unparalleled conditioning solutions, ensuring reliable performance for diverse industries
              </p>

              {/* NEW SECTION: India's NO.1 POWER CONDITIONING BRAND */}
              <div className="mb-10 flex items-center justify-start gap-2">
                <span className="text-white text-2xl md:text-4xl font-['Open_Sans'] flex-shrink-0">
                  India's
                </span>
                <span className="text-blue-400 text-6xl md:text-7xl font-extrabold leading-none font-['Open_Sans'] flex-shrink-0">
                  NO.1
                </span>
                <div className="flex flex-col text-white text-xl md:text-3xl font-bold font-['Open_Sans'] leading-tight ml-2">
                  <span>POWER</span>
                  <span>CONDITIONING</span>
                  <span>BRAND</span>
                </div>
              </div>
              {/* END NEW SECTION */}

            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-7 font-['Open_Sans'] border-b-2 border-blue-500 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 font-['Open_Sans'] text-base">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li>
                <FooterLink href="http://krykardcare.in/support/#/main">Service</FooterLink>
              </li>
              <li><FooterLink href="/contact/sales">Contact Sales</FooterLink></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-7 font-['Open_Sans'] border-b-2 border-blue-500 pb-2 inline-block">
              Contact Info
            </h3>

            <address className="not-italic space-y-5 text-white text-base font-['Open_Sans']">
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <p className="leading-relaxed text-white font-['Open_Sans'] text-base">
                  No.5, Kumaran St, Pazhavanthangal,<br />
                  Chennai - 600 114, Tamil Nadu, India
                </p>
              </div>

              <a
                href="tel:+919500097966"
                className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 font-['Open_Sans'] text-base"
              >
                <FaPhoneAlt className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span>+91 95000 97966</span>
              </a>
              <a
                href="tel:+914442780700"
                className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 font-['Open_Sans'] text-base"
              >
                <FaPhoneAlt className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span>044 4278 0700</span>
              </a>
              <a
                href="mailto:enquiry@atandra.in"
                className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 font-['Open_Sans'] text-base"
              >
                <FaEnvelope className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span>enquiry@atandra.in</span>
              </a>
            </address>

            {/* Social Media */}
            <div className="flex space-x-4 mt-8">
              <SocialButton
                href="https://www.linkedin.com/company/3650597/admin/dashboard/"
                icon={<FaLinkedin className="h-5 w-5 text-white" />}
                label="LinkedIn"
                color="bg-[#0077B5] hover:bg-[#005885]"
              />
              <SocialButton
                href="https://whatsapp.com/channel/0029VbC1jdI5fM5bwtVHKo35"
                icon={<FaWhatsapp className="h-5 w-5 text-white" />}
                label="WhatsApp"
                color="bg-[#25D366] hover:bg-[#22B25D]"
              />
              <SocialButton
                href="https://www.facebook.com/Krykard/"
                icon={<FaFacebook className="h-5 w-5 text-white" />}
                label="Facebook"
                color="bg-[#1877F2] hover:bg-[#166FE5]"
              />
              <SocialButton
                href="https://www.youtube.com/@atandraenergy5633"
                icon={<FaYoutube className="h-5 w-5 text-white" />}
                label="YouTube"
                color="bg-[#FF0000] hover:bg-[#CC0000]"
              />
              <SocialButton
                href="https://www.instagram.com/atandraenergy"
                icon={<FaInstagram className="h-5 w-5 text-white" />}
                label="Instagram"
                color="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img
                src="/unnamed.png"
                alt="Atandra Energy"
                className="h-9 w-auto object-contain opacity-90"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
              <span className="text-base text-white font-['Open_Sans']">
                Powered by <a href="https://atandra.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold">Atandra Energy Pvt. Ltd.</a>
              </span>
            </div>

            <div className="text-base text-white text-center md:text-right font-['Open_Sans']">
              <p>© {currentYear} <strong className="text-white">KRYKARD</strong>. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;