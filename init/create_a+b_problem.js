
var ab = {
    "pid":1000,
		"title": "A + B Problem",
	  "content":"## 题目描述\n\n输入 $a$ 和 $b$，输出 $a + b$ 的结果。\n\n## 输入格式\n\n一行两个正整数 $a$ 和 $b$。\n\n## 输出格式\n\n一行一个正整数 $a + b$。\n\n## 样例输入\n\n```\n1 2\n```\n\n## 样例输出\n\n```\n3\n```\n## 数据范围与提示\n\n对于 $100\\%$ 的数据，$1 \\leq a, b \\leq 10 ^ 6$。\n",
		"time": 1000,
		"memory": 128,
		"stack": 128,
		"file_io_input_name": "a+b.in",
		"file_io_output_name": "a+b.out",
		"spj": "default",
		"tags": ["系统测试"],
	  "level":1,
	  "is_del":false
}
module.exports  = async function(){

  //创建tag
  let tag_doc = await db.oneGet({model:'tag',query:{_id:ab.tags[0]}})
  if( !tag_doc){
    await db.model['tag'].create({_id:ab.tags[0]})
    debug(" ==●﹏●== : ","创建 tag:系统测试")
  }
  else debug(" ==●﹏●== : ","已经有 tag:系统测试")

  //创建题目
  let ab_doc = await db.oneGet({model:'problem',query:{pid:ab.pid}})
  if( !ab_doc){
    await db.model['problem'].create(ab).catch(e=>{
      console.log(e)
    })
    debug(" ==●﹏●== : ","创建 测试题目:",ab.title)
  }
  else debug(" ==●﹏●== : ","已有测试题目:",ab.title)

}
