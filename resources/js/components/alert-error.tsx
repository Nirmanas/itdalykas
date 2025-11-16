import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export default function AlertError({
    errors,
    title,
}: {
    errors: string[];
    title?: string;
}) {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{title || 'Kažkas nepavyko.'}</AlertTitle>
            <AlertDescription>
                <ul className="list-inside list-disc text-sm"></ul>
            </AlertDescription>
        </Alert>
    );
}
