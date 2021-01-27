import { AutoBind } from "./decorators";
import { validate} from './validators';
import { UserInput } from './types';
import { getKeyValue } from './helpers';
import { ValidatorConfig, InputErrors, Inputs } from './interfaces';

class ProjectTemplate {
  templateElem: HTMLTemplateElement;
  hostElem: HTMLDivElement;
  appContainerElem: HTMLDivElement;
  formElem: HTMLFormElement
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElem = document.getElementById('project-template')! as HTMLTemplateElement;
    this.hostElem = document.getElementById("app")! as HTMLDivElement;

    const tempNode = document.importNode(this.templateElem.content, true);
    this.appContainerElem = tempNode.firstElementChild as HTMLDivElement;
    this.formElem = this.appContainerElem.querySelector('#project-form')! as HTMLFormElement;

    this.titleInputElement = this.appContainerElem.querySelector('#title')! as  HTMLInputElement;
    this.descriptionInputElement = this.appContainerElem.querySelector('#description')! as  HTMLInputElement;
    this.peopleInputElement = this.appContainerElem.querySelector('#people')! as  HTMLInputElement;

    this.configure()
    this.attach() 
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

    console.log(InputErrorVals)

    return { errors: InputErrorVals, inputVals: {
      title: titleVal,
      description: descVal,
      people: peopleVal
    }}
  
  }

  private printErrors(key: string, errorArr: string[]) {
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
    let isValid = true;
    for(const key in errors) {
      let errorArr: string[] = getKeyValue(errors)(key)
      isValid  = this.printErrors(key, errorArr);
      
    }
    return isValid

  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const { errors, inputVals } = this.getUserInput()
    if(this.resolveErrors(errors)) {
      console.log(inputVals)
    }

  }
  
  private configure() {
    this.formElem.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElem.insertAdjacentElement('afterbegin', this.appContainerElem);
  }
}




class ProjectList {
  templateElem: HTMLTemplateElement;
  hostElem: HTMLDivElement;
  element: HTMLElement; 

  constructor(private type: 'active'| 'finished' ) {
    this.templateElem = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElem = document.getElementById("app")! as HTMLDivElement;

    const tempNode = document.importNode(this.templateElem.content, true);
    this.element = tempNode.firstElementChild as HTMLDivElement;
    this.element.id = `${type}-projects`;

    this.attach();
    this.renderContent()
  }

  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects';
  }


  private attach() {
    this.hostElem.insertAdjacentElement('beforeend', this.element);
  }
    
}


const projTemp = new ProjectTemplate()
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
console.log({projTemp, activeProjectList, finishedProjectList })
