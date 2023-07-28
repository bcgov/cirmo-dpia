export interface IReview {
  programArea: {
    selectedRoles: string[];
    reviews?: {
      [role: string]: IReviewSection;
    };
  };
  mpo: IReviewSection;
  cpo?: Array<IReviewSection>;
}

export interface IReviewSection {
  isAcknowledged: boolean;
  reviewNote: string;
  reviewedByDisplayName?: string;
  reviewedByGuid?: string;
  reviewedAt?: string;
}
