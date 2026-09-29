import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function AnalyticsChart({ data, metric, range }) {
  return (
    <div className="analytics-card glass-panel">
      <div className="section-header compact">
        <div>
          <p className="eyebrow">Analytics</p>
          <h3>{metric}</h3>
        </div>
        <div className="range-pill">{range}</div>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="eco-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#4ade80" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="rgba(148, 163, 184, 0.8)" />
            <YAxis stroke="rgba(148, 163, 184, 0.8)" />
            <Tooltip
              contentStyle={{
                background: 'rgba(8, 15, 14, 0.9)',
                border: '1px solid rgba(94, 234, 212, 0.3)',
                borderRadius: '16px',
              }}
            />
            <Area type="monotone" dataKey={metric.toLowerCase()} stroke="#67e8f9" fill="url(#eco-fill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
