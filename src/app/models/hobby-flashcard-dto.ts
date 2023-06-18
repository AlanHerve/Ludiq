/**
 * contains information on a hobby of a user
 * frequency: frequency at which they take part in the activity
 * advancement: (beginner, expert, etc)
 * availability: are they willing to do this hobby with someone
 */
export class HobbyFlashcardDTO {
  constructor(public id_hobby_post:number,
              public id_user: number,
              public id_hobby: number,
              public frequency: string,
              public advancement: string,
              public availability: number,
              public hobby_name?: string) {
  }
}
