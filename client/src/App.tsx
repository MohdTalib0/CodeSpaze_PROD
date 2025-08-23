import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './context/AuthContext';

// Layout Components
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminRoute from './components/Auth/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import ProgramsPage from './pages/ProgramsPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Product Pages
import FundalyticsAIPage from './pages/Products/FundalyticsAIPage';
import InvestLocalPage from './pages/Products/InvestLocalPage';
import AIAssistantBuilderPage from './pages/Products/AIAssistantBuilderPage';
import StackSagePage from './pages/Products/StackSagePage';
import CollabXNationPage from './pages/Products/CollabXNationPage';
import AutoServeHubPage from './pages/Products/AutoServeHubPage';

// Program Pages
import InternshipProgramPage from './pages/Programs/InternshipProgramPage';
import FellowshipProgramPage from './pages/Programs/FellowshipProgramPage';
import SummerTechAcceleratorPage from './pages/Programs/SummerTechAcceleratorPage';
import WinterTechAcceleratorPage from './pages/Programs/WinterTechAcceleratorPage';
import InternationalProgramsPage from './pages/Programs/InternationalProgramsPage';

// Enrollment Form
import EnrollmentForm from './components/EnrollmentForm';

// Contact Page
import ContactPage from './pages/ContactPage';

function App() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  // Listen for auth logout events from API service
  useEffect(() => {
    const handleAuthLogout = (event: CustomEvent) => {
      const { redirectTo } = event.detail;
      // Clear auth state and navigate using React Router
      logout();
      navigate(redirectTo);
    };

    window.addEventListener('auth:logout', handleAuthLogout as EventListener);
    
    return () => {
      window.removeEventListener('auth:logout', handleAuthLogout as EventListener);
    };
  }, [logout, navigate]);

  return (
    <>
      <Helmet>
        <title>CodeSpaze – Global Tech Learning & Career Platform | Best Internships & Tech Programs</title>
        <meta name="description" content="Transform your tech career with CodeSpaze. Join our global community of learners and build your future in technology with our comprehensive programs and mentorship. Best internships in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and worldwide." />
        <meta name="keywords" content="tech learning, programming, AI/ML, career development, coding bootcamp, software development, best internship in Lucknow, best internship in Delhi, best internship in Mumbai, best internship in Bangalore, best internship in Hyderabad, best internship in Chennai, best internship in Pune, best internship in Kolkata, tech internship, software internship, AI internship, machine learning internship, web development internship, app development internship, global tech programs, international internships, remote tech opportunities, coding fellowship, tech accelerator, summer tech program, winter tech program, computer science internship, engineering internship, IT internship, digital marketing internship, data science internship, cloud computing internship, cybersecurity internship, blockchain internship, game development internship, UI/UX design internship, graphic design internship, content writing internship, SEO internship, mobile development internship, DevOps internship, full stack development internship, Python internship, React internship, JavaScript internship, Java internship, C++ internship, Node.js internship, MongoDB internship, SQL internship, AWS internship, Azure internship, Google Cloud internship, startup internship, fintech internship, edtech internship, healthtech internship, ecommerce internship, SaaS internship, B2B internship, B2C internship, product management internship, project management internship, business development internship, sales internship, marketing internship, customer success internship, operations internship, finance internship, HR internship, legal internship, research internship, academic internship, university internship, college internship, student internship, graduate internship, postgraduate internship, PhD internship, master's internship, bachelor's internship, diploma internship, certificate internship, online internship, virtual internship, hybrid internship, part-time internship, full-time internship, paid internship, unpaid internship, stipend internship, competitive internship, selective internship, prestigious internship, top internship, leading internship, innovative internship, cutting-edge internship, future-focused internship, industry-relevant internship, practical internship, hands-on internship, project-based internship, real-world internship, professional internship, career-focused internship, skill-building internship, knowledge-enhancing internship, experience-gaining internship, networking internship, mentorship internship, guidance internship, support internship, community internship, collaborative internship, team internship, individual internship, creative internship, analytical internship, technical internship, business internship, creative internship, design internship, development internship, engineering internship, science internship, mathematics internship, statistics internship, economics internship, finance internship, accounting internship, management internship, leadership internship, entrepreneurship internship, innovation internship, research internship, analysis internship, strategy internship, planning internship, execution internship, implementation internship, testing internship, quality assurance internship, user experience internship, customer experience internship, product internship, service internship, solution internship, platform internship, application internship, system internship, infrastructure internship, architecture internship, design internship, development internship, testing internship, deployment internship, maintenance internship, support internship, training internship, education internship, learning internship, teaching internship, coaching internship, mentoring internship, consulting internship, advisory internship, strategic internship, tactical internship, operational internship, administrative internship, executive internship, senior internship, junior internship, entry-level internship, experienced internship, skilled internship, qualified internship, certified internship, accredited internship, recognized internship, established internship, reputable internship, trusted internship, reliable internship" />
        <meta name="author" content="CodeSpaze Team" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="theme-color" content="#19c973" />
        
        {/* Local SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Lucknow, Uttar Pradesh, India" />
        <meta name="geo.position" content="26.8467;80.9462" />
        <meta name="ICBM" content="26.8467, 80.9462" />
        
        {/* Global SEO */}
        <meta name="country" content="India" />
        <meta name="region" content="Asia" />
        <meta name="continent" content="Asia" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codespaze.org" />
        <meta property="og:title" content="CodeSpaze – Global Tech Learning & Career Platform | Best Internships & Tech Programs" />
        <meta property="og:description" content="Transform your tech career with CodeSpaze. Join our global community of learners and build your future in technology with our comprehensive programs and mentorship. Best internships in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and worldwide." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="CodeSpaze - Tech Learning Platform" />
        <meta property="og:site_name" content="CodeSpaze" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="hi_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://codespaze.org" />
        <meta name="twitter:title" content="CodeSpaze – Global Tech Learning & Career Platform | Best Internships & Tech Programs" />
        <meta name="twitter:description" content="Transform your tech career with CodeSpaze. Join our global community of learners and build your future in technology with our comprehensive programs and mentorship. Best internships in Lucknow, Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and worldwide." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:site" content="@codespaze" />
        <meta name="twitter:creator" content="@codespaze" />
        
        {/* Additional SEO */}
        <meta name="application-name" content="CodeSpaze" />
        <meta name="apple-mobile-web-app-title" content="CodeSpaze" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://codespaze.org" />
        
        {/* Favicon and Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Structured Data for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "CodeSpaze",
            "description": "Global Tech Learning & Career Platform offering internships, fellowships, and tech programs",
            "url": "https://codespaze.org",
            "logo": "https://codespaze.org/logo.png",
            "sameAs": [
              "https://twitter.com/codespaze",
              "https://linkedin.com/company/codespaze",
              "https://instagram.com/codespaze"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lucknow",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service",
              "email": "info@codespaze.org"
            },
            "offers": {
              "@type": "Offer",
              "description": "Tech Internships, Fellowships, and Accelerator Programs",
              "category": "Educational Services"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-dark-950 relative overflow-hidden">
        {/* Main Content */}
        <div className="relative z-10">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            
            <Route path="/programs" element={
              <Layout>
                <ProgramsPage />
              </Layout>
            } />
            
            {/* Program Detail Routes */}
            <Route path="/programs/internship" element={
              <Layout>
                <InternshipProgramPage />
              </Layout>
            } />
            
            <Route path="/programs/fellowship" element={
              <Layout>
                <FellowshipProgramPage />
              </Layout>
            } />
            
            <Route path="/programs/summer" element={
              <Layout>
                <SummerTechAcceleratorPage />
              </Layout>
            } />
            
            <Route path="/programs/winter" element={
              <Layout>
                <WinterTechAcceleratorPage />
              </Layout>
            } />
            
            <Route path="/programs/international" element={
              <Layout>
                <InternationalProgramsPage />
              </Layout>
            } />
            
            <Route path="/products" element={
              <Layout>
                <ProductsPage />
              </Layout>
            } />
            
            {/* Product Detail Routes */}
            <Route path="/products/fundalytics" element={
              <Layout>
                <FundalyticsAIPage />
              </Layout>
            } />
            
            <Route path="/products/investlocal" element={
              <Layout>
                <InvestLocalPage />
              </Layout>
            } />
            
            <Route path="/products/ai-builder" element={
              <Layout>
                <AIAssistantBuilderPage />
              </Layout>
            } />
            
            <Route path="/products/stacksage" element={
              <Layout>
                <StackSagePage />
              </Layout>
            } />
            
            <Route path="/products/collabxnation" element={
              <Layout>
                <CollabXNationPage />
              </Layout>
            } />
            
            <Route path="/products/autoservehub" element={
              <Layout>
                <AutoServeHubPage />
              </Layout>
            } />
            
            <Route path="/services" element={
              <Layout>
                <ServicesPage />
              </Layout>
            } />
            
            <Route path="/enroll" element={
              <Layout>
                <EnrollmentForm />
              </Layout>
            } />
            
            <Route path="/login" element={
              <Layout>
                <LoginPage />
              </Layout>
            } />
            
            <Route path="/register" element={
              <Layout>
                <RegisterPage />
              </Layout>
            } />

            {/* Protected Routes */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <AdminRoute>
                <Layout>
                  <AdminDashboardPage />
                </Layout>
              </AdminRoute>
            } />

            {/* Contact Page */}
            <Route path="/contact" element={
              <Layout>
                <ContactPage />
              </Layout>
            } />

            {/* 404 Page */}
            <Route path="*" element={
              <Layout>
                <NotFoundPage />
              </Layout>
            } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
