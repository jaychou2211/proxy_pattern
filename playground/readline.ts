import fs from 'fs';
import { createInterface, Interface as ReadlineInterface  } from 'readline';

// 建立檔案讀取資料流
var inputStream = fs.createReadStream('example.txt');

// 將讀取資料流導入 Readline 進行處理 
var lineReader = createInterface({ input: inputStream });

const createHandler = (raw: number, lineReader: ReadlineInterface, i = 0) => (line: string) => {
    i++;
    if (i === raw) {
        const [id, name, age, subordinateIds] = line.split(' ');
        // console.log(id, name, age, subordinateIds);
        console.log(lineReader.listeners('line'))
        lineReader.removeListener('line',console.log);
        lineReader.close();
        lineReader.removeAllListeners('line');
    }
}

lineReader.on('line', createHandler(5, lineReader));
lineReader.on('line', createHandler(4, lineReader));
lineReader.on('line', console.log);


