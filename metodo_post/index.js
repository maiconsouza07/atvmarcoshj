const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const formulario = `
        <form method="post">
            <label>Nome:</label>
            <input type="text" name="nome" required/><br>
            <label>Telefone:</label>
            <input type="text" name="telefone" required/><br>
            <button type="submit">Enviar</button>
        </form>
    `;
    res.send(formulario);
});

app.post('/', (req, res) => {
    const { nome, telefone } = req.body;


    if (!nome || !telefone) {
        res.send("Campo obrigatório");
        return;
    }

    const data = `Nome: ${nome}, Telefone: ${telefone}\n`;

    const filePath = path.join(__dirname, 'dados.txt');


    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            res.send('Erro ao salvar os dados');
            return;
        }
        res.send(`Dados recebidos com sucesso:<br> Nome: ${nome}<br> Telefone: ${telefone}`);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
