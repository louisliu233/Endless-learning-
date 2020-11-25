function getElementByClassName(tagname,classname){
    var tag = document.getElementsByTagName(tagname)
    var tagAll = []
    for(i=0;i<tag.length;i++){
        if(tag[i].classname.indexOf(classname) != -1){
            tagAll[tagAll.length] = tag[i] //tagAll.push(tag[i])
        }
    }
    return tagAll
}

function getElementById(tagname,idname){
    var tag = document.getElementsByTagName(tagname)
    var tagAll = []
    for(i=0;i<tag.length;i++){
        if(tag[i].idname.indexOf(idname) != -1){
            tagAll[tagAll.length] = tag[i]//tagAll.push[tag[i]]
        }
    }
    return tagAll
}   