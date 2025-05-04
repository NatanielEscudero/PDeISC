document.addEventListener('DOMContentLoaded', () => {
    const workspace = document.getElementById('workspace');
    const generatedCode = document.getElementById('generatedCode');
    const clearAllBtn = document.getElementById('clearAll');
    const addButtons = document.querySelectorAll('.add-btn');
    
    const elementTemplates = {
        p: '<p>Este es un nuevo párrafo generado dinámicamente. Puedes editar este texto directamente.</p>',
        h2: '<h2>Nuevo Encabezado</h2>',
        img: '<img src="https://preview.redd.it/tito-calder%C3%B3n-v0-jrolyz4jm22e1.jpeg?auto=webp&s=98e5d5ed70bfd8371f9ab0f015efc30fceaf377b" alt="Imagen de ejemplo">',
        ul: `<ul>
                <li>Elemento de lista 1</li>
                <li>Elemento de lista 2</li>
                <li>Elemento de lista 3</li>
            </ul>`,
        table: `<table>
                <thead>
                    <tr>
                        <th>Encabezado 1</th>
                        <th>Encabezado 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dato 1</td>
                        <td>Dato 2</td>
                    </tr>
                    <tr>
                        <td>Dato 3</td>
                        <td>Dato 4</td>
                    </tr>
                </tbody>
            </table>`,
        form: `<form>
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name">
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email">
                
                <label for="message">Mensaje:</label>
                <input type="text" id="message" name="message">
            </form>`,
        video: `<video controls>
                <source src="/videos/ejemplo.mp4" type="video/mp4">
                Tu navegador no soporta el elemento de video.
            </video>`,
        section: `<section>
                <h3>Nueva Sección</h3>
                <p>Contenido de la sección. Puedes agregar cualquier elemento aquí dentro.</p>
            </section>`
    };
    
    function updateGeneratedCode() {
        generatedCode.textContent = workspace.innerHTML
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
    
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const elementType = button.dataset.type;
            const elementName = button.dataset.name;
            
            workspace.innerHTML += elementTemplates[elementType];
            
            console.log(`Elemento ${elementName} agregado`);
            
            updateGeneratedCode();
            
            workspace.lastElementChild.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    clearAllBtn.addEventListener('click', () => {
        workspace.innerHTML = '';
        updateGeneratedCode();
        console.log('Workspace limpiado');
    });
    
    workspace.addEventListener('dblclick', (e) => {
        if (e.target.tagName === 'P' || e.target.tagName === 'H2' || e.target.tagName === 'LI' || e.target.tagName === 'TD') {
            const originalText = e.target.textContent;
            e.target.innerHTML = `<input type="text" value="${originalText}" class="edit-input">`;
            
            const input = e.target.querySelector('.edit-input');
            input.focus();
            
            input.addEventListener('blur', () => {
                e.target.textContent = input.value;
                updateGeneratedCode();
            });
            
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    e.target.textContent = input.value;
                    updateGeneratedCode();
                }
            });
        }
    });
    
    updateGeneratedCode();
});