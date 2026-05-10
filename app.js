'use strict'

import { verificar, limparInput, iniciarListenersValidacao } from './js/verify.js'
import { carregarContatos } from './js/icones.js'
import { postContato } from './js/contatos.js'

async function salvarContato() {
    const contato = {
        nome: document.getElementById('nome').value,
        idade: parseInt(document.getElementById('idade').value),
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        foto: "https://via.placeholder.com/150"
    }
    
    try {
        await postContato(contato)
        alert("Contato salvo com sucesso!")
        limparInput()
        await carregarContatos()
    } catch (error) {
        alert("Erro ao salvar contato: " + error.message)
    }
}

function iniciarBotoes() {
    const btnEnviar = document.getElementById('btnEnviar')
    if (btnEnviar) {
        btnEnviar.addEventListener('click', async function() {
            if (verificar()) {
                await salvarContato()
            }
        })
    }
    
    const btnLimpar = document.getElementById('btnLimpar')
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            limparInput()
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarListenersValidacao()
    iniciarBotoes()
    carregarContatos()
})