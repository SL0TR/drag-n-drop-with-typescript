import { Project } from './classes/project';
import { InputErrors, Inputs } from './interfaces';

export type UserInput =  { errors: InputErrors, inputVals: Inputs };

export type Listener<T> = (items: T[]) => void;
