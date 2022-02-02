const toggleNav = (id) => {
  $(`#${id}`).addClass("w3-animate-left");
  $("#" + id).toggle();
};

const slideDown = (id) => {
  $(`#${id}`).slideDown();
};

const slideUp = (id) => {
  $(`#${id}`).slideUp();
};

const login = () => {
  // e.preventDefault();
  let userName = $("#admission").val();
  let password = $("#password").val();

  // if (userName === "" || password === "") return;
  let obj = { username: userName, password: password };

  let dbParam = JSON.stringify(obj);
  let request = new XMLHttpRequest();
  request.open("POST", "./php/main.php", true);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = this.responseText;
      // console.log(result);
      if (result === "LOGIN_SUCCESS") {
        window.location.href = "./index.html";
      }
    }
  };
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("logindata=" + dbParam);

  // console.log(obj);
};

const register = () => {
  let fullName = $("#fullName").val();
  let admission = $("#admission").val();
  let password = $("#password").val();
  let confirmPassword = $("#confirmPassword").val();

  var obj = { fullName, admission, password, confirmPassword };

  if (
    obj.fullName === "" ||
    obj.admission === "" ||
    obj.password === "" ||
    obj.confirmPassword === ""
  ) {
    alert("please fill in all details");
    return;
  }

  if (obj.password !== obj.confirmPassword) {
    alert("passwords dont match");
    return;
  }

  let dbParam = JSON.stringify(obj);
  let request = new XMLHttpRequest();
  request.open("POST", "./php/main.php", true);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = this.responseText;
      console.log(result);
    }
  };
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("registerdata=" + dbParam);

  // console.log(obj);
};

// class User {
//   constructor(admission, password) {
//     this.admission = admission;
//     this.password = password;
//   }

// }

// let login = new User("f", "d");

const reportLost = () => {
  let admission = $("#rAdmNo").val(),
    idNumber = $("#rNatId").val(),
    itemName = $("#rItemName").val(),
    location = $("#rLocation").val(),
    dateRealised = $("#rDateRealised").val(),
    description = $("#rDescription").val();

  if (
    admission === "" ||
    idNumber === "" ||
    itemName === "" ||
    location === "" ||
    dateRealised === "" ||
    description === ""
  ) {
    alert("fill in all details");
    return;
  }

  let obj = {
    admission,
    idNumber,
    itemName,
    location,
    dateRealised,
    description,
  };

  let dbParam = JSON.stringify(obj);
  let request = new XMLHttpRequest();
  request.open("POST", "./php/items.php", true);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = this.responseText;
      console.log(result);
    }
  };
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("lostItemData=" + dbParam);
};