window.addEventListener('load', getNotes);

function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function getNotes() {
    fetch('/getNotes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar notas');
            }
            return response.json();
        })
        .then(data => {
            const containerNotes = document.getElementById('container_notes');
            containerNotes.innerHTML = '';
            data.forEach(note => {
                const div = document.createElement('div');
                div.classList.add('container_note');
                div.addEventListener('click', () => {
                    deleteNote(note.id, div);
                });

                const info = document.createElement('div');
                info.classList.add('note-info');

                const modal = document.getElementById('container_modal_add');

                document.querySelectorAll('.container_note').forEach(note => {
                    note.addEventListener('mouseenter', () => {
                        if (modal.style.display !== 'none') {
                            return;
                        }
                        note.style.transform = 'scale(1.05)';
                        note.style.transition = 'transform 0.3s ease-in-out';
                    });

                    note.addEventListener('mouseleave', () => {
                        if (modal.style.display !== 'none') {
                            return;
                        }
                        note.style.transform = 'scale(1)';
                        note.style.transition = 'transform 0.3s ease-in-out';
                    });
                });

                const formattedTime = formatDateTime(note.time);

                info.innerHTML = `
                    <p><strong>Título:</strong><br> ${note.note_title}</p>
                    <p><strong>Observação:</strong><br> ${note.content}</p>
                    <p><strong>Horário:</strong><br> ${formattedTime}</p>
                `;

                div.appendChild(info);
                containerNotes.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
} 

