import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Susikurkite paskyrą"
            description="Įveskite savo duomenis žemiau."
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Vardas</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Pilnas vardas"
                                />
                                <InputError
                                    message={
                                        errors.name
                                            ? 'Blogai įvesti duomenys'
                                            : undefined
                                    }
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">El. paštas</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="pavyzdys@example.com"
                                />
                                <InputError
                                    message={
                                        errors.email
                                            ? 'Blogai įvestas el. paštas'
                                            : undefined
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Slaptažodis</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Slaptažodis"
                                />
                                <InputError
                                    message={
                                        errors.password
                                            ? 'Įveskite slaptažodį'
                                            : undefined
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Patvirtinkite slaptažodį
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Patvirtinkite slaptažodį"
                                />
                                <InputError
                                    message={
                                        errors.password_confirmation
                                            ? 'Slaptažodžiai nesutampa'
                                            : undefined
                                    }
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Sukurti paskyrą
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Jau turite paskyrą?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Prisijunkite čia.
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
