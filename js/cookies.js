let request = new XMLHttpRequest();
request.open("GET", "./php/main.php?cookies=true", true);
request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let result = JSON.parse(this.responseText);
    // console.log(result);
    if (result.username === "") {
      window.location.href = "./login.html";
    }
    document.getElementsByClassName("user-text")[0].innerHTML = result.username;
  }
};
request.send();
// console.log("loaded");
// var x = document.getElementsByClassName("user-text");
// console.log(x);
