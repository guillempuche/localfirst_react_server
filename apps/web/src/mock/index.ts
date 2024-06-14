// import { v4 as uuid } from 'uuid'

// export type IQuote = {
// 	id: string
// 	text: string
// 	authorRef?: string
// 	collectionRef?: string
// 	createdAt: Date
// 	isDraft: boolean
// }

// export type IAuthor = {
// 	id: string
// 	fullname: string
// 	birthDate?: Date
// 	isDraft: boolean
// }

// export type ICollection = {
// 	id: string
// 	name?: string
// 	parentRef?: string
// }

// export const mock_authors: IAuthor[] = [
// 	{
// 		id: 'barkeep',
// 		fullname: 'Barkeep',
// 		birthDate: new Date(1940, 11, 12),
// 		isDraft: false,
// 	},
// 	{
// 		id: 'tyler',
// 		fullname: 'Tyler Perry',
// 		birthDate: undefined,
// 		isDraft: true,
// 	},
// 	{
// 		id: 'fermin',
// 		fullname: 'Fermín Colomer',
// 		birthDate: undefined,
// 		isDraft: false,
// 	},
// 	{
// 		id: 'diego',
// 		fullname: 'Diego Ruzzarin',
// 		birthDate: undefined,
// 		isDraft: false,
// 	},
// ]

// export const mock_collections: ICollection[] = [
// 	{
// 		id: 'design',
// 		name: 'Design',
// 		parentRef: undefined,
// 	},
// 	{
// 		id: 'life',
// 		name: 'Life',
// 		parentRef: undefined,
// 	},
// 	{
// 		id: 'greek',
// 		name: 'Socratism',
// 		parentRef: 'life',
// 	},
// ]

// export const mock_quotes: IQuote[] = [
// 	{
// 		id: uuid(),
// 		text: 'Luck is the residue of design.',
// 		authorRef: 'author/barkeep',
// 		collectionRef: 'design',
// 		createdAt: new Date(2022, 11, 12, 4),
// 		isDraft: false,
// 	},
// 	{
// 		id: uuid(),
// 		text: 'El sufrimiento de ahora forma parte de la felicidad de antes.',
// 		authorRef: undefined,
// 		collectionRef: undefined,
// 		createdAt: new Date(2022, 11, 17, 12),
// 		isDraft: true,
// 	},
// 	{
// 		id: uuid(),
// 		text: 'There are people who come into your life to be there for a season.',
// 		authorRef: 'author/tyler',
// 		collectionRef: undefined,
// 		createdAt: new Date(2022, 11, 17, 12),
// 		isDraft: true,
// 	},
// 	{
// 		id: uuid(),
// 		text: 'Pixar és un plaer dels pobres.',
// 		authorRef: 'author/fermin',
// 		collectionRef: undefined,
// 		createdAt: new Date(2022, 12, 22, 12),
// 		isDraft: false,
// 	},
// 	{
// 		id: uuid(),
// 		text: 'Una persona reparada es más bonita que una que nunca sufrió.',
// 		authorRef: 'author/diego',
// 		collectionRef: undefined,
// 		createdAt: new Date(2023, 1, 2, 12),
// 		isDraft: false,
// 	},
// ]
