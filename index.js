const { select, input, checkbox } = require('@inquirer/prompts')

const fs = require('fs').promises

let mensagem = 'Bem vindo ao app de metas!';


let metas

const carregarMetas = async () => {
    try{
        const dados = await readfile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro){
        metas = []
    }
}

const salvarMetas = async () =>{
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2) )
}

const cadastrarMeta = async () =>{
    const meta = await input({ message: 'Digite a sua meta:' })

    if(meta.length == 0){
        mensagem ='Você precisa progetar uma meta!';
        return // essa recursividade é opcional
    }

    metas.push(
        {
            value: meta,
            checked: false
        }
    )

    mensagem = 'Meta cadastrada com sucesso!'

}

const listarMetas = async () => {

    if(metas.length == 0){
        mensagem = 'Não existem metas'
        return
    }

    const respostas = await checkbox({
        message: 'Use as setas para mudar de meta, espaço para marcar/desmarcar uma meta e o Enter para finalizar uma meta!',
        instructions: false, // Este comando serve para validar ou cancelar uma a instruções no terminal
        choices: [...metas]
    })

    metas.forEach(m => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = 'Nenhúma meta selecionada!';
        return
    }

    respostas.forEach(resposta => {
        const meta = metas.find( m => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = 'Meta(s) marcada(s) com sucesso!'
    
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((metaR) => {
        return metaR.checked
    })

    if(realizadas.length == 0){
        mensagem = 'Ainda nenhuma meta foi realizada!'
        return
    }

    await select({
        message: 'Metas realizadas' + realizadas.length + ":",
        choices: [...realizadas],
        instructions: false
    })

}

const metasAbertas = async() => {
    const abertas = metas.filter((metaA) => {
        return !metaA.checked
    })

    if(abertas.length == 0){
        mensagem = 'Todas as metas foram realizadas!'
        return
    }

    await select({
        message: 'Metas abertas ' + abertas.length ,
        choices: [...abertas]
    })

}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map( meta => {
        return {value: meta.value, checked: false}
    })

    if(metasDesmarcadas.length == 0){
        mensagem = 'Nenhuma meta foi selecionada pra ser deletada'
        return
    }

    const itensDeletar = await checkbox({
        message: 'Selecionar itens para deletar!',
        choices: [...metasDesmarcadas]

    })

    if(itensDeletar.length == 0){
        mensagem = 'Nenhum item selecionado pra deletar!'
        return
    }

    itensDeletar.forEach(item => {
        metas = metas.filter(meta => {
            return meta.value != item
        })

        mensagem = 'Meta(s) deletada(s) com sucesso!';
    })
}

const mostarMensagem = () => {
    console.clear()

    if(mensagem != ''){
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }

}

const start = async () => {

    await carregarMetas()

    while(true){

        mostarMensagem()
        await salvarMetas()

        let opcao = await select({
            message: 'menu >',
            choices: [
                {
                    name:'Cadastar Meta',
                    value: 'cadastrar'
                },
                {
                    name: 'Listar Metas',
                    value: 'listar'
                },
                {
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Metas abertas',
                    value: 'abertas'
                },
                {
                    name: 'Deletar metas',
                    value: 'deletar'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        switch(opcao){
            case 'cadastrar':
                await cadastrarMeta()
                break
            case 'listar':
                await listarMetas()
                break
            case 'realizadas': 
                await metasRealizadas()
                break
            case 'abertas':
                await metasAbertas()
                break
            case 'deletar':
                await deletarMetas()
                break
            case 'sair':
                mensagem = "Saiu da aplicação!"
                return
        }
    }
};

start();