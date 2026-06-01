
console.log("Local Community Event Portal Loaded Successfully");

let formSubmitted = false;



function validatePhone() {

    let phone = document.getElementById("phone").value.trim();

    let phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {

        alert("Please enter a valid 10-digit phone number");

        document.getElementById("phone").focus();

        return false;
    }

    return true;
}



function showFee() {

    let eventType =
        document.getElementById("eventType").value;

    let fee = "";

    switch (eventType) {

        case "Music Festival":
            fee = "Registration Fee: ₹100";
            break;

        case "Sports Day":
            fee = "Registration Fee: ₹150";
            break;

        case "Workshop":
            fee = "Registration Fee: ₹200";
            break;

        default:
            fee = "";
    }

    document.getElementById("feeDisplay").innerHTML = fee;


    localStorage.setItem(
        "preferredEvent",
        eventType
    );
}



function countCharacters() {

    let text =
        document.getElementById("feedback").value;

    document.getElementById("charCount").innerHTML =
        text.length;
}


function registerEvent() {

    let name =
        document.getElementById("name").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let date =
        document.getElementById("eventDate").value;

    let event =
        document.getElementById("eventType").value;

    let feedback =
        document.getElementById("feedback").value.trim();

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        date === "" ||
        event === ""
    ) {

        alert("Please fill all required fields");

        return;
    }

    if (!validatePhone()) {
        return;
    }

  
    sessionStorage.setItem(
        "lastRegisteredUser",
        name
    );

    let outputMessage =

        "<h3>Registration Successful</h3>" +

        "<strong>Name:</strong> " +
        name +
        "<br>" +

        "<strong>Email:</strong> " +
        email +
        "<br>" +

        "<strong>Phone:</strong> " +
        phone +
        "<br>" +

        "<strong>Event:</strong> " +
        event +
        "<br>" +

        "<strong>Date:</strong> " +
        date +
        "<br>" +

        "<strong>Message:</strong> " +
        feedback;

    document.getElementById(
        "confirmationMessage"
    ).innerHTML = outputMessage;

    formSubmitted = true;

    console.log("Registration Submitted");
    console.log(name);
}


function enlargeImage(image) {

    if (image.style.transform === "scale(1.5)") {

        image.style.transform = "scale(1)";
    }

    else {

        image.style.transform = "scale(1.5)";
    }
}



function videoReady() {

    document.getElementById(
        "videoStatus"
    ).innerHTML =

        "Video Ready To Play";
}


window.onload = function () {

    let savedEvent =

        localStorage.getItem(
            "preferredEvent"
        );

    if (savedEvent) {

        document.getElementById(
            "eventType"
        ).value = savedEvent;

        showFee();
    }

    console.log("Page Loaded");
};



function clearPreferences() {

    localStorage.clear();

    sessionStorage.clear();

    alert(
        "All Preferences Cleared Successfully"
    );

    console.log("Storage Cleared");
}



function findLocation() {

    if (!navigator.geolocation) {

        alert(
            "Geolocation is not supported by this browser"
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        // Success

        function (position) {

            let latitude =
                position.coords.latitude;

            let longitude =
                position.coords.longitude;

            document.getElementById(
                "locationResult"
            ).innerHTML =

                "<strong>Latitude:</strong> " +
                latitude +
                "<br>" +

                "<strong>Longitude:</strong> " +
                longitude;

            console.log(latitude);
            console.log(longitude);
        },

        // Error Handling

        function (error) {

            switch (error.code) {

                case error.PERMISSION_DENIED:

                    alert(
                        "Location permission denied by user"
                    );

                    break;

                case error.TIMEOUT:

                    alert(
                        "Location request timed out"
                    );

                    break;

                case error.POSITION_UNAVAILABLE:

                    alert(
                        "Location information unavailable"
                    );

                    break;

                default:

                    alert(
                        "Unknown location error"
                    );
            }
        },

        // Options

        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}



window.onbeforeunload = function () {

    if (!formSubmitted) {

        return "You have not submitted the form.";
    }
};