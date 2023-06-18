import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiUrl} from "../../../services/urls";
import {MessageDTO} from "../models/message-dto";
import {map} from "rxjs/operators";
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageNeedToAddMessage = new Subject<MessageDTO>();
  currentNeedToAddMessage = this.messageNeedToAddMessage.asObservable();

  private needToDeleteMessage = new Subject<number>();
  currentNeedToDeleteMessage = this.needToDeleteMessage.asObservable();

  constructor(private http: HttpClient) {
  }

  getMessagesBetweenUsers(user1: number, user2: number): Observable<MessageDTO[]> {
    const params = new HttpParams()
      .set('type', 'between')
      .set('user1', user1)
      .set('user2', user2);
    return this.http.get<MessageDTO[]>(`${apiUrl}/message.php`, {params});
  }

  createMessage(messageDTO: MessageDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${apiUrl}/message.php`, messageDTO).pipe(
      map(response => {
        this.messageNeedToAddMessage.next(response);
        return response;
      })
    );
  }

  deleteMessage(message_id:number): Observable<number> {
    const params =  {
      message_id: message_id
    }
    return this.http.post<number>(`${apiUrl}/message.php`, params).pipe(
      map(response => {
        this.needToDeleteMessage.next(response);
        return response
      })
    )
  }
}
