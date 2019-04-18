// import fs from 'fs';
import Work from './Work';
import Category from './Category';

// const models = {};
// // Load `*.ts` under current directory as properties
// fs.readdirSync(`${__dirname}/`).forEach(function(file) {
//     if (file.match(/\.ts$/) !== null && file !== 'index.ts') {
//         const name = file.replace('.ts', '');
//         models[name] = require(`./${file}`);
//     }
// });

// export default models;

export default {
    Work,
    Category,
};
