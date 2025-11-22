import { motion } from 'framer-motion';
import { ActivityRing } from '../components/ui/ActivityRing';
import { HydrationTracker } from '../components/ui/HydrationTracker';
import { MedicationTimeline } from '../components/ui/MedicationTimeline';
import { HeartRateChart } from '../components/ui/HeartRateChart';
import { VoiceAssistant } from '../components/ui/VoiceAssistant';

export function DoctorDashboard() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        {/* Bento Box Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Activity Ring - Large Widget */}
          <div className="lg:col-span-1 xl:col-span-1">
            <ActivityRing />
          </div>

          {/* Hydration Tracker - Medium Widget */}
          <div className="lg:col-span-1 xl:col-span-1">
            <HydrationTracker />
          </div>

          {/* Heart Rate Chart - Medium Widget */}
          <div className="lg:col-span-1 xl:col-span-1">
            <HeartRateChart />
          </div>

          {/* Medication Timeline - Full Width Widget */}
          <div className="lg:col-span-2 xl:col-span-3">
            <MedicationTimeline />
          </div>
        </div>
      </motion.div>

      {/* Voice Assistant FAB */}
      <VoiceAssistant />
    </>
  );
}

