$.get("./php/items.php?allRecoveredItems", function (data) {
  const result = data;
  let txt = "";
  for (i in result) {
    txt +=
      '<div class="w3-col l4">\
      <div class="w3-card">\
        <div\
          class="background-image"\
          style="\
            height: 200px;\
            background-image: url(' +
      encodeURI(result[i].image.slice(1)) +
      ');\
            background-size: cover;\
            background-position: center;\
          "\
        >\
          <div\
            style="background-color: rgba(0, 0, 0, 0.4); height: 100%"\
          ></div>\
        </div>\
        <div class="w3-container">\
          <h3><b>' +
      result[i].item_name +
      "</b></h3>\
          <p>\
           <b>Condition</b>: " +
      result[i].item_state +
      " | <b>Location Found: </b>" +
      result[i].location_recovered +
      '\
          </p>\
          <button onclick=getPage("./recovery.html?id=' +
      result[i].id +
      '")\
            class="w3-button w3-border w3-center w3-bar-item w3-round"\
          >\
            Request a Reclaim\
          </button>\
        </div>\
      </div>\
    </div>';
  }

  $("#foundItems").html(txt);
  console.log(result);
});

const getPage = (id) => {
  window.location.href = id;
};
