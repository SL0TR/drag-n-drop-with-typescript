import { ProjectStatus } from "../enums";
import { Component } from "./component";
import { Project } from "./project";
import { ProjectState } from "./state";
import { ProjectItem } from './projectItem'
import { DragTarget } from "../interfaces";
import { AutoBind } from "../decorators";

const projectState = ProjectState.getInstance()

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  
  assignedProjects: Project[];

  constructor(private type: 'active'| 'finished' ) {
  
    super('project-list', 'app',false, `${type}-projects`);

    this.assignedProjects = [];
  
    this.configure(type);

    this.renderContent()

  }
  
  
  @AutoBind
  dragOverHandler(event: DragEvent) {
    if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.appContainerElem.querySelector('ul');
      listEl?.classList.add('droppable')
    }
    
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const projId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(projId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
  }


  @AutoBind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.appContainerElem.querySelector('ul');
    listEl?.classList.remove('droppable')
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    listEl.innerHTML = '';
    for(const item of this.assignedProjects) {
      new ProjectItem(this.appContainerElem.querySelector('ul')!.id, item)
    }
  }

  
  configure(projType: 'active' | 'finished') {
    this.appContainerElem.addEventListener('dragover', this.dragOverHandler)
    this.appContainerElem.addEventListener('dragleave', this.dragLeaveHandler)
    this.appContainerElem.addEventListener('drop', this.dropHandler)

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