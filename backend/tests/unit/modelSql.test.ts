import { expect } from 'chai';
import sinon from 'sinon';

import ModelSql from '../../src/db/model';
import { affectedRows, mockById, mockModelSql } from '../mocks';
import mySqlConnection from '../../src/db/config';
import ICustomer from '../../src/interface/users.interface';
import Utils from '../../src/utils';


const model = new ModelSql<ICustomer>();
beforeEach(() => {
    sinon.restore();
})

describe('testa a modelSql', () => {
    it('testa se a model retorna todos os valores da base de dados com o findAll', async function () {
        sinon.stub(mySqlConnection, 'query').resolves([mockModelSql, []]);

        expect(await model.findAll('customers')).to.be.deep.equal(mockModelSql);
    });

    it('testa se a model retorna um valor da base de dados com o findById', async function () {
        sinon.stub(mySqlConnection, 'query').resolves([mockById, []]);
        const response = await model.findById(1, 'customers');
        const result: ICustomer | null = mockById[0] ? mockById[0] as ICustomer : null;
        expect(response).to.be.deep.equal(result);
    });

    it('testa se a model retorna um valor da base de dados com o findById com id invalido', async function () {
        sinon.stub(mySqlConnection, 'query').resolves([[], []]);
        const response = await model.findById(1, 'customers');
        expect(response).to.be.deep.equal(null);
    });
    it('testa se a model atualiza um valor da base de dados com o update', async function () {
        sinon.stub(mySqlConnection, 'query').resolves([mockById, []]);
        const response = await model.update(1, { id: 2 }, 'customers');
        expect(response).to.be.deep.equal(null);
    });
    it('testa se ao passar dados corretos a model cria um usuario', async function () {
        sinon.stub(mySqlConnection, 'query').resolves([mockById, []]);
        const response = await model.create({ id: 1 }, 'customers');
        expect(response).to.be.deep.equal(mockById[0]);
    });
    it('testa se ao passar dados corretos a model deleta um usuario', async function () {
        sinon.stub(mySqlConnection, 'query').resolves([affectedRows, []]);
        const response = await model.delete(1, 'customers');
        expect(response).to.be.deep.equal(true);
    });
    it('testa se ao passar dados corretos a model executa uma query customizada', async function () {
        sinon.stub(Utils, 'readSqlFile').resolves('SELECT * FROM customers');
        sinon.stub(mySqlConnection, 'query').resolves([mockModelSql, []]);
        const response = await model.customQuery<ICustomer>([]);
        expect(response).to.be.deep.equal(mockModelSql);
    })
});