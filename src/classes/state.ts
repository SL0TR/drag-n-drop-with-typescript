import { Inputs } from "../interfaces";
import { ProjectStatus } from "../enums";
import { Project } from "./project";
import { Listener } from "../types";

class State <T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }

}

export class ProjectState  extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super()
  }

  static getInstance() {
    if(this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance
  }

  

  addProject(project: Inputs) {
    const newProject = new Project(Math.random().toString(), project.title, project.description, project.people, ProjectStatus.Active)

    this.projects.push(newProject)
    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {

    const project = this.projects.find(prj => prj.id === projectId);
    if(project && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }

  }

  private updateListeners() {
    for(const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

}