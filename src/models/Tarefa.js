
class Tarefa {
  constructor({ objectId, descricao, concluida = false, criadoEm = null, atualizadoEm = null }) {
    this.objectId = objectId;        
    this.descricao = descricao;   
    this.concluida = concluida;      
    this.criadoEm = criadoEm;        
    this.atualizadoEm = atualizadoEm;
  }
}


const tarefas = [];


function validaTarefa(payload = {}, options = { requireDescricao: true }) {
  const { descricao, concluida } = payload;

  if (options.requireDescricao) {
    if (descricao === undefined || descricao === null) {
      return { valid: false, message: 'O campo "descricao" é obrigatório.' };
    }
  }

  if (descricao !== undefined && typeof descricao !== 'string') {
    return { valid: false, message: 'O campo "descricao" deve ser uma string.' };
  }

  if (concluida !== undefined && typeof concluida !== 'boolean') {
    return { valid: false, message: 'O campo "concluida" deve ser booleano.' };
  }

  return { valid: true };
}

module.exports = { Tarefa, validaTarefa, tarefas };
