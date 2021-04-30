const domReady = (callBack: () => void): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callBack)
  } else {
    callBack()
  }
}

const windowReady = (callBack: () => void): void => {
  if (document.readyState === 'complete') {
    callBack()
  } else {
    window.addEventListener('load', callBack)
  }
}

export {
  domReady,
  windowReady
}
