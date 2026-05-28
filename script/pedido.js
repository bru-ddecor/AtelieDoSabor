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
