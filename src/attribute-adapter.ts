
import { JSONPrimitiveTypes } from './common';

interface MetaDatableClass {
    __metadata__: AttributeMetaData;
}

interface AttributeMetaData {
    propertyKey: string;

    dataType: any;
}

/**
 * 
 */
export function AttributeAdapter(dataType: any|JSONPrimitiveTypes): any {
    const isEnum: boolean   = dataType.constructor === JSONPrimitiveTypes;
    const isClass: boolean  = dataType && dataType.constructor && Object(dataType) instanceof Function;

    if (!isEnum && !isClass) {
        throw new Error('[AttributeAdapter decorator] dataType given was not a supported dataType');
    }

    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void {
        let targetAsMetadata: MetaDatableClass  = <MetaDatableClass> target;
        targetAsMetadata.__metadata__           = <AttributeMetaData> { propertyKey, dataType };
    }
}
