import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

export function VoiceAssistant() {
  const [isActive, setIsActive] = useState(false);

  const toggleAssistant = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <motion.button
        onClick={toggleAssistant}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          fixed bottom-8 right-8 z-50
          w-16 h-16 rounded-full
          flex items-center justify-center
          shadow-2xl
          transition-all duration-300
          ${isActive 
            ? 'bg-red-500 text-white' 
            : 'bg-medical-blue text-white'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="mic-on"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <MicOff className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="mic-off"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Mic className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Waveform Animation */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-8 z-40 flex items-end gap-1 h-16"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 8 }}
                animate={{
                  height: [8, 32, 16, 40, 12, 28, 8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
                className="w-2 bg-medical-blue rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

