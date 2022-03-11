let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let email = document.querySelector('#email')
let labelMail = document.querySelector('#labelMail')
let validMail = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSucess = document.querySelector('#msgSucess')

// Campo com evento que muda a cor do label e input quando atinge uma quantidade específica de caracteres.
// É repetida usando a variável usuario, email e senha.

usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 4){
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuário *insira no minimo 5 caracteres'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    } else {
        labelUsuario.setAttribute('style', 'color: green')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute('style', 'border-color: green')
        validUsuario = true
    }
})

email.addEventListener('keyup', () => {
    if(email.value.length <= 4){
        labelMail.setAttribute('style', 'color: red')
        labelMail.innerHTML = 'E-mail *insira no minimo 5 caracteres'
        email.setAttribute('style', 'border-color: red')
        validMail = false
    } else {
        labelMail.setAttribute('style', 'color: green')
        labelMail.innerHTML = 'E-mail'
        email.setAttribute('style', 'border-color: green')
        validMail = true
    }
})

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 4){
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha *insira no minimo 5 caracteres'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
    }
})

// CAMPO CONFIRM SENHA:

// se os caracteres do valor de senha forem diferentes dos caracteres do valor da confirmação de senha ele cai no seu "if" informando
// que sua condição é falsa, alterando sua cor para vermelho e ela não passará pelo "else" que mudará a cor do label para verde

confirmSenha.addEventListener('keyup', () => {
    if(senha.value != confirmSenha.value){
        labelConfirmSenha.setAttribute('style', 'color:red')
        labelConfirmSenha.innerHTML = 'Senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true
    }
})

// BOTÃO CADASTRAR:

// O codigo abaixo é a função cadastrar do botão, que pega a informação das condições de cima (se ele fica verde ou se ele fica vermelho
// acontece algo). Se essas coisas não acontecerem, eles não passam pelo 'if' da função cadastrar que foram validados pelo true
// e false, que são responsáveis por enviar os valores do imput para dentro do localStorage.
// se todas cairem no "true" essa informação é validada e passada para o banco, caso alguma seja falsa, ela cai no "else" que não
// deixa a sua operação terminar e imprime uma mensagem de erro vermelha no formato HTML (função innerHTML).

function cadastrar() {   // assim que clicamos bate aqui, todas originalmene são cadastradas nas variáveis como falsas
    if(validUsuario && validMail && validSenha && validConfirmSenha) { // o if so funciona se todas forem verdadeiras

        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push (
            {
                userCad: usuario.value,
                mailCad: email.value,
                senhaCad: senha.value

            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser))

        // mensagem de cadastrando usuario definindo(set) o atributo(Attribute) style do html que interfere(style) no css
        msgSucess.setAttribute('style', 'display: block')
        msgSucess.innerHTML = ('<strong>Cadastrando usuário...<strong/>')//insere no html
        msgError.innerHTML = ''
        msgError.setAttribute('style', 'display: none')

        setTimeout(()=> {
            alert('Cadastrado com Sucesso!')
            window.location.href = 'homepage.html'
        }, 3000)


    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSucess.innerHTML = ''
        msgSucess.setAttribute('style', 'display: none')
    }
}

function entrar () {
    let usuario = document.querySelector('#usuario')
    let userLabel = document.querySelector('#userLabel')

    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgError = document.querySelector('#msgError')
    let listaUser = []

    let userValid = {
        user: '',
        mail: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    // console.log(listaUser) para ver os objetos JSON da variavel 'listaUser' que já está cadastrado, para essa nova variável listaUser

    listaUser.forEach((item) => {
        if(usuario.value == item.userCad && senha.value == item.senhaCad) {
            userValid = {
                user: item.userCad,
                mail: item.mailCad,
                senha: item.senhaCad
            }
        }
    })

 // console.log(userValid) literalmente da mesma forma que foi escrito esse método: "para cada item(forEach item) se o valor digitado no
 // input usuario for igual ao valor usuario do LocalStorage e(&&) a mesma coisa para senha, o userValid vai retornar os itens
 // do localStorage.

    if(usuario.value == userValid.user && senha.value == userValid.senha) {
        window.location.href = 'logado.html'

        let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
        localStorage.setItem('token', token)

        localStorage.setItem('userLogado', JSON.stringify(userValid))

    } else {
        usuario.setAttribute('style', 'border-color: red')
        userLabel.setAttribute('style', 'color:red')
        senha.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        msgError.innerHTML = 'Usuário e senha não conferem'
        msgError.setAttribute('style', 'display: block')
        usuario.focus()
    }
}