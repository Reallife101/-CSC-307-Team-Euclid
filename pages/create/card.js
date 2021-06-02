let Card = {
    front : "",
    back : "",
    setFront(newFront) {this.front = String(newFront)},
    setBack(newBack) {this.back = String(newBack)},
    getFront() {return this.front},
    getBack() {return this.back}
}

let CardSet = {
    cards : [],
    id : null,
    author : null,
    password : null,
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
        return {"id": id, "author": author,"password": password,"cards": cards};
    },
    //Takes a JSON string and populates this with the
    populateFromJSON(cardSetJSON){
        this.id = cardSetJSON.id;
        this.author = cardSetJSON.author;
        for (var i = 0; i < cardSetJSON.cards.length; i++){
            var newCard = Object.create(Card);
            newCard.setFront(cardSetJSON.cards[i].front);
            newCard.setBack(cardSetJSON.cards[i].back);
            this.addCard(newCard);
        }
    }
}

export { Card, CardSet };