'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite', ()=> console.log("connected"));

// errorHandler is a function which accepts an error object
const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};



const dropEmployees = () => {
  db.run(`DROP TABLE employees`, (err)=>{
    errorHandler(err);
  });
};

// dropEmployees();

//create the employee table if it does not exist
//will not execute if the table exists
db.run("CREATE TABLE IF NOT EXISTS employees(id INT, first TEXT, last TEXT, salary INT, dept TEXT, yearsWithCompany INT)", (err)=>{
  errorHandler(err);
});

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
      )`, (err) =>{
        errorHandler(err);
      });
  })

 };
 // populateEmployees();


//db.get gets just the first row
 // db.get(`SELECT * FROM employees`, (err, row)=>{
  //errorHandler(err);
 //  console.log(row);
 // })


// //db.all gets all the rows from the sql query, and returns them as an array
//  db.all(`SELECT * FROM employees`, (err, allRows)=>{
    //errorHandler(err);
//   //destructuing the obj they are being iterated over
//   allRows.forEach(({id, first, last, dept, salary})=>{
//     console.log(`Employee ${id} is ${first} ${last}, and they make $ ${salary} working in the ${dept} department.`);
//   })
//  })


// db.each(`SELECT * FROM  employees`, (err, {id, first, last, dept, salary}) => {

//   console.log(`Employee ${id} is ${first} ${last}, and they make $ ${salary} working in the ${dept} department.`);
//   }
// //   })

// });





//db.all gets all the rows from the sql query, and returns them as an array
 db.all(`SELECT * FROM employees`, (err, allRows)=>{
    errorHandler(err);
  //destructuing the obj they are being iterated over
let bigSalary = (value)=>{
  return value.salary >= 50000;
}

let compare = (a, b)=> {
  if (a.first < b.first) {
    return -1;
  }
  if (a.first > b.first) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

   let myArray = allRows.filter(bigSalary).sort(compare).map((val)=>{
    return `${val.first}, ${val.last}, ${val.salary}`
   })
  console.log(myArray)
 })

 //closing the database
db.close((err)=>{
  errorHandler(err);
  console.log("close");
})
