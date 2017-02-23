/* tslint:disable:no-unused-variable */

declare var describe: any;
declare var beforeEach: any;
declare var it: any;
declare var expect: any;

import { ResultSetModel } from './index';

describe('ResultSetModel', () => {

    class Pessoa extends ResultSetModel {
        public nome: string;
        public sobrenome: string = null;
        public nascimento: Date = new Date('1990-10-10');
    }

    let Ricardo: Pessoa;

    console.info(String(Pessoa));

    it('Classe é capaz de ser instânciada a partir de um JSON', () => {
        Ricardo = new Pessoa({ nome: 'Ricardo', sobrenome: 'Azzi Silva' });
        
        expect(Ricardo).toBeTruthy();
    });

    it('Objeto gerado respeita os atributos que lhe foram entregues pelo JSON', () => {
        expect(Ricardo.nome).toBe('Ricardo');
    });

    it('Se o objeto tiver por padrão um atributo preenchido com valor null, um dado entregue a ele sobrescreverá o null', () => {
        expect(Ricardo.nome).toBe('Azzi Silva');
    });

    it('Objeto é capaz de manter um valor padrão em um atributo quando não lhe for dado um valor para este', () => {
        expect(Ricardo.nascimento.getTime()).toBe(new Date('1990-10-10').getTime());
    });

    it('Instancia sobrescreve um valor padrão quando o JSON recebido na instância estiver preenchido no mesmo atributo', () => {
        const Alguem: Pessoa = new Pessoa({ nome: 'Ricardo', sobrenome: 'Azzi Silva', nascimento: new Date('1991-09-22') });
        expect(Alguem.nascimento.getTime()).toBe(new Date('1991-09-22').getTime());
    });
});
