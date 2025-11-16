import AlertError from '@/components/alert-error';
import Heading from '@/components/heading';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { Head, router } from '@inertiajs/react';
import { UserCog } from 'lucide-react';
import { useState } from 'react';

interface UserRole {
    value: string;
    label: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    users: User[];
    userRoles: UserRole[];
    errors: Record<string, string>;
}

export default function Users({ users, userRoles, errors }: Props) {
    const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

    const handleRoleChange = (userId: number, newRole: string) => {
        if (confirm('Ar tikrai norite pakeisti šio vartotojo rolę?')) {
            setLoadingUserId(userId);
            router.patch(
                admin.users.updateRole({ user: userId }).url,
                { role: newRole },
                {
                    onFinish: () => setLoadingUserId(null),
                },
            );
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'administratorius':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'darbuotojas':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'klientas':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Vartotojai" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Vartotojai"
                        description="Vartotojų valdymas ir rolių keitimas"
                    />
                </div>

                {Object.keys(errors).length > 0 && (
                    <AlertError errors={Object.values(errors)} />
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Visi vartotojai</CardTitle>
                        <CardDescription>
                            Viso sistemoje: {users.length}{' '}
                            {users.length < 2 ? 'vartotojas' : 'vartotojai'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Vardas</TableHead>
                                    <TableHead>El. paštas</TableHead>
                                    <TableHead>Rolė</TableHead>
                                    <TableHead>Sukurta</TableHead>
                                    <TableHead className="text-right">
                                        Veiksmai
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.id}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold capitalize ${getRoleBadgeColor(user.role)}`}
                                            >
                                                {user.role}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString('lt-LT')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Select
                                                    value={user.role}
                                                    onValueChange={(value) =>
                                                        handleRoleChange(
                                                            user.id,
                                                            value,
                                                        )
                                                    }
                                                    disabled={
                                                        loadingUserId ===
                                                        user.id
                                                    }
                                                >
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {userRoles.map(
                                                            (role) => (
                                                                <SelectItem
                                                                    key={
                                                                        role.value
                                                                    }
                                                                    value={
                                                                        role.value
                                                                    }
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        <UserCog className="h-4 w-4" />
                                                                        {
                                                                            role.label
                                                                        }
                                                                    </span>
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
