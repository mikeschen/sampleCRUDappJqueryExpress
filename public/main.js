window.addEventListener('load', function() {

  console.log("hellooooooooooo");

  var dom = document.getElementById ('update');
  var dom2 = document.getElementById ('delete');

  console.log(dom);

  dom.addEventListener('click', function () {
    console.log('clicked');
    $.ajax ({
      url:'/quotes',
      method: 'PUT',
      data: {
        name: "replaces name",
        description: "replaces descrip"
      },
      success: function (response){
        console.log("response");
        window.location.reload(true);
      }
    });
  });

  dom2.addEventListener('click', function () {
    console.log('deleteclicked');
    $.ajax ({
      url:'/quotes',
      type: 'DELETE',
      // data: {
      //   name: "replaces name",
      //   description: "replaces descrip"
      // },
      success: function (result){
        console.log("response2");
        window.location.reload(true);
      }
    });
  });
});
