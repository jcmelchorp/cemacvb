import { EntityMetadataMap, EntityDataModuleConfig, PropsFilterFnFactory } from '@ngrx/data';
import * as fromUser from './core/users/models/user.model';
import * as fromInscription from './core/users/models/inscription.model';


const entityMetadata: EntityMetadataMap = {
  [fromUser.entityCollectionName]: {
    sortComparer: (a: fromUser.User, b: fromUser.User) => a.name!.familyName!.localeCompare(b.name!.familyName!),
    filterFn: (entities: fromUser.User[], { primaryEmail, name, role, grade, suspended }: Partial<fromUser.User>) =>
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
    selectId: (user: fromUser.User) => user.uid!,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  },
  [fromInscription.entityCollectionName]: {
    sortComparer: (a: fromInscription.Inscription, b: fromInscription.Inscription) => a.apellido1!.localeCompare(b.apellido1!),
    filterFn: (entities: fromInscription.Inscription[], { nombres,apellido1,apellido2,address1,ciudad,estado,pais,email,emer_name,emer_telefono }: Partial<fromInscription.Inscription>) =>
      entities
        .filter((e) => (nombres ? e.nombres === nombres : true))
        .filter((e) => (apellido1 ? e.apellido1 === apellido1 : true))
        .filter((e) => (apellido2 ? e.apellido2 === apellido2 : true))
        .filter((e) => (address1 ? e.address1 === address1 : true))
        .filter((e) => (ciudad ? e.ciudad === ciudad : true))
        .filter((e) => (estado ? e.estado === estado : true))
        .filter((e) => (pais ? e.pais === pais : true))
        .filter((e) => (email ? e.email === email : true))
        .filter((e) => (emer_name ? e.emer_name === emer_name : true))
        .filter((e) => (emer_telefono ? e.emer_telefono === emer_telefono : true)),
    selectId: (inscripcion: fromInscription.Inscription) => inscripcion.id!,
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpsert: false,
    },
  }
};

const pluralNames = {
   [fromUser.entityCollectionName]:fromUser.pluralizedEntityName,
   [fromInscription.entityCollectionName]:fromInscription.pluralizedEntityName
  };

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