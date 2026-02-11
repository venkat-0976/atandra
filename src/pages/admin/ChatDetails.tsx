import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ArrowLeft, User, Phone, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface UserSubmission {
  id: string;
  name: string;
  mobile: string;
  email: string;
  timestamp: Date;
  messages: Message[];
}

const ChatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<UserSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const submissionRef = ref(rtdb, `userSubmissions/${id}`);
        const snapshot = await get(submissionRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          console.log("Fetched submission data:", data);

          // Process messages if they exist
          let processedMessages: Message[] = [];
          if (data.messages) {
            // Convert messages object to array
            processedMessages = Object.keys(data.messages).map(msgKey => {
              const msg = data.messages[msgKey];

              // Handle different timestamp formats
              let msgTimestamp;
              if (msg.timestamp) {
                if (typeof msg.timestamp === 'number') {
                  msgTimestamp = new Date(msg.timestamp);
                } else if (msg.timestamp.seconds) {
                  msgTimestamp = new Date(msg.timestamp.seconds * 1000);
                } else if (typeof msg.timestamp === 'object' && msg.timestamp.toDate) {
                  msgTimestamp = msg.timestamp.toDate();
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

          // Handle timestamp which could be a number or an object with .seconds
          let timestamp;
          if (data.timestamp) {
            if (typeof data.timestamp === 'number') {
              timestamp = new Date(data.timestamp);
            } else if (data.timestamp.seconds) {
              timestamp = new Date(data.timestamp.seconds * 1000);
            } else {
              timestamp = new Date();
            }
          } else {
            timestamp = new Date();
          }

          setSubmission({
            id,
            name: data.name || 'Unknown',
            mobile: data.mobile || 'Not provided',
            email: data.email || 'Not provided',
            timestamp: timestamp,
            messages: processedMessages
          });
        } else {
          setError('Submission not found');
        }
      } catch (error) {
        console.error('Error fetching submission details:', error);
        setError('Failed to load submission details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-blue-300">Loading chat details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-6 rounded-md">
        <h3 className="text-xl font-bold mb-2">Error</h3>
        <p>{error}</p>
        <Button
          className="mt-4 bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate('/admin/user-submissions')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to User Submissions
        </Button>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="bg-blue-900/50 border border-blue-500/50 text-blue-200 p-6 rounded-md">
        <h3 className="text-xl font-bold mb-2">Submission Not Found</h3>
        <p>The requested submission could not be found.</p>
        <Button
          className="mt-4 bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate('/admin/user-submissions')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to User Submissions
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          className="mr-4 border-blue-500 text-blue-300 hover:bg-blue-900/50"
          onClick={() => navigate('/admin/user-submissions')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Chat Details</h2>
      </div>

      {/* User Info Card */}
      <Card className="mb-6 bg-blue-900/20 border-blue-800/50">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription className="text-blue-300">
            Details of the user who submitted this chat
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-3 text-blue-400" />
            <div>
              <p className="text-sm text-blue-300">Name</p>
              <p className="font-medium">{submission.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-3 text-blue-400" />
            <div>
              <p className="text-sm text-blue-300">Mobile</p>
              <p className="font-medium">{submission.mobile}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-3 text-blue-400" />
            <div>
              <p className="text-sm text-blue-300">Email</p>
              <p className="font-medium">{submission.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-3 text-blue-400" />
            <div>
              <p className="text-sm text-blue-300">Submitted On</p>
              <p className="font-medium">{format(submission.timestamp, 'MMM d, yyyy h:mm a')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="bg-blue-900/20 border-blue-800/50">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription className="text-blue-300">
            Chat history between the user and the AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submission.messages && submission.messages.length > 0 ? (
            <div className="space-y-4">
              {submission.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                      message.isBot
                        ? "bg-blue-900 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {format(message.timestamp, 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-blue-300">
              <p>No messages found in this conversation.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-blue-800/30 pt-4">
          <p className="text-sm text-blue-300">
            Total messages: {submission.messages?.length || 0}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatDetails;
