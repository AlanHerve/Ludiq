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
    return this.http.post<any>(`${apiUrl}/login.php`, userDTO).pipe(
      map(response => {
        // Check if the response is successful
        if (response && response.success === true) {
          // Store the user in local storage
          localStorage.setItem('currentUser', JSON.stringify(response.data));

          // Assign the token value to the token property of userDTO
          userDTO.token = response.token;
          console.log(userDTO.email);

          return response.data;
        } else {
          // If the response is not successful, throw an error
          throw new Error(response.message || 'Login failed');
        }
      })
    );
  }


  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return user ? true : false;
  }
}
