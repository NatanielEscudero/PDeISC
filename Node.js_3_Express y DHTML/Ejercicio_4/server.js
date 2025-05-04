const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Modificador de Enlaces',
        initialLinks: [
            { id: 1, text: 'Google', href: 'https://www.google.com' },
            { id: 2, text: 'GitHub', href: 'https://www.github.com' },
            { id: 3, text: 'StackOverflow', href: 'https://stackoverflow.com' },
            { id: 4, text: 'MDN Web Docs', href: 'https://developer.mozilla.org' },
            { id: 5, text: 'ExpressJS', href: 'https://expressjs.com' }
        ]
    });
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});