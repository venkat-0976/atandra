import React, { useState, useEffect } from 'react';
import { ref, get, remove } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Search, User, Phone, Mail, Calendar, Building, MapPin, Trash2, Eye, Filter, Download, X } from 'lucide-react';
import { format, isWithinInterval, startOfDay, endOfDay, parseISO } from 'date-fns';

interface ContactSubmission {
    id: string;
    name: string;
    mobile: string;
    email: string;
    company: string;
    city: string;
    pincode: string;
    designation: string;
    products: string;
    remarks: string;
    status: string;
    source: string;

    timestamp: Date;
    submittedAtRaw: string;
    timestampRaw: string;
}

const ContactSubmissions = () => {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    // Filter States
    const [showFilters, setShowFilters] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // View Modal State
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    // Fetch contact submissions using useEffect
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const submissionsRef = ref(rtdb, 'contacts');
                const snapshot = await get(submissionsRef);
                const fetchedSubmissions: ContactSubmission[] = [];

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    Object.keys(data).forEach((key) => {
                        const submissionData = data[key];
                        if (!submissionData) return;

                        // Filter for website source (case insensitive check for 'website')
                        const source = submissionData.source || '';
                        if (!source.toLowerCase().includes('website')) return;

                        // Handle timestamp parsing
                        let timestamp;
                        if (submissionData.submitted_at) {
                            timestamp = new Date(submissionData.submitted_at);
                        } else if (submissionData.timestamp) {
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

                        // Capture raw strings
                        const submittedAtRaw = submissionData.submitted_at || '';
                        const timestampRaw = typeof submissionData.timestamp === 'string'
                            ? submissionData.timestamp
                            : (submissionData.timestamp ? JSON.stringify(submissionData.timestamp) : '');

                        fetchedSubmissions.push({
                            id: key,
                            name: submissionData.name || 'Unknown',
                            mobile: submissionData.mobile || 'Not provided',
                            email: submissionData.email || 'Not provided',
                            company: submissionData.company || '',
                            city: submissionData.city || '',
                            pincode: submissionData.pincode || '',
                            designation: submissionData.designation || '',
                            products: submissionData.products || '',
                            remarks: submissionData.remarks || '',
                            status: submissionData.status || 'new',
                            source: source,

                            timestamp: timestamp,
                            submittedAtRaw: submittedAtRaw,
                            timestampRaw: timestampRaw
                        });
                    });
                    // Sort explicitly by timestamp descending
                    fetchedSubmissions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                }

                setSubmissions(fetchedSubmissions);
                setFilteredSubmissions(fetchedSubmissions);
            } catch (error) {
                console.error('Error fetching contact submissions:', error);
                setError('Failed to load contact submissions.');
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = submissions;

        // 1. Search Query Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((sub) => {
                const dateString = format(sub.timestamp, 'MMM d, yyyy').toLowerCase();
                return (
                    sub.name.toLowerCase().includes(query) ||
                    sub.mobile.toLowerCase().includes(query) ||
                    sub.email.toLowerCase().includes(query) ||
                    sub.company.toLowerCase().includes(query) ||
                    dateString.includes(query)
                );
            });
        }

        // 2. Date Range Filter
        if (startDate || endDate) {
            result = result.filter((sub) => {
                const subDate = sub.timestamp;
                const start = startDate ? startOfDay(parseISO(startDate)) : null;
                const end = endDate ? endOfDay(parseISO(endDate)) : null;

                if (start && end) {
                    return isWithinInterval(subDate, { start, end });
                } else if (start) {
                    return subDate >= start;
                } else if (end) {
                    return subDate <= end;
                }
                return true;
            });
        }

        setFilteredSubmissions(result);
    }, [searchQuery, startDate, endDate, submissions]);

    // Handle Delete
    const handleDelete = async (id: string) => {
        try {
            await remove(ref(rtdb, `contacts/${id}`));
            setSubmissions(prev => prev.filter(sub => sub.id !== id));
        } catch (error) {
            console.error("Error deleting submission:", error);
            setError("Failed to delete submission");
        }
    };

    // Handle Export to CSV
    const handleExport = () => {
        const headers = ['ID', 'Name', 'Company', 'Mobile', 'Email', 'City', 'Pincode', 'Designation', 'Products', 'Remarks', 'Source', 'Submitted At', 'Timestamp', 'Status'];
        const csvRows = filteredSubmissions.map(sub => {
            const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
            return [
                escape('\t' + sub.id),
                escape(sub.name),
                escape(sub.company),
                escape(sub.mobile),
                escape(sub.email),
                escape(sub.city),
                escape(sub.pincode),
                escape(sub.designation),
                escape(sub.products),
                escape(sub.remarks),
                escape(sub.source),
                escape(sub.submittedAtRaw || format(sub.timestamp, 'yyyy-MM-dd HH:mm:ss')),
                escape(sub.timestampRaw),
                escape(sub.status)
            ].join(',');
        });
        const csvContent = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `contact_submissions.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleView = (submission: ContactSubmission) => {
        setSelectedSubmission(submission);
        setIsViewOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center h-10"> {/* Aligned with buttons */}
                        <h2 className="text-2xl font-bold">Contact Submissions</h2>
                    </div>

                    <div className="flex flex-col items-end gap-3 z-10">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className={`border-blue-700 text-blue-300 hover:bg-blue-900/50 ${showFilters ? 'bg-blue-800/50' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                            <Button
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={handleExport}
                                disabled={filteredSubmissions.length === 0}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export Excel
                            </Button>
                        </div>

                        {/* Filter Area - Top Right */}
                        {showFilters && (
                            <div className="bg-blue-950/90 border border-blue-800 p-4 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-1 backdrop-blur-sm min-w-[480px]">
                                <div className="flex items-end gap-4">
                                    <div className="grid gap-1.5 flex-1">
                                        <label className="text-sm text-blue-300 font-medium">Start Date</label>
                                        <Input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="h-9 text-sm bg-blue-900/50 border-blue-700 text-white w-full"
                                        />
                                    </div>
                                    <div className="grid gap-1.5 flex-1">
                                        <label className="text-sm text-blue-300 font-medium">End Date</label>
                                        <Input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="h-9 text-sm bg-blue-900/50 border-blue-700 text-white w-full"
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 px-3 text-blue-300 hover:text-white hover:bg-blue-800/50"
                                        onClick={() => {
                                            setStartDate('');
                                            setEndDate('');
                                        }}
                                        title="Clear Filters"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                        <Input
                            placeholder="Search by name, company, date..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-blue-900/20 border-blue-700/50 text-white w-full"
                        />
                    </div>
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
                    <p className="mt-2 text-blue-300">Loading contact submissions...</p>
                </div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-blue-800 rounded-lg">
                    <User className="h-12 w-12 mx-auto text-blue-700 opacity-50" />
                    <h3 className="mt-4 text-xl font-medium text-blue-300">
                        {searchQuery || startDate || endDate ? 'No matching submissions found' : 'No contact submissions yet'}
                    </h3>
                    <p className="mt-2 text-blue-400/70">
                        Try adjusting your search or filters
                    </p>
                </div>
            ) : (
                <div className="border border-blue-800/50 rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-blue-900/30">
                            <TableRow className="hover:bg-blue-900/50 border-blue-800/50">
                                <TableHead className="text-blue-300">Name</TableHead>
                                <TableHead className="text-blue-300">Company</TableHead>
                                <TableHead className="text-blue-300">Mobile</TableHead>
                                <TableHead className="text-blue-300">Email</TableHead>
                                <TableHead className="text-blue-300">City</TableHead>
                                <TableHead className="text-blue-300">Date</TableHead>
                                <TableHead className="text-blue-300 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSubmissions.map((submission) => (
                                <TableRow
                                    key={submission.id}
                                    className="hover:bg-blue-900/20 border-blue-800/30"
                                >
                                    <TableCell className="font-medium">{submission.name}</TableCell>
                                    <TableCell className="text-blue-200">{submission.company || '-'}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-blue-200">
                                            <Phone className="h-3 w-3 mr-2 opacity-70" />
                                            {submission.mobile}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-blue-200">
                                            <Mail className="h-3 w-3 mr-2 opacity-70" />
                                            {submission.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-blue-200">
                                            <MapPin className="h-3 w-3 mr-2 opacity-70" />
                                            {submission.city || '-'}</div
                                        >
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-blue-200">
                                            <Calendar className="h-3 w-3 mr-2 opacity-70" />
                                            {format(submission.timestamp, 'MMM d, yyyy')}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                                                onClick={() => handleView(submission)}
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-blue-950 border-blue-800 text-white">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Submission?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-blue-300">
                                                            This will permanently delete the submission from {submission.name}.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="border-blue-500 text-blue-300 hover:bg-blue-900/50">Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(submission.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* New Form-Style View Details Modal - 3 Column Layout */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="bg-blue-950 border-blue-800 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="mb-2">
                        <DialogTitle className="text-xl font-semibold">Submission Details</DialogTitle>
                        <DialogDescription className="text-blue-300">
                            Full details of the contact form submission.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSubmission && (
                        <div className="space-y-6">

                            {/* Main Grid: 3 Columns for compact view */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Column 1 */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Contact Name</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.name}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Company Name</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.company || "N/A"}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Designation</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.designation || "N/A"}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Submitted At</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.submittedAtRaw || format(selectedSubmission.timestamp, "PPP 'at' p")}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Mobile Number</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.mobile}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Email Address</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.email}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Product Interest</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.products || "General Inquiry"}
                                            className="bg-blue-900/30 border-blue-700/50 text-white font-semibold text-blue-100"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Timestamp</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.timestampRaw || "N/A"}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                </div>

                                {/* Column 3 */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">City</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.city || "N/A"}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Pincode</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.pincode || "N/A"}
                                            className="bg-blue-900/30 border-blue-700/50 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Submission ID</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.id}
                                            className="bg-blue-900/30 border-blue-700/50 text-white font-mono text-xs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-blue-300 block">Source</label>
                                        <Input
                                            readOnly
                                            value={selectedSubmission.source}
                                            className="bg-blue-900/30 border-blue-700/50 text-white font-mono text-xs"
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Full Width Remarks */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-blue-300 block">Remarks / Message</label>
                                <textarea
                                    readOnly
                                    className="w-full min-h-[100px] p-3 rounded-md bg-blue-900/30 border border-blue-700/50 text-white resize-y focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={selectedSubmission.remarks || "No remarks provided."}
                                />
                            </div>

                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactSubmissions;
