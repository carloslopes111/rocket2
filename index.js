const { select, input } = require('@inquirer/prompts')

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
                console.log('vamos listar')
                break
            case 'sair':
                console.log("Saiu da aplicação")
                return
        }
    }
};

start();