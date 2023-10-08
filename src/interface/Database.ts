import { Employee } from "./Employee"

export interface Database {
    getEmployeeById(id: number): Promise<Employee | undefined>
}