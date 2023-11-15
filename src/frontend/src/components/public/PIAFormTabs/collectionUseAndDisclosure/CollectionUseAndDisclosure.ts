import { RichTextContent } from '../types';

export interface ICollectionUseAndDisclosure {
  steps: Array<StepInput>;

  collectionNotice: CollectionNoticeInput;
}

export interface StepInput extends Record<string, string> {
  drafterInput: string;
  mpoInput: string;
  foippaInput: string;
  OtherInput: string;
}
export interface CollectionNoticeInput {
  drafterInput?: RichTextContent;
  mpoInput?: RichTextContent;
}

export interface PIACollectionUseAndDisclosureProps {
  showComments?: boolean;
}
