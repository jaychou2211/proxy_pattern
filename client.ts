import { Database } from "./src/interface/Database";
import { Employee } from "./src/interface/Employee";



export const print = (employee: Employee) => {
    const { id, name, age } = employee;
    console.log(`id: ${id}, name: ${name}, age: ${age}`);
}


export class Client {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    async getEmployeeById(id: number) {
        return this.db.getEmployeeById(id);
    }

    async getSubordinatesBy(employee: Employee) {
        return employee.getSubordinates();
    }
}