

console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
    alert("Community Portal Loaded Successfully");
});


const eventName = "Music Festival";
const eventDate = "2026-12-15";

let availableSeats = 50;

console.log(
    `Event: ${eventName} | Date: ${eventDate} | Seats: ${availableSeats}`
);



class Event {

    constructor(id, name, category, date, location, seats) {

        this.id = id;
        this.name = name;
        this.category = category;
        this.date = date;
        this.location = location;
        this.seats = seats;
    }
}



Event.prototype.checkAvailability = function () {

    return this.seats > 0;
};



function registrationTracker() {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        return totalRegistrations;
    };
}

const trackRegistration = registrationTracker();


let events = [];

fetch("events.json")

.then(response => response.json())

.then(data => {

    console.log("Promise Fetch Success");

})

.catch(error => {

    console.error(error);

});


async function loadEvents() {

    try {

        document.getElementById(
            "loadingSpinner"
        ).style.display = "block";

        const response =
            await fetch("events.json");

        const data =
            await response.json();

        events = data.map(event =>
            new Event(
                event.id,
                event.name,
                event.category,
                event.date,
                event.location,
                event.seats
            )
        );

        displayEvents(events);

        document.getElementById(
            "loadingSpinner"
        ).style.display = "none";

    }

    catch (error) {

        console.error(
            "Error Loading Events",
            error
        );
    }
}

loadEvents();


function displayEvents(eventList) {

    const container =
        document.querySelector(
            "#eventContainer"
        );

    container.innerHTML = "";

    eventList.forEach(event => {

        if (event.seats <= 0) {
            return;
        }

        const card =
            document.createElement("div");

        card.classList.add(
            "event-card"
        );

        card.innerHTML = `

            <h3>${event.name}</h3>

            <p>
            Category:
            ${event.category}
            </p>

            <p>
            Date:
            ${event.date}
            </p>

            <p>
            Location:
            ${event.location}
            </p>

            <p>
            Seats:
            ${event.seats}
            </p>

            <button
            onclick="registerUser(${event.id})">

            Register

            </button>
        `;

        container.appendChild(card);
    });
}


function addEvent(event) {

    events.push(event);

    displayEvents(events);
}


function filterEventsByCategory(
    category,
    callback
) {

    const filtered = events.filter(
        event =>
        category === "All" ||
        event.category === category
    );

    callback(filtered);
}


function registerUser(id) {

    try {

        const event =
            events.find(
                event => event.id === id
            );

        if (!event) {

            throw new Error(
                "Event Not Found"
            );
        }

        if (event.seats <= 0) {

            throw new Error(
                "No Seats Available"
            );
        }

        event.seats--;

        console.log(
            `Registration Count:
            ${trackRegistration()}`
        );

        displayEvents(events);

        alert(
            `Registered for ${event.name}`
        );

    }

    catch (error) {

        alert(error.message);

        console.error(error);
    }
}


function demoArrayMethods() {

    const musicEvents =
        events.filter(
            event =>
            event.category === "Music"
        );

    console.log(
        "Music Events",
        musicEvents
    );

    const formatted =
        events.map(
            event =>
            `Workshop on ${event.name}`
        );

    console.log(
        formatted
    );

    const clonedEvents =
        [...events];

    console.log(
        clonedEvents
    );
}


document
.getElementById("categoryFilter")

.addEventListener(
    "change",
    function () {

        filterEventsByCategory(
            this.value,
            displayEvents
        );
    }
);


document
.getElementById("searchBox")

.addEventListener(
    "keydown",
    function () {

        const searchText =
            this.value.toLowerCase();

        const filtered =
            events.filter(event =>
                event.name
                .toLowerCase()
                .includes(searchText)
            );

        displayEvents(filtered);
    }
);


document
.getElementById(
    "registrationForm"
)

.addEventListener(
    "submit",

    function (event) {

        event.preventDefault();

        console.log(
            "Form Submission Started"
        );

        const form =
            event.target;

        const name =
            form.elements["name"].value;

        const email =
            form.elements["email"].value;

        const selectedEvent =
            form.elements["event"].value;

        document.getElementById(
            "nameError"
        ).innerHTML = "";

        document.getElementById(
            "emailError"
        ).innerHTML = "";

        document.getElementById(
            "eventError"
        ).innerHTML = "";

        let valid = true;

        if (name.trim() === "") {

            document.getElementById(
                "nameError"
            ).innerHTML =
            "Name Required";

            valid = false;
        }

        if (email.trim() === "") {

            document.getElementById(
                "emailError"
            ).innerHTML =
            "Email Required";

            valid = false;
        }

        if (selectedEvent === "") {

            document.getElementById(
                "eventError"
            ).innerHTML =
            "Select Event";

            valid = false;
        }

        if (!valid) {
            return;
        }

        sendRegistration({

            name,
            email,
            selectedEvent

        });
    }
);


function sendRegistration(data) {

    console.log(
        "Sending Registration",
        data
    );

    setTimeout(() => {

        fetch(
            "https://jsonplaceholder.typicode.com/posts",

            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(data)
            }
        )

        .then(response =>
            response.json()
        )

        .then(result => {

            console.log(result);

            document.getElementById(
                "messageBox"
            ).innerHTML =

            "Registration Successful";

            document.getElementById(
                "messageBox"
            ).style.color = "green";
        })

        .catch(error => {

            console.error(error);

            document.getElementById(
                "messageBox"
            ).innerHTML =

            "Registration Failed";

            document.getElementById(
                "messageBox"
            ).style.color = "red";
        });

    }, 2000);
}


const sampleEvent = {

    name: "Music Festival",
    category: "Music",
    seats: 20
};

Object.entries(sampleEvent)

.forEach(([key, value]) => {

    console.log(
        key,
        value
    );
});


$("#registerBtn").click(function () {

    console.log(
        "Register Button Clicked"
    );
});

$("#showEvents").click(function () {

    $("#eventContainer").fadeIn();
});

$("#hideEvents").click(function () {

    $("#eventContainer").fadeOut();
});

console.log(
    "Use Chrome DevTools Console"
);

console.log(
    "Use Network Tab to inspect Fetch Requests"
);

console.log(
    "Add Breakpoints in main.js for Testing"
);


setTimeout(() => {

    demoArrayMethods();

}, 3000);