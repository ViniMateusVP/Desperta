function deleteNote(id, noteElement) {
    fetch(`/delNote/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao deletar nota');
        }
        noteElement.style.transition = 'opacity 0.5s ease';
        noteElement.style.opacity = '0'; 
        setTimeout(() => {
            noteElement.remove();
            
            getNotes();
        }, 500); 
    })
    .catch(error => {
        console.error('Ocorreu um erro ao deletar a nota:', error);
    });
} 