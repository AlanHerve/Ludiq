import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiUrl} from "../../../services/urls";
import {FriendRequestDTO} from "../../../models/friend-request-dto";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private needDelete = new Subject<number>();
  currentDeleteState = this.needDelete.asObservable();
  constructor(private http: HttpClient) {
  }

  getAllFriends(user1 : number): Observable<FriendRequestDTO[]> {
    const params = new HttpParams()
      .set('user1', user1)
      .set('function_to_call', 'getAllFriends');
    return this.http.get<FriendRequestDTO[]>(`${apiUrl}/friend.php`, {params}).pipe(

      map(response => {
        return response;
      })
    );
  }

  isFriendWith(user1: number, user2: number): Observable<string> {
    const params = new HttpParams()
      .set('user1', user1)
      .set('user2', user2)
      .set('function_to_call', 'isFriendWith');
    return this.http.get<string>(`${apiUrl}/friend.php`, {params})
  }

  addFriend(user1: number, user2: number): Observable<string> {
    let function_to_call = "addFriend";
    const params = {
      user1: user1, user2: user2, function_to_call: function_to_call
    }
    return this.http.post<string>(`${apiUrl}/friend.php`, params)
  }

  acceptFriendship(user1: number, user2: number): Observable<string> {
    let function_to_call = "acceptFriendship";
    const params =  {
      user1: user1,
      user2: user2,
      function_to_call: function_to_call
    }
    return this.http.post<string>(`${apiUrl}/friend.php`, params);
  }

  removeFriend(user1: number, user2: number): Observable<string> {
    let function_to_call = "removeFriend";
    const params = {
      user1: user1, user2: user2, function_to_call: function_to_call
    }
    return this.http.post<string>(`${apiUrl}/friend.php`, params).pipe(
      map(response => {
        this.needDelete.next(user2);
        return response;
      })
    );

  }

}
