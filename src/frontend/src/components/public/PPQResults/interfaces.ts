import { IPPQResult } from '../../../types/interfaces/ppq-result.interface';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IComponentProps {
  result: IPPQResult;
}

export interface PpqResultPage {
  [key: string]: {
    id: number;
    icon: IconDefinition;
    title: string;
    text: string;
    button: boolean;
    buttonText?: string;
    buttonIcon?: IconDefinition;
    buttonUrl?: string;
  };
}
