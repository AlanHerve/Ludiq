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
    return this.http.post<UserDTO>(`${apiUrl}/login.php`, userDTO).pipe(
      map(response => {
        if (response) {

          // Stocker le jeton dans le stockage local
          if(response.token){
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.isPartOfOrganization(3);
          }else {
            alert("wrong username or password");
          }


          // Affecter la valeur du jeton à la propriété token de userDTO

          userDTO.token = response.token;

        }
        console.log(localStorage.getItem('currentUser'));
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
    const obj: String = JSON.parse(localStorage.getItem('currentUser')!).token;

    console.log("mathc " + obj.match(regex));
    console.log(match);

    return obj.match(regex)!=null;
  }

}
