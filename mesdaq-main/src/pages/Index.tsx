import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AnalyzeSection from "@/components/AnalyzeSection";
import ResultsSection from "@/components/ResultsSection";
import TeamSection from "@/components/TeamSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <>
      <Helmet>
        <title>Mesdaq AI - Arabic Fake News Detection Platform</title>
        <meta
          name="description"
          content="Mesdaq AI uses advanced NLP, Transformers, and LLMs to detect fake Arabic news and provide AI-powered explanations with credibility scores."
        />
        <meta
          name="keywords"
          content="Arabic fake news detection, AI news verification, misinformation detection, NLP, Transformers, LLM, Arabic NLP"
        />
        <link rel="canonical" href="https://mesdaq.ai" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <AnalyzeSection onAnalysisComplete={setAnalysisResult} />
          {analysisResult && <ResultsSection result={analysisResult} />}
          <TeamSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
