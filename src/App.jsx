import { useState } from 'react'
import CostCalculator from './components/CostCalculator'
import { Calculator, DollarSign, TrendingUp } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Calculator className="logo-icon" />
            <h1>AWS Marketplace Cost Calculator</h1>
          </div>
          <p className="subtitle">
            Optimize your AWS infrastructure costs for marketplace deployment
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <div className="hero-grid">
            <div className="hero-card no-hover">
              <DollarSign className="hero-icon" />
              <h3>Cost Optimization</h3>
              <p>Get real-time AWS pricing and optimization recommendations</p>
            </div>
            <div className="hero-card no-hover">
              <TrendingUp className="hero-icon" />
              <h3>Market Ready</h3>
              <p>Prepare your infrastructure for AWS Marketplace launch</p>
            </div>
          </div>
        </div>

        <CostCalculator />
      </main>

      <footer className="app-footer">
        <p>AWS Marketplace Cost Calculator POC - Built for DevOps Excellence</p>
      </footer>
    </div>
  )
}

export default App 