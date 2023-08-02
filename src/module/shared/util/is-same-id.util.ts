import { Schema } from 'mongoose';

export function isSameId(
  id1: string | Schema.Types.ObjectId,
  id2: string | Schema.Types.ObjectId,
): boolean {
  return String(id1) === String(id2);
}
