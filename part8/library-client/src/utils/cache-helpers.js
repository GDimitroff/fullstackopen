// function that takes care of manipulating cache
export const updateAllBooksCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const allBooksCache = cache.readQuery(query)

  // check if cache already exist before attempting to update it
  if (allBooksCache) {
    cache.updateQuery(query, ({ allBooks }) => {
      return {
        allBooks: uniqByTitle(allBooks.concat(addedBook)),
      }
    })
  }
}
