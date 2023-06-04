import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {UserDTO} from "../../../../models/user-dto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiUrl} from "../../../../services/api-url";
import {MessageDTO} from "../models/message-dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageListSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getMessagesBetweenUsers(user1: number, user2: number): Observable<MessageDTO[]> {
    const params = new HttpParams()
      .set('type', 'between')
      .set('user1', user1)
      .set('user2', user2);
    return this.http.get<MessageDTO[]>(`${apiUrl}/message.php`, {params});
  }

  createMessage(messageDTO: MessageDTO): Observable<string[]> {
    return this.http.put<string[]>(`${apiUrl}/message.php`, messageDTO);
  }

  updateMessageList(): void {
    this.messageListSubject.next();
  }

  getMessageListUpdates(): Observable<void> {
    return this.messageListSubject.asObservable();
  }

}
