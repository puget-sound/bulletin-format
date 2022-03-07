// set term dropdown to last year, this year and next year
// also, if we can set the default year, these are the rules:
// if current date between 1/1 and 7/1, then use current year, else use current year+1
var termElement = document.querySelectorAll('#term-select option');
var this_today = new Date();
var this_year = this_today.getFullYear();
var this_month = this_today.getMonth();
var set_year = this_year;

termElement[0].value = this_year - 1;
termElement[0].text = this_year - 1;

termElement[1].value = this_year;
termElement[1].text = this_year;
termElement[1].selected = true;

termElement[2].value = this_year + 1;
termElement[2].text = this_year + 1;
if(this_month > 5) {
  termElement[2].selected = true;
  set_year = this_year + 1;
}

var deptElements = document.querySelectorAll("#departments > li > a");

for (var i = 0; i < deptElements.length; i++) {
    var href = deptElements[i].getAttribute("href");
    var newHref = href.replace(/(year=).*?(&|$)/,'$1' + set_year + '$2');
    deptElements[i].setAttribute("href", newHref);
}

listDepartments("csprd");

function listDepartments(systemHref){
document.getElementById('departments').innerHTML = 'Fetching data...';
  fetch(bulletinDeptsApiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var department_source = document.getElementById("departments-template").innerHTML;
      var department_template = Handlebars.compile(department_source);

      var department_info = json.results;
      department_info.system_href = systemHref;
      var department_html = department_template(department_info);
      document.getElementById('departments').innerHTML = department_html;
    });
}
