export const handleSubmitPost = async (url, formData, handleClearForm) => {
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
            console.log("Item criado com sucesso:", data);
            handleClearForm()
            return 'Item criado com sucesso!!'

        } else {
            console.error("Erro ao criar o item:", response);
            return `Erro ao criar o item: ${response.statusText}`
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        return `Erro na requisição: ${error}`
    }
}

export const handleSubmitGet = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
        })

        if (response.ok) {
            const data = await response.json();
            console.log("Sucesso:", data)
            return {data: data, msg: 'Sucesso.'}

        } else {
            console.error("Erro", response);
            return {msg: `${response.statusText}`}
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        return {msg: `${error}`}
    }
}
