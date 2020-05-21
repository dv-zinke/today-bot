export interface Attachments {
    pretext:string,
    fields:[Field],
    footer:string
}

export interface Field {
    type:string,
    title:string,
    value:string
}