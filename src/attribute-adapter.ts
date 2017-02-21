
import { JSONPrimitiveTypes } from './common';
import { AttributeConverter, ConverterService } from './converter';

interface MetaDatableClass {
    __metadata__: AttributeMetaData;
}

interface AttributeMetaData {
    propertyKey: string;
    
    attributeConverterInstance: AttributeConverter<any, any>;
}

/**
 * 
 */
export function AttributeAdapter( attributeConverterClass: any ): any {

    const checkingClass: AttributeConverter<any, any> = <AttributeConverter<any, any>> attributeConverterClass.prototype;
    const hasToApplicationMethod: boolean = Object(checkingClass.toApplication) instanceof Function;
    const hasToServerMethod: boolean = Object(checkingClass.toServer) instanceof Function;

    if (!hasToApplicationMethod || !hasToServerMethod) {
        throw new Error('[AttributeAdapter decorator] invalid argument. You must pass an implementation of AttributeConverter.');
    }

    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void {
        let targetAsMetadata: MetaDatableClass  = <MetaDatableClass> target;
        const attributeConverterInstance: AttributeConverter<any, any> = ConverterService.getInstance().getConverterClass(attributeConverterClass);
        targetAsMetadata.__metadata__           = <AttributeMetaData> { propertyKey, attributeConverterInstance };
    }
}
