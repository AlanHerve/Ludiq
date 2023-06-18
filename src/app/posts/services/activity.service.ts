import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {apiUrl} from "../../services/urls";
import {ActivityDTO} from "../models/activity-dto";
import {ActivityParticipantsDTO} from "../../pages/activity/models/activity-participants-dto";


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private needDelete = new Subject<number>();
  currentDeleteState = this.needDelete.asObservable();

  constructor(private http: HttpClient) {}


  /**
   * publish an activity
   * @param formData
   */
  newActivity(formData: FormData): Observable<string> {
    console.log("Phoey");
    return this.http.post<string>(`${apiUrl}/activity.php`, formData).pipe(
      map(response => {

        return response;
      })
    );
  }


  deleteActivity(activityId: number): Observable<string> {
    const params =  {
      type: 'deleteActivity',
      activityId: activityId
    };

    return this.http.post<string>(`${apiUrl}/activity.php`, params).pipe(
      map(response => {

        //notify the activity list componennt to remove the activity
        this.needDelete.next(activityId);
        return response;
      })
    );
  }

  getAllActivities(): Observable<ActivityDTO[]> {
    const params = new HttpParams()
      .set('type', 'home');
    return this.http.get<ActivityDTO[]>(`${apiUrl}/activity.php`, {params});
  }

  /**
   * get the trendy activities
   */
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

  /**
   * find activities about specified hobby
   * @param id: id of the hobby
   */
  getHobbyActivities(id: number): Observable<ActivityDTO[]> {
    const params = new HttpParams()
      .set('type', 'hobby_activities')
      .set('hobbyId', id)
    return this.http.get<ActivityDTO[]>(`${apiUrl}/activity.php`, {params});
  }

  /**
   * find all the informations of an activity depending on its id
   * @param id
   */
  findActivityById(id: number): Observable<ActivityDTO> {
    const params = new HttpParams()
      .set('type', 'activity')
      .set('activityId', id)
    return this.http.get<ActivityDTO>(`${apiUrl}/activity.php`, {params});
  }


  /**
   * find all user signed up for an activity
   * @param activityId
   */
  findActivityParticipants(activityId: number): Observable<ActivityParticipantsDTO> {
    const params = new HttpParams()
      .set('type', 'activity_participants')
      .set('activityId', activityId)
    return this.http.get<ActivityParticipantsDTO>(`${apiUrl}/activity.php`, {params});
  }

  /**
   * sign up a user
   * @param userId
   * @param activityId
   */
  registerUserToActivity(userId: number, activityId: number) {
    const params =  {
      type: 'register_activity',
      userId: userId,
      activityId: activityId
    }
    return this.http.post<ActivityParticipantsDTO>(`${apiUrl}/activity.php`, params);
  }

  /**
   * remove user from signed up users
   * @param userId
   * @param activityId
   */
  deleteUserFromActivity(userId: number, activityId: number) {
    const params =  {
      type: 'unregister_activity',
      userId: userId,
      activityId: activityId
    }
    return this.http.post<ActivityParticipantsDTO>(`${apiUrl}/activity.php`, params);
  }

  /**
   * get the name of the organization from the fake login token of the user
   * @param token
   */
  getOrganizationName(token: string): string {

    let to_return: string = token;
    console.log(to_return);
    to_return = to_return.replace(/([a-zA-Z0-9]*_){3,3}/,"");

    return to_return;
  }

  /**
   * get the id of the organization from the fake login token of the user
   * @param token
   */
  getOrganizationID(token: string): number{

    let to_return : string = token;

    to_return = to_return.replace(/([a-zA-Z0-9]*_){2,2}/, "");
    to_return = to_return.replace(/_[a-zA-Z0-9 À-ú]*/, "");

    return parseInt(to_return);
  }

}
