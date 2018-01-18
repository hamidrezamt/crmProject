// import { type } from "os";

var isDone;
$('.upload-btn').on('click', function() {
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$("#nextOfFile").hide();
$("#nextOfParam").hide();
$("#nextOfRange").hide();
$("#loginAlert").hide();
$("#signUpAlert").hide();

$('#upload-input').on('change', function() {

    var files = $(this).get(0).files;

    if (files.length > 0) {
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // add the files to formData object for the data payload
            formData.append('uploads[]', file, file.name);
        }

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log('upload successful!\n' + data);
            },
            xhr: function() {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();

                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function(evt) {

                    if (evt.lengthComputable) {
                        // calculate the percentage of upload completed
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);

                        // update the Bootstrap progress bar with the new percentage
                        $('.progress-bar').text(percentComplete + '%');
                        $('.progress-bar').width(percentComplete + '%');

                        // once the upload reaches 100%, set the progress bar text to done
                        if (percentComplete === 100) {
                            $('.progress-bar').html('<i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp  بارگذاری شد');
                            isDone = true;
                            console.log("isDone is : " + isDone);
                            $("#nextOfFile").show();

                        }

                    }

                }, false);
                return xhr;
            }
        });
    }
});

$('#paramSubmit').on('click', function() {
    // $(this).hide();
    var data = {}
    var R = $('#RParam').val();
    var F = $('#FParam').val();
    var M = $('#MParam').val();

    data.R = R;
    data.F = F;
    data.M = M;

    // var a = JSON.stringify(a);
    $.ajax({
        url: "/RFMParam",
        // datatype: 'jsonp',
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: "POST",
        success: (data) => {
            console.log("success")
            console.log(JSON.stringify(data));
            $("#nextOfParam").show();
            // outputs "SUCESSSSS"
        }
    });
});

$('#rangeSubmit').on('click', function() {
    var data = {}
    var rRange = $('#slider').slider("values");
    var fRange = $('#slider2').slider("values");
    var mRange = $('#slider3').slider("values");

    data.rRange = rRange;
    data.fRange = fRange;
    data.mRange = mRange;

    $.ajax({
        url: "/RFMRange",
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: "POST",
        success: (data) => {
            console.log("success")
            console.log(JSON.stringify(data));
            $("#nextOfRange").show();
            // outputs "SUCESSSSS"
        }
    });
});

$('#signUpSubmit').on('click', function() {
    var user = {}
    var name = $('#signUpName').val();
    var email = $('#signUpEmail').val();
    var password = $('#signUpPass1').val();
    var rePassword = $('#signUpPass2').val();

    user.name = name;
    user.email = email;
    user.password = password;
    user.rePassword = rePassword;

    $.ajax({
        url: "/",
        data: JSON.stringify(user),
        contentType: 'application/json',
        type: "POST",
        success: (data) => {
            if (data.error !== "you signed up.") {
                $("#signUpAlert").html(data.error);
                $("#signUpAlert").show();
            } else {
                document.location.href = "/process";
            }
        }
    });
});

$('#loginSubmit').on('click', function() {
    var user = {}
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();

    user.email = email;
    user.password = password;

    $.ajax({
        url: "/login",
        data: JSON.stringify(user),
        contentType: 'application/json',
        type: "POST",
        success: (data) => {
            if (data.error !== "you logged in!") {
                $("#loginAlert").html(data.error);
                $("#loginAlert").show();
            } else {
                document.location.href = "/process";
            }
        }
    });
});