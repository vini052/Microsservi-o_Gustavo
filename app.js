document.addEventListener('DOMContentLoaded', () => {
    const listaForm = document.getElementById('listaForm');
    const listasContainer = document.getElementById('listasContainer');

    listaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const lista = {
            nome: document.getElementById('nomeLista').value
        };

        await fetch('https://microsservi-ovini-production.up.railway.app/api/listas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lista)
        });

        loadListas();
        listaForm.reset();
    });

    async function loadListas() {
        const response = await fetch('https://microsservi-ovini-production.up.railway.app/api/listas');
        const listas = await response.json();

        listasContainer.innerHTML = '';
        for (const lista of listas) {
            const tarefasResponse = await fetch(`https://microsservi-ovini-production.up.railway.app/api/tarefas/lista/${lista.id}`);
            const tarefas = await tarefasResponse.json();
            const numTarefas = tarefas.length;

            const listaDiv = document.createElement('div');
            listaDiv.classList.add('card');
            listaDiv.innerHTML = `
                <h3>${lista.nome}</h3>
                <p>${numTarefas} tarefa(s)</p>
                <button onclick="viewLista('${lista.id}')">Visualizar</button>
                <button onclick="deleteLista('${lista.id}')">Deletar</button>
            `;
            listasContainer.appendChild(listaDiv);
        }
    }

    window.viewLista = (id) => {
        window.location.href = `/lista.html?id=${id}`;
    };

    window.deleteLista = async (id) => {
        await fetch(`https://microsservi-ovini-production.up.railway.app/api/listas/${id}`, {
            method: 'DELETE'
        });
        loadListas();
    };

    loadListas();
});
