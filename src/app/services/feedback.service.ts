import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/onlineform/v1";

  submitFeedback(feedbackModel:Feedback) : Observable<Object>{

    return this.http.post(this.baseUrl+"/submitFeedback",feedbackModel,{responseType: 'text'});
  }

  getFeedbackList(contactType:string) : Observable<Object>{
    let params = new HttpParams();
    params = contactType?params.append('contactType', contactType):params;
    return this.http.get<Feedback[]>(this.baseUrl+'/getFeedbackList',{params:params});
  }

}
