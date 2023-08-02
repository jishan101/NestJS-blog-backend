export class CommonUtils {
  public static groupBy(array: any[], key: string) {
    return array.reduce((result, currentValue) => {
      const keyValue = currentValue[key].toString();
      (result[keyValue] = result[keyValue] || []).push(currentValue);
      return result;
    }, {});
  }

  public static getMapped(list: any[], key: string): Map<string, any> {
    return list.reduce((map: Map<string, any>, currentValue: any) => {
      const idKey = currentValue[key].toString();
      map[idKey] = currentValue;
      return map;
    }, {});
  }

  public static getUniqueByKey(arr: any[], key: string) {
    const uniqueObj = {};

    arr.forEach((obj) => {
      const value = obj[key];
      uniqueObj[value] = uniqueObj[value] || obj;
    });

    return Object.values(uniqueObj);
  }
}
