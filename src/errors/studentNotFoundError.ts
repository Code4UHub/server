export class StudentNotFoundError extends Error {
  constructor(studentId: string) {
    super(`Cannot find student with ID ${studentId}`)
    this.name = 'StudentNotFoundError'
  }
}
