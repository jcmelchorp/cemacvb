import { User } from '@angular/fire/auth';
import { EntityMetadataMap, EntityDataModuleConfig, PropsFilterFnFactory } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  User:{},
};

const pluralNames = { User:'Users' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

// export function propsFilter(entities: User[], pattern: string) {
//   return PropsFilterFnFactory<User>(['name', 'ciudad', 'primaryEmail'])(entities, pattern);
// }
export function nameFilter(entities: { name: string }[], search: string) {
  return entities.filter((e) => -1 < e.name.indexOf(search));
}
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
export function compare(a: string | number, b: string | number): number {
  return (a < b ? -1 : 1);
}