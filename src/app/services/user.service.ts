import {Injectable} from "@angular/core";
import {UserDTO} from "../models/user-dto";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
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

  getCurrentId(): number | null {
    try {
      return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    } catch(e) {
      console.error(e);
      return null;
    }
  }

  private currentIdSubject = new BehaviorSubject<number | null>(null);
  public currentId$ = this.currentIdSubject.asObservable();

// Update the currentIdSubject in your login method
  loginUser(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<any>(`${apiUrl}/login.php`, userDTO).pipe(
      map(response => {
        if (response && response.success === true) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          userDTO.token = response.token;
          this.currentIdSubject.next(parseInt(response.data.id));
          return response.data;
        } else {
          throw new Error(response.message || 'Login failed');
        }
      })
    );
  }




  findUserById(userId: number): Observable<UserDTO> {
    const params = new HttpParams()
      .set('user_id', userId);
    return this.http.get<UserDTO>(`${apiUrl}/user.php`, {params}).pipe(
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
