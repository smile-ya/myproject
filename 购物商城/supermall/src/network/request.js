import axios from 'axios'

export function request(config){
//  1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout:5000
  })

//2.axios的拦截器
  instance.interceptors.request.use(
  //   config=>{
  //   console.log(config);
  //   return config;
  // },err=>{
  //   console.log(err);
  // }
  )
//2.2响应拦截
  instance.interceptors.response.use(
  //   res=>{
  //   console.log(res);
  // },err=>{
  //   console.log(err);
 // }
  )


//  发送真正的网络请求,返回的是一个Promise
  return instance(config);

}

// import axios from 'axios'
//
// export function request(config,success,failure){
// //  1.创建axios的实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//
// //  发送真正的网络请求
//   instance(config).then(res =>{
//     success(res);
//   }).catch(err=>{
//     failure(err)
//   })
//
// }
