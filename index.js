const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = 'Bem vindo ao app de metas!';

let meta = {
    value: 'Beber 2l de água por dia',
    checked: false
} 

let metas = [ meta ]

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

    while(true){

        mostarMensagem()

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