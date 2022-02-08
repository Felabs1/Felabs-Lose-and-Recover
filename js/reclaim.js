const id = window.location.href;
const url = new URL(id);
const c = url.searchParams.get("id");

if (c === "" || c === null || c === undefined) {
  window.location.href = "./items.html";
}

$.get("./php/items.php?allRecoveredItems", function (data) {
  const result = data;
  let txt = "";
  for (one in result) {
    if (result[one].id === c) {
      txt +=
        ' <div\
      class="background-image"\
      style="\
        height: 350px;\
        background-image: url(' +
        encodeURI(result[one].image.slice(1)) +
        ');\
        background-size: cover;\
        background-position: center;\
      "\
    >\
      <div\
        style="background-color: rgba(0, 0, 0, 0.4); height: 100%"\
      ></div>\
    </div>\
    <h4>' +
        result[one].item_name +
        "</h4>\
        <b>Location Found</b>: <span>" +
        result[one].location_recovered +
        "</span><br>\
        <b>State Of Item</b>: <span>" +
        result[one].item_state +
        "</span><br>\
        <b>Name of Recoverer</b>: <span>" +
        result[one].recoverer_name +
        "</span><br>\
        ";
      //   console.log(result[one].image.slice(1));
    }
  }

  // txt +=
  //   "<h4>Requests</h4>\
  // <table class='w3-table'>\
  // <thead>\
  // <tr>\
  // <th>id</th>\
  // <th>Name</th>\
  // <th>Admission</th>\
  // <th>Action</th>\
  // </tr>\
  // <thead>\
  // <tbody>";

  // $.get("./php/items.php?allRecoveryRequests=?", function (data) {
  //   console.log(data);

  //   for (i = 0; i < data.length; i++) {
  //     console.log(data[i]);
  //     txt += `<tr>
  //     <td>Hello</td>
  //     <td>Hello</td>
  //     <td>Hello</td>
  //     <td>Hello</td>
  //     </tr>`;
  //   }

  //   txt += `</tbody></table>`;

  //   // console.log(txt);
  //   // txt += `<h4>hhooo</h4>`;
  //   //       txt += `<tr>
  //   //         <td>${item.id}</td>
  //   //         <td>${item.claimnant_name}</td>
  //   //         <td>${item.claimnant_admission}</td>
  //   //         <td><button class="w3-button w3-border w3-round">confirm</button></td>
  //   //         </tr>
  //   // `;
  // });
  //   let txt = "";
  //   console.log(result);
  $("#recoveryDetails").html(txt);
});

document.getElementById("property_id").value = c;
document.getElementById("property_id").readOnly = true;

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
