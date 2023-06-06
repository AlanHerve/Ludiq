import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserDTO} from "../../../../models/user-dto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiUrl} from "../../../../services/api-url";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private http: HttpClient) {
  }

  getAllFriends(user : number): Observable<UserDTO[]> {
    const params = new HttpParams()
      .set('user', user);
    return this.http.get<UserDTO[]>(`${apiUrl}/friend.php`, {params});
  }

}
