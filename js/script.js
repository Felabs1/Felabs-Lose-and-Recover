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
      if (result === "success") {
        alert("successfully registered, you can now log in");
        window.location.href = "./login.html";
      } else if (result === "admission_exist") {
        alert("admission number exist");
      } else {
        alert(
          "i think the error might lie in the server, Please contact the Admin"
        );
      }
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
      if (result === "success") {
        alert(
          "Your report has successfully been received, please check with the found items if yours is recognisable"
        );
        $("#rAdmNo").val("");
        $("#rNatId").val("");
        $("#rLocation").val("");
        $("#rDateRealised").val("");
        $("#rDescription").val("");
        $("#rItemName").val("");
      }
    }
  };
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("lostItemData=" + dbParam);
};

const addFoundItem = () => {
  let recoveredItem = $("#recItemName").val();
  let recovererName = $("#recovererName").val();
  let stateOfItem = $("#recItemState").val();
  let recovererIdNo = $("#recIdNo").val();
  let location = $("#recLocation").val();

  if (
    recoveredItem === "" ||
    recovererName === "" ||
    stateOfItem === "" ||
    recovererIdNo === "" ||
    location === ""
  ) {
    alert("please fill in all fields");
    return;
  }

  const uploadFile = async () => {
    let formData = new FormData();
    formData.append("file", fileUpload.files[0]);
    const response = await fetch("./php/items.php?imageUpload=true", {
      method: "POST",
      body: formData,
    });
    const data = await response.text();
    // console.log(data);

    let obj = {
      recoveredItem,
      recovererName,
      stateOfItem,
      recovererIdNo,
      location,
      data,
    };

    let dbParam = JSON.stringify(obj);
    let request = new XMLHttpRequest();
    request.open("POST", "./php/items.php", true);

    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        result = this.responseText;
        // console.log(result);
        if (result === "success") {
          alert("recovered item added successfully");

          $("#recItemName").val("");
          $("#recovererName").val("");
          $("#recItemState").val("");
          $("#recIdNo").val("");
          $("#recLocation").val("");
        }
      }
    };
    request.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    request.send("recoveredItemData=" + dbParam);

    console.log(obj);
  };
  uploadFile();

  // console.log(obj);
};

sendRequest = () => {
  let claimnantName = $("#claimnantName").val();
  let claimnantIdNo = $("#claimnantIdNo").val();
  let admissionNumber = $("#admissionNumber").val();
  let phoneNumber = $("#phoneNumber").val();
  let id = window.location.href;
  var url = new URL(id);
  var c = url.searchParams.get("id");
  // console.log(c);

  if (
    claimnantName === "" ||
    claimnantIdNo === "" ||
    admissionNumber === "" ||
    phoneNumber === ""
  ) {
    alert("please fill in all the details");
    return;
  }

  const obj = {
    claimnantName,
    claimnantIdNo,
    admissionNumber,
    phoneNumber,
    c,
  };

  let dbParam = JSON.stringify(obj);
  let request = new XMLHttpRequest();
  request.open("POST", "./php/items.php", true);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = this.responseText;
      // console.log(result);
      if ((result = "success")) {
        alert(
          "your request has been received, you will be contacted soon. please come with the proofs of ownership for your item"
        );
        $("#claimnantName").val("");
        $("#claimnantIdNo").val("");
        $("#admissionNumber").val("");
        $("#phoneNumber").val("");
      }
    }
  };
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("requestRecoveredData=" + dbParam);
};

const addStaff = () => {
  let staffName = $("#staffName").val();
  let userName = $("#username").val();
  let password = $("#password").val();
  let confirmPassword = $("#confirmPassword").val();

  if (
    staffName === "" ||
    userName === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("please fill in all the forms");
    return;
  }

  if (password !== confirmPassword) {
    alert("passwords are not matching");
    return;
  }

  obj = { staffName, userName, password, confirmPassword };
  // console.log(obj);
  let dbParam = JSON.stringify(obj);
  let request = new XMLHttpRequest();
  request.open("POST", "./php/staff.php", true);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = this.responseText;
      console.log(result);
    }
  };
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("staffData=" + dbParam);
};

function printDocument(id) {
  // console.log("connected");
  var printContent = document.getElementById(id);
  var WinPrint = window.open("", "", "width=900, height=650");
  WinPrint.document.write(`<!DOCTYPE html>\
  <html lang="en">\
  
  <head>\
      <meta charset="UTF-8">\
      <meta http-equiv="X-UA-Compatible" content="IE=edge">\
      <meta name="viewport" content="width=device-width, initial-scale=1.0">\
      <title>Lost / Recovered Item Reports</title>\
        <link rel="stylesheet" href="./css/w3/w3.css" />
        <link rel="stylesheet" href="./css/style.css" />
      <style>\
      th,\
      td {\
          border: 1px solid #ccc;\
      }\
      </style>\
  </head>\
  
  <body class="w3-container w3-padding">${printContent.innerHTML}`);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
}

function confirmReclaimed() {
  let id = $("#property_id");
  let admission = $("#admission_number");
  let owners_name = $("#owners_name");
  let owners_contact = $("#owners_contact");

  let obj = {
    id: id.val(),
    admission: admission.val(),
    owner: owners_name.val(),
    contact: owners_contact.val(),
  };

  if (
    obj.id === "" ||
    obj.admission === "" ||
    obj.owner === "" ||
    obj.contact === ""
  ) {
    alert("please fill in all the details");
    return;
  }

  // console.log(obj);

  let dbParam = JSON.stringify(obj);
  let request = new XMLHttpRequest();
  request.open("POST", "./php/items.php", true);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = this.responseText;
      // console.log(result);
      if (resultf)
        if (result === "success") {
          alert("Issued successfuly");
          id.val("");
          admission.val("");
          owners_name.val("");
          owners_contact.val("");
        }
    }
  };
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("confirmReclaimed=" + dbParam);
}

function loginAdmin() {
  let username = $("#admission");
  let password = $("#password");

  let data = { username: username.val(), password: password.val() };
  if (data.username === "" || data.passwword === "") {
    alert("please fill all fields");
    return;
  }

  let dbParam = JSON.stringify(data);
  let request = new XMLHttpRequest();
  request.open("POST", "./php/staff.php", true);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = this.responseText;
      if (result === "LOGIN_SUCCESS") {
        window.location.href = "./index.html";
      } else if (result === "WRONG_PASS") {
        alert("wrong password");
      } else if (result === "INVALID_USERNAME") {
        alert("wrong username");
      } else {
        alert("it seems soething unusual happened to the server.");
      }
    }
  };

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("loginadmin=" + dbParam);
}
