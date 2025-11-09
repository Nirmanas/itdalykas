import AppLayout from '@/layouts/app-layout';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

export default function ViewFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: 'What is car tuning?',
            answer: 'Makes your car look nicer.',
        },
        {
            question: 'Will tuning void my warranty?',
            answer: 'In some cases yes.',
        },
        {
            question: 'How much better looking will my car be?',
            answer: 'A lot better.',
        },
        {
            question: 'Is tuning safe?',
            answer: 'If done right, yes.',
        },
        {
            question:
                'Do I need to buy the most expensive option for best results?',
            answer: 'No matter the choice, we put in a lot of effort.',
        },
        {
            question: 'How long does tuning take?',
            answer: 'A few hours to a few weeks.',
        },
        {
            question: 'Can I go back to stock?',
            answer: 'Yes, we can undo the changes.',
        },
        {
            question: 'Where can I view the options?',
            answer: 'On the site.',
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <AppLayout>
            <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-gray-600">
                            Everything you need to know about car tuning
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="flex w-full items-center justify-between px-6 py-4 text-left focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
                                >
                                    <span className="pr-4 text-lg font-semibold">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`h-6 w-6 flex-shrink-0 transform text-gray-300 transition-transform duration-200 ${
                                            openIndex === index
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <ChevronDown />
                                    </svg>
                                </button>
                                <div
                                    className={`transition-all duration-200 ease-in-out ${
                                        openIndex === index
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-4 leading-relaxed text-gray-500">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
