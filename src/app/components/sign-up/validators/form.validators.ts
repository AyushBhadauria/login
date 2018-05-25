import { AbstractControl,ValidationErrors } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
export class FormValidator{
    static validContact(control:AbstractControl) : ValidationErrors | null{
        if(isNaN(control.value ))
        return{ validContact :true};
        return null
    }
    static validEmail(signupService: AuthService) {
        return (control: AbstractControl) => {
          return signupService.checkEmailNotTaken(control.value).map(res => {
            return res ? null : { emailTaken: true };
          });
        };
      }
      static passwordValidator(control) {
        if (control.value != undefined) {
          if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)) {
            return { 'invalidPassword': true };
          }
        }
      }
    }