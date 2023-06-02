import {Component, OnInit} from '@angular/core';
import {SearchBarService} from "../../services/search-bar.service";
import {HobbyDTO} from "../../../models/hobby-dto";
import {UserDTO} from "../../../models/user-dto";
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    const textarea = document.querySelector('.explorer') as HTMLTextAreaElement;
    const menu = document.querySelector('.menu') as HTMLElement;

    textarea.addEventListener('input', () => {
      if (textarea.value.trim() !== '') {
        console.log("Writing on explorer !!");
        // Ajouter une classe pour activer l'animation d'ouverture du menu
        menu.classList.add('open');
      } else {
        // Supprimer la classe pour désactiver l'animation d'ouverture du menu
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
    if (!this.buttons[0] && !this.buttons[1]) {
      // Aucun bouton n'est coché, recherche globale
      this.onUserClicked(searchText);
      this.onHobbyClicked(searchText);
    } else {
      if (this.buttons[0]) {
        this.onUserClicked(searchText);
      }
      if (this.buttons[1]) {
        this.onHobbyClicked(searchText);
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
  }

  onUserClicked(searchText: string): void {
    this.removeContentOnClick();
    this.searchBarService.searchUser(searchText).subscribe({
      next: (response) => {
        response.forEach((user) => {
          if (user.id) {
            const userDTO = new UserDTO(+user.id, user.name, user.username, user.password, user.email);
            console.log(userDTO.id);
            const existingUser = this.searchResults.find(user => user.id == userDTO.id);
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

  onHobbyClicked(searchText: string): void {
    this.removeContentOnClick();
    this.searchBarService.searchHobby(searchText).subscribe({
      next: (response) => {
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
  onCheckActivity(): void {

  }

  onActivityClicked(searchText: string): void {
    this.searchBarService.searchActivity(searchText).subscribe(response => {

    });
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
