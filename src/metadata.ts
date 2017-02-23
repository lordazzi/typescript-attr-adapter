import { AttributeConverter } from './converter';

export interface MetaDatableClass {
    name: string;

    __att_converter_metadata__: Map<string, AttributeConverter<any, any>>;
}
