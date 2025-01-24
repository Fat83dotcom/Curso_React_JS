export const handleSubmitData = async (url, method, formData, handleClearForm) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        if (response.ok) {
            const data = await response.json();
            console.log("Item criado com sucesso:", data);
            handleClearForm()
            return `Item criado com sucesso!!`

        } else {
            console.error("Erro ao criar o item:", response.statusText);
            return `Erro ao criar o item: ${response.statusText}`
        }
    } catch (error) {
        console.error("Erro na requisição:", error)
        return `Erro na requisição: ${error}`
    }
}
