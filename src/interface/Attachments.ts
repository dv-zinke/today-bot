export interface Attachments {
    color?: string,
    pretext?:string,
    fields:Array<Field>,
    footer:string
}

export interface Field {
    type?:string,
    title:string,
    value:any,
    short?:boolean
}