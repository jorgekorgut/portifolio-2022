export function filterFirstPage(map){
    map = map.filter((value)=>{
        return value.attributes.ShowFirstPage;
    });
    return map;
}