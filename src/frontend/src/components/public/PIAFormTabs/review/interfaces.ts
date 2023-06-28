export interface IReview {
  programArea: {
    selectedRoles: string[];
  };
  mpo: {
    isAcknowledged: boolean;
    reviewNote: string;
    reviewedByDisplayName?: string;
    reviewedByGuid?: string;
    reviewedAt?: string;
  };
}
