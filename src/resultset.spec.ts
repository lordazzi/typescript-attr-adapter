/* tslint:disable:no-unused-variable */

declare var describe: any;
declare var beforeEach: any;
declare var it: any;
declare var expect: any;

import { ResultSetModel } from './index';

describe('02 - ResultSetModel', () => {

    class Pessoa extends ResultSetModel {
        public nome: string = null;
        public sobrenome: string = null;
        public nascimento: Date = new Date('1990-10-10');

        public constructor(resultSet: Object) {
            super();
            this.initialize(resultSet);
        }
    }

    let Ricardo: Pessoa;

    it('01 - Classe é capaz de ser instânciada a partir de um JSON', () => {
        Ricardo = new Pessoa({ nome: 'Ricardo', sobrenome: 'Azzi Silva' });
        expect(Ricardo).toBeTruthy();
    });

    it('02 - Objeto gerado respeita os atributos que lhe foram entregues pelo JSON', () => {
        expect(Ricardo.nome).toBe('Ricardo');
    });

    it('03 - Objeto é capaz de manter um valor padrão', () => {
        expect(Ricardo.sobrenome).toBe('Azzi Silva');
        expect(Ricardo.nascimento.getTime()).toBe(new Date('1990-10-10').getTime());
    });

    it('04 - Sobrescreve um valor padrão', () => {
        const Alguem: Pessoa = new Pessoa({ nome: 'Ricardo', sobrenome: 'Azzi Silva', nascimento: new Date('1991-09-22') });
        expect(Alguem.nascimento.getTime()).toBe(new Date('1991-09-22').getTime());
    });

    it('05 - Não converte objeto para JSON se houver um objeto na classe sem solução para virar JSON', () => {
        expect(() => {
            let t = Ricardo.toJson();
            console.info(t);
        }).toThrowError(Error);
    });

    it('06 - Não converte objeto para string se houver um objeto na classe sem solução para virar JSON', () => {
        expect(() => {
            String(Ricardo);
        }).toThrowError(Error);
    });
    
    it('07 - Criando uma instância passando algo diferente de JSON por argumento', () => {
        expect(() => {
            new Pessoa(<Object> Date);
        }).toThrowError(Error);
    });

    it('08 - Criando classe sem inicializar os atributos com null', () => {
        expect(() => {
            class Funcionario extends ResultSetModel {
                public nome: string;
                public sobrenome: string;

                public constructor(resultSet: Object) {
                    super();
                    this.initialize(resultSet);
                }
            }

            new Funcionario({});
        }).toThrowError(Error);
    });

    it('09 - Chamando o metodo de converção sem chamar o de inicialização', () => {
        expect(() => {
            class Animal extends ResultSetModel {
                public nome: string;
                public sobrenome: string;

                public constructor(resultSet: Object) {
                    super();
                    this.convert();
                }
            }

            new Animal({});

        }).toThrowError(Error);
    });
});
