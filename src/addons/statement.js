export default class Statement {

	constructor(pages, current_page = '') {

		if (pages.includes(current_page))
        	this.current = current_page
    	else
    		this.current = pages[0]
    	
    	this.pages = pages 
    }

    getPage () {
        return this.current
    }

    setPage (payload) {
    	if (this.pages.includes(payload)) this.current = payload
    }
}