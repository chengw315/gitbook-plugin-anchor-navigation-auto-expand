function navMouseEnter(){
    for (const element of document.getElementsByClassName('dirList')) {
        element.style.display = 'block'
    }
}
function navMouseLeave(){
    for (const element of document.getElementsByClassName('dirList')) {
        element.style.display = 'none'
    }
}