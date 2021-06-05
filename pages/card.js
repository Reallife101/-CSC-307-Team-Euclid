//Card object, contains text for the front and back of card, and correct boolean for testing
let Card = {
    front : "",
    back :  "",
    correct : false,
    setFront(newFront) {this.front = String(newFront)},
    setBack(newBack) {this.back = String(newBack)},
    getFront() {return this.front},
    getBack() {return this.back},
    setCorrect(newCorrect) {this.correct = newCorrect},
    getCorrect() { return this.correct},
    toJSON() {return {"front" : this.front, "back" : this.back};},
    fromJSON(jsonObj){
        this.front = jsonObj["front"];
        this.back  = jsonObj["back"];
        return this;
    }
}

//CardSet object, contains a list of cards and functions for manipulating them
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
    toDict(){
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

        var dict = {"id": this.id, "class": this.class, "professor": this.professor, "subject": this.subject, "author": this.author, "password": this.password, "cards": tempCards};
        return dict;
    },
    parse(cardJSON){
        this.cards = [];
        for (var i = 0; i < cardJSON.cards.length; i++){
            if(cardJSON.cards[i].front != "" && cardJSON.cards[i].front != ""){
                var newCard = Object.create(Card);
                newCard = newCard.fromJSON(cardJSON.cards[i]);
                this.addCard(newCard);
            }
        }
        this.id = cardJSON.id,
        this.class = cardJSON.class,
        this.professor = cardJSON.professor,
        this.subject = cardJSON.subject,
        this.author = cardJSON.author

    }
}

export { Card, CardSet };