import { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue, push, set, remove, update, DataSnapshot } from 'firebase/database';
import { FAQCategory, FAQItem, FAQData } from '@/types/faq';

export const useFAQsRealtime = () => {
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [questions, setQuestions] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const categoriesRef = ref(rtdb, 'faq/categories');
        const questionsRef = ref(rtdb, 'faq/questions');

        const unsubscribeCategories = onValue(categoriesRef, (snapshot: DataSnapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    const categoryList = Object.values(data) as FAQCategory[];
                    // Sort by order
                    const sorted = categoryList.sort((a, b) => a.order - b.order);
                    setCategories(sorted);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.error("Error parsing categories:", err);
                setError("Failed to load categories");
            }
        }, (err) => {
            console.error("Firebase error (categories):", err);
            setError(err.message);
        });

        const unsubscribeQuestions = onValue(questionsRef, (snapshot: DataSnapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    const questionList = Object.values(data) as FAQItem[];
                    // Sort by order
                    const sorted = questionList.sort((a, b) => (a.order || 0) - (b.order || 0));
                    setQuestions(sorted);
                } else {
                    setQuestions([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error parsing questions:", err);
                setError("Failed to load questions");
                setLoading(false);
            }
        }, (err) => {
            console.error("Firebase error (questions):", err);
            setError(err.message);
            setLoading(false);
        });

        return () => {
            unsubscribeCategories();
            unsubscribeQuestions();
        };
    }, []);

    // CRUD Operations for Categories
    const addCategory = async (name: string, id?: string) => {
        try {
            // If ID is provided (e.g. for initial seeding), use it. Otherwise generate one.
            const categoryId = id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const newCategory: FAQCategory = {
                id: categoryId,
                name,
                order: categories.length + 1
            };

            const categoryRef = ref(rtdb, `faq/categories/${categoryId}`);
            await set(categoryRef, newCategory);
            return categoryId;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const updateCategory = async (id: string, updates: Partial<FAQCategory>) => {
        try {
            const categoryRef = ref(rtdb, `faq/categories/${id}`);
            await update(categoryRef, updates);
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            // First, check if there are any questions in this category
            const categoryQuestions = questions.filter(q => q.categoryId === id);
            if (categoryQuestions.length > 0) {
                throw new Error(`Cannot delete category with ${categoryQuestions.length} existing questions. Please delete or move them first.`);
            }

            const categoryRef = ref(rtdb, `faq/categories/${id}`);
            await remove(categoryRef);
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    // CRUD Operations for Questions
    const addQuestion = async (categoryId: string, question: string, answer: string) => {
        try {
            const questionsRef = ref(rtdb, 'faq/questions');
            const newQuestionRef = push(questionsRef);
            const id = newQuestionRef.key;

            if (!id) throw new Error("Failed to generate key");

            // Find max order for this category to append
            const categoryQuestions = questions.filter(q => q.categoryId === categoryId);
            const maxOrder = categoryQuestions.reduce((max, q) => Math.max(max, q.order || 0), 0);

            const newQuestion: FAQItem = {
                id,
                categoryId,
                question,
                answer,
                order: maxOrder + 1,
                createdAt: new Date().toISOString()
            };

            await set(newQuestionRef, newQuestion);
            return id;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const updateQuestion = async (id: string, updates: Partial<FAQItem>) => {
        try {
            const questionRef = ref(rtdb, `faq/questions/${id}`);
            await update(questionRef, updates);
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const deleteQuestion = async (id: string) => {
        try {
            const questionRef = ref(rtdb, `faq/questions/${id}`);
            await remove(questionRef);
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    // Bulk Import / Seed
    const importData = async (data: FAQData) => {
        try {
            setLoading(true);
            const updates: any = {};

            // Prepare categories
            data.categories.forEach(cat => {
                updates[`faq/categories/${cat.id}`] = cat;
            });

            // Prepare questions
            data.questions.forEach(q => {
                // If question doesn't have an ID, generate one (not ideal for updates, but okay for initial seed)
                const qId = q.id || push(ref(rtdb, 'faq/questions')).key;
                if (qId) {
                    updates[`faq/questions/${qId}`] = { ...q, id: qId };
                }
            });

            await update(ref(rtdb), updates);
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    return {
        categories,
        questions,
        loading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        importData
    };
};
