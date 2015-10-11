var http = require("http")
var x = 4
console.log(x);

var request = http.get("http://teamtreehouse.com/robinmalhotra123",function(result)
{
    console.log(result.statusCode)
    var body = ""
    result.on('data',function(chunk)
    {
        body += chunk
    })

    result.on('end',function()
    {
        if (result.statusCode === 200)
        {
            try {
                var profile = JSON.parse(body)
                console.log(profile.points['JavaScript'])
            } catch (e) {
                console.log(e.message)
            } finally {

            }
        }
        else {
            console.error(http.STATUS_CODES[result.statusCode]);
        }


    })

})


request.on('error',function(e)
{
})
