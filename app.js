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

let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

// BOTÃO VER SENHA
btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

//BOTÃO VER CONFIRMAR SENHA
btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha')

    if(inputConfirmSenha.getAttribute('type') == 'password') {
        inputConfirmSenha.setAttribute('type', 'text')
    } else {
        inputConfirmSenha.setAttribute('type', 'password')
    }
})


// Campo com evento que muda a cor do label e input quando atinge uma quantidade específica de caracteres.
// É repetida para usuario, email, senha e confirmar senha.

usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 4){
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuário (Insira no minimo 5 caracteres)'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    } else {
        labelUsuario.setAttribute('style', 'color: green')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute('style', 'border-color: green')
        validUsuario = true
    }

    if(usuario.value <= 1){
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuário (Preencha  o espaço corretamente)'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    }
})

email.addEventListener('keyup', () => {
    if(email.value.length <= 4){
        labelMail.setAttribute('style', 'color: red')
        labelMail.innerHTML = 'E-mail (Insira no minimo 5 caracteres)'
        email.setAttribute('style', 'border-color: red')
        validMail = false
    } else {
        labelMail.setAttribute('style', 'color: green')
        labelMail.innerHTML = 'E-mail'
        email.setAttribute('style', 'border-color: green')
        validMail = true
    }

    if(email.value <= 1){
        labelMail.setAttribute('style', 'color: red')
        labelMail.innerHTML = 'E-mail (Preencha o espaço corretamente)'
        email.setAttribute('style', 'border-color: red')
        validEmail = false
    }
})

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 4){
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha (Insira no minimo 5 caracteres)'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
        btn.setAttribute('style', 'color: red')
    } else {
        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
        btn.setAttribute('style', 'color: green')
    }

    if(senha.value <= 1){
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha (Preencha o espaço corretamente)'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
        btn.setAttribute('style', 'color: red')
    }
})

// CONFIRMAR SENHA:

confirmSenha.addEventListener('keyup', () => {
    if(senha.value != confirmSenha.value){
        labelConfirmSenha.setAttribute('style', 'color:red')
        labelConfirmSenha.innerHTML = 'Senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
        btnConfirm.setAttribute('style', 'color: red')
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true
        btnConfirm.setAttribute('style', 'color: green')
    }
    
    if(confirmSenha.value <= 1){
        labelConfirmSenha.setAttribute('style', 'color: red')
        labelConfirmSenha.innerHTML = 'Confirmar Senha (Preencha o espaço corretamente)'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
        btnConfirm.setAttribute('style', 'color: red')
    }
})

// BOTÃO CADASTRAR:

function cadastrar() {
    if(validUsuario && validMail && validSenha && validConfirmSenha) { 

        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push (
            {
                userCad: usuario.value,
                mailCad: email.value,
                senhaCad: senha.value

            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser))

        msgSucess.setAttribute('style', 'display: block')
        msgSucess.innerHTML = ('<strong>Cadastrando usuário...<strong/>')
        msgError.setAttribute('style', 'display: none')

        setTimeout(()=> {
            alert('Cadastrado com Sucesso!')
            window.location.href = 'homepage.html'
        }, 3000)


    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSucess.setAttribute('style', 'display: none')
    }
}

// BOTÃO ENTRAR:

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

    // console.log(listaUser) para ver os objetos JSON de listaUser que está cadastrado no localStorage 
    // utilizando essa nova variável listaUser

    listaUser.forEach((item) => {
        if(usuario.value == item.userCad && senha.value == item.senhaCad) {
            userValid = {
                user: item.userCad,
                mail: item.mailCad,
                senha: item.senhaCad
            }

            window.location.href = 'logado.html'

            let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
            localStorage.setItem('token', token)
    
            localStorage.setItem('userLogado', JSON.stringify(userValid))

        } else {
            usuario.setAttribute('style', 'border-color: red')
            userLabel.setAttribute('style', 'color:red')
            userLabel.innerHTML = 'Usuário (Preencha o campo corretamente)'
            senha.setAttribute('style', 'border-color: red')
            senhaLabel.setAttribute('style', 'color: red')
            senhaLabel.innerHTML = 'Senha (Preencha o campo corretamente)'
            msgError.innerHTML = 'Usuário e senha não conferem'
            msgError.setAttribute('style', 'display: block')
            usuario.focus()
        }
    })


}