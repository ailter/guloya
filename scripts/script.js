$(document).ready(function() {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on("click", function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        900,
        function() {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  $("#btnSendMessage").on("click", function() {
    let name, email, comment;

    name = $("#name").val();
    comment = $("#comments").val();
    email=$('#email').val();

    if (comment == "") alert("Lütfen bir yorum giriniz.");
    else {
        let msg = {
            name: name,
            email: email,
            comment: comment,
            date: getDate(),
            id: guid()
        };
        
        firebase.database().ref('messages/' + msg.id).set({
            name: msg.name,
            email: msg.email,
            date: msg.date,
            id: msg.id,
            message: msg.comment
        }).then(function() {
            $("#name").val('');
            $("#comments").val('');
            $('#email').val('');
            alert('Yorumunuzu başarıyla aldık. Teşekkürler!');
        }).catch(function(err) {
            alert('Yorumunuz gönderilirken bir hata oluştu. Lütfen bir süre sonra tekrar deneyin.')
        });
    }
  });

  let getDate = function () {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = parseInt(currentDate.getMonth()) + 1;
    var year = currentDate.getFullYear();
    var hour = currentDate.getHours();
    var minute = currentDate.getMinutes();

    day = parseInt(day) < 10 ? '0' + day : day;
    month = parseInt(month) < 10 ? '0' + month : month;
    hour = parseInt(hour) < 10 ? '0' + hour : hour;
    minute = parseInt(minute) < 10 ? '0' + minute : minute;

    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute
}

  let guid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  };

  $(window).scroll(function() {
    $(".slideanim").each(function() {
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
      if (pos < winTop + 600) {
        $(this).addClass("slide");
      }
    });
  });
});
