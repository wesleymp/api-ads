const stateModel = require('../../src/models/stateModel');
const userService = require('../../src/services/userService');

describe('Verificar o retorno dos estados', () => {
  beforeAll(async () => {
    await stateModel.insertMany([{ name: 'SP' }]);
  });

  afterAll(async () => {
    await stateModel.remove({});
  });

  it('Retorna uma lista com 1 ou mais resultado', async () => {
    const resultExpect = await userService.getState();

    expect(resultExpect.length).toBeGreaterThan(0);
  });

  it('Retorna uma lista com os campos (_id e name)', async () => {
    const resultExpect = await userService.getState();

    for (let i in resultExpect) {
      expect(resultExpect[i]).toHaveProperty('_id');
      expect(resultExpect[i]).toHaveProperty('name');
    }
  });

  it('Verificar se não houver nenhum registro na collection states o retorno é "Nenhum estado registrado."', async () => {
    await stateModel.remove({});

    try {
      await userService.getState();
    } catch (error) {
      expect(error.message).toBe('Nenhum estado registrado.');
    }
  });
});
