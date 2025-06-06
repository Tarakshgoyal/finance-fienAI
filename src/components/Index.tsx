'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Shield, Target, ArrowRight, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FinancialForm from '@/components/FinancialForm';
import ReportDisplay from '@/components/ReportDisplay';

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [reportData, setReportData] = useState<FinancialFormData | null>(null);
  interface FinancialFormData {
  age: number;
  salary: number;
  city_index: number;
  assets: number;
  liabilities: number;
  loans: number;
  emi: number;
  responsibilities: number;
  savings: number;
  credit_score: number;
  investments: number;
  monthly_expenses: number;
  risk_tolerance: number;
  budget: boolean;
  insurance: string;
  expense_tracking: string;
  retirement: boolean;
  high_risk_percent: number;
  automate: boolean;
  defaulted: boolean;
  advisor: boolean;
  confidence: number;
  review_goals: boolean;
}

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (reportData) {
    return <ReportDisplay data={reportData} onBack={() => setReportData(null)} />;
  }

  if (showForm) {
    return <FinancialForm onSubmit={setReportData} onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f', color: '#ddf1a5' }}>
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <div className="flex justify-start">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] text-[#0f0f0f] px-6 py-2 rounded-full font-bold text-lg shadow-lg"
          >
            FeinAI
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-12"
      >
        <div className="text-center mb-16">
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-br from-[#ddf1a5] to-[#b8d977] p-4 rounded-2xl shadow-2xl">
                <BarChart3 size={48} className="text-[#0f0f0f]" />
              </div>
            </motion.div>
            
            <h1 className="text-6xl text-[#ddf16a5] md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#ddf1a5] via-[#c9e82] to-[#b8d977] bg-clip-text">
              Financial Health
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Analyzer
            </h2>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90"
          >
            Get a comprehensive analysis of your financial health with personalized recommendations, 
            risk assessment, and actionable insights powered by advanced algorithms.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] hover:from-[#c9e682] hover:to-[#a6c96a] text-[#0f0f0f] text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(221,241,165,0.3)]"
            >
              Start Analysis
              <ArrowRight className="ml-3" size={24} />
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {[
            {
              icon: Calculator,
              title: "Risk Assessment",
              description: "Advanced scoring algorithm with 9 key factors"
            },
            {
              icon: TrendingUp,
              title: "Investment Guidance",
              description: "Personalized portfolio allocation recommendations"
            },
            {
              icon: Shield,
              title: "Financial Security",
              description: "Emergency fund and insurance analysis"
            },
            {
              icon: Target,
              title: "Action Plan",
              description: "30-day roadmap for financial improvement"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 rounded-2xl border border-[#ddf1a5]/20 hover:border-[#ddf1a5]/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(221,241,165,0.2)]"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#ddf1a5] to-[#b8d977] p-3 rounded-xl inline-block mb-4"
              >
                <feature.icon size={32} className="text-[#0f0f0f]" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="opacity-80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={containerVariants}
          className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-12 border border-[#ddf1a5]/20"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12"
          >
            Comprehensive Analysis Features
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "9+", label: "Risk Factors Analyzed" },
              { number: "7", label: "Key Financial Ratios" },
              { number: "5", label: "Investment Profiles" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="p-6"
              >
                <div className="text-5xl text-[#ddf1a5] font-bold bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Take control of your financial future today
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="bg-[#ddf1a5] text-[#0f0f0f] text-lg px-8 py-4 rounded-xl transition-all duration-300"
            >
              Get Started Now
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-[#ddf1a5]/5 to-[#b8d977]/5 rounded-full"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
