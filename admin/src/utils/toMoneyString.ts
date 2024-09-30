const toMoneyString = (value: string | number) => {
  const quentity = String(value)
  const [integer, decimal] = (quentity || 0).toString().split('.')
  // return `$ ${
  //   decimal
  //     ? [
  //         integer.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,'),
  //         decimal,
  //       ].join('.')
  //     : integer.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')
  // }`
  return `${decimal
    ? [
      integer.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,'),
      decimal,
    ].join('.')
    : integer.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')
    }`
}

export default toMoneyString
