export interface IAccuracyCorrectionAndRetention {
  accuracy: {
    description: string;
  };
  correction: {
    haveProcessInPlace: string;
    willDocument: string;
    willConductNotifications: string;
  };
  retention: {
    usePIForDecision: string;
    haveApprovedInfoSchedule: string;
    describeRetention: string;
  };
}

export interface AccuracyCorrectionAndRetentionProps {
  showComments?: boolean;
}
