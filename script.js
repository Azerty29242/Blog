HTMLCollection.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i])
    }
}

class RSSReader {
    constructor(url) {
        this.parser = new DOMParser()
        this.rss = new Object()
        this.articles = []
        this.url = url
    }

    read(url = this.url) {
        this.url = url
        fetch(this.url)
            .then(rss => rss.text())
            .then(rss => {
                this.rss = this.parser.parseFromString(rss, "text/xml").documentElement
                var channel = this.rss.getElementsByTagName("channel")[0]
                var items = channel.getElementsByTagName("item")
                items.forEach((item) => {
                    var title = item.getElementsByTagName("title")[0].textContent
                    var description = item.getElementsByTagName("description")[0].textContent
                    var publicationDate = item.getElementsByTagName("pubDate")[0].textContent
                    var link = item.getElementsByTagName("link")[0].textContent
                    this.articles.push(new Article(title, description, publicationDate, link))
                })
                this.show()
            })
    }

    show() {
        this.articles.forEach((article) => {
            var container = document.createElement("li")
            var title = document.createElement("h4")
            var description = document.createElement("p")
            var publicationDate = document.createElement("i")
            var link = document.createElement("a")
            container.classList = "collection-item"
            link.href = article.link
            link.innerHTML = article.title
            link.style.all = "unset"
            link.style.cursor = "auto"
            description.innerHTML = article.description
            publicationDate.innerHTML = article.publicationDate.toLocaleDateString()
            title.appendChild(link)
            container.appendChild(title)
            container.appendChild(description)
            container.appendChild(publicationDate)
            document.getElementById("articles").appendChild(container)
        })
    }
}

class Article {
    constructor(title, description, publicationDate, link) {
        this.title = title
        this.description = description
        this.publicationDate = new Date(publicationDate)
        this.link = link
    }
}


var articles = new RSSReader("feeds/all.rss")
articles.read()