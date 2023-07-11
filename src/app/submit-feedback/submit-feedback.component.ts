import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.css']
})
export class SubmitFeedbackComponent {

  feedback: Feedback;
  successMessage:boolean = false;
  errorMessage:boolean = false;
  feedbackFormGroup!: FormGroup;
  errorinfo!:any;
  
  constructor(
    private feedbackService: FeedbackService, 
    private router: Router,
    private formBuilder: FormBuilder
    ) {
    this.feedback= new Feedback();
    this.feedbackFormGroup = this.formBuilder.group({
      name: new FormControl(''),
      emailAddress: new FormControl(''),
      contactType: new FormControl(''),
      message: new FormControl('')
    });
   }

  onSubmit() {
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedbackFormGroup.value).subscribe({
      next:(data)=>{
        this.successMessage = true;
        this.feedbackFormGroup.reset({});
        this.errorMessage = false;
      },
      error:(errorMsg)=>{
        this.errorinfo = (<string>errorMsg.error).replaceAll("{","")
        .replaceAll("}","").replace(/['"]+/g, '').split(",");
        this.errorMessage = true;
        this.successMessage = false;
      } 

    });
  }

  closeAlert(){
    this.successMessage = false;
    this.errorMessage = false;
  }

}
