const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Beber 2l de água por dia',
    checked: false
} 

let metas = [ meta ]

const cadastrarMeta = async () =>{
    const meta = await input({ message: 'Digite a sua meta:' })

    if(meta.length == 0){
        console.log('Você precisa progetar uma meta')
        return // essa recursividade é opcional
    }

    metas.push(
        {
            value: meta,
            checked: false
        }
    )

}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: 'Use as setas para mudar de meta, espaço para marcar/desmarcar uma meta e o Enter para finalizar uma meta',
        instructions: false, // Este comando serve para validar ou cancelar uma a instruções no terminal
        choices: [...metas]
    })

    if(respostas.length == 0){
        console.log('Nenhúma meta selecionada!');
        return
    }

    metas.forEach(m => {
        m.checked = false
    })

    respostas.forEach(resposta => {
        const meta = metas.find( m => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) concluída(s)')
    
}


const start = async () => {

    while(true){

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
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        switch(opcao){
            case 'cadastrar':
                await cadastrarMeta();
                // Este tamplete literal é invenção minha
                console.log(metas.length == 0 ? 'Nenhuma meta foi marcada' : metas )
    
                break
            case 'listar':
                await listarMetas()
                break
            case 'sair':
                console.log("Saiu da aplicação")
                return
        }
    }
};

start();