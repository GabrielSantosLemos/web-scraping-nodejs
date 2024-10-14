const rp = require("request-promise");
const cheerio = require("cheerio");
const nomeDataNascimentoParse = require("./nomeDataNascimento");
const url =
  "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

rp(url)
  .then(function (html) {
    const $ = cheerio.load(html);
    const wikiUrls = [];
    const links = $("table > tbody > tr > td > b > a", html);

    for (let i = 0; i < links.length; i++) {
      wikiUrls.push(links[i].attribs.href);
    }

    return Promise.all(
      wikiUrls.map(function (url) {
        return nomeDataNascimentoParse("https://en.wikipedia.org" + url).catch(
          (err) => {
            console.error(`Erro ao analisar ${url}:`, err);
            return null;
          }
        );
      })
    );
  })
  .then(function (values) {
    const presidentes = values.filter((p) => p !== null);
    console.log(presidentes);
  })
  .catch(function (err) {
    console.log("Erro ao buscar a página principal: ", err);
  });
