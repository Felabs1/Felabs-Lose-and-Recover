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
  //   let txt = "";
  console.log(result);
  $("#recoveryDetails").html(txt);
});
