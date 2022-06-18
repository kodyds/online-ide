//@ts-check
let editor;
window.onload = function () {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/python");
};

function changeLanguage() {
  let language = $("#languages").val();

  if (language == "c" || language == "cpp")
    editor.session.setMode("ace/mode/c_cpp");
  else if (language == "php") editor.session.setMode("ace/mode/php");
  else if (language == "python") editor.session.setMode("ace/mode/python");
  else if (language == "node") editor.session.setMode("ace/mode/javascript");
}

function executeCode() {
  console.log(editor.getSession().getValue());
  let studentId = $("#id_input").val();
  $("#loading_spinner").addClass("loading");
  $.ajax({
    url: `https://stem.ee.cuhk.edu.hk/development/firmware/get_ESP_data.php?ID=${studentId}`,

    method: "POST",

    data: {
      code: editor.getSession().getValue(),
    },
    complete: () => {
      $("#loading_spinner").removeClass("loading");
    },
    success: function (response) {
      $(".output").text(response);
    },
  });
}
