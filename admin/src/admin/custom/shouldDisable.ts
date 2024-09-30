const shouldDisable = ({ disableOn, record, action }) => {
  if (!record) {
    return true
  }
  if (disableOn?.or) {
    const disableOns = disableOn?.or?.map((_disableOn) => {
      return disableOnValue({ disableOn: _disableOn, record, action })
    })
    if (disableOns.find((_disableOn) => _disableOn === true)) {
      return true
    } else {
      return false
    }
  } else if (disableOn?.and) {
    const disableOns = disableOn?.and?.map((_disableOn) => {
      return disableOnValue({ disableOn: _disableOn, record, action })
    })
    if (disableOns.filter((_disableOn) => _disableOn === true)?.length === disableOn?.and?.length) {
      return true
    } else {
      return false
    }
  } else {
    return disableOnValue({ disableOn, record, action })
  }
  // if (disableOn?.field) {
  //   switch (disableOn?.field?.operator) {
  //     case '!==':
  //       if (record[disableOn?.field?.name] !== disableOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '===':
  //       if (record[disableOn?.field?.name] === disableOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '>=':
  //       if (record[disableOn?.field?.name] >= disableOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '<=':
  //       if (record[disableOn?.field?.name] <= disableOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '<':
  //       if (record[disableOn?.field?.name] < disableOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case '>':
  //       if (record[disableOn?.field?.name] < disableOn?.field?.value) {
  //         return true;
  //       }
  //       break;
  //     case 'startsWith':
  //       if (record[disableOn?.field?.name].startsWith(disableOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     case 'endsWith':
  //       if (record[disableOn?.field?.name].endsWith(disableOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     case 'includes':
  //       if (record[disableOn?.field?.name].includes(disableOn?.field?.value)) {
  //         return true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (disableOn?.action === action || disableOn?.action === 'all') {
  //   return true;
  // }

  // return false;
};

const disableOnValue = ({ disableOn, record, action }) => {
  if (disableOn?.field) {
    switch (disableOn?.field?.operator) {
      case '!==':
        if (record[disableOn?.field?.name] !== disableOn?.field?.value) {
          return true;
        }
        break;
      case '===':
        if (record[disableOn?.field?.name] === disableOn?.field?.value) {
          return true;
        }
        break;
      case '>=':
        if (record[disableOn?.field?.name] >= disableOn?.field?.value) {
          return true;
        }
        break;
      case '<=':
        if (record[disableOn?.field?.name] <= disableOn?.field?.value) {
          return true;
        }
        break;
      case '<':
        if (record[disableOn?.field?.name] < disableOn?.field?.value) {
          return true;
        }
        break;
      case '>':
        if (record[disableOn?.field?.name] < disableOn?.field?.value) {
          return true;
        }
        break;
      case 'startsWith':
        if (record[disableOn?.field?.name].startsWith(disableOn?.field?.value)) {
          return true;
        }
        break;
      case 'endsWith':
        if (record[disableOn?.field?.name].endsWith(disableOn?.field?.value)) {
          return true;
        }
        break;
      case 'includes':
        if (record[disableOn?.field?.name].includes(disableOn?.field?.value)) {
          return true;
        }
        break;
      default:
        break;
    }
  }
  if (disableOn?.action === action || disableOn?.action === 'all') {
    return true;
  }

  return false;
}

export default shouldDisable;