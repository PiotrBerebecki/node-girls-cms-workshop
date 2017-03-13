

$(document).ready(function() {
  $.ajax({
    url: '/posts',
    dataType: 'json',
    success: function(data) {

      for (var blogPost in data) {
        var postDiv         = document.createElement('div');
        var postText        = document.createElement('p');
        var thumbnail       = document.createElement('img');
        var postContainer   = document.getElementsByClassName('post-container')[0];

        var dateOptions = { year: 'numeric', month: 'short', day: '2-digit',
          hour: '2-digit', minute: '2-digit' };
        var date = new Date(parseInt(blogPost, 10)).toLocaleDateString('en-GB', dateOptions);

        thumbnail.src = "./img/logo2.png";
        thumbnail.className = "thumbnail";
        postText.innerHTML = date + ' ' + data[blogPost];
        postDiv.className = "post";

        postDiv.appendChild(thumbnail);
        postDiv.appendChild(postText);
        postContainer.appendChild(postDiv);

      }
    },
    error: function(error){
      console.log(error);
    }
  });
});
