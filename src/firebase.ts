import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtfrZpFTZSOVwlbVGggY7oZ4tNMsOVokI",
  authDomain: "seniorsync-live.firebaseapp.com",
  projectId: "seniorsync-live",
  storageBucket: "seniorsync-live.firebasestorage.app",
  messagingSenderId: "319496357662",
  appId: "1:319496357662:web:d02f24476ab575b62b2b0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper function to log hydration
export async function logHydration(amount: number = 1) {
  try {
    await addDoc(collection(db, 'hydration'), {
      amount,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error logging hydration:', error);
    throw error;
  }
}

// Helper function to mark medication as taken
export async function markMedicationAsTaken(medicationId: string) {
  try {
    const medicationRef = doc(db, 'medications', medicationId);
    await updateDoc(medicationRef, {
      taken: true,
      takenAt: Timestamp.now(),
      missed: false,
    });
  } catch (error) {
    console.error('Error marking medication as taken:', error);
    throw error;
  }
}

// Helper function to send caregiver action (nudge)
export async function sendCaregiverAction(action: string, data?: any) {
  try {
    await addDoc(collection(db, 'caregiverActions'), {
      action,
      data,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error sending caregiver action:', error);
    throw error;
  }
}
