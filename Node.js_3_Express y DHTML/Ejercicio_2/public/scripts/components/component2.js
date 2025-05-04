document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    
    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskInput.value}</span>
                <button class="delete-btn">Eliminar</button>
            `;
            taskList.appendChild(li);
            taskInput.value = '';
            
            li.querySelector('.delete-btn').addEventListener('click', () => {
                li.remove();
            });
        }
    });
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});