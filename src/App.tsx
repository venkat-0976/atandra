import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Router } from "./components/Router";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop"; // Import the ScrollToTop component
import EventPopup from "./components/EventPopup";



// Admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import PopupManager from "./pages/admin/PopupManager";
import UserSubmissions from "./pages/admin/UserSubmissions";
import CreateAdmin from "./pages/admin/CreateAdmin";
import ContactSubmissions from "./pages/admin/ContactSubmissions";
import TestFirestore from "./pages/admin/TestFirestore";
import DiagnosticPage from "./pages/admin/DiagnosticPage";
import ChatDetails from "./pages/admin/ChatDetails";
import TestPopupData from "./components/TestPopupData";
import FAQManager from "./pages/admin/FAQManager";

// Main category pages
// import Measure from "./pages/Measure";
// import Protect from "./pages/Protect";
// import Conserve from "./pages/Conserve";
// import Contact from "./pages/Contact";

// Contact subpages
import Sales from "./pages/contact/Sales";
import Service from "./pages/contact/Service";


// Measure subpages
import InsulationTesters from "./pages/measure/InsulationTesters";
import Oscilloscopes from "./pages/measure/Oscilloscopes";
import EarthLoopTesters from "./pages/measure/EarthLoopTester";
import DigitalMultimeters from "./pages/measure/Multimeters";
import ClampMeters from "./pages/measure/clampmeters";
import EarthTesters from "./pages/measure/EarthTesters";
import MicroOhmmeters from "./pages/measure/MicroOhmmeters";
import MultiFunctionalMeters from "./pages/measure/MultiFunctionalMeters";
import ThermalImagers from "./pages/measure/ThermalImagers";
import InstallationTesters from "./pages/measure/InstallationTesters";

import ThermalImagersSpecification from "./pages/measure/productpages/ThermalImagersSpecification";
import ThermalImagerProduct from "./pages/measure/productpages/ThermalImagerProduct";
import MicroOhmMeterProduct from "./pages/measure/productpages/MicroOhmMeterproduct";
import PowerQualityAnalyzerProduct from "./pages/measure/productpages/PowerQualityAnalyzerProduct";
import PowerQualityAnalyzersProducts from "./pages/measure/powerquality";
import ClampMeterProduct from "./pages/measure/productpages/ClampMeterProduct";
import EarthLoopTesterProduct from "./pages/measure/productpages/EarthLoopTesterProduct";
import InstallationTesterProduct from "./pages/measure/productpages/InstallationTesterProduct";
import InsulationTesterProduct from "./pages/measure/productpages/InsulationTesterProduct";
import EarthTesterProduct from "./pages/measure/productpages/EarthTesterProduct";


import MultimeterProduct from "./pages/measure/productpages/MultimeterProduct";
import MultiFunctionalMeterProduct from "./pages/measure/productpages/MultiFunctionalMeterProduct";
import OscilloscopeProduct from "./pages/measure/productpages/OscilloscopeProduct";


// Protect subpages
import UPS from "./pages/protect/UPS";
import ServoStabilizers from "./pages/protect/ServoStabilizers";
import StaticStabilizers from "./pages/protect/StaticStabilizers";
import IsolationTransformers from "./pages/protect/IsolationTransformers";
import IsolationTransformersProduct from "./pages/protect/productpages/isolationtransformersproduct";
import VoltageRegulatorProduct from "./pages/protect/productpages/Staticstabilizersproduct";
// Servo Stabilizer Product Pages - Individual components
import SinglePhaseStabilizer from "./pages/protect/productpages/Servostabilizersphase1";
import ThreePhaseStabilizer from "./pages/protect/productpages/Servostabilizers3phase";

// Conserve subpages
import OnPremiseSystems from "./pages/conserve/OnPremiseSystems";
import SmartFactorySolution from "./pages/conserve/SmartFactorySolution";
import LightingEnergySaver from "./pages/conserve/LightingEnergySaver";
import EnergyAudits from "./pages/conserve/EnergyAudits";


