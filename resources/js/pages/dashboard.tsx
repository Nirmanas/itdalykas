import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

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

interface Detail {
    id: number;
    name: string;
    picture_url: string;
    stock: number;
    type: string;
    price: number;
    coords?: string;
}

interface DashboardProps {
    carTypes: CarType[];
    carModels: CarModel[];
    details: Detail[];
    selectedCarType?: string;
    selectedCarModel?: number;
}

export default function Dashboard({
    carTypes,
    carModels,
    details,
    selectedCarType,
    selectedCarModel,
}: DashboardProps) {
    console.log(details);
    const [carType, setCarType] = useState<string>(selectedCarType || '');
    const [carModel, setCarModel] = useState<string>(
        selectedCarModel?.toString() || '',
    );
    const defaultState = { ratai: -1, aptakas: -1 };
    const [checkedDetails, setCheckedDetails] = useState<{
        [K in 'ratai' | 'aptakas']: number;
    }>(defaultState);
    const [showPreview, setShowPreview] = useState(false);

    const selectedCarModelData = carModels.find(
        (model) => model.id.toString() === carModel,
    );
    const selectedWheels = details.find(
        (detail) => detail.id === checkedDetails.ratai,
    );
    const selectedSpoiler = details.find(
        (detail) => detail.id === checkedDetails.aptakas,
    );

    const handleCarTypeChange = (value: string) => {
        setCarType(value);
        setCarModel('');
        setCheckedDetails(defaultState);
        router.get('/', { carType: value }, { preserveState: false });
    };

    const handleCarModelChange = (value: string) => {
        setCarModel(value);
        setCheckedDetails(defaultState);
        router.get('/', { carType, carModel: value }, { preserveState: false });
    };

    const getPositionStyle = (coords: string | undefined, type: string, position: 'left' | 'right' | 'spoiler') => {
        if (!coords) {
            // Default positions
            if (type === 'ratai') {
                if (position === 'left') {
                    return { left: '6%', bottom: '23%' };
                } else if (position === 'right') {
                    return { right: '9%', bottom: '23%' };
                }
            } else if (type === 'aptakas') {
                return { top: '15%', right: '0%' };
            }
            return {};
        }

        const values = coords.split(',').map(v => v.trim());

        if (type === 'ratai' && values.length >= 4) {
            // Format: wheel1Left,wheel1Bottom,wheel2Right,wheel2Bottom
            const [wheel1Left, wheel1Bottom, wheel2Right, wheel2Bottom] = values;

            if (position === 'left') {
                const leftVal = parseInt(wheel1Left);
                const bottomVal = parseInt(wheel1Bottom);
                return {
                    ...(leftVal >= 0 ? { right: `${leftVal}%` } : { left: `${Math.abs(leftVal)}%` }),
                    ...(bottomVal >= 0 ? { top: `${bottomVal}%` } : { bottom: `${Math.abs(bottomVal)}%` }),
                };
            } else if (position === 'right') {
                const rightVal = parseInt(wheel2Right);
                const bottomVal = parseInt(wheel2Bottom);
                return {
                    ...(rightVal >= 0 ? { right: `${rightVal}%` } : { left: `${Math.abs(rightVal)}%` }),
                    ...(bottomVal >= 0 ? { top: `${bottomVal}%` } : { bottom: `${Math.abs(bottomVal)}%` }),
                };
            }
        } else if (type === 'aptakas' && values.length >= 2) {
            // Format: spoilerTop,spoilerRight
            const [spoilerTop, spoilerRight] = values;
            const topVal = parseInt(spoilerTop);
            const rightVal = parseInt(spoilerRight);
            return {
                ...(topVal >= 0 ? { top: `${topVal}%` } : { bottom: `${Math.abs(topVal)}%` }),
                ...(rightVal >= 0 ? { right: `${rightVal}%` } : { left: `${Math.abs(rightVal)}%` }),
            };
        }

        return {};
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 gap-4 overflow-hidden p-4">
                <div className="w-64 flex-shrink-0 space-y-4 overflow-y-auto rounded-xl border border-sidebar-border/70 bg-white p-4 dark:border-sidebar-border dark:bg-neutral-950">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">
                            Filtruoti mašiną
                        </h2>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="car-type">Mašinos tipas</Label>
                        <Select
                            value={carType}
                            onValueChange={handleCarTypeChange}
                        >
                            <SelectTrigger id="car-type">
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
                    </div>

                    {carModels.length > 0 && (
                        <div className="space-y-2">
                            <Label htmlFor="car-model">
                                Automobilio modelis
                            </Label>
                            <Select
                                value={carModel}
                                onValueChange={handleCarModelChange}
                            >
                                <SelectTrigger id="car-model">
                                    <SelectValue placeholder="Pasirinkite modelį" />
                                </SelectTrigger>
                                <SelectContent>
                                    {carModels.map((model) => (
                                        <SelectItem
                                            key={model.id}
                                            value={model.id.toString()}
                                        >
                                            {model.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {carType && carModels.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Nėra galimų pasirinkimų.
                        </p>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-neutral-950">
                    <div className="flex justify-between">
                        <h1 className="mb-6 text-2xl font-bold">
                            Galimos dalys
                        </h1>
                        <Button
                            hidden={
                                !carType ||
                                !carModel ||
                                (checkedDetails.ratai === -1 &&
                                    checkedDetails.aptakas === -1)
                            }
                            onClick={() => setShowPreview(true)}
                        >
                            Žiūrėti
                        </Button>
                    </div>

                    {details.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {details.map((detail) => (
                                <Card key={detail.id}>
                                    <CardHeader>
                                        {detail.picture_url && (
                                            <div>
                                                <Checkbox
                                                    checked={
                                                        detail.id ===
                                                        checkedDetails[
                                                            detail.type as
                                                                | 'ratai'
                                                                | 'aptakas'
                                                        ]
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) => {
                                                        setCheckedDetails(
                                                            (prev) => ({
                                                                ...prev,
                                                                [detail.type as
                                                                    | 'wheels'
                                                                    | 'spoiler']:
                                                                    checked
                                                                        ? detail.id
                                                                        : -1,
                                                            }),
                                                        );
                                                    }}
                                                />
                                                <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                                                    <img
                                                        src={detail.picture_url}
                                                        alt={detail.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <CardTitle>{detail.name}</CardTitle>
                                        <CardDescription>
                                            Tipas: {detail.type}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    Kaina:
                                                </span>
                                                <span className="font-semibold">
                                                    {new Intl.NumberFormat(
                                                        'de-DE',
                                                        {
                                                            style: 'currency',
                                                            currency: 'EUR',
                                                        },
                                                    ).format(detail.price)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    Kiekis:
                                                </span>
                                                <span
                                                    className={
                                                        detail.stock > 0
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                    }
                                                >
                                                    {detail.stock > 0
                                                        ? `Turime ${detail.stock}`
                                                        : 'Nėra sandėlyje, bet galime užsakyti'}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : carModel ? (
                        <div className="flex h-64 items-center justify-center text-muted-foreground">
                            <p>Nėra dalių pasirinktam automobiliui.</p>
                        </div>
                    ) : (
                        <div className="flex h-64 items-center justify-center text-muted-foreground">
                            <p>
                                Pasirinkite automobilio tipą ir modelį, kad
                                pamatytumėte galimas dalis.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Automobilio peržiūra</DialogTitle>
                        <DialogDescription>
                            Jūsų automobilis su pasirinktomis dalimis
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative mx-auto aspect-video w-full max-w-3xl">
                        {selectedCarModelData?.picture_url && (
                            <img
                                src={selectedCarModelData.picture_url}
                                alt={selectedCarModelData.name}
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                        )}

                        {selectedWheels?.picture_url && (
                            <>
                                <div
                                    className="absolute h-[30%] w-[25%]"
                                    style={getPositionStyle(selectedWheels.coords, 'ratai', 'left')}
                                >
                                    <img
                                        src={selectedWheels.picture_url}
                                        alt="Left wheel"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div
                                    className="absolute h-[30%] w-[25%]"
                                    style={getPositionStyle(selectedWheels.coords, 'ratai', 'right')}
                                >
                                    <img
                                        src={selectedWheels.picture_url}
                                        alt="Right wheel"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            </>
                        )}

                        {selectedSpoiler?.picture_url && (
                            <div
                                className="absolute h-[30%] w-[25%]"
                                style={getPositionStyle(selectedSpoiler.coords, 'aptakas', 'spoiler')}
                            >
                                <img
                                    src={selectedSpoiler.picture_url}
                                    alt="Spoiler"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-4 space-y-2 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
                        <h3 className="font-semibold">Pasirinktos dalys:</h3>
                        <ul className="space-y-1 text-sm">
                            {selectedWheels && (
                                <li className="flex justify-between">
                                    <span>{selectedWheels.name}</span>
                                    <span className="font-semibold">
                                        {new Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        }).format(selectedWheels.price)}
                                    </span>
                                </li>
                            )}
                            {selectedSpoiler && (
                                <li className="flex justify-between">
                                    <span>{selectedSpoiler.name}</span>
                                    <span className="font-semibold">
                                        {new Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        }).format(selectedSpoiler.price)}
                                    </span>
                                </li>
                            )}
                            {(selectedWheels || selectedSpoiler) && (
                                <li className="flex justify-between border-t pt-2 font-bold">
                                    <span>Viso:</span>
                                    <span>
                                        {new Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        }).format(
                                            (selectedWheels?.price || 0) +
                                                (selectedSpoiler?.price || 0),
                                        )}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
