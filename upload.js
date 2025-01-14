document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const trimestre = document.getElementById("trimestre").value;
    const materia = document.getElementById("materia").value.toLowerCase();
    const arquivo = document.getElementById("arquivo").files[0];

    if (!arquivo) {
        alert("Selecione um arquivo!");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
        const base64 = reader.result.split(",")[1];

        // Log da URL para verificação
        const apiUrl = `https://api.github.com/repos/rds-mimosa/upload/contents/provas/${trimestre}/${materia}/${arquivo.name}`;
        console.log("URL para o GitHub:", apiUrl);  // Verificando a URL gerada

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: "Bearer SEU_TOKEN_GITHUB",  // Substitua pelo seu token
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: `Adicionando prova: ${arquivo.name}`,
                content: base64,
            }),
        });

        if (response.ok) {
            alert("Arquivo enviado com sucesso!");
        } else {
            alert("Erro ao enviar arquivo.");
            const errorData = await response.json();
            console.error("Detalhes do erro:", errorData);  // Exibir detalhes do erro
        }
    };

    reader.readAsDataURL(arquivo);
});
