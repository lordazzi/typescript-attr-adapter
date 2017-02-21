import { AttributeAdapter, ResultSetModel, AttributeConverter, Converter, JSONPrimitiveTypes } from '../../src';

Converter(JSONPrimitiveTypes.STRING, Date)
class StringToDateConverter implements AttributeConverter<string, Date> {
    
    toApplication(castMe: string): Date {
        return null;
    }

    toServer(castMe: Date): string  {
        return null;
    }
}

class Person extends ResultSetModel {
    public name: string;
    public surname: string;

    @AttributeAdapter( Date )
    public birthday: Date;
}

let dataThatsComesFromAnyWhere: Object = JSON.parse('{"name":"Ricardo","surname":"Azzi Silva","birthday":"1991-09-22"}');
let Ricardo: Person = new Person(dataThatsComesFromAnyWhere);
console.info(`I'm ${Ricardo.name} ${Ricardo.surname} and this is the Date object of my birthday: `, Ricardo.birthday);


let anotherDataFromHell: Object = JSON.parse('{"name":"Fred","surname":"just Fred","birthday":null}');
let Fred: Person = new Person(anotherDataFromHell);
console.info(`I'm ${Fred.name}, ${Fred.surname} and this is null: `, Fred.birthday);
