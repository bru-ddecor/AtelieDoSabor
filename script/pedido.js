let total = 0;

function adicionarPedido(nome, preco){
    const lista =document.getElementById('listaPedido');
    const item = document.createElement('div');

    item.classList.add('item');

    item.innerHTML = `
        <p>${nome}</p>
        <p>R$ ${preco}</p>
    `;

    lista.appendChild(item);

    total+= preco;

    document.getElementById('totalPedido').innerText = total;

    document.getElementById('valorCarrinho').innerText = total;
}

function finalizarPedido(){


    document.getElementById('listaPedido').innerHTML = "";
    total = 0;
    document.getElementById('totalPedido').innerText = total;
    document.getElementById('valorCarrinho').innerText = total;
}

function abrirCarrinho(){
    const carrinho = document.querySelector('.pedido');

    if(carrinho) {
        carrinho.classList.toggle('active');
    } else {
        console.error('Elemento com a classe "pedido" não encontrado.');
    }
}

let historico = [];

async function enviarMensagemIA() {

    try {

        const mensagem =
            document.getElementById("mensagemIA").value;

        const resposta = await fetch(
            "http://localhost:3000/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensagem,
                    historico
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || "Erro na IA");
        }

        historico = dados.novoHistorico;

        document.getElementById("chatResposta").innerHTML += `
            <p><strong>Você:</strong> ${mensagem}</p>
            <p><strong>IA:</strong> ${dados.resposta}</p>
            <hr>
        `;

        document.getElementById("mensagemIA").value = "";

    } catch (erro) {

        console.error(erro);

        document.getElementById("chatResposta").innerHTML += `
            <p><strong>IA:</strong> Desculpe, estou indisponível no momento.</p>
            <hr>
        `;
    }
}