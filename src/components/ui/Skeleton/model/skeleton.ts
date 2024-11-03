import {ReactNode} from "react";

export interface SkeletonProps {
    children: ReactNode;
    ready: boolean;
    className?: string;
    type: 'address' | 'recipient' | 'profile' | 'tariff' | 'dashboard';
}
