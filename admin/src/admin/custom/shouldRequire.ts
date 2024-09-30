const shouldRequire = ({ requiredOn, record, action }) => {
  if (!record) {
    return true
  }
  if (requiredOn?.or) {
    const requiredOns = requiredOn?.or?.map((_requiredOn) => {
      return requiredOnValue({ requiredOn: _requiredOn, record, action })
    })
    if (requiredOns.find((_requiredOn) => _requiredOn === true)) {
      return true
    } else {
      return false
    }
  } else if (requiredOn?.and) {
    const requiredOns = requiredOn?.and?.map((_requiredOn) => {
      return requiredOnValue({ requiredOn: _requiredOn, record, action })
    })
    if (requiredOns.filter((_requiredOn) => _requiredOn === true)?.length === requiredOn?.and?.length) {
      return true
    } else {
      return false
    }
  } else {
    return requiredOnValue({ requiredOn, record, action })
  }
  // if (requiredOn?.field) {
  //   switch (requiredOn?.field?.operator) {
  //     case '!==':
  //       if (record[requiredOn?.field?.name] !== requiredOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '===':
  //       if (record[requiredOn?.field?.name] === requiredOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '>=':
  //       if (record[requiredOn?.field?.name] >= requiredOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '<=':
  //       if (record[requiredOn?.field?.name] <= requiredOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '<':
  //       if (record[requiredOn?.field?.name] < requiredOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '>':
  //       if (record[requiredOn?.field?.name] < requiredOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case 'startsWith':
  //       if (record[requiredOn?.field?.name].startsWith(requiredOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     case 'endsWith':
  //       if (record[requiredOn?.field?.name].endsWith(requiredOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     case 'includes':
  //       if (record[requiredOn?.field?.name].includes(requiredOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (requiredOn?.action === action || requiredOn?.action === 'all') {
  //   return true;
  // }

  // return false;
};

const requiredOnValue = ({ requiredOn, record, action }) => {
  if (requiredOn?.field) {
    switch (requiredOn?.field?.operator) {
      case '!==':
        if (record[requiredOn?.field?.name] !== requiredOn?.field?.value) {
          return true;
        }
        break;
      case '===':
        if (record[requiredOn?.field?.name] === requiredOn?.field?.value) {
          return true;
        }
        break;
      case '>=':
        if (record[requiredOn?.field?.name] >= requiredOn?.field?.value) {
          return true;
        }
        break;
      case '<=':
        if (record[requiredOn?.field?.name] <= requiredOn?.field?.value) {
          return true;
        }
        break;
      case '<':
        if (record[requiredOn?.field?.name] < requiredOn?.field?.value) {
          return true;
        }
        break;
      case '>':
        if (record[requiredOn?.field?.name] < requiredOn?.field?.value) {
          return true;
        }
        break;
      case 'startsWith':
        if (record[requiredOn?.field?.name].startsWith(requiredOn?.field?.value)) {
          return true;
        }
        break;
      case 'endsWith':
        if (record[requiredOn?.field?.name].endsWith(requiredOn?.field?.value)) {
          return true;
        }
        break;
      case 'includes':
        if (record[requiredOn?.field?.name].includes(requiredOn?.field?.value)) {
          return true;
        }
        break;
      default:
        break;
    }
  }
  if (requiredOn?.action === action || requiredOn?.action === 'all') {
    return true;
  }

  return false;
}

export default shouldRequire;