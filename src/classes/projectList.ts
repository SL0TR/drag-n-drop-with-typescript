import { ProjectStatus } from "../enums";
import { Component } from "./component";
import { Project } from "./project";
import { ProjectState } from "./state";
import { ProjectItem } from './projectItem'

const projectState = ProjectState.getInstance()

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  
  assignedProjects: Project[];

  constructor(private type: 'active'| 'finished' ) {
  
    super('project-list', 'app',false, `${type}-projects`);

    this.assignedProjects = [];
  
    this.configure(type);

    this.renderContent()
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    listEl.innerHTML = '';
    console.log(this)
    for(const item of this.assignedProjects) {
      new ProjectItem(this.appContainerElem.querySelector('ul')!.id, item)
    }
  }

  configure(projType: 'active' | 'finished') {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(proj => projType === 'active'  ? proj.status === ProjectStatus.Active : proj.status === ProjectStatus.Finished );
      this.assignedProjects = relevantProjects
      this.renderProjects();
    })
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.appContainerElem.querySelector('ul')!.id = listId;
    this.appContainerElem.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects';
  }

}