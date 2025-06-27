# AWS Marketplace Cost Calculator POC

**Built by Magdalene Sullivan for Joe Shockman client demos**

A professional proof-of-concept application demonstrating AWS billing API integration and cost optimization capabilities. Built with React and Vercel serverless functions.

## 🚀 Live Demo

**[View Live Application](https://aws-cost-calculator-wfev.vercel.app/)**

## 📋 Overview

This application helps organizations estimate and optimize their AWS infrastructure costs, specifically tailored for AWS Marketplace deployment scenarios. It provides:

- **Real-time cost calculations** for EC2, EBS, and data transfer
- **Interactive cost breakdowns** with beautiful charts
- **Optimization recommendations** for cost savings
- **Multi-region pricing** comparisons
- **Marketplace-ready cost analysis**

## ✨ Key Features

### 💰 Cost Estimation
- **EC2 Instance Pricing**: Support for popular instance types (t3, m5, c5, r5 families)
- **Storage Costs**: EBS GP3 pricing calculations
- **Data Transfer**: Outbound data transfer cost estimation
- **Regional Variations**: Pricing adjustments for different AWS regions

### 📊 Visual Analytics
- **Interactive Charts**: Bar charts and doughnut charts for cost visualization
- **Cost Breakdowns**: Detailed service-by-service cost analysis
- **Annual Projections**: Monthly and yearly cost estimates

### 🎯 Optimization Insights
- **Right-sizing Recommendations**: Instance optimization suggestions
- **Reserved Instance Advice**: Savings opportunities identification
- **Storage Optimization**: Cost-effective storage recommendations
- **CDN Integration**: Data transfer cost reduction strategies

### 🔧 Technical Excellence
- **AWS SDK Integration**: Real AWS Cost Explorer API integration
- **Serverless Architecture**: Vercel Functions for scalable backend
- **Responsive Design**: Mobile-first, modern UI/UX
- **Error Handling**: Graceful fallbacks with mock data
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Chart.js, Lucide Icons
- **Backend**: Vercel Serverless Functions, AWS SDK v3
- **Styling**: Custom CSS with modern design patterns
- **APIs**: AWS Cost Explorer, AWS EC2 APIs
- **Deployment**: Vercel with automatic CI/CD

## 🚀 Quick Start

### 1. Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hrhdegenetrix/aws-cost-calculator)

### 2. Environment Variables (Optional)

For real AWS data integration, add these to your Vercel environment variables:

```bash
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

**Note**: The app works perfectly with mock data if AWS credentials are not provided.

### 3. Local Development

```bash
git clone https://github.com/hrhdegenetrix/aws-cost-calculator
cd aws-cost-calculator
npm install
npm run dev
```

## 🔧 Configuration

### AWS Permissions Required

If using real AWS data, your IAM user needs these permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ce:GetCostAndUsage",
                "ce:GetDimensionValues",
                "ce:GetRightsizingRecommendation",
                "ec2:DescribeInstanceTypes"
            ],
            "Resource": "*"
        }
    ]
}
```

### Environment Variables

Create a `.env.local` file (for local development):

```bash
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
```

## 📈 Business Value

### For AWS Marketplace Vendors
- **Cost Transparency**: Clear understanding of infrastructure costs
- **Pricing Strategy**: Data-driven pricing for marketplace products
- **Profit Margins**: Calculate profitability across different scenarios
- **Scaling Insights**: Understand cost implications of growth

### For DevOps Teams
- **Infrastructure Planning**: Make informed decisions about AWS resources
- **Budget Management**: Accurate cost forecasting and control
- **Optimization**: Identify cost-saving opportunities
- **Compliance**: Meet marketplace deployment requirements

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │    │ Vercel Functions │    │   AWS APIs      │
│                 │    │                  │    │                 │
│ • Cost Calculator│    │ • Cost Estimation│    │ • Cost Explorer │
│ • Chart.js       │◄──►│ • AWS SDK        │◄──►│ • EC2 API       │
│ • Responsive UI  │    │ • Error Handling │    │ • Billing Data  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔍 API Endpoints

### POST `/api/cost-estimate`

Calculate AWS costs based on usage parameters.

**Request Body:**
```json
{
  "instanceType": "m5.large",
  "instanceCount": 2,
  "region": "us-east-1",
  "storageGB": 100,
  "dataTransferGB": 50,
  "hoursPerMonth": 720
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "breakdown": {
      "ec2": 138.24,
      "storage": 16.00,
      "dataTransfer": 4.50,
      "total": 158.74
    },
    "annual": 1904.88,
    "recommendations": [...]
  }
}
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Interactive Elements**: Smooth animations and transitions
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Accessibility**: WCAG compliant design patterns
- **Data Visualization**: Clear, informative charts and graphs

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
vercel --prod
```

## 📊 Demo Data

The application includes realistic mock data for demonstration:
- **Instance Types**: t3.micro to r5.large with accurate pricing
- **Regional Pricing**: US East, US West, EU West, AP Southeast
- **Storage Costs**: EBS GP3 pricing model
- **Optimization**: Real-world recommendations

## 🤝 Contributing

This is a proof-of-concept application built for demonstrating AWS billing integration capabilities. For suggestions or improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🏆 Portfolio Impact

This project demonstrates:

- **Full-Stack Development**: React frontend with serverless backend
- **Cloud Integration**: AWS SDK implementation and API integration
- **Data Visualization**: Complex data presentation with Chart.js
- **UI/UX Design**: Modern, responsive design patterns
- **DevOps Practices**: Vercel deployment and environment management
- **Business Logic**: Real-world cost optimization algorithms

Perfect for showcasing technical capabilities in:
- AWS ecosystem knowledge
- Serverless architecture
- Cost optimization strategies
- Modern JavaScript frameworks
- API integration patterns

---

**Built with ❤️ by Maggie Sullivan for DevOps Excellence**  
*AWS Cost Calculator POC - Demonstrating AWS Billing API Integration & Cost Optimization* 