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
    cards :    [],
    id :       null,
    class:     null,
    professor: null,
    subject:   null,
    author :   null,
    password : null,
    createId(){this.id = this.class+"-"+this.professor+"-"+this.subject+"-"+this.author},
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
        var completedLength = 0;
        if (lastCard == null){}
        else if (lastCard.front == "" || lastCard.back == "")
            this.removeCard(this.cards.length - 1);
        completedLength = this.cards.length;
        if (lastCard == null){}
        else if (lastCard.front == "" || lastCard.back == "")
            this.addCard(lastCard);
        return completedLength;
    },
    //Returns this object as a formatted JSON string
    toJSON(){
        //Begin last card complete check
        var lastCard = this.cards[this.cards.length - 1];
        if (lastCard == null){}
        else if (lastCard.front == "" || lastCard.back == "")
            this.removeCard(this.cards.length - 1);
        var tempCards = this.cards;
        //End last card complete check
        if (lastCard == null){}
        else if (lastCard.front == "" || lastCard.back == "")
            this.addCard(lastCard);
        return {"id": this.id, "class": this.class, "professor": this.professor, "subject": this.subject, "author": this.author, "password": this.password, "cards": tempCards};
    },
    //Takes a JSON string and populates this with it
    populateFromJSON(cardSetJSON){
        //var jsonObject = JSON.parse(cardSetJSON);
        this.id        = cardSetJSON["id"];
        this.author    = cardSetJSON["author"];
        this.professor = cardSetJSON["professor"];
        this.subject   = cardSetJSON["subject"];
        this.password  = cardSetJSON["password"];
        this.class     = cardSetJSON["class"];
        this.cards     = []

        for (var i = 0; i < cardSetJSON["cards"].length; i++){
            var parseCard = Object.create(Card);
            parseCard.setFront(cardSetJSON["cards"][i]["front"]);
            parseCard.setBack(cardSetJSON["cards"][i]["back"]);
            this.addCard(parseCard);
        }
        return this;
    }
}

export { Card, CardSet };