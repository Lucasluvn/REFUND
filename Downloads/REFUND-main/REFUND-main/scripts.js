// seleciona os elementos "globais" para selecionar os inputs
const form = document.querySelector("#form-refund")
const expense = document.getElementById("expense-title")
const category = document.getElementById("expense-category")
const amount = document.getElementById("expense-amount")
const quantity = document.getElementById("expenses-quantity")
const expensesTotal = document.getElementById("expenses-total")
const expensesList = document.getElementById("expenses-list")

//  // captura o evento no input para formatar o valor
amount.oninput = () => {
  // retira qualquer e impede o usario de add qualque letra ou caracter que não seja um numero no input de valor
  let value = amount.value.replace(/[^\d/]/g, "")
  // atualiza o valor para centavos
 value = Number (value)/100

 // Formata o valor do input
amount.value = formatCurrencyBRL(value)

}
// função para formatar o input para o REAL
function formatCurrencyBRL(value) {
  value = value.toLocaleString ("pt-br",{
    style: "currency",
    currency: "BRL",
   
  })
  // retornar o valor formatado 
  return value
   }
// captura o evendo no input para formatar o valor
   form.oninput = () => {


   }
// Captura o evento de submit do formulario para obter os valores
   form.onsubmit = (event) => {
// previne a pagina de ficar carregando a todo momento
event.preventDefault()

// vai ser o card com as informaçoes das despesas
const NewExpenses = {
  id: new Date().getTime(),
  expense: expense.value,
  category_id: category.value,
  category_name: category.options[category.selectedIndex].text,
  amount: amount.value,
  created_at: new Date()
}
// chama a função que vai add o item na lista
expenseadd(NewExpenses)
}
function expenseadd(NewExpenses) {
  try {
 // cria o elemento (como se fosse uma caixa ) para adiconar o item (li) na lista (ul)
 const expenseIcon  = document.createElement("img")
    

// cria os icons de imagem dinamicamente e adciona o conteudo da li na ul criando os icones das dispesas
const creatItem = document.createElement("li")
expenseIcon.setAttribute("src",`ASSETS/${NewExpenses.category_id}.svg`)
expenseIcon.setAttribute("alt", NewExpenses.category_name)
creatItem.classList.add("item")
  
// adiciona as informaçoes do icone
creatItem.appendChild(expenseIcon)
 
// Cria a Info das dispesas
const expenseInfo = document.createElement ("div")
expenseInfo.classList.add("Detalhes")
// cria a categoria da dispensa
const expenseName = document.createElement("strong")
expenseName.textContent = NewExpenses.expense
// Cria o nome da dispesa 
const expenseCategory = document.createElement("span")
expenseCategory.textContent = NewExpenses.category_name

// Cria o botão de remover
const cancelIcon = document.createElement("button")
cancelIcon.classList.add("remove-icon")


// criando o conteudo do botão remover
const cancelButton = document.createElement("i")
cancelButton.classList.add("ph","ph-x")
cancelIcon.appendChild(cancelButton)

//dando a função de "remover" para o botão

expensesList.addEventListener("click",(event) =>{
  // Verifica se o click foi no botão de remover
  if (event.target.classList.contains("ph-x")) {
    console.log("botão clicado");
  // Lógica para adicionar função no botão de remover o agendamento
  const buttonRemove = event.target.closest("li")
  // Remove o elemento <li> do HTML se ele existir
  if (buttonRemove) {
    buttonRemove.remove()
  // chamando o calculateTotalExpenses aqui de novo meu total se atualizar automaticamente se uma dispesa for removida
    calculateTotalExpenses()
    
  }
    
  } 
}
)

// Adiciona a função de formatação ao valor da despesa
const newAmount = document.createElement("strong")
newAmount.classList.add("Precos")
newAmount.innerHTML = `${NewExpenses.amount}`

console.log("Deu certo!")
// adiciona as informações no item

expenseInfo.append(expenseName,expenseCategory)

// Adciona o item na lista
creatItem.append(expenseIcon,expenseInfo,newAmount,cancelIcon)

expensesList.append(creatItem)

calculateTotalExpenses()

// limpa os inputs 
clearInput()



} catch (error) {
    console.log("Erro ao adicionar a despesa:", error)
    
  }
}
// limpa os inputs 
function clearInput() {
amount.value = ("")
category.value = ("")
expense.value = ("")
}
// criando a soma dos valores totais 
function calculateTotalExpenses() {
// Recupera todos os totais da (ul) e (li)
  const items = expensesList.children
try {
// seleciona os intens da li
  const expenseItems = expensesList.querySelectorAll("li")
// Atualiza a quantidade de intens na lista 
  quantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
  // variavel para incrementar o total
  let total = 0
// percorre toda a li em loop
  expenseItems.forEach((item) => {

// Mostra o total das dipesas no header percorrendo os itens da li 

 const TotalExpense = item.querySelector(".Precos")

// Remove caracteres não numericos e substitui a virgula pelo ponto
 let value = TotalExpense.textContent.replace(/[^\d,]/g, "").replace(",",".")
// converte para Parsefloat
 value = parseFloat(value)
//verifica se o numeor é valido
 if (isNaN (value)) {
  return alert ("Não foi possivel calcular o total, o valor não parece ser um numero")
  }
// incrementa o valor total 
total += Number(value)
})
// Formata para o formato brasileiro
  expensesTotal.textContent = formatCurrencyBRL(total)
  
  } catch (error) {
  console.log(error)
}
}

