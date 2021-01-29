import { ProjectState } from "./classes/state";
import { ProjectList } from "./classes/projectList";
import { ProjectTemplate } from "./classes/projectTemplate";

const projectState = ProjectState.getInstance()

const projTemp = new ProjectTemplate()
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
console.log({projTemp, activeProjectList, finishedProjectList, projectState })
