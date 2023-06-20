export interface IReview {
  programArea: {
    selectedRoles: string[];
  };
  mpo: {
    isAcknowledged: boolean;
    reviewNote: string;
    ReviewedBy?: string;
    ReviewedByGUID?: string;
    DateReviewed?: string;
  };
}
