import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABanner from './home/CTABanner';

interface PageContainerProps {
  children: React.ReactNode;
  showCta?: boolean;
}

export default function PageContainer({
  children,
  showCta = true,
}: PageContainerProps) {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--ink)] flex flex-col transition-colors selection:bg-[var(--accent)] selection:text-white">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      {showCta && <CTABanner />}
      <Footer />
    </div>
  );
}
