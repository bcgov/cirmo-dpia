import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface StagesArrayProps {
    stages: StageProps[];
}

export interface StageProps {
    id: number;
    label: string;
    icon: IconDefinition;
    active: boolean;
}
