
var searchParams = new URLSearchParams(window.location.search);

var department = searchParams.get("department");
console.log(department);

fetch('https://jsonplaceholder.typicode.com/comments?postId=' + department)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);
      //var context = { title: "My New Post", body: "This is my first post!" };
      var context = { posts:json };
      var html = template(context);
      document.getElementById('bulletin').innerHTML = html;
    });
