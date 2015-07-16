fs = require "fs"
f = process.argv[2]
exit 1 unless f
json = JSON.parse(fs.readFileSync(f))
ret = "| for | length | increment | i++ | typed | Average|\n"
ret += "|---|---|---|---|---|---|\n";
max = 0
min = 1000000
min_index = 0
max_index = 0
for result,i  in json.results
  if result.average > max
    max_index = i
    max = result.average
  if result.average < min
    min_index = i
    min = result.average
for result, i in json.results
  ret += "|"
  for j in [0..4]
    ret += if i & 1 << j then " o |" else " x |"
  if i is min_index
    ret += "**"+result.average + "**|"
  else if i is max_index
    ret += "*"+result.average + "*|"
  else
    ret += result.average + "|"
  ret += "\n"
ret += "最速コード  \n"
ret += "```\n" + json.results[min_index].desc + "```\n"
ret += "最遅コード  \n"
ret += "```\n" + json.results[max_index].desc + "\n```\n"
console.log(ret)