import type { Actor } from 'tarant'
import { P } from 'ts-pattern'
import type { Option } from 'ts-results'

export interface IActorGetId {
	getById(id: string): Option<Actor>
}

// export abstract class ICrud<T extends Actor> implements IResolver {
//   abstract create(item: T): Promise<Result<None, Error<String>>>;
//   abstract resolveActorById(id: string): Promise<T>;
//   abstract update(item: T): Promise<Result<None, Error<String>>>;
//   abstract delete(id: string): Promise<Result<None, Error<String>>>;
// }

// export function isInstanceOfC<T>(
//   obj: any,
//   clazz: new (...args: any[]) => T
// ): obj is T {
//   return obj instanceof clazz;
// }

// export function isInstanceOfB<T>(clazz: new (...args: any[]) => T) {
//   return (obj: any): obj is T => obj instanceof clazz;
// }

// function isInstanceOfC<T>(classConstructor: new (...args: any[]) => T) {
//   return {
//     [Pattern.matcher](): Pattern.Matcher<unknown, InstanceType<typeof classConstructor>> {
//       return {
//         match: (value: unknown) => ({
//           matched: value instanceof classConstructor
//         })
//       };
//     }
//   };
// }

export function isMatchInstanceOf<T>(clazz: new (...args: any[]) => T) {
	return P.when((obj: any): obj is T => obj instanceof clazz)
}

// export function getTypeFromActorId(id: string): Option<LibraryTypeofs> {
//   return match<string, Option<LibraryTypeofs>>(id)
//     .with(LibraryIds.author, () => Some(ActorAuthor))
//     .with(LibraryIds.collection, () => Some(ActorCollection))
//     .with(LibraryIds.editor, () => Some(ActorEditor))
//     .with(LibraryIds.quote, () => Some(ActorQuote))
//     .otherwise(() => None);
// }

// export function deleteDraftFromId(input: string): string {
//   return input.replace(/draft/g, '');
// }

/**
 * If the string input does not contain the substring "draft", the replace function
 * will make no changes and return the original input string as is.
 */
// export function addDraftToId(input: string): string {
//   const prefix = 'draft';
//   const index = input.indexOf(prefix);

//   if (index === -1) {
//     // Return the original string if prefix is not found
//     return input;
//   }

//   const insertPosition = index + prefix.length;
//   return input.slice(0, insertPosition) + 'draft' + input.slice(insertPosition);
// }
