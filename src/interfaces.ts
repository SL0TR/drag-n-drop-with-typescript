export interface ValidatorConfig {
  value: string | number,
  required?: boolean,
  minL?: number,
  maxL?: number;
  min?: number,
  max?: number
}

export interface InputErrors {
  title: string[],
  description: string[],
  people: string[],
}

export interface Inputs {
  title: string,
  description: string,
  people: number,
}

export interface ErrorMsgs {
  required (): string,
  minL (input: number): string,
  maxL (input: number): string,
  min (input: number): string,
  max (input: number): string,
  
}