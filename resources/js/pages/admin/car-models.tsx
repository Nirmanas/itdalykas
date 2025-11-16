import AlertError from '@/components/alert-error';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Plus, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface CarType {
    value: string;
    label: string;
}

interface CarModel {
    id: number;
    name: string;
    picture_url: string;
    type: string;
}

interface Props {
    carModels: CarModel[];
    carTypes: CarType[];
    errors: Record<string, string>;
}

export default function CarModels({ carModels, carTypes, errors }: Props) {
    const [isOpen, setIsOpen] = useState(false);
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
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(admin.carModels.store().url, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Ar tikrai norite ištrinti šį mašinos modelį?')) {
            router.delete(admin.carModels.destroy({ carModel: id }));
        }
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Mašinos" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Mašinos"
                        description="Mašinų informacijos valdymas"
                    />
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Pridėti naują mašiną
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <form onSubmit={submit}>
                                <DialogHeader>
                                    <DialogTitle>Nauja mašina</DialogTitle>
                                    <DialogDescription>
                                        Pridėti mašiną į sistemą
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Modelis</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="pvz.: Corolla"
                                        />
                                        {formErrors.name && (
                                            <p className="text-sm text-red-500">
                                                {formErrors.name
                                                    ? 'Įveskite mašinos modelį'
                                                    : ''}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="type">
                                            Mašinos tipas
                                        </Label>
                                        <Select
                                            value={data.type}
                                            onValueChange={(value) =>
                                                setData('type', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pasirinkti mašinos tipą" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {carTypes.map((type) => (
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
                                                    ? 'Pasirinkite mašinos markę'
                                                    : ''}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="picture">
                                            Nuotrauka
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
                                        />
                                        {formErrors.picture && (
                                            <p className="text-sm text-red-500">
                                                {formErrors.picture
                                                    ? 'Įkelkite mašinos nuotrauką'
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
                                            ? 'Pridedama...'
                                            : 'Pridėti modelį'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {Object.keys(errors).length > 0 && (
                    <AlertError errors={Object.values(errors)} />
                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {carModels.map((model) => (
                        <Card
                            key={model.id}
                            className="cursor-pointer transition-shadow hover:shadow-lg"
                            onClick={() =>
                                router.visit(
                                    admin.carModels.details({
                                        carModel: model.id,
                                    }).url,
                                )
                            }
                        >
                            <CardHeader className="p-0">
                                <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                                    <img
                                        src={model.picture_url}
                                        alt={model.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">
                                            {model.name}
                                        </CardTitle>
                                        <CardDescription className="mt-1 capitalize">
                                            {model.type}
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(model.id);
                                        }}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {carModels.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                        <p className="text-muted-foreground">
                            Kol kas nėra pridėtų mašinų modelių.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
