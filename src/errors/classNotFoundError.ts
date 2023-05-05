export class ClassNotFoundError extends Error {
  constructor(studentId: string) {
    super(`Cannot find class with ID ${studentId}`)
    this.name = 'ClassNotFoundError'
  }
}
