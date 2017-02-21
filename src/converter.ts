import { JSONPrimitiveTypes } from './common';

type AttrMapping        = Map<any|JSONPrimitiveTypes, AttributeConverter<any, any>>;

/**
 * Library domain, if you're here you're very curious or you're me.
 * 
 * This class controls every AttributeConverter implementation correctly
 * write and decorated.
 */
export class ConverterService {
    private static instance: ConverterService = null;

    /**
     * Where all converters are stored
     */
    private converters: Map<any|JSONPrimitiveTypes, AttrMapping> = null;

    private constructor() {
        this.converters = new Map<any|JSONPrimitiveTypes, AttrMapping>();
    }

    /**
     * Create new converter class
     */
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

    /**
     * Get a stored converter class
     */
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

    /**
     * This method is to say the class name on a exception
     */
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

    /**
     * Get a singleton instance
     */
    public static getInstance(): ConverterService {
        if (this.instance === null) {
            this.instance = new ConverterService();
        }
        
        return this.instance;
    }
}


/**
 * The @Converter decorator, different from JPA's implementation (where it just receives the argument 'autoApply'
 * ), will depend of you to give to it the datatypes used in your converter.
 * 
 * The application must follow this strategy because TypeScript won't give to us the datatype given to the generic
 * class, not, at least, without the use of witchcraft or MacGyverism.
 * 
 * So, your decorator will look like something like that:
 * 
 * @example
 *   @Converter( JSONPrimitiveTypes.STRING, Date )
 *   StringToDateConverter implements AttributeConverter<string, Date> {
 *      // 
 *   }
 */
export function Converter(serverDataType: any, applicationDataType: any) {
    return function(target: AttributeConverter<any, any>, propertyKey: string, descriptor: PropertyDescriptor): void {
        ConverterService.getInstance().setConverter(serverDataType, applicationDataType, target);
    }
}

/**
 * A converter must implement the attrAdapter.AttributeConverter interface, where applicationDataType is the
 * class of the model inside your application and serverDataType is the type of the attribute of a result set
 * given from a request, localStorage, sessionStorage or a string parsed into a JSON from anywhere. 
 */
export interface AttributeConverter<serverDataType, applicationDataType> {

    toApplication(castMe: serverDataType): applicationDataType;

    toServer(castMe: applicationDataType): serverDataType;

}
