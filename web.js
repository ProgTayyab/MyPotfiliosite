let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// email send via api

const form = document.querySelector("form")
const FullName = document.getElementById("name")
const Email=document.getElementById("email")
const Message=document.getElementById("message")

function sendEmail(){
    const BodyMessage = `fullName :${FullName.value} <br> Email :${Email.value} <br> Message : ${Message.value}`
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "marwattayyab356@gmail.com",
        Password : "26E88BE1CC8A553772847A1DC22941772F9A",
        To : 'marwattayyab356@gmail.com',
        From : "marwattayyab356@gmail.com",
        Body : BodyMessage
    }).then(
      message => alert(message)
    );
}
form.addEventListener("submit",(e) =>{
    e.preventDefault(); 
    sendEmail();
});