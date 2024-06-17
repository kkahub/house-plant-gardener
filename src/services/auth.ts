import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { ref } from 'vue'

// 서브밋 중복 클릭 방지용
const submitCount = ref(0)

// 구글 로그인
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const { user } = await signInWithPopup(auth, provider)
  return user
}

// 로그아웃
export async function logout() {
  await signOut(auth)
}

// 이메일 회원가입
export async function signUpWithEmail({ email, password }: { email: string; password: string }) {
  if (submitCount.value === 0) {
    submitCount.value++
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {
      displayName: email
    })
    submitCount.value = 0
  }
}

// 이메일 회원가입 인증 메일 보내기
export async function sendVerificationEmail() {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser)
  }
  alert('인증 메일을 보냈습니다.\n메일을 확인해주세요.')
}

// 이메일 로그인
export async function signInWithEmail({ email, password }: { email: string; password: string }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}
