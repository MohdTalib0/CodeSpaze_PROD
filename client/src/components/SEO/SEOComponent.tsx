import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOComponentProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  location?: string;
  programType?: string;
  isLocal?: boolean;
}

const SEOComponent: React.FC<SEOComponentProps> = ({
  title,
  description,
  keywords = '',
  canonicalUrl = 'https://codespaze.org',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  structuredData,
  location = 'Lucknow',
  programType = 'Tech Program',
  isLocal = false
}) => {
  // Generate location-specific keywords
  const localKeywords = isLocal ? [
    `best ${programType.toLowerCase()} in ${location}`,
    `${programType.toLowerCase()} in ${location}`,
    `top ${programType.toLowerCase()} in ${location}`,
    `${location} ${programType.toLowerCase()}`,
    `${location} tech programs`,
    `${location} coding bootcamp`,
    `${location} software development`,
    `${location} AI/ML programs`,
    `${location} web development`,
    `${location} app development`,
    `${location} data science`,
    `${location} cybersecurity`,
    `${location} cloud computing`,
    `${location} blockchain`,
    `${location} game development`,
    `${location} UI/UX design`,
    `${location} graphic design`,
    `${location} digital marketing`,
    `${location} content writing`,
    `${location} SEO training`
  ].join(', ') : '';

  // Combine keywords
  const allKeywords = [
    keywords,
    localKeywords,
    'tech learning',
    'programming',
    'AI/ML',
    'career development',
    'coding bootcamp',
    'software development',
    'tech internship',
    'software internship',
    'AI internship',
    'machine learning internship',
    'web development internship',
    'app development internship',
    'global tech programs',
    'international internships',
    'remote tech opportunities',
    'coding fellowship',
    'tech accelerator',
    'summer tech program',
    'winter tech program',
    'computer science internship',
    'engineering internship',
    'IT internship',
    'digital marketing internship',
    'data science internship',
    'cloud computing internship',
    'cybersecurity internship',
    'blockchain internship',
    'game development internship',
    'UI/UX design internship',
    'graphic design internship',
    'content writing internship',
    'SEO internship',
    'mobile development internship',
    'DevOps internship',
    'full stack development internship',
    'Python internship',
    'React internship',
    'JavaScript internship',
    'Java internship',
    'C++ internship',
    'Node.js internship',
    'MongoDB internship',
    'SQL internship',
    'AWS internship',
    'Azure internship',
    'Google Cloud internship',
    'startup internship',
    'fintech internship',
    'edtech internship',
    'healthtech internship',
    'ecommerce internship',
    'SaaS internship',
    'B2B internship',
    'B2C internship',
    'product management internship',
    'project management internship',
    'business development internship',
    'sales internship',
    'marketing internship',
    'customer success internship',
    'operations internship',
    'finance internship',
    'HR internship',
    'legal internship',
    'research internship',
    'academic internship',
    'university internship',
    'college internship',
    'student internship',
    'graduate internship',
    'postgraduate internship',
    'PhD internship',
    'master\'s internship',
    'bachelor\'s internship',
    'diploma internship',
    'certificate internship',
    'online internship',
    'virtual internship',
    'hybrid internship',
    'part-time internship',
    'full-time internship',
    'paid internship',
    'unpaid internship',
    'stipend internship',
    'competitive internship',
    'selective internship',
    'prestigious internship',
    'top internship',
    'leading internship',
    'innovative internship',
    'cutting-edge internship',
    'future-focused internship',
    'industry-relevant internship',
    'practical internship',
    'hands-on internship',
    'project-based internship',
    'real-world internship',
    'professional internship',
    'career-focused internship',
    'skill-building internship',
    'knowledge-enhancing internship',
    'experience-gaining internship',
    'networking internship',
    'mentorship internship',
    'guidance internship',
    'support internship',
    'community internship',
    'collaborative internship',
    'team internship',
    'individual internship',
    'creative internship',
    'analytical internship',
    'technical internship',
    'business internship',
    'design internship',
    'development internship',
    'engineering internship',
    'science internship',
    'mathematics internship',
    'statistics internship',
    'economics internship',
    'finance internship',
    'accounting internship',
    'management internship',
    'leadership internship',
    'entrepreneurship internship',
    'innovation internship',
    'research internship',
    'analysis internship',
    'strategy internship',
    'planning internship',
    'execution internship',
    'implementation internship',
    'testing internship',
    'quality assurance internship',
    'user experience internship',
    'customer experience internship',
    'product internship',
    'service internship',
    'solution internship',
    'platform internship',
    'application internship',
    'system internship',
    'infrastructure internship',
    'architecture internship',
    'testing internship',
    'deployment internship',
    'maintenance internship',
    'support internship',
    'training internship',
    'education internship',
    'learning internship',
    'teaching internship',
    'coaching internship',
    'mentoring internship',
    'consulting internship',
    'advisory internship',
    'strategic internship',
    'tactical internship',
    'operational internship',
    'administrative internship',
    'executive internship',
    'senior internship',
    'junior internship',
    'entry-level internship',
    'experienced internship',
    'skilled internship',
    'qualified internship',
    'certified internship',
    'accredited internship',
    'recognized internship',
    'established internship',
    'reputable internship',
    'trusted internship',
    'reliable internship'
  ].filter(Boolean).join(', ');

  // Default structured data if none provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "CodeSpaze",
    "description": description,
    "url": canonicalUrl,
    "logo": "https://codespaze.org/logo.png",
    "sameAs": [
      "https://twitter.com/codespaze",
      "https://linkedin.com/company/codespaze",
      "https://instagram.com/codespaze"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressRegion": location === 'Lucknow' ? 'Uttar Pradesh' : 'India',
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
      "description": `${programType} - ${description}`,
      "category": "Educational Services"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="theme-color" content="#19c973" />
      
      {/* Local SEO */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content={`${location}, India`} />
      <meta name="geo.position" content="26.8467;80.9462" />
      <meta name="ICBM" content="26.8467, 80.9462" />
      
      {/* Global SEO */}
      <meta name="country" content="India" />
      <meta name="region" content="Asia" />
      <meta name="continent" content="Asia" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="CodeSpaze - Tech Learning Platform" />
      <meta property="og:site_name" content="CodeSpaze" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="hi_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
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
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOComponent;
