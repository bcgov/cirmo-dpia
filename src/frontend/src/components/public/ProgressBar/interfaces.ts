import { ReactNode } from "react";

export interface StagesProps {
    stages: StageProps[];
}

export interface StageProps {
    id: number;
    label: string;
    icon: string;
    active: boolean;
}
