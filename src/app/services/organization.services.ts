import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./urls";
import {Injectable} from "@angular/core";
import {OrganizationDTO} from "../models/organization-dto";



@Injectable({
  providedIn: 'root'
})

export class OrganizationService {

 constructor(private http: HttpClient) {
 }
  getOrganzationById(organizationDTO: OrganizationDTO): Observable<{organization: OrganizationDTO}> {
    //const function_to_call: string = "fetchALLHobbies";
    const params = new HttpParams()
      .set('function_to_call', "getOrganzationById")
      .set('id_organization', organizationDTO.id_organization);
    return this.http.get<{organization: OrganizationDTO}>(`${apiUrl}/organization.php`, {params}).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

  fetchAllOrganizations(): Observable<{organizations: OrganizationDTO[]}>{
    const params = new HttpParams()
      .set('function_to_call', "fetchAllOrganizations");
    return this.http.get<{organizations: OrganizationDTO[]}>(`${apiUrl}/organization.php`, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  addOrganization(organizationDTO: OrganizationDTO, userId: number): Observable<boolean> {
    const options = {
      'jsonOrganizationDTO' : organizationDTO,
      'userId': userId
    };
    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }

  addInvitation(organizationId: any, userId: number) {
    const options = {
      type : 'add_invitation',
      userId: userId,
      organizationId: organizationId
    };
    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }

  isUserAlreadyInvited(organizationId: any, userId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('function_to_call', 'isAlreadyInvited')
      .set('userId', userId)
      .set('id_organization', organizationId)

    return this.http.get<boolean>(`${apiUrl}/organization.php`, {params});
  }

  removeInvitation(organizationId: any, userId: number) {

    const options = {
      type : 'remove_invitation',
      userId: userId,
      organizationId: organizationId
    };
    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }
}
