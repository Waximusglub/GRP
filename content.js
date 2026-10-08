async function mostrarTamanoRepo() {
    const partes = window.location.pathname.split("/").filter(Boolean);

    if (partes.length < 2) {
        return;
    }

    const usuario = partes[0];
    const repositorio = partes[1];

    try {
        const respuesta = await fetch(
            `https://api.github.com/repos/${usuario}/${repositorio}`
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el repositorio");
        }

        const repo = await respuesta.json();

        const tamanoMB = repo.size / 1024;

        const elemento = document.createElement("div");

        elemento.id = "github-repo-size";

        elemento.innerHTML =` 
            <p>Repo Size: <span>${tamanoMB.toFixed(2)} MB</span></p>
        `;

        document.body.appendChild(elemento);

    } catch (error) {
        console.error("GitHub Repo Size:", error);
    }
}

mostrarTamanoRepo();