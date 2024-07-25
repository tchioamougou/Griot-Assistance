<script setup>
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { auth } from '../../firebase';
import store from '../../store';
import router from "../../router"
import { NO_PASSWORD_MATCH } from '../../utilities/constants';
import { createDocument } from '../../firebase/firestore';
const email = ref();
const password = ref();
const confirmPass = ref();
const accept = ref(false);
const isSigningUp = ref(false);
const isError = ref(false);
const googleProvider = new GoogleAuthProvider();
const isLoading = ref(false);
const errorMessage = ref('')
const signWithGoogle = async () => {
    isSigningUp.value = true;
    try {
        let result = await signInWithPopup(auth, googleProvider);
        const userData = {
            accept: accept.value,
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            emailVerified: auth.currentUser.emailVerified,
            phoneNumber: auth.currentUser.phoneNumber ?? "",
            photoURL: auth.currentUser.photoURL,
            uid: auth.currentUser.uid
        };
        await createDocument('Users', userData);
        store.dispatch('setUser', auth.currentUser).then((val) => {
            router.push('/courses');
            console.log(val); /// create new User
        });
    } catch (error) {
        console.log('error', error.code)
    } finally {
        isSigningUp.value = false;
    }
}

const signup = async () => {
    isLoading.value = true;
    if (password.value === confirmPass.value) {
        try {
            const result = await createUserWithEmailAndPassword(auth, email.value, password.value);
            const userData = {
                accept: accept.value,
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                emailVerified: auth.currentUser.emailVerified,
                phoneNumber: auth.currentUser.phoneNumber ?? "",
                photoURL: auth.currentUser.photoURL,
                uid: auth.currentUser.uid
            };
            await createDocument('Users', userData);
            await store.dispatch('setUser', auth.currentUser);
            await router.push('/courses');;
            // create new User
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage.value = "email_used";
                    break;
                case "auth/invalid-email":
                    errorMessage.value = "invalid_email_address";
                    break;
                default:
                    errorMessage.value = 'signup_error_occur';
            }
        } finally {
            isLoading.value = false;
        }
    } else {
        isError.value = true;
        errorMessage = NO_PASSWORD_MATCH;
    }
}
</script>

<template>
    <div>
        <section class="bg-gray-50 dark:bg-gray-900 ">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <svg class=" mx-auto w-12 h-12" viewBox="0 0 512 512" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                            fill="#4C51BF" stroke="#4C51BF" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                            fill="white" />
                    </svg>
                    Griot
                </a>
                <div
                    class="w-full dark:bg-boxdark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <div v-if="isError" class="text-red">
                            {{ errorMessage }}
                        </div>
                        <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="signup">
                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input type="email" name="email" id="email"
                                    class="bg-gray-50 dark:bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required="" v-model="email">
                            </div>
                            <div>
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                    class=" dark:bg-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" v-model="password">
                            </div>
                            <div>
                                <label for="confirm-password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                    password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password"
                                    placeholder="••••••••"
                                    class="dark:bg-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" v-model="confirmPass">
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required="" v-model="accept">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms"
                                        class="font-light text-gray-500 dark:text-gray-300 dark:text-white">I accept
                                        the <a
                                            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit"
                                class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                                an account</button>

                            <p class="mt-4 text-center text-gray-600 dark:text-gray-400 dark:text-white">or sign in with
                            </p>

                            <a href="#" @click="signWithGoogle"
                                class="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <svg class="w-6 h-6 mx-2" viewBox="0 0 40 40">
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#FFC107" />
                                    <path
                                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                        fill="#FF3D00" />
                                    <path
                                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                        fill="#4CAF50" />
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#1976D2" />
                                </svg>

                                <span class="mx-2">Sign in with Google</span>
                            </a>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400 dark:text-white">
                                Already have an account? <a href="/login"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                    here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style></style>