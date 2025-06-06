
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, AlertTriangle, Target, Shield, Zap } from 'lucide-react';

interface ReportData {
  age: number;
  salary: number;
  city_index: number;
  assets: number;
  liabilities: number;
  emi: number;
  savings: number;
  monthly_expenses: number;
  defaulted: boolean;
  credit_score: number;
  investments: number;
  budget: boolean;
  retirement: boolean;
  automate: boolean;
  confidence: number;
  review_goals: boolean;
  insurance: string;
  risk_tolerance: number;
}

interface ReportDisplayProps {
  data: ReportData;
  onBack: () => void;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ data, onBack }) => {
  // Financial calculations based on your Python backend logic
  const calculateRiskScore = (data: ReportData) => {
    const ageFactor = data.age < 25 ? 0.9 : data.age < 35 ? 0.8 : data.age < 45 ? 0.6 : data.age < 55 ? 0.4 : 0.2;
    const incomeStability = Math.min(1.0, (data.salary / (data.city_index * 100000)) / 10);
    const netWorthRatio = Math.min(1.0, Math.max(0, (data.assets - data.liabilities) / data.salary / 5));
    const debtBurden = Math.min(1.0, (data.emi + data.liabilities * 0.1) / data.salary);
    const liquidityScore = Math.min(1.0, data.savings / data.monthly_expenses / 6);
    const creditHealth = data.defaulted ? 0.3 : data.credit_score >= 750 ? 1.0 : data.credit_score >= 650 ? 0.7 : data.credit_score >= 550 ? 0.4 : 0.1;
    const investmentMaturity = data.assets > 0 ? Math.min(1.0, data.investments / data.assets) : 0;
    
    const behavioralScore = [
      data.budget, data.retirement, data.automate, !data.defaulted,
      data.confidence >= 7, data.review_goals, data.insurance !== 'None'
    ].filter(Boolean).length / 7;

    const riskScore = (
      ageFactor * 0.15 +
      incomeStability * 0.20 +
      netWorthRatio * 0.15 +
      (1 - debtBurden) * 0.20 +
      liquidityScore * 0.10 +
      creditHealth * 0.10 +
      investmentMaturity * 0.05 +
      behavioralScore * 0.05 +
      data.risk_tolerance * 0.1
    ) * 100;

    return Math.max(0, Math.min(100, riskScore));
  };

  const getRiskProfile = (score: number) => {
    if (score >= 80) return { profile: 'Aggressive Investor', capacity: 'Very High', color: 'from-green-400 to-green-600' };
    if (score >= 65) return { profile: 'Growth Investor', capacity: 'High', color: 'from-blue-400 to-blue-600' };
    if (score >= 45) return { profile: 'Balanced Investor', capacity: 'Moderate', color: 'from-yellow-400 to-yellow-600' };
    if (score >= 25) return { profile: 'Conservative Investor', capacity: 'Low', color: 'from-orange-400 to-orange-600' };
    return { profile: 'Capital Preservation', capacity: 'Very Low', color: 'from-red-400 to-red-600' };
  };

  const calculateRatios = (data: ReportData) => ({
    debtToIncome: ((data.emi + data.liabilities * 0.1) / data.salary) * 100,
    savingsRate: (data.savings / data.salary) * 100,
    emergencyFundMonths: data.savings / data.monthly_expenses,
    investmentRate: (data.investments / data.salary) * 100,
    netWorth: data.assets - data.liabilities,
    expenseRatio: ((data.monthly_expenses * 12) / data.salary) * 100
  });

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount/10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount/100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString()}`;
  };

  const riskScore = calculateRiskScore(data);
  const riskProfile = getRiskProfile(riskScore);
  const ratios = calculateRatios(data);

  const recommendations = [
    ratios.emergencyFundMonths < 6 ? `Build emergency fund: You have ${ratios.emergencyFundMonths.toFixed(1)} months of expenses. Aim for 6-12 months.` : null,
    ratios.debtToIncome > 40 ? `Reduce debt burden: ${ratios.debtToIncome.toFixed(1)}% debt-to-income is high. Target below 30%.` : null,
    ratios.savingsRate < 20 ? `Increase savings: ${ratios.savingsRate.toFixed(1)}% savings rate is low. Aim for 20%+ of income.` : null,
    data.insurance === 'None' ? 'Get insurance: Health and term life insurance are essential for financial security.' : null,
    data.credit_score < 650 ? 'Improve credit score: Pay bills on time, reduce credit utilization, check credit report.' : null,
    !data.budget ? 'Create a budget: Track income and expenses to improve financial control.' : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0f0f0f', color: '#ddf1a5' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#ddf1a5] text-[#ddf1a5] hover:bg-[#ddf1a5] hover:text-[#0f0f0f]"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Button>
          
          <div className="bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] text-[#0f0f0f] px-6 py-2 rounded-full font-bold">
            FeinAI
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl text-[#ddf1a5] font-bold mb-4 bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] bg-clip-text ">
            Financial Health Report
          </h1>
          <p className="text-xl opacity-80">Comprehensive Analysis & Recommendations</p>
        </motion.div>

        {/* Risk Score Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-[#ddf1a5]/20">
            <CardHeader className="text-center">
              <CardTitle className="text-[#ddf1a5] text-2xl flex items-center justify-center">
                <TrendingUp className="mr-3" size={28} />
                Overall Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="text-6xl font-bold mb-2"
                >
                  <span className={`bg-gradient-to-r ${riskProfile.color} opacity-60 bg-clip-text `}>
                    {riskScore.toFixed(1)}
                  </span>
                  <span className="text-2xl opacity-60">/100</span>
                </motion.div>
                <div className={`text-xl font-semibold bg-gradient-to-r ${riskProfile.color} bg-clip-text text-transparent`}>
                  {riskProfile.profile}
                </div>
                <div className="text-lg opacity-80">{riskProfile.capacity} Risk Capacity</div>
              </div>
              <Progress value={riskScore} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Snapshot */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Net Worth', value: formatCurrency(ratios.netWorth), icon: TrendingUp },
            { title: 'Monthly Income', value: formatCurrency(data.salary / 12), icon: Zap },
            { title: 'Total Investments', value: formatCurrency(data.investments), icon: Target },
            { title: 'Credit Score', value: `${data.credit_score}/850`, icon: Shield }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-[#1a1a1a] border-[#ddf1a5]/20 hover:border-[#ddf1a5]/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <item.icon size={24} className="text-[#ddf1a5]" />
                  </div>
                  <div className="text-2xl font-bold text-[#ddf1a5]">{item.value}</div>
                  <div className="text-sm opacity-70">{item.title}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Ratios */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-[#1a1a1a] border-[#ddf1a5]/20">
            <CardHeader>
              <CardTitle className="text-[#ddf1a5] flex items-center">
                <TrendingUp className="mr-3" size={24} />
                Key Financial Ratios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Debt-to-Income', value: `${ratios.debtToIncome.toFixed(1)}%`, healthy: ratios.debtToIncome < 30 },
                  { label: 'Savings Rate', value: `${ratios.savingsRate.toFixed(1)}%`, healthy: ratios.savingsRate >= 20 },
                  { label: 'Emergency Fund', value: `${ratios.emergencyFundMonths.toFixed(1)} months`, healthy: ratios.emergencyFundMonths >= 6 },
                  { label: 'Investment Rate', value: `${ratios.investmentRate.toFixed(1)}%`, healthy: ratios.investmentRate >= 15 },
                  { label: 'Expense Ratio', value: `${ratios.expenseRatio.toFixed(1)}%`, healthy: ratios.expenseRatio < 80 },
                ].map((ratio, index) => (
                  <div key={index} className="p-4 bg-[#2a2a2a] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm opacity-70">{ratio.label}</span>
                      <span className={`text-sm ${ratio.healthy ? 'text-green-400' : 'text-orange-400'}`}>
                        {ratio.healthy ? '✓' : '⚠'}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-[#ddf1a5]">{ratio.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-[#1a1a1a] border-[#ddf1a5]/20">
            <CardHeader>
              <CardTitle className="text-[#ddf1a5] flex items-center">
                <Target className="mr-3" size={24} />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-start space-x-3 p-4 bg-[#2a2a2a] rounded-lg"
                  >
                    <AlertTriangle size={20} className="text-[#ddf1a5] mt-0.5 flex-shrink-0" />
                    <p className="text-[#ddf1a5] leading-relaxed">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReportDisplay;
