import {Injectable} from "@angular/core";
import {UserDTO} from "../models/user-dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./api-url";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${apiUrl}/register.php`, userDTO);
  }

  loginUser(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${apiUrl}/login.php`, userDTO).pipe(
      map(response => {
        // Verify if the response is valid before storing it in local storage
        if (response && response.token) {
          // Store the token in local storage
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Assign the token value to the token property of userDTO
          userDTO.token = response.token;
          console.log(userDTO.email);

          return response;
        } else {
          // If the response is not valid, throw an error
          throw new Error('Invalid response from server');
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return user ? true : false;
  }
}
