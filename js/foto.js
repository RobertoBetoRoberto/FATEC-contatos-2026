'use strict'

let imagemSelecionada = null

export function iniciarPreviewImagem() {
    const inputFile = document.getElementById('preview-input')
    if (inputFile) {
        inputFile.addEventListener('change', preview)
    }
}

function preview(event) {
    const input = event.target
    const imgPreview = document.getElementById('preview-image')
    
    if (input.files && input.files[0]) {
        const arquivo = input.files[0]
        imagemSelecionada = arquivo
        imgPreview.src = URL.createObjectURL(arquivo)
    }
}

export function getImagemBase64() {
    return new Promise((resolve, reject) => {
        if (!imagemSelecionada) {
            resolve('https://via.placeholder.com/150')
            return
        }
        
        const reader = new FileReader()
        reader.onload = function(event) {
            resolve(event.target.result)
        }
        reader.onerror = function(error) {
            reject(error)
        }
        reader.readAsDataURL(imagemSelecionada)
    })
}

export function limparPreview() {
    const imgPreview = document.getElementById('preview-image')
    const inputFile = document.getElementById('preview-input')
    
    if (imgPreview) {
        imgPreview.src = './img/upload-icon.svg'
    }
    if (inputFile) {
        inputFile.value = ''
    }
    imagemSelecionada = null
}