
interface menu_type {
    id:number,
    title:string,
    link:string,
}

const menu:menu_type[]=[
    { 
        id:1,
        link:"/",
        title:"Anasayfa"
    },
    {
        id:2,
        link:"/book",
        title:"Kitaplar"
    },
    {
        id:3,
        link:"/about",
        title:"Hakkımızda"
    }
]
export default menu