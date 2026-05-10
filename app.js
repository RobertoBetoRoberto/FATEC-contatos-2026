'use strict'

import { verificar, limparInput, iniciarListenersValidacao } from './js/verify.js'
import { carregarContatos } from './js/icones.js'
import { postContato } from './js/contatos.js'
import { iniciarPreviewImagem, getImagemBase64, limparPreview } from './js/foto.js'

async function salvarContato() {
    const fotoBase64 = await getImagemBase64()
    
    const contato = {
        nome: document.getElementById('nome').value,
        idade: parseInt(document.getElementById('idade').value),
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        foto: fotoBase64
    }
    
    try {
        await postContato(contato)
        alert("Contato salvo com sucesso!")
        limparInput()
        limparPreview()
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
            limparPreview()
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarListenersValidacao()
    iniciarPreviewImagem()
    iniciarBotoes()
    carregarContatos()
})