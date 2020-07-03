export interface AvailableCollegesDTO {
  CollegeCode: string;
  CollegeName: string;
  LearningSystemSetting: LearningSystemSetting[];
}

interface LearningSystemSetting {
  Id: number;
  LearningSystemTypeId: number;
  IsDefault: boolean;
}
