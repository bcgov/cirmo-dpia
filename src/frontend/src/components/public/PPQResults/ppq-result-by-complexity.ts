import {
  faGaugeSimpleHigh,
  faHandsHelping,
  faFileSignature,
  faFileDownload,
  // eslint-disable-next-line import/named
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { PiaComplexity } from '../../../types/enums/pia-complexity.enum';
import PpqResultText from './messages';

interface PpqResultPage {
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

const ppqResultTemplate: PpqResultPage = {
  complexity: {
    id: 1,
    icon: faGaugeSimpleHigh,
    title: 'Complexity',
    text: '',
    button: false,
  },
  collaborators: {
    id: 2,
    icon: faHandsHelping,
    title: 'Collaborators',
    text: '',
    button: false,
  },
  template: {
    id: 3,
    icon: faFileSignature,
    title: 'Template',
    text: '',
    button: true,
    buttonText: 'Download',
    buttonIcon: faFileDownload,
    buttonUrl:
      'https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/information-management-technology/information-privacy/privacy-impact-assessments/privacy-impact-assessment-for-ministries/privacy_impact_assessment_template_for_ministries.docx',
  },
};

const ppqResultByComplexity = (complexity?: PiaComplexity) => {
  if (!complexity) {
    return [];
  }

  const ppqResult: PpqResultPage = JSON.parse(
    JSON.stringify(ppqResultTemplate),
  );

  switch (complexity) {
    case PiaComplexity.LOW:
      ppqResult.complexity.text = PpqResultText.LowComplexityText.en;
      ppqResult.collaborators.text =
        PpqResultText.LowComplexityCollaboratorsText.en;
      ppqResult.template.text = PpqResultText.LowComplexityTemplateText.en;
      break;

    case PiaComplexity.STANDARD:
      ppqResult.complexity.text = PpqResultText.StandardComplexityText.en;
      ppqResult.collaborators.text =
        PpqResultText.StandardComplexityCollaboratorsText.en;
      ppqResult.template.text = PpqResultText.StandardComplexityTemplateText.en;
      break;

    case PiaComplexity.HIGH:
      ppqResult.complexity.text = PpqResultText.HighComplexityText.en;
      ppqResult.collaborators.text =
        PpqResultText.HighComplexityCollaboratorsText.en;
      ppqResult.template.text = PpqResultText.HighComplexityTemplateText.en;
      break;
  }

  return Object.values(ppqResult);
};

export default ppqResultByComplexity;
