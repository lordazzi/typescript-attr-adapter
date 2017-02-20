
import { InnerDecoratorType, Class } from './common';

/**
 * 
 */
export enum JSONPrimitiveTypes {
    BOOLEAN, NUMBER, STRING
}

/**
 * 
 */
export function AttributeAdapter(adapterArguments: JSONPrimitiveTypes|AttributeAdapterArguments|Class): InnerDecoratorType {
    return function(target: Class, propertyKey: string, descriptor: PropertyDescriptor){

    }
}

/**
 * 
 */
export interface AttributeAdapterArguments {
    toType: Class|JSONPrimitiveTypes
}