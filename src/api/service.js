/**
 * @typedef {object} PersonGroup
 * @property {string} name
 * @property {Person[]} persons
 */
/**
 * @typedef {object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} position
 * @property {Comment[]} comments
 */
/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {number} personId
 * @property {string} text
 * @property {string} createdAt
 */
/**
 * @typedef {object} ApiServiceOptions
 * @property {string} baseUrl
 */
export default class ApiService {
    /**
     * @param {ApiServiceOptions} options
     */
    constructor({ baseUrl = 'https://61adfd3ea7c7f3001786f510.mockapi.io/' } = {}) {
        this.options = { baseUrl };
    }
    /**
     * @returns {Promise.<Person[], Error>}
     */
    getPersons () {
        // @TODO implement
        // mix comments to person here
        return fetch(this.options.baseUrl + 'person')
    }
    /**
     * @returns {Promise.<Comment[], Error>}
     */
    getComments () {
        // @TODO implement
        return fetch(this.options.baseUrl + 'comment')
    }

     /**
     * @returns {Promise.<Comment[], Error>}
     */
    getGroups() {
        // @TODO implement
        /*
        *  ( Api for groups hadn't worked )
        *
        */
        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                resolve(  
                        [
                          {
                            "name": "Admins",
                            "persons": [1]
                          },
                          {
                            "name": "NotAdmins",
                            "persons": [1,2]
                          }
                        ]
                    )
            }, 500)
        })
    }
}
