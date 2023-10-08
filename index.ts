import { Client, print } from "./client";
import { VirtualRealDatabaseProxy } from "./src/VirtualRealDatabaseProxy";
import { Employee } from "./src/interface/Employee";
import dotenv from 'dotenv';
dotenv.config();

(async () => {

    const client = new Client(new VirtualRealDatabaseProxy('example.txt'));

    const emp1 = await client.getEmployeeById(2);
    console.log('employee : ')
    print(emp1 as Employee);

    const subs = await client.getSubordinatesBy(emp1 as Employee);
    console.log('subordinates : ')
    subs.forEach(print);

})().catch(err => {
    console.log(err);
})
