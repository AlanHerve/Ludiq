import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityDTO} from "../../../posts/models/activity-dto";
import {ActivityService} from "../../../posts/services/activity.service";
import {ActivityParticipantsDTO} from "../models/activity-participants-dto";
import {UserService} from "../../../services/user.service";
import {UserDTO} from "../../../models/user-dto";
import {catchError, combineLatest, Observable, of, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css', '../../pages.css']
})
export class ActivityComponent implements OnInit{
  protected activityDTO!: ActivityDTO;
  protected activityParticipants!: ActivityParticipantsDTO;
  protected userDTO!: UserDTO;
  protected registered: boolean = false;
  protected activityDirector: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
              private activityService: ActivityService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    combineLatest([
      this.findActivity(),
      this.findUser()
    ]).subscribe(([activityResult, userResult]) => {
      // Vérifiez que les résultats de findActivity et findUser sont disponibles
      if (activityResult && userResult) {
        this.findActivityParticipants();
      }
    });
  }


  private findActivity(): Observable<ActivityDTO> {
    return this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.activityService.findActivityById(parseInt(params['id']));
      }),
      tap(response => {
        if (!response) {
          this.router.navigateByUrl('/home');
        }
        this.activityDTO = response;
      })
    );
  }

  private findUser(): Observable<UserDTO | null> {
    const userId = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    return this.userService.findUserById(userId).pipe(
      tap(response => {
        this.userDTO = response;
      }),
      catchError(error => {
        console.log("Error while finding user on Activity page: ", error);
        return of(null);
      })
    );
  }

  private findActivityParticipants(): void {
    this.activityService.findActivityParticipants(this.activityDTO.id).subscribe({
      next: (response) => {
        this.activityParticipants = response;
        this.registered = this.isRegistered();
        this.activityDirector = this.isActivityDirector();
      },
      error: (error) => {
        console.log("Error while finding activity participants: ", error);
      }
    });
  }

  private isRegistered(): boolean {
    if (this.activityParticipants && this.activityParticipants.usersDTO) {
      return this.activityParticipants.usersDTO.some(userDTO => userDTO.id === this.userDTO.id);
    }
    return false;
  }


  protected onRegister(): void {
    this.activityService.registerUserToActivity(this.userDTO.id, this.activityDTO.id).subscribe({
      next: () => {
        console.log("Successfully registered to activity");
        this.findActivityParticipants()
      },
      error: (error) => {
        console.log("Error while registering to activity : ", error);
      }
    });
  }

  protected onUnregister(): void {
    this.activityService.deleteUserFromActivity(this.userDTO.id, this.activityDTO.id).subscribe({
      next: () => {
        console.log("Successfully deleted user from activity");
        this.findActivityParticipants()
      },
      error: (error) => {
        console.log("Error while deleting user from activity : ", error);
      }
    });
  }

  private isActivityDirector(): boolean {
    return this.activityDTO.userDTO.id == this.userDTO.id;
  }
}
