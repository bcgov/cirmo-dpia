export interface IReview {
  programArea: {
    selectedRoles: string[];
    reviews?: {
      [role: string]: IReviewSection;
    };
  };
  mpo: IReviewSection;
  cpo?: {
    [guid: string]: IReviewSection;
  };
}

export interface IReviewSection {
  isAcknowledged: boolean;
  reviewNote: string;
  reviewedByDisplayName?: string;
  reviewedByGuid?: string;
  reviewedAt?: string;
}
