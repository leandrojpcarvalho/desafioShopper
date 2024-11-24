import { expect } from 'chai';
import Utils from '../../src/utils';
import CustomError from '../../src/entities/CustomError';
import { StatusCodes } from 'http-status-codes';

describe('testa utils', function () {
    it('testa se a função readSqlFile ao receber um caminho invalido retorna erro', async function () {
        try {
            const path = await Utils.readSqlFile(['invalid', 'path'])
            expect.fail('Deveria ter retornado um erro');
        } catch (error: any) {
            expect(error).to.be.instanceOf(CustomError);
            expect(error.error_description).to.be.contain('no such file or directory');
            expect(error.error_code).to.be.equal('INTERNAL_SERVER_ERROR');
            expect(error.status).to.be.equal(500);
        }
    })
    it('testa se a função readSqlFile ao receber um caminho valido retorna um array', async function () {
        const path = await Utils.readSqlFile(['..', 'db', './SQL', 'create-database.sql'])
        expect(path).to.be.an('array');
    });
    it('testa se a função readSqlFile ao receber um caminho valido retorna uma string', async function () {
        const path = await Utils.readSqlFile(['..', 'db', './SQL', 'create-database.sql'], false)
        expect(path).to.be.an('string');
    });
})