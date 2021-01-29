export abstract class Component <T extends HTMLElement, U extends HTMLElement> {
  templateElem: HTMLTemplateElement;
  hostElem: T;
  appContainerElem: U;

  constructor (tempId: string, hostElemId: string, public insetAtStart: boolean, newElId?: string ) {
    this.templateElem = document.getElementById(tempId)! as HTMLTemplateElement;
    this.hostElem = document.getElementById(hostElemId)! as T;
    const tempNode = document.importNode(this.templateElem.content, true);
    this.appContainerElem = tempNode.firstElementChild as U;

    if(newElId) {
      this.appContainerElem.id = newElId;
    }

    this.attach(insetAtStart);

  }

  private attach(position: boolean) {
    this.hostElem.insertAdjacentElement(position ? 'afterbegin' : 'beforeend', this.appContainerElem);
  }

  abstract configure(projType: 'active' | 'finished'): void;
  
  abstract renderContent?(): void;
   
}