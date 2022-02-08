$.get("./php/reports.php?allrecovery=true", function (data) {
  //   console.log(data);
  allRecovery = data;
  let txt = ``;
  txt += ` <h4>Recovery Reports</h4>
    <table class="w3-table w3-small w3-bordered">
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>location_recovered</th>
            <th>item</th>
            <th>item_state</th>
            <th>timeRecovered</th>
        </tr>
        </thead>
        <tbody>`;

  for (let i in allRecovery) {
    let row = allRecovery[i];
    // console.log(row);
    txt += `<tr>
      <td>${row.id}</td>
      <td>${row.recoverer_name}</td>
      <td>${row.location_recovered}</td>
      <td>${row.item_name}</td>
      <td>${row.item_state}</td>
      <td>
       ${row.date}
      </td>
    </tr>`;
  }

  $("#recoveryReports").html(txt);
});

$.get("./php/reports.php?alllost=true", function (data) {
  //   console.log(data);
  allLost = data;
  let txt = ``;
  txt += ` <h4>Reported Lost Items</h4>
    <table class="w3-table w3-small w3-bordered">
        <thead>
        <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>location_lost</th>
            <th>date lost</th>
            <th>date reported</th>
            <th>admission</th>
        </tr>
        </thead>
        <tbody>`;

  for (let i in allLost) {
    let row = allLost[i];
    // console.log(row);
    txt += `<tr>
      <td>${row.id}</td>
      <td>
      ${row.item_name}
     </td>
      <td>${row.location}</td>
      <td>${row.date_realised}</td>
      <td>${row.date_reported}</td>
      <td>${row.admission}</td>
     
    </tr>`;
  }

  txt += `</tbody></table>`;

  $("#reportedLostItems").html(txt);
});

$.get("./php/items.php?reclaimedItems=true", (data) => {
  // console.log(data);
  result = data;
  let txt = "";
  txt +=
    "<h4>Reclaimed Items</h4>\
    <table class='w3-table w3-small w3-bordered'>\
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
  $("#reclaimedReports").html(txt);
});

// $.get("./php/items.php?reclaimRequests=true", (data) => {
//   console.log(data);
//   result = data;
//   let txt = "";
//   txt +=
//     "<h4>Reclaim Requests</h4>\
//     <table class='w3-table w3-small w3-bordered'>\
//       <tr>\
//         <th>Id</th>\
//         <th>name</th>\
//         <th>Id No</th>\
//         <th>Adm No</th>\
//         <th>Phone</th>\
//         <th>item_id</th>\
//         <th>date requested</th>\
//       </tr>\
//         ";

//   for (i in result) {
//     txt +=
//       "<tr>\
//       <td>" +
//       result[i].id +
//       "</td>\
//       <td>" +
//       result[i].claimnant_name +
//       "</td>\
//       <td>" +
//       result[i].claimnant_id_no +
//       "</td>\
//       <td>" +
//       result[i].claimnant_admission +
//       "</td>\
//       <td>" +
//       result[i].claimnant_phone +
//       "</td>\
//       <td>" +
//       result[i].recovered_item_id +
//       "</td>\
//       <td>" +
//       result[i].time_recovered +
//       "</td>\
//       ";
//   }

//   txt += "</table>";
//   // console.log(data);
//   $("#reclaimRequests").html(txt);
// });

let filterer = $("#reportsData").click(() => {
  let date1 = new Date($("#date1").val());
  let date2 = new Date($("#date2").val());
  console.log($("#date1").val());

  if ($("#date1").val() === "" || $("#date1").val() === "") {
    alert("please select all dates to filter");
    return;
  }
  //   console.log(allLost);
  let txt = ``;
  txt += ` <h4>Reported Lost Items</h4>
        <table class="w3-table w3-small w3-bordered">
            <thead>
            <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>location_lost</th>
                <th>date lost</th>
                <th>date reported</th>
                <th>admission</th>
            </tr>
            </thead>
            <tbody>`;
  for (let i in allLost) {
    let row = allLost[i];
    if (
      new Date(row.date_reported) >= date1 &&
      new Date(row.date_reported) <= date2
    ) {
      //   console.log(row);
      txt += `<tr>
      <td>${row.id}</td>
      <td>
      ${row.item_name}
     </td>
      <td>${row.location}</td>
      <td>${row.date_realised}</td>
      <td>${row.date_reported}</td>
      <td>${row.admission}</td>
     
    </tr>`;
    }
  }

  txt += `</tbody></table>`;
  $("#reportedLostItems").html(txt);

  txt = ``;
  txt += ` <h4>Recovery Reports</h4>
    <table class="w3-table w3-small w3-bordered">
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>location_recovered</th>
            <th>item</th>
            <th>item_state</th>
            <th>timeRecovered</th>
        </tr>
        </thead>
        <tbody>`;

  for (let i in allRecovery) {
    let row = allRecovery[i];
    let date = new Date(row.date);
    if (date >= date1 && date <= date2) {
      //   console.log(allRecovery[i]);
      //   console.log(row);
      txt += `<tr>
      <td>${row.id}</td>
      <td>${row.recoverer_name}</td>
      <td>${row.location_recovered}</td>
      <td>${row.item_name}</td>
      <td>${row.item_state}</td>
      <td>
       ${row.date}
      </td>
    </tr>`;
    }
  }

  txt += `</tbody></html>`;
  $("#recoveryReports").html(txt);
  txt = ``;
  txt += `<h4>Reclaimed Items</h4>
  <table class='w3-table w3-small w3-bordered'>
    <tr>
      <th>#</th>
      <th>admission number</th>
      <th>owner name</th>
      <th>contact</th>
      <th>item id</th>
      <th>date confirmed</th>
    </tr>\
      `;

  for (i in result) {
    let date = new Date(result[i].date_confirmed);
    if (date >= date1 && date <= date2) {
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
  }

  txt += "</table>";

  $("#reclaimedReports").html(txt);

  //   for (let i in recoveryRequest) {
  //     let timeRecovered = new Date(recoveryRequest[i].time_recovered);
  //     if (timeRecovered >= date1 && timeRecovered <= date2) {
  //       console.log(recoveryRequest[i]);
  //     }
  //   }
});

// $.get("./php/main.php?cookies=true", (data) => {
//   // console.log(data.hasOwnProperty("student_name"));
//   if (data.hasOwnProperty("student_name")) {
//     $(".adminBtn").css({ display: "none" });
//     $(".staff-nav").css({ display: "none" });
//   }
// });

$.get("./php/main.php?cookies=true", (data) => {
  // console.log(data.hasOwnProperty("student_name"));
  if (data.usertype === "student") {
    $(".adminBtn").css({ display: "none" });
    $(".staff-nav").css({ display: "none" });
  } else {
    $(".adminBtn").css({ display: "block" });
    $(".staff-nav").css({ display: "block" });
  }
});
