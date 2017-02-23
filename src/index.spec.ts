/* tslint:disable:no-unused-variable */

declare var describe: any;
declare var beforeEach: any;
declare var it: any;
declare var expect: any;

import { AttributeAdapter, ResultSetModel, AttributeConverter } from './index';

describe('AttributeAdapter', () => {
    class StringToDateConverter implements AttributeConverter<string, Date> {
    
        toApplication(castMe: string): Date {
            if (castMe == null)
                return null;

            return new Date(castMe);
        }

        toServer(castMe: Date): string  {
            if (castMe == null)
                return null;
            
            let d: number|string   = castMe.getDate();
            let m: number|string   = castMe.getMonth() + 1;
            const Y: number|string = castMe.getFullYear();

            d = d <= 9? `0${d}` : d;
            m = m <= 9? `0${m}` : m;

            return `${Y}-${m}-${d}`;
        }
    }

    class Person extends ResultSetModel {
        public name: string;
        public surname: string;

        @AttributeAdapter( StringToDateConverter )
        public birthday: Date;
    }

    it('Testando conversão de string para data', () => {
        let dataThatsComesFromAnyWhere: Object = JSON.parse('{"name":"Ricardo","surname":"Azzi Silva","birthday":"1991-09-22"}');
        let Ricardo: Person = new Person(dataThatsComesFromAnyWhere);
        
        expect(Ricardo.birthday.getTime()).toEquals(new Date("1991-09-22").getTime());
    });

    it('Testando conversão de string para data com entrada de dado nulo', () => {
        let anotherDataFromHell: Object = JSON.parse('{"name":"Fred","surname":"just Fred","birthday":null}');
        let Fred: Person = new Person(anotherDataFromHell);

        expect(Fred.birthday).toBeNull();
    });
});





