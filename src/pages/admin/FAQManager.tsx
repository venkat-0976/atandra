import React, { useState } from 'react';
import { useFAQsRealtime } from '@/hooks/useFAQsRealtime';
import { initialFaqSeedData } from '@/utils/faqSeedData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, FileDown, Loader2, ArrowLeft } from 'lucide-react';
import { FAQCategory, FAQItem } from '@/types/faq';
import { useToast } from '@/hooks/use-toast';

const FAQManager = () => {
    const {
        categories,
        questions,
        loading,
        addCategory,
        updateCategory,
        deleteCategory,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        importData
    } = useFAQsRealtime();

    const { toast } = useToast();
    const [selectedCategory, setSelectedCategory] = useState<FAQCategory | null>(null);
    const [isImporting, setIsImporting] = useState(false);

    // Dialog States
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null);
    const [editingQuestion, setEditingQuestion] = useState<FAQItem | null>(null);

    // Form States
    const [categoryName, setCategoryName] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");

    const handleImport = async () => {
        if (!confirm("This will overwrite existing data if IDs match. Are you sure?")) return;
        setIsImporting(true);
        try {
            await importData(initialFaqSeedData);
            toast({ title: "Success", description: "Default FAQs imported successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to import data", variant: "destructive" });
        } finally {
            setIsImporting(false);
        }
    };

    // Category Handlers
    const openCategoryDialog = (category?: FAQCategory) => {
        if (category) {
            setEditingCategory(category);
            setCategoryName(category.name);
        } else {
            setEditingCategory(null);
            setCategoryName("");
        }
        setIsCategoryDialogOpen(true);
    };

    const saveCategory = async () => {
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, { name: categoryName });
                toast({ title: "Category Updated" });
            } else {
                await addCategory(categoryName);
                toast({ title: "Category Added" });
            }
            setIsCategoryDialogOpen(false);
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    const handleDeleteCategory = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure? category must be empty first.")) return;
        try {
            await deleteCategory(id);
            if (selectedCategory?.id === id) setSelectedCategory(null);
            toast({ title: "Category Deleted" });
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    // Question Handlers
    const openQuestionDialog = (question?: FAQItem) => {
        if (question) {
            setEditingQuestion(question);
            setQuestionText(question.question);
            setAnswerText(question.answer);
        } else {
            setEditingQuestion(null);
            setQuestionText("");
            setAnswerText("");
        }
        setIsQuestionDialogOpen(true);
    };

    const saveQuestion = async () => {
        if (!selectedCategory) return;
        try {
            if (editingQuestion) {
                await updateQuestion(editingQuestion.id, { question: questionText, answer: answerText });
                toast({ title: "Question Updated" });
            } else {
                await addQuestion(selectedCategory.id, questionText, answerText);
                toast({ title: "Question Added" });
            }
            setIsQuestionDialogOpen(false);
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    const handleDeleteQuestion = async (id: string) => {
        if (!confirm("Delete this question?")) return;
        try {
            await deleteQuestion(id);
            toast({ title: "Question Deleted" });
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    if (loading) return <div className="p-8 text-center text-white"><Loader2 className="animate-spin h-8 w-8 mx-auto" /> Loading FAQs...</div>;

    const filteredQuestions = selectedCategory
        ? questions.filter(q => q.categoryId === selectedCategory.id)
        : [];

    return (
        <div className="space-y-6 text-white">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">FAQ Manager</h2>
                <Button
                    variant="outline"
                    onClick={handleImport}
                    disabled={isImporting || categories.length > 0}
                    className="border-blue-500 text-blue-400 hover:bg-blue-900"
                >
                    {isImporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
                    {categories.length > 0 ? "Data Loaded" : "Import Default Data"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
                {/* Categories Sidebar */}
                <div className="md:col-span-4 bg-gray-900/50 rounded-lg border border-gray-700 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                        <h3 className="font-semibold text-gray-200">Categories</h3>
                        <Button size="icon" variant="ghost" onClick={() => openCategoryDialog()} className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-900/20">
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat)}
                                className={`p-3 rounded-md cursor-pointer flex justify-between items-center group transition-colors ${selectedCategory?.id === cat.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'
                                    }`}
                            >
                                <span className="font-medium truncate pr-2">{cat.name}</span>
                                <div className="hidden group-hover:flex gap-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 hover:bg-black/20"
                                        onClick={(e) => { e.stopPropagation(); openCategoryDialog(cat); }}
                                    >
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 hover:bg-red-500/20 hover:text-red-400"
                                        onClick={(e) => handleDeleteCategory(cat.id, e)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="text-center p-4 text-gray-500 text-sm">No categories found. Click Import or Add +.</div>
                        )}
                    </div>
                </div>

                {/* Questions Panel */}
                <div className="md:col-span-8 bg-gray-900/50 rounded-lg border border-gray-700 flex flex-col overflow-hidden">
                    {selectedCategory ? (
                        <>
                            <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                                <div>
                                    <h3 className="font-semibold text-gray-200">{selectedCategory.name}</h3>
                                    <p className="text-xs text-gray-400">{filteredQuestions.length} questions</p>
                                </div>
                                <Button size="sm" onClick={() => openQuestionDialog()} className="bg-blue-600 hover:bg-blue-500 text-white">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Question
                                </Button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {filteredQuestions.map((q, idx) => (
                                    <div key={q.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-2 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-0.5 rounded">Q{idx + 1}</span>
                                                    <h4 className="font-medium text-gray-200">{q.question}</h4>
                                                </div>
                                                <p className="text-gray-400 text-sm pl-8 whitespace-pre-wrap">{q.answer}</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => openQuestionDialog(q)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={() => handleDeleteQuestion(q.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredQuestions.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                                        <p>No questions yet.</p>
                                        <Button variant="link" onClick={() => openQuestionDialog()}>Add your first question</Button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <ArrowLeft className="h-12 w-12 mb-4 opacity-50" />
                            <p className="text-lg">Select a category on the left to manage questions</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Category Dialog */}
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogContent className="bg-gray-900 border-gray-700">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? 'Edit Category' : 'New Category'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category Name</label>
                            <Input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="e.g., UPS Systems"
                                className="bg-gray-800 border-gray-600"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)} className="border-gray-600 text-white hover:bg-gray-800">Cancel</Button>
                        <Button onClick={saveCategory} className="bg-blue-600 text-white hover:bg-blue-500">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Question Dialog */}
            <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl text-white">
                    <DialogHeader>
                        <DialogTitle>{editingQuestion ? 'Edit Question' : 'New Question'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Question</label>
                            <Input
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                placeholder="What is..."
                                className="bg-gray-800 border-gray-600 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Answer</label>
                            <Textarea
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                                placeholder="Detailed answer..."
                                className="bg-gray-800 border-gray-600 min-h-[150px] text-white"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsQuestionDialogOpen(false)} className="border-gray-600 text-white hover:bg-gray-800">Cancel</Button>
                        <Button onClick={saveQuestion} className="bg-blue-600 text-white hover:bg-blue-500">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FAQManager;
