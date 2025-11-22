import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockActivityData } from '../../data/mockData';

export function ActivityRing() {
  const navigate = useNavigate();
  const percentage = Math.round((mockActivityData.steps / mockActivityData.goal) * 100);
  const showNudge = mockActivityData.steps < 5000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
      onClick={() => navigate('/activity')}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-medical-blue/10 rounded-xl">
            <Activity className="w-5 h-5 text-medical-blue" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Daily Activity</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-48 h-48 mb-4">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathColor: '#0ea5e9',
              textColor: '#1e293b',
              trailColor: '#e2e8f0',
              textSize: '20px',
            })}
          />
        </div>
        
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-slate-900 mb-1">
            {mockActivityData.steps.toLocaleString()}
          </p>
          <p className="text-sm text-slate-600">of {mockActivityData.goal.toLocaleString()} steps</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-slate-900">{mockActivityData.calories}</p>
            <p className="text-xs text-slate-600">Calories</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-2xl font-bold text-slate-900">{mockActivityData.distance}</p>
            <p className="text-xs text-slate-600">Miles</p>
          </div>
        </div>

        <AnimatePresence>
          {showNudge && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Send Nudge');
              }}
              className="mt-6 w-full bg-medical-blue text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Send Nudge
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

