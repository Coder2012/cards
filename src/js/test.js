import { cards, suits } from './cards'

should = require('chai').should()

describe('# Card tests', function () {

	it('Deck should be array with length of 52', function () {
		cards.should.be.instanceof(Array).and.have.lengthOf(52)
	})

	it('Suits should be array with length of 4', function () {
		suits.should.be.instanceof(Array).and.have.lengthOf(4)
	})

	// with more time I would want to import the sort and shuffle functions
	// so that I could do a deep equal test against the original deck

})