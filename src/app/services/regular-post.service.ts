import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../models/user-dto";
import {Observable} from "rxjs";
import {apiUrl} from "./api-url";
import {map} from "rxjs/operators";
import {RegularPostDto} from "../models/regular-post-dto";

@Injectable({
  providedIn: 'root'
})
export class RegularPostService {

  constructor(private http: HttpClient) {}

  newRegularPost(regularPostDTO: RegularPostDto): Observable<RegularPostDto> {
    return this.http.post<RegularPostDto>(`${apiUrl}/regularPost.php`, regularPostDTO);
  }
  registerUser(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${apiUrl}/register.php`, userDTO);
  }

  loginUser(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${apiUrl}/login.php`, userDTO).pipe(
      map(response => {
        if (response) {
          // Stocker le jeton dans le stockage local
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Affecter la valeur du jeton à la propriété token de userDTO
          userDTO.token = response.token;
          console.log(userDTO.email);
        }
        return response;
      })
    );
  }
}
