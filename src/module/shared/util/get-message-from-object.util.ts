import { IAnyObject } from '../interface';

export const getMessageFromObject = (obj: IAnyObject) => {
  const messageProperties: string[] = [];

  for (const key in obj) {
    if (
      key !== 'id' &&
      !key.includes('_id') &&
      obj[key] &&
      typeof obj[key] === 'string'
    ) {
      messageProperties.push(`${key} = '${obj[key]}'`);
    }
  }

  const lastPart = messageProperties.pop() ?? '';
  return messageProperties.length
    ? `${messageProperties.join(', ')} and ${lastPart}`
    : lastPart;
};
