//You can change documentId:string to id:number
export type DocumentId = string;

//base fields which have all entities in database(good practic)
export interface BaseType {
	documentId: DocumentId;
	// id: number;
	name: string; // this field is needed for common for auto complete search for example you have contacts,organizations,forms and certificates. Yes you can use title for some of them for example - form, but then you could not use Autocomplete copmonent with same params for each field
	createdAt: string;
	updatedAt: string;
}
//base fields for PUT entities
export interface BaseFormType {
	name: string;
}
