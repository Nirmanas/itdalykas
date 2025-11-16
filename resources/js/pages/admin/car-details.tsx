import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { Head, router, useForm } from '@inertiajs/react';
import { Check, Plus, Trash2, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface DetailType {
    value: string;
    label: string;
}

interface Detail {
    id: number;
    name: string;
    picture_url: string;
    type: string;
    stock: number;
    price: number;
}

interface Props {
    details: Detail[];
    detailTypes: DetailType[];
    errors: Record<string, string>;
}

export default function CarModels({ details, detailTypes, errors }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingField, setEditingField] = useState<{
        id: number;
        field: 'price' | 'stock';
        value: number;
    } | null>(null);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors: formErrors,
    } = useForm({
        name: '',
        picture: null as File | null,
        type: '',
        stock: 0,
        price: 0.0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(admin.details.store().url, {
            onSuccess: () => {
                toast.success('Detalė sėkmingai pridėta');
                reset();
                setIsOpen(false);
            },
            onError: () => {
                toast.error('Įvyko klaida pridedant detalę');
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Ar tikrai norite ištrinti šią detalę?')) {
            router.delete(admin.details.destroy({ detail: id }), {
                onSuccess: () => {
                    toast.success('Detalė sėkmingai ištrinta');
                },
                onError: () => {
                    toast.error('Įvyko klaida trinant detalę');
                },
            });
        }
    };

    const startEditing = (
        id: number,
        field: 'price' | 'stock',
        value: number,
    ) => {
        setEditingField({ id, field, value });
    };

    const cancelEditing = () => {
        setEditingField(null);
    };

    const saveEdit = () => {
        if (!editingField) return;

        router.patch(
            admin.details.update({ detail: editingField.id }).url,
            { [editingField.field]: editingField.value },
            {
                onSuccess: () => {
                    toast.success('Detalė sėkmingai atnaujinta');
                    setEditingField(null);
                },
                onError: () => {
                    toast.error('Įvyko klaida atnaujinant detalę');
                },
            },
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Detalės" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Detalės"
                        description="Detalių informacijos valdymas"
                    />
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Pridėti naują detalę
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <form onSubmit={submit}>
                                <DialogHeader>
                                    <DialogTitle>
                                        Pridėti naują detalę
                                    </DialogTitle>
                                    <DialogDescription>
                                        Naujų detalių pridėjimas į sistemą.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            Detalės pavadinimas
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="pvz.: RX55I"
                                        />
                                        {formErrors.name && (
                                            <p className="text-sm text-red-500">
                                                {formErrors.name
                                                    ? 'Įveskite detalės pavadinimą'
                                                    : ''}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="type">
                                            Detalės tipas
                                        </Label>
                                        <Select
                                            value={data.type}
                                            onValueChange={(value) =>
                                                setData('type', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pasirinkti detalės tipą" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {detailTypes.map((type) => (
                                                    <SelectItem
                                                        key={type.value}
                                                        value={type.value}
                                                    >
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {formErrors.type && (
                                            <p className="text-sm text-red-500">
                                                {formErrors.type
                                                    ? 'Pasirinkite detalės tipą'
                                                    : ''}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="stock">Kiekis</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            value={data.stock}
                                            onChange={(e) =>
                                                setData(
                                                    'stock',
                                                    parseInt(e.target.value),
                                                )
                                            }
                                        />
                                        {formErrors.stock && (
                                            <p className="text-sm text-red-500">
                                                {formErrors.stock
                                                    ? 'Įveskite kiekį'
                                                    : ''}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Kaina</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData(
                                                    'price',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                            onBlur={(e) => {
                                                if (e.target.value !== '') {
                                                    setData(
                                                        'price',
                                                        parseFloat(
                                                            parseFloat(
                                                                e.target.value,
                                                            ).toFixed(2),
                                                        ),
                                                    );
                                                }
                                            }}
                                        />
                                        {formErrors.stock && (
                                            <p className="text-sm text-red-500">
                                                {formErrors.stock
                                                    ? 'Įveskite kiekį'
                                                    : ''}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="picture">
                                            Detalės nuotrauka
                                        </Label>
                                        <Input
                                            id="picture"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData(
                                                    'picture',
                                                    e.target.files?.[0] || null,
                                                )
                                            }
                                            required
                                        />
                                        {formErrors.picture && (
                                            <p className="text-sm text-red-500">
                                                {formErrors.picture
                                                    ? 'Įkelkite detalės nuotrauką'
                                                    : ''}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Atšaukti
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Pridedamas.'
                                            : 'Pridėti detalę.'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {details.map((model) => (
                        <Card key={model.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex grow-1 flex-col gap-2">
                                        <span className="text-lg capitalize">
                                            {model.name}
                                        </span>
                                        <span className="mt-1 capitalize">
                                            {model.type}
                                        </span>
                                    </div>
                                    <div className="flex grow-1 flex-col gap-2">
                                        <span className="text-lg capitalize">
                                            Kaina
                                        </span>
                                        {editingField?.id === model.id &&
                                        editingField?.field === 'price' ? (
                                            <div className="flex items-center gap-1">
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={editingField.value}
                                                    onChange={(e) =>
                                                        setEditingField({
                                                            ...editingField,
                                                            value:
                                                                parseFloat(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                        })
                                                    }
                                                    onKeyDown={handleKeyPress}
                                                    className="h-8 w-20"
                                                    autoFocus
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6"
                                                    onClick={saveEdit}
                                                >
                                                    <Check className="h-4 w-4 text-green-600" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6"
                                                    onClick={cancelEditing}
                                                >
                                                    <X className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <span
                                                className="mt-1 cursor-pointer rounded px-2 py-1 capitalize hover:bg-muted"
                                                onClick={() =>
                                                    startEditing(
                                                        model.id,
                                                        'price',
                                                        model.price,
                                                    )
                                                }
                                            >
                                                {new Intl.NumberFormat(
                                                    'de-DE',
                                                    {
                                                        style: 'currency',
                                                        currency: 'EUR',
                                                    },
                                                ).format(model.price)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex grow-1 flex-col gap-2">
                                        <span className="text-lg capitalize">
                                            Kiekis
                                        </span>
                                        {editingField?.id === model.id &&
                                        editingField?.field === 'stock' ? (
                                            <div className="flex items-center gap-1">
                                                <Input
                                                    type="number"
                                                    value={editingField.value}
                                                    onChange={(e) =>
                                                        setEditingField({
                                                            ...editingField,
                                                            value:
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ) || 0,
                                                        })
                                                    }
                                                    onKeyDown={handleKeyPress}
                                                    className="h-8 w-20"
                                                    autoFocus
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6"
                                                    onClick={saveEdit}
                                                >
                                                    <Check className="h-4 w-4 text-green-600" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-6 w-6"
                                                    onClick={cancelEditing}
                                                >
                                                    <X className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <span
                                                className="mt-1 cursor-pointer rounded px-2 py-1 capitalize hover:bg-muted"
                                                onClick={() =>
                                                    startEditing(
                                                        model.id,
                                                        'stock',
                                                        model.stock,
                                                    )
                                                }
                                            >
                                                {model.stock}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4 p-4">
                                <div className="flex items-start justify-between">
                                    <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                                        <img
                                            src={model.picture_url}
                                            alt={model.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <Button
                                    size="icon"
                                    onClick={() => handleDelete(model.id)}
                                    className="w-full text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {details.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                        <p className="text-muted-foreground">
                            Kol kas nėra pridėtų detalių.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
