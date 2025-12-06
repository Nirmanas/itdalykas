import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import login, { store } from '@/routes/login';
import { Form, Head, router } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, canRegister }: LoginProps) {
    const prisijungimai = {
        klientas: { email: 'klientas@gmail.com', password: 'klientas' },
        darbuotojas: {
            email: 'darbuotojas@gmail.com',
            password: 'darbuotojas',
        },
        administratorius: {
            email: 'adminas@gmail.com',
            password: 'adminas',
        },
    };
    const handleSubmit = (userType: keyof typeof prisijungimai) => {
        const { email, password } = prisijungimai[userType];
        router.post(login.store().url, { email, password, remember: true });
    };

    return (
        <AuthLayout
            title="Prisijungti"
            description="Įveskite savo el. pašto adresą ir slaptažodį, kad prisijungtumėte prie savo paskyros."
        >
            <Head title="Prisijungti" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">El. paštas</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="pavyzdys@example.com"
                                />
                                <InputError
                                    message={
                                        errors.email
                                            ? 'Suvesti duomenys nėra teisingi'
                                            : ''
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        Slaptažodis
                                    </Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Slaptažodis"
                                />
                                <InputError
                                    message={
                                        errors.password
                                            ? 'Blogas slaptažodis'
                                            : ''
                                    }
                                />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Prisiminti</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Prisijungti
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                Neturite paskyros?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Užsiregistruokite čia.
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>
            <label>Prisijungti kaip:</label>
            <div className="flex flex-row gap-5">
                <Button
                    className="bg-slate-300"
                    onClick={() => handleSubmit('administratorius')}
                >
                    Administratorius
                </Button>
                <Button
                    className="bg-slate-500"
                    onClick={() => handleSubmit('darbuotojas')}
                >
                    Darbuotojas
                </Button>
                <Button
                    className="bg-slate-700"
                    onClick={() => handleSubmit('klientas')}
                >
                    Klientas
                </Button>
            </div>
            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
