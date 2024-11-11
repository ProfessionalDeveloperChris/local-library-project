function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    return books.filter(book => !book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
    const genreCounts = books.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(genreCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
}

function getMostPopularBooks(books) {
    return books.map(book => ({
        name: book.title,
        count: book.borrows.length
    })).sort((a, b) => b.count - a.count)
      .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    const authorBorrowCounts = authors.map(author => {
        const authorBooks = books.filter(book => book.authorId === author.id);
        const borrowCount = authorBooks.reduce((acc, book) => acc + book.borrows.length, 0);
        return { name: `${author.name.first} ${author.name.last}`, count: borrowCount };
    });
    return authorBorrowCounts.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};
