import { Project } from "./project";
import { ProjectState } from "./state";

const projectState = ProjectState.getInstance()

export class ProjectList {
  templateElem: HTMLTemplateElement;
  hostElem: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];

  constructor(private type: 'active'| 'finished' ) {
    this.templateElem = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElem = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];
    const tempNode = document.importNode(this.templateElem.content, true);
    this.element = tempNode.firstElementChild as HTMLDivElement;
    this.element.id = `${type}-projects`;

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects
      this.renderProjects();
    })

    this.attach();
    this.renderContent()
  }
  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    for(const item of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = item.title;
      listEl.appendChild(listItem)
    }
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