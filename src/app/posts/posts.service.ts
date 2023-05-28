import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "../services/api-url";
import {RegularPostDTO} from "../models/regular-post-dto";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  newRegularPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${apiUrl}/regularPost.php`, formData);
  }
}
