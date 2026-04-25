const URL = 'https://bakcend-fecaf-render.onrender.com/contatos'

export async function getContatos(){
    const response = await fetch (URL)
    if (!response.ok) throw new Error("Erro ao buscar contatos")
    return response.json()
}

export async function postContato(contato){
    const options = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(contato)
    }

        const response = await fetch(URL, options)
        if (!response.ok) throw new Error("Erro ao criar um contato")
            
        return response.json() 
}

export async function putContato(id, contato) {
    const options = {
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch (`${URL}/${id}`, options)

    if (!response.ok) throw new Error("Erro ao atualizar o contato!")
}

export async function deleteContato(id){
    const options ={
        method: "DELETE"
    }
    const response = await fetch (`${URL}/${id}`, options)

    if (!response.ok) throw new Error("Erro ao deletar o contato!")

    return true
}

const novoContato = {
  "nome": "Aqui é o Patrick",
  "celular": "1",
  "foto": "https://i.ytimg.com/vi/7GYegWy_Prk/maxresdefault.jpg",
  "email": "SiriCascudo@email.com",
  "endereco": "Rua do Siri Cascudo,  Nº 1",
  "cidade": "Fenda do Bikini"
}

// postContato(novoContato)

// putContato(26, novoContato)

deleteContato(111)
    
// for (let i = 1; i <= 150; i++) {
//     deleteContato(i);
// }