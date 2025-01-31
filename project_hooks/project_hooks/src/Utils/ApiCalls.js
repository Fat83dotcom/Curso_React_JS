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
            return {msg: data.msg, response: response.status}

        } else {
            console.error("Erro ao criar o item:", {response: response.status});
            return  {msg: `Erro ao criar o item: ${response.statusText}`}
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
            console.log("Sucesso:", data)


            return {data: data, msg: 'Sucesso.'}

        } else {
            console.error("Erro", response);
            console.log(response.status);
            return {msg: `${response.statusText}`}
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        return {msg: `${error}`}
    }
}
