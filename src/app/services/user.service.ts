import {Injectable} from "@angular/core";
import {UserDTO} from "../models/user-dto";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./urls";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(userDTO: UserDTO, userType: string): Observable<boolean> {
    const options = {
      'userDTO': userDTO,
      'userType': userType
    }
    return this.http.post<boolean>(`${apiUrl}/register.php`, options);
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
  }

  loginUser(userDTO: UserDTO): Observable<{ user: UserDTO }> {
    return this.http.post<{ user: UserDTO }>(`${apiUrl}/login.php`, userDTO).pipe(
      map(response => {
        if (response.user) {
          // Stocker le jeton dans le stockage local
          if(response.user.token){
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.isPartOfOrganization(3);
          }
          else {
            alert("wrong username or password");
          }
        }
        console.log(localStorage.getItem('currentUser'));
        return response;
      })
    );
  }

  getCurrentId(): number{
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
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

    return token.match(regex)!=null;
  }

  isAbleToDelete(id: number) {
    const compare_id = JSON.parse(localStorage.getItem('currentUser')!).id;
    return compare_id == id;
  }

  updateUserProfile(userDTO: UserDTO, avatar: File | null): Observable<UserDTO> {
    const formData = new FormData();
    formData.append('userDTO', JSON.stringify(userDTO));
    if (avatar) {
      formData.append('avatar', avatar, avatar.name);
    }
    return this.http.post<UserDTO>(`${apiUrl}/updateUser.php`, formData);
  }


}
