export const handleSubmitPost = async (url, formData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data, response.status);
            return {data, response: response.status}

        } else {
            const data = await response.json();
            console.error("Erro ao criar o item:", {response: response.status});
            return  {data, response: response.status}
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        return  {msg: `Erro na requisição: ${error}`}
    }
}

export const handleSubmitGet = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return {data, response: response.status}
        } else {
            const data = await response.json();
            console.error("Erro", response);
            return {data, response: response.status}
        }
    } catch (error) {
        console.error( `Verifique sua conexão com a internet.${error}`)
    }
}

export const handleSubmitDelete = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        })
        console.log(await response.text());

        if (response.ok) {
            const data = await response.json();
            console.log(data, response.status);
            return {data, response: response.status}

        } else {
            const data = await response.json();
            console.error("Erro ao deletar o item:", {response: response.status});
            return  {data, response: response.status}
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        return  {msg: `Erro na requisição: ${error}`}
    }
}
