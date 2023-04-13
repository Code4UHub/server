import { Student } from "./../models/users";


export const searchStudent = async () => {
    try {
    const students = await Student.findAll({
        attributes: ['first_name']
    });
    console.log(students.every(student => student instanceof Student)); // true
    console.log("All users:", JSON.stringify(students, null, 2));
    } catch (e) {
        // throw new Error("MY ERROR")
        throw e
    }
}

// export const searchStudent = async () => {
// Student.findAll()
//   .then(students => {
//     console.log(students);
//   })
//   .catch(err => {
//     console.error('Unable to fetch users:', err);
//   });
// }