const { Tarefa, validaTarefa, tarefas } = require('../models/Tarefa');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
  
function criarTarefa(req, res) {
  const { descricao, concluida } = req.body;

  const { valid, message } = validaTarefa({ descricao, concluida }, { requireDescricao: true });
  if (!valid) {
    return res.status(400).json({ error: message });
  }

  const novaTarefa = new Tarefa({
    objectId: uuidv4(),
    descricao: descricao.trim(),
    concluida: typeof concluida === 'boolean' ? concluida : false,
    criadoEm: new Date().toISOString()
  });

  tarefas.push(novaTarefa);
  return res.status(201).json(novaTarefa);
}

function listarTarefas(req, res) {
  return res.json(tarefas);
}

function obterTarefa(req, res) {
  const { objectId } = req.params;
  if (!uuidValidate(objectId)) {
    return res.status(400).json({ error: 'objectId inválido' });
  }
  const tarefa = tarefas.find(t => t.objectId === objectId);
  if (!tarefa) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  return res.json(tarefa);
}

function atualizarTarefa(req, res) {
  const { objectId } = req.params;
  if (!uuidValidate(objectId)) {
    return res.status(400).json({ error: 'objectId inválido' });
  }

  const idx = tarefas.findIndex(t => t.objectId === objectId);
  if (idx === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  const { descricao, concluida } = req.body;

  const { valid, message } = validaTarefa({ descricao, concluida }, { requireDescricao: false });
  if (!valid) {
    return res.status(400).json({ error: message });
  }

  if (descricao !== undefined) tarefas[idx].descricao = descricao.trim();
  if (concluida !== undefined) tarefas[idx].concluida = Boolean(concluida);
  tarefas[idx].atualizadoEm = new Date().toISOString();

  return res.json(tarefas[idx]);
}

function deletarTarefa(req, res) {
  const { objectId } = req.params;
  if (!uuidValidate(objectId)) {
    return res.status(400).json({ error: 'objectId inválido' });
  }

  const idx = tarefas.findIndex(t => t.objectId === objectId);
  if (idx === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tarefas.splice(idx, 1);
  return res.status(204).send();
}

module.exports = {
  criarTarefa,
  listarTarefas,
  obterTarefa,
  atualizarTarefa,
  deletarTarefa
};
