export class Score {
  private defaultValue: number;

  private _value: number;

  constructor(value = 0) {
    this.defaultValue = value;
    this._value = value;
  }

  increase(by = 1) {
    this._value += by;
  }

  decrease(by = 1) {
    if (this._value <= 0) return;
    if (this._value - by <= 0) {
      this.reset();
      return;
    }
    this._value -= by;
  }

  reset() {
    this._value = this.defaultValue;
  }

  get value(): number {
    return this._value;
  }
}
