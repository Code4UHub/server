import { Student } from "./../models/users";

export const listStudents = async () => {
    try {
        const students = await Student.findAll({
            raw: true
        })
        // console.log(students)
        // console.log(students.map(el => el.get({ plain: true})))

        // console.log("All users:", JSON.stringify(students));
        return students
    } catch (e) {
        throw e
    }
}

export const searchStudent = async (email: string, password: string) => {
    try {
    const students = await Student.findAll({
        // attributes: ['first_name', 'last_name', 'email'],
        where: {
            email: email,
            password: password
        }
    });
    return students[0].dataValues
    } catch (e) {
        // throw new Error("MY ERROR")
        throw e
    }
}