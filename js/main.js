var searchParams = new URLSearchParams(window.location.search);

var department = searchParams.get("department");
var year = searchParams.get("year");

fetch(bulletinApiUrl + department + "&acad_year=")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var department_source = document.getElementById("department-template").innerHTML;
    var department_template = Handlebars.compile(department_source);
    var department_info = json.results.acad_org;
    var department_html = department_template(department_info);
    document.getElementById('department').innerHTML = department_html;
  });
