import { MetaDatableClass } from './metadata';

export abstract class ResultSetModel {

    /**
     * Transform the given JSON in data to fill the resultset
     */
    public constructor(resultSet: Object) {

        if (resultSet.constructor !== Object) {
            throw new Error('[ResultSetModel class] the resultSet argument must be a JSON object.');
        }

        Object.keys(this).forEach((attr: string) => {
            if (!(resultSet.hasOwnProperty(attr) && this[attr] !== undefined)) {
                this[attr] = resultSet[attr];
            }
        });
    }

    /**
     * Generate a JSON based on this class
     */
    public toJson(): Object {
        const json: Object          = new Object();
        const str: Array<string>    = Array<string>();

        Object.keys(this).forEach((attr: string) => {
            const isFunction    = (Object(this[attr]).constructor === Function);
            const isBaseModel   = (this instanceof ResultSetModel);
            const isObject      = (this instanceof Object);

            if (isBaseModel) {
                const baseModel = <ResultSetModel>this[attr];
                json[attr]      = baseModel.toJson();
            } else if (isObject) {
                //   TODO
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

