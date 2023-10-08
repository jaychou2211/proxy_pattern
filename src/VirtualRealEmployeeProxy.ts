import { Employee } from "./interface/Employee";
import { RealDatabase } from "./RealDatabase";
import { RealEmployee } from "./RealEmployee";

export class VirtualRealEmployeeProxy implements Employee {
    private realEp: RealEmployee;
    private realDb: RealDatabase;
    private subordinateIds: number[];

    constructor(id: number, name: string, age: number, subordinateIds: number[], realDb: RealDatabase) {
        this.realEp = new RealEmployee(id, name, age);
        this.subordinateIds = subordinateIds;
        this.realDb = realDb;
    }

    get id(): number { return this.realEp.id; }

    get name(): string { return this.realEp.name; }

    get age(): number { return this.realEp.age; }

    async getSubordinates(): Promise<Employee[]> {
        if (this.realEp.subordinates.length === 0) {
            const promiseList = this.subordinateIds.map(id => this.realDb.getEmployeeById(id));
            const subordinates = await Promise.all(promiseList);
            if (subordinates.length) this.subordinates = subordinates as Employee[];
        }
        return this.realEp.getSubordinates();
    }

    set subordinates(subordinates: Employee[]) {
        this.realEp.subordinates = subordinates;
    }
}
