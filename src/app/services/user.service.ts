import {Injectable} from "@angular/core";
import {UserDTO} from "../models/user-dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/Backend/EntryPoint'
  constructor(private http: HttpClient) {}

  registerUser(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/register.php`, userDTO);
  }

  loginUser(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/login.php`, userDTO).pipe(
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
