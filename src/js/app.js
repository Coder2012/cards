import '../scss/styles.scss'
import * as PIXI from 'pixi.js'
import keyboardJS from 'keyboardjs'
import { cards, suits } from './cards.js'
import Card from './card.js'

const canvas = document.querySelector('#canvas')

const app = new PIXI.Application({
  width: canvas.offsetWidth,
  height: 350
})

canvas.appendChild(app.view)

// array for main deck and drawn cards
let deck = []
let hand = []

// containers for main deck and drawn cards
const deckContainer = new PIXI.Container()
const handContainer = new PIXI.Container()
handContainer.y = 200

app.stage.addChild(deckContainer)
app.stage.addChild(handContainer)

// load bitmap font and data mapping the card graphics
// from the sprite
const loader = app.loader
loader.add('fonts/font.fnt')
loader.add('images/texture.json')
loader.load(setup)

function setup () {
  createCards()
  layoutCards(deckContainer, deck)
  addKeyboard()
}

app.ticker.add(animate)

// loop each card object from data file, create a texture for the card graphic
// and map all common properties / handlers to the card class
function createCards () {
  cards.forEach((item, index) => {
    let texture = loader.resources['images/texture.json'].textures[item.id]
    let card = new Card(texture)
    card.interactive = true
    card.on('mouseover', () => {
      card.tint = 0xffff00
    })
    card.on('mouseout', () => {
      card.tint = 0xffffff
    })
    card.on('mousedown', drawCard, this)
    card.id = index
    card.value = item.value
    card.suit = item.suit
    deck.push(card)
  })
}

// layout cards so they overlap showing their values / suits
function layoutCards (container, cards) {
  cards.forEach((item, index) => {
    item.x = index * 20
    container.addChild(item)
  })
}

// remove drawn card from pack and add to hand
// also remove interaction, to prevent futher selection
function drawCard (event) {
  let card = event.target
  card.tint = 0xffffff
  card.removeAllListeners()

  // find this exact card in the deck, then splice it at that index by 1
  // then add it to the drawn cards container
  deck.splice(deck.findIndex((item) => item === card), 1)
  handContainer.addChild(card)
  hand.push(card)
  hand = sortCards(hand)
  layoutCards(handContainer, hand)
}

function animate (delta) {

}

// fisher yates shuffle algorithm
// cite ref here
function shuffle (array) {
  let i = 0
  let j = 0
  let temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

// spec says to sort by suit then value
// don't mutate incoming array, just return our new one
function sortCards (array) {
  let arr = []
  suits.forEach((suit, index) => {
    let cards = array.filter((item) => item.suit === suit)
    cards.sort((a, b) => a.value - b.value)
    arr = arr.concat(cards)
  })
  return arr
}

function addKeyboard () {
  const keys = [
      { key: 'a', press: aPress, release: aRelease },
      { key: 'b', press: bPress, release: bRelease }
  ]

  keys.forEach((map) => {
    keyboardJS.bind(map.key, (e) => {
      // console.log(map.key + ' is pressed')
      map.press()
      e.preventRepeat()
    }, (e) => {
      // console.log(map.key + ' is released')
      map.release()
    })
  })
}

function aPress () {
  // console.log('called aPress function')
}

function aRelease () {
  // console.log('called aRelease function')
  shuffle(deck)
  layoutCards(deckContainer, deck)
}

function bPress () {
  // console.log('called bPress function')
}

function bRelease () {
  // console.log('called bRelease function')
  deck = sortCards(deck)
  layoutCards(deckContainer, deck)
}
