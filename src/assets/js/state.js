/**
 * Created by NieFZ on 2017/6/21.
 */
window.onload = function () {
  var performance = window.performance;
  var timing = performance.timing;
  var entries = performance.getEntries();
  var http = {
    post: function (option) {
      var xmlHTTP = new XMLHttpRequest();
      xmlHTTP.open("POST", option.url, true);
      xmlHTTP.setRequestHeader("Content-type", "application/json");
      xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState === 4 && (xmlHTTP.status === 200 || xmlHTTP.status === 304)) {
          option.success(JSON.parse(xmlHTTP.responseText));
        }
      };
      xmlHTTP.send(option.data);
    }
  };
  http.post({
    url: 'http://localhost:3034/ajax',
    data: JSON.stringify(entries),
    success: function (json) {
      console.log(json);
    }
  });
};