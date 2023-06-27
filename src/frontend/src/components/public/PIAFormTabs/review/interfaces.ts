export interface IReview {
  programArea: {
    selectedRoles: string[];
  };
  mpo: {
    isAcknowledged: boolean;
    reviewNote: string;
    reviewedByDisplayName?: string;
    reviewedByGUID: string;
    reviewedAt: string;
  };
}
