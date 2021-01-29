import { Inputs } from "../interfaces";
import { ProjectStatus } from "../enums";
import { Project } from "./project";
import { Listener } from "../types";

export class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    
  }

  static getInstance() {
    if(this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn)
  }

  addProject(project: Inputs) {
    const newProject = new Project(Math.random().toString(), project.title, project.description, project.people, ProjectStatus.Active)

    this.projects.push(newProject)

    for(const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

}