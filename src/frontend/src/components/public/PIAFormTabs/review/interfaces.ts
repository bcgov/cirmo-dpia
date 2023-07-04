export interface IReview {
  programArea: {
    selectedRoles: string[];
    review?: {
      isAcknowledged: boolean;
      reviewNote: string;
      reviewedByDisplayName?: string;
      reviewedByGuid?: string;
      reviewedAt?: string;
    };
  };
  mpo: {
    isAcknowledged: boolean;
    reviewNote: string;
    reviewedByDisplayName?: string;
    reviewedByGuid?: string;
    reviewedAt?: string;
  };
}

export interface IReviewSection {
  isAcknowledged: boolean;
  reviewNote: string;
  reviewedByDisplayName?: string;
  reviewedByGuid?: string;
  reviewedAt?: string;
}
