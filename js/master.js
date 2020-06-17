$(document).ready(function () {
  var navigation = $('#nav-main').okayNav()
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
  $("#blog").on('click', function () {
    dialogblog.dialog("open")
  })

  $(".ui-dialog-titlebar").hide();
  $("body").click(function (e) {
    if ((e.target.id) != "blog") { 
      dialogblog.dialog("close")
    } 
    if ((e.target.id) != "login") { 
      dialog.dialog("close")
    } 
    $(".user").prop('value', '')
  })
  $(".user").on("input", function () {
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
  $("#log").on('keypress', function (e) {
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

function incorrectLogin() {
  alert("Login incorrecto")
  $(".user").css('border-bottom', '1px solid red');
}