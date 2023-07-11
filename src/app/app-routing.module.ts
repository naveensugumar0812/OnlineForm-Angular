import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { SubmitFeedbackComponent } from './submit-feedback/submit-feedback.component';

const routes: Routes = [
  { path: 'submitFeedback', component: SubmitFeedbackComponent },
  { path: 'getFeedbackList', component: FeedbackListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
