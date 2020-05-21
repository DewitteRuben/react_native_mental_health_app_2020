export default class ApiError extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  toString() {
    return `${this.status}: ${this.message}`;
  }

  getStatus() {
    return this.status;
  }
}
