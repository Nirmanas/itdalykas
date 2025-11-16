import { Car } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-black text-sidebar-primary-foreground">
                <Car className="size-5 bg-black text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Automobilių tiuningas - Nojus Birmanas
                </span>
            </div>
        </>
    );
}
