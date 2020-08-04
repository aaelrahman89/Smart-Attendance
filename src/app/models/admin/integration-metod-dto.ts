export interface IntegrationMetodDTO {
  TermCode: string;
  integrationServices: IntegrationService[];
  repeaterClasses: RepeaterClass[];
}

interface RepeaterClass {
  ID: string;
  Name: string;
}

interface IntegrationService {
  Id: number;
  ServiceName: string;
  DuplicateNumber: string;
  DuplicateNumberName: string;
  IsActiveName: string;
  Date: string;
  Time: Time;
  IsActive: boolean;
}

interface Time {
  Ticks: number;
  Days: number;
  Hours: number;
  Milliseconds: number;
  Minutes: number;
  Seconds: number;
  TotalDays: number;
  TotalHours: number;
  TotalMilliseconds: number;
  TotalMinutes: number;
  TotalSeconds: number;
}
