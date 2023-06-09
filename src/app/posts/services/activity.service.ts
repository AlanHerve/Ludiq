import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {apiUrl} from "../../services/api-url";
import {ActivityDTO} from "../models/activity-dto";


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
  newActivity(formData: FormData): Observable<any> {
    return this.http.post<any>(`${apiUrl}/activity.php`, formData);
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
}
