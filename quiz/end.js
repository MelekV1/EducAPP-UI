const finalScore = document.querySelector('#finalScore');

finalScore.innerText=JSON.parse(localStorage.getItem('mostRecentScore'))