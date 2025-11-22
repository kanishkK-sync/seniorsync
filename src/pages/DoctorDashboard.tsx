import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, onSnapshot, getDocs } from 'firebase/firestore';
import { db, logHydration, markMedicationAsTaken, sendCaregiverAction } from '../firebase';
import { ActivityRing } from '../components/ui/ActivityRing';
import { HydrationTracker } from '../components/ui/HydrationTracker';
import { MedicationTimeline } from '../components/ui/MedicationTimeline';
import { HeartRateChart } from '../components/ui/HeartRateChart';
import { VoiceAssistant } from '../components/ui/VoiceAssistant';
import type { Medication } from '../data/mockData';

export function DoctorDashboard() {
  const [steps, setSteps] = useState(0);
  const [hydration, setHydration] = useState(0);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);

  // Listen to steps collection - get the latest document
  useEffect(() => {
    const stepsQuery = query(
      collection(db, 'steps'),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(stepsQuery, (snapshot) => {
      if (!snapshot.empty) {
        const latestStep = snapshot.docs[0].data();
        setSteps(latestStep.count || latestStep.steps || 0);
        setCalories(latestStep.calories || 0);
        setDistance(latestStep.distance || 0);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to hydration collection - get the latest document
  useEffect(() => {
    const hydrationQuery = query(
      collection(db, 'hydration'),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(hydrationQuery, async (snapshot) => {
      if (!snapshot.empty) {
        // Get today's total hydration
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayQuery = query(
          collection(db, 'hydration'),
          orderBy('timestamp', 'desc')
        );
        
        const todaySnapshot = await getDocs(todayQuery);
        let totalAmount = 0;
        
        todaySnapshot.forEach((doc) => {
          const data = doc.data();
          const timestamp = data.timestamp?.toDate();
          if (timestamp && timestamp >= today) {
            totalAmount += data.amount || 0;
          }
        });
        
        setHydration(totalAmount);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to medications collection - get all documents
  useEffect(() => {
    const medicationsQuery = query(
      collection(db, 'medications'),
      orderBy('time', 'asc')
    );

    const unsubscribe = onSnapshot(medicationsQuery, (snapshot) => {
      const meds: Medication[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          time: data.time || 'morning',
          taken: data.taken || false,
          missed: data.missed || false,
          dosage: data.dosage || '',
        };
      });
      setMedications(meds);
    });

    return () => unsubscribe();
  }, []);

  // Handler for sending nudge
  const handleSendNudge = async () => {
    try {
      await sendCaregiverAction('nudge', { type: 'activity', steps });
    } catch (error) {
      console.error('Error sending nudge:', error);
    }
  };

  // Handler for logging hydration
  const handleLogHydration = async (amount: number) => {
    try {
      await logHydration(amount);
    } catch (error) {
      console.error('Error logging hydration:', error);
    }
  };

  // Handler for marking medication as taken
  const handleMarkMedicationTaken = async (medicationId: string) => {
    try {
      await markMedicationAsTaken(medicationId);
    } catch (error) {
      console.error('Error marking medication as taken:', error);
    }
  };

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
            <ActivityRing 
              steps={steps}
              goal={5000}
              calories={calories}
              distance={distance}
              onSendNudge={handleSendNudge}
            />
          </div>

          {/* Hydration Tracker - Medium Widget */}
          <div className="lg:col-span-1 xl:col-span-1">
            <HydrationTracker 
              currentAmount={hydration}
              goal={8}
              onLogHydration={handleLogHydration}
            />
          </div>

          {/* Heart Rate Chart - Medium Widget */}
          <div className="lg:col-span-1 xl:col-span-1">
            <HeartRateChart />
          </div>

          {/* Medication Timeline - Full Width Widget */}
          <div className="lg:col-span-2 xl:col-span-3">
            <MedicationTimeline 
              medications={medications}
              onMarkTaken={handleMarkMedicationTaken}
            />
          </div>
        </div>
      </motion.div>

      {/* Voice Assistant FAB */}
      <VoiceAssistant />
    </>
  );
}
