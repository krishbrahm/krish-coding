emailjs.init('M3hc_RVsKlqn-p-eb')
const today = new Date().toISOString().split('T')[0];
document.getElementById("booking-date").min = today;
document.getElementById("guest-count").addEventListener("input", function () {
    document.getElementById('guest-display').textContent = "Guests Selected: " + (this.value || 0);
});
function bookTable() {
    const name = document.getElementById('guest-name').value.trim();
    const guests = document.getElementById('guest-count').value;
    const mobile = document.getElementById('mobile-number').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const meal = document.getElementById('meal-type').value;
    const dining = document.querySelector('input[name="dining"]:checked');

    const confirmBooking = confirm("Confirm your table booking? ");
    if (!confirmBooking) {
        alert("Booking canceled!");
        return;
    }
    const bookingId = "RT-" + Math.floor(1000 + Math.random() * 9000);
    const bookingData = {
        bookingId: bookingId,
        name: name,
        guests: guests,
        mobile: mobile,
        email: email,
        date: date,
        time: time,
        meal: meal,
        dining: dining.value
    };
    localStorage.setItem("Restaurant booking: ", JSON.stringify(bookingData));
    emailjs.send(
        "service_jtg5c5k",
        "template_49vg1s5",
        bookingData
    ).then(function (response) {
        console.log(
            'Email sent!',
            response
        );
        alert("Booking confirmed! Email sent successfuly!");
    }).catch(function (error) {
        console.log("Email error! ", error);
        alert('Booking saved but email failed.');
    });
    const result = document.getElementById("result");
    result.style.display = "block";
    result.innerHTML =
        `<h2 class="success">Booking confirmed!</h2>
    <p><strong>Booking id: ${bookingId}</strong></p>
    <p><strong>Name: ${name}</strong></p>
    <p><strong>Guests: ${guests}</strong></p>
    <p><strong>Mobile: ${mobile}</strong></p>
    <p><strong>Email: ${email}</strong></p>
    <p><strong>Date: ${date}</strong></p>
    <p><strong>Time: ${time}</strong></p>
    <p><strong>Dining: ${dining.value}</strong></p>
    <p><strong>Meal: ${meal}</strong></p>
    <p><strong>Confirmation email sent</strong></p>`;
}