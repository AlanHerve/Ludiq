import {Injectable} from "@angular/core";
import {UserDTO} from "../models/user-dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/Backend/EntryPoint'
  constructor(private http: HttpClient) {}

  registerUser(userDTO: UserDTO): Observable<UserDTO> {
    console.log(userDTO);
    return this.http.post<UserDTO>(`${this.apiUrl}/register.php`, userDTO);
  }
}
