export interface TimeEntry {
  activity?: 'customer' | 'internal' | 'absence';
  customer?: string;
  project?: string;
  billable?: boolean;
  role?: string;
  comment?: string;
  absenceType?: string;
  internalCategory?: string;
}

export interface WorkflowStep {
  id: string;
  label: string;
  options: string[];
  required: boolean;
  dependsOn?: string;
}

export interface SelectionState {
  [key: string]: string;
}