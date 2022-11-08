// eslint-disable-next-line import/named
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface StagesArrayProps {
  stages: StageProps[];
}

export interface StageProps {
  id: number;
  label: string;
  icon: IconDefinition;
  active: boolean;
}
