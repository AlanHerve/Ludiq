import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {apiUrl} from "./urls";
import {Injectable} from "@angular/core";
import {OrganizationDTO} from "../models/organization-dto";
import {PostDTO} from "../posts/models/post-dto";
import {ActivityDTO} from "../posts/models/activity-dto";
import {UserDTO} from "../models/user-dto";



@Injectable({
  providedIn: 'root'
})
/**
 * Service that is collecting information from the backend in order to make the gateway between front and backend
 */
export class OrganizationService {

 constructor(private http: HttpClient) {
 }

  /**
   * Method that returns an organization thanks to its ID
   * @param id
   */
  getOrganizationById(id: number): Observable<OrganizationDTO> {

    // We set the params to getOrganizationById and we send the id of the organization that we want to collect
    const params = new HttpParams()
      .set('function_to_call', "getOrganizationById")
      .set('id_organization', id);
    return this.http.get<OrganizationDTO>(`${apiUrl}/organization.php`, {params}).pipe(
      map (response => {
        return response;
      })
    );
  }

  /**
   * Method that returns all the posts of an organization
   * @param id
   */
  fetchOrganizationPosts(id: number): Observable<PostDTO[]> {
    // setting the params
   const params = new HttpParams()
     .set('function_to_call', "fetchOrganizationPosts")
     .set('id_organization', id);
   // returning the information from the backend
   return this.http.get<PostDTO[]>(`${apiUrl}/organization.php`, {params});
  }


  /**
   * Method that adds a new organization to the backend
   * @param organizationDTO
   * @param userId
   */
  addOrganization(organizationDTO: OrganizationDTO, userId: number): Observable<boolean> {
    // We set the options with sending a new organizationDTO and the user ID that is creating this organization
    const options = {
      'jsonOrganizationDTO': organizationDTO,
      'userId': userId
    };
    // We put it to the backend
    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }

  /**
   * Method that returns all the activities of an organization
   * @param id
   */
  fetchOrganizationActivities(id:number): Observable<ActivityDTO[]> {
   const params = new HttpParams()
     .set('function_to_call', "fetchOrganizationActivities")
     .set('id_organization', id);
   return this.http.get<ActivityDTO[]>(`${apiUrl}/organization.php`,{params}).pipe(
     map(response => {
       return response;
     })
   );
  }

  /**
   * Method that send an invitation to an organization
   * @param organizationId
   * @param userId
   */
  addInvitation(organizationId: any, userId: number) {
    const options = {
      type : 'add_invitation',
      userId: userId,
      organizationId: organizationId
    };
    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }

  /**
   * Method that returns if the user is already invited by this organization
   * @param organizationId
   * @param userId
   */
  isUserAlreadyInvited(organizationId: any, userId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('function_to_call', 'isAlreadyInvited')
      .set('userId', userId)
      .set('id_organization', organizationId)

    return this.http.get<boolean>(`${apiUrl}/organization.php`, {params});
  }

  /**
   * Method that remove an invitation to an organization
   * @param organizationId
   * @param userId
   */
  removeInvitation(organizationId: any, userId: number) {

    const options = {
      type : 'remove_invitation',
      userId: userId,
      organizationId: organizationId
    };
    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }

  /**
   * Method that accepts an invitation to an organization
   * @param organizationId
   * @param userId
   */
  acceptInvitation(organizationId: number, userId: number): Observable<boolean> {
    const options = {
      type : 'accept_invitation',
      userId: userId,
      organizationId: organizationId
    };

    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }

  /**
   * Method that returns if the user is already on this organization
   * @param organizationId
   * @param userId
   */
  isOnThisOrganization(organizationId: any, userId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('function_to_call', 'is_on_this_organization')
      .set('userId', userId)
      .set('id_organization', organizationId)

    return this.http.get<boolean>(`${apiUrl}/organization.php`, {params});
  }

  /**
   * Method that allow the user to quit an organization
   * @param organizationId
   * @param userId
   */
  quitOrganization(organizationId: number, userId: number): Observable<boolean> {
    const options = {
      type : 'quit_organization',
      userId: userId,
      organizationId: organizationId
    };

    return this.http.put<boolean>(`${apiUrl}/organization.php`, options);
  }

  /**
   * Method that returns the users of an organization
   * @param organizationId
   */
  getOrganizationUsers(organizationId: number) {
    const params = new HttpParams()
      .set('function_to_call', "organization_users")
      .set('id_organization', organizationId);
    return this.http.get<UserDTO[]>(`${apiUrl}/organization.php`, {params});
  }
}
