"use strict";

const sqlite = require("sqlite3");
const dayjs = require("dayjs");

/*
**  sqlite.Database
**  [name database, callback function(err)]
*/
const db = new sqlite.Database("tasks.db", (err) => {
    if (err)
        throw err;
});

function task(id, description, urgent = false, pvt = true, deadline) {
    this.id = (typeof id == "number") ? id : null;
    this.description = (typeof description == "string") ? description : "";
    this.urgent = (typeof urgent == "boolean") ? urgent : false;
    this.pvt = (typeof pvt == "boolean") ? pvt : false;
    this.deadline = (typeof deadline == "string") ? dayjs(deadline) : false;

    this.toString = () => { return `ID: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.pvt}, Deadline: ${(!this.deadline) ? "<not definied>" : this.deadline.format("DD/MM/YYYY")}` };
}

function taskList() {
    this.tasks = [];

    this.add = (task) => {
        this.tasks.push(task);
    }

    this.sortAndPrint = () => {
        console.log("****** Tasks sorted by deadline (most recent first): ******");
        this.tasks.sort((a, b) => {
            if (!a.deadline)
                return +1;
            if (!b.deadline)
                return -1;

            return a.deadline - b.deadline;
        });

        this.tasks.forEach((task) => console.log(task.toString()));
    };

    this.filterAndPrint = () => {
        console.log("****** Tasks filtered, only (urgent == true): ******");
        this.tasks.forEach((task) => {
            if (task.urgent)
                console.log(task.toString());
        });
    };
}

function getAll() {
    const sql = "SELECT * FROM tasks";

    return new Promise((resolve, reject) => {

        db.all(sql,(err, rows) => {
            let list;

            if(err)
                reject(err);
            else
            {
                list = new taskList();

                rows.forEach( (row) => {
                    list.add(new task(row.id, row.description, row.urgent == 1, row.private == 1, row.deadline));
                });

            }

            resolve(list.tasks);
        });

    });
}

async function getAndPrint()
{
    let list = await getAll();    

    list.forEach( (task) => {
        console.log(task.toString());
    });
}

async function afterThisDate(deadline)
{
    let list = await getAll(); 

    list.forEach( (task) => {
        if(task.deadline && (task.deadline).isAfter(dayjs(deadline)))
            console.log(task.toString());
    });
}

async function containsThisWord(word)
{
    let list = await getAll(); 
    
    list.forEach( (task) => {
        let reg = new RegExp(word);
        if(reg.test(task.description))
            console.log(task.toString());
    });
}