// const pg = require('./connection')
import { createDb, authenticateDb } from "./connection";
import { searchStudent } from "./query/users";
const { QueryTypes } = require('sequelize');
import { Student } from "./models/users";

const test = async () => {
  const sequelize = await createDb();
  const validConnection = await authenticateDb(sequelize);
  if (validConnection) {
    console.log("Connected");
    await searchStudent()
    sequelize.close();
  }
};

test()