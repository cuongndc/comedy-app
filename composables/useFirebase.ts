import { FacebookAuthProvider, GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from '@firebase/auth'
import { useUserStore } from '~/composables/useUserStore'

export const useFirebase = () => {
  const { setUserInfo, setIsLoggedIn } = useUserStore()
  const initFirebase = () => {
    const auth = getAuth()
    setUserInfo(auth.currentUser)
    onAuthStateChanged(auth, (user) => {
      if (!user)
        return
      setUserInfo(user)
      setIsLoggedIn(true)
    })
  }

  const signWithGoogle = async () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then((res) => {
        setUserInfo(res.user.providerData[0])
        setIsLoggedIn(true)
        navigateTo('/menu')
      })
      .catch(() => {
        // setIsLoggedIn(false);
      })
  }

  const signWithFacebook = async () => {
    signInWithPopup(getAuth(), new FacebookAuthProvider())
      .then((res) => {
        setUserInfo(res.user.providerData[0])
        setIsLoggedIn(true)
        navigateTo('/menu')
      })
      .catch(() => {
      })
  }

  return {
    signWithFacebook,
    signWithGoogle,
    initFirebase,
  }
}

export default useFirebase
