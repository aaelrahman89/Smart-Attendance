import { TimeSpan } from './../../commonModels/TimeSpan';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface LectureScheduleDTO {
   TermCode: string;
   TermNameEn: string;
   TermNameAr: string;
   CourseSubject: string;
   CourseNumber: string;
   CourseTitleAr: string;
   CourseTitleEn: string;
   Crn: string;
   StartTime: TimeSpan;
   EndTime: TimeSpan;
   RoomCode: string;
   LectureTypeId: number;
   LectureTypeCode: string;
   Saturday: boolean;
   Sunday: boolean;
   Monday: boolean;
   FacultyMemberId: number;
   Tuesday: boolean;
   Wensday: boolean;
   Thursday: boolean;
   IsActive: boolean;
   ScheduleTypeCode: string;
   LectureType: LectureType;
   Day: number;
   DayNameAr: string;
   DayNameEn: string;
}

interface LectureType {
   Id: string;
   Code: string;
   NameAr: string;
   NameEn: string;
}
