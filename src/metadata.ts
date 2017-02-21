import { AttributeConverter } from './converter';

export interface MetaDatableClass {
    __metadata__: Map<string, AttributeConverter<any, any>>;
}
