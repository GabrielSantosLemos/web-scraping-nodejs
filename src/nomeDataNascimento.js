const rp = require("request-promise");
const cheerio = require("cheerio");

const nomeDataNascimentoParse = function (url) {
  return rp(url)
    .then(function (html) {
      const $ = cheerio.load(html);
      return {
        nome: $(".firstHeading").text(),
        dataNascimento: $(".bday").text(),
      };
    })
    .catch(function (err) {
      console.error(`Erro ao buscar a URL ${url}:`, err);
      throw err;
    });
};

module.exports = nomeDataNascimentoParse;
