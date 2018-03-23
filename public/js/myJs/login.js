$(function() {
  $('.message a').click(function() {
    $('form').animate({
      height: "toggle",
      opacity: "toggle"
    }, "slow");

    
  });


  $("#sendMessage").on("click", function(event) {
    event.preventDefault;

    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/contact',
      data: {
        email: $('#mail').val(),
        message: $('#subject').val()
      },
      success: function() {
        alert("Your message was sent!!");
        window.location.reload();
      }
    });
  });


  $("#btn").on("click", function(event) {
    event.preventDefault;

    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/pasword',
      data: {
        login: $('#login').val(),
        pass: $('#pass').val()
      },
      success: function(data) {
        if (typeof data != "string") {
          var tableContent = '';

          $.each(data, function() {
            tableContent += '<tr>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.message + '</td>';
            tableContent += '</tr>';
          });

          $('.table tbody').html(tableContent);

          $(".login-page").hide();
          $(".container").show();
        } else {
          alert(data);
        }
      }
    });
  });
});
