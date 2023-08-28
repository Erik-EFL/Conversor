const defaultStyleMap = [
  "p[style-name='comentario'] => hr:fresh",

  "p[style-name='tituloAula'] => h3:fresh",
  "p[style-name='tituloH4'] => h4:fresh",
  "p[style-name='tituloH5'] => h5:fresh",
  "p[style-name='tituloH6'] => h6:fresh",

  "p[style-name='Normal'] => p:fresh",
  "p[style-name='negrito'] => strong:fresh",
  "p[style-name='italico'] => em:fresh",
  "p[style-name='sublinhado'] => u:fresh",

  "table => table:fresh",

  "r[style-name='destaqueColorido'] => p.highlight",
  "r[style-name='destaqueCaixaAlta'] => p.uppercase",

  "r[style-name='realceAmarelo'] => p.highlight-yellow",
  "r[style-name='realceVerde'] => p.highlight-green",
  "r[style-name='realceTurquesa'] => p.highlight-turquoise",
  "r[style-name='realceRosa'] => p.highlight-pink",
  "r[style-name='realceAzul'] => p.highlight-blue",
  "r[style-name='realceVermelho'] => p.highlight-red",

  "p[style-name='listaBullets'] => ul.bullets > li:fresh",
  "p[style-name='listaNumerica'] => ol.numerical > li:fresh",
  "p[style-name='listaAlfabetica'] => ol.alphabetical > li:fresh",
  "p[style-name='listaRomana'] => ol.roman > li:fresh",

  "r[style-name='termoGlossario'] => dt.termoGlossario:fresh",
  "r[style-name='textoGlosario'] => dd.textoGlosario:fresh",
]

export default defaultStyleMap;
