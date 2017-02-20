import { InnerDecoratorType, Class } from './common';

/**
 * A Converter must implement the attrAdapter.AttributeConverter interface, where applicationDataType is the
 * class of the model inside your application and serverDataType is the type of the attribute of a result set
 * given from a request, localStorage, sessionStorage or a string parsed into a JSON from anywhere. 
 */
export interface AttributeConverter<serverDataType, applicationDataType> {

    toApplication(castMe: serverDataType): applicationDataType;

    toServer(castMe: applicationDataType): serverDataType;

}

/**
 * 
 */
export function Converter(converterArguments: ConverterDecoratorArguments = { autoApply: false }): InnerDecoratorType {
    return function(target: Class, propertyKey: string, descriptor: PropertyDescriptor){

    }
}

/**
 * 
 */
export interface ConverterDecoratorArguments {
    autoApply: boolean;
}

/**
 * 
 */
class ConverterService {
    private static instance: ConverterService = null;

    private constructor() {

    }

    public static getInstance(): ConverterService {
        if (this.instance === null) {
            this.instance = new ConverterService();
        }
        
        return this.instance;
    }
}

export const converterService: ConverterService = ConverterService.getInstance();