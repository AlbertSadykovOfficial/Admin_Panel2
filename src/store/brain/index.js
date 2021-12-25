let executeGetters = {
    get(target, key) {
        if (key in target.getters)
            return target.getters[key](target.state)
        else
            return undefined
    }
}
let stateProxy = {
  get(target, key) {

    if (key == undefined) return target
    if (key == 'state') return target.state
        
    const commit = function () { target.mutations[arguments[0]].apply(this, [target.state, arguments[1]]); }
    const dispatch = function() { target.actions[arguments[0]].apply(this, [ commit, arguments[1] ]); }

    if (key == 'dispatch')
        return dispatch
    else if (key == 'commit')
        return commit
    else if (key == 'getters')
        return new Proxy({ state: target.state, getters: target.getters }, executeGetters)
    else if (key in target.state)
        return target.state[key]
    else
        return undefined
  },
  set (target, key, value) {
    return target.state[key] = value
  }
}

export default stateProxy
