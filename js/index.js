$.get("./php/items.php?totalUsers=", function (data) {
  // console.log(data);
  $("#totalUsers").html(data);
});

$.get("./php/items.php?lostItems=", function (data) {
  // console.log(data);
  $("#lostItems").html(data);
});
$.get("./php/items.php?recoveredItems=", function (data) {
  // console.log(data);
  $("#recoveredItems").html(data);
});

$.get("./php/items.php?allRecoveredItems=?", function (data) {
  result = data;
  let txt = "";
  txt +=
    "<h4>Recovered Items</h4>\
    <table class='w3-table w3-bordered'>\
      <tr>\
        <th>Id</th>\
        <th>Item Name</th>\
        <th>Item State</th>\
        <th>Date recovered</th>\
        <th>recoverer Name</th>\
        <th>Action</th>\
      </tr>\
        ";

  for (i in result) {
    txt +=
      "<tr>\
      <td>" +
      result[i].id +
      "</td>\
      <td>" +
      result[i].item_name +
      "</td>\
      <td>" +
      result[i].item_state +
      "</td>\
      <td>" +
      result[i].date +
      "</td>\
      <td>" +
      result[i].recoverer_name +
      "</td>\
      <td>\
      <button\
        class='w3-button w3-round'\
        style='\
          background-image: linear-gradient(90deg,#4192f3,#5232f3);\
        '\
      >\
        Reclaim\
      </button></td>\
      ";
  }

  txt += "</table>";

  $("#tblRecoveredItems").html(txt);
  // console.log(result);
});

$.get("./php/items.php?allLostItems=true", function (data) {
  result = data;
  let txt = "";
  txt +=
    "<h4>Lost Items</h4>\
    <table class='w3-table w3-bordered'>\
      <tr>\
      <th>id</th>\
      <th>item name</th>\
        <th>owner admission</th>\
        <th>Date realised</th>\
        <th>Action</th>\
      </tr>\
        ";

  for (i in result) {
    txt +=
      "<tr>\
      <td>" +
      result[i].id +
      "</td>\
      <td>" +
      result[i].item_name +
      "</td>\
      <td>" +
      result[i].admission +
      "</td>\
      <td>" +
      result[i].date_realised +
      "</td>\
      <td>\
      <button\
        class='w3-button w3-round'\
        style='\
          background-image: linear-gradient(90deg,#4192f3,#5232f3);\
        '\
      >\
        More\
      </button></td>\
      ";
  }

  txt += "</table>";
  $("#reportedLostItems").html(txt);

  // console.log(data);
});
