// //variaveis e arrays
// let valor = 0;

// const precosPao = {
//     frances: 1.50,
//     integral: 2.00,
//     ciabatta: 2.50
// };
// const precosRecheio = {
//     frango: 5.00,
//     carne: 6.50,
//     vegetariano: 4.00
// };
// const precosMolho = {
//     maionese: 0.50,
//     mostarda: 0.50,
//     especial: 1.50
// };
// //pao
// const pao = document.querySelector('#pao');

// pao.addEventListener("change", function(){
//     valor = precosPao[pao.value]+precosRecheio[recheio.value]+precosMolho[molho.value]
    
// });
// //recheio
// const recheio = document.querySelector('#recheio');

// recheio.addEventListener("change", function(){
//     valor = precosPao[pao.value]+precosRecheio[recheio.value]+precosMolho[molho.value]
// });
// //molho
// const molho = document.querySelector('#molho');

// molho.addEventListener("change", function (){
//     valor = precosPao[pao.value]+precosRecheio[recheio.value]+precosMolho[molho.value];
// });
// //botao calculadora
// let resultado = document.querySelector('#resultado')
// const botao = document.querySelector('#calcular')

// botao.addEventListener("click", function(){
//     resultado.textContent=valor
// });



const URL_API = "https://bite-bun.onrender.com";

async function carregarCardapio() {
    const resposta = await fetch(`${URL_API}/cardapio`);
    const dados = await resposta.json();
    console.log(dados);
    popularSelect("pao", dados.filter((item => item.categoria === "pao")))
    popularSelect("recheio", dados.filter((item => item.categoria === "recheio")))
    popularSelect("molho", dados.filter((item => item.categoria === "molho")))
}
carregarCardapio();

const botaoCalcular = document.querySelector("#calcular");
const resultado = document.querySelector("#resultado");
botaoCalcular.addEventListener("click", async () => {
    const pedido = {
        pao: document.querySelector("#pao").value,
        recheio: document.querySelector("#recheio").value,
        molho: document.querySelector("#molho").value
    };
    try {
        const resposta = await fetch(`${URL_API}/pedido`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });
        const dados = await resposta.json();
        resultado.textContent = dados.erro
            ? dados.erro
            : `Total: R$ ${dados.total.toFixed(2)}`;
    } catch (erro) {
        resultado.textContent = "Não foi possível calcular o pedido.";
        console.error(erro);
    }
});

function popularSelect(idSelect, itens){
    const select = document.querySelector(`#${idSelect}`)
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i]
        const option = document.createElement("option")
        option.value = item.nome
        option.textContent = `${item.nome} - R$${(item.preco).toFixed(2)}`
        select.appendChild(option)
    }
};