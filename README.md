### 基于redux-observable 和 react的单页面spa架构（webpack热加载），已经实现常规的异步增删改查

react + redux + rxjs + connect + route  + webpack

逛了半天git，发现没有类似的代码，官网给的example也很简单，所以自己写了一套。总的来说，rxjs还是很有意思的，唯一的不足，流程略显繁琐

   1.包含异步的查询，分页，地址栏状态映射
   2.里面的异步接口是基于我自己的联调环境给的地址，可以根据自己的情况改掉接口，重在思想
   
### 运行方法
    npm run start
    
    测试，构建等请看package.json

### QA:
    1.这里直接运行是跑不起来的，需要自己根据自己的项目，更改api。
    2.代码仅供参考，如有疑问，请issue
    3.代码比较粗旷，重在思路
    
    
        
    






