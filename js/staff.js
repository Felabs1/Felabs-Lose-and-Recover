$.get("./php/staff.php?staffdata=true", function (data) {
  //   console.log(data);
  let result = data;
  let txt = ``;
  txt += `<h4>Staff</h4>
    <table class="w3-table w3-bordered">
    <thead>
        <tr>
        <th>#No</th>
        <th>Name</th>
        <th>username</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody>`;

  for (row in result) {
    txt += `<td>${result[row].id}</td>
        <td>${result[row].staff_name}</td>
        <td>${result[row].username}</td>
        <td>
          <button
            class="w3-button w3-round"
            style="
              background-image: linear-gradient(
                90deg,
                #4192f3,
                #5232f3
              );
            "
          >
            Update
          </button>
          <button
            class="w3-button w3-round"
            style="
              background-image: linear-gradient(
                90deg,
                #f44336,
                #ff9800
              );
            "
          >
            Delete
          </button>
        </td>
      </tr>`;
  }

  $("#staffTable").html(txt);
});
