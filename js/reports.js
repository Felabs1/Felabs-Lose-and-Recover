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

$.get("./php/reports.php?recoveryrequest=true", function (data) {
  //   console.log(data);
  //   recoveryRequest = data;
  //   let txt = ``;
  //   txt += ` <h4>Reported Lost Items</h4>
  //     <table class="w3-table w3-small w3-bordered">
  //         <thead>
  //         <tr>
  //             <th>#</th>
  //             <th>Item Name</th>
  //             <th>location_lost</th>
  //             <th>date lost</th>
  //             <th>date reported</th>
  //             <th>admission</th>
  //         </tr>
  //         </thead>
  //         <tbody>`;
  //   for (let i in recoveryRequest) {
  //     let row = recoveryRequest[i];
  //     console.log(row);
  //     txt += `<tr>
  //       <td>${row.id}</td>
  //       <td>
  //       ${row.item_name}
  //      </td>
  //       <td>${row.location}</td>
  //       <td>${row.date_realised}</td>
  //       <td>${row.date_reported}</td>
  //       <td>${row.admission}</td>
  //     </tr>`;
  //   }
  //   $("#reportedLostItems").html(txt);
});

let filterer = $("#reportsData").click(() => {
  let date1 = new Date($("#date1").val());
  let date2 = new Date($("#date2").val());
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

  //   for (let i in recoveryRequest) {
  //     let timeRecovered = new Date(recoveryRequest[i].time_recovered);
  //     if (timeRecovered >= date1 && timeRecovered <= date2) {
  //       console.log(recoveryRequest[i]);
  //     }
  //   }
});
