//函数节流
function throttle(fn, delay){
    var lastTime = 0
    return function(){
        var nowTime = Date.now()
        if(nowTime - lastTime > delay){
            fn.call(this)
            lastTime = nowTime
        }
    }
    
}

function throttle(fn,delay){
    let isRun = true
    return function(){
        if(!isRun)return
        isRun = false
        setTimeout(() => {
            fn.call(this)
            isRun = true
        },delay)
    }
}

//函数防抖
function debounce(fn, delay){
    let timer = null
    return function(){
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this)
        },delay) 
    }
}