import { AutoBind } from "../decorators";
import { validate} from '../validators';
import { UserInput } from '../types';
import { getKeyValue } from '../helpers';
import { ValidatorConfig, InputErrors } from '../interfaces';
import { ProjectState } from "./state";
import { Component } from "./component";

const projectState = ProjectState.getInstance()


export class ProjectTemplate extends Component<HTMLDivElement, HTMLElement> {
  formElem: HTMLFormElement
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
  
    super('project-template', 'app', true);

    this.formElem = this.appContainerElem.querySelector('#project-form')! as HTMLFormElement;

    this.titleInputElement = this.appContainerElem.querySelector('#title')! as  HTMLInputElement;
    this.descriptionInputElement = this.appContainerElem.querySelector('#description')! as  HTMLInputElement;
    this.peopleInputElement = this.appContainerElem.querySelector('#people')! as  HTMLInputElement;
  
    this.configure()
  }

  

  private getUserInput(): UserInput {
    const titleVal = this.titleInputElement.value;
    const descVal = this.descriptionInputElement.value;
    const peopleVal = +this.peopleInputElement.value;

    const validatableTitle: ValidatorConfig = {
      value: titleVal,
      required: true
    }

    const validatableDesc: ValidatorConfig = {
      value: descVal,
      required: true,
      minL: 7
    }

    const validatablePeople: ValidatorConfig = {
      value: peopleVal,
      required: true,
      min: 1,
      max: 7
    }
    
    const InputErrorVals : InputErrors = {
      title: validate(validatableTitle),
      description: validate(validatableDesc),
      people: validate(validatablePeople)
    }

    return { errors: InputErrorVals, inputVals: {
      title: titleVal,
      description: descVal,
      people: peopleVal
    }}
  
  }

  private getAndPrintErrors(key: string, errorArr: string[]) {
    const inputEl = this.appContainerElem.querySelector(`#${key}`)! as HTMLInputElement;
    const errorSpan = inputEl.nextElementSibling! as HTMLSpanElement;

    if(errorArr.length > 0) {
      if(errorSpan && errorSpan.innerHTML === '') {
        for(let i = 0; i < errorArr.length ; i++ ) {
          const err = errorArr[i]
          const isLastIndex = i === errorArr.length - 1;
          
          const node = document.createTextNode(`${isLastIndex  ? err : err + ', '}`);
          errorSpan.appendChild(node)
        }
      }
      return false;
      
    } else {
      errorSpan.innerHTML = '';
      return true;
    }
  }

  private resolveErrors(errors: any) {
    let errArray = []

    for(const key in errors) {
      let errorArr: string[] = getKeyValue(errors)(key)
      errArray.push(this.getAndPrintErrors(key, errorArr));
    }
  
    return errArray.every(el => el === true)
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const { errors, inputVals } = this.getUserInput();
  
    if(this.resolveErrors(errors)) {
      projectState.addProject(inputVals)
    }

  }
  
  renderContent() {}
  
  configure() {
    this.formElem.addEventListener('submit', this.submitHandler)
  }

}