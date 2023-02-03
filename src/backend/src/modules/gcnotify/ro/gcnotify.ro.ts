export class GcNotifyRO {
  data: {
    id: number;

    reference: number | null;

    to: string | number;

    status: string;

    created_at: Date;

    completed_at: Date | null;

    sent_at: Date | null;

    notification_type: string;

    template_id: number;

    template_version: number;
  };
}
