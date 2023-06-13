import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {apiUrl} from "../../services/api-url";
import {ActivityDTO} from "../models/activity-dto";
import {ActivityParticipantsDTO} from "../../pages/activity/models/activity-participants-dto";


@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}


  getImage(imageName: string): Observable<Blob> {
    const options = { responseType: 'arraybuffer' as 'json' };
    const params = new HttpParams().set('imageName', imageName);
    return this.http.get<Blob>(`${apiUrl}/images.php`, { params, ...options }).pipe(
      map(response => new Blob([response], { type: 'image/jpeg' }))
    );
  }
  newActivity(formData: FormData): Observable<string> {
    return this.http.post<string>(`${apiUrl}/activity.php`, formData).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );;
  }
  getAllActivity(): Observable<ActivityDTO[]> {
    const params = new HttpParams()
      .set('type', 'home');
    return this.http.get<ActivityDTO[]>(`${apiUrl}/activity.php`, {params});
  }

  getTop3Activities(): Observable<ActivityDTO[]> {
    const params = new HttpParams()
      .set('type', 'top3');
    return this.http.get<ActivityDTO[]>(`${apiUrl}/activity.php`, {params});
  }

  getAllActivites(): Observable<ActivityDTO[]> {
    const params = new HttpParams()
      .set('type', 'all_activities')
    return this.http.get<ActivityDTO[]>(`${apiUrl}/activity.php`, {params});
  }

  findActivityById(id: number): Observable<ActivityDTO> {
    const params = new HttpParams()
      .set('type', 'activity')
      .set('activityId', id)
    return this.http.get<ActivityDTO>(`${apiUrl}/activity.php`, {params});
  }


  findActivityParticipants(activityId: number): Observable<ActivityParticipantsDTO> {
    const params = new HttpParams()
      .set('type', 'activity_participants')
      .set('activityId', activityId)
    return this.http.get<ActivityParticipantsDTO>(`${apiUrl}/activity.php`, {params});
  }

  registerUserToActivity(userId: number, activityId: number) {
    const params =  {
      type: 'register_activity',
      userId: userId,
      activityId: activityId
    }
    return this.http.post<ActivityParticipantsDTO>(`${apiUrl}/activity.php`, params);
  }

  deleteUserFromActivity(userId: number, activityId: number) {
    const params =  {
      type: 'unregister_activity',
      userId: userId,
      activityId: activityId
    }
    return this.http.post<ActivityParticipantsDTO>(`${apiUrl}/activity.php`, params);
  }
}
