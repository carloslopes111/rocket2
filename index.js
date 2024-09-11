// Array, object

const meta ={
    value: "Ler um livro todo mês",
    checked: false,
    snifa: (infor) => {
        console.log(infor)
    }
};

meta.snifa(meta.value)

meta.value = "Não é mais ler um livro";

meta.snifa(meta.value)
meta.snifa(meta.checked)