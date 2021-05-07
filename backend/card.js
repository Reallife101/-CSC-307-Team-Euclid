
let card = {
    front : "",
    back : "",
    setFront(newFront) {front = str(newFront)},
    setBack(newBack) {back = str(newBack)},
    getFront() {return front},
    getBack() {return back}
}

let cardSet = {
    cards : [],
    id : null,
    author : null,
    password : null,
    //Compares the hash of a passed value to stored hashed password
    checkPassword(checkPass) {
        if (this.password == passHash(checkPass))
            return true
        return
    },
    //Sets the password for the set, only to be used on creation of card set
    setPassword(newPass){this.password = passHash(newPass)},
    //Hash function that returns a hash of input string; needs to be added
    passHash(newPass) {return newPass},
    //Appends a card to the cards list
    addCard(newCard) {this.cards.push(newCard)},
    //Removes card at index
    removeCard(index) {this.cards.splice(index, 1)},
    //Returns a shuffled list of cards for testing
    shuffleCards() {return this.cards.sort(() => Math.random() - 0.5)}
}