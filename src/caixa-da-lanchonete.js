class CaixaDaLanchonete {
    valores = {
        'cafe': 3.00,
        'chantily': 1.50,
        'suco': 6.20,
        'sanduiche': 6.50,
        'queijo': 2.00,
        'salgado': 7.50,
        'combo1': 9.50,
        'combo2': 7.50
    };

    verificaItens(arrayDeItens) { // método que verifica os itens passados 
        // Verifica se tem itens 
        if (arrayDeItens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
        // Vai mapear o array de itens passados para pegar o item e a sua respectiva quantidade
        let novoarray = arrayDeItens.map(item => item.split(',')[0]);
        let quantidades = arrayDeItens.map(quantidade => Number(quantidade.split(',')[1]));

        let somaDosItens = 0;
        // Laço for para pegar o tamanho do array e ir iterando de acordo com o valor do item e sua respectiva quantidade
        for (let i = 0; i < novoarray.length; i++) {
            let item = novoarray[i];
            let quantidade = quantidades[i];

            // Verifica se o item que tem no array vai ter no objeto valores

            if (!(this.valores.hasOwnProperty(item))) {
                return 'Item inválido!';
            }

            // Verifica se a quantidade do item é válida 
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }
            // Verifica se os itens extras são pedidos de acordo com seu item principal
            if (item === 'chantily' && !novoarray.includes('cafe')) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (item === 'queijo' && !novoarray.includes('sanduiche')) {
                return "Item extra não pode ser pedido sem o principal";
            }
            // Se as condições não passarem, vai realizar a soma dos itens de acordo com o valor do item e a sua quantidade
            somaDosItens += this.valores[item] * quantidade;
        }

        return somaDosItens;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        const metodosValidos = ['dinheiro', 'debito', 'credito'];

        // Verifica se o método de pagamento passado é válido
        if (!(metodosValidos.includes(metodoDePagamento))) {
            return 'Forma de pagamento inválida!';
        }
        // Variável que vai pegar o retorno da função que verifica os itens
        const valorDaCompra = this.verificaItens(itens);

        // Aqui vai verificar o método de pagamento e o retorno da função que verifica os itens
        // E a partir disso realizar os cálculos de desconto e acréscimo de acordo com o método de pagamento
        if (metodoDePagamento === 'credito' && typeof valorDaCompra === 'number') {
            const valorComAcrescimo = valorDaCompra + (valorDaCompra * (3 / 100));
            const valorConvertido = parseFloat(valorComAcrescimo.toFixed(2))
            return `R$ ${valorConvertido.toString().replace('.', ',')}`;
        } 
        if (metodoDePagamento === 'dinheiro' && typeof valorDaCompra === 'number') {
            const valorComDesconto = valorDaCompra - (valorDaCompra * (5 / 100));
            const valorConvertido = parseFloat(valorComDesconto.toFixed(2))
            return `R$ ${valorConvertido.toString().replace('.', ',')}`;
        } if (metodoDePagamento === 'debito' && typeof valorDaCompra === 'number') {
            const valorConvertido = parseFloat(valorDaCompra).toFixed(2)
            return `R$ ${valorConvertido.toString().replace('.', ',')}`;
        }
        else{
            //Tratar qualquer outra situação aqui que o retorno da função que verifica os itens não seja um número
            return valorDaCompra;
        }
    }


}

export { CaixaDaLanchonete };