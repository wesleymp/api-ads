const request = require('supertest');

const app = require('../../src/app');
const stateModel = require('../../src/models/stateModel');

describe('Verifica a rota /state', () => {
  beforeAll(async () => {
    await stateModel.insertMany([{ name: 'SP' }, { name: 'RJ' }, { name: 'MG' }]);
  });

  afterAll(async () => {
    await stateModel.remove({});
  });

  it('Retorna uma lista com 1 ou mais resultado', (done) => {
    request(app)
      .get('/states')
      .then((response) => {
        expect(response.body.error).toBeUndefined();
        expect(response.body.data.length).toBeGreaterThan(0);

        for(let i in response.body.data) {
          expect(response.body.data[i]).toHaveProperty('_id');
          expect(response.body.data[i]).toHaveProperty('name');
        }

        return done();
      });
  });

  it('Verificar se não houver nenhum registro o retorno deve ser "{ err: "Nenhum estado registrado." }', (done) => {
    (async () => {
      await stateModel.remove({});
    })();

    request(app)
      .get('/states')
      .then((response) => {
        expect(response.body).toEqual({ err: 'Nenhum estado registrado.' });

        return done();
      });
  });
});
