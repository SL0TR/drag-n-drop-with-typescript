import { Component } from "./component";
import { Project } from "./project";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;


  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent()
  }


  configure(){}

  renderContent() {
    this.hostElem.querySelector('h2')!.textContent = this.project.title;
    this.hostElem.querySelector('h3')!.textContent = this.project.people.toString();
    this.hostElem.querySelector('p')!.textContent = this.project.description;
  }

}