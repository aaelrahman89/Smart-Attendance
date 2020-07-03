import { FilterModel } from './../../commonModels/FilterModel';

export class LectureScheduleFilterModelForAttendance extends FilterModel {

  Crn: string = '';
  TermCode: string = '';
  RoomCode: string = '';
  ScheduleTypeCode: string = '';
  FacultyMemberID: number;

}