// About subpages
import Company from "./pages/about/Company";
import Certificates from "./pages/about/Certificates";
import Events from "./pages/about/events";
import OurLeadership from "./pages/about/OurLeadership";
import Careers from "./pages/about/Careers";
import FAQs from "./pages/FAQs";
import Blogs from "@/pages/Blogs";

// UPS Product Pages - Individual components
import ELBSeriesUPS from "./pages/protect/productpages/EL/ELBSeriesUPS";
import EH11SeriesUPS from "./pages/protect/productpages/EH11SeriesUPS";
import EH31SeriesUPS from "./pages/protect/productpages/EH31SeriesUPS";
import EH33SmallSeriesUPS from "./pages/protect/productpages/EH33SmallSeriesUPS";
import EH33LargeSeriesUPS from "./pages/protect/productpages/EH33LargeSeriesUPS";
import SXSeriesUPS from "./pages/protect/productpages/SXSeriesUPS";
import HXSeriesUPS from "./pages/protect/productpages/HXSeriesUPS";

// // UPS Series Overview Pages
// import ELSeriesOverview from "./pages/protect/productpages/overview/ELSeriesOverview"; // EL/ELB Series Overview
// import EH11SeriesOverview from "./pages/protect/productpages/overview/EH11SeriesOverview"; // EH 11 Series Overview
// import EH31SeriesOverview from "./pages/protect/productpages/overview/EH31SeriesOverview"; // EH 31 Series Overview
// import EH33SmallSeriesOverview from "./pages/protect/productpages/overview/EH33SmallSeriesOverview"; // EH 33 Small Series Overview
// import EH33LargeSeriesOverview from "./pages/protect/productpages/overview/EH33LargeSeriesOverview"; // EH 33 Large Series Overview
// import SXSeriesOverview from "./pages/protect/productpages/overview/SXSeriesOverview"; // SX Series Overview
// import HXSeriesOverview from "./pages/protect/productpages/overview/HXSeriesOverview"; // HX Series Overview
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import TestPage from "./pages/TestPage";
import MinimalIndex from "./pages/MinimalIndex";
import SimpleIndex from "./pages/SimpleIndex";
import NewLandingPage from "./pages/NewLandingPage";

const queryClient = new QueryClient();

// Component to strip tracking parameters from URL
const TrackingParameterRemover = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const hasTrackingParams = url.searchParams.has('trk') ||
      url.searchParams.has('utm_source') ||
      url.searchParams.has('utm_medium') ||
      url.searchParams.has('utm_campaign') ||
      url.searchParams.has('fbclid') ||
      url.searchParams.has('gclid');

    if (hasTrackingParams) {
      // Remove tracking parameters
      url.searchParams.delete('trk');
      url.searchParams.delete('utm_source');
      url.searchParams.delete('utm_medium');
      url.searchParams.delete('utm_campaign');
      url.searchParams.delete('fbclid');
      url.searchParams.delete('gclid');

      // Update URL without page reload
      const newUrl = url.pathname + (url.search ? url.search : '') + url.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, [location]);

  return null;
};


interface AppProps {
  location?: string;
}

// Debug component to track route matching
const RouteDebugger = () => {
  const location = useLocation();
  const isSSR = typeof window === 'undefined';

  if (isSSR) {
    console.log(`[RouteDebugger] Current pathname: ${location.pathname}`);
    console.log(`[RouteDebugger] Current search: ${location.search}`);
    console.log(`[RouteDebugger] Current hash: ${location.hash}`);
    console.log(`[RouteDebugger] Current state:`, location.state);
  }

  return null;
};

// Enhanced SSR Route Matcher - verifies routes are matching correctly
const SSRRouteMatcher = () => {
  const location = useLocation();
  const isSSR = typeof window === 'undefined';

  // Log during render (not useEffect) so it works during SSR
  if (isSSR) {
    console.log(`[SSRRouteMatcher] ✅ Route context available - pathname: ${location.pathname}`);
    console.log(`[SSRRouteMatcher] ✅ This means Routes component should be able to match routes`);
  }

  return null;
};

