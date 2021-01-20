import { AutoBind } from "./decorators";

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


  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value)
  }
  
  private configure() {
    this.formElem.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElem.insertAdjacentElement('afterbegin', this.appContainerElem);
  }
}

const projTemp = new ProjectTemplate()

console.log(projTemp)