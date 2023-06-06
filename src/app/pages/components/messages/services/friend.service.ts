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

  isFriendWidth(user1: number, user2: number): Observable<boolean> {
    const params = new HttpParams()
      .set('user1', user1)
      .set('user2', user2);
    return this.http.get<boolean>(`${apiUrl}/friend.php`, {params})
  }

  addFriend(id_user: number): Observable<UserDTO> {
    const params = new HttpParams()
      .set('type', 'add')
      .set('user', id_user);
    return this.http.post<UserDTO>(`${apiUrl}/friend.php`, {params})
  }

}
