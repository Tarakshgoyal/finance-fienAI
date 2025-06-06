# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from typing import Dict, Tuple, List
import math

# Your FinancialHealthAnalyzer class (copied directly from your financial_health_report.py)
class FinancialHealthAnalyzer:
    """
    Comprehensive Financial Health Analysis Tool
    Generates detailed risk assessment and financial recommendations
    """
    
    def __init__(self):
        self.report_data = {}
        self.recommendations = []
        self.warnings = []
        
    def calculate_comprehensive_risk_score(self, data: Dict) -> Tuple[float, Dict]:
        """
        Enhanced risk calculation with weighted factors and detailed breakdown
        """
        # Normalized factors (0-1 scale)
        age_factor = self._calculate_age_factor(data['age'])
        income_stability = self._calculate_income_stability(data['salary'], data['city_index'])
        net_worth_ratio = self._calculate_net_worth_ratio(data['assets'], data['liabilities'], data['salary'])
        debt_burden = self._calculate_debt_burden(data['emi'], data['liabilities'], data['salary'])
        liquidity_score = self._calculate_liquidity_score(data['savings'], data['monthly_expenses'])
        credit_health = self._calculate_credit_health(data['credit_score'], data['defaulted'])
        investment_maturity = self._calculate_investment_maturity(data['investments'], data['assets'])
        behavioral_score = self._calculate_behavioral_score(data)
        
        # Weighted scoring system
        weights = {
            'age_factor': 0.15,
            'income_stability': 0.20,
            'net_worth_ratio': 0.15, 
            'debt_burden': 0.20,
            'liquidity_score': 0.10,
            'credit_health': 0.10,
            'investment_maturity': 0.05,
            'behavioral_score': 0.05
        }
        
        # Calculate weighted score
        # Note: 'risk_tolerance' is directly used as a factor from frontend input
        risk_score = (
            age_factor * weights['age_factor'] +
            income_stability * weights['income_stability'] +
            net_worth_ratio * weights['net_worth_ratio'] +
            (1 - debt_burden) * weights['debt_burden'] +  # Invert debt burden
            liquidity_score * weights['liquidity_score'] +
            credit_health * weights['credit_health'] +
            investment_maturity * weights['investment_maturity'] +
            behavioral_score * weights['behavioral_score'] +
            data['risk_tolerance'] * 0.1  # Personal risk preference
        ) * 100
        
        # Risk score breakdown for transparency
        breakdown = {
            'Age Factor': age_factor * 100,
            'Income Stability': income_stability * 100,
            'Net Worth Ratio': net_worth_ratio * 100,
            'Debt Management': (1 - debt_burden) * 100,
            'Liquidity Position': liquidity_score * 100,
            'Credit Health': credit_health * 100,
            'Investment Maturity': investment_maturity * 100,
            'Financial Behavior': behavioral_score * 100,
            'Risk Tolerance': data['risk_tolerance'] * 100
        }
        
        return max(0, min(100, risk_score)), breakdown
    
    def _calculate_age_factor(self, age: int) -> float:
        """Age-based risk capacity (younger = higher capacity)"""
        if age < 25:
            return 0.9
        elif age < 35:
            return 0.8
        elif age < 45:
            return 0.6
        elif age < 55:
            return 0.4
        else:
            return 0.2
    
    def _calculate_income_stability(self, salary: float, city_index: float) -> float:
        """Income stability relative to city cost"""
        # Avoid division by zero and normalize effectively
        if city_index == 0: # Handle edge case where city_index could be 0
            return 0.0 
        adjusted_income = salary / (city_index * 100000)
        return min(1.0, adjusted_income / 10)  # Normalize to 0-1
    
    def _calculate_net_worth_ratio(self, assets: float, liabilities: float, salary: float) -> float:
        """Net worth as multiple of annual salary"""
        if salary == 0:
            return 0.0
        net_worth_multiple = (assets - liabilities) / salary
        return min(1.0, max(0, net_worth_multiple / 5))  # Cap at 5x salary, ensure not negative
    
    def _calculate_debt_burden(self, emi: float, liabilities: float, salary: float) -> float:
        """Total debt burden ratio (lower is better)"""
        if salary == 0:
            return 1.0 # Max burden if no income
        # Assume 10% of liabilities as annual payment for a simplified burden calculation
        total_debt_ratio = (emi + liabilities * 0.1) / salary
        return min(1.0, total_debt_ratio) # Cap at 1.0
    
    def _calculate_liquidity_score(self, savings: float, monthly_expenses: float) -> float:
        """Emergency fund adequacy"""
        if monthly_expenses == 0:
            return 0.5 # Neutral score if no expenses
        emergency_months = savings / monthly_expenses
        if emergency_months >= 12:
            return 1.0
        elif emergency_months >= 6:
            return 0.8
        elif emergency_months >= 3:
            return 0.6
        else:
            return min(1.0, emergency_months / 6) # Normalize to 0-1, cap at 1.0
    
    def _calculate_credit_health(self, credit_score: int, defaulted: bool) -> float:
        """Credit score and history assessment"""
        base_score = 0.3 if defaulted else 1.0 # Penalize for default
            
        if credit_score >= 750:
            credit_factor = 1.0
        elif credit_score >= 650:
            credit_factor = 0.7
        elif credit_score >= 550:
            credit_factor = 0.4
        else:
            credit_factor = 0.1
            
        return base_score * credit_factor
    
    def _calculate_investment_maturity(self, investments: float, assets: float) -> float:
        """Investment diversification and allocation"""
        if assets == 0:
            return 0.0 # No assets, no investment maturity
        investment_ratio = investments / assets
        return min(1.0, investment_ratio)
    
    def _calculate_behavioral_score(self, data: Dict) -> float:
        """Financial discipline and habits"""
        score = 0
        total_factors = 8
        
        if data['budget']:
            score += 1
        if data['expense_tracking'] in ['Monthly', 'Daily']:
            score += 1
        if data['insurance'] in ['Health', 'Life', 'Both']:
            score += 1
        if data['retirement']:
            score += 1
        if data['automate']:
            score += 1
        if not data['defaulted']: # Good if not defaulted
            score += 1
        if data['confidence'] >= 7: # High confidence is good
            score += 1
        if data['review_goals']:
            score += 1
            
        return score / total_factors
    
    def interpret_risk_profile(self, risk_score: float) -> Dict:
        """Enhanced risk profile interpretation based on overall risk score"""
        if risk_score >= 80:
            return {
                'profile': 'Aggressive Investor',
                'capacity': 'Very High',
                'description': 'Strong financial foundation with high risk-taking ability',
                'allocation': 'Equity: 70-80%, Bonds: 10-15%, Alternatives: 10-15%',
                'investment_horizon': '15+ years'
            }
        elif risk_score >= 65:
            return {
                'profile': 'Growth Investor', 
                'capacity': 'High',
                'description': 'Good financial position suitable for growth-oriented investments',
                'allocation': 'Equity: 60-70%, Bonds: 20-25%, Alternatives: 10-15%',
                'investment_horizon': '10-15 years'
            }
        elif risk_score >= 45:
            return {
                'profile': 'Balanced Investor',
                'capacity': 'Moderate',
                'description': 'Stable finances with moderate risk appetite',
                'allocation': 'Equity: 40-50%, Bonds: 30-40%, Alternatives: 10-20%',
                'investment_horizon': '7-10 years'
            }
        elif risk_score >= 25:
            return {
                'profile': 'Conservative Investor',
                'capacity': 'Low',
                'description': 'Limited risk capacity, focus on stability',
                'allocation': 'Equity: 20-30%, Bonds: 50-60%, Cash: 20-30%',
                'investment_horizon': '3-7 years'
            }
        else:
            return {
                'profile': 'Capital Preservation',
                'capacity': 'Very Low', 
                'description': 'Priority should be financial stability and emergency planning',
                'allocation': 'Bonds: 40-50%, Cash/FD: 40-50%, Equity: 0-10%',
                'investment_horizon': '1-3 years'
            }
    
    def calculate_key_ratios(self, data: Dict) -> Dict:
        """Calculate important financial ratios"""
        ratios = {}
        
        # Debt-to-Income Ratio
        ratios['debt_to_income'] = (data['emi'] + data['liabilities'] * 0.1) / data['salary'] if data['salary'] > 0 else 0
        
        # Savings Rate
        ratios['savings_rate'] = data['savings'] / data['salary'] if data['salary'] > 0 else 0
        
        # Emergency Fund Ratio
        ratios['emergency_fund_months'] = data['savings'] / data['monthly_expenses'] if data['monthly_expenses'] > 0 else 0
        
        # Investment Rate
        ratios['investment_rate'] = data['investments'] / data['salary'] if data['salary'] > 0 else 0
        
        # Net Worth
        ratios['net_worth'] = data['assets'] - data['liabilities']
        
        # Asset Utilization
        ratios['asset_utilization'] = data['investments'] / data['assets'] if data['assets'] > 0 else 0
        
        # Expense Ratio
        ratios['expense_ratio'] = (data['monthly_expenses'] * 12) / data['salary'] if data['salary'] > 0 else 0
        
        return ratios
    
    def generate_recommendations(self, data: Dict, risk_score: float, ratios: Dict) -> List[str]:
        """Generate personalized financial recommendations"""
        recommendations = []
        
        # Emergency Fund
        if ratios['emergency_fund_months'] < 6:
            recommendations.append(f"🚨 Build emergency fund: You have {ratios['emergency_fund_months']:.1f} months of expenses. Aim for 6-12 months.")
        
        # Debt Management
        if ratios['debt_to_income'] > 0.4:
            recommendations.append(f"💳 Reduce debt burden: {ratios['debt_to_income']:.1%} debt-to-income is high. Target below 30%.")
        
        # Savings Rate
        if ratios['savings_rate'] < 0.2:
            recommendations.append(f"💰 Increase savings: {ratios['savings_rate']:.1%} savings rate is low. Aim for 20%+ of income.")
        
        # Investment Diversification
        if ratios['investment_rate'] < 0.15 and risk_score > 40:
            recommendations.append("📈 Increase investments: Consider systematic investment plans (SIPs) for wealth building.")
        
        # Insurance Coverage
        if data['insurance'] == 'None':
            recommendations.append("🛡️ Get insurance: Health and term life insurance are essential for financial security.")
        
        # Credit Score
        if data['credit_score'] < 650:
            recommendations.append("📊 Improve credit score: Pay bills on time, reduce credit utilization, check credit report.")
        
        # Behavioral improvements
        if not data['budget']:
            recommendations.append("📋 Create a budget: Track income and expenses to improve financial control.")
        
        if not data['automate']:
            recommendations.append("⚙️ Automate finances: Set up automatic savings and bill payments.")
        
        # Age-specific advice
        if data['age'] < 30 and not data['retirement']:
            recommendations.append("🎯 Start retirement planning: Time is your biggest advantage for long-term wealth.")
        
        return recommendations
    
    def generate_warnings(self, data: Dict, ratios: Dict) -> List[str]:
        """Generate financial health warnings"""
        warnings = []
        
        if ratios['debt_to_income'] > 0.5:
            warnings.append("⚠️ CRITICAL: Debt-to-income ratio exceeds 50% - immediate debt restructuring needed")
        
        if ratios['emergency_fund_months'] < 1:
            warnings.append("⚠️ HIGH RISK: No emergency fund - vulnerable to financial shocks")
        
        if data['credit_score'] < 500:
            warnings.append("⚠️ URGENT: Very poor credit score - will severely limit financial options")
        
        if ratios['expense_ratio'] > 0.9:
            warnings.append("⚠️ CRITICAL: Expenses consume 90%+ of income - unsustainable lifestyle")
        
        if data['defaulted'] and data['loans'] > 0:
            warnings.append("⚠️ HIGH RISK: Previous defaults with current loans - monitor closely")
        
        return warnings
    
    def format_currency(self, amount: float) -> str:
        """Format currency in Indian format"""
        if amount >= 10000000:  # 1 crore
            return f"₹{amount/10000000:.2f} Cr"
        elif amount >= 100000:  # 1 lakh
            return f"₹{amount/100000:.2f} L"
        else:
            return f"₹{amount:,.0f}"
            
    def get_full_report_data(self, data: Dict) -> Dict:
        """Generates all report data as a dictionary"""
        risk_score, breakdown = self.calculate_comprehensive_risk_score(data)
        risk_profile = self.interpret_risk_profile(risk_score)
        ratios = self.calculate_key_ratios(data)
        recommendations = self.generate_recommendations(data, risk_score, ratios)
        warnings = self.generate_warnings(data, ratios)
        action_items = self._generate_action_plan(data, ratios, risk_score)

        formatted_ratios = {k: f"{v:.1%}" if 'rate' in k or 'ratio' in k else (f"{v:.1f} months" if k == 'emergency_fund_months' else (self.format_currency(v) if 'worth' in k else v)) for k,v in ratios.items()}


        return {
            "generated_on": datetime.now().strftime('%B %d, %Y at %I:%M %p'),
            "age": data['age'],
            "risk_assessment": {
                "overall_risk_score": f"{risk_score:.1f}/100",
                "risk_profile": risk_profile['profile'],
                "capacity": risk_profile['capacity'],
                "description": risk_profile['description'],
                "investment_horizon": risk_profile['investment_horizon'],
                "suggested_allocation": risk_profile['allocation']
            },
            "score_breakdown": {factor: f"{score:.1f}/100" for factor, score in breakdown.items()},
            "financial_snapshot": {
                "annual_income": self.format_currency(data['salary']),
                "total_assets": self.format_currency(data['assets']),
                "total_liabilities": self.format_currency(data['liabilities']),
                "net_worth": self.format_currency(ratios['net_worth']),
                "liquid_savings": self.format_currency(data['savings']),
                "investments": self.format_currency(data['investments'])
            },
            "key_financial_ratios": formatted_ratios,
            "financial_behavior_analysis": {
                "monthly_budgeting": 'Yes' if data['budget'] else 'No',
                "expense_tracking": data['expense_tracking'],
                "insurance_coverage": data['insurance'],
                "retirement_planning": 'Yes' if data['retirement'] else 'No',
                "investment_automation": 'Yes' if data['automate'] else 'No',
                "credit_score": f"{data['credit_score']}/850",
                "financial_confidence": f"{data['confidence']}/10",
                "goal_review_habit": 'Yes' if data['review_goals'] else 'No',
                "financial_advisor": 'Yes' if data['advisor'] else 'No'
            },
            "urgent_attention_required": warnings,
            "personalized_recommendations": recommendations,
            "thirty_day_action_plan": action_items
        }
    
    def _generate_action_plan(self, data: Dict, ratios: Dict, risk_score: float) -> List[str]:
        """Generate 30-day action plan"""
        actions = []
        
        if ratios['emergency_fund_months'] < 3:
            actions.append("Open a high-yield savings account and set up automatic transfer for emergency fund")
        
        if not data['budget']:
            actions.append("Download a budgeting app and track all expenses for 30 days")
        
        if data['insurance'] == 'None':
            actions.append("Research and compare health insurance plans, get quotes for term life insurance")
        
        if data['credit_score'] < 650:
            actions.append("Obtain free credit report, dispute any errors, and set up payment reminders")
        
        if not data['automate']:
            actions.append("Set up automatic bill payments and SIP investments")
        
        if ratios['debt_to_income'] > 0.4:
            actions.append("List all debts, consider debt consolidation options, create repayment plan")
        
        actions.append("Review and optimize current investment portfolio based on risk profile")
        actions.append("Schedule financial goal review and create/update investment strategy")
        
        return actions[:6]  # Limit to 6 actions for manageability


