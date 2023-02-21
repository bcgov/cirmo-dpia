export interface ICollectionUseAndDisclosure {
  steps?: [StepInput];

  collectionNotice?: CollectionNoticeInput;
}

interface StepInput {
  drafterInput: string;
  mpoInput: string;
  foippaInput: string;
  OtherInput: string;
}
interface CollectionNoticeInput {
  drafterInput: string;
  mpoInput: string;
}
