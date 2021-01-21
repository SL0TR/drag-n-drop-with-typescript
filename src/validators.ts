import { ValidatorConfig, ErrorMsgs } from './interfaces';


const ErrorMessagegs: ErrorMsgs = {
  required: () => 'This field is required',
  minL:  (val) => `Field requires minimum of ${val} characters`,
  maxL:  (val) => `Field requires maximum of ${val} characters`,
  min:  (val) => `Field requires minimum of ${val} value`,
  max:  (val) => `Field requires maximum of ${val} value`,

}


export function validate(input: ValidatorConfig) {
  let errors: string[] = [];

  if(input.required) {
    if(input.value.toString().trim().length === 0) {
      errors = [...errors, ErrorMessagegs.required()];
    }
    
  }

  if(input.minL != null && typeof input.value === 'string') {
    if(input.value.length < input.minL) {
      errors = [...errors, ErrorMessagegs.minL(input.minL)];
    }
    
  }

  if(input.maxL != null && typeof input.value === 'string') {
    if(input.value.length < input.maxL) {
      errors = [...errors, ErrorMessagegs.maxL(input.maxL)];
    }
  }

  if(input.min != null && typeof input.value === "number") {
    if(input.value < input.min) {
      errors = [...errors, ErrorMessagegs.maxL(input.min)];
    }
  }

  if(input.max != null && typeof input.value === "number") {
    if(input.value > input.max) {
      errors = [...errors, ErrorMessagegs.maxL(input.max)];
    }
    
  }

  return errors
}