import { MetaDatableClass } from './metadata';
import { AttributeConverter } from './converter';

export abstract class ResultSetModel {

    private initialized: boolean = false;

    /**
     * Fill the object with a json
     */
    public initialize(resultSet: Object): void {
        if (resultSet.constructor !== Object) {
            throw new Error('[ResultSetModel class] the resultSet argument must be a JSON object.');
        }

        const attrs: Array<string> = Object.keys(this);
        if (attrs.length == 1) {
            throw new Error('[ResultSetModel class] you must initialize each attribute in the class with null and call initialize() after call super() in constructor.');
        }

        attrs.forEach((attr: string) => {
            if (resultSet[attr] != null) {
                this[attr] = resultSet[attr];
            }
        });

        this.initialized = true;
    }

    /**
     * Run the datatype cast
     */
    public convert() {
        if (this.initialized == false) {
            throw new Error('[ResultSetModel class] you can\'t call method conversion without initilize it before. Execute first initialize() and then convert()');
        }

        const metaData = this.getMetaData();

        if (metaData) {
            metaData.forEach((value, attr: string) => {
                this[attr] = metaData.get(attr).toApplication(this[attr]);
            });
        }
    }

    /**
     * Return a map with each AttributeConverter used by the class and the name of the attribute
     * where it should be applied 
     */
    private getMetaData(): Map<string, AttributeConverter<any, any>> {
        const metaData: MetaDatableClass = <MetaDatableClass><Object>(<Object>this).constructor.prototype;
        return metaData.__att_converter_metadata__;
    }

    /**
     * Generate a JSON based on this class
     */
    public toJson(): Object {
        const json: Object = new Object();
        const str: Array<string> = Array<string>();
        const metaData = this.getMetaData();

        Object.keys(this).forEach((attr: string) => {
            const isFunction: boolean = (Object(this[attr]).constructor === Function);
            const isBaseModel: boolean = (this[attr] instanceof ResultSetModel); 
            const isObject: boolean = (this[attr] instanceof Object);
            const ignoreProperty: boolean = (attr === 'initialized' || attr === '__att_converter_metadata__');
            const isArray: boolean = (this[attr] instanceof Array);
            let attrConverter: AttributeConverter<any, any> = null;

            if (metaData) {
                attrConverter = metaData.get(attr);
            }

            if (ignoreProperty || isFunction) {
                return;
            } else if (attrConverter) {
                json[attr] = attrConverter.toServer(this[attr]);
            } else if (isBaseModel) {
                const baseModel = <ResultSetModel>this[attr];
                json[attr] = baseModel.toJson();
            } else if (isArray) {
                json[attr] = this.convertArrayPropertyToJson(this[attr]);
            } else if (isObject) {
                throw new Error(`[ResultSetModel class] can\'t convert object in "${attr}" to json. Did you forgot the AttributeAdapter decorator?`);
            } else {
                json[attr] = this[attr];
            }
        });

        return json;
    }

    private convertArrayPropertyToJson(attr: Array<any>): Array<any> {
        const arr: Array<any> = new Array();
        for (let i = 0; i < attr.length; i++) {

            const isBaseModel: boolean = (attr[i] instanceof ResultSetModel);
            const isObject: boolean = (attr[i] instanceof Object);
            if (isBaseModel) {
                const baseModel = <ResultSetModel>attr[i];
                arr.push(baseModel.toJson());
            } else if (isObject) {
                throw new Error(`[ResultSetModel class] can\'t convert object in array to json. Did you forgot the AttributeAdapter decorator?`);
            } else {
                arr.push(attr[i]);
            }
        }

        return arr;
    }

    /**
     * Transform this class in a JSON string
     */
    public toString(): string {
        return JSON.stringify(this.toJson());
    }
}

