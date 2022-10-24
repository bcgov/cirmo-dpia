import {
  faGaugeSimpleHigh,
  faHandsHelping,
  faFileSignature,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';

const ppqTestResults = [
  {
    id: 1,
    icon: faGaugeSimpleHigh,
    title: 'Complexity',
    text: "We'll estimate whether your initiative has a relatively low, medium or high level of potential privacy implications.",
    button: false,
  },
  {
    id: 2,
    icon: faHandsHelping,
    title: 'Collaborators',
    text: "We'll estimate how many subject matter experts you may need to collaborate with on you PIA.",
    button: false,
  },
  {
    id: 3,
    icon: faFileSignature,
    title: 'Template',
    text: "We'll show you which PIA template to download depending on whether you're doing a regular PIA, an initiative update or a corporate checklist.",
    button: true,
    buttonText: 'Download',
    buttonIcon: faFileDownload,
  },
];

export default ppqTestResults;
