var sessionTag = "";

let registerButtonScroll = document.querySelectorAll(".footer-register-btn");
registerButtonScroll.forEach(e => {
 e.addEventListener("click", function (e) {
  // Scroll to the top with smooth behavior
  window.scrollTo({
   top: 0,
   behavior: "smooth",
  });
  sessionTag = e.getAttribute("tag");
  setTimeout(() => {
   document.getElementById("name").focus();
  }, 1400); // Focus on the scroll-to-top button after scrolling
 });
});

document.getElementById("bfcm_submit").addEventListener("click", function (e) {
 //e.preventDefault();
 var form = document.getElementById("bfcm-form-data");
 var formData = new FormData(form);
 var values = [...formData.entries()];
 let currentdate = new Date();
 //let times = currentdate.toTimeString();
 //let dates = currentdate.toDateString();
 const getMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
 ];

 var year = currentdate.getFullYear().toString();
 var month = getMonth[currentdate.getMonth()];
 var name = values[0][1];
 var email = values[1][1];
 var phonenumber = values[2][1];

 var nameValue = false,
  emailValue = false,
  phoneValue = false;

 if (name != "") {
  nameValue = true;
  document.getElementById("Form_name_err").style.display = "none";
 } else {
  document.getElementById("Form_name_err").style.display = "block";
 }

 const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
 if (mailformat.test(email)) {
  emailValue = true;
  document.getElementById("Form_email_err").style.display = "none";
 } else {
  document.getElementById("Form_email_err").style.display = "block";
 }
 if (phonenumber != "") {
  phoneValue = true;
  document.getElementById("Form_phone_err").style.display = "none";
 } else {
  document.getElementById("Form_phone_err").style.display = "block";
 }

 if (nameValue && emailValue && phoneValue) {
  var jsondata = JSON.stringify({
   name: name ? name : "",
   email: email ? email : "",
   phone: phonenumber ? phonenumber : "",
   month: month,
   year: year,
   tag: sessionTag,
  });
  //console.log(jsondata);

  const apiUrl = "https://cron.vajro.com/api/v1/bfcm/leads";

  const headers = {
   "Content-Type": "application/json",
  };

  axios
   .post(apiUrl, jsondata, {headers})
   .then(response => {
    console.log("Request was successful");
    //console.log('Response data:', response.data);
   })
   .catch(error => {
    if (error.response) {
     console.error("Error status:", error.response.status);
     console.error("Error data:", error.response.data);
    } else if (error.request) {
     console.error("No response received");
    } else {
     console.error("Error:", error.message);
    }
   });
 }
});

document.querySelector("#phone").addEventListener("keydown", restrictInput);

function restrictInput(event) {
 // Allow: backspace, delete, tab, escape, and enter
 if (
  event.key === "Backspace" ||
  event.key === "Delete" ||
  event.key === "Tab" ||
  event.key === "Escape" ||
  event.key === "Enter"
 ) {
  return;
 }

 // Allow digits
 if (/[0-9]/.test(event.key)) {
  return;
 }

 // Prevent any other key from being pressed
 document.getElementById("Form_phone_err").style.display = "block";
 event.preventDefault();
}
