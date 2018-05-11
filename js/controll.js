var itens = [];   // vetor global para armazenar os itens do pedido

function trocarItem() {
  // cria referência aos elementos select
  var inLanche = document.getElementById("inLanche");
  var inPromo = document.getElementById("inPromo");

  // se estiver marcado
  if (rbLanche.checked) {
    inPromo.className = "oculta";    // oculta select das promocao
    inLanche.className = "exibe";      // exibe select das Lanche
  } else {
    inLanche.className = "oculta";     // oculta as Lanche
    inPromo.className = "exibe";     // exibe as promocao
  }
}
// cria referência aos radiobutton's e associa função ao evento change
var rbLanche = document.getElementById("rbLanche");
rbLanche.addEventListener("change", trocarItem);

var rbPromo = document.getElementById("rbPromo");
rbPromo.addEventListener("change", trocarItem);

function mostrarNumSabores() {
  // se radiobutton rbLanche estiver marcado
  if (rbLanche.checked) {
    var lanche = inLanche.value;    // obtém value do item selecionado
    // uso do operador ternário (cap. 3), para indicar o número de sabores
    var num = (lanche == "X-Burger") ? 2 : (lanche == "h") ? 3 : 4;
    // atributo placeholder exibe uma dica de preenchimento do campo
    inDetalhes.placeholder = "Até " + num + " sabores";

  }
}

// cria referência ao elemento e associa função ao evento focus
var inDetalhes = document.getElementById("inDetalhes");
inDetalhes.addEventListener("focus", mostrarNumSabores);

// cria função (anônima) ao evento blur (quando o campo perde o foco)
inDetalhes.addEventListener("blur", function () {
  inDetalhes.placeholder = "";   // limpa a dica de preenchimento
});

// cria função (anônima) associada ao evento keypress (tecla pressionada)
inDetalhes.addEventListener("keypress", function (tecla) {
  // se pressionou tecla de código 13 (enter)
  if (tecla.keyCode == 13) {
    adicionarItem();     // irá adicionar item no pedido
  }
});

function adicionarItem() {
  // cria referência aos elementos da página (ainda não referenciados)
  var inLanche = document.getElementById("inLanche");
  var inPromo = document.getElementById("inPromo");
  var outPedido = document.getElementById("outPedido");

  // se radiobutton Lanche estiver marcado
  if (rbLanche.checked) {
    var num = inLanche.selectedIndex;          // obtém nº do item selecionado    
    var produto = inLanche.options[num].text;  // texto do item selecionado
  } else {
    var num = inPromo.selectedIndex;
    var produto = inPromo.options[num].text;
  }
  var detalhes = inDetalhes.value;           // conteúdo do inDetalhes  
  itens.push(produto + " (" + detalhes + ")");   // adiciona ao vetor
  outPedido.textContent = itens.join("\n");      // exibe em outPedidos  
  limparCampos();                                // limpa conteúdo dos campos
}
// cria referência ao elemento e associa função ao evento click
var btAdicionar = document.getElementById("btAdicionar");
btAdicionar.addEventListener("click", adicionarItem);

function limparCampos() {
  rbLanche.checked = true;                // marca (seleciona) rbLanche
  inPromo.className = "oculta";         // oculta select das promocao
  inLanche.className = "exibe";           // exibe select das Lanche
  inLanche.selectedIndex = 0;             // seleciona 1º item (posição 0)
  inDetalhes.value = "";                 // limpa input Detalhes
  rbLanche.focus();                       // "joga o foco" no rbLanche
}