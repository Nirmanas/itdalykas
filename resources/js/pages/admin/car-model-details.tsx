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
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';
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
    const { data, setData, post, processing } = useForm({
        detail_ids: selectedDetailIds,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(admin.carModels.details.update({ carModel: carModel.id }).url, {
            onSuccess: () => {},
        });
    };

    const toggleDetail = (detailId: number) => {
        if (data.detail_ids.includes(detailId))
            router.delete(admin.detailModel.detach({detail: detailId, carModel: carModel.id}).url, {
                onSuccess: () => {
                    toast.success('Detalės priskyrimas panaikintas.');
                    },
                onError: () => {
                    toast.error('Nepavyko panaikinti.');
                },
                preserveState: false,
            });
        else
            router.post(admin.detailModel.attach({detail: detailId, carModel: carModel.id}).url, {}, {
                onSuccess: () => {
                    toast.success('Detalė priskirta.');
                },
                onError: () => {
                    toast.error('Detalės nepavyko priskirti.');
                },
                preserveState: false,
            });

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

                <form onSubmit={submit} className="space-y-6">
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
        </AppLayout>
    );
}
