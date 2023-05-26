import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "./api-url";
import {RegularPostDto} from "../models/regular-post-dto";

@Injectable({
  providedIn: 'root'
})
export class RegularPostService {

  constructor(private http: HttpClient) {}

  newRegularPost(regularPostDTO: RegularPostDto): Observable<RegularPostDto> {
    return this.http.post<RegularPostDto>(`${apiUrl}/regularPost.php`, regularPostDTO);
  }
}
