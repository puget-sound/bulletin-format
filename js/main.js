var searchParams = new URLSearchParams(window.location.search);

var department = searchParams.get("department");
var year = searchParams.get("year");
var system = searchParams.get("system");
if(system === "cststp") {
  bulletinApiUrl = bulletinApiUrl.replace('csprd-integration', 'campus-tstp');
}
bulletinApiUrl = bulletinApiUrl.replace('csprd', system);
if(system !== 'csprd') {
  document.getElementById("system").textContent = document.getElementById("system").textContent.replaceAll('CSPRD', system);
  document.getElementById("system").style.display = 'block';
  document.getElementById("system").classList.add("system-" + system);
}

fetch(bulletinApiUrl + department + "&acad_year=" + year)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    if(json.error) {
      document.getElementById('department').innerHTML = json.error;
    } else {
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
      //var brText = Handlebars.escapeExpression(options.fn(this)).replace(new RegExp('\r?\n','g'), '<br><br>');
      //return new Handlebars.SafeString(brText);
      return options.fn(this).replace(new RegExp('\r?\n','g'), '<br><br>');
    });

    Handlebars.registerHelper("ew", function(options) {
      //var ewString = Handlebars.escapeExpression(options.fn(this));
      var ewString = options.fn(this).trim();
      if(!ewString.endsWith('.')) {
        ewString = ewString + '.';
      }
      return new Handlebars.SafeString(ewString);
    });

    var department_info = json.results;
    var department_html = department_template(department_info);
    document.getElementById('department').innerHTML = department_html;
  }
  });
