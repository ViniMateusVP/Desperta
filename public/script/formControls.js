const button = document.getElementById('button-plus');
const modal = document.getElementById('container_modal_add');

function toggleForm() {
  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.display = 'block';
    document.addEventListener('click', outsideClickListener);
  } else {
    modal.style.display = 'none';
    document.removeEventListener('click', outsideClickListener);
  }
}

function outsideClickListener(event) {
  if (!modal.contains(event.target) && !button.contains(event.target)) {
    modal.style.display = 'none';
    document.removeEventListener('click', outsideClickListener);
  }
}
