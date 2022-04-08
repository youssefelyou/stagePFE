export class BaremeVo {
  private _nom: string;
  private _dateTime: Date;


  constructor() {
    this._nom = '';
    // @ts-ignore
    this._dateTime = null;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get dateTime(): Date {
    return this._dateTime;
  }

  set dateTime(value: Date) {
    this._dateTime = value;
  }
}
