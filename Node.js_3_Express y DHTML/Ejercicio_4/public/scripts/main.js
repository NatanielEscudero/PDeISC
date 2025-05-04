document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('linksContainer');
    const createLinkBtn = document.getElementById('createLink');
    const modifyLinksBtn = document.getElementById('modifyLinks');
    const resetLinksBtn = document.getElementById('resetLinks');
    const logContent = document.getElementById('logContent');
    
    let linkCounter = 5;
    
    function addLogEntry(message) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
    }
    
    createLinkBtn.addEventListener('click', () => {
        linkCounter++;
        const newLink = document.createElement('a');
        newLink.href = 'https://www.default-link.com';
        newLink.textContent = `Nuevo Enlace ${linkCounter}`;
        newLink.className = 'link-item';
        newLink.id = `link${linkCounter}`;
        newLink.setAttribute('data-original-href', 'https://www.default-link.com');
        
        linksContainer.appendChild(newLink);
        addLogEntry(`Creado nuevo enlace: ID link${linkCounter} con href https://www.default-link.com`);
    });
    
    modifyLinksBtn.addEventListener('click', () => {
        const links = document.querySelectorAll('.link-item');
        const destinations = [
            'https://www.youtube.com',
            'https://www.twitter.com',
            'https://www.linkedin.com',
            'https://www.instagram.com',
            'https://www.reddit.com',
            'https://www.wikipedia.org',
            'https://www.amazon.com',
            'https://www.microsoft.com'
        ];
        
        links.forEach((link, index) => {
            const originalHref = link.getAttribute('data-original-href');
            const currentHref = link.href;
            
            let newHref;
            do {
                newHref = destinations[Math.floor(Math.random() * destinations.length)];
            } while (newHref === currentHref);
            
            link.href = newHref;
            addLogEntry(`Modificado enlace ${link.id}: ${originalHref} -> ${newHref}`);
        });
    });
    
    resetLinksBtn.addEventListener('click', () => {
        const links = document.querySelectorAll('.link-item');
        
        links.forEach(link => {
            const originalHref = link.getAttribute('data-original-href');
            if (link.href !== originalHref) {
                addLogEntry(`Restablecido enlace ${link.id}: ${link.href} -> ${originalHref}`);
                link.href = originalHref;
            }
        });
    });
    
    linksContainer.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'A') {
            const link = e.target;
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `Destino actual: ${link.href}`;
            
            const rect = link.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.top - 30}px`;
            tooltip.style.backgroundColor = '#2c3e50';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.zIndex = '1000';
            
            document.body.appendChild(tooltip);
            
            link.addEventListener('mouseout', () => {
                tooltip.remove();
            }, { once: true });
        }
    });
});