var Profile = require("./profile.js");
var Renderer = require("./renderer.js")
var contentHeader = {'Content-Type': 'text/html'}
var QueryString = require('querystring')
//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/")
  {
    //show search
    if(request.method.toLowerCase()==="get")
    {
        response.writeHead(200, contentHeader);
        Renderer.view("header",{},response)
        Renderer.view("search",{},response);
        Renderer.view('footer',{},response);
        response.end()
    }
    else
    {
        request.on("data",function (postBody)
        {
            // response.writeHead(302,contentHeader);

            var query = QueryString.parse(postBody.toString())
            console.log("/"+query.username);
            response.writeHead(303, {"Location":"/"+query.username});
            // response.setHeader("Location","/"+query.username)
            response.end()
        })

    }

  }
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, contentHeader);
    Renderer.view("header",{},response)

    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile

      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //Simple response
      Renderer.view("profile",values,response)
    //   response.write(values.username + " has " + values.badges + " badges\n");
    Renderer.view('footer',{},response);
    response.end()
    });

    //on "error"
    studentProfile.on("error", function(error){
      //show error
      Renderer.view('error',{errorMessage:error.message},response);
      Renderer.view("search",{},response);
      Renderer.view('footer',{},response);
      response.end()
    });

  }
}

module.exports.home = home;
module.exports.user = user;
