document.addEventListener('DOMContentLoaded', function () {
    const messagesContainer = document.getElementById('messages-container');
    const clearAllButton = document.getElementById('clear-all');
    const searchInput = document.getElementById('search-input');
    const filterType = document.getElementById('filter-type');

    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    function displayMessages(filter = '', type = 'all') {
        messagesContainer.innerHTML = '';

        const filteredMessages = messages.filter(message => {
            const searchString = filter.toLowerCase();
            if (type === 'name') return message.name.toLowerCase().includes(searchString);
            if (type === 'email') return message.email.toLowerCase().includes(searchString);
            if (type === 'subject') return message.subject.toLowerCase().includes(searchString);
            if (type === 'date') return message.date.toLowerCase().includes(searchString);

            return (
                message.name.toLowerCase().includes(searchString) ||
                message.email.toLowerCase().includes(searchString) ||
                message.subject.toLowerCase().includes(searchString) ||
                message.date.toLowerCase().includes(searchString)
            );
        });

        if (filteredMessages.length === 0) {
            messagesContainer.innerHTML = '<p><strong class="without-email">Nenhuma mensagem correspondente encontrada.</strong></p>';
            return;
        }

        filteredMessages.forEach((message, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message-item');

            messageDiv.innerHTML = `
                <p><strong class="label">Nome</strong> <span class="message-name">${message.name}</span></p>
                <p><strong class="label">Email</strong> <span class="message-email">${message.email}</span></p>
                <p><strong class="label">Assunto</strong> <span class="message-subject">${message.subject}</span></p>
                <p><strong class="message-label">Mensagem</strong></p>
                <p class="message-content">${message.message}</p>
                <p><small class="message-date">${message.date}</small></p>
                <button class="delete-message" data-index="${index}">Remover</button>
            `;
        
            messagesContainer.appendChild(messageDiv);
        });
    }

    displayMessages();

    messagesContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-message')) {
            const index = event.target.getAttribute('data-index');
            messages.splice(index, 1);
            localStorage.setItem('messages', JSON.stringify(messages));
            displayMessages(searchInput.value, filterType.value);
        }
    });

    clearAllButton.addEventListener('click', function () {
        if (confirm("Deseja remover todas as mensagens?")) {
            messages = [];
            localStorage.removeItem('messages');
            displayMessages();
        }
    });

    searchInput.addEventListener('input', function () {
        displayMessages(searchInput.value, filterType.value);
    });

    filterType.addEventListener('change', function () {
        displayMessages(searchInput.value, filterType.value);
    });
});
