import { Builder, convertableToString, parseString } from 'xml2js';

const xmlParse = (data: convertableToString): any => {
    let parsedData = null;
    parseString(data, (err: Error, res: any): void => (parsedData = res));
    return parsedData;
};

const xmlBuilder = new Builder();

export { xmlParse, xmlBuilder };
