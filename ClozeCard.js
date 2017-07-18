var ClozeCard = function(text,cloze){
	this.fullText = text;
	this.cloze = cloze;
	this.partial = function (){
		//create regular expression object for delete word  with ignore case
		var regEx = new RegExp(this.cloze, "i");
		console.log(this.fullText.search(regEx));
		
		if(this.fullText.search(regEx) >= 0){
			return this.fullText.replace(regEx,'_ _ _ _');
		}
		else{
			  return new Error("Cloze deletion does not exit in the input text.");
		}
	};

};

//var ques1 = new ClozeCard("George Washington was the first president of the United States.", "George Washington");

//console.log(ques1.partial());
module.exports = ClozeCard;


