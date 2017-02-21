import { AttributeConverter } from './converter';

export interface MetaDatableClass {
    __att_converter_metadata__: Map<string, AttributeConverter<any, any>>;
}
