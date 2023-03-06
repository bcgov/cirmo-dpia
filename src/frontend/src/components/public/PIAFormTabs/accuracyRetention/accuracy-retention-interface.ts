export interface IAccuracyCorrectionAndRetention {
  accuracy?: {
    description?: string | null;
  };
  correction?: {
    haveProcessInPlace?: string | null;
    willDocument?: string | null;
    willConductNotifications?: string | null;
  };
  retention?: {
    usePIForDecision?: string | null;
    haveApprovedInfoSchedule?: string | null;
    describeRetention?: string | null;
  };
}
