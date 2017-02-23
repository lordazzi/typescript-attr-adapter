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
        if (attrs.length == 0) {
            throw new Error('[ResultSetModel class] you must initialize each attribute in the class with null and call initialize() after call super() in constructor.');
        }

        attrs.forEach((attr: string) => {
            if (resultSet[attr] != null) {
                this[attr] = resultSet[attr];
            }
        });
    }

    /**
     * Run the datatype cast
     */
    public convert() {
        if (this.initialized == false) {
            throw new Error('[ResultSetModel class] you can\'t call method conversion without initilize it before. Execute first initialize() and then convert()');
        }

        const metaData: MetaDatableClass = <MetaDatableClass><Object>(<Object>this).constructor;
        const map: Map<string, AttributeConverter<any, any>> = metaData.__att_converter_metadata__;
        let attributeConverter: AttributeConverter<any, any> = null;

        if (map) {
            Object.keys(map).forEach((attr: string) => {
                this[attr] = attributeConverter.toApplication(this[attr]);
            });
        }
    }

    /**
     * Generate a JSON based on this class
     */
    public toJson(): Object {
        const json: Object = new Object();
        const str: Array<string> = Array<string>();

        Object.keys(this).forEach((attr: string) => {
            const isFunction = (Object(this[attr]).constructor === Function);
            const isBaseModel = (this[attr] instanceof ResultSetModel);
            const isObject = (this[attr] instanceof Object);

            if (isBaseModel) {
                const baseModel = <ResultSetModel>this[attr];
                json[attr] = baseModel.toJson();
            } else if (isObject) {
                throw new Error(`[ResultSetModel class] can\'t convert object of class ${this[attr].prototype.name}. Did you forgot the AttributeAdapter decorator?`);
            } else if (!isFunction) {
                json[attr] = this[attr];
            }
        });

        return json;
    }

    /**
     * Transform this class in a JSON string
     */
    public toString(): string {
        return JSON.stringify(this.toJson());
    }
}

