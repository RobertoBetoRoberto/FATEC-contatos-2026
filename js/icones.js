'use strict'

import { getContatos, deleteContato } from './contatos.js'

let container = null

function inicializarContainer() {
    container = document.getElementById('lista-contatos')
    return container
}

function mostrarLoading() {
    if (!container) inicializarContainer()
    if (container) {
        container.innerHTML = '<div class="loading-mensagem">Carregando contatos do servidor...</div>'
    }
}

function criarCardContato(contato) {
    const card = document.createElement('div')
    card.className = 'contato-card'
    card.setAttribute('data-id', contato.id)
    
    const fotoUrl = contato.foto || 'https://via.placeholder.com/80?text=Sem+Foto'
    
    const divFoto = document.createElement('div')
    divFoto.className = 'contato-foto-container'
    
    const img = document.createElement('img')
    img.src = fotoUrl
    img.alt = contato.nome || 'Sem nome'
    img.className = 'contato-foto'
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/80?text=Erro'
    }
    divFoto.appendChild(img)
    
    const divNome = document.createElement('div')
    divNome.className = 'contato-nome'
    divNome.textContent = contato.nome || 'Sem nome'
    
    const divInfoCelular = document.createElement('div')
    divInfoCelular.className = 'contato-info'
    divInfoCelular.innerHTML = `<strong>Celular:</strong> <span>${contato.celular || 'Nao informado'}</span>`
    
    const divInfoEmail = document.createElement('div')
    divInfoEmail.className = 'contato-info'
    divInfoEmail.innerHTML = `<strong>Email:</strong> <span>${contato.email || 'Nao informado'}</span>`
    
    const divInfoEndereco = document.createElement('div')
    divInfoEndereco.className = 'contato-info'
    divInfoEndereco.innerHTML = `<strong>Endereco:</strong> <span>${contato.endereco || 'Nao informado'}</span>`
    
    const divInfoCidade = document.createElement('div')
    divInfoCidade.className = 'contato-info'
    divInfoCidade.innerHTML = `<strong>Cidade:</strong> <span>${contato.cidade || 'Nao informado'}</span>`
    
    card.appendChild(divFoto)
    card.appendChild(divNome)
    card.appendChild(divInfoCelular)
    card.appendChild(divInfoEmail)
    card.appendChild(divInfoEndereco)
    card.appendChild(divInfoCidade)
    
    if (contato.idade) {
        const divInfoIdade = document.createElement('div')
        divInfoIdade.className = 'contato-info'
        divInfoIdade.innerHTML = `<strong>Idade:</strong> <span>${contato.idade} anos</span>`
        card.appendChild(divInfoIdade)
    }
    
    const divBotaoExcluir = document.createElement('div')
    divBotaoExcluir.className = 'contato-botao-excluir'
    
    const btnExcluir = document.createElement('button')
    btnExcluir.innerHTML = '🗑️ Excluir'
    btnExcluir.className = 'btn-excluir'
    btnExcluir.title = 'Excluir contato'
    btnExcluir.onclick = async function(event) {
        event.stopPropagation()
        if (confirm(`Tem certeza que deseja excluir ${contato.nome}?`)) {
            try {
                await deleteContato(contato.id)
                await carregarContatos()
                alert('Contato excluído com sucesso!')
            } catch (error) {
                alert('Erro ao excluir contato: ' + error.message)
            }
        }
    }
    
    divBotaoExcluir.appendChild(btnExcluir)
    card.appendChild(divBotaoExcluir)
    
    return card
}

function exibirContatos(contatos) {
    if (!container) inicializarContainer()
    if (!container) return
    
    container.innerHTML = ''
    
    if (!contatos || contatos.length === 0) {
        container.innerHTML = '<div class="sem-contatos">Nenhum contato encontrado. Cadastre um novo contato!</div>'
        return
    }
    
    contatos.forEach(contato => {
        const card = criarCardContato(contato)
        container.appendChild(card)
    })
}

function mostrarErro(mensagem) {
    if (!container) inicializarContainer()
    if (container) {
        container.innerHTML = `
            <div class="erro-mensagem-global">
                Erro ao carregar contatos: ${mensagem}<br><br>
                <button id="btnTentarNovamente" style="padding: 8px 15px; background-color: #22a289; border: none; border-radius: 8px; color: white; cursor: pointer;">
                    Tentar novamente
                </button>
            </div>
        `
        
        const btnTentar = document.getElementById('btnTentarNovamente')
        if (btnTentar) {
            btnTentar.addEventListener('click', () => carregarContatos())
        }
    }
}

export async function carregarContatos() {
    mostrarLoading()
    
    try {
        const contatos = await getContatos()
        exibirContatos(contatos)
    } catch (error) {
        console.error('Erro ao carregar contatos:', error)
        mostrarErro(error.message)
    }
}