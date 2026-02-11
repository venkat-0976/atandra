import React, { useState, useEffect, useRef } from 'react'; // ✅ UPDATED: added useRef
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, get } from 'firebase/database'; // ✅ UPDATED: removed unused imports (query, orderByChild, limitToFirst, startAt, endAt)
import { rtdb } from '@/lib/firebase';
import { useLocation } from 'react-router-dom'; // ✅ UPDATED: removed unused Link

interface PopupData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  buttonText: string;
  buttonUrl: string;
  createdAt?: number;
}

const EventPopup: React.FC = () => {
  // Popup is disabled - return null to prevent showing
  // return null;

  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [hasClosedManually, setHasClosedManually] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const location = useLocation();

  // ✅ ADDED: refs to clear timers (prevents multiple popups / memory leaks)
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // ✅ ADDED: helper to clear timers
  const clearTimers = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  };

  // Check if we're on an admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  // If we're on an admin page, don't show the popup
  if (isAdminPage) {
    console.log("EventPopup: On admin page, not showing popup");
    return null;
  }

  // ✅ UPDATED: now uses refs so it can be cancelled/cleaned up
  const showPopupWithDelay = (popupData: PopupData, delay: number = 3000) => {
    console.log("EventPopup: showPopupWithDelay called with popup:", popupData.id, "delay:", delay);
    setPopup(popupData);

    clearTimers(); // ✅ ADDED

    // Show popup after delay to allow main screen to load first
    timeoutRef.current = window.setTimeout(() => { // ✅ UPDATED
      console.log("EventPopup: Showing popup now");
      setIsOpen(true);

      setCountdown(20);

      intervalRef.current = window.setInterval(() => { // ✅ UPDATED
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearTimers(); // ✅ UPDATED (was clearInterval)
            console.log("EventPopup: Auto-closing popup after countdown");
            setIsOpen(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }, delay);
  };

  // ✅ UPDATED: DO NOT clear session storage (this was forcing popup to show every refresh)
  useEffect(() => {
    const popupClosedInSession = sessionStorage.getItem('popupClosedInSession'); // ✅ UPDATED (removed removeItem)

    if (popupClosedInSession) {
      console.log("EventPopup: Popup was closed in this session, won't show again");
      setHasClosedManually(true);
    } else {
      console.log("EventPopup: New session, popup can be shown");
      setHasClosedManually(false);
    }
  }, []);

  // Fetch active popup from Realtime Database
  useEffect(() => {
    if (hasClosedManually) {
      console.log("EventPopup: User has manually closed popup, not fetching");
      return;
    }

    const fetchActivePopup = async () => {
      try {
        console.log("EventPopup: Fetching active popups from Realtime Database");
        const now = Date.now(); // ✅ UPDATED (was new Date().getTime())

        const popupsRef = ref(rtdb, 'popups');
        const snapshot = await get(popupsRef);
        // console.log("[POPUP DEBUG] DB exists?", snapshot.exists(), snapshot.val());

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("EventPopup: Found popup data:", Object.keys(data).length, "entries");

          let activePopup: PopupData | null = null; // ✅ UPDATED: typed
          let mostRecentDate = 0;

          Object.keys(data).forEach((key) => {
            const popupData = data[key];
            if (!popupData) return; // ✅ ADDED

            // ✅ UPDATED: strict checks so "false" doesn't become true
            const isActive = popupData.active === true;

            const startDate = Number(popupData.startDate);
            const endDate = Number(popupData.endDate);
            const createdAt = Number(popupData.createdAt || 0);

            const hasImage = Boolean(popupData.imageUrl); // ✅ ADDED
            const isStarted = startDate <= now;
            const isNotEnded = endDate >= now;

            // ✅ UPDATED: require image + active + within date window
            if (isActive && hasImage && isStarted && isNotEnded) {
              if (createdAt > mostRecentDate) {
                mostRecentDate = createdAt;
                activePopup = {
                  id: key,
                  title: popupData.title || '',
                  description: popupData.description || '',
                  imageUrl: popupData.imageUrl || '',
                  active: true,
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                  buttonText: popupData.buttonText || 'Learn More',
                  buttonUrl: popupData.buttonUrl || '/contact/sales',
                  createdAt
                };
              }
            }
          });

          if (activePopup) {
            console.log("EventPopup: Found active popup:", activePopup.id);
            showPopupWithDelay(activePopup);
          } else {
            // ✅ UPDATED: NO FALLBACK (this was the reason popup still showed)
            console.log("EventPopup: No active popup found. Not showing any popup.");
            setPopup(null); // ✅ ADDED
            setIsOpen(false); // ✅ ADDED
            setCountdown(null); // ✅ ADDED
          }
        } else {
          // ✅ UPDATED: NO FALLBACK when DB empty
          console.log("EventPopup: No popups found in database. Not showing any popup.");
          setPopup(null); // ✅ ADDED
        }
      } catch (error) {
        console.error('EventPopup: Error fetching popup:', error);
        // ✅ UPDATED: NO FALLBACK on error
        setPopup(null); // ✅ ADDED
      }
    };

    fetchActivePopup();

    // ✅ ADDED: cleanup timers on unmount
    return () => clearTimers();
  }, [hasClosedManually]);

  const handleClose = () => {
    clearTimers(); // ✅ ADDED
    setIsOpen(false);
    setCountdown(null);
    setHasClosedManually(true);
    sessionStorage.setItem('popupClosedInSession', 'true');
  };

  if (!popup) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative flex items-center justify-center rounded-xl overflow-hidden shadow-2xl bg-transparent"
            style={{
              width: '90%',
              maxWidth: '600px',
              height: 'auto',
              maxHeight: '70vh',
              aspectRatio: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
              aria-label="Close popup"
            >
              <X size={28} strokeWidth={3} />
            </button>

            {countdown !== null && (
              <div className="absolute top-4 left-4 z-10 bg-white/80 text-black px-3 py-1 rounded-full shadow-lg font-medium">
                Closes in {countdown}s
              </div>
            )}

            <img
              src={popup.imageUrl}
              alt={popup.title || "Event popup"}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventPopup;
