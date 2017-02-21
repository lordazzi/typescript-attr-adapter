import { AttributeConverter, ConverterService } from './converter';
import { ResultSetModel } from './resultset';
import { MetaDatableClass } from './metadata';

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
        
        if (!targetAsMetadata.__att_converter_metadata__) {
            targetAsMetadata.__att_converter_metadata__ = new Map<string, AttributeConverter<any, any>>();
        }

        targetAsMetadata.__att_converter_metadata__.set(propertyKey, attributeConverterInstance);
    }
}
