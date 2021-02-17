import { AutoBind } from "../decorators";
import { Draggable } from "../interfaces";
import { Component } from "./component";
import { Project } from "./project";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;


  get persons() {
    return this.project.people === 1 ? '1 person' : `${this.project.people} persons`
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent()
  }

  
  dragStartHandler(event: DragEvent) {
    console.log('drag start',  event)
  }

  dragEndHandler(event: DragEvent) {
    console.log('drag end',  event)

  }
  

  @AutoBind
  configure(){
    this.hostElem.addEventListener('dragstart', this.dragStartHandler)
    this.hostElem.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.hostElem.querySelector('h2')!.textContent = this.project.title;
    this.hostElem.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.hostElem.querySelector('p')!.textContent = this.project.description;
  }

}