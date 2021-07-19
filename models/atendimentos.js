const moment = require('moment')
const atendimentos = require('../controllers/atendimentos')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const datacriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data =  moment(atendimento.data, 'DD:MM:YYYY').format('YYYY-MM-DD HH:MM:SS')

        const clienteEhValido = atendimento.cliente.length >= 5
        const dataEhValida = moment(data).isSameOrAfter(datacriacao)

        const validacoes = [
            {
                nome:'data',
                valido: dataEhValida,
                mensagem: 'data deve ser maior ou igual a data atual'
        
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem:'cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, datacriacao, data}
            const sql = 'INSERT INTO atendimentos SET ?'
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(atendimento)
    
                }
            })

        }

    }
    lista(res){
        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }

        })
    }
    buscaPorId(id, res){
        const sql =`SELECT * FROM atendimentos where id = ${id}`

        conexao.query(sql, (erro, resultados) =>{
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }

        })
    }

    altera(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD:MM:YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        conexao.query(sql,[valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})

            }
        })

    }

    deleta(id, res){

        const sql = 'DELETE from atendimentos where id =?'
        conexao.query(sql,id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})

            }
        })
    }
}

module.exports = new Atendimento