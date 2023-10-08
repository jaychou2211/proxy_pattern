import { Database } from "./interface/Database";
import { Employee } from "./interface/Employee";
import { RealEmployee } from "./RealEmployee";
import { VirtualRealEmployeeProxy } from "./VirtualRealEmployeeProxy";
import fs from 'fs';
import { createInterface, Interface as ReadlineInterface } from 'readline';

export class RealDatabase implements Database {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    async getEmployeeById(id: number): Promise<Employee | undefined> {
        let resolve: (value: Employee) => void;
        let handler: (line: string) => void;

        const promise = new Promise<Employee>((res: (value: Employee) => void) => {
            const lineReader = this.lineReader;
            resolve = res;
            handler = this.createHandler(id, lineReader, resolve);
            lineReader.on('line', handler);
        });

        const employee = await promise;
        return employee;
    }

    private get lineReader() {
        const inputStream = fs.createReadStream(this.filePath);
        return createInterface({ input: inputStream });
    }

    private createHandler = (
        id: number,
        lineReader: ReadlineInterface,
        resolve: (value: Employee) => void,
        i = 0
    ) =>
        (line: string) => {
            i++;
            if (i === id + 1) {
                lineReader.close();
                lineReader.removeAllListeners('line');
                const [id, name, age, subordinateIds] = line.split(' ');
                const subordinateIdList = subordinateIds ? subordinateIds.split(',').map(Number) : [];
                resolve(new VirtualRealEmployeeProxy(Number(id), name, Number(age), subordinateIdList, this));
            }
        }
}
