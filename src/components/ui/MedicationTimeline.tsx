import { motion } from 'framer-motion';
import { Pill, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Medication } from '../../data/mockData';
import { cn } from '../../lib/utils';

const timeLabels = {
  morning: { label: 'Morning', icon: '🌅', color: 'bg-yellow-100 text-yellow-700' },
  noon: { label: 'Noon', icon: '☀️', color: 'bg-orange-100 text-orange-700' },
  night: { label: 'Night', icon: '🌙', color: 'bg-blue-100 text-blue-700' },
};

interface MedicationTimelineProps {
  medications?: Medication[];
  onMarkTaken?: (medicationId: string) => void;
}

export function MedicationTimeline({ 
  medications = [], 
  onMarkTaken 
}: MedicationTimelineProps) {
  const navigate = useNavigate();
  const groupedMeds = {
    morning: medications.filter(m => m.time === 'morning'),
    noon: medications.filter(m => m.time === 'noon'),
    night: medications.filter(m => m.time === 'night'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
      onClick={() => navigate('/medication')}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-medical-blue/10 rounded-xl">
            <Pill className="w-5 h-5 text-medical-blue" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Medication Schedule</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-200 via-orange-200 to-blue-200" />

        <div className="space-y-8">
          {(['morning', 'noon', 'night'] as const).map((timeKey, timeIndex) => {
            const timeInfo = timeLabels[timeKey];
            const meds = groupedMeds[timeKey];

            return (
              <div key={timeKey} className="relative pl-20">
                {/* Time Marker */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: timeIndex * 0.1 }}
                  className={cn(
                    'absolute left-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg',
                    timeInfo.color
                  )}
                >
                  {timeInfo.icon}
                </motion.div>

                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">
                    {timeInfo.label}
                  </h4>
                </div>

                {/* Medication Cards */}
                <div className="space-y-3">
                  {meds.map((med, medIndex) => (
                    <motion.div
                      key={med.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: timeIndex * 0.1 + medIndex * 0.05 }}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all duration-300',
                        med.missed
                          ? 'bg-red-50 border-red-300 shadow-lg shadow-red-200/50 animate-pulse'
                          : med.taken
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-slate-200 cursor-pointer hover:border-medical-blue'
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!med.taken && !med.missed && onMarkTaken) {
                          onMarkTaken(med.id);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Pill
                            className={cn(
                              'w-5 h-5',
                              med.missed
                                ? 'text-red-500'
                                : med.taken
                                ? 'text-green-500'
                                : 'text-slate-400'
                            )}
                          />
                          <div>
                            <p className="font-semibold text-slate-900">{med.name}</p>
                            <p className="text-xs text-slate-600">{med.dosage}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {med.missed && (
                            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                              Missed
                            </span>
                          )}
                          {med.taken && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              Taken
                            </span>
                          )}
                          {!med.taken && !med.missed && (
                            <Clock className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

