exports.isBlogOwner = (currentUser, author) => {
    return currentUser === author;
}