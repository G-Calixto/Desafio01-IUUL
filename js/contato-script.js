    const submitButton = document.querySelector('.submit button');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const name = document.querySelector('.name-input').value;
        const email = document.querySelector('.email-input').value;
        const subject = document.querySelector('.assunto-input').value;
        const message = document.querySelector('textarea[name="mensagem"]').value;

        if (!name || !email || !subject || !message) {
            alert("Por favor, preencha todos os campos do formulário!");
            return;
        }

        const formData = {
            name,
            email,
            subject,
            message,
            date: new Date().toLocaleString() 
        };

        let messages = JSON.parse(localStorage.getItem('messages')) || [];

        messages.push(formData);

        localStorage.setItem('messages', JSON.stringify(messages));

        document.querySelector('.form-mail').reset();

        alert("Mensagem enviada e salva com sucesso!");
    });
