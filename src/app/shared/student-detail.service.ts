import { Injectable } from '@angular/core';
import { StudentData } from './student-data';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {
  formData : StudentData;
  readonly rootUrl = 'http://localhost:15361/api';
  constructor(private http: HttpClient) { }
  getStudentDetailList(){
    return this.http.get(this.rootUrl+'/Student/GetStudentDetails')

  }
  getClassDetails(){
    return this.http.get(this.rootUrl+'/Student/GetAllClass')
  }
  getSubjectDetails(){
    return this.http.get(this.rootUrl+'/Student/GetAllSubject')
  }
  postStudentDetail(){
    
   
    return this.http.post(this.rootUrl+'/Student/PostStudentDetails',this.formData);
   }
   putStudentDetail(){
    debugger;
    console.log("p",this.formData);
    
    return this.http.put(this.rootUrl+'/Student/PutStudentDetails/'+this.formData.stuId,this.formData);
   }
  deleteStudentDetail(stuId){
   
return this.http.delete(this.rootUrl+'/Student/DeleteStudentDetails/'+stuId);
  }
}
