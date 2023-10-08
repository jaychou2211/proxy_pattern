import { createInterface, Interface as ReadlineInterface,moveCursor  } from 'readline';


const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 移動光標到 (10, 5) 的位置
moveCursor(process.stdout,10, 5);
// 在這個位置輸出一些文字
rl.write('Hello, World!');
