document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let service = document.getElementById("service").value;
      let date = document.getElementById("date").value;
      let time = document.getElementById("time").value;
      let message = document.getElementById("message");

      // Validation
      if (name === "" || service === "" || date === "" || time === "") {
        message.textContent = "Please fill all fields!";
        message.style.color = "red";
        return;
      }

      let booking = {
        name,
        service,
        date,
        time,
      };

      // Get existing bookings
      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

      // Add new booking
      bookings.push(booking);

      // Save back
      localStorage.setItem("bookings", JSON.stringify(bookings));

      message.textContent = "Booking successful!";
      message.style.color = "green";

      form.reset();
    });
  }
});
