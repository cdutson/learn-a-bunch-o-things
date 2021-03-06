String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


angular.module('canadipsum', []).config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }
);

function WordCtrl($scope, $http) {

	// workhorse function that stitches a sentence together
	var renderSentence = function(sentence) {
		var returnVal = [], rand = sentence.randPos, injection = sentence.injection.injection;

		for(key in sentence.words){
			if (sentence.words.hasOwnProperty(key)) {
				var w = sentence.words[key];
				if(key == 0)
					returnVal.push(w.word.capitalize()); 
				else
					returnVal.push(w.word);
			}
		}
		returnVal[rand] += injection;

		return returnVal.join(" ") + sentence.ending.ending;
	};

	$scope.amount = 1;
	$scope.returnType = 'p';
	// This will eventually be dynamically populated via a call to the DB
	$scope.paragraphs = [];

	$scope.requestParagraphs = function(){
		// pass amount and type to a get request url
		// from server: gets JSON string and stores it in the paragraphs
		var url = $scope.returnType +"/" + $scope.amount;
		$http.get(url).success(function(data) {
    		$scope.paragraphs = data.collection;
  		});
	};

	// loops through a paragraph's sentences and stitches them together.
	$scope.renderSentences = function(paragraph){
		var returnVal = [];
		for(sentence in paragraph.p.sentences){
			if (paragraph.p.sentences.hasOwnProperty(sentence)){
				returnVal.push(renderSentence(paragraph.p.sentences[sentence].sentence));
			}
		}
		return returnVal.join(" ");
	};

	
}