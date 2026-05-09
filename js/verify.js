'use strict'

function limparInput() {
    const inputs = document.querySelectorAll('.input')
    inputs.forEach(input => {
        input.value = ""
    })
    const todosCampos = document.querySelectorAll('.input, select')
    todosCampos.forEach(campo => {
        campo.classList.remove('input-invalido')
    })
    const todasMensagens = document.querySelectorAll('.erro-mensagem')
    todasMensagens.forEach(mensagem => {
        mensagem.textContent = ""
    })
}

function limparMensagensErro() {
    const mensagens = ['nome', 'idade', 'email', 'telefone', 'rua', 'cidade']
    mensagens.forEach(campo => {
        const spanErro = document.getElementById(`erro-${campo}`)
        if (spanErro) {
            spanErro.textContent = ""
        }
    })
}

function verificar() {
    const todosCampos = document.querySelectorAll('.input, select')
    todosCampos.forEach(campo => {
        campo.classList.remove('input-invalido')
    })
    
    limparMensagensErro()
    
    const campos = [
        { id: 'nome', nome: 'Nome Completo' },
        { id: 'idade', nome: 'Idade' },
        { id: 'email', nome: 'E-mail' },
        { id: 'telefone', nome: 'Número de Telefone' },
        { id: 'rua', nome: 'Rua' },
        { id: 'cidade', nome: 'Cidade' }
    ]
    
    let primeiroCampoInvalido = null
    let temErro = false
    
    for (let campo of campos) {
        const campoElement = document.getElementById(campo.id)
        if (!campoElement) continue;
        
        const valor = campoElement.value.trim()
        
        if (!valor) {
            const spanErro = document.getElementById(`erro-${campo.id}`)
            if (spanErro) {
                spanErro.textContent = `O campo ${campo.nome} é obrigatório`
            }
            campoElement.classList.add('input-invalido')
            temErro = true
            
            if (!primeiroCampoInvalido) {
                primeiroCampoInvalido = campoElement
            }
        }
    }
    if (temErro) {
        if (primeiroCampoInvalido) {
            primeiroCampoInvalido.focus()
        }
        return false
    }
    alert("Formulário enviado com sucesso!")
    return true
}

const camposValidacao = ['nome', 'idade', 'email', 'telefone', 'rua', 'cidade']
camposValidacao.forEach(campo => {
    const elemento = document.getElementById(campo)
    if (elemento) {
        elemento.addEventListener('input', function() {
            this.classList.remove('input-invalido')
            const spanErro = document.getElementById(`erro-${campo}`)
            if (spanErro) {
                spanErro.textContent = ""
            }
        })
    }
})