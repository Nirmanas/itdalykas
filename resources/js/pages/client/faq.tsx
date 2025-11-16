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
            question: 'Kas yra automobilio tiuningas?',
            answer: 'Pakeičia jūsų automobilio išvaizdą.',
        },
        {
            question:
                'Ar turiu pirkti brangiausią variantą, kad pasiekčiau geriausius rezultatus?',
            answer: 'Nesvarbu, kokį variantą pasirinksite – įdedame daug pastangų.',
        },
        {
            question: 'Kiek laiko užtrunka tiuningas?',
            answer: 'Nuo kelių valandų iki kelių savaičių.',
        },
        {
            question: 'Ar galiu grįžti prie standartinės būklės?',
            answer: 'Taip, galime atkurti pirminius nustatymus.',
        },
        {
            question: 'Kaip padaryti užsakymą?',
            answer: 'Susisiekite su mumis telefonu +370 6 700 00000 arba el. paštu užsakymas@example.com.',
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
                            Dažniausiai užduodami klausimai
                        </h1>
                        <p className="text-lg text-gray-600">
                            Viskas, ką reikia žinoti apie mūsų paslaugas.
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
