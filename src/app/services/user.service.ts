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
        if (response) {

          // Stocker le jeton dans le stockage local
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Affecter la valeur du jeton à la propriété token de userDTO


        }
        console.log(localStorage.getItem('currentUser'));
        return response;
      })
    );
  }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return user ? true : false;
  }
}
