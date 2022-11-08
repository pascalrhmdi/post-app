function textTruncate(str, num = 90) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

export {
  textTruncate
}
