
$(document).ready(() => {
  visitor = null;
  var whosTimeline = 'none';

  const $body = $('body').css('background-color', '#90BE6D');
  //$body.html(''); weird init thing

  //when the register button is clicked...
$('#registerbut').click(function(){

  //get username input and add to usernames/set to window visitor
 const $visitor = $('#name-input').val()
 visitor = $visitor
 $('#header-username').text($visitor);
 $('#underneath-overlay-container')
 .css('filter', 'blur(0px)')
 .css('transition', '2s')
 .css('-webkit-user-select', 'auto')
 .css('pointer-events', 'auto')
 $('#main-overlay').fadeOut(2000);
 streams.users[$visitor] = [];
 console.log(`You're Registered! your username is ${visitor}`)
})

//define tweets
  var $tweets = streams.home.map((tweet) => {
//main tweet container
    const $tweet = $('<div></div>').attr('class', 'tweetcon');

    const $user = $('<p></p>')
      .attr('class', 'tweet-user')
      .text(`@${tweet.user}:`);

    const $message = $('<p></p>')
      .attr('class', "tweet-message")
      .text(`${tweet.message}`);

    const $timestamp = $('<p></p>')
    .attr('class', 'tweet-timest').text(`${tweet.created_at}`);

    $tweet.append($user);
    $tweet.append($message)
    $tweet.append($timestamp)
    return $tweet;

  }).slice(0,7);

  $('#timeline-list').prepend($tweets);


//Update $tweets based on whosTimeline
function update(){
  if(whosTimeline === visitor){
    $tweets = streams.home.reverse().map((tweet) => {
    if(visitor === tweet.user){
  const $tweet = $('<div></div>').attr('class', 'tweetcon');
  const $user = $('<p></p>')
    .attr('class', 'tweet-user')
    .text(`@${tweet.user}:`);
  const $message = $('<p></p>')
    .attr('class', "tweet-message")
    .text(`${tweet.message}`);
  const $timestamp = $('<p></p>')
  .attr('class', 'tweet-timest').text(`${tweet.created_at.fromNow()}`);

  $tweet.append($user);
  $tweet.append($message)
  $tweet.append($timestamp)
  return $tweet;
    }
  })
  }
  if(whosTimeline !== null){
    $tweets = streams.home.slice(0).reverse().map((tweet) => {
      if(whosTimeline === tweet.user){
  const $tweet = $('<div></div>').attr('class', 'tweetcon');
  const $user = $('<p></p>')
    .attr('class', 'tweet-user')
    .text(`@${tweet.user}:`);
  const $message = $('<p></p>')
    .attr('class', "tweet-message")
    .text(`${tweet.message}`);
  const $timestamp = $('<p></p>')
  .attr('class', 'tweet-timest').text(`${tweet.created_at.fromNow()}`);

  $tweet.append($user);
  $tweet.append($message)
  $tweet.append($timestamp)
  return $tweet;
      }
    });
  }
if(whosTimeline === 'none'){
  $tweets = streams.home.slice(0).reverse().map((tweet) => {
  const $tweet = $('<div></div>').attr('class', 'tweetcon');
  const $user = $('<p></p>')
    .attr('class', 'tweet-user')
    .text(`@${tweet.user}:`);
  const $message = $('<p></p>')
    .attr('class', "tweet-message")
    .text(`${tweet.message}`);
  const $timestamp = $('<p></p>')
  .attr('class', 'tweet-timest').text(`${tweet.created_at.fromNow()}`);

  $tweet.append($user);
  $tweet.append($message)
  $tweet.append($timestamp)
  return $tweet;

}).slice(0, 7);
}
}

  //updates list on html page
function updateList(updatedList){
    $('#timeline-list').empty();
    $('#timeline-list').prepend(updatedList)
  }

  //when post is clicked
  $('#tweeterbut').click(function(){
    //get the message out of the textarea
    $message = $('#tweeterinput').val()
    writeTweet($message);
    console.log(streams.home);
    $('#tweeterinput').val("")
    update()
    updateList($tweets);
  });

//when this tweet-user is clicked...
$(document).on("click", ".tweet-user", (function(){
  whosTimeline = $(this).html().slice(1).slice(0, -1);
  update();
  updateList($tweets);
}))

//when the visitors name is clicked
$(document).on("click", "#header-username", (function(){
  whosTimeline = visitor;
  updateList($tweets);
}))

//when the logo.png is clicked
$(document).on("click", "#logo", (function(){
  whosTimeline = 'none';
  updateList($tweets);
  console.log(whosTimeline)
}))



  //button method
// $('#updaterbut').css('display', 'inline-flex').click(function(event){
//   update()
//   updateList($tweets);
// updatingOrNot = false;
// })

//setTimeout method
  setInterval(function(){
    update();
  }, 1000)
  setInterval(function(){
    updateList($tweets);
  }, 2000)

})


