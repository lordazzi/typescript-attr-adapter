import { InnerDecoratorType, Class } from './common';

/**
 * 
 */
export function ResultSet(): InnerDecoratorType {

    return function(target: Class, propertyKey: string, descriptor: PropertyDescriptor){

    }
}

/**
 * 
 */
class ResultSetService {
    private static instance: ResultSetService = null;

    private constructor() {

    }

    public converter(resultSer: Class) {

    }

    public static getInstance(): ResultSetService {
        if (this.instance === null) {
            this.instance = new ResultSetService();
        }
        
        return this.instance;
    }
}

export const resultSetService: ResultSetService = ResultSetService.getInstance();