const App = ({ location }: AppProps = {}) => {
  const isSSR = typeof window === 'undefined'
  console.log('🎯 App component rendering...', { location, isSSR });

  // Debug: Log which route will be matched during SSR
  if (isSSR && location) {
    console.log(`[App SSR] Attempting to match route: ${location}`)
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router location={location}>
            <ScrollToTop /> {/* Add ScrollToTop component here */}
            <TrackingParameterRemover /> {/* Remove tracking parameters */}
            <RouteDebugger /> {/* Debug route matching */}
            <EventPopup />
            <SSRRouteMatcher /> {/* Verify route matching during SSR */}
            <AuthProvider>

              <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/old" element={<Index />} />
                <Route path="/simple" element={<SimpleIndex />} />
                <Route path="/minimal" element={<MinimalIndex />} />
                <Route path="/test" element={<TestPage />} />
                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/create" element={<CreateAdmin />} />
                <Route path="/admin/test-firestore" element={<TestFirestore />} />
                <Route path="/admin/diagnostic" element={<DiagnosticPage />} />
                <Route path="/admin/test-popup" element={<TestPopupData />} />
                <Route path="/admin" element={<Dashboard />}>
                  <Route path="dashboard" element={<PopupManager />} />
                  <Route path="popups" element={<PopupManager />} />
                  <Route path="users" element={<UserSubmissions />} />
                  <Route path="contacts" element={<ContactSubmissions />} />
                  <Route path="faqs" element={<FAQManager />} />
                  <Route path="chat/:id" element={<ChatDetails />} />
                </Route>

                {/* Main category pages */}


                {/* Contact subpages */}
                <Route path="/contact/sales" element={<Sales />} />
                <Route path="/contact/service" element={<Service />} />
                {/* Removed UI navigation to /contact/service; keep route optional for backward compatibility */}


                {/* Redirect old URLs to correct ones - prevents 404s and canonicalized pages */}
                {/* IMPORTANT: These must come BEFORE main routes to ensure they match first */}
                <Route path="/protect/productpages/SinglePhaseStabilizer" element={<Navigate to="/protect/servo-stabilizers/product/single-phase-servo-stabilizer" replace />} />
                <Route path="/protect/productpages/ThreePhaseStabilizer" element={<Navigate to="/protect/servo-stabilizers/product/three-phase-servo-stabilizer" replace />} />
                <Route path="/protect/ups/eh-33-small-series" element={<Navigate to="/protect/ups/product/eh-33-small-series" replace />} />
                <Route path="/protect/ups/eh-11-series" element={<Navigate to="/protect/ups/product/eh-11-series" replace />} />
                <Route path="/protect/ups/el-series" element={<Navigate to="/protect/ups/product/el-series" replace />} />
                <Route path="/protect/ups/hx-series" element={<Navigate to="/protect/ups/product/hx-series" replace />} />
                <Route path="/protect/ups/eh-33-large-series" element={<Navigate to="/protect/ups/product/eh-33-large-series" replace />} />
                <Route path="/protect/ups/sx-series" element={<Navigate to="/protect/ups/product/sx-series" replace />} />
                <Route path="/protect/ups/eh-31-series" element={<Navigate to="/protect/ups/product/eh-31-series" replace />} />
                <Route path="/measure/micro-ohmmeters/product/ca6240" element={<Navigate to="/measure/micro-ohmmeters/ca6240" replace />} />
                <Route path="/measure/micro-ohmmeters/product/ca6255" element={<Navigate to="/measure/micro-ohmmeters/ca6255" replace />} />
                <Route path="/measure/micro-ohmmeters/product/ca6292" element={<Navigate to="/measure/micro-ohmmeters/ca6292" replace />} />
                <Route path="/measure/clampmeters/product/harmonics" element={<Navigate to="/measure/clamp-meters" replace />} />
                <Route path="/measure/clampmeters/product/power" element={<Navigate to="/measure/clamp-meters" replace />} />
                <Route path="/measure/clampmeters/product/solar" element={<Navigate to="/measure/clamp-meters" replace />} />
                <Route path="/measure/insulation-testers/product/1" element={<Navigate to="/measure/insulation-testers/product/ca6522-ca6528" replace />} />
                <Route path="/measure/insulation-testers/product/2" element={<Navigate to="/measure/insulation-testers/product/ca6524-ca6526" replace />} />
                <Route path="/measure/insulation-testers/product/3" element={<Navigate to="/measure/insulation-testers/product/ca6532-ca6534-ca6536" replace />} />
                <Route path="/measure/insulation-testers/product/4" element={<Navigate to="/measure/insulation-testers/product/ca6505-ca6545" replace />} />
                <Route path="/measure/insulation-testers/product/5" element={<Navigate to="/measure/insulation-testers/product/ca6547-ca6549" replace />} />
                <Route path="/measure/insulation-testers/product/6" element={<Navigate to="/measure/insulation-testers/product/ca6550-ca6555" replace />} />
                <Route path="/protect/static-stabilizers/product" element={<Navigate to="/protect/static-stabilizers" replace />} />
                <Route path="/protect/isolation-transformers/auto-transformer" element={<Navigate to="/protect/isolation-transformers/product/auto-isolation-transformer" replace />} />
                <Route path="/measure/earth-loop-testers/product/CA-6417" element={<Navigate to="/measure/earth-loop-testers/product/ca6417" replace />} />
                <Route path="/measure/earth-loop-testers/product/CA-6418" element={<Navigate to="/measure/earth-loop-testers/product/ca6418" replace />} />
                {/* <Route path="/contact" element={<Navigate to="/contact/sales" replace />} /> */}
                {/* Measure subpages */}

                <Route path="/measure/power-quality-analyzers" element={<PowerQualityAnalyzersProducts />} />








                {/* Measure subpages */}
                <Route path="/measure/power-quality-analyzers" element={<PowerQualityAnalyzersProducts />} />
                <Route path="/measure/thermal-imagers" element={<ThermalImagers />} />
                <Route path="/measure/thermal-imagers/product/:productId" element={<ThermalImagerProduct />} />
                <Route path="/measure/insulation-testers" element={<InsulationTesters />} />
                <Route path="/measure/insulation-testers/product/:productId" element={<InsulationTesterProduct />} />
                <Route path="/measure/earth-loop-testers" element={<EarthLoopTesters />} />
                <Route path="/measure/digital-multimeters" element={<DigitalMultimeters />} />
                <Route path="/measure/digital-multimeters/product/:productId" element={<MultimeterProduct />} />
                <Route path="/measure/clamp-meters" element={<ClampMeters />} />
                <Route path="/measure/earth-testers" element={<EarthTesters />} />
                <Route path="/measure/earth-testers/product/:productId" element={<EarthTesterProduct />} />
                <Route path="/measure/micro-ohmmeters" element={<MicroOhmmeters />} />
                <Route path="/measure/micro-ohmmeters/:productId" element={<MicroOhmMeterProduct />} />
                <Route path="/measure/multi-functional-meters" element={<MultiFunctionalMeters />} />
                <Route path="/measure/multi-functional-meters/product/:productId" element={<MultiFunctionalMeterProduct />} />
                <Route path="/measure/installation-testers" element={<InstallationTesters />} />
                <Route path="/measure/oscilloscopes" element={<Oscilloscopes />} />
                <Route path="/measure/oscilloscopes/product/:productId" element={<OscilloscopeProduct />} />
                <Route path="/measure/clamp-meters/product/:productId" element={<ClampMeterProduct />} />
                <Route path="/measure/earth-loop-testers/product/:productId" element={<EarthLoopTesterProduct />} />
                <Route path="/measure/installation-testers/product/:productId" element={<InstallationTesterProduct />} />



                <Route path="/measure/productpages/thermal-imagers/specification" element={<ThermalImagersSpecification />} />
                <Route path="/measure/power-quality-analyzers/product/:productId" element={<PowerQualityAnalyzerProduct />} />

                {/* Protect subpages */}
                <Route path="/protect/ups" element={<UPS />} />
                <Route path="/protect/servo-stabilizers" element={<ServoStabilizers />} />
                {/* Servo Stabilizer Product Pages - Direct routing */}
                <Route path="/protect/servo-stabilizers/product/single-phase-servo-stabilizer" element={<SinglePhaseStabilizer />} />
                <Route path="/protect/servo-stabilizers/product/three-phase-servo-stabilizer" element={<ThreePhaseStabilizer />} />
                <Route path="/protect/static-stabilizers" element={<StaticStabilizers />} />
                <Route path="/protect/static-stabilizers/product/static-voltage-stabilizer" element={<VoltageRegulatorProduct />} />
                <Route path="/protect/static-stabilizers/product/three-phase-static-voltage-regulator" element={<VoltageRegulatorProduct />} />
                <Route path="/protect/isolation-transformers/product/auto-isolation-transformer" element={<IsolationTransformersProduct />} />
                <Route path="/protect/isolation-transformers" element={<IsolationTransformers />} />

                {/* UPS Product Pages - Direct routing */}
                <Route path="/protect/ups/product/el-series" element={<ELBSeriesUPS />} />
                <Route path="/protect/ups/product/eh-11-series" element={<EH11SeriesUPS />} />
                <Route path="/protect/ups/product/eh-31-series" element={<EH31SeriesUPS />} />
                <Route path="/protect/ups/product/eh-33-small-series" element={<EH33SmallSeriesUPS />} />
                <Route path="/protect/ups/product/eh-33-large-series" element={<EH33LargeSeriesUPS />} />
                <Route path="/protect/ups/product/sx-series" element={<SXSeriesUPS />} />
                <Route path="/protect/ups/product/hx-series" element={<HXSeriesUPS />} />

                {/* UPS Series Overview Pages */}
                {/* <Route path="/protect/ups/el-series/overview" element={<ELSeriesOverview />} />
            <Route path="/protect/ups/eh-11-series/overview" element={<EH11SeriesOverview />} />
            <Route path="/protect/ups/eh-31-series/overview" element={<EH31SeriesOverview />} />
            <Route path="/protect/ups/eh-33-small-series/overview" element={<EH33SmallSeriesOverview />} />
            <Route path="/protect/ups/eh-33-large-series/overview" element={<EH33LargeSeriesOverview />} />
            <Route path="/protect/ups/sx-series/overview" element={<SXSeriesOverview />} />
            <Route path="/protect/ups/hx-series/overview" element={<HXSeriesOverview />} /> */}

                {/* Conserve subpages */}
                <Route path="/conserve/on-premise-systems" element={<OnPremiseSystems />} />
                <Route path="/conserve/smart-factory-solution" element={<SmartFactorySolution />} />
                <Route path="/conserve/tenant-billing-solution" element={<LightingEnergySaver />} />
                <Route path="/conserve/enterprise-esg-reporting" element={<EnergyAudits />} />

                {/* About subpages */}
                <Route path="/about/company" element={<Company />} />
                <Route path="/about/certificates" element={<Certificates />} />
                {/* <Route path="/about/sustainability" element={<Sustainability />} /> */}
                <Route path="/about/events" element={<Events />} />
                <Route path="/about/vision-mission" element={<Company />} />
                <Route path="/about/our-leadership" element={<OurLeadership />} />
                <Route path="/about/careers" element={<Careers />} />
                <Route path="/careers" element={<Navigate to="/about/careers" replace />} />

                {/* FAQ Page */}
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/faqs/:category" element={<FAQs />} />
                {/* Blogs Page */}
                <Route path="/blogs" element={<Blogs />} />


                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>

            </AuthProvider>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;