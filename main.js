var repoHTML = "<input type='text' name='user' placeholder='User' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' placeholder='Repository' " +
    "id='repo' size='10' />" +
    "<button type='button'>Grab repo data</button>" +
    "<div id='repodata'/>";

var writeHTML = "<input type='text' name='file' placeholder='File' " +
    "id='file' size='10' />" +
    "<input type='text' name='content' placeholder='Content' " +
    "id='content' size='10' />" +
    "<button type='button' id='write'>Write File!</button>";

var github;
var myrepo;

function getToken() {
  var token = $("#token").val();
  console.log (token);

  github = new Github({
    token: token,
    auth: "oauth"
  });

  $("#repoform").html(repoHTML)
  $("div#form button").click(getRepo);
};

function getRepo() {
  var user = $("#user").val();
  var reponame = $("#repo").val();
  myrepo = github.getRepo(user, reponame);
  myrepo.show(showRepo);
};

function showRepo(error, repo) {
  var repodata = $("#repodata");
  if (error) {
    repodata.html("<p>Error code: " + error.error + "</p>");
  } else {
    repodata.html("<p>Repo data:</p>" +
                  "<ul><li>Full name: " + repo.full_name + "</li>" +
                  "<li>Description: " + repo.description + "</li>" +
                  "<li>Created at: " + repo.created_at + "</li>" +
                  "</ul>" + writeHTML);
    console.log (repo);
    console.log (repo.full_name, repo.description, repo.created_at);

    $("#write").click(writeFile);
  }
};

function writeFile() {
  var file = $("#file").val();
  var content = $("#content").val()
  console.log($("#file").val());
  console.log($("#content").val());

  myrepo.write('master', file, content, "Updating data",
  function(err) {
    console.log(err);
  });
};

$(document).ready(function() {
  $("div#form button").click(getToken);
});
