import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { Search, User, Phone, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface UserSubmission {
  id: string;
  name: string;
  mobile: string;
  email: string;
  timestamp: Date;
  messages?: { text: string; isBot: boolean; timestamp: Date }[];
}

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<UserSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // Fetch user submissions from Realtime Database
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const submissionsRef = ref(rtdb, 'userSubmissions');
        const snapshot = await get(submissionsRef);

        const fetchedSubmissions: UserSubmission[] = [];

        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convert object to array
          Object.keys(data).forEach((key) => {
            const submissionData = data[key];

            if (!submissionData) return;

            // Process messages if they exist
            let processedMessages = [];
            if (submissionData.messages) {
              // Convert messages object to array
              processedMessages = Object.keys(submissionData.messages).map(msgKey => {
                const msg = submissionData.messages[msgKey];

                // Handle timestamp
                let msgTimestamp;
                if (msg.timestamp) {
                  if (typeof msg.timestamp === 'number') {
                    msgTimestamp = new Date(msg.timestamp);
                  } else if (msg.timestamp.seconds) {
                    msgTimestamp = new Date(msg.timestamp.seconds * 1000);
                  } else {
                    msgTimestamp = new Date();
                  }
                } else {
                  msgTimestamp = new Date();
                }

                return {
                  id: msgKey,
                  text: msg.text || '',
                  isBot: msg.isBot || false,
                  timestamp: msgTimestamp
                };
              });

              // Sort messages by timestamp
              processedMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
            }

            // Handle timestamp
            let timestamp;
            if (submissionData.timestamp) {
              if (typeof submissionData.timestamp === 'number') {
                timestamp = new Date(submissionData.timestamp);
              } else if (submissionData.timestamp.seconds) {
                timestamp = new Date(submissionData.timestamp.seconds * 1000);
              } else {
                timestamp = new Date();
              }
            } else {
              timestamp = new Date();
            }

            fetchedSubmissions.push({
              id: key,
              name: submissionData.name || 'Unknown',
              mobile: submissionData.mobile || 'Not provided',
              email: submissionData.email || 'Not provided',
              timestamp: timestamp,
              messages: processedMessages
            });
          });

          // Sort by timestamp in descending order
          fetchedSubmissions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        }

        setSubmissions(fetchedSubmissions);
        setFilteredSubmissions(fetchedSubmissions);
      } catch (error) {
        console.error('Error fetching user submissions:', error);
        setError('Failed to load user submissions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Filter submissions based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSubmissions(submissions);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = submissions.filter(
      (submission) =>
        submission.name.toLowerCase().includes(query) ||
        submission.mobile.toLowerCase().includes(query) ||
        submission.email.toLowerCase().includes(query)
    );

    setFilteredSubmissions(filtered);
  }, [searchQuery, submissions]);



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Submissions</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
          <Input
            placeholder="Search by name, mobile or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-blue-900/20 border-blue-700/50 text-white w-64"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-blue-300">Loading user submissions...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-blue-800 rounded-lg">
          <User className="h-12 w-12 mx-auto text-blue-700 opacity-50" />
          <h3 className="mt-4 text-xl font-medium text-blue-300">
            {searchQuery ? 'No matching submissions found' : 'No user submissions yet'}
          </h3>
          <p className="mt-2 text-blue-400/70">
            {searchQuery
              ? 'Try a different search term or clear the search'
              : 'User submissions will appear here when users interact with the chatbot'}
          </p>
          {searchQuery && (
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="border border-blue-800/50 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-blue-900/30">
              <TableRow className="hover:bg-blue-900/50 border-blue-800/50">
                <TableHead className="text-blue-300 w-1/4">Name</TableHead>
                <TableHead className="text-blue-300 w-1/4">Mobile</TableHead>
                <TableHead className="text-blue-300 w-1/4">Email</TableHead>
                <TableHead className="text-blue-300 w-1/4">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow
                  key={submission.id}
                  className="hover:bg-blue-900/20 border-blue-800/30"
                >
                  <TableCell className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-400" />
                    {submission.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-blue-400" />
                      {submission.mobile}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-blue-400" />
                      {submission.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                      {format(submission.timestamp, 'MMM d, yyyy h:mm a')}
                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserSubmissions;
