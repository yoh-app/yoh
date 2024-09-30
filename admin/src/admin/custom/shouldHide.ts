const shouldHide = ({ hideOn, record, action }) => {
  if (!record) {
    return true
  }
  if (hideOn?.or) {
    const hideOns = hideOn?.or?.map((_hideOn) => {
      return hideOnValue({ hideOn: _hideOn, record, action })
    })
    if (hideOns.find((_hideOn) => _hideOn === true)) {
      return true
    } else {
      return false
    }
  } else if (hideOn?.and) {
    const hideOns = hideOn?.and?.map((_hideOn) => {
      return hideOnValue({ hideOn: _hideOn, record, action })
    })
    if (hideOns.filter((_hideOn) => _hideOn === true)?.length === hideOn?.and?.length) {
      return true
    } else {
      return false
    }
  } else {
    return hideOnValue({ hideOn, record, action })
  }
  // if (hideOn?.field) {
  //   switch (hideOn?.field?.operator) {
  //     case '!==':
  //       if (record[hideOn?.field?.name] !== hideOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '===':
  //       if (record[hideOn?.field?.name] === hideOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '>=':
  //       if (record[hideOn?.field?.name] >= hideOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '<=':
  //       if (record[hideOn?.field?.name] <= hideOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '<':
  //       if (record[hideOn?.field?.name] < hideOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '>':
  //       if (record[hideOn?.field?.name] < hideOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case 'startsWith':
  //       if (record[hideOn?.field?.name].startsWith(hideOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     case 'endsWith':
  //       if (record[hideOn?.field?.name].endsWith(hideOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     case 'includes':
  //       if (record[hideOn?.field?.name].includes(hideOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (hideOn?.action === action || hideOn?.action === 'all') {
  //   return true;
  // }

  // return false;
};

const hideOnValue = ({ hideOn, record, action }) => {
  if (hideOn?.field) {
    switch (hideOn?.field?.operator) {
      case '!==':
        if (record[hideOn?.field?.name] !== hideOn?.field?.value) {
          return true;
        }
        break;
      case '===':
        if (record[hideOn?.field?.name] === hideOn?.field?.value) {
          return true;
        }
        break;
      case '>=':
        if (record[hideOn?.field?.name] >= hideOn?.field?.value) {
          return true;
        }
        break;
      case '<=':
        if (record[hideOn?.field?.name] <= hideOn?.field?.value) {
          return true;
        }
        break;
      case '<':
        if (record[hideOn?.field?.name] < hideOn?.field?.value) {
          return true;
        }
        break;
      case '>':
        if (record[hideOn?.field?.name] < hideOn?.field?.value) {
          return true;
        }
        break;
      case 'startsWith':
        if (record[hideOn?.field?.name].startsWith(hideOn?.field?.value)) {
          return true;
        }
        break;
      case 'endsWith':
        if (record[hideOn?.field?.name].endsWith(hideOn?.field?.value)) {
          return true;
        }
        break;
      case 'includes':
        if (record[hideOn?.field?.name].includes(hideOn?.field?.value)) {
          return true;
        }
        break;
      default:
        break;
    }
  }
  if (hideOn?.action === action || hideOn?.action === 'all') {
    return true;
  }

  return false;
}

export default shouldHide;