// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
  addEventListenerToHearts()
})

function addEventListenerToHearts() {
  const heartBtns = document.querySelectorAll('.like-glyph')
  for(const heart of heartBtns) {
    heart.addEventListener('click', (e) => {
      const heartSpan = e.target
      mimicServerCall()
      .then(resp => {
        console.log(resp)
        toggleLike(heartSpan)
      })
      .catch(error => showError(error))
    })
  }
}

function toggleLike(heartSpan) {
  const liked = (heartSpan.textContent == FULL_HEART)
  if (liked) {
    heartSpan.textContent = EMPTY_HEART
    heartSpan.classList.remove('activated-heart')
  } else {
    heartSpan.textContent = FULL_HEART
    heartSpan.classList.add('activated-heart')
  }
}

function showError(error) {
  document.querySelector('#modal-message').textContent = error.message
  document.querySelector('#modal').className = ""
  setTimeout(function() {
    document.querySelector('#modal').className = "hidden"
  }, 5000)


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
