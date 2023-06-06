import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "../../services/api-url";
import {PostDTO} from "../models/post-dto";
import {map} from "rxjs/operators";
import {ActivityDTO} from "../../models/activity-dto";

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
    return this.http.post<any>(`${apiUrl}/post.php`, formData);
  }
  getAllActivity(): Observable<ActivityDTO[]> {
    const params = new HttpParams()
      .set('type', 'home');
    return this.http.get<ActivityDTO[]>(`${apiUrl}/activity.php`, {params});
  }
}
