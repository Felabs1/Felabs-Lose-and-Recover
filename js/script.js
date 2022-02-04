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
        console.log(result);
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
      console.log(result);
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
