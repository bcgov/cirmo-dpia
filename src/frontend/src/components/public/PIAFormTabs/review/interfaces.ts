export interface IReview {
  programArea: {
    selectedRoles: string[];
    reviews?: {
      role?: IReviewSection;
    };
  };
  mpo: IReviewSection;
}

export interface IReviewSection {
  isAcknowledged: boolean;
  reviewNote: string;
  reviewedByDisplayName?: string;
  reviewedByGuid?: string;
  reviewedAt?: string;
}
