import { EntityMetadataMap, EntityDataModuleConfig, PropsFilterFnFactory } from '@ngrx/data';
import { User } from './core/auth/models/user.model';

const entitySelectId = 'url';
const entityCollectionName = 'User';
const pluralizedEntityName = 'users';
const entityCollectionEndPoint = pluralizedEntityName;
const entityMetadata: EntityMetadataMap = {
  [entityCollectionName]: {
    sortComparer: (a: User, b: User) => a.name!.familyName!.localeCompare(b.name!.familyName!),
    filterFn: (entities: User[], { primaryEmail, name, role, grade, suspended }: Partial<User>) =>
      entities
        .filter((e) => (name && e.name && e.name.fullName
          ? e.name.fullName
            .toLocaleLowerCase()
            .includes(`${name.fullName!.toLocaleLowerCase()}`)
          : true))
        .filter((e) => (primaryEmail ? e.primaryEmail === primaryEmail : true))
        .filter((e) => (role ? e.role === role : true))
        .filter((e) => (grade ? e.grade === grade : true))
        .filter((e) => (suspended ? e.suspended === suspended : true)),
    selectId: (user: User) => user.uid!,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
};

const pluralNames = { [entityCollectionName]:pluralizedEntityName };

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