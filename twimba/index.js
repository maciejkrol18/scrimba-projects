import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Event listeners

document.addEventListener('click', e => {
    // This is so bad but that's the way it was setup in Scrimba and i don't really want to bother with rewriting all of that
    if (e.target.dataset.like) {
       handleLikeClick(e.target.dataset.like) ;
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick();
    }
    else if (e.target.dataset.userreply) {
        replyToTweet(e.target.dataset.userreply)
    }
});

// Event handlers
 
function handleLikeClick(tweetId) { 
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--;
    }
    else{
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render();
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0]
    
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    }
    else {
        targetTweetObj.retweets++;
    }
    
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render() ;
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input');

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        })

        render();
        tweetInput.value = '';
    }
}

function replyToTweet(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0];

    targetTweetObj.replies.unshift({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        tweetText: `${document.getElementById(`textarea-${tweetId}`).value}`,
    });

    render();
}

function deleteTweet(tweetId) {

}

// Get HTML boilerplate from the 'data.js' array

function getFeedHtml() {
    let feedHtml = ``;
    
    tweetsData.forEach(tweet => {
    
        // Like/retweet colors

        let likeIconClass = '';
        
        if (tweet.isLiked){
            likeIconClass = 'liked';
        }
        
        let retweetIconClass = '';
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted';
        }
        
        let repliesHtml = '';
        
        if (tweet.replies.length > 0){
            tweet.replies.forEach(reply => {
                repliesHtml +=
                `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            });
        }
          
        feedHtml += 
        `
            <div class="tweet">
                 <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">

                    <div>

                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>

                        <div class="tweet-details">

                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" aria-label="Show replies"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>

                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" aria-label="Like"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>

                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" aria-label="Retweet"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>

                        </div>

                    </div>            
                </div>

                <div class="hidden" id="replies-${tweet.uuid}">
                    <div class="tweet-input-area tweet-input-area--reply">
                        <img src="images/scrimbalogo.png" class="profile-pic">
                        <textarea class="textarea-reply" placeholder="Tweet your reply" id="textarea-${tweet.uuid}"></textarea>
                    </div>
                    <div class="reply-btn-wrapper">
                        <button class="reply-btn" data-userreply="${tweet.uuid}">Reply</button>
                    </div>
                    ${repliesHtml}
                </div>   
            </div>
        `;
   });
   return feedHtml;
}

// Render the feed

function render() {
    localStorage.setItem('twimbaTweets', JSON.stringify(tweetsData));
    document.getElementById('feed').innerHTML = getFeedHtml();
}

render();

