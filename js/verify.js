'use strict'

export function limparInput() {
    const inputs = document.querySelectorAll('.input')
    inputs.forEach(input => {
        input.value = ""
    })
    const todosCampos = document.querySelectorAll('.input')
    todosCampos.forEach(campo => {
        campo.classList.remove('input-invalido')
    })
    const campos = ['nome', 'idade', 'email', 'celular', 'endereco', 'cidade']
    campos.forEach(campo => {
        const spanErro = document.getElementById(`erro-${campo}`)
        if (spanErro) {
            spanErro.textContent = ""
        }
    })
}

export function verificar() {
    const todosCampos = document.querySelectorAll('.input')
    todosCampos.forEach(campo => {
        campo.classList.remove('input-invalido')
    })
    
    const campos = ['nome', 'idade', 'email', 'celular', 'endereco', 'cidade']
    campos.forEach(campo => {
        const spanErro = document.getElementById(`erro-${campo}`)
        if (spanErro) {
            spanErro.textContent = ""
        }
    })
    
    const camposValidacao = [
        { id: 'nome', nome: 'Nome Completo' },
        { id: 'idade', nome: 'Idade' },
        { id: 'email', nome: 'E-mail' },
        { id: 'celular', nome: 'Número de Celular' },
        { id: 'endereco', nome: 'Endereco' },
        { id: 'cidade', nome: 'Cidade' }
    ]
    
    let primeiroCampoInvalido = null
    let temErro = false
    
    for (let campo of camposValidacao) {
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
    
    return true
}

export function iniciarListenersValidacao() {
    const campos = ['nome', 'idade', 'email', 'celular', 'endereco', 'cidade']
    campos.forEach(campo => {
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
}