export interface ISurvey {
  id: number;
  title: string;
  description: string;
  dateCreated: Date;
  closingDate: Date;
  template: boolean;
  published: boolean;
}