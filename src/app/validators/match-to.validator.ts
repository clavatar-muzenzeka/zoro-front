import { ValidationErrors, AbstractControl, FormControl } from "@angular/forms";
export const MATCH_TO_ERROR_NAME = "matchto";
export class MatchToValidator {
  public static compareToControl(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        let doesntMatchError = {};
        doesntMatchError[MATCH_TO_ERROR_NAME] = true;
        let sibling: FormControl = control.parent.controls[matchTo];
        if (control.value === sibling.value) {
          let errors: ValidationErrors = sibling.errors;
          if (errors && errors[MATCH_TO_ERROR_NAME]) delete errors[MATCH_TO_ERROR_NAME];
        let relatableValue =errors && Object.keys(errors).length > 0 ? errors : null;
          sibling.setErrors(relatableValue);
          return null;
        }

        let errors: ValidationErrors = sibling.errors;
        errors = { ...errors, ...doesntMatchError };
        sibling.setErrors(errors);

        return doesntMatchError;
      }
      return null;
    };
  }
}
