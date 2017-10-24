import * as PIXI from 'pixi.js'

export default class Card extends PIXI.Sprite {
  constructor (texture, id, value, suit) {
    super(texture)

    this._id = id
    this._value = value
    this._suit = suit
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get value () {
    return this._value
  }

  set value (value) {
    this._value = value
  }

  get suit () {
    return this._suit
  }

  set suit (suit) {
    this._suit = suit
  }
}
