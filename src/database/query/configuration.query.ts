export const selectCurrentTime = async () => {
  try {
    return {
      currentTime: new Date()
    }
  } catch (e) {
    throw e
  }
}
