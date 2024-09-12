const {select} = require('@inquirer/prompts')

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
                console.log('Vamos cadastrar')
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