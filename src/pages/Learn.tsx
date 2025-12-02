import React from "react";
import { useNavigate } from "react-router-dom";

export const Learn: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<"emissions" | "credits" | "scopes" | "reduction">("emissions");
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const tabs = [
    { id: "emissions" as const, label: "Carbon Emissions", icon: "🌍" },
    { id: "credits" as const, label: "Carbon Credits", icon: "💳" },
    { id: "scopes" as const, label: "Emission Scopes", icon: "📊" },
    { id: "reduction" as const, label: "How to Reduce", icon: "🌱" },
  ];

  const faqs = [
    {
      question: "What is net-zero emissions?",
      answer: "Net-zero emissions means balancing the amount of greenhouse gases emitted with the amount removed from the atmosphere, resulting in zero net emissions."
    },
    {
      question: "How are carbon emissions measured?",
      answer: "Carbon emissions are typically measured in CO₂ equivalent (CO₂e), which includes all greenhouse gases converted to the equivalent amount of carbon dioxide."
    },
    {
      question: "What is the Paris Agreement target?",
      answer: "The Paris Agreement aims to limit global warming to well below 2°C, preferably to 1.5°C, compared to pre-industrial levels."
    },
    {
      question: "Can individuals buy carbon credits?",
      answer: "Yes, individuals can purchase carbon credits to offset their personal carbon footprint through various platforms and organizations.",
      details: (
        <div className="mt-4 space-y-4">
          <h5 className="font-bold text-neutral-900 dark:text-white">How to Buy Carbon Credits - Step by Step:</h5>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
              <div>
                <h6 className="font-semibold text-neutral-900 dark:text-white">Calculate Your Carbon Footprint</h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Use a carbon calculator to determine your annual emissions from activities like travel, energy use, and lifestyle choices. Most calculators provide results in tons of CO₂e.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
              <div>
                <h6 className="font-semibold text-neutral-900 dark:text-white">Choose a Verified Platform</h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Select a reputable carbon offset provider. Look for certifications like Gold Standard, Verified Carbon Standard (VCS), or Climate Action Reserve (CAR).</p>
                <div className="mt-2 text-xs bg-neutral-100 dark:bg-neutral-700 p-2 rounded">
                  <strong>Popular Platforms:</strong> Cloverly, Cool Effect, Terrapass, Carbon Footprint Ltd, Offsetra
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
              <div>
                <h6 className="font-semibold text-neutral-900 dark:text-white">Select a Project Type</h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Choose which type of carbon offset project you want to support:</p>
                <ul className="text-xs mt-1 space-y-1 text-neutral-600 dark:text-neutral-400">
                  <li>• Renewable Energy (wind, solar farms)</li>
                  <li>• Reforestation & Forest Conservation</li>
                  <li>• Methane Capture (landfills, agriculture)</li>
                  <li>• Clean Water & Cookstoves</li>
                  <li>• Direct Air Capture Technology</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">4</div>
              <div>
                <h6 className="font-semibold text-neutral-900 dark:text-white">Determine Quantity & Budget</h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Carbon credits typically cost between $10-$50 per ton of CO₂e. Calculate how many credits you need based on your footprint and budget.</p>
                <div className="mt-2 text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                  <strong>Example:</strong> Average US individual emits ~16 tons/year. Full offset = $160-$800/year
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">5</div>
              <div>
                <h6 className="font-semibold text-neutral-900 dark:text-white">Make Your Purchase</h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Complete the transaction through the platform. Most accept credit cards or PayPal. You'll receive a certificate showing the credits retired on your behalf.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">6</div>
              <div>
                <h6 className="font-semibold text-neutral-900 dark:text-white">Track & Verify</h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Keep records of your purchase. Many platforms provide tracking dashboards showing project progress and environmental impact metrics.</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
            <h6 className="font-bold text-sm text-neutral-900 dark:text-white mb-1">⚠️ Important Tips:</h6>
            <ul className="text-xs space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Look for third-party verified projects (avoid greenwashing)</li>
              <li>• Ensure credits are "retired" and not double-counted</li>
              <li>• Consider additionality - projects that wouldn't happen without carbon finance</li>
              <li>• Buying credits doesn't replace the need to reduce emissions</li>
            </ul>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-green-600 dark:from-primary-700 dark:to-green-700 rounded-2xl p-8 md:p-12 text-white overflow-visible min-h-[200px] flex items-center">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Understanding Carbon Emissions
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Learn about carbon footprints, credits, and how you can make a positive impact on our planet.
          </p>
        </div>
        <div className="absolute right-[-20px] md:right-4 top-15 -translate-y-1/2 opacity-60 text-[100px] md:text-[140px] animate-spin-slow drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:scale-110 hover:opacity-80 transition-all duration-500 z-0 flex items-center justify-center">
          🌎
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 md:gap-4 bg-white dark:bg-neutral-800 p-2 rounded-xl shadow-soft">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-primary-600 text-white shadow-md scale-105"
                : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 shadow-soft">
        {activeTab === "emissions" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              What are Carbon Emissions?
            </h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                Carbon emissions refer to the release of carbon dioxide (CO₂) and other greenhouse gases into the atmosphere. 
                These gases trap heat and contribute to global warming and climate change.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-xl border-2 border-red-200 dark:border-red-800">
                <div className="text-4xl mb-3">🏭</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Industrial Sources</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Factories, manufacturing plants, and industrial processes are major contributors to carbon emissions through fossil fuel combustion and chemical reactions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Transportation</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Vehicles, planes, ships, and trains burning gasoline, diesel, and jet fuel account for a significant portion of global emissions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Energy Production</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Power plants burning coal, oil, and natural gas to generate electricity are among the largest sources of CO₂ emissions worldwide.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
                <div className="text-4xl mb-3">🌾</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Agriculture</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Livestock farming, rice cultivation, and agricultural practices release methane and nitrous oxide, potent greenhouse gases.
                </p>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl mt-8 border-l-4 border-primary-600">
              <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">💡 Did You Know?</h4>
              <p className="text-neutral-700 dark:text-neutral-300">
                CO₂ can remain in the atmosphere for hundreds to thousands of years, making emission reduction critical for long-term climate stability.
              </p>
            </div>
          </div>
        )}

        {activeTab === "credits" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              Understanding Carbon Credits
            </h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                A carbon credit represents the right to emit one metric ton of CO₂ or equivalent greenhouse gas. 
                They are used in cap-and-trade systems to incentivize emission reductions.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-100 to-green-100 dark:from-primary-900/30 dark:to-green-900/30 p-8 rounded-xl mt-6">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">How Carbon Credits Work</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">Emission Cap</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">Governments or regulatory bodies set a limit on total emissions allowed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">Credit Allocation</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">Credits are distributed or auctioned to companies that produce emissions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">Trading System</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">Companies can buy, sell, or trade credits based on their needs and performance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">Emission Reduction</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">Companies are incentivized to reduce emissions to save money on credits.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl border-2 border-green-300 dark:border-green-700">
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">✅ Benefits</h4>
                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li>• Market-based emission reduction</li>
                  <li>• Financial incentive for clean technology</li>
                  <li>• Flexibility in achieving targets</li>
                  <li>• Supports renewable energy projects</li>
                  <li>• Encourages innovation</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">⚠️ Challenges</h4>
                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                  <li>• Price volatility in markets</li>
                  <li>• Verification and monitoring costs</li>
                  <li>• Potential for greenwashing</li>
                  <li>• Unequal global implementation</li>
                  <li>• Complexity of regulations</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "scopes" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              The Three Scopes of Emissions
            </h2>
            
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              The Greenhouse Gas Protocol categorizes emissions into three scopes to help organizations measure and manage their carbon footprint comprehensively.
            </p>

            <div className="space-y-6 mt-8">
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 md:p-8 rounded-xl border-l-8 border-red-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-5xl">🔥</div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Scope 1: Direct Emissions</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Emissions from sources you own or control</p>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-neutral-800/50 p-4 rounded-lg">
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Examples:</h4>
                  <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                    <li>• Company vehicles and fleet fuel combustion</li>
                    <li>• On-site fuel burning for heating or manufacturing</li>
                    <li>• Emissions from chemical reactions in production</li>
                    <li>• Refrigerant leaks from air conditioning systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 md:p-8 rounded-xl border-l-8 border-yellow-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-5xl">⚡</div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Scope 2: Indirect Energy Emissions</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Emissions from purchased energy</p>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-neutral-800/50 p-4 rounded-lg">
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Examples:</h4>
                  <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                    <li>• Electricity purchased from the grid</li>
                    <li>• Purchased steam for industrial processes</li>
                    <li>• Purchased heating and cooling</li>
                    <li>• Office and facility electricity consumption</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 md:p-8 rounded-xl border-l-8 border-blue-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-5xl">🌐</div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Scope 3: Other Indirect Emissions</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Emissions from your value chain</p>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-neutral-800/50 p-4 rounded-lg">
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Examples:</h4>
                  <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                    <li>• Business travel (flights, hotels, rental cars)</li>
                    <li>• Employee commuting</li>
                    <li>• Purchased goods and services from suppliers</li>
                    <li>• Waste disposal and treatment</li>
                    <li>• Transportation and distribution</li>
                    <li>• Use of sold products by customers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl mt-8">
              <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">📌 Why This Matters</h4>
              <p className="text-neutral-700 dark:text-neutral-300">
                Understanding these scopes helps organizations identify their biggest emission sources and develop targeted reduction strategies. 
                Scope 3 often represents the largest portion (up to 90%) of a company's total carbon footprint.
              </p>
            </div>
          </div>
        )}

        {activeTab === "reduction" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              How to Reduce Carbon Emissions
            </h2>
            
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Both individuals and organizations can take meaningful action to reduce their carbon footprint. 
              Here are proven strategies that make a real difference.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {[
                {
                  icon: "💡",
                  title: "Energy Efficiency",
                  description: "Switch to LED lighting, upgrade insulation, use energy-efficient appliances",
                  impact: "High Impact"
                },
                {
                  icon: "☀️",
                  title: "Renewable Energy",
                  description: "Install solar panels, purchase renewable energy credits, choose green energy providers",
                  impact: "High Impact"
                },
                {
                  icon: "🚴",
                  title: "Sustainable Transport",
                  description: "Walk, bike, carpool, use public transit, switch to electric vehicles",
                  impact: "Medium Impact"
                },
                {
                  icon: "♻️",
                  title: "Waste Reduction",
                  description: "Recycle, compost, reduce single-use plastics, buy less packaging",
                  impact: "Medium Impact"
                },
                {
                  icon: "🌱",
                  title: "Plant-Based Diet",
                  description: "Reduce meat consumption, buy local produce, minimize food waste",
                  impact: "Medium Impact"
                },
                {
                  icon: "🏢",
                  title: "Remote Work",
                  description: "Work from home when possible, reduce office energy use, virtual meetings",
                  impact: "Low-Medium Impact"
                },
              ].map((action, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-700 dark:to-neutral-800 p-6 rounded-xl border-2 border-neutral-200 dark:border-neutral-600 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{action.title}</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-3">{action.description}</p>
                  <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                    {action.impact}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-xl mt-8 border-2 border-green-300 dark:border-green-700">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">🎯 Quick Wins for Businesses</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Immediate Actions:</h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li>✓ Conduct an energy audit</li>
                    <li>✓ Switch to cloud computing</li>
                    <li>✓ Implement recycling programs</li>
                    <li>✓ Optimize delivery routes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Long-term Strategies:</h4>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li>✓ Set science-based targets</li>
                    <li>✓ Invest in green technology</li>
                    <li>✓ Engage suppliers on emissions</li>
                    <li>✓ Develop circular economy models</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
              <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">⚡ Remember</h4>
              <p className="text-neutral-700 dark:text-neutral-300">
                Every action counts! Even small changes, when multiplied across millions of people and thousands of companies, 
                create significant positive impact on our climate.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 shadow-soft">
        <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <span className="font-medium text-left text-neutral-900 dark:text-white">
                  {faq.question}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${expandedFaq === index ? "rotate-180" : ""}`}>
                  ⌄
                </span>
              </button>
              {expandedFaq === index && (
                <div className="px-6 py-4 bg-white dark:bg-neutral-800 animate-fade-in">
                  <p className="text-neutral-700 dark:text-neutral-300">{faq.answer}</p>
                  {faq.details && <div className="mt-2">{faq.details}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-600 to-green-600 dark:from-primary-700 dark:to-green-700 rounded-xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Action?</h2>
        <p className="text-lg mb-6 text-white/90">
          Start tracking your carbon emissions today and make data-driven decisions for a sustainable future.
        </p>
        <button 
          onClick={() => navigate("/data-entry")}
          className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-neutral-100 transition-colors shadow-lg"
        >
          Start Tracking Now →
        </button>
      </div>
    </div>
  );
};

export default Learn;
