function PromiseAll(promise){
    return new Promise((resolve, reject) => {
      let index=0;
      let result = [];
      if(promise.length === 0) resolve(result)
      for(let i = 0; i<promise.length; i++){
        Promise.resolve(promise[i]).then(data => {
          result[i] = data;
          if(++index === promise.length){
            resolve(result)
          } 
        }, err => {
          reject(err)
        })
      }
    })
}

 let p1 = new Promise((resolve) => {
   resolve('成功了')
 })
 let p2 = new Promise((resolve) => {
   resolve('success')
 })
 PromiseAll([p1, p2]).then((result) => {
   console.log(result) //['成功了', 'success']
 }).catch((error) => {
   console.log(error)
 })
   //输出结果：(2) ["成功了", "success"]