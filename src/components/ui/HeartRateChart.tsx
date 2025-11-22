import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Heart } from 'lucide-react';
import { mockHeartRateData } from '../../data/mockData';

export function HeartRateChart() {
  const averageBpm = Math.round(
    mockHeartRateData.reduce((sum, d) => sum + d.bpm, 0) / mockHeartRateData.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-xl">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Heart Rate</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">{averageBpm}</p>
          <p className="text-xs text-slate-600">Avg BPM</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockHeartRateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[55, 90]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#64748b', fontSize: '12px' }}
            />
            <Area
              type="monotone"
              dataKey="bpm"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#colorHeartRate)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-slate-600">Last 24 Hours</span>
        </div>
        <div className="text-slate-600">
          Range: {Math.min(...mockHeartRateData.map(d => d.bpm))} -{' '}
          {Math.max(...mockHeartRateData.map(d => d.bpm))} BPM
        </div>
      </div>
    </motion.div>
  );
}

