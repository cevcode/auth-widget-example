import _ from 'lodash';
export function translate(object: any, path: string[], locale: string = 'ru') {
    return _.get(object, `${path.join('.')}.${locale}`);
}
