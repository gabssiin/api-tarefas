const express = require('express');
const serverless = require('serverless-http');
const tarefasRoutes = require('./routes/tarefasRoutes');

const app = express();

app.use(express.json());

app.use('/tarefas', tarefasRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Tarefas funcionando' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
module.exports.handler = serverless(app);
