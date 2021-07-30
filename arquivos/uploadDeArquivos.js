const fs = require('fs')

fs.createReadStream('./assets/pitbull.jpg')
    .pipe(fs.createWriteStream('./assets/boystream.jpg'))
    .on('finish', () => console.log('boystream criado com sucesso'))