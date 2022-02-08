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
        onclick='reclaimPage(" +
      result[i].id +
      ")'\
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
        <th>Description</th>\
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
      <td>" +
      result[i].description +
      "</td>";
  }

  txt += "</table>";
  $("#reportedLostItems").html(txt);

  // console.log(data);
});

function reclaimPage(id) {
  window.location.href = `./reclaim.html?id=${id}`;
}

$.get("./php/main.php?cookies=true", (data) => {
  // console.log(data.hasOwnProperty("student_name"));
  if (data.usertype === "student") {
    $(".adminBtn").css({ display: "none" });
    $(".staff-nav").css({ display: "none" });
    $(".w3-col").removeClass("l3");
    $(".w3-col").addClass("l6");
  } else {
    $(".adminBtn").css({ display: "block" });
    $(".staff-nav").css({ display: "block" });
    $(".w3-col").removeClass("l6");
    $(".w3-col").addClass("l3");
  }
});

$.get("./php/items.php?countReclaimedItems=true", (data) => {
  // console.log(data);
  $("#reclaimedItems").html(data);
});

$.get("./php/items.php?reclaimedItems=true", (data) => {
  // console.log(data);
  result = data;
  let txt = "";
  txt +=
    "<h4>Reclaimed Items</h4>\
    <table class='w3-table w3-bordered'>\
      <tr>\
        <th>Id</th>\
        <th>admission number</th>\
        <th>owner name</th>\
        <th>contact</th>\
        <th>item id</th>\
        <th>date confirmed</th>\
      </tr>\
        ";

  for (i in result) {
    txt +=
      "<tr>\
      <td>" +
      result[i].id +
      "</td>\
      <td>" +
      result[i].admission_number +
      "</td>\
      <td>" +
      result[i].owner_name +
      "</td>\
      <td>" +
      result[i].contact +
      "</td>\
      <td>" +
      result[i].item_id +
      "</td>\
      <td>" +
      result[i].date_confirmed +
      "</td>\
      ";
  }

  txt += "</table>";
  console.log(data);
  $("#tblreclaimedItems").html(txt);
});

$.get("./php/items.php?reclaimRequests=true", (data) => {
  console.log(data);
  result = data;
  let txt = "";
  txt +=
    "<h4>Reclaim Requests</h4>\
    <table class='w3-table w3-bordered'>\
      <tr>\
        <th>Id</th>\
        <th>name</th>\
        <th>Id No</th>\
        <th>Adm No</th>\
        <th>Phone</th>\
        <th>item_id</th>\
        <th>date requested</th>\
      </tr>\
        ";

  for (i in result) {
    txt +=
      "<tr>\
      <td>" +
      result[i].id +
      "</td>\
      <td>" +
      result[i].claimnant_name +
      "</td>\
      <td>" +
      result[i].claimnant_id_no +
      "</td>\
      <td>" +
      result[i].claimnant_admission +
      "</td>\
      <td>" +
      result[i].claimnant_phone +
      "</td>\
      <td>" +
      result[i].recovered_item_id +
      "</td>\
      <td>" +
      result[i].time_recovered +
      "</td>\
      ";
  }

  txt += "</table>";
  // console.log(data);
  $("#tblreclaimRequests").html(txt);
});
