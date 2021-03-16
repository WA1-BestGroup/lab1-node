"use strict";

const dayjs = require("dayjs");

let var1 = new task(3, "phone call", true, false, "March 8, 2021 4:20 PM");
let var2 = new task(2, "monday lab", false, false, "March 5, 2021 10:00 AM");
let var3 = new task(1, "laundry", false, true, null);

let list = new taskList();
list.add(var1);
list.add(var2);
list.add(var3);

function task(id, description, urgent=false, pvt=true, deadline)
{
    this.id = (typeof id == "number") ? id : null;
    this.description = (typeof description == "string") ? description : "";
    this.urgent = (typeof urgent == "boolean") ? urgent : false;
    this.pvt = (typeof pvt == "boolean") ? pvt : false;
    this.deadline = (typeof deadline == "string") ? dayjs(deadline) : false;

    this.toString = () => { return `ID: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.pvt}, Deadline: ${(!this.deadline) ? "<not definied>": this.deadline.format("DD/MM/YYYY")}`};
}

function taskList()
{
    this.tasks = [];

    this.add = (task) =>{
        this.tasks.push(task);
    }

    this.sortAndPrint = () => {
        console.log("****** Tasks sorted by deadline (most recent first): ******");
        this.tasks.sort((a, b) => {
            if(!a.deadline)
                return +1;
            if(!b.deadline)
                return -1;

            return a.deadline - b.deadline;
        });
        this.print();
    };

    this.filterAndPrint = () => {
        console.log("****** Tasks filtered, only (urgent == true): ******");
        this.tasks.forEach((task) => { 
            if(task.urgent)
                console.log(task.toString());
        });
    };

    this.print = () => {
       this.tasks.forEach((task)=>console.log(task.toString()));
    };
}