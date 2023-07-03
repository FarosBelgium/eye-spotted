import {ExpeditionTargetId} from "./expeditionTargetId";

export interface CreateExpedition{
  id: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  expeditionTargets: ExpeditionTargetId[];
}
