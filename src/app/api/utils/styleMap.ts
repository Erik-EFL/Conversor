const defaultStyleMap = [
  "p[style-name='titulo1'] => h1:fresh",
  "p[style-name='titulo2'] => h2:fresh",
  "p[style-name='titulo3'] => h3:fresh",
  "p[style-name='titulo4'] => h4:fresh",
  "p[style-name='titulo5'] => h5:fresh",
  "p[style-name='titulo6'] => h6:fresh",

  "b => strong",
  "i => em",
  "u => span[style='text-decoration:underline']",
  "sup => span[style='sup']",
  "all-caps => span[style='all-caps']",
  "small-caps => span[style='small-caps']",
  "strike => span[style='text-decoration:line-through']",

  "p[style-name='ModalTitulo'] => h6.ModalTitulo:fresh",
  "p[style-name='ModalTexto'] => p.ModalTexto:fresh",
  "p[style-name='retranca'] => p.retranca:fresh",

  "p[style-name='capitulo'] => h3.capitulo:fresh",
  "p[style-name='aula'] => h3.aula:fresh",
  "p[style-name='listaBullets'] => ul.bullets > li:fresh",
  "p[style-name='listaAlfabetica'] => ol.alphabetical > li:fresh",
  "p[style-name='listaNumerica'] => ol.decimal > li:fresh",
  "p[style-name='listaRomana'] => ol.roman > li:fresh",

  "p[style-name='paragrafoDestaque'] => p.title-description:fresh",
  "p[style-name='textoExemplo'] => p.text-example:fresh",
  "p[style-name='text-center'] => p.text-center:fresh",
  "p[style-name='palavraDestaqueCaixaAlta'] => p.title-img:fresh",
  "p[style-name='palavraDestaque'] => strong.highlighted:fresh",
  "p[style-name='tituloTerceiro'] => div.texto-destaque > p.title-author:fresh",
  "p[style-name='textoTerceiro'] => div.texto-destaque > p:fresh",
  "p[style-name='referenciaTerceiro'] => div.texto-destaque > p.ref-author:fresh",

  "p[style-name='tituloBNCC'] => p.title-bncc:fresh",
  "p[style-name='textoBNCC'] => p.text-bncc:fresh",
  "p[style-name='tituloBibliografia'] => p.title-bibliography:fresh",
  "p[style-name='textoBibliografia'] => p.text-bibliography:fresh",

  "p[style-name='tituloAtividades'] => h1.:freshtituloAtividades",
  "p[style-name='chamadaAtividades'] => p.chamadaAtividades:fresh",
  "p[style-name='enunciadoAtividade'] => p.enunciadoAtividade:fresh",
  "p[style-name='alternativa'] => p.alternativa:fresh",
  "p[style-name='alternativaCorreta'] => p.alternativaCorreta:fresh",

  "p[style-name='Imagem'] => figure.imgsartigos:fresh",
  "p[style-name='fonteImagem'] => p.font-img:fresh",
  "p[style-name='legendaImagem'] => p.leg-img:fresh",
  "p[style-name='audio'] => p.audio:fresh",
  "p[style-name='video'] => p.video:fresh",

  "p[style-name='quebraSecao']  => hr.quebraSecao:fresh",
]

export default defaultStyleMap;
