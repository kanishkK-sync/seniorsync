import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Droplet, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockHydrationLog } from '../../data/mockData';

export function HydrationDetail() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState(8);
  const todayIntake = mockHydrationLog.length;

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
            <Droplet className="w-6 h-6 text-medical-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Hydration Details</h1>
            <p className="text-sm text-slate-600">Track your daily water intake</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Today's Progress</h2>
            <Target className="w-6 h-6 text-medical-blue" />
          </div>

          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-48 h-48 rounded-full border-8 border-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl font-bold text-slate-900">{todayIntake}</p>
                  <p className="text-sm text-slate-600">of {goal} glasses</p>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute inset-0 rounded-full border-8 border-medical-blue"
                style={{
                  clipPath: `inset(0 ${100 - (todayIntake / goal) * 100}% 0 0)`,
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Daily Goal</span>
              <span className="text-lg font-semibold text-slate-900">{goal} glasses</span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-medical-blue"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>4</span>
              <span>8</span>
              <span>12</span>
            </div>
          </div>
        </motion.div>

        {/* History Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Intake History</h2>
          <div className="space-y-3">
            {mockHydrationLog.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-medical-blue/10 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-medical-blue" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{log.amount} glass</p>
                  <p className="text-sm text-slate-600">{log.time}</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-medical-blue" />
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-slate-900">{todayIntake}</p>
                <p className="text-xs text-slate-600">Today</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-slate-900">
                  {Math.round((todayIntake / goal) * 100)}%
                </p>
                <p className="text-xs text-slate-600">Goal Progress</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

