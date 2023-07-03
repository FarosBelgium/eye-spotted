export interface ExpeditionFilter {
  name: string;
  animal: string;
  dateFrom: string | null | undefined;
  dateTo: string | null | undefined;
  tags: string[];
}
