$(document).foundation();

$(document).ready(function () {
// RESIZE --------------------------------------------------------------------------------------------------------------
    $(window).on('resize', function() {
        if($(window).width() > 1300) {
            /* PC */
            $('#desktop').show();
        }else {
            $('#desktop').hide();
        }
    });

// HEADER - TABS -------------------------------------------------------------------------------------------------------
  $("#about-li").on(
        "click",
        function() {
            $(".main").css("display", "block");
            $(".privacy").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar active");
            $("#about-li").css("border-bottom-style", "solid");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#git-li").attr("class", "nav-top-bar");
            $("#git-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar");
            $("#contact-li").css("border-bottom-style", "none");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");
        }
    );

// MAIN - BUTTONS "FIND OUT MORE" --------------------------------------------------------------------------------------
    $("#card-button-hard-div").hover(
        function () {
            $("#card-button-hard-div").css("background-color", "rgb(60 64 67)");
            $("#card-button-hard-string").css("color", "rgb(255 255 255)");
        }, function () {
            $("#card-button-hard-div").css("background-color", "");
            $("#card-button-hard-string").css("color", "rgb(60 64 67)");
        }
    );

    $("#card-button-soft-div").hover(
        function () {
            $("#card-button-soft-div").css("background-color", "rgb(60 64 67)");
            $("#card-button-soft-string").css("color", "rgb(255 255 255)");
        }, function () {
            $("#card-button-soft-div").css("background-color", "");
            $("#card-button-soft-string").css("color", "rgb(60 64 67)");
        }
    );

    $("#card-button-education-div").hover(
        function () {
            $("#card-button-education-div").css("background-color", "rgb(60 64 67)");
            $("#card-button-education-string").css("color", "rgb(255 255 255)");
        }, function () {
            $("#card-button-education-div").css("background-color", "");
            $("#card-button-education-string").css("color", "rgb(60 64 67)");
        }
    );

    $("#card-button-courses-div").hover(
        function () {
            $("#card-button-courses-div").css("background-color", "rgb(60 64 67)");
            $("#card-button-courses-string").css("color", "rgb(255 255 255)");
        }, function () {
            $("#card-button-courses-div").css("background-color", "");
            $("#card-button-courses-string").css("color", "rgb(60 64 67)");
        }
    );

    $("#card-button-git-div").hover(
        function () {
            $("#card-button-git-div").css("background-color", "rgb(60 64 67)");
            $("#card-button-git-string").css("color", "rgb(255 255 255)");
        }, function () {
            $("#card-button-git-div").css("background-color", "");
            $("#card-button-git-string").css("color", "rgb(60 64 67)");
        }
    );

// FOOTER - SOCIALS ----------------------------------------------------------------------------------------------------
    $("#footer-github").hover(
        function () {
            $("#footer-github").attr("src", "../src/assets/images/socials/github.circle.png");
        }, function () {
            $("#footer-github").attr("src", "../src/assets/images/socials/github.png");
        }
    );

    $("#footer-linkedin").hover(
        function () {
            $("#footer-linkedin").attr("src", "../src/assets/images/socials/linkedin.circle.png");
        }, function () {
            $("#footer-linkedin").attr("src", "../src/assets/images/socials/linkedin.png");
        }
    );

    $("#footer-stackoverflow").hover(
        function () {
            $("#footer-stackoverflow").attr("src", "../src/assets/images/socials/stack-overflow.circle.png");
        }, function () {
            $("#footer-stackoverflow").attr("src", "../src/assets/images/socials/stack-overflow.png");
        }
    );

    $("#footer-trello").hover(
        function () {
            $("#footer-trello").attr("src", "../src/assets/images/socials/trello.circle.png");
        }, function () {
            $("#footer-trello").attr("src", "../src/assets/images/socials/trello.png");
        }
    );

    $("#footer-twitter").hover(
        function () {
            $("#footer-twitter").attr("src", "../src/assets/images/socials/twitter.circle.png");
        }, function () {
            $("#footer-twitter").attr("src", "../src/assets/images/socials/twitter.png");
        }
    );

    $(".footer-flag").on(
        "click",
        function() {
            $(".region-picker").css("display", "block");
            $(".main").css("display", "none");
            $(".privacy").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#git-li").attr("class", "nav-top-bar");
            $("#git-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar");
            $("#contact-li").css("border-bottom-style", "none");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");
        }
    );

    $(".footer-privacy").on(
        "click",
        function() {
            $(".privacy").css("display", "block");
            $(".main").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#git-li").attr("class", "nav-top-bar");
            $("#git-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar");
            $("#contact-li").css("border-bottom-style", "none");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");
        }
    );
});

function aboutBack() {
    var page = $("#about-button-string").text();
    switch (page) {
        case "1 / 3":
            $("#about-page-1").css("display", "none");
            $("#about-page-2").css("display", "none");
            $("#about-page-3").css("display", "block");
            $("#about-button-string").text("3 / 3");
            break;
        case "2 / 3":
            $("#about-page-1").css("display", "block");
            $("#about-page-2").css("display", "none");
            $("#about-page-3").css("display", "none");
            $("#about-button-string").text("1 / 3");
            break;
        case "3 / 3":
            $("#about-page-1").css("display", "none");
            $("#about-page-2").css("display", "block");
            $("#about-page-3").css("display", "none");
            $("#about-button-string").text("2 / 3");
            break;
    }
}

function aboutNext() {
    var page = $("#about-button-string").text();
    switch (page) {
        case "1 / 3":
            $("#about-page-1").css("display", "none");
            $("#about-page-2").css("display", "block");
            $("#about-page-3").css("display", "none");
            $("#about-button-string").text("2 / 3");
            break;
        case "2 / 3":
            $("#about-page-1").css("display", "none");
            $("#about-page-2").css("display", "none");
            $("#about-page-3").css("display", "block");
            $("#about-button-string").text("3 / 3");
            break;
        case "3 / 3":
            $("#about-page-1").css("display", "block");
            $("#about-page-2").css("display", "none");
            $("#about-page-3").css("display", "none");
            $("#about-button-string").text("1 / 3");
            break;
    }
}


function openHard() {

}