export class ChosenFood {
  code: number;
  title: string;
  disabled: boolean;

  constructor(code: number, title: string, disabled: boolean) {
    this.code = code;
    this.title = title;
    this.disabled = disabled;
  }

}
