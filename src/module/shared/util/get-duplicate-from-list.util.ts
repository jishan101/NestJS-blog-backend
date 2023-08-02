import { IAnyObject } from '../interface';

export const getDuplicateObjFromList = (list: IAnyObject[]): IAnyObject => {
  const visList: IAnyObject[] = [];

  for (const obj of list) {
    const objKeys = Object.keys(obj);
    const sortedKeys = objKeys.sort();

    const sortedObj: IAnyObject = {};
    for (const key of sortedKeys) {
      sortedObj[key] = obj[key];
    }

    const objString = JSON.stringify(sortedObj);
    for (let i = 0; i < visList.length; i++) {
      const isDuplicate = JSON.stringify(visList[i]) === objString;
      if (isDuplicate) {
        return list[i];
      }
    }

    visList.push(sortedObj);
  }

  return null;
};
