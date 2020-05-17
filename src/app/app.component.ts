import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentData } from 'src/app/shared/student-data';
import { SubjectMarks} from 'src/app/shared/subject-marks';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { StudentDetailService } from './shared/student-detail.service';
import { NgForm } from '@angular/forms';
import{ModalDirective,BsModalService,BsModalRef} from 'ngx-bootstrap/modal';
import { BsComponentRef } from 'ngx-bootstrap/component-loader/public_api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  subDataArray :SubjectMarks[]=[];
  //SubjectMarks = new SubjectMarks();
  dtOptions: DataTables.Settings = {};
  dtTrigger:  Subject<any> = new Subject();
  students : StudentData[] =[];
 // stu : StudentData[]=[];
  classDetails: any;
  subjectDetails: any;
  modalRef : BsModalRef;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('myModal',{static: false}) public myModal: ModalDirective;
  title = 'AngularProject';
  
  constructor(public service: StudentDetailService,private toastr: ToastrService, private modalService : BsModalService) { }
  
  ngOnInit(): void {
    //this.subDataArray.push(this.SubjectMarks);
    this.resetForm();
    this.service.getSubjectDetails().subscribe(res=>{
      this.subjectDetails= res;
     
    })
 this.service.getClassDetails().subscribe(res=>{
   this.classDetails= res;
  
   
   
 })
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[1,'asc']]  
    };
    this.service.getStudentDetailList().subscribe(
      res => {
        this.students = res as StudentData[];
        this.dtTrigger.next();
      }
    )
    
    // this.service.getPaymentDetailList().subscribe(
    //   res=>{
        
    //   }

    // );
  }
  resetForm(form?: NgForm){
    
    if(form != null)
     form.resetForm();
     this.service.formData={
       stuId: 0,
       firstName: '', 
       lastName : '',
       className: '',
       classId: 0,
       subjectMarksDetail : [{
         subId: 0,
         subjectName: '',
         marks: 0
       }]
      }
     
   }
   addElement(){
  
  
  this.service.formData.subjectMarksDetail.push({subId:0, subjectName: '', marks:0});
   
   }
   removeElement(index){
     this.service.formData.subjectMarksDetail.splice(index);
    
   }
   populateForm(sd: StudentData){
   
    this.service.formData= Object.assign({},sd);
   }
   

    AddButton(){
      this.service.formData={
        stuId: 0,
        firstName: '', 
        lastName : '',
        className: '',
        classId: 0,
        subjectMarksDetail : [{
          subId: 0,
          subjectName: '',
          marks: 0
        }]
       }
    }
    onDelete(stuId){
      this.service.deleteStudentDetail(stuId).subscribe(res=>{
        this.toastr.warning('Deleted Successfully','Student Deleted Successfully!');
        
        this.service.getStudentDetailList().subscribe(
          res => {
            this.students = res as StudentData[];
            
          }
        )
       
      },
      err=>{ console.log("error occured");})
        }

      refreshList(){
       
        this.service.getStudentDetailList().subscribe(
          res => {
            this.students = res as StudentData[];
            
          }
        )
        }
  onSubmit(form: NgForm){
  debugger;
    if(form.value.stuId == 0){
      this.service.postStudentDetail().subscribe(
        res=>{
         this.resetForm(form);
         this.toastr.success('Submitted Successfully','Student Registered Successfully!');
         
        }
      )
    }
    else{
      console.log("ts",this.service.formData);
      this.service.putStudentDetail().subscribe(
        res=>{
          this.resetForm(form);
          this.toastr.info('Updated Successfully','Student Updated Successfully!');
         
        },
        err=>{console.log("error occured");}
      )
    }
   
  }
}
