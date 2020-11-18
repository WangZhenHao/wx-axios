function extend(to, form) {
  for(let i in form) {
    to[i] = form[i]
  }

  return to;
}

module.exports  = {
  extend
}