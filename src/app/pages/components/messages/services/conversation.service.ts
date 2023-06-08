import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ConversationDTO} from "../models/conversation-dto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiUrl} from "../../../../services/api-url";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) {
  }

  getAllConversations(id_user: number): Observable<ConversationDTO[]> {
    const params = new HttpParams()
      .set('id_user', id_user);
    console.log(id_user);
    return this.http.get<ConversationDTO[]>(`${apiUrl}/conversation.php`, {params});
  }

}
