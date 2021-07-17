const express = require('express')

const app = express()

app.listen(3000, () => console.log('servidor rodando lindo na porta 3000'))

app.get('/atendimentos', (req, res) =>res.send('Você esta na rota de atendimentos e esta realizando um GET!!!'))