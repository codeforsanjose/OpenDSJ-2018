(function() {
  TRANS_TEMPLATE = "transaction_info_template/";
  function get_html(file, cb) {
    $.ajax({
      type: "get",
      url: file,
      dataType: "html",
      success: cb(content)
    });
  }
  $("#add_transaction").on("click", function() {
    // TODO create a table for transaction added
    $("#transactions").append("<p>A new transaction</p>");
  });
  $("#transaction_type").on("change", function() {
    type = $("#transaction_type option:selected")[0].value;
    console.log(type);
    file =  TRANS_TEMPLATE + type + ".html"
    $("#transaction_info").empty();
    $.get(file, function(content) {
      $("#transaction_info").html(content);
    });
  });
}());
