$(document).ready(() => {
  $("#start_button").click(startSwim);
});

function startSwim() {
  $.ajax({
    type: "POST",
    url: "localhost:1337/",
    dataType: "json", // type of data we're expecting from server
    async: false, // make true to avoid waiting for the request to be complete
    success: () => {
      console.log(data);
    }
  });
}
y