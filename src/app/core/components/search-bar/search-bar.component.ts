import {Component, HostListener, OnInit} from '@angular/core';
import {SearchBarService} from "../../services/search-bar.service";
import {HobbyDTO} from "../../../models/hobby-dto";
import {UserDTO} from "../../../models/user-dto";

import { Router } from '@angular/router';
import {PostDTO} from "../../../posts/models/post-dto";
import {ActivityDTO} from "../../../posts/models/activity-dto";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  buttons: boolean[] = [];
  searchResults: any[] = [];
  protected activityDirector: boolean = false;
  constructor(private searchBarService: SearchBarService, private router:Router, private userService: UserService) {
    // We initialize all the buttons of the category selection to false. It means that they are not checked at first
    this.buttons[0] = false;
    this.buttons[1] = false;
    this.buttons[2] = false;
    this.buttons[3] = false;
  }

  /**
   * Function that checks if the user is clicking outside the search & menu bar
   * @param event
   */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // We collect the target element
    const targetElement = event.target as HTMLElement;
    // We collect the search bar element
    const searchContainer = document.querySelector('.search-bar') as HTMLElement;
    // And the menu
    const menu = document.querySelector('.menu') as HTMLElement;
    // Finally also the list items that are displayed by the search bar
    const listItems = document.querySelectorAll('.result li');

    let isListItemClicked = false;
    // We travel all the items
    for (let i = 0; i < listItems.length; i++) {
      // If the item is the target that we have clicked
      if (listItems[i].contains(targetElement)) {
        // We say that the user has clicked on the item
        isListItemClicked = true;
        break;
      }
    }

    // Otherwise, if the user didn't clicked on the item & has clicked outside the search component, we hide the menu
    if (!searchContainer.contains(targetElement) || isListItemClicked) {
      menu.classList.remove('open');
    }
    // It means that when the user clicks outside the menu, it closes it directly
  }

  /**
   * Method that checks if the user is an activity director
   */
  isActivityDirector(): void {
    this.userService.isActivityDirector(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (bool) => {
        this.activityDirector = bool;
      },
      error: (error) => {
        console.error("Error while determining if activity director or not : ", error)
      }
    });
  }


  ngOnInit(): void {
    const textarea = document.querySelector('.explorer') as HTMLTextAreaElement;
    const menu = document.querySelector('.menu') as HTMLElement;

    // When we click on the text area :
    textarea.addEventListener('input', () => {
      if (textarea.value.trim() !== '') {
        // We add the open caracteristic in order to open the search bar with displaying the menu
        menu.classList.add('open');
      } else {
        // Otherwise, if the text area isn't clicked, we close the menu
        menu.classList.remove('open');
      }
    });

    this.isActivityDirector();
  }

  /**
   * Method that stocks the elements of research while searching posts/hobbies/users/activites on search bar
   * @param event
   */
  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    // At first, the search result is empty
    this.searchResults = [];
    this.displayContentOnclick(searchText);
  }

  /**
   * Method that display content related to the clicked made on a certain button
   * @param searchText
   */
  displayContentOnclick(searchText: string): void {
    this.searchResults = [];
    // If all the buttons are disabled, it means that we make a global search with all the elements
    if (!this.buttons[0] && !this.buttons[1] && !this.buttons[2] && !this.buttons[3]) {
      // Not any button clicked, global research
      this.onUserClicked(searchText);
      this.onHobbyClicked(searchText);
      this.onPostClicked(searchText);
      this.onActivityClicked(searchText);
    } else {
      // Otherwise, we make a research depending on which element is clicked
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
        this.onActivityClicked(searchText);
      }
    }
  }

  /**
   * Method that removes elements that are not clicked on the search bar
   */
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

  /**
   * Method that display the users that match to the search text
   * @param searchText
   */
  onUserClicked(searchText: string): void {
    this.removeContentOnClick();
    // With search the users in relation to the text entered
    this.searchBarService.searchUser(searchText).subscribe({
      next: (response) => {
        // If there are not response, we return
        if(!response) return;
        // Otherwise, for each, we add it to the search result table, only if the element isn't already on it
        response.forEach((user) => {
          if (user.id) {
            const userDTO = new UserDTO(user.id, user.name, user.username, user.password, user.email);
            const existingUser = this.searchResults.find(user => user.id == userDTO.id);
            console.log("not already existing!");
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

  /**
   * Method that display the posts that match to the search text
   * @param searchText
   */
  onPostClicked(searchText: string): void {
    this.removeContentOnClick();
    /*
    The process is exactly the same as the onUserClicked() function
     */
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

  /**
   * Method that display the hobbies that match to the search text
   * @param searchText
   */
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

  /**
   * Method that display the activities that match to the search text
   * @param searchText
   */
  onActivityClicked(searchText: string): void {
    this.removeContentOnClick();
    this.searchBarService.searchActivity(searchText).subscribe( {
      next: (response) => {
        if(!response) return;
        response.forEach((activity) => {
          const activityDTO = new ActivityDTO(activity.id, activity.userDTO, activity.hobbyDTO, activity.title, activity.advancement,
                      activity.description, activity.date_post, activity.time, activity.current_registered, activity.max_registrations, activity.images, -1, activity.organizationDTO)
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

  /**
   * Method that updates the search content in relation to the radio button
   */
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

  /**
   * Method that returns if the object is a user object
   * @param object
   * @protected
   * @return boolean
   */
  protected isUser(object: any): boolean {
    return object instanceof UserDTO;
  }
  /**
   * Method that returns if the object is a hobby object
   * @param object
   * @protected
   * @return boolean
   */
  protected isHobby(object: any): boolean {
    return object instanceof HobbyDTO;
  }
  /**
   * Method that returns if the object is a post object
   * @param object
   * @protected
   * @return boolean
   */
  protected isPost(object: any): boolean {
    return object instanceof PostDTO;
  }
  /**
   * Method that returns if the object is a activity object
   * @param object
   * @protected
   * @return boolean
   */
  protected isActivity(object: any): boolean {
    return object instanceof ActivityDTO;
  }

  /**
   * Method that displays the new activity form when clicking on the new activity button
   */
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
