import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { ref } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

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

// 비밀번호 찾기(재설정)
export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email)
}

// 유저 닉네임 변경
export async function updateUserName(displayName: string) {
  if (auth.currentUser !== null) {
    await updateProfile(auth.currentUser, { displayName })
    // await updateDoc(doc(db, 'users', auth.currentUser.uid), { displayName: displayName })
  }
}
