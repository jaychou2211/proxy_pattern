import { Database } from "./interface/Database";
import { RealDatabase } from "./RealDatabase";
import { Employee } from "./interface/Employee";

export class VirtualRealDatabaseProxy implements Database {
    private realDb: RealDatabase;

    constructor(filePath: string) {
        this.realDb = new RealDatabase(filePath);
    }

    async getEmployeeById(id: number): Promise<Employee | undefined> {
        if (process.env.PASSWORD !== '1qaz2wsx')
            throw new Error('Invalid password');
        return await this.realDb.getEmployeeById(id);
    }

}