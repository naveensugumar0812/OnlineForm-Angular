import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent {
   feedbackList!: Feedback[];
   displayedColumns: string[] = ['feedbackId', 'name', 'emailAddress', 'contactType','submissionDate','message'];
   dataSource: any;
   contactType!: string;
   dateSort!: string
   sortableList!: MatSort;
   @ViewChild(MatSort) sort!: MatSort;

   constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private feedbackService: FeedbackService
    ) {
      console.log(this.contactType);
      this.getFeedbackList();
   }

   getFeedbackList() {
    this.feedbackService.getFeedbackList(this.contactType?this.contactType:"").subscribe({
      next:(data)=>{
        console.log(data);
        this.feedbackList = data as Feedback[];
        this.dataSource = new MatTableDataSource(this.feedbackList);
        this.dataSource.sort = this.sort;
      },
      error:(errorMsg)=>{
        console.log(errorMsg);
      }

    });
  }

onRadioChange(){
  console.log('contactType' , this.contactType);
  this.getFeedbackList();
}
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
