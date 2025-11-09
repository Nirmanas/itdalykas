import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import client from '@/routes/client';
import { useForm } from '@inertiajs/react';
import React from 'react';

type Review = {
    id: string;
    title: string;
    body: string;
    rating: number;
    createdAt: string;
    user: { name: string };
};
type Props = {
    reviews?: Review[];
};

function Stars({
    value,
    onSelect,
    size = 22,
    interactive = false,
}: {
    value: number;
    onSelect?: (v: number) => void;
    size?: number;
    interactive?: boolean;
}) {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((n) => (
                <span
                    key={n}
                    onClick={interactive ? () => onSelect?.(n) : undefined}
                    style={{
                        cursor: interactive ? 'pointer' : 'default',
                        color: n <= value ? '#fbbf24' : '#d1d5db',
                        fontSize: size,
                        marginRight: 4,
                        userSelect: 'none',
                    }}
                    aria-label={
                        interactive ? `Set rating to ${n}` : `Star ${n}`
                    }
                    role={interactive ? 'button' : 'img'}
                >
                    {n <= value ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
}

export default function Index({ reviews = [] }: Props) {
    const {
        data,
        setData,
        post: submit,
    } = useForm({
        title: '',
        description: '',
        rating: 0,
    });

    const colors = ['#ef4444', '#f97316', '#eab308', '#10b981', '#3b82f6'];

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submit(client.forum.store().url, {
            onSuccess: () => {
                setData('title', '');
                setData('description', '');
                setData('rating', 0);
            },
            preserveState: false,
        });
    }
    return (
        <AppLayout>
            <Tabs className="mt-5" defaultValue="index">
                <TabsList>
                    <TabsTrigger value="index">Reviews</TabsTrigger>
                    <TabsTrigger value="review">Leave a review</TabsTrigger>
                </TabsList>
                <div
                    style={{
                        maxWidth: 900,
                        margin: '24px auto',
                        padding: 16,
                    }}
                >
                    <TabsContent value="review">
                        <h1 style={{ marginBottom: 8 }}>Community Reviews</h1>
                        <p
                            style={{
                                color: '#6b7280',
                                marginTop: 0,
                                marginBottom: 16,
                            }}
                        >
                            Share your experience and help others with your
                            review.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: 8,
                                padding: 16,
                                marginBottom: 24,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 12,
                                    marginBottom: 12,
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <label
                                        style={{
                                            display: 'block',
                                            fontSize: 12,
                                            color: '#6b7280',
                                        }}
                                    >
                                        Title
                                    </label>
                                    <input
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Great product, helpful team"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: 6,
                                            border: '1px solid #d1d5db',
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: 12 }}>
                                <label
                                    style={{
                                        display: 'block',
                                        fontSize: 12,
                                        color: '#6b7280',
                                    }}
                                >
                                    Rating
                                </label>
                                <Stars
                                    value={data.rating}
                                    onSelect={(v) => setData('rating', v)}
                                    interactive
                                />
                            </div>

                            <div style={{ marginBottom: 12 }}>
                                <label
                                    style={{
                                        display: 'block',
                                        fontSize: 12,
                                        color: '#6b7280',
                                    }}
                                >
                                    Review
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="What did you like or dislike? Would you recommend it?"
                                    rows={5}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: 6,
                                        border: '1px solid #d1d5db',
                                        resize: 'vertical',
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    background: '#2563eb',
                                    border: 'none',
                                    padding: '10px 14px',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                }}
                            >
                                Post review
                            </button>
                        </form>
                    </TabsContent>
                    <TabsContent value="index">
                        <div>
                            {reviews.length === 0 ? (
                                <div
                                    style={{
                                        padding: 20,
                                        border: '1px dashed #d1d5db',
                                        borderRadius: 8,
                                        color: '#6b7280',
                                        textAlign: 'center',
                                    }}
                                >
                                    No reviews yet. Be the first to share your
                                    thoughts.
                                </div>
                            ) : (
                                reviews.map((r, i) => {
                                    return (
                                        <article
                                            key={r.id}
                                            style={{
                                                border: '1px solid #e5e7eb',
                                                borderRadius: 8,
                                                padding: 16,
                                                marginBottom: 12,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: 6,
                                                    gap: 20,
                                                }}
                                            >
                                                <strong>{r.title}</strong>
                                                <span
                                                    style={{
                                                        color: '#6b7280',
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {new Date(
                                                        r.createdAt,
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                }}
                                            >
                                                <Stars value={r.rating} />
                                            </div>
                                            <p
                                                style={{
                                                    marginTop: 8,
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {r.body}
                                            </p>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    marginTop: 12,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        backgroundColor:
                                                            colors[
                                                                i %
                                                                    colors.length
                                                            ],
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {r.user.name
                                                        .slice(0, 1)
                                                        .toUpperCase()}
                                                </div>
                                                {r.user.name}
                                            </div>
                                        </article>
                                    );
                                })
                            )}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </AppLayout>
    );
}
