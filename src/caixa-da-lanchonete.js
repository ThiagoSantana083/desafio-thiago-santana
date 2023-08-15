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

    verificaItens(arrayDeItens) {
        if (arrayDeItens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let novoarray = arrayDeItens.map(str => str.split(',')[0]);
        let quantidades = arrayDeItens.map(str => Number(str.split(',')[1]));

        let somaDosItens = 0;

        for (let i = 0; i < novoarray.length; i++) {
            let item = novoarray[i];
            let quantidade = quantidades[i];

            if (!(this.valores.hasOwnProperty(item))) {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (item === 'chantily' && !novoarray.includes('cafe')) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (item === 'queijo' && !novoarray.includes('sanduiche')) {
                return "Item extra não pode ser pedido sem o principal";
            }

            somaDosItens += this.valores[item] * quantidade;
        }

        return somaDosItens;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        const metodosValidos = ['dinheiro', 'debito', 'credito']
        if (!(metodosValidos.includes(metodoDePagamento))) {
            return 'Forma de pagamento inválida!';
        }

        const valorDaCompra = this.verificaItens(itens);

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
            // Tratar o método de pagamento "débito" ou qualquer outra situação aqui
            return valorDaCompra;
        }
    }


}

export { CaixaDaLanchonete };