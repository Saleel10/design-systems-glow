import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
}

const SEO = ({ 
  title = "Saleeldesigns | Creative & UI/UX Designer", 
  description = "Creative Designer & UI/UX Designer with 5+ years experience building structured digital experiences.", 
  image = "https://saleeldesigns.com/hero-portrait.webp", 
  url = "https://saleeldesigns.com",
  keywords = "Freelance UI/UX Designer India, Creative Designer, Digital Product Designer, Branding Expert, Web Designer, App Designer, SaaS UI Designer, Design Systems, Visual Designer, User Experience Design, User Interface Design, Figma Expert, Website Redesign, Packaging Design, Saleel"
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
