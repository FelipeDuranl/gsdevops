// Obter o formulário de cadastro de doadores
const form = document.querySelector('#cadastro-doador');

// Adicionar um evento de envio do formulário
form.addEventListener('submit', (event) => {
    // Impedir o envio do formulário por padrão
    event.preventDefault();

    // Obter os dados do formulário
    const nome = form.elements['nome'].value;
    const email = form.elements['email'].value;
    const telefone = form.elements['telefone'].value;
    const endereco = form.elements['endereco'].value;
    const curso = form.elements['alimento'].value;

    // Criar um objeto com os dados do doador
    const dados = {
        nome,
        email,
        telefone,
        endereco,
        alimento
    };

    function exibirMensagemSucesso() {
        var mensagem = document.getElementById('mensagem');
        mensagem.innerHTML = 'Importação concluída com sucesso!';
        mensagem.style.color = 'green';
    }

    function limparCampos() {
        document.getElementById('nome').value = '';
        document.getElementById('email').value  = '';
        document.getElementById('telefone').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('alimento').value = '';
        // Limpar outros campos conforme necessário
    }

    // Fazer uma solicitação AJAX para o servidor Flask
    fetch('http://172.19.125.250/cadastro', {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors' // permitir requisições CORS
        })
        .then(response => response.json()) // obter a resposta como JSON
        .then(data => {
            limparCampos();
            exibirMensagemSucesso();
            // Exibir a resposta no console
            console.log(data);
        })
        .catch(error => {
            // Manipular erros de solicitação AJAX
            console.error(error);
        });
});

// Função para buscar as instituições cadastradas
function buscarInstituicoes() {
    // Fazer uma solicitação AJAX para obter as instituições cadastradas
    fetch('http://172.19.125.250/doadores')
        .then(response => response.json()) // obter a resposta como JSON
        .then(data => {
            const listaInst = document.querySelector('.lista-inst');
            
            // Limpar as divs existentes
            listaInst.innerHTML = '';

            // Iterar sobre os dados e criar uma div para cada instituição
            data.forEach(instituicao => {
                const divInst = document.createElement('div');
                divInst.classList.add('inst');
                divInst.innerHTML = `
                    <h2>${instituicao.doador_nome}</h2>
                    <p>Email: ${instituicao.doador_email}</p>
                    <p>Telefone: ${instituicao.doador_telefone}</p>
                    <p>Endereço: ${instituicao.doador_endereco}</p>
                    <p>Alimento: ${instituicao.doador_alimento}</p>
                `;
                listaInst.appendChild(divInst);
            });
        })
        .catch(error => {
            // Manipular erros de solicitação AJAX
            console.error(error);
        });
}

// Chamar a função para buscar as instituições quando a página for carregada
window.addEventListener('load', buscarInstituicoes);