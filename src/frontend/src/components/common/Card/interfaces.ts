import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface CardArrayProps {
    cards: CardProps[];
}

export interface CardProps {
    id: number;
    icon: IconDefinition;
    title: string;
    text: string;
    button: boolean;
    buttonText?: string;
    buttonIcon?: IconDefinition;
}
