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

        const response = await fetch(
            `https://api.github.com/repos/rds-mimosa/upload/contents/provas/${trimestre}/${materia}/${arquivo.name}`
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `Adicionando prova: ${arquivo.name}`,
                    content: base64,
                }),
            }
        );

        if (response.ok) {
            alert("Arquivo enviado com sucesso!");
        } else {
            alert("Erro ao enviar arquivo.");
        }
    };

    reader.readAsDataURL(arquivo);
});
