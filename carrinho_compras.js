import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const dadosProdutos = [
  { id: 1, nome: "Maçã", preco: 1.5 },
  { id: 2, nome: "Banana", preco: 1.0 },
  { id: 3, nome: "Laranja", preco: 2.0 },
  { id: 4, nome: "Leite", preco: 3.0 },
  { id: 5, nome: "Pão", preco: 2.5 },
];

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function Produto({ produto, adicionarAoCarrinho }) {
  const [quantidade, setQuantidade] = useState(1); // Estado isolado para cada produto

  const handleQuantidadeChange = (e) => {
    setQuantidade(parseInt(e.target.value, 10)); // Atualiza a quantidade
  };

  return (
    <li>
      {produto.nome} - {formatarPreco(produto.preco)}
      <input
        type="number"
        min="1"
        value={quantidade}
        onChange={handleQuantidadeChange}
        style={{ width: "50px", marginLeft: "10px", marginRight: "10px" }}
      />
      <button onClick={() => adicionarAoCarrinho(produto, quantidade)}>
        Adicionar ao Carrinho
      </button>
    </li>
  );
}

function ListaProdutos({ produtos, adicionarAoCarrinho }) {
  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        ))}
      </ul>
    </div>
  );
}

function Carrinho({ itensCarrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho }) {
  const total = itensCarrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {itensCarrinho.map((item, index) => (
          <li key={index}>
            {item.nome} - {formatarPreco(item.preco)} x{" "}
            <input
              type="number"
              min="1"
              value={item.quantidade}
              onChange={(e) =>
                atualizarQuantidade(index, parseInt(e.target.value, 10))
              }
              style={{ width: "50px", marginRight: "10px" }}
            />
            <button
              onClick={() => removerDoCarrinho(index)}
              className="remove-btn"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: {formatarPreco(total)}</h3>
      {/* Condicional para exibir o botão apenas se o carrinho não estiver vazio */}
      {itensCarrinho.length > 0 && (
        <button
          onClick={limparCarrinho}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Limpar Carrinho
        </button>
      )}
    </div>
  );
}

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto, quantidade) => {
    const itemExistente = itensCarrinho.find((item) => item.id === produto.id);
    if (itemExistente) {
      setItensCarrinho(
        itensCarrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        )
      );
    } else {
      setItensCarrinho([...itensCarrinho, { ...produto, quantidade }]);
    }
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = itensCarrinho.filter((_, i) => i !== index);
    setItensCarrinho(novoCarrinho);
  };

  const atualizarQuantidade = (index, novaQuantidade) => {
    const novoCarrinho = itensCarrinho.map((item, i) =>
      i === index ? { ...item, quantidade: novaQuantidade } : item
    );
    setItensCarrinho(novoCarrinho);
  };

  // Função para limpar o carrinho inteiro
  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      <div className="container">
        <ListaProdutos
          produtos={dadosProdutos}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
        <Carrinho
          itensCarrinho={itensCarrinho}
          removerDoCarrinho={removerDoCarrinho}
          atualizarQuantidade={atualizarQuantidade}
          limparCarrinho={limparCarrinho}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
