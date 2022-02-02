let request = new XMLHttpRequest();
request.open("GET", "./php/main.php?cookies=true", true);
request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    result = JSON.parse(this.responseText);
    // console.log(result);
    if (result.username === "") {
      window.location.href = "./login.html";
    }
  }
};
request.send();
// console.log("loaded");
