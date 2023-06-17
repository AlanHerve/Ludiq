import {Component, HostListener, OnInit} from '@angular/core';
import {SearchBarService} from "../../services/search-bar.service";
import {HobbyDTO} from "../../../models/hobby-dto";
import {UserDTO} from "../../../models/user-dto";

import { Router } from '@angular/router';
import {PostDTO} from "../../../posts/models/post-dto";
import {ActivityDTO} from "../../../posts/models/activity-dto";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  buttons: boolean[] = [];
  searchResults: any[] = [];

  constructor(private searchBarService: SearchBarService, private router:Router) {
    this.buttons[0] = false;
    this.buttons[1] = false;
    this.buttons[2] = false;
    this.buttons[3] = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const searchContainer = document.querySelector('.search-bar') as HTMLElement;
    const menu = document.querySelector('.menu') as HTMLElement;
    const listItems = document.querySelectorAll('.result li');

    let isListItemClicked = false;
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].contains(targetElement)) {
        isListItemClicked = true;
        break;
      }
    }

    if (!searchContainer.contains(targetElement) || isListItemClicked) {
      menu.classList.remove('open');
    }
  }




  ngOnInit(): void {
    const textarea = document.querySelector('.explorer') as HTMLTextAreaElement;
    const menu = document.querySelector('.menu') as HTMLElement;

    textarea.addEventListener('input', () => {
      if (textarea.value.trim() !== '') {
        menu.classList.add('open');
      } else {
        menu.classList.remove('open');
      }
    });
  }

  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchResults = [];
    this.displayContentOnclick(searchText);
  }

  displayContentOnclick(searchText: string): void {
    this.searchResults = [];
    if (!this.buttons[0] && !this.buttons[1] && !this.buttons[2] && !this.buttons[3]) {
      // Not any button clicked, global research
      this.onUserClicked(searchText);
      this.onHobbyClicked(searchText);
      this.onPostClicked(searchText);
      this.onActivityClicked(searchText);
    } else {
      if (this.buttons[0]) {
        this.onUserClicked(searchText);
      }
      if (this.buttons[1]) {
        this.onHobbyClicked(searchText);
      }
      if (this.buttons[2]) {
        this.onPostClicked(searchText);
      }
      if (this.buttons[3]) {
        this.onPostClicked(searchText);
      }
    }
  }

  removeContentOnClick() {
    if (!this.buttons[0]) {
      this.searchResults = this.searchResults.filter(result => !(result instanceof UserDTO));
    }
    if (!this.buttons[1]) {
      this.searchResults = this.searchResults.filter(result => !(result instanceof HobbyDTO));
    }
    if (!this.buttons[2]) {
      this.searchResults = this.searchResults.filter(result => !(result instanceof PostDTO));
    }
    if (!this.buttons[3]) {
      this.searchResults = this.searchResults.filter(result => !(result instanceof ActivityDTO));
    }
  }

  onUserClicked(searchText: string): void {
    this.removeContentOnClick();
    this.searchBarService.searchUser(searchText).subscribe({
      next: (response) => {
        if(!response) return;
        response.forEach((user) => {
          if (user.id) {
            const userDTO = new UserDTO(user.id, user.name, user.username, user.password, user.email);
            console.log(userDTO.id);
            const existingUser = this.searchResults.find(user => user.id == userDTO.id);
            console.log("not already existing!");
            console.log(this.searchResults);
            if (!existingUser) {
              this.searchResults.push(userDTO);
            }
          }
        })
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    });
  }

  onPostClicked(searchText: string): void {
    this.removeContentOnClick();
    this.searchBarService.searchPost(searchText).subscribe({
      next: (response) => {
        if(!response) return;
        response.forEach((post) => {
          if (post.id) {
            const postDTO = new PostDTO(post.id, post.userDTO, post.hobbyDTO, post.description,
                                        post.images, post.modified, post.likes, post.comments, post.time);
            const existingPost = this.searchResults.find(post => post.id == postDTO.id);
            if (!existingPost) {
              this.searchResults.push(postDTO);
            }
          }
        })
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    });
  }

  onHobbyClicked(searchText: string): void {
    this.removeContentOnClick();
    this.searchBarService.searchHobby(searchText).subscribe({
      next: (response) => {
        if(!response) return;
        response.forEach((hobby) => {
          if (hobby.id) {
            const hobbyDTO = new HobbyDTO(hobby.id, hobby.name, hobby.image);
            const existingHobby = this.searchResults.find(result => result instanceof HobbyDTO && result.id === hobbyDTO.id);
            if (!existingHobby) {
              this.searchResults.push(hobbyDTO);
            }
          }
        });
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur lors de la récupération du hobby', error);
      }
    });
  }

  onActivityClicked(searchText: string): void {
    this.removeContentOnClick();
    this.searchBarService.searchActivity(searchText).subscribe( {
      next: (response) => {
        if(!response) return;
        response.forEach((activity) => {
          const activityDTO = new ActivityDTO(activity.id, activity.userDTO, activity.hobbyDTO, activity.title, activity.advancement,
                      activity.description, activity.date_post, activity.time, activity.current_registered, activity.max_registrations, activity.images, -1, "")
          if (activityDTO.id) {
            const existingActivity = this.searchResults.find(result => result instanceof ActivityDTO && result.id === activityDTO.id);
            if (!existingActivity) {
              this.searchResults.push(activityDTO);
            }
          }
        });
      },
      error: (error) => {
        console.log("Error while finding activity on search bar : ", error);
      }
    });
  }


  /**
   * Method that updates the search content in relation to the radio button
   */
  onCheckUser(): void {
    /*
    If the radio button is checked, we search the user in relation to the text written in the search bar
     */
    const searchText = (document.querySelector('.explorer') as HTMLTextAreaElement).value;
    if (this.buttons[0]) {
      this.onUserClicked(searchText);
    }
    /*
    In case that the radio button is not checked, we need to remove the instances of User in the results of the search bar
     */
    else {
      this.displayContentOnclick(searchText);
    }
  }

  /**
   * Method that updates the search content in relation to the radio button
   */
  onCheckHobby(): void {
    const searchText = (document.querySelector('.explorer') as HTMLTextAreaElement).value;
    if (this.buttons[1]) {
      this.onHobbyClicked(searchText);
    }
    else {
      this.displayContentOnclick(searchText);
    }
  }

  onCheckPost(): void {
    const searchText = (document.querySelector('.explorer') as HTMLTextAreaElement).value;
    if (this.buttons[2]) {
      this.onPostClicked(searchText);
    }
    else {
      this.displayContentOnclick(searchText);
    }
  }

  /**
   * Method that updates the search content in relation to the radio button
   */
  onCheckActivity(): void {
    const searchText = (document.querySelector('.explorer') as HTMLTextAreaElement).value;
    if (this.buttons[3]) {
      this.onActivityClicked(searchText);
    }
    else {
      this.displayContentOnclick(searchText);
    }
  }

  protected isUser(object: any): boolean {
    return object instanceof UserDTO;
  }
  protected isHobby(object: any): boolean {
    return object instanceof HobbyDTO;
  }
  protected isPost(object: any): boolean {
    return object instanceof PostDTO;
  }
  protected isActivity(object: any): boolean {
    return object instanceof ActivityDTO;
  }

  onClickNewActivity(): void {
    /*
    We determine the route that we are currently on
     */
    const currentRoute = this.router.url;
    /*
    We navigate to the pop-up's route in order to display it
     */
    this.router.navigateByUrl(`${currentRoute}/activity`);
  }

}
