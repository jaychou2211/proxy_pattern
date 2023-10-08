import { Employee } from "./interface/Employee";

export class RealEmployee implements Employee {
    public id: number;
    public name: string;
    public age: number;
    private _subordinates: Employee[] = [];

    constructor(id: number, name: string, age: number) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    get subordinates(): Employee[] {
        return this._subordinates;
    }

    set subordinates(subordinates: Employee[]) {
        this._subordinates = subordinates;
    }

    async getSubordinates(): Promise<Employee[]> {
        return this.subordinates;
    }

}