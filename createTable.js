'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('example.sqlite', ()=> console.log("connected"));

// errorHandler is a function which accepts an error object
const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};


db.run("CREATE TABLE IF NOT EXISTS employees(id INT, first TEXT, last TEXT, salary INT, dept TEXT, yearsWithCompany INT)", (err)=>{
  errorHandler(err);
});
