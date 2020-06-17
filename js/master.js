$(document).ready(function() {
  $('#nav-main').okayNav()
  var pageIndicator = $(".page-indicator").attr("id").split("-")[0]
  var pageId = simplify(pageIndicator)
  var navigationMenu = $("#nav-main ul li a")
  navigationMenu.each(function(index, el) {
    // alert(pageIndicator + "   " + $(el).attr("id"))
    if (pageId == $(el).attr("id")) {
      with($(el)) {
        css("background-color", "whitesmoke")
        css("border-radius", "30% 0px 30% 0px")
      }
      return false
    }
  });
  var blogMenu = $("#dialog-form-blog ul li a")
  blogMenu.each(function(index, el) {
    if (pageIndicator == $(el).attr("id")) {
      with($(el)) {
        addClass('blog-menu-highlight')
      }
      return false
    }
  });
  // setTimeout(function () {
  //   alert("hola")
  // }, 5000)
  var dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 170,
    width: 260,
    show: {
      effect: "fold",
      duration: 200
    },
    hide: {
      effect: "fold",
      duration: 250
    },
    position: {
      my: "right top",
      at: "right bottom",
      of: header
    },
    draggable: false,
    resizable: false,
  });
  var dialogblog = $("#dialog-form-blog").dialog({
    autoOpen: false,
    height: 170,
    width: 260,
    show: {
      effect: "fold",
      duration: 200
    },
    hide: {
      effect: "fold",
      duration: 250
    },
    position: {
      my: "right top",
      at: "right bottom",
      of: header
    },
    draggable: false,
    resizable: false,
  });
  $("#blog").on('click', function() {
    dialogblog.dialog("open")
  })

  $(".ui-dialog-titlebar").hide();
  $("body").click(function(e) {
    if ((e.target.id) != "blog") {
      dialogblog.dialog("close")
    }
    if ((e.target.id) != "login") {
      dialog.dialog("close")
    }
    $(".user").prop('value', '')
  })
  $(".user").on("input", function() {
    $(this).css('border-bottom', '1px solid rgba(0,0,0,0.3)');
  })
  $("#login").on('click', function validation() {
    if (isLogged) {
      logout()
      location.reload()
    } else {
      dialog.dialog("open")
    }
  })
  $("#log").on('keypress', function(e) {
    if (e.which == 13) {
      loginAttempt()
    }
  });
  var form = $("#log");
  form.validate();
  $("#log-btn").click(loginAttempt);

  function loginAttempt() {
    if (validation()) {
      login()
      dialog.dialog("close")
    } else {
      incorrectLogin()
    }
  }
});

var isLogged;

function logout() {
  $("#login").prop('innerHTML', 'Login')
  isLogged = false
}

function login() {
  $("#login").prop('innerHTML', 'Logout')
  isLogged = true
}

function validation() {
  if ($("#user").prop("value") == "user" && $("#pass").prop("value") == "pass") {
    return true
  } else {
    return false
  }
}

function simplify(pageIndicator) {
  let words = pageIndicator.split("")
  try {
    if (typeof(eval(words[words.length - 1])) == "number") {
      words.pop()
      // alert(words)
      return words.join("")
    }
  } catch (e) {
    return pageIndicator
  }
}

function incorrectLogin() {
  alert("Login incorrecto")
  $(".user").css('border-bottom', '1px solid red');
}
