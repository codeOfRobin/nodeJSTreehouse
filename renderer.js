var fs = require('fs');

function mergeValues(values,content)
{
    //replace {{key}} with value
    for (var key in values)
    {
        content = content.toString().replace("{{" + key+"}}",values[key])
    }
    return content
}

function view(templateName,values, response)
{
    var fileContents = fs.readFileSync('./views/'+templateName+'.html',{encoding:"utf8"})
    fileContents = mergeValues(values,fileContents)
    response.write(fileContents)
}

module.exports.view = view
