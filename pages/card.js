let Card = {
    front : "",
    back : "",
    correct : false,
    setFront(newFront) {this.front = String(newFront)},
    setBack(newBack) {this.back = String(newBack)},
    getFront() {return this.front},
    getBack() {return this.back},
    setCorrect(newCorrect) {this.correct = newCorrect},
    getCorrect() { return this.correct}
}

let CardSet = {
    cards : [],
    id : null,
    author : null,
    password : null,
    //Returns list of cards in order
    getCards() {return this.cards},
    //Compares the hash of a passed value to stored hashed password
    checkPassword(checkPass) {
        if (this.password == passHash(checkPass))
            return true;
        return false;
    },
    //Sets the password for the set, only to be used on creation of card set
    setPassword(newPass){this.password = this.passHash(newPass)},
    //Hash function that returns a hash of input string; needs to be added
    passHash(newPass) {return newPass},
    //Appends a card to the cards list
    addCard(newCard) {this.cards.push(newCard)},
    //Removes card at index
    removeCard(index) {this.cards.splice(index, 1)},
    //Returns a card by index
    getCard(index) {return this.cards[index]},
    //Returns a shuffled list of cards for testing
    shuffleCards() {return this.cards.sort(() => Math.random() - 0.5)},
    printCards() {
        for (var i = 0; i < this.cards.length; i++) {
            console.log(this.getCard(i).front + ": " + this.getCard(i).back)
        }
    },
    saveSet(){
        var lastCard = this.cards[this.cards.length - 1];
        if (lastCard.front == "" || lastCard.back == "")
            this.removeCard(this.cards.length - 1);
        var jsonOutput = this.toJSON();
        if (lastCard.front == "" || lastCard.back == "")
            this.addCard(lastCard);
        console.log(jsonOutput);
    },
    //Returns this object as a formatted JSON string
    toJSON(){
        //Begin last card complete check
        var lastCard = this.cards[this.cards.length - 1];
        if (lastCard.front == "" || lastCard.back == "")
            this.removeCard(this.cards.length - 1);
        //Create JSON formatted string
        var formatOutput = '{"id":"'+String(this.id)+'","author":"'+String(this.author)+'","password":"'+String(this.password)+'","cards":[';
        for (var i = 0 ; i < this.cards.length; i++){
            formatOutput = formatOutput + '{"front":"'+this.cards[i].getFront()+'","back":"'+this.cards[i].getBack()+'"}';
            if (i == this.cards.length - 1){
                formatOutput = formatOutput + "]}";
            }
            else{
                formatOutput = formatOutput + ",";
            }
        }
        //End last card complete check
        if (lastCard.front == "" || lastCard.back == "")
            this.addCard(lastCard);
        return formatOutput;
    },
    //Takes a JSON string and populates this with it
    populateFromJSON(cardSetJSON){
        var jsonObject = JSON.parse(cardSetJSON);
        this.id = jsonObject.id;
        this.author = jsonObject.author;
        this.cards = []

        for (var i = 0; i < jsonObject.cards.length; i++){
            var parseCard = Object.create(Card);
            parseCard.setFront(jsonObject.cards[i].front);
            parseCard.setBack(jsonObject.cards[i].back);
            this.addCard(parseCard);
        }
    }
}

export { Card, CardSet };