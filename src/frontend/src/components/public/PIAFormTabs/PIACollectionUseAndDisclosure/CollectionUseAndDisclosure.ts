export interface ICollectionUseAndDisclosure {
  steps?: [StepInput];

  collectionNotice?: CollectionNoticeInput;
}

export interface StepInput {
  drafterInput?: string;
  mpoInput?: string;
  foippaInput?: string;
  OtherInput?: string;
}
export interface CollectionNoticeInput {
  drafterInput?: string;
  mpoInput?: string;
}
