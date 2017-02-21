import { AttributeConverter } from './converter';

export interface MetaDatableClass {
    __metadata__: AttributeMetaData;
}

export interface AttributeMetaData {
    propertyKey: string;
    
    attributeConverterInstance: AttributeConverter<any, any>;
}