var searchParams = new URLSearchParams(window.location.search);

var department = searchParams.get("department");
var year = searchParams.get("year");

fetch(bulletinApiUrl + department + "&acad_year=" + year)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    var department_source = document.getElementById("department-template").innerHTML;
    var department_template = Handlebars.compile(department_source);

    Handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
    });

    Handlebars.registerHelper("nl2br", function(options) {
      var brText = Handlebars.escapeExpression(options.fn(this)).replace(new RegExp('\r?\n','g'), '<br><br>');
      return new Handlebars.SafeString(brText);
    });

    Handlebars.registerHelper("ew", function(options) {
      var ewString = Handlebars.escapeExpression(options.fn(this));
      if(!ewString.endsWith('.')) {
        ewString = ewString + '.';
      }
      return new Handlebars.SafeString(ewString);
    });

    var department_info = json.results;
    var department_html = department_template(department_info);
    document.getElementById('department').innerHTML = department_html;
  });
