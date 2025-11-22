import { motion } from 'framer-motion';
import { ArrowLeft, Pill, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockMedicationAdherence, mockMedications } from '../../data/mockData';
import { cn } from '../../lib/utils';

export function MedicationDetail() {
  const navigate = useNavigate();
  const totalDays = mockMedicationAdherence.length;
  const totalTaken = mockMedicationAdherence.reduce((sum, day) => sum + day.taken, 0);
  const totalPossible = mockMedicationAdherence.reduce((sum, day) => sum + day.total, 0);
  const adherenceRate = Math.round((totalTaken / totalPossible) * 100);

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
            <Pill className="w-6 h-6 text-medical-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Medication Adherence</h1>
            <p className="text-sm text-slate-600">Monthly calendar and statistics</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <p className="text-sm text-slate-600 mb-2">Adherence Rate</p>
          <p className="text-4xl font-bold text-slate-900">{adherenceRate}%</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <p className="text-sm text-slate-600 mb-2">Total Taken</p>
          <p className="text-4xl font-bold text-green-600">{totalTaken}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <p className="text-sm text-slate-600 mb-2">Missed Doses</p>
          <p className="text-4xl font-bold text-red-500">
            {totalPossible - totalTaken}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <p className="text-sm text-slate-600 mb-2">Days Tracked</p>
          <p className="text-4xl font-bold text-slate-900">{totalDays}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-medical-blue" />
            <h2 className="text-xl font-semibold text-slate-900">Weekly Calendar</h2>
          </div>
          <div className="space-y-3">
            {mockMedicationAdherence.map((day, index) => {
              const date = new Date(day.date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNumber = date.getDate();
              const isPerfect = day.taken === day.total;

              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all',
                    isPerfect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs text-slate-600">{dayName}</p>
                        <p className="text-2xl font-bold text-slate-900">{dayNumber}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isPerfect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="font-semibold text-slate-900">
                            {day.taken} / {day.total} medications
                          </span>
                        </div>
                        {day.missed.length > 0 && (
                          <p className="text-sm text-red-600">
                            Missed: {day.missed.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">
                        {Math.round((day.taken / day.total) * 100)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Medication List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Current Medications</h2>
          <div className="space-y-4">
            {mockMedications.map((med, index) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 bg-slate-50 rounded-xl"
              >
                <div className="flex items-start justify-between mb-2">
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
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={cn(
                      'text-xs px-2 py-1 rounded-full font-semibold',
                      med.time === 'morning'
                        ? 'bg-yellow-100 text-yellow-700'
                        : med.time === 'noon'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    )}
                  >
                    {med.time}
                  </span>
                  {med.taken && (
                    <span className="text-xs px-2 py-1 rounded-full font-semibold bg-green-100 text-green-700">
                      Taken
                    </span>
                  )}
                  {med.missed && (
                    <span className="text-xs px-2 py-1 rounded-full font-semibold bg-red-100 text-red-700">
                      Missed
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

