const URL_API = "https://bite-bun.onrender.com";

async function carregarCardapio() {
    const resposta = await fetch(`${URL_API}/cardapio`);
    const dados = await resposta.json();
    console.log(dados);
    popularOpcoes("opcoes-pao", dados.filter((item) => item.categoria === "pao"));
    popularOpcoes("opcoes-recheio", dados.filter((item) => item.categoria === "recheio"));
    popularOpcoes("opcoes-molho", dados.filter((item) => item.categoria === "molho"));

    marcarSelecao("opcoes-pao");
    marcarSelecao("opcoes-recheio");
    marcarSelecao("opcoes-molho");
}
carregarCardapio();

function popularOpcoes(idGrupo, itens) {
    const grupo = document.querySelector(`#${idGrupo}`);
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "opcao-img";
        botao.dataset.valor = item.nome;

        const img = document.createElement("img");
        img.src = `imagens/${item.nome}.png`;
        img.alt = item.nome;

        botao.appendChild(img);
        grupo.appendChild(botao);
    }
}

function marcarSelecao(idGrupo) {
    const grupo = document.querySelector(`#${idGrupo}`);
    grupo.addEventListener("click", (e) => {
        const botao = e.target.closest(".opcao-img");
        if (!botao) return;

        grupo.querySelectorAll(".opcao-img").forEach((b) => b.classList.remove("selecionado"));
        botao.classList.add("selecionado");
    });
}

function getSelecionado(idGrupo) {
    const el = document.querySelector(`#${idGrupo} .selecionado`);
    return el ? el.dataset.valor : null;
}

const botaoCalcular = document.querySelector("#calcular");
const resultado = document.querySelector("#resultado");
botaoCalcular.addEventListener("click", async () => {
    const pedido = {
        pao: getSelecionado("opcoes-pao"),
        recheio: getSelecionado("opcoes-recheio"),
        molho: getSelecionado("opcoes-molho")
    };

    if (!pedido.pao || !pedido.recheio || !pedido.molho) {
        resultado.textContent = "Selecione uma opção em cada categoria.";
        return;
    }

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
