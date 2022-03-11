let userLogado = JSON.parse(localStorage.getItem('userLogado'))
let logado = document.querySelector('#logado')

logado.innerHTML = `Olá ${userLogado.user}`

if(localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = 'homepage.html'
}

function sair() {
    localStorage.removeItem('userLogado')
    localStorage.removeItem('token')
    window.location.href = 'homepage.html'
}