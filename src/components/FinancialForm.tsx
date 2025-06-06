import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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

interface FinancialFormProps {
  onSubmit: (data: FinancialFormData) => void;
  onBack: () => void;
}

const FinancialForm: React.FC<FinancialFormProps> = ({ onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    salary: '',
    city_index: '1.0',
    assets: '',
    liabilities: '',
    loans: '',
    emi: '',
    responsibilities: '',
    savings: '',
    credit_score: '',
    investments: '',
    monthly_expenses: '',
    risk_tolerance: '0.5',
    budget: false,
    insurance: 'None',
    expense_tracking: 'Never',
    retirement: false,
    high_risk_percent: '',
    automate: false,
    defaulted: false,
    advisor: false,
    confidence: '5',
    review_goals: false,
  });

  const steps = [
    {
      title: "Basic Information",
      fields: ['age', 'salary', 'city_index', 'responsibilities']
    },
    {
      title: "Assets & Liabilities", 
      fields: ['assets', 'liabilities', 'loans', 'emi']
    },
    {
      title: "Financial Details",
      fields: ['savings', 'credit_score', 'investments', 'monthly_expenses']
    },
    {
      title: "Risk & Preferences",
      fields: ['risk_tolerance', 'high_risk_percent', 'confidence']
    },
    {
      title: "Financial Habits",
      fields: ['budget', 'insurance', 'expense_tracking', 'retirement', 'automate', 'defaulted', 'advisor', 'review_goals']
    }
  ];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Convert string values to appropriate types
    const processedData = {
      ...formData,
      age: parseInt(formData.age),
      salary: parseFloat(formData.salary),
      city_index: parseFloat(formData.city_index),
      assets: parseFloat(formData.assets),
      liabilities: parseFloat(formData.liabilities),
      loans: parseInt(formData.loans),
      emi: parseFloat(formData.emi),
      responsibilities: parseInt(formData.responsibilities),
      savings: parseFloat(formData.savings),
      credit_score: parseInt(formData.credit_score),
      investments: parseFloat(formData.investments),
      monthly_expenses: parseFloat(formData.monthly_expenses),
      risk_tolerance: parseFloat(formData.risk_tolerance),
      high_risk_percent: parseInt(formData.high_risk_percent),
      confidence: parseInt(formData.confidence),
    };
    onSubmit(processedData);
  };

  const renderField = (field: string) => {
    const commonInputClass = "bg-[#1a1a1a] border-[#ddf1a5]/30 text-[#ddf1a5] focus:border-[#ddf1a5] focus:ring-[#ddf1a5]/20";
    
    switch (field) {
      case 'age':
        return (
          <div className="space-y-2">
            <Label htmlFor="age" className="text-[#ddf1a5]">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className={commonInputClass}
              placeholder="Enter your age"
            />
          </div>
        );
      
      case 'salary':
        return (
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-[#ddf1a5]">Annual Salary (₹)</Label>
            <Input
              id="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              className={commonInputClass}
              placeholder="Enter annual salary"
            />
          </div>
        );

      case 'city_index':
        return (
          <div className="space-y-2">
            <Label htmlFor="city_index" className="text-[#ddf1a5]">City Cost Index</Label>
            <Select value={formData.city_index} onValueChange={(value) => handleInputChange('city_index', value)}>
              <SelectTrigger className={commonInputClass}>
                <SelectValue placeholder="Select city cost level" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#ddf1a5]/30">
                <SelectItem value="0.8">Low Cost (0.8)</SelectItem>
                <SelectItem value="1.0">Average Cost (1.0)</SelectItem>
                <SelectItem value="1.2">High Cost (1.2)</SelectItem>
                <SelectItem value="1.5">Very High Cost (1.5)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 'insurance':
        return (
          <div className="space-y-2">
            <Label htmlFor="insurance" className="text-[#ddf1a5]">Insurance Coverage</Label>
            <Select value={formData.insurance} onValueChange={(value) => handleInputChange('insurance', value)}>
              <SelectTrigger className={commonInputClass}>
                <SelectValue placeholder="Select insurance coverage" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] text-[#ddf1a5] border-[#ddf1a5]/30">
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Health">Health Only</SelectItem>
                <SelectItem value="Life">Life Only</SelectItem>
                <SelectItem value="Both">Both Health & Life</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 'expense_tracking':
        return (
          <div className="space-y-2">
            <Label htmlFor="expense_tracking" className="text-[#ddf1a5]">Expense Tracking Frequency</Label>
            <Select value={formData.expense_tracking} onValueChange={(value) => handleInputChange('expense_tracking', value)}>
              <SelectTrigger className={commonInputClass}>
                <SelectValue placeholder="How often do you track expenses?" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] text-[#ddf1a5] border-[#ddf1a5]/30">
                <SelectItem value="Never">Never</SelectItem>
                <SelectItem value="Occasionally">Occasionally</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 'budget':
      case 'retirement':
      case 'automate':
      case 'defaulted':
      case 'advisor':
      case 'review_goals':
        const labels = {
          budget: 'Follow Monthly Budget',
          retirement: 'Have Retirement Plan',
          automate: 'Automate Savings/Investments',
          defaulted: 'Ever Defaulted on Loan',
          advisor: 'Consult Financial Advisor',
          review_goals: 'Regularly Review Goals'
        };
        return (
          <div className="flex items-center space-x-3 p-4 bg-[#1a1a1a] rounded-lg border border-[#ddf1a5]/20">
            <Switch
              id={field}
              checked={formData[field as keyof typeof formData] as boolean}
              onCheckedChange={(checked) => handleInputChange(field, checked)}
              className="data-[state=checked]:bg-[#ddf1a5]"
            />
            <Label htmlFor={field} className="text-[#ddf1a5] cursor-pointer">
              {labels[field as keyof typeof labels]}
            </Label>
          </div>
        );

      default:
        const fieldLabels: { [key: string]: string } = {
          assets: 'Total Assets (₹)',
          liabilities: 'Total Liabilities (₹)',
          loans: 'Number of Active Loans',
          emi: 'Annual EMI Payments (₹)',
          responsibilities: 'Financial Dependents',
          savings: 'Liquid Savings (₹)',
          credit_score: 'Credit Score (300-850)',
          investments: 'Total Investments (₹)',
          monthly_expenses: 'Monthly Expenses (₹)',
          risk_tolerance: 'Risk Tolerance (0.0-1.0)',
          high_risk_percent: 'High-Risk Investment % (0-100)',
          confidence: 'Financial Confidence (1-10)'
        };

        return (
          <div className="space-y-2">
            <Label htmlFor={field} className="text-[#ddf1a5]">{fieldLabels[field]}</Label>
            <Input
              id={field}
              type={field === 'risk_tolerance' ? 'number' : 'number'}
              step={field === 'risk_tolerance' ? '0.1' : '1'}
              value={formData[field as keyof typeof formData] as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={commonInputClass}
              placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0f0f0f', color: '#ddf1a5' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-[#ddf1a5] text-[#0f0f0f]"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
          
          <div className="bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] text-[#0f0f0f] px-6 py-2 rounded-full font-bold">
            FeinAI
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Financial Health Assessment</h2>
            <span className="text-sm opacity-70">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full bg-[#1a1a1a] rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-[#1a1a1a] border-[#ddf1a5]/20">
          <CardHeader>
            <CardTitle className="text-[#ddf1a5] flex items-center">
              <Calculator className="mr-3" size={24} />
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {steps[currentStep].fields.map((field) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {renderField(field)}
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="bg-[#ddf1a5] text-[#0f0f0f] disabled:opacity-30"
              >
                <ArrowLeft className="mr-2" size={20} />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] text-[#0f0f0f] hover:from-[#c9e682] hover:to-[#a6c96a]"
                >
                  Generate Report
                  <Calculator className="ml-2" size={20} />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#ddf1a5] to-[#b8d977] text-[#0f0f0f] hover:from-[#c9e682] hover:to-[#a6c96a]"
                >
                  Next
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FinancialForm;