export interface Employee {
    id: number;
    name: string;
    age: number;
    subordinates: Employee[];

    getSubordinates(): Promise<Employee[]>;
}