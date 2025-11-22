import { motion } from 'framer-motion';
import { ArrowLeft, Activity, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { mockWeeklySteps, mockMovementLog } from '../../data/mockData';

export function ActivityDetail() {
  const navigate = useNavigate();
  const totalSteps = mockWeeklySteps.reduce((sum, day) => sum + day.steps, 0);
  const avgSteps = Math.round(totalSteps / mockWeeklySteps.length);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-medical-blue/10 rounded-xl">
            <Activity className="w-6 h-6 text-medical-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Activity Details</h1>
            <p className="text-sm text-slate-600">Weekly overview and movement log</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <p className="text-sm text-slate-600 mb-2">Total Steps (Week)</p>
          <p className="text-4xl font-bold text-slate-900">{totalSteps.toLocaleString()}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <p className="text-sm text-slate-600 mb-2">Average Daily</p>
          <p className="text-4xl font-bold text-slate-900">{avgSteps.toLocaleString()}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <p className="text-sm text-slate-600">Weekly Trend</p>
          </div>
          <p className="text-4xl font-bold text-green-600">+12%</p>
        </motion.div>
      </div>

      {/* Weekly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Weekly Steps</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockWeeklySteps} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px 12px',
                }}
              />
              <Bar dataKey="steps" radius={[8, 8, 0, 0]}>
                {mockWeeklySteps.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.steps >= 5000 ? '#0ea5e9' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Movement Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {mockMovementLog.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-medical-blue" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{log.activity}</p>
                  <p className="text-sm text-slate-600">{log.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{log.duration}</p>
                <p className="text-sm text-slate-600">{log.calories} cal</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