app = Flask(__name__)
# Allow requests from your Next.js development server (http://localhost:3000)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

analyzer = FinancialHealthAnalyzer()

@app.route('/api/analyze', methods=['POST'])
def analyze_financial_health():
    """
    API endpoint to receive financial data, analyze it, and return a report.
    """
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # Validate and convert data types as per your Python backend's expectation
        # Frontend already sends processed data, but adding basic validation here
        required_fields = [
            'age', 'salary', 'city_index', 'assets', 'liabilities', 'loans', 'emi',
            'responsibilities', 'savings', 'credit_score', 'investments', 'monthly_expenses',
            'risk_tolerance', 'budget', 'insurance', 'expense_tracking', 'retirement',
            'high_risk_percent', 'automate', 'defaulted', 'advisor', 'confidence', 'review_goals'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        # The frontend's handleSubmit already parses most to correct types,
        # but ensure here for safety, especially for boolean/int/float.
        # This is a basic conversion, more robust validation could be added.
        data['age'] = int(data['age'])
        data['salary'] = float(data['salary'])
        data['city_index'] = float(data['city_index'])
        data['assets'] = float(data['assets'])
        data['liabilities'] = float(data['liabilities'])
        data['loans'] = int(data['loans'])
        data['emi'] = float(data['emi'])
        data['responsibilities'] = int(data['responsibilities'])
        data['savings'] = float(data['savings'])
        data['credit_score'] = int(data['credit_score'])
        data['investments'] = float(data['investments'])
        data['monthly_expenses'] = float(data['monthly_expenses'])
        data['risk_tolerance'] = float(data['risk_tolerance'])
        data['high_risk_percent'] = int(data['high_risk_percent'])
        data['confidence'] = int(data['confidence'])

        # Booleans are typically handled correctly by JSON parsing, but good to be explicit
        data['budget'] = bool(data['budget'])
        data['retirement'] = bool(data['retirement'])
        data['automate'] = bool(data['automate'])
        data['defaulted'] = bool(data['defaulted'])
        data['advisor'] = bool(data['advisor'])
        data['review_goals'] = bool(data['review_goals'])

        # Generate the comprehensive report data as a dictionary
        report_data = analyzer.get_full_report_data(data)
        
        return jsonify(report_data), 200

    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error processing request: {e}")
        return jsonify({"error": "An internal server error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    # You can run this Flask app using: python app.py
    # For development, you might use 'flask run' or a production-ready WSGI server like Gunicorn
    app.run(debug=True, port=5000)
