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
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
    coords?: string;
}

interface Props {
    carModel: CarModel;
    allDetails: Detail[];
    selectedDetailIds: number[];
    errors: Record<string, string>;
}

export default function CarModelDetails({
    carModel,
    allDetails,
    selectedDetailIds,
    errors,
}: Props) {
    const { data } = useForm({
        detail_ids: selectedDetailIds,
    });

    const [showPositionDialog, setShowPositionDialog] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<Detail | null>(null);
    const [positions, setPositions] = useState({
        wheel1Left: '',
        wheel1Bottom: '',
        wheel2Right: '',
        wheel2Bottom: '',
        spoilerTop: '',
        spoilerRight: '',
    });

    const toggleDetail = (detailId: number) => {
        if (data.detail_ids.includes(detailId)) {
            router.delete(
                admin.detailModel.detach({
                    detail: detailId,
                    carModel: carModel.id,
                }).url,
                {
                    onSuccess: () => {
                        toast.success('Detalės priskyrimas panaikintas.');
                    },
                    onError: () => {
                        toast.error('Nepavyko panaikinti.');
                    },
                    preserveState: false,
                },
            );
        } else {
            const detail = allDetails.find((d) => d.id === detailId);
            setSelectedDetail(detail || null);
            setPositions({
                wheel1Left: '',
                wheel1Bottom: '',
                wheel2Right: '',
                wheel2Bottom: '',
                spoilerTop: '',
                spoilerRight: '',
            });
            setShowPositionDialog(true);
        }
    };

    const handlePositionSubmit = () => {
        if (!selectedDetail) return;

        let coords = '';
        if (selectedDetail.type === 'ratai') {
            coords = `${positions.wheel1Left},${positions.wheel1Bottom},${positions.wheel2Right},${positions.wheel2Bottom}`;
        } else if (selectedDetail.type === 'aptakas') {
            coords = `${positions.spoilerTop},${positions.spoilerRight}`;
        }

        router.post(
            admin.detailModel.attach({
                detail: selectedDetail.id,
                carModel: carModel.id,
            }).url,
            { coordinates: coords },
            {
                onSuccess: () => {
                    toast.success('Detalė priskirta.');
                    setShowPositionDialog(false);
                    setSelectedDetail(null);
                },
                onError: () => {
                    toast.error('Detalės nepavyko priskirti.');
                },
                preserveState: false,
            },
        );
    };

    const detailsByType = allDetails.reduce(
        (acc, detail) => {
            if (!acc[detail.type]) {
                acc[detail.type] = [];
            }
            acc[detail.type].push(detail);
            return acc;
        },
        {} as Record<string, Detail[]>,
    );

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title={`${carModel.name} - Detalės`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                router.visit(admin.carModels.index().url)
                            }
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <Heading
                                title={`${carModel.name} - Detalės`}
                                description="Pasirinkite detales, kurios bus prieinamos pirkti šiai mašinai"
                            />
                        </div>
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <AlertError errors={Object.values(errors)} />
                )}

                <form className="space-y-6">
                    {Object.entries(detailsByType).map(([type, details]) => (
                        <div key={type}>
                            <h3 className="mb-4 text-lg font-semibold capitalize">
                                {type}
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {details.map((detail) => (
                                    <Card
                                        key={detail.id}
                                        className={`cursor-pointer transition-all ${
                                            data.detail_ids.includes(detail.id)
                                                ? 'ring-2 ring-primary'
                                                : 'hover:shadow-md'
                                        }`}
                                    >
                                        <CardHeader className="p-0">
                                            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                                                <img
                                                    src={detail.picture_url}
                                                    alt={detail.name}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="absolute top-2 right-2">
                                                    <Checkbox
                                                        checked={data.detail_ids.includes(
                                                            detail.id,
                                                        )}
                                                        onCheckedChange={() =>
                                                            toggleDetail(
                                                                detail.id,
                                                            )
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        className="h-6 w-6 bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <CardTitle className="text-base">
                                                {detail.name}
                                            </CardTitle>
                                            <CardDescription className="mt-1">
                                                Likutis: {detail.stock}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}

                    {allDetails.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                            <p className="text-muted-foreground">
                                Kol kas nėra pridėtų detalių. Pirma pridėkite
                                detales sistemoje.
                            </p>
                        </div>
                    )}
                </form>
            </div>

            <Dialog
                open={showPositionDialog}
                onOpenChange={setShowPositionDialog}
            >
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Nustatyti detalės poziciją</DialogTitle>
                        <DialogDescription>
                            Nustatykite detalės poziciją ant automobilio.
                            Naudokite teigiamus skaičius dešinei/viršui,
                            neigiamus kairei/apačiai.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative mx-auto aspect-video w-full max-w-3xl">
                        {carModel.picture_url && (
                            <img
                                src={carModel.picture_url}
                                alt={carModel.name}
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                        )}

                        {selectedDetail?.picture_url &&
                            selectedDetail.type === 'ratai' && (
                                <>
                                    <div
                                        className="absolute h-[30%] w-[25%]"
                                        style={{
                                            left: positions.wheel1Left
                                                ? parseInt(
                                                      positions.wheel1Left,
                                                  ) >= 0
                                                    ? undefined
                                                    : `${Math.abs(parseInt(positions.wheel1Left))}%`
                                                : '6%',
                                            right: positions.wheel1Left
                                                ? parseInt(
                                                      positions.wheel1Left,
                                                  ) >= 0
                                                    ? `${positions.wheel1Left}%`
                                                    : undefined
                                                : undefined,
                                            bottom: positions.wheel1Bottom
                                                ? parseInt(
                                                      positions.wheel1Bottom,
                                                  ) >= 0
                                                    ? undefined
                                                    : `${Math.abs(parseInt(positions.wheel1Bottom))}%`
                                                : '23%',
                                            top: positions.wheel1Bottom
                                                ? parseInt(
                                                      positions.wheel1Bottom,
                                                  ) >= 0
                                                    ? `${positions.wheel1Bottom}%`
                                                    : undefined
                                                : undefined,
                                        }}
                                    >
                                        <img
                                            src={selectedDetail.picture_url}
                                            alt="Left wheel"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <div
                                        className="absolute h-[30%] w-[25%]"
                                        style={{
                                            right: positions.wheel2Right
                                                ? parseInt(
                                                      positions.wheel2Right,
                                                  ) >= 0
                                                    ? `${positions.wheel2Right}%`
                                                    : undefined
                                                : '9%',
                                            left: positions.wheel2Right
                                                ? parseInt(
                                                      positions.wheel2Right,
                                                  ) >= 0
                                                    ? undefined
                                                    : `${Math.abs(parseInt(positions.wheel2Right))}%`
                                                : undefined,
                                            bottom: positions.wheel2Bottom
                                                ? parseInt(
                                                      positions.wheel2Bottom,
                                                  ) >= 0
                                                    ? undefined
                                                    : `${Math.abs(parseInt(positions.wheel2Bottom))}%`
                                                : '23%',
                                            top: positions.wheel2Bottom
                                                ? parseInt(
                                                      positions.wheel2Bottom,
                                                  ) >= 0
                                                    ? `${positions.wheel2Bottom}%`
                                                    : undefined
                                                : undefined,
                                        }}
                                    >
                                        <img
                                            src={selectedDetail.picture_url}
                                            alt="Right wheel"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                </>
                            )}

                        {selectedDetail?.picture_url &&
                            selectedDetail.type === 'aptakas' && (
                                <div
                                    className="absolute h-[30%] w-[25%]"
                                    style={{
                                        top: positions.spoilerTop
                                            ? parseInt(positions.spoilerTop) >=
                                              0
                                                ? `${positions.spoilerTop}%`
                                                : undefined
                                            : '15%',
                                        bottom: positions.spoilerTop
                                            ? parseInt(positions.spoilerTop) >=
                                              0
                                                ? undefined
                                                : `${Math.abs(parseInt(positions.spoilerTop))}%`
                                            : undefined,
                                        right: positions.spoilerRight
                                            ? parseInt(
                                                  positions.spoilerRight,
                                              ) >= 0
                                                ? `${positions.spoilerRight}%`
                                                : undefined
                                            : '0%',
                                        left: positions.spoilerRight
                                            ? parseInt(
                                                  positions.spoilerRight,
                                              ) >= 0
                                                ? undefined
                                                : `${Math.abs(parseInt(positions.spoilerRight))}%`
                                            : undefined,
                                    }}
                                >
                                    <img
                                        src={selectedDetail.picture_url}
                                        alt="Spoiler"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            )}
                    </div>

                    <div className="mt-4 space-y-4">
                        {selectedDetail?.type === 'ratai' && (
                            <>
                                <div className="space-y-2">
                                    <h3 className="font-semibold">
                                        Kairysis ratas
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="wheel1Left">
                                                Horizontali pozicija
                                            </Label>
                                            <Input
                                                id="wheel1Left"
                                                type="number"
                                                placeholder="Pvz: -6 arba 6"
                                                value={positions.wheel1Left}
                                                onChange={(e) =>
                                                    setPositions((prev) => ({
                                                        ...prev,
                                                        wheel1Left:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="wheel1Bottom">
                                                Vertikali pozicija
                                            </Label>
                                            <Input
                                                id="wheel1Bottom"
                                                type="number"
                                                placeholder="Pvz: -23 arba 23"
                                                value={positions.wheel1Bottom}
                                                onChange={(e) =>
                                                    setPositions((prev) => ({
                                                        ...prev,
                                                        wheel1Bottom:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold">
                                        Dešinysis ratas
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="wheel2Right">
                                                Horizontali pozicija
                                            </Label>
                                            <Input
                                                id="wheel2Right"
                                                type="number"
                                                placeholder="Pvz: 9 arba -9"
                                                value={positions.wheel2Right}
                                                onChange={(e) =>
                                                    setPositions((prev) => ({
                                                        ...prev,
                                                        wheel2Right:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="wheel2Bottom">
                                                Vertikali pozicija
                                            </Label>
                                            <Input
                                                id="wheel2Bottom"
                                                type="number"
                                                placeholder="Pvz: -23 arba 23"
                                                value={positions.wheel2Bottom}
                                                onChange={(e) =>
                                                    setPositions((prev) => ({
                                                        ...prev,
                                                        wheel2Bottom:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {selectedDetail?.type === 'aptakas' && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">
                                    Spoilerio pozicija
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="spoilerTop">
                                            Vertikali pozicija
                                        </Label>
                                        <Input
                                            id="spoilerTop"
                                            type="number"
                                            placeholder="Pvz: 15 arba -15"
                                            value={positions.spoilerTop}
                                            onChange={(e) =>
                                                setPositions((prev) => ({
                                                    ...prev,
                                                    spoilerTop: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="spoilerRight">
                                            Horizontali pozicija
                                        </Label>
                                        <Input
                                            id="spoilerRight"
                                            type="number"
                                            placeholder="Pvz: 0 arba -10"
                                            value={positions.spoilerRight}
                                            onChange={(e) =>
                                                setPositions((prev) => ({
                                                    ...prev,
                                                    spoilerRight:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowPositionDialog(false)}
                        >
                            Atšaukti
                        </Button>
                        <Button onClick={handlePositionSubmit}>
                            Išsaugoti
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
