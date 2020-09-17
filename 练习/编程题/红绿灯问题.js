function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

let task = (timer,light) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(light === 'red'){
                red()
            }
            if(light === 'green'){
               green()
            }
            if(light === 'yellow'){
                yellow()
            }
            resolve()
        },timer)
    })
}

let step = () => {
    task(3000,'red')
    .then(() => task(1000,'green'))
    .then(() => task(2000,'yellow'))
    .then(step)
}

// let step = async () => {
//     await task(3000,'red')
//     await task(1000,'green')
//     await task(2000,'yellow')
//     step()
// }

step()