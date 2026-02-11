import React, { useEffect, useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

const TestPopupData = () => {
  const [popupData, setPopupData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        setLoading(true);
        const popupsRef = ref(rtdb, 'popups');
        const snapshot = await get(popupsRef);

        if (snapshot.exists()) {
          setPopupData(snapshot.val());
        } else {
          setPopupData(null);
        }
      } catch (err) {
        console.error('Error fetching popup data:', err);
        setError('Failed to fetch popup data');
      } finally {
        setLoading(false);
      }
    };

    fetchPopupData();
  }, []);

  const createTestPopup = async () => {
    try {
      const now = new Date();
      const startDate = now.getTime();
      const endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).getTime(); // 7 days from now

      const newPopupRef = ref(rtdb, 'popups/test-popup');
      await set(newPopupRef, {
        title: 'Test Popup',
        description: 'This is a test popup created for debugging',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/atandra.firebasestorage.app/o/Atandraimages%2F1726217762752.png?alt=media&token=e41fb4ea-2a6a-4343-a670-566f7d0542d8',
        active: true,
        startDate: startDate,
        endDate: endDate,
        buttonText: 'Learn More',
        buttonUrl: '/contact/sales',
        createdAt: now
      });

      alert('Test popup created successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Error creating test popup:', err);
      alert('Failed to create test popup');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Popup Data Test</h2>

      {loading ? (
        <p>Loading popup data...</p>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">Current Popup Data:</h3>
          {popupData ? (
            <pre className="bg-gray-200 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(popupData, null, 2)}
            </pre>
          ) : (
            <p>No popup data found in the database.</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <Button onClick={createTestPopup} className="bg-blue-500 hover:bg-blue-600 text-white">
          Create Test Popup
        </Button>
        <p className="mt-2 text-sm text-gray-600">
          This will create a test popup that is active for the next 7 days.
        </p>
      </div>
    </div>
  );
};

export default TestPopupData;
