import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppShell } from './components/layout/AppShell';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { ActivityDetail } from './pages/details/ActivityDetail';
import { HydrationDetail } from './pages/details/HydrationDetail';
import { MedicationDetail } from './pages/details/MedicationDetail';

function AppRoutes() {
  const location = useLocation();

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DoctorDashboard />} />
          <Route path="/activity" element={<ActivityDetail />} />
          <Route path="/hydration" element={<HydrationDetail />} />
          <Route path="/medication" element={<MedicationDetail />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
