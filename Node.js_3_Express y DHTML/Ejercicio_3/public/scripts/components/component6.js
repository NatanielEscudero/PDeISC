document.addEventListener('DOMContentLoaded', () => {
    const parentElements = document.querySelectorAll('.parent, .children-container');
    const counterDisplay = document.getElementById('counterDisplay');
    
    parentElements.forEach(element => {
        element.addEventListener('click', function(event) {
            event.stopPropagation();
            
            const childElements = Array.from(this.children).filter(child => 
                child.nodeType === Node.ELEMENT_NODE
            );
            
            const childCount = childElements.length;
            
            counterDisplay.textContent = 
                `Elemento "${this.id || this.textContent.trim()}" tiene ${childCount} hijo(s) directo(s)`;
            
            this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.5)';
            setTimeout(() => {
                this.style.boxShadow = 'none';
            }, 500);
        });
    });
    
    const childElements = document.querySelectorAll('.child');
    childElements.forEach(child => {
        child.addEventListener('click', function(event) {
            event.stopPropagation();
            counterDisplay.textContent = 
                `Elemento "${this.textContent.trim()}" no tiene hijos (es un nodo hoja)`;
            
            this.style.boxShadow = '0 0 0 3px rgba(241, 196, 15, 0.5)';
            setTimeout(() => {
                this.style.boxShadow = 'none';
            }, 500);
        });
    });
});