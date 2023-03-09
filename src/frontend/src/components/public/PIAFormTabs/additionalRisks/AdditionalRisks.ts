export interface IAdditionalRisks {
  risks: Array<IAdditionRisk>;
}

export interface IAdditionRisk extends Record<string, string> {
  risk: string;
  response: string;
}
