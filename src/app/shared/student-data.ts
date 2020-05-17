import { SubjectMarks } from './subject-marks';

export class StudentData {
    stuId : number=0;
    firstName : string = "";
    lastName : string = "";
    className: string= "";
    classId: number=0;
    subjectMarksDetail: [{
        subId: number;
        subjectName : string;
        marks : number;
    }]
}

