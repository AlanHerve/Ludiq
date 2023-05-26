import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "./api-url";
import {RegularPostDTO} from "../models/regular-post-dto";

@Injectable({
  providedIn: 'root'
})
export class RegularPostService {

  constructor(private http: HttpClient) {}

  newRegularPost(regularPostDTO: RegularPostDTO): Observable<RegularPostDTO> {
    return this.http.post<RegularPostDTO>(`${apiUrl}/regularPost.php`, regularPostDTO);
  }
}
