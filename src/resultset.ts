

/**
 * 
 */
class ResultSetService {
    private static instance: ResultSetService = null;

    private constructor() {

    }

    public converter(resultSer: any) {

    }

    public static getInstance(): ResultSetService {
        if (this.instance === null) {
            this.instance = new ResultSetService();
        }
        
        return this.instance;
    }
}

export abstract class ResultSetModel {

    /**
     * Transforma o JSON recebido por argumento em dados que preenchem o
     * modelo instânciado
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

    public toString(): string {
        return JSON.stringify(this.toJson());
    }
}

