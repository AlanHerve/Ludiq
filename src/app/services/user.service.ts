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

  logoutUser(): void {
    localStorage.removeItem('currentUser');
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

  getCurrentId(): number{
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
  }

  findUserById(userDto: UserDTO): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${apiUrl}/user.php`).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }


  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return !!user;
  }

  isPartOfOrganization(id_organization: number): boolean {
    const underscore: String = "_";
    const match = underscore.concat(id_organization.toString()).concat(underscore.toString());
    //const match =bracket.concat(underscore.toString()).concat(id_organization.toString()).concat(underscore.toString()).concat(bracket2.toString());
    const regex = new RegExp(match, 'gm');
    const token: String = JSON.parse(localStorage.getItem('currentUser')!).token;

    console.log("mathc " + token.match(regex));
    console.log(match);

    return token.match(regex)!=null;
  }

}
