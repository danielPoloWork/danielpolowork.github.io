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

