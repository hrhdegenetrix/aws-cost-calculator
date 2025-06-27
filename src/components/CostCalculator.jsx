import { useState } from 'react'
import { Server, Database, HardDrive, Zap, Calculator } from 'lucide-react'
import CostChart from './CostChart'

const CostCalculator = () => {
  const [formData, setFormData] = useState({
    instanceType: 'm5.large',
    instanceCount: 2,
    region: 'us-east-1',
    storageGB: 100,
    dataTransferGB: 50,
    hoursPerMonth: 720
  })

  const [costData, setCostData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const instanceTypes = [
    { value: 't3.micro', label: 't3.micro (1 vCPU, 1 GB RAM)', hourlyRate: 0.0104 },
    { value: 't3.small', label: 't3.small (2 vCPU, 2 GB RAM)', hourlyRate: 0.0208 },
    { value: 't3.medium', label: 't3.medium (2 vCPU, 4 GB RAM)', hourlyRate: 0.0416 },
    { value: 'm5.large', label: 'm5.large (2 vCPU, 8 GB RAM)', hourlyRate: 0.096 },
    { value: 'm5.xlarge', label: 'm5.xlarge (4 vCPU, 16 GB RAM)', hourlyRate: 0.192 },
    { value: 'c5.large', label: 'c5.large (2 vCPU, 4 GB RAM)', hourlyRate: 0.085 },
    { value: 'r5.large', label: 'r5.large (2 vCPU, 16 GB RAM)', hourlyRate: 0.126 }
  ]

  const regions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)', multiplier: 1.0 },
    { value: 'us-west-2', label: 'US West (Oregon)', multiplier: 1.0 },
    { value: 'eu-west-1', label: 'Europe (Ireland)', multiplier: 1.1 },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)', multiplier: 1.15 }
  ]

  const calculateCosts = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get instance pricing
      const selectedInstance = instanceTypes.find(i => i.value === formData.instanceType)
      const selectedRegion = regions.find(r => r.value === formData.region)
      
      const baseHourlyRate = selectedInstance.hourlyRate * selectedRegion.multiplier
      const ec2Monthly = baseHourlyRate * formData.instanceCount * formData.hoursPerMonth
      
      // Calculate storage costs (EBS GP3)
      const storageMonthly = (formData.storageGB * 0.08) * formData.instanceCount
      
      // Calculate data transfer costs
      const dataTransferMonthly = formData.dataTransferGB * 0.09
      
      // Calculate total
      const totalMonthly = ec2Monthly + storageMonthly + dataTransferMonthly
      const totalAnnual = totalMonthly * 12

      // Simulate calling AWS API (in real implementation, this would call /api/cost-estimate)
      const mockCostData = {
        breakdown: {
          ec2: ec2Monthly,
          storage: storageMonthly,
          dataTransfer: dataTransferMonthly,
          total: totalMonthly
        },
        annual: totalAnnual,
        recommendations: [
          {
            type: 'Right-sizing',
            description: `Consider ${formData.instanceCount > 2 ? 'fewer instances with higher capacity' : 'reserved instances for 30% savings'}`,
            potentialSavings: totalMonthly * 0.3
          },
          {
            type: 'Storage Optimization',
            description: 'Use EBS GP3 instead of GP2 for better price/performance',
            potentialSavings: storageMonthly * 0.2
          }
        ],
        region: selectedRegion.label,
        instanceType: selectedInstance.label
      }

      setCostData(mockCostData)
    } catch (err) {
      setError('Failed to calculate costs. Please try again.')
      console.error('Cost calculation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Count') || name.includes('GB') || name.includes('Hours') 
        ? parseInt(value) || 0 
        : value
    }))
  }

  return (
    <div className="cost-calculator">
      <div className="calculator-header">
        <h2>
          <Calculator className="section-icon" />
          Configure Your AWS Infrastructure
        </h2>
        <p>Enter your expected usage to get cost estimates and optimization recommendations</p>
      </div>

      <div className="calculator-grid">
        <div className="calculator-form">
          <div className="form-section">
            <h3>
              <Server className="form-icon" />
              Compute Configuration
            </h3>
            
            <div className="form-group">
              <label htmlFor="instanceType">Instance Type</label>
              <select
                id="instanceType"
                name="instanceType"
                value={formData.instanceType}
                onChange={handleInputChange}
              >
                {instanceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="instanceCount">Number of Instances</label>
              <input
                type="number"
                id="instanceCount"
                name="instanceCount"
                value={formData.instanceCount}
                onChange={handleInputChange}
                min="1"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="region">AWS Region</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
              >
                {regions.map(region => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hoursPerMonth">Hours per Month</label>
              <input
                type="number"
                id="hoursPerMonth"
                name="hoursPerMonth"
                value={formData.hoursPerMonth}
                onChange={handleInputChange}
                min="1"
                max="744"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>
              <HardDrive className="form-icon" />
              Storage & Network
            </h3>
            
            <div className="form-group">
              <label htmlFor="storageGB">Storage per Instance (GB)</label>
              <input
                type="number"
                id="storageGB"
                name="storageGB"
                value={formData.storageGB}
                onChange={handleInputChange}
                min="1"
                max="10000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataTransferGB">Data Transfer Out (GB/month)</label>
              <input
                type="number"
                id="dataTransferGB"
                name="dataTransferGB"
                value={formData.dataTransferGB}
                onChange={handleInputChange}
                min="0"
                max="10000"
              />
            </div>
          </div>

          <button 
            className="calculate-btn"
            onClick={calculateCosts}
            disabled={loading}
          >
            <Zap className="btn-icon" />
            {loading ? 'Calculating...' : 'Calculate Costs'}
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {costData && (
          <div className="cost-results">
            <h3>Cost Estimate Results</h3>
            
            <div className="cost-summary">
              <div className="cost-item total">
                <span className="cost-label">Total Monthly Cost</span>
                <span className="cost-value">${costData.breakdown.total.toFixed(2)}</span>
              </div>
              <div className="cost-item annual">
                <span className="cost-label">Annual Cost</span>
                <span className="cost-value">${costData.annual.toFixed(2)}</span>
              </div>
            </div>

            <div className="cost-breakdown">
              <h4>Cost Breakdown</h4>
              <div className="breakdown-item">
                <span>EC2 Instances ({formData.instanceCount}x {formData.instanceType})</span>
                <span>${costData.breakdown.ec2.toFixed(2)}</span>
              </div>
              <div className="breakdown-item">
                <span>EBS Storage ({formData.storageGB}GB per instance)</span>
                <span>${costData.breakdown.storage.toFixed(2)}</span>
              </div>
              <div className="breakdown-item">
                <span>Data Transfer ({formData.dataTransferGB}GB)</span>
                <span>${costData.breakdown.dataTransfer.toFixed(2)}</span>
              </div>
            </div>

            <CostChart costData={costData} />

            <div className="recommendations">
              <h4>💡 Optimization Recommendations</h4>
              {costData.recommendations.map((rec, index) => (
                <div key={index} className="recommendation">
                  <div className="rec-header">
                    <span className="rec-type">{rec.type}</span>
                    <span className="rec-savings">Save ${rec.potentialSavings.toFixed(2)}/month</span>
                  </div>
                  <p className="rec-description">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CostCalculator 