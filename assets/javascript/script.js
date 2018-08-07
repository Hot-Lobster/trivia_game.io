var triviaQuestions = [{
	question: "What does LPS stand for?",
	answerList: ["likely porus simphyllia", "large polyp stony ", "Lapping price stony", "Luxury perplexing stony"],
	answer: 1
},{
	question: "Corals are:",
	answerList: ["Plants", "Animals", "Rocks", "Mark Zuckerberg"],
	answer: 1
},{
	question: "What does SPS stand for?",
	answerList: ["Short polyp stony", "Soap pumice situation", "Soft polyp stony", "Salt prone stylophora"],
	answer: 0
},{
	question: "Which of these an SPS coral?",
	answerList: ["Trachyophillia", "Blastomussa", "Xenia", "Acropora"],
	answer: 3
},{
	question: "which of these is an LPS coral?",
	answerList: ["Psamacora", "Acropora", "Zooxanthellae", "Wellsophyllia"],
	answer: 3
},{
	question: "What is the biggest reef in the world?",
	answerList: ["Apo", "Great Barrier", "Ningaloo", "Amazon"],
	answer: 1
},{
	question: "Montipora is a type of:",
	answerList: ["SPS coral", "LPS coral", "Soft coral", "Anemone"],
	answer: 0
},{
	question: "What color is most coral in the wild?",
	answerList: ["Green", "Purple", "Brown", "Red"],
	answer: 2
},{
	question: "What type of coral is Lobophyllia?",
	answerList: ["Scrolling", "Brain", "Acropora", "Finger leather"],
	answer: 1
},{
	question: "What is Robokaki comonly refered to as?",
	answerList: ["Scroll", "Mushroom", "Brain", "Chalice"],
	answer: 3
},{
	question: "What is branching Acropora affectionatly called by reef hobbiests?",
	answerList: ["Sticks", "Tall bois", "Hard to handle", "The unkeepable menace"],
	answer: 0
},{
	question: "Where are most of the most sought after corals in the reef hobby typically from?",
	answerList: ["Australia", "Fiji", "Caribbean", "Hawaii"],
	answer: 1
},{
	question: "When did coral reefs become scientifically discovered?",
	answerList: ["1902", "1845", "1246", "1770"],
	answer: 3
},{
	question: "What is the name of the naval officer who discovered the reefs?",
	answerList: ["James Cook", "Lewis & Clark", "Peter Distilio", "Dwight K. Shrute"],
	answer: 0
},{
	question: "How are the coral reefs dying?",
	answerList: ["Hot butt disease", "Machine guns", "Global warming", "Wildfires"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}
var back = new Audio('./assets/sounds/back.wav');

$('#startBtn').on('click', function(){
	$(this).hide();
    newGame();
    back.play();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/pics/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}