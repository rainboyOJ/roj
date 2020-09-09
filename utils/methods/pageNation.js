module.exports = function pageNation(page,count,pageSize,pageNationLength= 18){
   let pageCount = Math.ceil(count/pageSize)
   let half = Math.floor(pageNationLength/2);
   let left = page-half < 1 ? 1 : page-half;
   let should_right_size = 2*half-(page-left)
   let right = page+should_right_size > pageCount ? pageCount : page+should_right_size;
   let should_left_size = half-(right-page) < 0 ? 0 :half-(right-page) ;

   left = left - should_left_size < 1 ? 1 : left - should_left_size ;
   let arr =[]
   for(let i =left ;i<=right;i++) arr.push(i);
   if( arr[0] == 2) arr.unshift(1);
   else if(arr[0] > 2) {
      arr.unshift(1,'...')
   }
   if(arr[arr.length-1] == pageCount-1) arr.push(pageCount)
   else if(arr[arr.length-1] < pageCount-1) arr.push('...',pageCount)
    return {
      page,
      pageSize,
      pageCount,
      list:arr
    }
 }
