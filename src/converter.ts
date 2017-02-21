import { AttributeAdapter } from './attribute-adapter';

type AttrConv = AttributeConverter<any, any>;

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
    private converters: Array<AttrConv> = null;

    private constructor() {
        this.converters = new Array<AttrConv>();
    }

    /**
     * Create new converter class
     */
    public getConverterClass(
        conversor: any
    ) {

        const checkingClass: AttributeConverter<any, any> = <AttributeConverter<any, any>> conversor.prototype;
        const hasToApplicationMethod: boolean = Object(checkingClass.toApplication) instanceof Function;
        const hasToServerMethod: boolean = Object(checkingClass.toServer) instanceof Function;

        if (!hasToApplicationMethod || !hasToServerMethod) {
            throw new Error('[AttributeAdapter decorator] invalid argument. You must pass an implementation of AttributeConverter.');
        }

        let isMyClass: AttrConv = null;
        this.converters.forEach((clazz: AttrConv) => {
            if (clazz.constructor === conversor) {
                isMyClass = clazz;
                return false;
            }
        });

        if (!isMyClass) {
            isMyClass = new conversor();
            this.converters.push(isMyClass);
        }

        return isMyClass;
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
 * A converter must implement the attrAdapter.AttributeConverter interface, where applicationDataType is the
 * class of the model inside your application and serverDataType is the type of the attribute of a result set
 * given from a request, localStorage, sessionStorage or a string parsed into a JSON from anywhere. 
 */
export interface AttributeConverter<serverDataType, applicationDataType> {

    toApplication(castMe: serverDataType): applicationDataType;

    toServer(castMe: applicationDataType): serverDataType;

}
