function addH1() {
    const content = document.getElementById('content');
    if (!document.getElementById('dynamicH1')) {
        const h1 = document.createElement('h1');
        h1.id = 'dynamicH1';
        h1.textContent = 'Hola DOM';
        content.appendChild(h1);
    }
}

function changeH1Text() {
    const h1 = document.getElementById('dynamicH1');
    if (h1) {
        h1.textContent = 'Chau DOM';
    }
}

function changeH1Color() {
    const h1 = document.getElementById('dynamicH1');
    if (h1) {
        h1.style.color = 'blue';
    }
}

function addImage() {
    const content = document.getElementById('content');
    if (!document.getElementById('dynamicImage')) {
        const img = document.createElement('img');
        img.id = 'dynamicImage';
        img.src = 'https://media.0221.com.ar/adjuntos/357/migration/0221/032019/1553553111207.jpg';
        img.alt = 'Placeholder Image';
        content.appendChild(img);
    }
}

function changeImage() {
    const img = document.getElementById('dynamicImage');
    if (img) {
        img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZCtMqanbTZoU8DWUiXwf5nHEQO-D8kpyaaw&s';
    }
}

function resizeImage() {
    const img = document.getElementById('dynamicImage');
    if (img) {
        img.style.width = '400px';
    }
}