const id = window.location.href;
const url = new URL(id);
const c = url.searchParams.get("id");

if (c === "" || c === null || c === undefined) {
  window.location.href = "./items.html";
}

$.get("./php/staff.php?staffdata=true", function (data) {
  console.log(data);
  result = data;
  for (user in result) {
    row = result[user];
    if (row.id === c) {
      console.log(row);
      $("#username")[0].value = row.username;
      $("#name").val(row.staff_name);
      console.log($("#username").val());
    }
  }
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
