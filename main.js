'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite');

const dropEmployees = () => {
  db.run(`DROP TABLE employees`);
};

// dropEmployees();

//create the employee table if it does not exist
//will not execute if the table exists
db.run("CREATE TABLE IF NOT EXISTS employees(id INT, first TEXT, last TEXT, salary INT, dept TEXT, yearsWithCompany INT)");

 // db.run("INSERT INTO employees VALUES(1, 'Ashley', 'Irwin', 50000)");

 const populateEmployees = () => {

  const {list} = require('./employees.json');

  list.forEach(each => {
    db.run(`INSERT INTO employees VALUES(
        ${each.id},
        "${each.firstName}",
        "${each.lastName}",
        ${each.salary},
        "${each.dept}",
        ${each.yearsWithCompany}
      )`);
  })

 };
 // populateEmployees();


//db.get gets just the first row
 // db.get(`SELECT * FROM employees`, (err, row)=>{
 //  console.log(row);
 // })


//db.all gets all the rows, and returns them as an array
 db.all(`SELECT * FROM employees`, (err, allRows)=>{
  allRows.forEach(({id, first, last, dept, salary})=>{
    console.log(`Employee ${id} is ${first} ${last}, and they make $ ${salary} working in the ${dept} department.`);
  })
 })
