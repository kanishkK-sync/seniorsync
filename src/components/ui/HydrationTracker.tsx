import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HydrationTracker() {
  const navigate = useNavigate();
  const [filled, setFilled] = useState(5); // Start with 5 filled

  const toggleGlass = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index < filled) {
      setFilled(index);
    } else {
      setFilled(index + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
      onClick={() => navigate('/hydration')}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-medical-blue/10 rounded-xl">
            <Droplet className="w-5 h-5 text-medical-blue" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Hydration</h3>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, index) => {
          const isFilled = index < filled;
          return (
            <motion.button
              key={index}
              onClick={(e) => toggleGlass(index, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative aspect-square rounded-2xl overflow-hidden glass border-2 transition-all duration-300"
              style={{
                borderColor: isFilled ? '#0ea5e9' : 'rgba(226, 232, 240, 0.5)',
              }}
            >
              <motion.div
                initial={false}
                animate={{
                  height: isFilled ? '100%' : '0%',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-medical-blue to-medical-blue-dark"
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <Droplet
                  className={`w-6 h-6 transition-colors ${
                    isFilled ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-3xl font-bold text-slate-900">{filled}/8</p>
        <p className="text-sm text-slate-600 mt-1">Glasses Today</p>
      </div>
    </motion.div>
  );
}

