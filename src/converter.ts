import { JSONPrimitiveTypes } from './common';

type AttrMapping        = Map<any|JSONPrimitiveTypes, AttributeConverter<any, any>>;

/**
 * 
 */
class ConverterService {
    private static instance: ConverterService = null;

    /**
     * Where all converters are stored
     */
    private converters: Map<any|JSONPrimitiveTypes, AttrMapping> = null;

    private constructor() {
        this.converters = new Map<any|JSONPrimitiveTypes, AttrMapping>();
    }

    public setConverter(
        serverDataType: any|JSONPrimitiveTypes,
        applicationDataType: any|JSONPrimitiveTypes,
        conversor: AttributeConverter<any, any>
    ) {

        let attrMapping: AttrMapping = this.converters.get(serverDataType);
        if (!attrMapping) {
            attrMapping = new Map<any|JSONPrimitiveTypes, AttributeConverter<any, any>>();
        }
        
        attrMapping.set(applicationDataType, conversor);
        this.converters.set(serverDataType, attrMapping);
    }

    public getConverter(
        serverDataType: any|JSONPrimitiveTypes,
        applicationDataType: any|JSONPrimitiveTypes
    ): AttributeConverter<any, any> {
        const attrMapping: AttrMapping                  = this.converters.get(serverDataType);
        if (attrMapping == null) {            
            throw new Error(`[ConverterService singleton] no AttributeConverter implementation found for ${this.getClassName(serverDataType)} as server datatype and ${this.getClassName(applicationDataType)} as application datatype. Don't you miss the 'Converter' in the class declaration?`);
        }

        const converter: AttributeConverter<any, any>   = attrMapping.get(applicationDataType);
        if (attrMapping == null) {            
            throw new Error(`[ConverterService singleton] no AttributeConverter implementation found for ${this.getClassName(serverDataType)} as server datatype and ${this.getClassName(applicationDataType)} as application datatype. Don't you miss the 'Converter' in the class declaration?`);
        }

        return converter;
    }

    private getClassName(dataType: any|JSONPrimitiveTypes): string {
        const isEnum: boolean   = dataType.constructor === JSONPrimitiveTypes;
        const isClass: boolean  = dataType && dataType.constructor && Object(dataType) instanceof Function;

        if (isEnum) {
            return <string> dataType;
        } else if (isClass) {
            return (<Function>dataType).name;
        } else {
            throw new Error('[ConverterService singleton] dataType given was not a supported dataType');
        }
    }

    public static getInstance(): ConverterService {
        if (this.instance === null) {
            this.instance = new ConverterService();
        }
        
        return this.instance;
    }
}


export function Converter(serverDataType: any, applicationDataType: any) {
    return function(target: AttributeConverter<any, any>, propertyKey: string, descriptor: PropertyDescriptor): void {
        ConverterService.getInstance().setConverter(serverDataType, applicationDataType, target);
    }
}

/**
 * A Converter must implement the attrAdapter.AttributeConverter interface, where applicationDataType is the
 * class of the model inside your application and serverDataType is the type of the attribute of a result set
 * given from a request, localStorage, sessionStorage or a string parsed into a JSON from anywhere. 
 */
export interface AttributeConverter<serverDataType, applicationDataType> {

    toApplication(castMe: serverDataType): applicationDataType;

    toServer(castMe: applicationDataType): serverDataType;

}
