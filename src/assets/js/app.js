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
            $(".certificates").css("display", "none");
            $(".skills").css("display", "none");
            $(".repositories").css("display", "none");
            $(".contacts").css("display", "none");
            $(".privacy").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar active");
            $("#about-li").css("border-bottom-style", "solid");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#repository-li").attr("class", "nav-top-bar");
            $("#repository-li").css("border-bottom-style", "none");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar");
            $("#contact-li").css("border-bottom-style", "none");
        }
    );

    $("#certificate-li").on(
        "click",
        function() {
            $(".certificates").css("display", "block");
            $(".main").css("display", "none");
            $(".skills").css("display", "none");
            $(".repositories").css("display", "none");
            $(".contacts").css("display", "none");
            $(".privacy").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar active");
            $("#certificate-li").css("border-bottom-style", "solid");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#repository-li").attr("class", "nav-top-bar");
            $("#repository-li").css("border-bottom-style", "none");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar");
            $("#contact-li").css("border-bottom-style", "none");
        }
    );

    $("#skill-li").on(
        "click",
        function() {
            $(".skills").css("display", "block");
            $(".main").css("display", "none");
            $(".certificates").css("display", "none");
            $(".repositories").css("display", "none");
            $(".contacts").css("display", "none");
            $(".privacy").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar active");
            $("#skill-li").css("border-bottom-style", "solid");

            $("#repository-li").attr("class", "nav-top-bar");
            $("#repository-li").css("border-bottom-style", "none");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar");
            $("#contact-li").css("border-bottom-style", "none");
        }
    );

    $("#repository-li").on(
        "click",
        function() {
            $(".repositories").css("display", "block");
            $(".main").css("display", "none");
            $(".certificates").css("display", "none");
            $(".skills").css("display", "none");
            $(".contacts").css("display", "none");
            $(".privacy").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#repository-li").attr("class", "nav-top-bar active");
            $("#repository-li").css("border-bottom-style", "solid");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar");
            $("#contact-li").css("border-bottom-style", "none");
        }
    );

    $("#contact-li").on(
        "click",
        function() {
            $(".contacts").css("display", "block");
            $(".main").css("display", "none");
            $(".certificates").css("display", "none");
            $(".skills").css("display", "none");
            $(".repositories").css("display", "none");
            $(".privacy").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#repository-li").attr("class", "nav-top-bar");
            $("#repository-li").css("border-bottom-style", "none");

            $("#resume-li").attr("class", "nav-top-bar");
            $("#resume-li").css("border-bottom-style", "none");

            $("#contact-li").attr("class", "nav-top-bar active");
            $("#contact-li").css("border-bottom-style", "solid");
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

// MAIN - REPOSITORIES -------------------------------------------------------------------------------------------------
$("#algorithms-li").on(
        "click",
        function() {
            $(".leetcode-algorithms").css("display", "block");
            $(".leetcode-concurrency").css("display", "none");
            $(".leetcode-database").css("display", "none");
            $(".leetcode-shell").css("display", "none");

            $("#algorithms-li").attr("class", "nav-leetcode-top-bar-active");
            $("#algorithms-li").css("border-bottom-style", "solid");
            $("#algorithms-a").attr("class", "nav-leetcode-top-bar-active");

            $("#concurrency-li").attr("class", "nav-leetcode-top-bar");
            $("#concurrency-li").css("border-bottom-style", "none");
            $("#concurrency-a").attr("class", "nav-leetcode-top-bar");

            $("#database-li").attr("class", "nav-leetcode-top-bar");
            $("#database-li").css("border-bottom-style", "none");
            $("#database-a").attr("class", "nav-leetcode-top-bar");

            $("#shell-li").attr("class", "nav-leetcode-top-bar");
            $("#shell-li").css("border-bottom-style", "none");
            $("#shell-a").attr("class", "nav-leetcode-top-bar");
        }
    );

    $("#concurrency-li").on(
        "click",
        function() {
            $(".leetcode-concurrency").css("display", "block");
            $(".leetcode-algorithms").css("display", "none");
            $(".leetcode-database").css("display", "none");
            $(".leetcode-shell").css("display", "none");

            $("#algorithms-li").attr("class", "nav-leetcode-top-bar");
            $("#algorithms-li").css("border-bottom-style", "none");
            $("#algorithms-a").attr("class", "nav-leetcode-top-bar");

            $("#concurrency-li").attr("class", "nav-leetcode-top-bar-active");
            $("#concurrency-li").css("border-bottom-style", "solid");
            $("#concurrency-a").attr("class", "nav-leetcode-top-bar-active");

            $("#database-li").attr("class", "nav-leetcode-top-bar");
            $("#database-li").css("border-bottom-style", "none");
            $("#database-a").attr("class", "nav-leetcode-top-bar");

            $("#shell-li").attr("class", "nav-leetcode-top-bar");
            $("#shell-li").css("border-bottom-style", "none");
            $("#shell-a").attr("class", "nav-leetcode-top-bar");
        }
    );

    $("#database-li").on(
        "click",
        function() {
            $(".leetcode-database").css("display", "block");
            $(".leetcode-algorithms").css("display", "none");
            $(".leetcode-concurrency").css("display", "none");
            $(".leetcode-shell").css("display", "none");

            $("#algorithms-li").attr("class", "nav-leetcode-top-bar");
            $("#algorithms-li").css("border-bottom-style", "none");
            $("#algorithms-a").attr("class", "nav-leetcode-top-bar");

            $("#concurrency-li").attr("class", "nav-leetcode-top-bar");
            $("#concurrency-li").css("border-bottom-style", "none");
            $("#concurrency-a").attr("class", "nav-leetcode-top-bar");

            $("#database-li").attr("class", "nav-leetcode-top-bar-active");
            $("#database-li").css("border-bottom-style", "solid");
            $("#database-a").attr("class", "nav-leetcode-top-bar-active");

            $("#shell-li").attr("class", "nav-leetcode-top-bar");
            $("#shell-li").css("border-bottom-style", "none");
            $("#shell-a").attr("class", "nav-leetcode-top-bar");
        }
    );

    $("#shell-li").on(
        "click",
        function() {
            $(".leetcode-shell").css("display", "block");
            $(".leetcode-algorithms").css("display", "none");
            $(".leetcode-concurrency").css("display", "none");
            $(".leetcode-database").css("display", "none");

            $("#algorithms-li").attr("class", "nav-leetcode-top-bar");
            $("#algorithms-li").css("border-bottom-style", "none");
            $("#algorithms-a").attr("class", "nav-leetcode-top-bar");

            $("#concurrency-li").attr("class", "nav-leetcode-top-bar");
            $("#concurrency-li").css("border-bottom-style", "none");
            $("#concurrency-a").attr("class", "nav-leetcode-top-bar");

            $("#database-li").attr("class", "nav-leetcode-top-bar");
            $("#database-li").css("border-bottom-style", "none");
            $("#database-a").attr("class", "nav-leetcode-top-bar");

            $("#shell-li").attr("class", "nav-leetcode-top-bar-active");
            $("#shell-li").css("border-bottom-style", "solid");
            $("#shell-a").attr("class", "nav-leetcode-top-bar-active");
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
            $(".certificates").css("display", "none");
            $(".skills").css("display", "none");
            $(".repositories").css("display", "none");
            $(".contacts").css("display", "none");
            $(".privacy").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#repository-li").attr("class", "nav-top-bar");
            $("#repository-li").css("border-bottom-style", "none");

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
            $(".certificates").css("display", "none");
            $(".skills").css("display", "none");
            $(".repositories").css("display", "none");
            $(".contacts").css("display", "none");
            $(".region-picker").css("display", "none");
            $(document).scrollTop(0);

            $("#about-li").attr("class", "nav-top-bar");
            $("#about-li").css("border-bottom-style", "none");

            $("#certificate-li").attr("class", "nav-top-bar");
            $("#certificate-li").css("border-bottom-style", "none");

            $("#skill-li").attr("class", "nav-top-bar");
            $("#skill-li").css("border-bottom-style", "none");

            $("#repository-li").attr("class", "nav-top-bar");
            $("#repository-li").css("border-bottom-style", "none");

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
    $(".skills").css("display", "block");
    $(".main").css("display", "none");
    $(".certificates").css("display", "none");
    $(".repositories").css("display", "none");
    $(".contacts").css("display", "none");
    $(".privacy").css("display", "none");
    $(".region-picker").css("display", "none");
    $(document).scrollTop(0);

    $("#about-li").attr("class", "nav-top-bar");
    $("#about-li").css("border-bottom-style", "none");

    $("#certificate-li").attr("class", "nav-top-bar");
    $("#certificate-li").css("border-bottom-style", "none");

    $("#skill-li").attr("class", "nav-top-bar active");
    $("#skill-li").css("border-bottom-style", "solid");

    $("#repository-li").attr("class", "nav-top-bar");
    $("#repository-li").css("border-bottom-style", "none");

    $("#contact-li").attr("class", "nav-top-bar");
    $("#contact-li").css("border-bottom-style", "none");

    $("#resume-li").attr("class", "nav-top-bar");
    $("#resume-li").css("border-bottom-style", "none");
}

function openSoft() {
    $(".skills").css("display", "block");
    $(".main").css("display", "none");
    $(".certificates").css("display", "none");
    $(".repositories").css("display", "none");
    $(".contacts").css("display", "none");
    $(".privacy").css("display", "none");
    $(".region-picker").css("display", "none");
    $(document).scrollTop(1432);

    $("#about-li").attr("class", "nav-top-bar");
    $("#about-li").css("border-bottom-style", "none");

    $("#certificate-li").attr("class", "nav-top-bar");
    $("#certificate-li").css("border-bottom-style", "none");

    $("#skill-li").attr("class", "nav-top-bar active");
    $("#skill-li").css("border-bottom-style", "solid");

    $("#repository-li").attr("class", "nav-top-bar");
    $("#repository-li").css("border-bottom-style", "none");

    $("#contact-li").attr("class", "nav-top-bar");
    $("#contact-li").css("border-bottom-style", "none");

    $("#resume-li").attr("class", "nav-top-bar");
    $("#resume-li").css("border-bottom-style", "none");
}

function openEducation() {
    $(".certificates").css("display", "block");
    $(".main").css("display", "none");
    $(".skills").css("display", "none");
    $(".repositories").css("display", "none");
    $(".contacts").css("display", "none");
    $(".privacy").css("display", "none");
    $(".region-picker").css("display", "none");
    $(document).scrollTop(0);

    $("#about-li").attr("class", "nav-top-bar");
    $("#about-li").css("border-bottom-style", "none");

    $("#certificate-li").attr("class", "nav-top-bar active");
    $("#certificate-li").css("border-bottom-style", "solid");

    $("#skill-li").attr("class", "nav-top-bar");
    $("#skill-li").css("border-bottom-style", "none");

    $("#repository-li").attr("class", "nav-top-bar");
    $("#repository-li").css("border-bottom-style", "none");

    $("#contact-li").attr("class", "nav-top-bar");
    $("#contact-li").css("border-bottom-style", "none");

    $("#resume-li").attr("class", "nav-top-bar");
    $("#resume-li").css("border-bottom-style", "none");
}

function openCourses() {
    $(".certificates").css("display", "block");
    $(".main").css("display", "none");
    $(".skills").css("display", "none");
    $(".repositories").css("display", "none");
    $(".contacts").css("display", "none");
    $(".privacy").css("display", "none");
    $(".region-picker").css("display", "none");
    $(document).scrollTop(1320);

    $("#about-li").attr("class", "nav-top-bar");
    $("#about-li").css("border-bottom-style", "none");

    $("#certificate-li").attr("class", "nav-top-bar active");
    $("#certificate-li").css("border-bottom-style", "solid");

    $("#skill-li").attr("class", "nav-top-bar");
    $("#skill-li").css("border-bottom-style", "none");

    $("#repository-li").attr("class", "nav-top-bar");
    $("#repository-li").css("border-bottom-style", "none");

    $("#contact-li").attr("class", "nav-top-bar");
    $("#contact-li").css("border-bottom-style", "none");

    $("#resume-li").attr("class", "nav-top-bar");
    $("#resume-li").css("border-bottom-style", "none");
}

function openRepositories() {
    $(".repositories").css("display", "block");

    $(".main").css("display", "none");
    $(".certificates").css("display", "none");
    $(".skills").css("display", "none");
    $(".contacts").css("display", "none");
    $(".privacy").css("display", "none");
    $(".region-picker").css("display", "none");
    $(document).scrollTop(0);

    $("#about-li").attr("class", "nav-top-bar");
    $("#about-li").css("border-bottom-style", "none");

    $("#certificate-li").attr("class", "nav-top-bar");
    $("#certificate-li").css("border-bottom-style", "none");

    $("#skill-li").attr("class", "nav-top-bar");
    $("#skill-li").css("border-bottom-style", "none");

    $("#repository-li").attr("class", "nav-top-bar active");
    $("#repository-li").css("border-bottom-style", "solid");

    $("#contact-li").attr("class", "nav-top-bar");
    $("#contact-li").css("border-bottom-style", "none");

    $("#resume-li").attr("class", "nav-top-bar");
    $("#resume-li").css("border-bottom-style", "none");
}