
$(document).ready(() => {
  //init visitor
  visitor = null;
  //init whosTimeline
  var whosTimeline = 'none';
//bring body into js as element
  const $body = $('body');
  //$body.html(''); weird init thing
  /*when the register button is clicked set visitor, make cosmetic changes,
  console registered! statement */
$('#registerbut').click(function(){
 const $visitor = $('#name-input').val()
 visitor = $visitor
 $('#header-username').text($visitor);
 $('#underneath-overlay-container')
 .css('filter', 'blur(0px) grayscale(0%)')
 .css('transition', '1s')
 .css('-webkit-user-select', 'auto')
 .css('pointer-events', 'auto')
 $body.css('filter', 'greyscale(0%)') .css('transition', '1s')
 $('#main-overlay').fadeOut(1000);
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
//look for hashtags and wrap them in tag
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



updateList($tweets);

//Update $tweets based on whosTimeline
function update(){
  //if whosTimeline is the visitor
  if(whosTimeline === visitor){
    $tweets = streams.home.sort(function(x,y){
      x.created_at - y.created_at;
     }).map((tweet) => {
       //conditional filtering for tweet.user
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
  }).reverse();
  }
  //if we are not homepage as well as not on our timeline were on a user timeline
  if(whosTimeline !== 'none' && whosTimeline !== visitor){
    $tweets = streams.home.sort(function(x,y){
      x.created_at - y.created_at;
     }).map((tweet) => {
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
    }).reverse();
  }
  //if were homepage
if(whosTimeline === 'none'){
  $tweets = streams.home.sort(function(x,y){
    x.created_at - y.created_at;
   }).map((tweet) => {
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

}).reverse().slice(0, 7);
}
 //if whosTimeline is the visitor
  if(whosTimeline === visitor){
    $tweets = streams.home.sort(function(x,y){
      x.created_at - y.created_at;
     }).map((tweet) => {
       //conditional filtering for tweet.user
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
  }).reverse();
  }
  //if whoisTimeline startswith hashtag
  if(whosTimeline.startsWith('#')){
    $tweets = streams.home.sort(function(x,y){
      x.created_at - y.created_at;
     }).map((tweet) => {
       if(tweet.hashtags !== null){
      if(tweet.hashtags.includes(whosTimeline)){
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
    }
    }).reverse();
  }
}

//makes enter send tweet after registration
$("input").on("keydown",function search(e) {
  if(visitor){
    if(e.keyCode == 13) {
      $message = $('#tweeterinput').val()
      writeTweet($message);
      console.log(streams.home);
      $('#tweeterinput').val("")
      update()
      updateList($tweets);
    }
  }
});

  //updates list on html page
function updateList(updatedList){
    $('#timeline-list').empty();
    $('#timeline-list').prepend(updatedList)
    $("p:contains('#')").html(function(_, html) {
      return html.replace(/(#[a-z][^\s]+)/g, '<span class="hashtag">$1</span>');
   });
  }

  //when post is clicked
  $('#tweeterbut').click(function(){
    //get the message out of the textarea
    $message = $('#tweeterinput').val()
    //format it as a tweet
    writeTweet($message);
    //clear out the input
    $('#tweeterinput').val("")
    //update $tweets in DOM
    update()
    //update list on page
    updateList($tweets);
  
  });

//when this tweet-user is clicked...
$(document).on("click", ".tweet-user", (function(){
  whosTimeline = $(this).html().slice(1).slice(0, -1);
  updateList($tweets);

}))

//when this hashtag is clicked...
$(document).on("click", ".hashtag", (function(){
  whosTimeline = $(this).html();
  console.log(whosTimeline);
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

//setTimeout method. makes page refresh
  setInterval(function(){
    update();
  }, 1000)
  setInterval(function(){
    updateList($tweets);
  }, 2000)
})


