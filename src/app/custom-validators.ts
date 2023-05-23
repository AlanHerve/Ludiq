import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  static confirmEqualValidator(main: string, confirm: string): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
      if (!ctrl.get(main) || !ctrl.get(confirm)) {
        return {
          confirmEqual: 'Invalid control names'
        };
      }
      const mainValue = ctrl.get(main)!.value;
      const confirmValue = ctrl.get(confirm)!.value;

      let check = mainValue === confirmValue

      console.log("password:"+mainValue
        +"\nconfirm:"+confirmValue
        +"\ntrue: "+check );
      if(!check) return {'noMatch': true};

      return null;
      //return mainValue === confirmValue ? null : {passwordNotMatch: true};
    };
  }
}
interface ValidationResult {
  [key: string]: boolean;
}
export const matchPassword : ValidatorFn = (control: AbstractControl) => {

  let password = control.get('passwordControl');
  let confirm = control.get('confirmControl');

  if(password && confirm && password?.value !== confirm?.value){
    return {passwordNotMatch: true}
  }
  return null;
}

