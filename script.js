document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // 1. BOOKING FORM (index.html)
  // =========================
  const form = document.getElementById("bookingForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let tel = document.getElementById("tel").value;
      let service = document.getElementById("service").value;
      let date = document.getElementById("date").value;
      let time = document.getElementById("time").value;
      let message = document.getElementById("message");

      // validation
      if (!name || !email || !tel || !service || !date || !time) {
        message.textContent = "Please fill all fields!";
        message.style.color = "red";
        return;
      }

      let booking = {
        name,
        email,
        tel,
        service,
        date,
        time,
      };

      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

      bookings.push(booking);

      localStorage.setItem("bookings", JSON.stringify(bookings));

      message.textContent = "Booking successful!";
      message.style.color = "green";

      form.reset();
    });
  }

  // =========================
  // 2. DISPLAY BOOKINGS (bookings.html)
  // =========================
  const bookingList = document.getElementById("bookingList");

  if (bookingList) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (bookings.length === 0) {
      bookingList.innerHTML = "<p>No bookings yet.</p>";
      return;
    }

    bookings.forEach(function (booking, index) {
      let card = document.createElement("div");
      card.classList.add("booking-card");

      card.innerHTML = `
                <h3>${booking.name}</h3>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.tel}</p>
                <p><strong>Service:</strong> ${booking.service}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>

                <button onclick="deleteBooking(${index})">Delete</button>
            `;

      bookingList.appendChild(card);
    });
  }
});

// =========================
// 3. DELETE BOOKING
// =========================
function deleteBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.splice(index, 1);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  location.reload();
}