
import { JSONPrimitiveTypes } from './common';

interface MetaDatableClass {
    __metadata__: AttributeMetaData;
}

interface AttributeMetaData {
    propertyKey: string;
    
    serverDataType: any;
    
    applicationDataType: any;
}

/**
 * 
 */
export function AttributeAdapter(serverDataType: any|JSONPrimitiveTypes, applicationDataType: any|JSONPrimitiveTypes): any {
    let isEnum: boolean   = serverDataType.constructor === JSONPrimitiveTypes;
    let isClass: boolean  = serverDataType && serverDataType.constructor && Object(serverDataType) instanceof Function;

    if (!isEnum && !isClass) {
        throw new Error('[AttributeAdapter decorator] dataType given was not a supported dataType (serverDataType argument in @AttributeAdapter decorator)');
    }

    isEnum   = applicationDataType.constructor === JSONPrimitiveTypes;
    isClass  = applicationDataType && applicationDataType.constructor && Object(applicationDataType) instanceof Function;

    if (!isEnum && !isClass) {
        throw new Error('[AttributeAdapter decorator] dataType given was not a supported dataType (applicationDataType argument in @AttributeAdapter decorator)');
    }

    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void {
        let targetAsMetadata: MetaDatableClass  = <MetaDatableClass> target;
        targetAsMetadata.__metadata__           = <AttributeMetaData> { propertyKey, serverDataType, applicationDataType };
    }
}
