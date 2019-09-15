const faker = require('faker')
const animals = require('animals')

const adjectiveGenerators = [
    faker.hacker.adjective,
    faker.commerce.productAdjective,
    faker.company.bsAdjective,
    faker.company.catchPhraseAdjective,
]

const randomAdjective = () => {
    const randomIndex = faker.random.number({
        min: 0,
        max: adjectiveGenerators.length - 1
    })
    return adjectiveGenerators[randomIndex]()
}

const fakeClient = () => {
    const adjective = randomAdjective()
    const animal = animals()

    const name = `${adjective} ${animal}`
  
    return { name, created_at: new Date() }
}

module.exports = fakeClient